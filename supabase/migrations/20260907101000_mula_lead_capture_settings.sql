-- Add CRM lead-capture controls without overwriting simulator choices already
-- published by an administrator. Record the enriched document as a new version.
begin;

do $migration$
declare
  block public.cms_content_blocks;
  previous_content text;
  next_fallback text;
  next_draft text;
  next_published text;
  version_id bigint;
begin
  select * into block
  from public.cms_content_blocks
  where content_key = 'simulator.mula.settings.v1'
  for update;

  if found and not (
    block.published_content::jsonb ? 'leadCaptureEnabled'
    and block.published_content::jsonb ? 'leadTitle'
    and block.published_content::jsonb ? 'leadSubmitLabel'
  ) then
    previous_content := block.published_content;
    next_fallback := (
      block.fallback_content::jsonb || jsonb_build_object(
        'leadCaptureEnabled', coalesce((block.fallback_content::jsonb ->> 'leadCaptureEnabled')::boolean, true),
        'leadTitle', coalesce(block.fallback_content::jsonb ->> 'leadTitle', 'Recevez cette simulation et faites-la relire'),
        'leadSubmitLabel', coalesce(block.fallback_content::jsonb ->> 'leadSubmitLabel', 'Transmettre ma simulation')
      )
    )::text;
    next_draft := (
      block.draft_content::jsonb || jsonb_build_object(
        'leadCaptureEnabled', coalesce((block.draft_content::jsonb ->> 'leadCaptureEnabled')::boolean, true),
        'leadTitle', coalesce(block.draft_content::jsonb ->> 'leadTitle', 'Recevez cette simulation et faites-la relire'),
        'leadSubmitLabel', coalesce(block.draft_content::jsonb ->> 'leadSubmitLabel', 'Transmettre ma simulation')
      )
    )::text;
    next_published := (
      block.published_content::jsonb || jsonb_build_object(
        'leadCaptureEnabled', true,
        'leadTitle', 'Recevez cette simulation et faites-la relire',
        'leadSubmitLabel', 'Transmettre ma simulation'
      )
    )::text;

    update public.cms_content_blocks
    set fallback_content = next_fallback,
        draft_content = next_draft,
        published_content = next_published,
        published_version = block.published_version + 1,
        published_at = now()
    where id = block.id
    returning * into block;

    insert into public.cms_content_versions (
      content_block_id, version_number, content, format, action
    ) values (
      block.id, block.published_version, block.published_content, block.published_format, 'seed'
    ) returning id into version_id;

    insert into public.cms_content_activity (
      content_block_id, content_key, route_path, action,
      previous_content, new_content, previous_format, new_format,
      changed_by, source_version_id
    ) values (
      block.id, block.content_key, block.route_path, 'publish',
      previous_content, block.published_content, block.published_format, block.published_format,
      null, version_id
    );
  end if;
end;
$migration$;

commit;
