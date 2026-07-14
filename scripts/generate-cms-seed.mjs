import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = path.join(root, 'src/cms/content-registry.json');
const migrationPath = path.join(root, 'supabase/migrations/20260714150100_seed_homepage_cms.sql');
const registry = JSON.parse(await readFile(registryPath, 'utf8'));

const quote = (value) => `'${String(value).replaceAll("'", "''")}'`;
const rows = registry.map((entry) =>
  `  (${quote(entry.key)}, ${quote(entry.route)}, ${quote(entry.type)}, ${quote(entry.content)})`,
);

const sql = `-- Generated from src/cms/content-registry.json by scripts/generate-cms-seed.mjs.
-- Re-run npm run cms:seed after changing registered fallback content.

insert into public.cms_content_blocks (
  content_key, route_path, element_type, fallback_content,
  draft_content, published_content, draft_format, published_format,
  status, published_version
)
select
  seed.content_key, seed.route_path, seed.element_type, seed.content,
  seed.content, seed.content, '{}'::jsonb, '{}'::jsonb,
  'published', 1
from (values
${rows.join(',\n')}
) as seed(content_key, route_path, element_type, content)
on conflict (content_key) do update
set route_path = excluded.route_path,
    element_type = excluded.element_type,
    fallback_content = excluded.fallback_content;

insert into public.cms_content_versions (
  content_block_id, version_number, content, format, action
)
select block.id, 1, block.published_content, block.published_format, 'seed'
from public.cms_content_blocks as block
where block.published_version = 1
  and not exists (
    select 1 from public.cms_content_versions as version
    where version.content_block_id = block.id and version.version_number = 1
  );
`;

await writeFile(migrationPath, sql);
console.log(`Generated ${path.relative(root, migrationPath)} with ${registry.length} content keys.`);
