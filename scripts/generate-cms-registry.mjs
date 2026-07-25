import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { parse } from 'parse5';
import { INLINE_TAGS, serializeInlineNodes } from '../src/cms/inline-html.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const generatedRegistryPath = path.join(root, 'src/cms/auto-content-registry.json');
const pagesPath = path.join(root, 'src/cms/editable-pages.json');
const migrationPath = path.join(root, 'supabase/migrations/20260714153000_seed_all_routes_cms.sql');
const GLOBAL_ROUTE = '/_global';
const candidates = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'button', 'label', 'li', 'summary', 'blockquote', 'figcaption', 'strong', 'small', 'span']);
const excluded = new Set(['script', 'style', 'svg', 'noscript', 'template']);

function hashString(value) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(36);
}

function routeToken(route) {
  if (route === '/') return 'home';
  return route.slice(1).toLowerCase().replace(/[^a-z0-9/_-]+/g, '-').replaceAll('/', '.');
}

function attribute(node, name) {
  return node.attrs?.find((entry) => entry.name === name)?.value;
}

function hasExcludedAncestor(node, claimed) {
  let current = node;
  while (current) {
    if (excluded.has(current.tagName)) return true;
    if (attribute(current, 'aria-hidden') === 'true' || attribute(current, 'data-cms-ignore') !== undefined) return true;
    if (attribute(current, 'data-cms-key') !== undefined) return true;
    // Mirrors the runtime's closest('[data-cms-key]') test: once a sentence is
    // claimed whole, its inline parts must not become blocks of their own.
    if (claimed?.has(current)) return true;
    current = current.parentNode;
  }
  return false;
}

const LETTER = /[A-Za-zÀ-ÖØ-öø-ÿ]/;

function descendantElements(node, collected = []) {
  for (const child of node.childNodes || []) {
    if (!child.tagName) continue;
    collected.push(child);
    descendantElements(child, collected);
  }
  return collected;
}

/**
 * Walks down to the element that actually owns the text. A wrapper such as
 * `<li><a href="/faq">FAQ</a></li>` must resolve to the anchor: claiming the
 * wrapper would pull the link's markup into the editable copy and would move
 * the block off the key the anchor already owns.
 */
function resolveBlock(node) {
  let current = node;
  for (;;) {
    const hasDirectText = (current.childNodes || [])
      .some((child) => child.nodeName === '#text' && LETTER.test(child.value || ''));
    const elementChildren = (current.childNodes || []).filter((child) => child.tagName);
    if (hasDirectText || elementChildren.length !== 1) return current;
    if (!candidates.has(elementChildren[0].tagName)) return current;
    current = elementChildren[0];
  }
}

/** The parse5 counterpart of isMergeable() in CmsRuntime.astro. */
function isMergeable(node) {
  // Owning text directly is what separates one flowing sentence from a wrapper
  // holding several independent texts, such as a menu entry's title and blurb.
  // The latter must stay separately editable rather than collapse into one field.
  const ownsText = (node.childNodes || [])
    .some((child) => child.nodeName === '#text' && LETTER.test(child.value || ''));
  if (!ownsText) return false;

  return descendantElements(node).every((child) =>
    INLINE_TAGS.has(child.tagName)
    && attribute(child, 'data-cms-key') === undefined
    && attribute(child, 'data-cms-ignore') === undefined);
}

/** Adapts a parse5 tree to the shared emitter in src/cms/inline-html.ts. */
function toInlineNodes(node) {
  const nodes = [];
  for (const child of node.childNodes || []) {
    if (child.nodeName === '#text') {
      nodes.push({ tag: null, text: child.value || '', attributes: [], children: [] });
      continue;
    }
    if (!child.tagName) continue;
    nodes.push({
      tag: child.tagName,
      text: '',
      attributes: (child.attrs || []).map((entry) => [entry.name, entry.value]),
      children: toInlineNodes(child),
    });
  }
  return nodes;
}

/** Serializes a merged block's children under the shared inline markup policy. */
function serializeInline(node) {
  return serializeInlineNodes(toInlineNodes(node));
}

function closest(node, tagName) {
  let current = node;
  while (current) {
    if (current.tagName === tagName) return current;
    current = current.parentNode;
  }
  return null;
}

function nthOfType(node) {
  const siblings = node.parentNode?.childNodes || [];
  let position = 0;
  for (const sibling of siblings) {
    if (sibling.tagName === node.tagName) position += 1;
    if (sibling === node) return position;
  }
  return 1;
}

function structuralPath(node, rootNode) {
  const parts = [];
  let current = node;
  while (current && current !== rootNode) {
    if (current.tagName) parts.unshift(`${current.tagName}:${nthOfType(current)}`);
    current = current.parentNode;
  }
  return parts.join('/');
}

function elementType(tag) {
  if (/^h[1-6]$/.test(tag)) return 'heading';
  if (tag === 'a' || tag === 'button' || tag === 'summary') return 'button';
  if (tag === 'label') return 'label';
  if (tag === 'li') return 'list_item';
  if (tag === 'blockquote') return 'quote';
  return 'paragraph';
}

function walk(node, callback) {
  callback(node);
  for (const child of node.childNodes || []) walk(child, callback);
}

function textContent(node) {
  if (node.nodeName === '#text') return node.value || '';
  return (node.childNodes || []).map(textContent).join('');
}

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(target);
    return entry.isFile() && entry.name.endsWith('.html') ? [target] : [];
  }));
  return nested.flat();
}

function routeForFile(file) {
  const relative = path.relative(dist, file).split(path.sep).join('/');
  if (relative === 'index.html') return '/';
  return `/${relative.replace(/\/index\.html$/, '').replace(/\.html$/, '')}`;
}

const files = (await htmlFiles(dist)).sort();
const registryByKey = new Map();
const pages = [];

for (const file of files) {
  const route = routeForFile(file);
  if (route === '/404' || route.startsWith('/admin')) continue;
  const document = parse(await readFile(file, 'utf8'));
  let body;
  let title = '';
  walk(document, (node) => {
    if (node.tagName === 'body') body = node;
    if (node.tagName === 'title') title = textContent(node).trim();
  });
  if (!body) continue;

  let pageCount = 0;
  const claimed = new Set();

  // Pre-order, so a merged block is always claimed before its inline children
  // are visited — the same ordering guarantee the runtime gets from
  // querySelectorAll returning nodes in document order.
  walk(body, (node) => {
    if (!candidates.has(node.tagName) || hasExcludedAncestor(node, claimed)) return;
    if (!LETTER.test(textContent(node))) return;

    const target = resolveBlock(node);
    if (target !== node && hasExcludedAncestor(target, claimed)) return;

    const main = closest(target, 'main');
    const header = main ? null : closest(target, 'header');
    const footer = main ? null : closest(target, 'footer');
    const scopeRoot = header || footer || main || body;
    const scope = header ? 'global.header' : footer ? 'global.footer' : `pages.${routeToken(route)}`;
    const routePath = header || footer ? GLOBAL_ROUTE : route;
    const nodePath = structuralPath(target, scopeRoot);
    const type = elementType(target.tagName);

    const record = (key, content, rich) => {
      const existing = registryByKey.get(key);
      if (existing && existing.content !== content) {
        throw new Error(`CMS key collision for ${key}: "${existing.content}" / "${content}"`);
      }
      registryByKey.set(key, { key, route: routePath, type, content, ...(rich ? { rich: true } : {}) });
      if (routePath === route) pageCount += 1;
    };

    if (isMergeable(target)) {
      claimed.add(target);
      // Deliberately the historic first-fragment key so blocks that were already
      // a single text node keep the exact key they hold in the database.
      const content = serializeInline(target).trim();
      if (content) record(`${scope}.auto.${type}.${hashString(`${nodePath}|text:1`)}`, content, true);
      return;
    }

    let directTextIndex = 0;
    for (const child of target.childNodes || []) {
      if (child.nodeName !== '#text') continue;
      const content = (child.value || '').trim();
      if (!LETTER.test(content)) continue;
      directTextIndex += 1;
      record(`${scope}.auto.${type}.${hashString(`${nodePath}|text:${directTextIndex}`)}`, content, false);
    }
  });

  const cleanTitle = title.replace(/\s*[|–—-]\s*The Porters.*$/i, '').trim() || (route === '/' ? 'Accueil' : route);
  pages.push({ route, name: route === '/' ? 'Accueil' : cleanTitle, contentCount: pageCount });
}

const autoRegistry = Array.from(registryByKey.values()).sort((left, right) => left.key.localeCompare(right.key));
pages.sort((left, right) => left.route === '/' ? -1 : right.route === '/' ? 1 : left.name.localeCompare(right.name, 'fr'));

await writeFile(generatedRegistryPath, `${JSON.stringify(autoRegistry, null, 2)}\n`);
await writeFile(pagesPath, `${JSON.stringify(pages, null, 2)}\n`);

const explicitRegistry = JSON.parse(await readFile(path.join(root, 'src/cms/content-registry.json'), 'utf8'));
const combined = new Map(autoRegistry.map((entry) => [entry.key, entry]));
for (const entry of explicitRegistry) combined.set(entry.key, entry);
const quote = (value) => `'${String(value).replaceAll("'", "''")}'`;
const rows = Array.from(combined.values()).sort((left, right) => left.key.localeCompare(right.key)).map((entry) =>
  `  (${quote(entry.key)}, ${quote(entry.route)}, ${quote(entry.type)}, ${quote(entry.content)})`,
);

const sql = `-- Generated from the built public routes by scripts/generate-cms-registry.mjs.
-- Idempotent. Administrator edits and version history are never overwritten:
-- a block only adopts the regenerated fallback while its stored content still
-- matches the fallback it was seeded with, which means nobody has touched it.

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
    fallback_content = excluded.fallback_content,
    -- The right-hand side reads the pre-update row, so these comparisons are
    -- against the previous fallback rather than the one being written above.
    draft_content = case
      when cms_content_blocks.draft_content = cms_content_blocks.fallback_content
        then excluded.fallback_content
      else cms_content_blocks.draft_content
    end,
    published_content = case
      when cms_content_blocks.published_content = cms_content_blocks.fallback_content
        then excluded.fallback_content
      else cms_content_blocks.published_content
    end,
    status = case
      when cms_content_blocks.draft_content = cms_content_blocks.fallback_content
       and cms_content_blocks.published_content = cms_content_blocks.fallback_content
        then 'published'
      else cms_content_blocks.status
    end;

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

-- Keep the seed snapshot aligned for blocks that have never been published
-- again, so restoring version 1 cannot resurrect a pre-merge fragment.
update public.cms_content_versions as version
set content = block.published_content,
    format = block.published_format
from public.cms_content_blocks as block
where version.content_block_id = block.id
  and version.version_number = 1
  and version.action = 'seed'
  and block.published_version = 1
  and version.content <> block.published_content;
`;

await writeFile(migrationPath, sql);

const richCount = autoRegistry.filter((entry) => entry.rich).length;
console.log(`Generated ${pages.length} editable pages and ${combined.size} CMS keys.`);
console.log(`${richCount} of ${autoRegistry.length} discovered keys are merged rich-text blocks.`);
