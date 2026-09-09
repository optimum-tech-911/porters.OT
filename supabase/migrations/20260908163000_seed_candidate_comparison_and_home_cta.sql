-- Seed the new release copy without replacing content already edited by an administrator.
-- Existing home CTA copy is upgraded only while it still matches the former fallback.
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
  ('home.final_cta.eyebrow', '/', 'label', 'Votre prochaine étape', 'Et maintenant ?'),
  ('home.final_cta.title', '/', 'heading', 'Voyez ce que votre TJM donne en net.', 'Prêt à vous lancer ?'),
  ('home.final_cta.description', '/', 'paragraph', null, 'Le simulateur vous donne un ordre de grandeur en deux minutes. Un conseiller reprend ensuite vos hypothèses avec vous.'),
  ('home.final_cta.simulator', '/', 'button', 'Ouvrir le simulateur', 'Je simule mes revenus'),
  ('home.final_cta.advisor', '/', 'button', 'Parler à un conseiller', 'Je parle à un conseiller'),
  ('portage.comparison.status.sasu', '/portage-salarial', 'button', null, 'SASU'),
  ('portage.comparison.status.eurl', '/portage-salarial', 'button', null, 'EURL'),
  ('portage.comparison.sasu.0', '/portage-salarial', 'paragraph', null, 'Président assimilé salarié'),
  ('portage.comparison.eurl.0', '/portage-salarial', 'paragraph', null, 'Gérant associé : travailleur non salarié'),
  ('portage.comparison.sasu.1', '/portage-salarial', 'paragraph', null, 'Engagée par la société'),
  ('portage.comparison.eurl.1', '/portage-salarial', 'paragraph', null, 'Engagée par la société'),
  ('portage.comparison.sasu.2', '/portage-salarial', 'paragraph', null, 'Comptabilité et obligations de société'),
  ('portage.comparison.eurl.2', '/portage-salarial', 'paragraph', null, 'Comptabilité et obligations de société'),
  ('portage.comparison.sasu.3', '/portage-salarial', 'paragraph', null, 'Pas d’assurance chômage au seul titre du mandat'),
  ('portage.comparison.eurl.3', '/portage-salarial', 'paragraph', null, 'Pas d’assurance chômage pour le gérant associé'),
  ('portage.comparison.sasu.4', '/portage-salarial', 'paragraph', null, 'Régime général sur la rémunération'),
  ('portage.comparison.eurl.4', '/portage-salarial', 'paragraph', null, 'Régime des indépendants pour le gérant associé'),
  ('portage.comparison.sasu.5', '/portage-salarial', 'paragraph', null, 'Aucun plafond propre à la SASU'),
  ('portage.comparison.eurl.5', '/portage-salarial', 'paragraph', null, 'Aucun plafond propre à l’EURL');

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
