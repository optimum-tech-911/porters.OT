-- Immutable CMS activity audit.
--
-- Existing published versions are backfilled so the report starts with the
-- first recorded CMS version. Draft saves made before this migration were
-- overwritten in cms_content_blocks and cannot be reconstructed.

create table public.cms_content_activity (
  id bigint generated always as identity primary key,
  content_block_id uuid references public.cms_content_blocks(id) on delete set null,
  content_key text not null,
  route_path text not null,
  action text not null check (action in ('create', 'draft_save', 'publish', 'restore')),
  previous_content text,
  new_content text not null,
  previous_format jsonb,
  new_format jsonb not null default '{}'::jsonb,
  text_changed boolean generated always as (previous_content is distinct from new_content) stored,
  format_changed boolean generated always as (previous_format is distinct from new_format) stored,
  changed_by uuid references auth.users(id) on delete set null,
  origin text not null default 'live' check (origin in ('live', 'version_history')),
  source_version_id bigint unique references public.cms_content_versions(id) on delete set null,
  created_at timestamptz not null default now()
);

create index cms_content_activity_actor_created_idx
  on public.cms_content_activity(changed_by, created_at desc);
create index cms_content_activity_block_created_idx
  on public.cms_content_activity(content_block_id, created_at desc);
create index cms_content_activity_created_idx
  on public.cms_content_activity(created_at desc);

alter table public.cms_content_activity enable row level security;

create policy "cms admins can read content activity"
on public.cms_content_activity for select
to authenticated
using (public.is_cms_admin());

revoke all on public.cms_content_activity from anon, authenticated;
grant select on public.cms_content_activity to authenticated;

-- Reconstruct every publishable historical event from the immutable version
-- snapshots. The first snapshot has no previous value; later snapshots use the
-- immediately preceding version of the same content block.
with version_history as (
  select
    version.id,
    version.content_block_id,
    block.content_key,
    block.route_path,
    version.action,
    lag(version.content) over (
      partition by version.content_block_id
      order by version.version_number
    ) as previous_content,
    version.content as new_content,
    lag(version.format) over (
      partition by version.content_block_id
      order by version.version_number
    ) as previous_format,
    version.format as new_format,
    version.created_by,
    version.created_at
  from public.cms_content_versions as version
  join public.cms_content_blocks as block on block.id = version.content_block_id
)
insert into public.cms_content_activity (
  content_block_id,
  content_key,
  route_path,
  action,
  previous_content,
  new_content,
  previous_format,
  new_format,
  changed_by,
  origin,
  source_version_id,
  created_at
)
select
  history.content_block_id,
  history.content_key,
  history.route_path,
  case when history.action = 'seed' then 'create' else history.action end,
  history.previous_content,
  history.new_content,
  history.previous_format,
  history.new_format,
  history.created_by,
  'version_history',
  history.id,
  history.created_at
from version_history as history
on conflict (source_version_id) do nothing;

-- One row per current administrator. Historical publications count as known
-- edits because no draft audit existed at the time. For live activity, draft
-- saves and restores are edits; publication is reported separately so
-- saving and immediately publishing the same text is not counted twice.
create or replace view public.cms_admin_activity_summary
with (security_invoker = true)
as
select
  admin.user_id,
  admin.display_name,
  admin.role,
  admin.enabled,
  count(activity.id) filter (
    where (activity.text_changed or activity.format_changed)
      and (
        activity.action in ('draft_save', 'restore')
        or (activity.origin = 'version_history' and activity.action = 'publish')
      )
  )::bigint as change_count,
  count(activity.id) filter (where activity.action = 'publish')::bigint as publication_count,
  count(distinct activity.content_block_id) filter (
    where (activity.text_changed or activity.format_changed)
      and (
        activity.action in ('draft_save', 'restore')
        or (activity.origin = 'version_history' and activity.action = 'publish')
      )
  )::bigint as text_count,
  min(activity.created_at) filter (
    where activity.action in ('draft_save', 'restore', 'publish')
  ) as first_activity_at,
  max(activity.created_at) filter (
    where activity.action in ('draft_save', 'restore', 'publish')
  ) as last_activity_at
from public.cms_admins as admin
left join public.cms_content_activity as activity on activity.changed_by = admin.user_id
group by admin.user_id, admin.display_name, admin.role, admin.enabled;

revoke all on public.cms_admin_activity_summary from anon, authenticated;
grant select on public.cms_admin_activity_summary to authenticated;

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
  current_block public.cms_content_blocks;
  result public.cms_content_blocks;
  normalized_format jsonb := coalesce(requested_format, '{}'::jsonb);
begin
  if not public.is_cms_admin() then
    raise exception 'CMS administrator access required' using errcode = '42501';
  end if;
  if requested_content is null or char_length(btrim(requested_content)) = 0 or char_length(requested_content) > 10000 then
    raise exception 'Content must contain between 1 and 10000 characters' using errcode = '22023';
  end if;
  if not public.cms_format_is_valid(normalized_format) then
    raise exception 'Unsupported formatting configuration' using errcode = '22023';
  end if;

  select * into current_block
  from public.cms_content_blocks
  where content_key = requested_key
  for update;

  if current_block.id is null then
    raise exception 'Unknown content key: %', requested_key using errcode = 'P0002';
  end if;

  update public.cms_content_blocks
  set draft_content = requested_content,
      draft_format = normalized_format,
      status = case
        when requested_content = published_content
          and normalized_format = published_format then 'published'
        else 'draft'
      end,
      last_editor = auth.uid()
  where id = current_block.id
  returning * into result;

  if current_block.draft_content is distinct from requested_content
    or current_block.draft_format is distinct from normalized_format then
    insert into public.cms_content_activity (
      content_block_id, content_key, route_path, action,
      previous_content, new_content, previous_format, new_format, changed_by
    ) values (
      current_block.id, current_block.content_key, current_block.route_path, 'draft_save',
      current_block.draft_content, requested_content,
      current_block.draft_format, normalized_format, auth.uid()
    );
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
  original_block public.cms_content_blocks;
  current_block public.cms_content_blocks;
  next_version integer;
  created_version_id bigint;
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

  original_block := current_block;
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
  )
  returning id into created_version_id;

  insert into public.cms_content_activity (
    content_block_id, content_key, route_path, action,
    previous_content, new_content, previous_format, new_format,
    changed_by, source_version_id
  ) values (
    current_block.id, current_block.content_key, current_block.route_path, 'publish',
    original_block.published_content, current_block.published_content,
    original_block.published_format, current_block.published_format,
    auth.uid(), created_version_id
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
  current_block public.cms_content_blocks;
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

  select * into current_block
  from public.cms_content_blocks
  where id = selected_version.content_block_id
  for update;

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

  if current_block.draft_content is distinct from selected_version.content
    or current_block.draft_format is distinct from selected_version.format then
    insert into public.cms_content_activity (
      content_block_id, content_key, route_path, action,
      previous_content, new_content, previous_format, new_format, changed_by
    ) values (
      current_block.id, current_block.content_key, current_block.route_path, 'restore',
      current_block.draft_content, selected_version.content,
      current_block.draft_format, selected_version.format, auth.uid()
    );
  end if;

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
  created_version_id bigint;
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
  ) values (result.id, 1, result.published_content, result.published_format, 'seed', auth.uid())
  returning id into created_version_id;

  insert into public.cms_content_activity (
    content_block_id, content_key, route_path, action,
    previous_content, new_content, previous_format, new_format,
    changed_by, source_version_id
  ) values (
    result.id, result.content_key, result.route_path, 'create',
    null, result.published_content, null, result.published_format,
    auth.uid(), created_version_id
  );

  return result;
end;
$$;

comment on table public.cms_content_activity is
  'Immutable before/after audit of CMS saves, publications, restorations and content creation.';
comment on view public.cms_admin_activity_summary is
  'Per-administrator CMS change totals, combining version history with live audit events.';
