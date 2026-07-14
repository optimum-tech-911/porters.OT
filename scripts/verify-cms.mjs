import { randomBytes } from 'node:crypto';

const token = process.env.SUPABASE_ACCESS_TOKEN;
const ref = process.env.SUPABASE_PROJECT_REF || 'qyzpqajotnnairsgdhqu';
if (!token) throw new Error('SUPABASE_ACCESS_TOKEN is required.');

const base = `https://${ref}.supabase.co`;
const managementBase = `https://api.supabase.com/v1/projects/${ref}`;
const email = `codex-cms-verification-${Date.now()}@example.invalid`;
const password = `Tmp-${randomBytes(18).toString('base64url')}`;
let serviceKey;
let publishableKey;
let userId;

async function managementQuery(query) {
  const response = await fetch(`${managementBase}/database/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  if (!response.ok) throw new Error(`SQL ${response.status}: ${await response.text()}`);
  return response.json();
}

async function loadKeys() {
  const response = await fetch(`${managementBase}/api-keys`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(`API keys ${response.status}`);
  const keys = await response.json();
  serviceKey = keys.find((key) => key.name === 'service_role')?.api_key;
  publishableKey = keys.find((key) => key.type === 'publishable')?.api_key;
  if (!serviceKey || !publishableKey) throw new Error('Required Supabase API keys are unavailable.');
}

async function rest(path, accessToken, options = {}) {
  const response = await fetch(`${base}${path}`, {
    ...options,
    headers: {
      apikey: publishableKey,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  });
  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }
  return { status: response.status, data };
}

async function verify() {
  await loadKeys();

  const registered = await fetch(`${base}/auth/v1/signup`, {
    method: 'POST',
    headers: {
      apikey: publishableKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (!registered.ok) throw new Error(`Public sign-up ${registered.status}: ${await registered.text()}`);
  const registration = await registered.json();
  userId = registration.user?.id || registration.id;
  if (!userId) throw new Error('Public sign-up did not return a user id.');
  console.log('public account registration:', registered.status, 'created without CMS role');

  const confirmed = await fetch(`${base}/auth/v1/admin/users/${userId}`, {
    method: 'PUT',
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email_confirm: true }),
  });
  if (!confirmed.ok) throw new Error(`Confirm test user ${confirmed.status}: ${await confirmed.text()}`);

  const login = await fetch(`${base}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { apikey: publishableKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!login.ok) throw new Error(`Test login ${login.status}: ${await login.text()}`);
  const accessToken = (await login.json()).access_token;

  const before = await rest('/rest/v1/cms_content_blocks?select=id&limit=1', accessToken);
  console.log('unauthorized table read:', before.status, Array.isArray(before.data) && before.data.length === 0 ? 'blocked' : 'unexpected');
  if (before.status !== 200 || before.data.length !== 0) throw new Error('Non-admin content access was not blocked.');

  await managementQuery(`insert into public.cms_admins(user_id, display_name, role) values ('${userId}', 'CMS verification', 'editor')`);

  const after = await rest('/rest/v1/cms_content_blocks?select=id&limit=1', accessToken);
  console.log('authorized table read:', after.status, Array.isArray(after.data) && after.data.length === 1 ? 'allowed' : 'unexpected');
  if (after.status !== 200 || after.data.length !== 1) throw new Error('Approved admin could not read content.');

  const create = await rest('/rest/v1/rpc/cms_create_content_block', accessToken, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requested_key: 'system.verify.workflow',
      requested_route: '/__cms-test',
      requested_element_type: 'paragraph',
      requested_fallback: 'Initial verification',
    }),
  });
  if (create.status !== 200) throw new Error(`Create RPC ${create.status}: ${JSON.stringify(create.data)}`);

  const save = await rest('/rest/v1/rpc/cms_save_draft', accessToken, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requested_key: 'system.verify.workflow',
      requested_content: 'Draft verification',
      requested_format: { weight: 'semibold', color: 'navy' },
    }),
  });
  if (save.status !== 200) throw new Error(`Save RPC ${save.status}: ${JSON.stringify(save.data)}`);

  const publish = await rest('/rest/v1/rpc/cms_publish_content', accessToken, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ requested_key: 'system.verify.workflow' }),
  });
  if (publish.status !== 200) throw new Error(`Publish RPC ${publish.status}: ${JSON.stringify(publish.data)}`);

  const publicRead = await rest('/rest/v1/cms_published_content?content_key=eq.system.verify.workflow&select=published_content,published_format');
  const published = publicRead.data?.[0]?.published_content === 'Draft verification';
  console.log('draft save and publish:', save.status, publish.status, published ? 'verified' : 'unexpected');
  if (!published) throw new Error('Published content was not visible through the public view.');

  const versions = await rest(
    `/rest/v1/cms_content_versions?content_block_id=eq.${create.data.id}&select=id,version_number&order=version_number.asc`,
    accessToken,
  );
  if (versions.status !== 200 || versions.data.length < 2) throw new Error('Version history verification failed.');

  const restore = await rest('/rest/v1/rpc/cms_restore_version', accessToken, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ requested_version_id: versions.data[0].id }),
  });
  const restored = restore.data?.draft_content === 'Initial verification';
  console.log('history and restore:', versions.data.length, restore.status, restored ? 'verified' : 'unexpected');
  if (restore.status !== 200 || !restored) throw new Error('Version restoration failed.');
}

async function cleanup() {
  if (!userId) return;
  await managementQuery(`
    delete from public.cms_content_blocks where content_key = 'system.verify.workflow';
    delete from public.cms_admins where user_id = '${userId}';
  `);
  if (!serviceKey) await loadKeys();
  const response = await fetch(`${base}/auth/v1/admin/users/${userId}`, {
    method: 'DELETE',
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
  });
  if (!response.ok && response.status !== 404) throw new Error(`Delete test user ${response.status}`);
  console.log('cleanup: complete');
}

try {
  await verify();
} finally {
  await cleanup();
}
