-- Let administrators intentionally hide a visual text block by publishing an
-- empty value, then publish the requested Entreprises removals and seed the
-- structured contact directory. Existing version history remains available.
begin;

alter table public.cms_content_blocks
  drop constraint if exists cms_content_blocks_fallback_content_check,
  drop constraint if exists cms_content_blocks_draft_content_check,
  drop constraint if exists cms_content_blocks_published_content_check;

alter table public.cms_content_blocks
  add constraint cms_content_blocks_fallback_content_check check (char_length(fallback_content) between 0 and 10000),
  add constraint cms_content_blocks_draft_content_check check (char_length(draft_content) between 0 and 10000),
  add constraint cms_content_blocks_published_content_check check (char_length(published_content) between 0 and 10000);

alter table public.cms_content_versions
  drop constraint if exists cms_content_versions_content_check;

alter table public.cms_content_versions
  add constraint cms_content_versions_content_check check (char_length(content) between 0 and 10000);

-- Keep the audit-aware implementation introduced in 20260831120000 while
-- relaxing only its former non-empty validation.
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
  if requested_content is null or char_length(requested_content) > 10000 then
    raise exception 'Content must contain between 0 and 10000 characters' using errcode = '22023';
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

insert into public.cms_content_blocks (
  content_key, route_path, element_type, fallback_content,
  draft_content, published_content
)
values (
  'site.contact.directory.v1',
  '/contact',
  'paragraph',
  $contact${"generalHeading":"Contact général","generalEmail":"contact@porters.fr","agenciesHeading":"Nos agences","agencies":[{"id":"paris","name":"The Porters Paris","address":"27 rue Marbeuf, 75008 Paris","phone":"07 81 46 28 99","email":"clarence@porters.fr","href":"/agences/paris"},{"id":"lyon","name":"The Porters Lyon","address":"4 place Amédée Bonnet, 69002 Lyon","phone":"06 45 32 31 84","email":"simon@porters.fr","href":"/agences/lyon"},{"id":"aix-en-provence","name":"The Porters Aix-en-Provence","address":"Rendez-vous à distance ou selon les modalités confirmées par l’équipe.","phone":"","email":"contact@porters.fr","href":"/agences/aix-en-provence"},{"id":"marseille","name":"The Porters Marseille","address":"Rendez-vous à distance ou selon les modalités confirmées par l’équipe.","phone":"07 68 67 08 50","email":"ebensaid@porters.fr","href":"/agences/marseille"},{"id":"montpellier","name":"The Porters Montpellier","address":"120 rue de Thor, 34000 Montpellier","phone":"07 68 67 08 50","email":"ebensaid@porters.fr","href":"/agences/montpellier"},{"id":"toulouse","name":"The Porters Toulouse","address":"Rendez-vous à distance ou selon les modalités confirmées par l’équipe.","phone":"","email":"contact@porters.fr","href":"/agences/toulouse"}],"directoryLinkLabel":"Voir toutes nos agences","directoryLinkHref":"/agences"}$contact$,
  $contact${"generalHeading":"Contact général","generalEmail":"contact@porters.fr","agenciesHeading":"Nos agences","agencies":[{"id":"paris","name":"The Porters Paris","address":"27 rue Marbeuf, 75008 Paris","phone":"07 81 46 28 99","email":"clarence@porters.fr","href":"/agences/paris"},{"id":"lyon","name":"The Porters Lyon","address":"4 place Amédée Bonnet, 69002 Lyon","phone":"06 45 32 31 84","email":"simon@porters.fr","href":"/agences/lyon"},{"id":"aix-en-provence","name":"The Porters Aix-en-Provence","address":"Rendez-vous à distance ou selon les modalités confirmées par l’équipe.","phone":"","email":"contact@porters.fr","href":"/agences/aix-en-provence"},{"id":"marseille","name":"The Porters Marseille","address":"Rendez-vous à distance ou selon les modalités confirmées par l’équipe.","phone":"07 68 67 08 50","email":"ebensaid@porters.fr","href":"/agences/marseille"},{"id":"montpellier","name":"The Porters Montpellier","address":"120 rue de Thor, 34000 Montpellier","phone":"07 68 67 08 50","email":"ebensaid@porters.fr","href":"/agences/montpellier"},{"id":"toulouse","name":"The Porters Toulouse","address":"Rendez-vous à distance ou selon les modalités confirmées par l’équipe.","phone":"","email":"contact@porters.fr","href":"/agences/toulouse"}],"directoryLinkLabel":"Voir toutes nos agences","directoryLinkHref":"/agences"}$contact$,
  $contact${"generalHeading":"Contact général","generalEmail":"contact@porters.fr","agenciesHeading":"Nos agences","agencies":[{"id":"paris","name":"The Porters Paris","address":"27 rue Marbeuf, 75008 Paris","phone":"07 81 46 28 99","email":"clarence@porters.fr","href":"/agences/paris"},{"id":"lyon","name":"The Porters Lyon","address":"4 place Amédée Bonnet, 69002 Lyon","phone":"06 45 32 31 84","email":"simon@porters.fr","href":"/agences/lyon"},{"id":"aix-en-provence","name":"The Porters Aix-en-Provence","address":"Rendez-vous à distance ou selon les modalités confirmées par l’équipe.","phone":"","email":"contact@porters.fr","href":"/agences/aix-en-provence"},{"id":"marseille","name":"The Porters Marseille","address":"Rendez-vous à distance ou selon les modalités confirmées par l’équipe.","phone":"07 68 67 08 50","email":"ebensaid@porters.fr","href":"/agences/marseille"},{"id":"montpellier","name":"The Porters Montpellier","address":"120 rue de Thor, 34000 Montpellier","phone":"07 68 67 08 50","email":"ebensaid@porters.fr","href":"/agences/montpellier"},{"id":"toulouse","name":"The Porters Toulouse","address":"Rendez-vous à distance ou selon les modalités confirmées par l’équipe.","phone":"","email":"contact@porters.fr","href":"/agences/toulouse"}],"directoryLinkLabel":"Voir toutes nos agences","directoryLinkHref":"/agences"}$contact$
)
on conflict (content_key) do nothing;

insert into public.cms_content_versions (
  content_block_id, version_number, content, format, action
)
select block.id, block.published_version, block.published_content, block.published_format, 'seed'
from public.cms_content_blocks as block
where block.content_key = 'site.contact.directory.v1'
  and not exists (
    select 1 from public.cms_content_versions as version
    where version.content_block_id = block.id
      and version.version_number = block.published_version
  );

create temporary table cms_requested_enterprise_removals (
  content_key text primary key,
  next_content text not null
) on commit drop;

insert into cms_requested_enterprise_removals (content_key, next_content)
values
  ('pages.entreprises.auto.paragraph.1iwezo3', ''),
  ('pages.entreprises.auto.paragraph.doqh5b', ''),
  ('pages.entreprises.auto.heading.pmn40x', 'Trois missions, racontées.');

do $migration$
declare
  requested cms_requested_enterprise_removals%rowtype;
  block public.cms_content_blocks%rowtype;
  previous_published text;
  created_version_id bigint;
begin
  for requested in select * from cms_requested_enterprise_removals order by content_key loop
    select * into block
    from public.cms_content_blocks
    where content_key = requested.content_key
    for update;

    if not found then
      insert into public.cms_content_blocks (
        content_key, route_path, element_type,
        fallback_content, draft_content, published_content
      ) values (
        requested.content_key,
        '/entreprises',
        case when requested.content_key like '%.heading.%' then 'heading' else 'paragraph' end,
        requested.next_content,
        requested.next_content,
        requested.next_content
      ) returning * into block;

      insert into public.cms_content_versions (
        content_block_id, version_number, content, format, action
      ) values (
        block.id, block.published_version, block.published_content,
        block.published_format, 'seed'
      ) returning id into created_version_id;

      insert into public.cms_content_activity (
        content_block_id, content_key, route_path, action,
        previous_content, new_content, previous_format, new_format,
        changed_by, source_version_id
      ) values (
        block.id, block.content_key, block.route_path, 'create',
        null, block.published_content, null, block.published_format,
        null, created_version_id
      );
      continue;
    end if;

    previous_published := block.published_content;

    if block.published_content is distinct from requested.next_content then
      update public.cms_content_blocks
      set fallback_content = requested.next_content,
          draft_content = requested.next_content,
          published_content = requested.next_content,
          draft_format = published_format,
          status = 'published',
          published_version = published_version + 1,
          published_at = now()
      where id = block.id
      returning * into block;

      insert into public.cms_content_versions (
        content_block_id, version_number, content, format, action
      ) values (
        block.id, block.published_version, block.published_content,
        block.published_format, 'publish'
      ) returning id into created_version_id;

      insert into public.cms_content_activity (
        content_block_id, content_key, route_path, action,
        previous_content, new_content, previous_format, new_format,
        changed_by, source_version_id
      ) values (
        block.id, block.content_key, block.route_path, 'publish',
        previous_published, block.published_content,
        block.published_format, block.published_format,
        null, created_version_id
      );
    else
      update public.cms_content_blocks
      set fallback_content = requested.next_content,
          draft_content = requested.next_content,
          draft_format = published_format,
          status = 'published'
      where id = block.id;
    end if;
  end loop;
end;
$migration$;

commit;
