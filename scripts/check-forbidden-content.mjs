/**
 * Visitor-facing forbidden-content guard.
 *
 * Checks the RENDERED output in dist/ rather than src/, because this project has
 * two content layers: the Astro render is only the fallback, and what a visitor
 * sees can also come from Supabase. Source greps therefore give false confidence.
 * Scanning dist/ at least proves the static layer is clean.
 *
 * Deliberately scoped: this is the interim guard for claims that must never reach
 * a visitor. It is NOT the full REQUIRED / FORBIDDEN / CLIENT_APPROVAL_REQUIRED
 * registry — that comes later.
 *
 * Because it reads rendered HTML, source comments, TODO-CLIENT markers, fact
 * registries and internal documentation are invisible to it by construction. A
 * term can be discussed freely in the repo; it only fails if it reaches a page.
 *
 * Usage:  node scripts/check-forbidden-content.mjs
 * Exit 0 = clean, 1 = a forbidden claim is visible to visitors.
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

/**
 * Routes excluded from the scan.
 * - /admin/**: the back-office is not visitor-facing, and its demo fixtures
 *   legitimately contain figures that would otherwise trip the numeric rules.
 */
const EXCLUDED = [`${path.sep}admin${path.sep}`];

const RULES = [
  {
    id: 'F-A04',
    label: 'KwickStart brand — CLIENT_APPROVAL_REQUIRED (Q1)',
    pattern: /kwick\s?start/i,
  },
  {
    id: 'F-S01',
    label: 'Sector claims sourced from KwickStart-specific material',
    // Anchored on the rendered sector-list headings rather than on industry
    // names, so ordinary prose mentioning a sector is not a false positive.
    // Both current and previous wordings are covered: the block was relabelled
    // from "Secteurs concernés" to "Secteurs couverts dans les supports", which
    // a heading-specific rule would otherwise have silently stopped catching.
    pattern: /Secteurs?\s+(?:concern[ée]s?|couverts?|cit[ée]s?)/i,
  },
  {
    id: 'R3-pentest',
    label: 'Pentest / intrusion-testing capability — unsupported by any source',
    pattern: /\bpentest\w*|tests?\s+d[’']intrusion/i,
  },
  {
    id: 'R3-soc',
    label: 'SOC capability claim — unsupported by any source',
    // Word-boundary + uppercase only: avoids "société", "associé", etc.
    pattern: /\bSOC\b/,
  },
  {
    id: 'R3-siem',
    label: 'SIEM capability claim — unsupported by any source',
    pattern: /\bSIEM\b/,
  },
  {
    id: 'F-V08',
    label: 'Unapproved client names (tender document / cyber deck)',
    pattern: /CDC\s?Habitat|URSSAF|Keolis|Vinci\s?Autoroutes|Transdev|Pro\s?BTP|Softway|Horiba|GIE\s?SIN|\bCCTP\b|\bADSN\b|CMA[- ]CGM/i,
  },
  {
    id: 'F-V09',
    label: 'Consultant names in a mission context — personal data',
    pattern: /\b(?:Lavertue|Ribet|Markowitz|Kihl)\b/i,
  },
  {
    id: 'F-A10',
    label: 'Group revenue figures — confidential',
    pattern: /880\s?K€|5,2\s?M€|4,9\s?M€|4,5\s?M€/i,
  },
  {
    id: 'F-A09',
    label: 'Headcount — DO_NOT_PUBLISH',
    pattern: /effectif\s+de\s+11\b|11\s+collaborateurs/i,
  },
  {
    id: 'F-C16',
    label: '"97 % de collaborateurs satisfaits" — no source, no method, no date',
    pattern: /97\s?%/,
  },
  {
    id: 'F-C20',
    label: 'Territory-coverage claim — true but hollow, DO_NOT_PUBLISH',
    pattern: /100\s?%\s*(?:du\s+)?territoire|territoire\s+couvert/i,
  },
  {
    id: 'F-V06',
    label: 'Unfilled placeholders from the draft deck',
    pattern: /\bX\s+projets\b|plus\s+de\s+X\b|\.\.\.\s*(?:projets|candidats)/i,
  },
];

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

/** Strip scripts, styles and tags so only visitor-visible text remains. */
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ');
}

const files = (await htmlFiles(dist)).filter((f) => !EXCLUDED.some((x) => f.includes(x)));
const violations = [];

for (const file of files) {
  const text = visibleText(await readFile(file, 'utf8'));
  for (const rule of RULES) {
    const match = text.match(rule.pattern);
    if (!match) continue;
    const at = text.indexOf(match[0]);
    violations.push({
      route: '/' + path.relative(dist, file).replace(/(?:^|\/)index\.html$/, '').replace(/\\/g, '/'),
      rule,
      excerpt: text.slice(Math.max(0, at - 45), at + match[0].length + 45).trim(),
    });
  }
}

console.log(`Scanned ${files.length} rendered pages against ${RULES.length} forbidden-content rules.\n`);

if (violations.length === 0) {
  console.log('✅ No forbidden claim reaches a visitor.');
  process.exit(0);
}

const byRule = new Map();
for (const v of violations) {
  if (!byRule.has(v.rule.id)) byRule.set(v.rule.id, []);
  byRule.get(v.rule.id).push(v);
}

console.log(`❌ ${violations.length} violation(s) across ${byRule.size} rule(s):\n`);
for (const [id, list] of byRule) {
  console.log(`  ${id} — ${list[0].rule.label}`);
  for (const v of list.slice(0, 6)) {
    console.log(`     ${v.route || '/'}`);
    console.log(`       …${v.excerpt}…`);
  }
  if (list.length > 6) console.log(`     …and ${list.length - 6} more page(s)`);
  console.log();
}
process.exit(1);
