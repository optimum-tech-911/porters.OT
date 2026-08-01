/**
 * Verifies that every REQUIRED visitor message in the fact registry actually
 * reaches a visitor, by reading the RENDERED pages in dist/ rather than src/.
 *
 * Source is only the fallback layer on this project — Supabase can override it —
 * so a source grep proves nothing about what a reader sees. dist/ at least proves
 * the static layer is correct. CMS-state verification is a separate, later step.
 *
 * The success criterion is deliberately NOT "all source facts published":
 *   - every REQUIRED message present;
 *   - CLIENT_APPROVAL_REQUIRED facts withheld and tracked, not published;
 *   - FORBIDDEN claims absent (enforced by check-forbidden-content.mjs).
 *
 * Usage:  npm run check:facts
 * Exit 0 = every REQUIRED message present, 1 = at least one is missing.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { REQUIRED, CLIENT_APPROVAL_REQUIRED, FORBIDDEN } from '../src/content/fact-registry.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Visible text only: no scripts, styles, comments or tags. */
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ');
}

/** Apostrophes and case normalised so ' and ’ are interchangeable. */
const norm = (s) => s.replace(/[’‘']/g, "'").toLowerCase();

const pageCache = new Map();
async function pageText(route) {
  if (pageCache.has(route)) return pageCache.get(route);
  const file = path.join(root, 'dist', route === '/' ? 'index.html' : `${route.slice(1)}/index.html`);
  let text;
  try {
    text = norm(visibleText(await readFile(file, 'utf8')));
  } catch {
    text = null; // route missing entirely
  }
  pageCache.set(route, text);
  return text;
}

const failures = [];
const byRoute = new Map();

for (const entry of REQUIRED) {
  const text = await pageText(entry.route);
  if (text === null) {
    failures.push({ entry, missing: ['(route not built)'] });
    continue;
  }
  const missing = entry.evidence.filter((e) => !text.includes(norm(e)));
  if (!byRoute.has(entry.route)) byRoute.set(entry.route, { ok: 0, total: 0 });
  const stat = byRoute.get(entry.route);
  stat.total += 1;
  if (missing.length) failures.push({ entry, missing });
  else stat.ok += 1;
}

console.log('Fact registry — REQUIRED message check (against rendered dist/)\n');
for (const [route, s] of byRoute) {
  const mark = s.ok === s.total ? '✅' : '❌';
  console.log(`  ${mark} ${route.padEnd(16)} ${s.ok}/${s.total}`);
}

console.log(
  `\n  registry: ${REQUIRED.length} REQUIRED · ` +
    `${CLIENT_APPROVAL_REQUIRED.length} CLIENT_APPROVAL_REQUIRED (withheld by design) · ` +
    `${FORBIDDEN.length} FORBIDDEN`,
);

if (failures.length === 0) {
  console.log('\n✅ Every REQUIRED visitor message is present in the rendered site.');
  process.exit(0);
}

console.log(`\n❌ ${failures.length} REQUIRED message(s) missing:\n`);
for (const { entry, missing } of failures) {
  console.log(`  ${entry.id} — ${entry.route}`);
  console.log(`     ${entry.message}`);
  console.log(`     source: ${entry.source}`);
  console.log(`     not found: ${missing.map((m) => JSON.stringify(m)).join(', ')}`);
  if (entry.notes) console.log(`     note: ${entry.notes}`);
  console.log();
}
process.exit(1);
