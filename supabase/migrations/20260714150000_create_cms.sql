-- The Porters visual CMS
-- Published content is exposed through a narrow view. Drafts and history remain
-- available only to approved users in cms_admins.

create extension if not exists pgcrypto;

create or replace function public.cms_format_is_valid(value jsonb)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select
    value is not null
    and jsonb_typeof(value) = 'object'
    and not exists (
      select 1
      from jsonb_object_keys(value) as key
      where key not in ('size', 'weight', 'alignment', 'color', 'lineHeight')
    )
    and coalesce(value ->> 'size', 'default') in ('default', 'small', 'large', 'xlarge')
    and coalesce(value ->> 'weight', 'default') in ('default', 'regular', 'medium', 'semibold', 'bold')
    and coalesce(value ->> 'alignment', 'default') in ('default', 'left', 'center', 'right')
    and coalesce(value ->> 'color', 'default') in ('default', 'navy', 'gold', 'dark', 'light', 'muted')
    and coalesce(value ->> 'lineHeight', 'default') in ('default', 'compact', 'normal', 'relaxed');
$$;

create table public.cms_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 120),
  role text not null default 'editor' check (role in ('owner', 'editor')),
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.cms_content_blocks (
  id uuid primary key default gen_random_uuid(),
  content_key text not null unique
    check (content_key ~ '^[a-z0-9]+([._-][a-z0-9]+)*$'),
  route_path text not null check (route_path like '/%'),
  element_type text not null
    check (element_type in ('heading', 'paragraph', 'button', 'label', 'quote', 'list_item', 'name')),
  fallback_content text not null check (char_length(fallback_content) between 1 and 10000),
  draft_content text not null check (char_length(draft_content) between 1 and 10000),
  published_content text not null check (char_length(published_content) between 1 and 10000),
  draft_format jsonb not null default '{}'::jsonb check (public.cms_format_is_valid(draft_format)),
  published_format jsonb not null default '{}'::jsonb check (public.cms_format_is_valid(published_format)),
  status text not null default 'published' check (status in ('draft', 'published')),
  published_version integer not null default 1 check (published_version > 0),
  last_editor uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz not null default now()
);

create index cms_content_blocks_route_path_idx
  on public.cms_content_blocks(route_path);
create index cms_content_blocks_status_idx
  on public.cms_content_blocks(status);
create index cms_content_blocks_updated_at_idx
  on public.cms_content_blocks(updated_at desc);

create table public.cms_content_versions (
  id bigint generated always as identity primary key,
  content_block_id uuid not null references public.cms_content_blocks(id) on delete cascade,
  version_number integer not null check (version_number > 0),
  content text not null check (char_length(content) between 1 and 10000),
  format jsonb not null default '{}'::jsonb check (public.cms_format_is_valid(format)),
  action text not null default 'publish' check (action in ('seed', 'publish', 'restore')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (content_block_id, version_number)
);

create index cms_content_versions_block_created_idx
  on public.cms_content_versions(content_block_id, created_at desc);

create or replace function public.cms_set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger cms_admins_set_updated_at
before update on public.cms_admins
for each row execute function public.cms_set_updated_at();

create trigger cms_content_blocks_set_updated_at
before update on public.cms_content_blocks
for each row execute function public.cms_set_updated_at();

alter table public.cms_admins enable row level security;
alter table public.cms_content_blocks enable row level security;
alter table public.cms_content_versions enable row level security;

create or replace function public.is_cms_admin(candidate uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1
    from public.cms_admins
    where user_id = candidate and enabled
  );
$$;

create or replace function public.is_cms_owner(candidate uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1
    from public.cms_admins
    where user_id = candidate and enabled and role = 'owner'
  );
$$;

create policy "cms admins can read approved administrators"
on public.cms_admins for select
to authenticated
using (public.is_cms_admin());

create policy "cms owners can add administrators"
on public.cms_admins for insert
to authenticated
with check (public.is_cms_owner());

create policy "cms owners can update administrators"
on public.cms_admins for update
to authenticated
using (public.is_cms_owner())
with check (public.is_cms_owner());

create policy "cms owners can remove administrators"
on public.cms_admins for delete
to authenticated
using (public.is_cms_owner());

create policy "cms admins can read all content states"
on public.cms_content_blocks for select
to authenticated
using (public.is_cms_admin());

create policy "cms admins can read version history"
on public.cms_content_versions for select
to authenticated
using (public.is_cms_admin());

-- This view is the only public content surface. It intentionally contains no
-- draft, editor, or internal audit columns.
create or replace view public.cms_published_content
with (security_barrier = true)
as
select content_key, route_path, element_type, published_content, published_format, published_at
from public.cms_content_blocks;

revoke all on public.cms_admins from anon, authenticated;
revoke all on public.cms_content_blocks from anon, authenticated;
revoke all on public.cms_content_versions from anon, authenticated;
grant select on public.cms_admins to authenticated;
grant select on public.cms_content_blocks to authenticated;
grant select on public.cms_content_versions to authenticated;
grant select on public.cms_published_content to anon, authenticated;

create or replace function public.cms_save_draft(
  requested_key text,
  requested_content text,
  requested_format jsonb default '{}'::jsonb
)
returns public.cms_content_blocks
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  result public.cms_content_blocks;
begin
  if not public.is_cms_admin() then
    raise exception 'CMS administrator access required' using errcode = '42501';
  end if;
  if requested_content is null or char_length(btrim(requested_content)) = 0 or char_length(requested_content) > 10000 then
    raise exception 'Content must contain between 1 and 10000 characters' using errcode = '22023';
  end if;
  if not public.cms_format_is_valid(coalesce(requested_format, '{}'::jsonb)) then
    raise exception 'Unsupported formatting configuration' using errcode = '22023';
  end if;

  update public.cms_content_blocks
  set draft_content = requested_content,
      draft_format = coalesce(requested_format, '{}'::jsonb),
      status = case
        when requested_content = published_content
          and coalesce(requested_format, '{}'::jsonb) = published_format then 'published'
        else 'draft'
      end,
      last_editor = auth.uid()
  where content_key = requested_key
  returning * into result;

  if result.id is null then
    raise exception 'Unknown content key: %', requested_key using errcode = 'P0002';
  end if;
  return result;
end;
$$;

create or replace function public.cms_publish_content(requested_key text)
returns public.cms_content_blocks
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  current_block public.cms_content_blocks;
  next_version integer;
begin
  if not public.is_cms_admin() then
    raise exception 'CMS administrator access required' using errcode = '42501';
  end if;

  select * into current_block
  from public.cms_content_blocks
  where content_key = requested_key
  for update;

  if current_block.id is null then
    raise exception 'Unknown content key: %', requested_key using errcode = 'P0002';
  end if;

  next_version := current_block.published_version + 1;

  update public.cms_content_blocks
  set published_content = draft_content,
      published_format = draft_format,
      status = 'published',
      published_version = next_version,
      last_editor = auth.uid(),
      published_at = now()
  where id = current_block.id
  returning * into current_block;

  insert into public.cms_content_versions (
    content_block_id, version_number, content, format, action, created_by
  ) values (
    current_block.id, next_version, current_block.published_content,
    current_block.published_format, 'publish', auth.uid()
  );

  return current_block;
end;
$$;

create or replace function public.cms_restore_version(requested_version_id bigint)
returns public.cms_content_blocks
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  selected_version public.cms_content_versions;
  result public.cms_content_blocks;
begin
  if not public.is_cms_admin() then
    raise exception 'CMS administrator access required' using errcode = '42501';
  end if;

  select * into selected_version
  from public.cms_content_versions
  where id = requested_version_id;

  if selected_version.id is null then
    raise exception 'Unknown content version' using errcode = 'P0002';
  end if;

  update public.cms_content_blocks
  set draft_content = selected_version.content,
      draft_format = selected_version.format,
      status = case
        when selected_version.content = published_content
          and selected_version.format = published_format then 'published'
        else 'draft'
      end,
      last_editor = auth.uid()
  where id = selected_version.content_block_id
  returning * into result;

  return result;
end;
$$;

create or replace function public.cms_create_content_block(
  requested_key text,
  requested_route text,
  requested_element_type text,
  requested_fallback text
)
returns public.cms_content_blocks
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  result public.cms_content_blocks;
begin
  if not public.is_cms_admin() then
    raise exception 'CMS administrator access required' using errcode = '42501';
  end if;

  insert into public.cms_content_blocks (
    content_key, route_path, element_type, fallback_content,
    draft_content, published_content, last_editor
  ) values (
    requested_key, requested_route, requested_element_type, requested_fallback,
    requested_fallback, requested_fallback, auth.uid()
  )
  returning * into result;

  insert into public.cms_content_versions (
    content_block_id, version_number, content, format, action, created_by
  ) values (result.id, 1, result.published_content, result.published_format, 'seed', auth.uid());

  return result;
end;
$$;

revoke all on function public.cms_save_draft(text, text, jsonb) from public, anon;
revoke all on function public.cms_publish_content(text) from public, anon;
revoke all on function public.cms_restore_version(bigint) from public, anon;
revoke all on function public.cms_create_content_block(text, text, text, text) from public, anon;
grant execute on function public.cms_save_draft(text, text, jsonb) to authenticated;
grant execute on function public.cms_publish_content(text) to authenticated;
grant execute on function public.cms_restore_version(bigint) to authenticated;
grant execute on function public.cms_create_content_block(text, text, text, text) to authenticated;

comment on table public.cms_content_blocks is 'Stable visual CMS content keys with separate draft and published states.';
comment on table public.cms_content_versions is 'Immutable snapshot history of published CMS content.';
comment on view public.cms_published_content is 'Public, draft-free content feed consumed once per route.';
