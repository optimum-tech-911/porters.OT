-- Site notifications and public team; existing published settings are preserved.
-- Apply after taking a CMS backup. This migration does not touch simulator settings.
begin;
insert into public.cms_content_blocks (content_key, route_path, element_type, fallback_content, draft_content, published_content)
select seed.key, seed.route, 'paragraph', seed.content, seed.content, seed.content
from (values
  ('site.notifications.settings.v1', '/', '{"enabled":true,"position":"bottom-left","intervalSeconds":120,"firstDelaySeconds":0,"durationSeconds":16,"messages":[{"id":"first-month","enabled":true,"showImage":true,"image":"","imageAlt":"","badge":"1er mois","title":"Salaire dès le premier mois","text":"Votre mission démarre. Votre rémunération aussi.","linkLabel":"Découvrir le portage","href":"/portage-salarial"},{"id":"opportunity-1","enabled":true,"showImage":true,"image":"","imageAlt":"","badge":"Opportunité","title":"Ingénieur d’Exploitation Senior OpenVMS – Infrastructure & Production H/F","text":"70 000 – 85 000 € / an · Montigny-le-Bretonneux","linkLabel":"Découvrir nos offres","href":"https://www.hellowork.com/fr-fr/entreprises/the-porters-171310.html"},{"id":"opportunity-2","enabled":true,"showImage":true,"image":"","imageAlt":"","badge":"Opportunité","title":"Intégrateur Applicatif H/F","text":"55 000 – 65 000 € / an · Saint-Étienne","linkLabel":"Découvrir nos offres","href":"https://www.hellowork.com/fr-fr/entreprises/the-porters-171310.html"},{"id":"opportunity-3","enabled":true,"showImage":true,"image":"","imageAlt":"","badge":"Opportunité","title":"Data Analyst – Analyste BI H/F","text":"55 000 – 65 000 € / an · Saint-Étienne","linkLabel":"Découvrir nos offres","href":"https://www.hellowork.com/fr-fr/entreprises/the-porters-171310.html"}]}'),
  ('site.team.settings.v1', '/qui-sommes-nous', '{"heading":"Une équipe à votre écoute","intervalSeconds":8,"autoplay":true,"members":[{"id":"ambre","name":"Ambre Lambert","role":"Directrice commerciale IT","quote":"","image":"/images/team/ambre-lambert-800.avif","linkedin":"https://fr.linkedin.com/in/ambrelambert","visible":true},{"id":"eric","name":"Éric Bensaid","role":"Fondateur","quote":"","image":"/images/team/eric-bensaid-800.avif","linkedin":"https://fr.linkedin.com/in/eric-bensaid-73573816","visible":true},{"id":"lisa","name":"Lisa Delrieu","role":"Chargée de recrutement","quote":"","image":"/images/team/lisa-delrieu-800.avif","linkedin":"https://fr.linkedin.com/in/lisa-delrieu","visible":true}]}')
) seed(key, route, content)
on conflict (content_key) do nothing;

insert into public.cms_content_versions (content_block_id, version_number, content, format, action)
select id, published_version, published_content, published_format, 'seed'
from public.cms_content_blocks where content_key in ('site.notifications.settings.v1', 'site.team.settings.v1')
on conflict (content_block_id, version_number) do nothing;

-- Portraits are public website assets. Only approved CMS administrators may upload.
-- Immutable object names preserve portraits referenced by previous CMS versions.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('team-portraits', 'team-portraits', true, 5242880, array['image/webp'])
on conflict (id) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-notifications', 'site-notifications', true, 5242880, array['image/webp'])
on conflict (id) do nothing;

do $migration$
begin
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'CMS administrators upload team portraits') then
    create policy "CMS administrators upload team portraits" on storage.objects
    for insert to authenticated with check (
      bucket_id = 'team-portraits' and public.is_cms_admin()
      and name ~ '^[a-z0-9-]+[.]webp$'
    );
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'CMS administrators upload notification images') then
    create policy "CMS administrators upload notification images" on storage.objects
    for insert to authenticated with check (
      bucket_id = 'site-notifications' and public.is_cms_admin()
      and name ~ '^[a-z0-9-]+[.]webp$'
    );
  end if;
end;
$migration$;
commit;
