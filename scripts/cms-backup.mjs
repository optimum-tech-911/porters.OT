/**
 * READ-ONLY snapshot of every CMS table the publishing/migration process can
 * modify. Must be run before any Supabase write.
 *
 * Scope was determined from the repo, not assumed. The seed migration and the
 * cms_publish_content / cms_restore_version / cms_save_draft functions all write
 * to three tables after the activity-audit migration:
 *
 *   cms_content_blocks     draft + published state per content key
 *   cms_content_versions   immutable published snapshots
 *   cms_content_activity   immutable per-account before/after audit
 *
 * cms_admins is created by the CMS migration but never written by the seed, so
 * it is captured as well: it is small, and losing the allow-list would lock every
 * administrator out of the editor. cms_published_content is a view over
 * cms_content_blocks and therefore needs no separate snapshot.
 *
 * SAFETY
 *   - Issues SELECT only. No INSERT/UPDATE/DELETE/DDL appears in this file.
 *   - Uses the same connection approach as scripts/create-cms-admin.mjs: the
 *     Management API, authenticated with SUPABASE_ACCESS_TOKEN from the
 *     environment.
 *   - The token is never printed, never written to disk, never committed.
 *   - Exported row counts are verified against COUNT(*) taken in the same run;
 *     any mismatch or unreadable table fails the script with a non-zero exit.
 *
 * Usage:  SUPABASE_ACCESS_TOKEN='...' npm run cms:backup
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const token = process.env.SUPABASE_ACCESS_TOKEN;
const ref = process.env.SUPABASE_PROJECT_REF || 'qyzpqajotnnairsgdhqu';

if (!token) {
  console.error('SUPABASE_ACCESS_TOKEN is required.');
  console.error('Run:  SUPABASE_ACCESS_TOKEN=\'<token>\' npm run cms:backup');
  process.exit(1);
}

/** Every table the CMS functions can write to. Activity is optional so this
 * script can still create the mandatory backup before its migration exists. */
const TABLES = ['cms_content_blocks', 'cms_content_versions', 'cms_admins'];

async function query(sql) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: sql }),
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${body.slice(0, 300)}`);
  try {
    return JSON.parse(body);
  } catch {
    throw new Error(`Unparseable response: ${body.slice(0, 200)}`);
  }
}

const activityTable = await query(
  `select to_regclass('public.cms_content_activity') is not null as present;`,
);
if (activityTable[0]?.present) TABLES.push('cms_content_activity');

const startedAt = new Date();
const stamp = startedAt.toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, 19);
const outDir = path.join(root, 'cms-backups', stamp);
await mkdir(outDir, { recursive: true });

console.log(`CMS backup — read-only snapshot`);
console.log(`  project : ${ref}`);
console.log(`  output  : cms-backups/${stamp}/\n`);

const manifestTables = [];
let failed = false;

for (const table of TABLES) {
  process.stdout.write(`  ${table.padEnd(22)}`);
  try {
    // Count and export are separate statements so the export can be verified
    // against an independently taken count from the same run.
    const countRows = await query(`select count(*)::int as n from public.${table};`);
    const expected = countRows[0]?.n ?? 0;

    const rows = await query(
      `select coalesce(json_agg(t), '[]'::json) as data from (select * from public.${table}) t;`,
    );
    const data = rows[0]?.data ?? [];
    const actual = Array.isArray(data) ? data.length : 0;

    const json = JSON.stringify(data, null, 0);
    const file = path.join(outDir, `${table}.json`);
    await writeFile(file, json, 'utf8');

    const sha256 = createHash('sha256').update(json).digest('hex');
    const complete = actual === expected;
    if (!complete) failed = true;

    manifestTables.push({
      table,
      rowsInDatabase: expected,
      rowsExported: actual,
      complete,
      bytes: Buffer.byteLength(json),
      sha256,
      file: `${table}.json`,
    });

    console.log(
      `${complete ? '✅' : '❌'} ${actual}/${expected} rows · ${(Buffer.byteLength(json) / 1024).toFixed(0)} KB · ${sha256.slice(0, 12)}…`,
    );
  } catch (error) {
    failed = true;
    manifestTables.push({ table, error: String(error.message || error), complete: false });
    console.log(`❌ ${error.message || error}`);
  }
}

const manifest = {
  createdAt: startedAt.toISOString(),
  projectRef: ref,
  purpose: 'Pre-migration read-only snapshot of writable CMS tables.',
  scopeRationale:
    'cms_content_blocks, cms_content_versions, and (when installed) cms_content_activity are written by ' +
    'the CMS functions. cms_admins is included because ' +
    'losing the allow-list would lock administrators out. cms_published_content is a view and ' +
    'needs no separate snapshot.',
  tables: manifestTables,
  complete: !failed,
};
await writeFile(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

console.log();
if (failed) {
  console.error('❌ Backup INCOMPLETE. Do not run any migration or write.');
  console.error('   See cms-backups/' + stamp + '/manifest.json');
  process.exit(1);
}
const total = manifestTables.reduce((n, t) => n + t.rowsExported, 0);
console.log(`✅ Backup complete and verified — ${total} rows across ${TABLES.length} tables.`);
console.log(`   cms-backups/${stamp}/manifest.json`);
