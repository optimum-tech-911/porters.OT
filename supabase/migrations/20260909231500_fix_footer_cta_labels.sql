-- Repair the two shared footer CTA labels and store them as plain text. Their
-- decorative arrow is now authored separately and can no longer be swallowed
-- by a rich-text CMS publication.
begin;

create temporary table cms_footer_cta_repair (
  content_key text primary key,
  content text not null
) on commit drop;

insert into cms_footer_cta_repair (content_key, content)
values
  ('global.footer.auto.button.3vss45', 'Je parle à un conseiller'),
  ('global.footer.auto.button.19iqi8e', 'Je simule mes revenus');

create temporary table cms_footer_cta_previous (
  id uuid primary key,
  content_key text not null,
  route_path text not null,
  published_content text not null,
  published_format jsonb not null,
  published_version integer not null
) on commit drop;

insert into cms_footer_cta_previous (
  id, content_key, route_path, published_content, published_format, published_version
)
select
  block.id,
  block.content_key,
  block.route_path,
  block.published_content,
  block.published_format,
  block.published_version
from public.cms_content_blocks as block
join cms_footer_cta_repair as repair using (content_key)
for update of block;

update public.cms_content_blocks as block
set fallback_content = repair.content,
    draft_content = repair.content,
    published_content = repair.content,
    draft_format = '{}'::jsonb,
    published_format = '{}'::jsonb,
    status = 'published',
    published_version = block.published_version + 1,
    published_at = now(),
    updated_at = now()
from cms_footer_cta_repair as repair
where block.content_key = repair.content_key;

insert into public.cms_content_versions (
  content_block_id, version_number, content, format, action
)
select
  block.id,
  block.published_version,
  block.published_content,
  block.published_format,
  'publish'
from public.cms_content_blocks as block
join cms_footer_cta_repair as repair using (content_key);

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
  source_version_id
)
select
  block.id,
  block.content_key,
  block.route_path,
  'publish',
  previous.published_content,
  block.published_content,
  previous.published_format,
  block.published_format,
  null,
  'live',
  version.id
from public.cms_content_blocks as block
join cms_footer_cta_previous as previous using (id, content_key, route_path)
join public.cms_content_versions as version
  on version.content_block_id = block.id
 and version.version_number = block.published_version;

commit;
