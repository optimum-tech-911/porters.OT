/**
 * Guards against a whole class of invisible-content bug.
 *
 * The reveal classes in global.css set opacity: 0, but only `[data-reveal]` and
 * `.reveal` are observed in BaseLayout. An element given `reveal-up` without a
 * trigger is hidden forever — it renders as blank space, which is easy to ship
 * and hard to spot. This replays the observer over every built page and fails if
 * anything is left hidden.
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { parseHTML } from 'linkedom';

const HIDING_CLASSES = ['reveal', 'reveal-up', 'reveal-fade', 'reveal-scale'];

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(target);
    return entry.isFile() && entry.name.endsWith('.html') ? [target] : [];
  }));
  return nested.flat();
}

const problems = [];
let scanned = 0;

for (const file of (await htmlFiles('dist')).sort()) {
  const rel = path.relative('dist', file);
  if (rel.startsWith('admin')) continue;
  scanned += 1;

  const { document } = parseHTML(await readFile(file, 'utf8'));
  // BaseLayout's selector, verbatim.
  document.querySelectorAll('[data-reveal], .reveal').forEach((el) => el.classList.add('visible', 'is-visible'));

  for (const el of document.querySelectorAll('*')) {
    const cls = [...el.classList];
    if (!cls.some((c) => HIDING_CLASSES.includes(c))) continue;
    if (!el.classList.contains('is-visible')) {
      problems.push(`${rel}: <${el.tagName.toLowerCase()} class="${cls.join(' ')}">`);
    }
  }
}

if (problems.length) {
  console.error(`Content hidden with no reveal trigger (${problems.length}):`);
  problems.slice(0, 25).forEach((p) => console.error(`  ${p.slice(0, 150)}`));
  process.exit(1);
}
console.log(`Reveal verified: ${scanned} pages, no content left hidden without a trigger.`);
