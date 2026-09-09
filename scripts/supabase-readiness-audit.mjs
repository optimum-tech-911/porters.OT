/** Read-only audit of the linked Supabase project's schema and rollout state. */
const token = process.env.SUPABASE_ACCESS_TOKEN;
const ref = process.env.SUPABASE_PROJECT_REF || 'qyzpqajotnnairsgdhqu';
if (!token) throw new Error('SUPABASE_ACCESS_TOKEN is required.');

async function query(sql) {
  const response = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: sql }),
  });
  const body = await response.text();
  if (!response.ok) throw new Error(`Supabase audit failed (${response.status}): ${body.slice(0, 300)}`);
  return JSON.parse(body);
}

const sections = {
  public_tables: `
    select c.table_name, coalesce(s.n_live_tup, 0)::int as estimated_rows
    from information_schema.tables c
    left join pg_stat_user_tables s on s.schemaname = c.table_schema and s.relname = c.table_name
    where c.table_schema = 'public' and c.table_type = 'BASE TABLE'
    order by c.table_name;`,
  crm_columns: `
    select table_name, column_name, data_type, is_nullable
    from information_schema.columns
    where table_schema = 'public' and table_name in (
      'contact_inquiries','candidate_applications','company_inquiries','appointment_requests',
      'newsletter_subscriptions','calculator_submissions','crm_inquiries'
    ) order by table_name, ordinal_position;`,
  rpc_functions: `
    select p.proname as function_name, pg_get_function_identity_arguments(p.oid) as arguments
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and (p.proname like 'cms_%' or p.proname like '%inquir%' or p.proname like '%application%' or p.proname like '%appointment%')
    order by p.proname;`,
  rls_policies: `
    select tablename, policyname, cmd, roles, qual, with_check
    from pg_policies where schemaname = 'public'
      and tablename in ('cms_content_blocks','cms_content_activity','crm_inquiries')
    order by tablename, policyname;`,
  storage_buckets: `
    select id, public, file_size_limit, allowed_mime_types
    from storage.buckets
    where id in ('site-notifications', 'team-portraits')
    order by id;`,
  storage_policies: `
    select policyname, cmd, roles, qual, with_check
    from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname in (
        'CMS administrators upload notification images',
        'CMS administrators upload team portraits'
      )
    order by policyname;`,
  settings: `
    select content_key, route_path, status, published_version,
      published_content is not null as published,
      published_content::jsonb ->> 'enabled' as enabled,
      published_content::jsonb ->> 'intervalSeconds' as interval_seconds,
      published_content::jsonb ->> 'managementFee' as management_fee,
      published_content::jsonb ->> 'leadCaptureEnabled' as lead_capture_enabled,
      jsonb_array_length(coalesce(published_content::jsonb -> 'messages', '[]'::jsonb)) as message_count,
      jsonb_array_length(coalesce(published_content::jsonb -> 'members', '[]'::jsonb)) as member_count,
      (
        select jsonb_agg(jsonb_build_object(
          'id', message ->> 'id',
          'enabled', message ->> 'enabled',
          'showImage', message ->> 'showImage'
        ) order by position)
        from jsonb_array_elements(coalesce(published_content::jsonb -> 'messages', '[]'::jsonb))
          with ordinality as messages(message, position)
      ) as message_state
    from public.cms_content_blocks
    where content_key in ('site.notifications.settings.v1','site.team.settings.v1','simulator.mula.settings.v1','simulator.formula.settings.v1')
    order by content_key;`,
  release_copy: `
    select content_key, published_content
    from public.cms_content_blocks
    where content_key in (
      'home.final_cta.title',
      'home.final_cta.simulator',
      'home.final_cta.advisor',
      'portage.comparison.status.sasu',
      'portage.comparison.status.eurl'
    )
    order by content_key;`,
};

const report = { project: ref };
const migrationTable = await query(`select to_regclass('supabase_migrations.schema_migrations')::text as relation;`);
report.migrations = migrationTable[0]?.relation
  ? await query(`select version, name from supabase_migrations.schema_migrations order by version;`)
  : { tracked: false, note: 'This project was provisioned without Supabase CLI migration history.' };
for (const [name, sql] of Object.entries(sections)) {
  try { report[name] = await query(sql); }
  catch (error) { report[name] = { error: error.message }; }
}
console.log(JSON.stringify(report, null, 2));
