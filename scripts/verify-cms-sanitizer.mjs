/**
 * Checks the inline markup policy in src/cms/inline-html.ts.
 *
 * Merged CMS blocks store HTML that the public runtime writes with innerHTML, so
 * the sanitizer is the boundary between what an administrator can type and what
 * every visitor executes. It also has to preserve the design: dropping the
 * accent span or Astro's scoped-style attribute would quietly break the pages.
 */

import { parseHTML } from 'linkedom';

const { document, Node } = parseHTML('<html><body></body></html>');
globalThis.document = document;
globalThis.Node = Node;

const { inlineHtmlToPlainText, sanitizeInlineHtml } = await import('../src/cms/inline-html.ts');

/** `contains` must survive; `forbids` must not appear anywhere in the output. */
const cases = [
  ['keeps the gold accent', 'Quel cadre correspond à <span class="gold-underline">votre projet</span> ?', ['<span class="gold-underline">votre projet</span>'], []],
  ['keeps astro scoped attribute', 'Un contact proche,<br data-astro-cid-lt6rlkun="">où que commence', ['data-astro-cid-lt6rlkun'], []],
  ['keeps a safe internal link', 'Voir la <a href="/contact" class="x">page contact</a>', ['href="/contact"', 'class="x"'], []],
  ['keeps bold and italic', '<strong>gras</strong> et <em>italique</em>', ['<strong>gras</strong>', '<em>italique</em>'], []],
  ['keeps mailto and tel', '<a href="mailto:a@b.fr">mail</a> <a href="tel:+33">tel</a>', ['mailto:a@b.fr', 'tel:+33'], []],

  ['removes a script beside real markup', '<span class="ok">a</span><script>alert(1)</script>', ['<span class="ok">a</span>'], ['alert(1)', '<script']],
  ['removes an image payload beside real markup', '<span class="ok">a</span><img src=x onerror="alert(1)">', ['<span class="ok">a</span>'], ['onerror', '<img']],
  ['removes an svg payload beside real markup', '<span class="ok">a</span><svg><script>alert(1)</script></svg>', ['<span class="ok">a</span>'], ['<svg', 'alert(1)']],
  ['removes an iframe beside real markup', '<span class="ok">a</span><iframe src="//evil"></iframe>', ['<span class="ok">a</span>'], ['<iframe']],
  ['strips inline handlers', '<span onclick="alert(1)" class="ok">texte</span>', ['class="ok"', 'texte'], ['onclick']],
  ['strips style attributes', '<span style="background:url(javascript:alert(1))" class="ok">texte</span>', ['texte'], ['style=', 'javascript:']],
  ['drops a javascript href', '<a href="javascript:alert(1)">clic</a>', ['clic'], ['javascript:', 'href=']],
  ['drops a tab-obfuscated javascript href', '<a href="java&#09;script:alert(1)">clic</a>', ['clic'], ['javascript:', 'href=']],
  ['drops a data href', '<a href="data:text/html;base64,PHNjcmlwdD4=">clic</a>', ['clic'], ['data:', 'href=']],
  ['unwraps block tags but keeps their text', '<span class="ok">a</span><div><p>texte</p></div>', ['texte'], ['<div', '<p>']],
  ['refuses to mint a phantom CMS block', '<span data-cms-key="x.y.z" class="ok">texte</span>', ['texte'], ['data-cms-key']],
  ['refuses to mint a phantom ignore marker', '<span data-cms-ignore="" class="ok">texte</span>', ['texte'], ['data-cms-ignore']],

  ['re-escapes bare text safely', 'a < b & c > d', ['a &lt; b &amp; c &gt; d'], ['<b']],
  ['leaves already-escaped entities alone', 'Data &amp; IA', ['Data &amp; IA'], ['&amp;amp;']],
  ['drops a lone script string', 'Bonjour<script>alert(1)</script>', ['Bonjour'], ['alert(1)', '<script']],
];

let failures = 0;

function fail(name, detail) {
  failures += 1;
  console.error(`FAIL  ${name}\n      ${detail}`);
}

for (const [name, input, contains, forbids] of cases) {
  const output = sanitizeInlineHtml(input);
  for (const needle of contains) {
    if (!output.includes(needle)) fail(name, `expected to keep ${JSON.stringify(needle)}\n      got: ${output}`);
  }
  for (const needle of forbids) {
    if (output.includes(needle)) fail(name, `expected to drop ${JSON.stringify(needle)}\n      got: ${output}`);
  }
}

// Re-sanitizing must be a no-op, or every save would drift the stored markup.
const sample = 'a <span class="gold-underline">b</span><br>c <a href="/x">d</a>';
const once = sanitizeInlineHtml(sample);
if (sanitizeInlineHtml(once) !== once) fail('sanitizing is idempotent', `${once} -> ${sanitizeInlineHtml(once)}`);

const plain = inlineHtmlToPlainText('Quel cadre correspond à <span class="gold-underline">votre projet</span> ?');
if (plain !== 'Quel cadre correspond à votre projet ?') fail('reads plain text back', JSON.stringify(plain));

if (failures) {
  console.error(`\n${failures} sanitizer failure(s).`);
  process.exit(1);
}
console.log(`Sanitizer verified: ${cases.length} markup cases plus idempotence and plain-text extraction.`);
