/**
 * Cross-checks the two halves of CMS discovery.
 *
 * src/cms/discover.ts runs in every visitor's browser; the parse5 walk in
 * scripts/generate-cms-registry.mjs produces the keys that get seeded into the
 * database. If those two ever disagree, the runtime looks up keys that do not
 * exist and published copy silently stops appearing. This replays the browser
 * pass over the built pages and asserts both sides land on the same keys.
 *
 * Run after `npm run cms:seed`, against the same dist/.
 */

import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { parseHTML } from 'linkedom';

const { document, Node } = parseHTML('<html><body></body></html>');
globalThis.document = document;
globalThis.Node = Node;

const { discoverEditableText } = await import('../src/cms/discover.ts');
const { sanitizeInlineHtml } = await import('../src/cms/inline-html.ts');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const GLOBAL_ROUTE = '/_global';

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

function normalize(html) {
  return html.replaceAll('&#160;', '\u00a0').replaceAll('&nbsp;', '\u00a0').trim();
}

const registry = JSON.parse(await readFile(path.join(root, 'src/cms/auto-content-registry.json'), 'utf8'));
const expected = new Map(registry.map((entry) => [entry.key, entry]));

/**
 * Keys that legitimately exist at runtime with no build-time counterpart.
 *
 * A key normally has to appear on both sides; that is the point of this check.
 * The exception is content an administrator published through the editor for a
 * node the parse5 pass does not claim: the row is real, a visitor sees it, and it
 * is deliberately CMS-managed rather than source-managed. Replacing it with the
 * source fallback would silently discard someone's editorial decision.
 *
 * This is an allow-list of named keys, NOT a rule that tolerates orphans. An
 * unregistered runtime-only key still fails, which is what keeps the check
 * meaningful. Each entry documents why it is CMS-only and how it must be
 * treated — see src/cms/runtime-overrides.json.
 */
const runtimeOverrides = JSON.parse(
  await readFile(path.join(root, 'src/cms/runtime-overrides.json'), 'utf8'),
);
const allowedRuntimeOnly = new Map(runtimeOverrides.map((entry) => [entry.key, entry]));
const usedOverrides = new Set();

const files = (await htmlFiles(dist)).sort();
const seen = new Set();
const problems = [];

for (const file of files) {
  const route = routeForFile(file);
  if (route === '/404' || route.startsWith('/admin')) continue;

  const { document } = parseHTML(await readFile(file, 'utf8'));
  discoverEditableText(document, route, GLOBAL_ROUTE);

  for (const node of document.querySelectorAll('[data-cms-key][data-cms-auto="true"]')) {
    const key = node.getAttribute('data-cms-key');
    seen.add(key);

    const entry = expected.get(key);
    if (!entry) {
      const override = allowedRuntimeOnly.get(key);
      if (override) {
        // Registered CMS-only override. Its content lives in the database, not in
        // the registry, so there is no build-time entry to round-trip against.
        if (override.route !== route) {
          problems.push(
            `${route}: ${key} is registered as a CMS-only override for ${override.route}, not this route`,
          );
        }
        usedOverrides.add(key);
        continue;
      }
      problems.push(`${route}: runtime produced key ${key}, which the build-time pass never emits`);
      continue;
    }

    const rich = node.getAttribute('data-cms-rich') === 'true';
    if (rich !== Boolean(entry.rich)) {
      problems.push(`${route}: ${key} is ${rich ? 'rich' : 'plain'} at runtime but ${entry.rich ? 'rich' : 'plain'} at build time`);
      continue;
    }

    // The load-bearing invariant: rendering the seeded content back into the
    // page must reproduce the page. If this holds, seeding a fresh database and
    // letting the runtime apply it is a visual no-op, so no design detail — an
    // accent, a line break, a link — can be lost on the way through the CMS.
    if (rich) {
      const rendered = sanitizeInlineHtml(entry.content);
      // Compared as rendered, not as typed. Hydration markers are invisible and
      // the sanitizer drops them, and a non-breaking space is the same character
      // whether it was written as an entity or literally.
      const onPage = normalize(node.innerHTML.replace(/<!--.*?-->/g, ''));
      if (normalize(rendered) !== onPage) {
        problems.push(`${route}: ${key} does not round-trip\n      page:   ${onPage}\n      seeded: ${rendered}`);
      }
    }
  }
}

for (const [key, entry] of expected) {
  if (!seen.has(key)) problems.push(`${entry.route}: build-time key ${key} is never produced at runtime`);
}

// A registered override that no longer appears is stale: the markup it belonged
// to has changed, so the database row is now unreachable. Reporting it keeps the
// allow-list from quietly accumulating entries that protect nothing.
for (const [key, entry] of allowedRuntimeOnly) {
  if (!usedOverrides.has(key)) {
    problems.push(
      `${entry.route}: ${key} is registered as a CMS-only override but is no longer produced at runtime — remove it from src/cms/runtime-overrides.json or restore the markup`,
    );
  }
}

if (problems.length) {
  console.error(`Discovery mismatch (${problems.length}):`);
  for (const problem of problems.slice(0, 40)) console.error(`  ${problem}`);
  if (problems.length > 40) console.error(`  … and ${problems.length - 40} more`);
  process.exit(1);
}

console.log(
  `Discovery verified: ${seen.size} auto keys match between the runtime and the build-time pass` +
    (usedOverrides.size
      ? `, plus ${usedOverrides.size} registered CMS-only override${usedOverrides.size > 1 ? 's' : ''}.`
      : '.'),
);
