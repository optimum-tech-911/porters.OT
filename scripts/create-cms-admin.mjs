const token = process.env.SUPABASE_ACCESS_TOKEN;
const ref = process.env.SUPABASE_PROJECT_REF || 'qyzpqajotnnairsgdhqu';
const email = process.env.CMS_ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.CMS_ADMIN_PASSWORD;
const displayName = process.env.CMS_ADMIN_NAME?.trim();
const role = process.env.CMS_ADMIN_ROLE === 'editor' ? 'editor' : 'owner';

if (!token || !email || !displayName) {
  throw new Error('SUPABASE_ACCESS_TOKEN, CMS_ADMIN_EMAIL, and CMS_ADMIN_NAME are required.');
}
if (password && password.length < 12) throw new Error('CMS_ADMIN_PASSWORD must contain at least 12 characters.');

const base = `https://${ref}.supabase.co`;
const managementBase = `https://api.supabase.com/v1/projects/${ref}`;

const keysResponse = await fetch(`${managementBase}/api-keys`, {
  headers: { Authorization: `Bearer ${token}` },
});
if (!keysResponse.ok) throw new Error(`Unable to load project keys (${keysResponse.status}).`);
const keys = await keysResponse.json();
const serviceKey = keys.find((key) => key.name === 'service_role')?.api_key;
if (!serviceKey) throw new Error('The project service-role key is unavailable.');

const usersResponse = await fetch(`${base}/auth/v1/admin/users?per_page=1000`, {
  headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
});
if (!usersResponse.ok) throw new Error(`Unable to list Auth users (${usersResponse.status}).`);
const usersPayload = await usersResponse.json();
let user = usersPayload.users?.find((candidate) => candidate.email?.toLowerCase() === email);

if (!user) {
  if (!password) throw new Error('CMS_ADMIN_PASSWORD is required when creating a new Auth user.');
  const createResponse = await fetch(`${base}/auth/v1/admin/users`, {
    method: 'POST',
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, email_confirm: true }),
  });
  if (!createResponse.ok) throw new Error(`Unable to create Auth user (${createResponse.status}): ${await createResponse.text()}`);
  user = await createResponse.json();
  console.log(`Created Supabase Auth user for ${email}.`);
} else {
  console.log(`Using existing Supabase Auth user for ${email}.`);
}

const escapedName = displayName.replaceAll("'", "''");
const query = `
  insert into public.cms_admins (user_id, display_name, role, enabled)
  values ('${user.id}', '${escapedName}', '${role}', true)
  on conflict (user_id) do update
  set display_name = excluded.display_name,
      role = excluded.role,
      enabled = true;
`;
const approveResponse = await fetch(`${managementBase}/database/query`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ query }),
});
if (!approveResponse.ok) throw new Error(`Unable to approve CMS administrator (${approveResponse.status}): ${await approveResponse.text()}`);
console.log(`Approved ${email} as CMS ${role}.`);
