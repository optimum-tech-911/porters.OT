-- Publish the client-approved source copy for blocks that are still overridden
-- by the previous editorial pass. Run after 20260714153000_seed_all_routes_cms.sql.
--
-- This is intentionally limited to keys that both:
--   1. exist in the regenerated site registry; and
--   2. currently contain an administrator override in the remote CMS.
--
-- Re-running is safe: rows already aligned with their fallback are not updated.

with aligned_blocks as (
  update public.cms_content_blocks
  set draft_content = fallback_content,
      published_content = fallback_content,
      draft_format = '{}'::jsonb,
      published_format = '{}'::jsonb,
      status = 'published',
      published_version = published_version + 1,
      last_editor = null,
      published_at = now()
  where content_key in (
    'home.faq.cta',
    'home.faq.title',
    'home.final_cta.description',
    'home.hero.eyebrow',
    'home.hero.title',
    'home.offer.admin.description',
    'home.offer.admin.title',
    'home.offer.cta',
    'home.offer.description',
    'home.offer.employee.description',
    'home.offer.employee.title',
    'home.offer.eyebrow',
    'home.offer.human.description',
    'home.offer.it.description',
    'home.offer.it.title',
    'pages.portage-salarial.auto.heading.1nsallb',
    'pages.portage-salarial.auto.heading.1xptkyn',
    'pages.portage-salarial.auto.paragraph.10n12s0',
    'pages.portage-salarial.auto.paragraph.1e907ml',
    'pages.portage-salarial.auto.paragraph.f0xscj'
  )
  and (
    draft_content <> fallback_content
    or published_content <> fallback_content
    or draft_format <> '{}'::jsonb
    or published_format <> '{}'::jsonb
  )
  returning
    id,
    published_version,
    published_content,
    published_format
)
insert into public.cms_content_versions (
  content_block_id,
  version_number,
  content,
  format,
  action
)
select
  id,
  published_version,
  published_content,
  published_format,
  'publish'
from aligned_blocks
on conflict (content_block_id, version_number) do nothing;
