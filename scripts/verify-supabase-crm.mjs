/** Verifies the production CRM permission boundary without retaining test data. */
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
  if (!response.ok) throw new Error(`Supabase CRM verification failed (${response.status}): ${body.slice(0, 500)}`);
  return body ? JSON.parse(body) : [];
}

const permissions = await query(`
  select
    c.relrowsecurity as rls_enabled,
    has_table_privilege('anon', 'public.crm_inquiries', 'insert') as anon_can_insert,
    has_table_privilege('anon', 'public.crm_inquiries', 'select') as anon_can_select,
    has_table_privilege('anon', 'public.crm_inquiries', 'update') as anon_can_update,
    has_table_privilege('anon', 'public.crm_inquiries', 'delete') as anon_can_delete,
    has_table_privilege('anon', 'public.crm_inquiries', 'truncate') as anon_can_truncate,
    has_table_privilege('anon', 'public.crm_inquiries', 'references') as anon_can_reference,
    has_table_privilege('anon', 'public.crm_inquiries', 'trigger') as anon_can_trigger,
    count(*) filter (where p.cmd = 'INSERT' and 'anon' = any(p.roles)) as public_insert_policies,
    count(*) filter (where p.cmd = 'SELECT' and 'authenticated' = any(p.roles)) as admin_select_policies,
    count(*) filter (where p.cmd = 'UPDATE' and 'authenticated' = any(p.roles)) as admin_update_policies
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  left join pg_policies p on p.schemaname = n.nspname and p.tablename = c.relname
  where n.nspname = 'public' and c.relname = 'crm_inquiries'
  group by c.relrowsecurity;
`);

const state = permissions[0];
if (
  !state?.rls_enabled
  || !state.anon_can_insert
  || state.anon_can_select
  || state.anon_can_update
  || state.anon_can_delete
  || state.anon_can_truncate
  || state.anon_can_reference
  || state.anon_can_trigger
) {
  throw new Error(`Unexpected CRM grants: ${JSON.stringify(state)}`);
}
if (Number(state.public_insert_policies) !== 1 || Number(state.admin_select_policies) < 1 || Number(state.admin_update_policies) < 1) {
  throw new Error(`Unexpected CRM policies: ${JSON.stringify(state)}`);
}

await query(`
  begin;
  set local role anon;

  insert into public.crm_inquiries
    (kind, inquiry_type, source, status, priority, name, email, message, consent, metadata)
  values
    ('contact', 'contact', 'website', 'new', 'medium', 'CRM verification', 'contact@example.invalid', 'Valid contact request', true, '{"test":true}'::jsonb),
    ('contact', 'appointment', 'website', 'new', 'high', 'CRM verification', 'appointment@example.invalid', 'Valid appointment request', true, '{"test":true}'::jsonb),
    ('contact', 'application', 'website', 'new', 'medium', 'CRM verification', 'application@example.invalid', 'Valid application request', true, '{"test":true}'::jsonb);

  insert into public.crm_inquiries
    (kind, inquiry_type, source, status, priority, first_name, last_name, name, email, phone, profile, message, monthly_revenue, professional_expenses, consent, metadata)
  values
    ('simulation', 'simulation', 'website', 'new', 'medium', 'CRM', 'Verification', 'CRM Verification', 'simulation@example.invalid', '0600000000', 'Consultant indépendant', 'Valid simulation request', 10000, 0, true, '{"test":true}'::jsonb);

  rollback;
`);

console.log('Supabase CRM verified: RLS enabled; four public request types accepted; no test records retained.');
