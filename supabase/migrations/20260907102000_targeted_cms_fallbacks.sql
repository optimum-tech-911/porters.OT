-- Publish only the copy changes required by the current release.
-- Existing administrator edits are preserved: published/draft values are
-- replaced only when they still equal the former code fallback.
begin;

create temporary table cms_release_copy (
  content_key text primary key,
  route_path text not null,
  element_type text not null,
  previous_content text,
  next_content text not null
) on commit drop;

insert into cms_release_copy (
  content_key, route_path, element_type, previous_content, next_content
)
values
  (
    'contactform.label.submit',
    '/_global',
    'button',
    'Préparer l’email',
    'Envoyer ma demande'
  ),
  (
    'home.jobs.brand_free.description',
    '/',
    'paragraph',
    null,
    'Une opportunité vous intéresse ? Notre équipe vous accompagne dans la suite du processus.'
  ),
  (
    'home.jobs.brand_free.external_cta',
    '/',
    'button',
    null,
    'Découvrez nos offres en ligne ici'
  ),
  (
    'home.jobs.brand_free.platform',
    '/',
    'label',
    null,
    'Nos offres en ligne'
  ),
  (
    'pages.expertises.auto.paragraph.1fhmd08',
    '/expertises',
    'paragraph',
    '01 · Le brief',
    'Le brief'
  ),
  (
    'pages.expertises.auto.paragraph.fuzf87',
    '/expertises',
    'paragraph',
    '02 · Le choix',
    'Le choix'
  ),
  (
    'pages.expertises.auto.paragraph.v2c6eu',
    '/expertises',
    'paragraph',
    '03 · La sortie',
    'La sortie'
  );

do $migration$
declare
  copy cms_release_copy%rowtype;
  block public.cms_content_blocks%rowtype;
  previous_published text;
  next_draft text;
  next_published text;
  next_status text;
  next_version integer;
  created_version_id bigint;
begin
  for copy in select * from cms_release_copy order by content_key loop
    select * into block
    from public.cms_content_blocks
    where content_key = copy.content_key
    for update;

    if not found then
      insert into public.cms_content_blocks (
        content_key,
        route_path,
        element_type,
        fallback_content,
        draft_content,
        published_content
      ) values (
        copy.content_key,
        copy.route_path,
        copy.element_type,
        copy.next_content,
        copy.next_content,
        copy.next_content
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
    next_draft := case
      when copy.previous_content is not null
        and block.draft_content = copy.previous_content
        then copy.next_content
      else block.draft_content
    end;
    next_published := case
      when copy.previous_content is not null
        and block.published_content = copy.previous_content
        then copy.next_content
      else block.published_content
    end;
    next_status := case
      when next_draft = next_published
        and block.draft_format = block.published_format then 'published'
      else 'draft'
    end;

    if next_published is distinct from block.published_content then
      next_version := block.published_version + 1;

      update public.cms_content_blocks
      set route_path = copy.route_path,
          element_type = copy.element_type,
          fallback_content = copy.next_content,
          draft_content = next_draft,
          published_content = next_published,
          status = next_status,
          published_version = next_version,
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
      set route_path = copy.route_path,
          element_type = copy.element_type,
          fallback_content = copy.next_content,
          draft_content = next_draft,
          status = next_status
      where id = block.id;
    end if;
  end loop;
end;
$migration$;

commit;
