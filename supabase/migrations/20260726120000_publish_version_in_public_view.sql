-- Merged text blocks store inline HTML, so the runtime writes them with
-- innerHTML. A row seeded before blocks were merged holds only that block's
-- first text fragment, and rendering it would drop the rest of the sentence.
--
-- published_version tells the runtime whether a human has ever published a
-- block: still 1 means the value is untouched seed data, so a value matching the
-- pre-merge fragment can be safely ignored in favour of the server-rendered
-- copy. Anything an administrator has published is version 2 or higher and is
-- always applied. That distinction is what lets the frontend deploy before or
-- after the seed migration without breaking a page either way.
--
-- The column carries no draft or audit data: it is a counter attached to content
-- that is already public.

drop view if exists public.cms_published_content;
drop function if exists public.cms_read_published_content();

create or replace function public.cms_read_published_content()
returns table (
  content_key text,
  route_path text,
  element_type text,
  published_content text,
  published_format jsonb,
  published_at timestamptz,
  published_version integer
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
    block.published_at,
    block.published_version
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
