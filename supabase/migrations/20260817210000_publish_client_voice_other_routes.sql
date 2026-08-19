-- Publish the 2026-08-17 editorial rewrite to every route.
--
-- The visible site reads its text from cms_content_blocks, so rewritten source
-- copy stays invisible until it is published here.
--
-- Scope, decided per block against a full backup of the live table:
--   * 5 blocks whose SOURCE copy was rewritten -> republished below.
--   * 204 blocks whose source still matches its seeded fallback while the live
--     text differs are hand-made CMS edits. They are deliberately NOT touched.
--   * the 3 protected hero lines in src/cms/runtime-overrides.json have no source
--     row at all and therefore cannot be selected here.
--   * 0 keys the site renders but the CMS has never seen are inserted, so an
--     editor can reach them.
--
-- Idempotent: a block already carrying the new wording is skipped and no
-- version row is written for it.

begin;

with incoming (content_key, new_content) as (
  values
    ('pages.blog.categorie.secteurs.auto.heading.77lg1y', 'Portage salarial pour consultant Big Data / Cloud / IA'),
    ('pages.blog.portage-salarial-consultant-data-ia.auto.heading.1d6h11k', 'Quels profils Big Data / Cloud / IA utilisent le portage ?'),
    ('pages.blog.portage-salarial-consultant-data-ia.auto.heading.1gq6cv2', 'Portage salarial pour consultant Big Data / Cloud / IA'),
    ('pages.blog.portage-salarial-consultant-data-ia.auto.paragraph.18ahffj', 'Portage salarial pour consultant Big Data / Cloud / IA'),
    ('pages.blog.portage-salarial-consultant-data-ia.auto.paragraph.t30x3f', 'Les missions Big Data / Cloud / IA vont du cadrage stratégique à l’industrialisation. Le portage salarial permet à l’expert de rester autonome tout en déléguant les contrats, la facturation et la paie.')
),
updated as (
  update public.cms_content_blocks as b
     set fallback_content  = i.new_content,
         draft_content     = i.new_content,
         published_content = i.new_content,
         status            = 'published',
         published_version = b.published_version + 1,
         published_at      = now()
    from incoming i
   where b.content_key = i.content_key
     and (b.published_content <> i.new_content or b.fallback_content <> i.new_content)
  returning b.id, b.published_version, b.published_content, b.published_format
)
insert into public.cms_content_versions
  (content_block_id, version_number, content, format, action)
select id, published_version, published_content, published_format, 'publish'
from updated;


-- No new block needed creating in this pass.

commit;
