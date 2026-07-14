-- Supabase exposes public-schema views with security_invoker enabled. Keep that
-- safe default and route the view through a narrowly typed definer function so
-- anonymous visitors can read published columns without any grant on the base
-- table (which also contains drafts and audit data).

create or replace function public.cms_read_published_content()
returns table (
  content_key text,
  route_path text,
  element_type text,
  published_content text,
  published_format jsonb,
  published_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    block.content_key,
    block.route_path,
    block.element_type,
    block.published_content,
    block.published_format,
    block.published_at
  from public.cms_content_blocks as block;
$$;

revoke all on function public.cms_read_published_content() from public;
grant execute on function public.cms_read_published_content() to anon, authenticated;

create or replace view public.cms_published_content
with (security_barrier = true, security_invoker = true)
as
select * from public.cms_read_published_content();

revoke all on public.cms_published_content from public;
grant select on public.cms_published_content to anon, authenticated;
