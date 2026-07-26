-- Move untouched homepage hero seed content to the approved editorial copy.
-- Rows published by an administrator (published_version > 1), or otherwise
-- changed from the original seed, are intentionally preserved.

with hero_copy(content_key, previous_content, next_content) as (
  values
    (
      'home.hero.eyebrow',
      'Portage salarial · Experts du numérique',
      'PORTAGE SALARIAL • CONSULTANTS • ENTREPRISES'
    ),
    (
      'home.hero.title',
      E'Votre expertise.\nVotre liberté.\nUn cadre qui vous protège.',
      E'Votre projet\nNotre\naccompagnement\nUne collaboration\ndurable'
    ),
    (
      'home.hero.description',
      'Vous développez vos missions. The Porters transforme votre activité en salaire et prend en charge les contrats, la facturation, la paie et le suivi administratif.',
      'Nous vous accompagnons avec réactivité, proximité et transparence, afin que vous puissiez vous consacrer pleinement à votre expertise.'
    ),
    (
      'home.hero.enterprise_cta',
      'Je suis une entreprise',
      'Nos solutions entreprises'
    ),
    (
      'home.hero.trust.interlocutors',
      'Interlocuteurs identifiés',
      'Interlocuteur dédié'
    ),
    (
      'home.hero.trust.employee_framework',
      'Cadre salarié',
      'Statut salarié'
    ),
    (
      'home.hero.trust.it_expertise',
      'Expertise IT',
      'Expertise métier'
    )
),
updated_blocks as (
  update public.cms_content_blocks as block
  set fallback_content = copy.next_content,
      draft_content = copy.next_content,
      published_content = copy.next_content,
      updated_at = now(),
      published_at = now()
  from hero_copy as copy
  where block.content_key = copy.content_key
    and block.published_version = 1
    and block.draft_content = copy.previous_content
    and block.published_content = copy.previous_content
  returning block.id, block.published_content
)
update public.cms_content_versions as version
set content = updated.published_content
from updated_blocks as updated
where version.content_block_id = updated.id
  and version.version_number = 1
  and version.action = 'seed'
  and version.created_by is null;

insert into public.cms_content_blocks (
  content_key,
  route_path,
  element_type,
  fallback_content,
  draft_content,
  published_content,
  draft_format,
  published_format,
  status,
  published_version
)
values (
  'home.hero.trust.secured_missions',
  '/',
  'list_item',
  'Missions sécurisées',
  'Missions sécurisées',
  'Missions sécurisées',
  '{}'::jsonb,
  '{}'::jsonb,
  'published',
  1
)
on conflict (content_key) do update
set route_path = excluded.route_path,
    element_type = excluded.element_type,
    fallback_content = excluded.fallback_content;

insert into public.cms_content_versions (
  content_block_id,
  version_number,
  content,
  format,
  action
)
select
  block.id,
  1,
  block.published_content,
  block.published_format,
  'seed'
from public.cms_content_blocks as block
where block.content_key = 'home.hero.trust.secured_missions'
  and block.published_version = 1
  and not exists (
    select 1
    from public.cms_content_versions as version
    where version.content_block_id = block.id
      and version.version_number = 1
  );
