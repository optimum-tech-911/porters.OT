import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createRequire } from 'node:module';
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { parseHTML } from 'linkedom';
import { act, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToStaticMarkup } from 'react-dom/server';
import { loadCmsPages } from '../src/cms/load-pages.ts';
import { discoverEditableText } from '../src/cms/discover.ts';

const require = createRequire(import.meta.url);
async function loadModule(path) {
  const result = await build({
    entryPoints: [path], bundle: true, write: false, platform: 'node', format: 'esm', jsx: 'automatic', loader: { '.css': 'empty' },
    plugins: [{ name: 'test-dependencies', setup(builder) {
      builder.onResolve({ filter: /^react(?:\/|$)/ }, (args) => ({ path: require.resolve(args.path), external: true }));
      builder.onResolve({ filter: /\/supabase(?:\.ts)?$/ }, () => ({ path: 'supabase', namespace: 'test' }));
      builder.onLoad({ filter: /.*/, namespace: 'test' }, () => ({ contents: 'export const supabase = globalThis.__siteFeaturesTestClient;' }));
    } }],
  });
  const directory = await mkdtemp(join(tmpdir(), 'porters-feature-test-'));
  const file = join(directory, 'module.mjs');
  await writeFile(file, result.outputFiles[0].text);
  try { return await import(pathToFileURL(file).href); }
  finally { await rm(directory, { recursive: true, force: true }); }
}
const notifications = await loadModule('src/data/site-notifications.ts');
const team = await loadModule('src/data/public-team.ts');
const { NotificationCard } = await loadModule('src/components/ui/SiteNotifications.tsx');
const { default: TeamCarousel } = await loadModule('src/components/about/TeamCarousel.tsx');
const mula = await loadModule('src/data/mula-settings.ts');
const calculator = await loadModule('src/lib/mula-calculator.ts');

test('team arrows, dots and automatic progression work after hydration', async (t) => {
  const { document, window } = parseHTML('<html><body><div id="test-root"></div></body></html>');
  const previous = { window: globalThis.window, document: globalThis.document, IntersectionObserver: globalThis.IntersectionObserver };
  globalThis.window = window; globalThis.document = document; globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  window.location = { pathname: '/qui-sommes-nous', search: '' };
  window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  globalThis.IntersectionObserver = class { constructor(callback) { this.callback = callback; } observe() { this.callback([{ isIntersecting: true }]); } disconnect() {} };
  t.mock.timers.enable({ apis: ['setTimeout', 'Date'], now: 1000000 });
  const root = createRoot(document.getElementById('test-root'));
  const active = () => document.querySelector('.team-carousel__slide[aria-hidden="false"] h3').textContent;
  const click = async (selector) => act(async () => document.querySelector(selector).dispatchEvent(new window.Event('click', { bubbles: true })));
  try {
    await act(async () => root.render(createElement(TeamCarousel, { preview: team.defaultPublicTeam })));
    assert.equal(active(), team.defaultPublicTeam.members[0].name);
    await act(async () => t.mock.timers.tick(8000));
    assert.equal(active(), team.defaultPublicTeam.members[1].name);
    await click('[aria-label="Personne suivante"]');
    assert.equal(active(), team.defaultPublicTeam.members[2].name);
    await click('.team-carousel__dots button');
    assert.equal(active(), team.defaultPublicTeam.members[0].name);
    await act(async () => t.mock.timers.tick(16000));
    assert.equal(active(), team.defaultPublicTeam.members[0].name, 'manual selection pauses autoplay');
    await click('[aria-label="Personne précédente"]');
    assert.equal(active(), team.defaultPublicTeam.members[2].name, 'previous wraps to last person');
  } finally { await act(async () => root.unmount()); t.mock.timers.reset(); Object.assign(globalThis, previous); delete globalThis.IS_REACT_ACT_ENVIRONMENT; }
});

test('homepage popup appears on opening, closes and cycles after two minutes', async (t) => {
  globalThis.__siteFeaturesTestClient = { from() { return { select() { return this; }, eq() { return this; }, abortSignal() { return this; }, async maybeSingle() { return { data: { published_content: JSON.stringify(notifications.defaultNotifications) }, error: null }; } }; } };
  const { default: Popup } = await loadModule('src/components/ui/SiteNotifications.tsx');
  const { document, window } = parseHTML('<html><body><div id="test-root"></div></body></html>');
  const previous = { window: globalThis.window, document: globalThis.document };
  globalThis.window = window; globalThis.document = document; globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  window.location = { pathname: '/', search: '' };
  Object.defineProperty(document, 'activeElement', { value: document.body });
  const matches = window.HTMLElement.prototype.matches;
  window.HTMLElement.prototype.matches = function(selector) { return selector === ':hover' ? false : matches.call(this, selector); };
  t.mock.timers.enable({ apis: ['setTimeout', 'setInterval', 'Date'], now: 1000000 });
  const root = createRoot(document.getElementById('test-root'));
  try {
    await act(async () => root.render(createElement(Popup, { portraitSrc: '/test.webp' })));
    assert.equal(document.querySelector('.site-notice h2').textContent, notifications.defaultNotifications.messages[0].title);
    await act(async () => document.querySelector('.site-notice__close').dispatchEvent(new window.Event('click', { bubbles: true })));
    assert.equal(document.querySelector('.site-notice'), null);
    await act(async () => t.mock.timers.tick(119000));
    assert.equal(document.querySelector('.site-notice'), null);
    await act(async () => t.mock.timers.tick(1000));
    assert.equal(document.querySelector('.site-notice h2').textContent, notifications.defaultNotifications.messages[1].title);
  } finally { await act(async () => root.unmount()); t.mock.timers.reset(); window.HTMLElement.prototype.matches = matches; Object.assign(globalThis, previous); delete globalThis.IS_REACT_ACT_ENVIRONMENT; delete globalThis.__siteFeaturesTestClient; }
});

test('MULA modes map to the correct calculation endpoint and enforce published locks', async () => {
  const settings = mula.parseMulaSettings(mula.defaultMulaSettings);
  const input = { amount: '500', managementFee: 30, fixedFee: 400, expenses: 0, days: 20, contract: 'CDI' };
  for (const [mode, endpoint, parameter, ope] of [['tjm', 'salary', 'tjm', 1], ['revenue', 'salary', 'ca', 2], ['gross', 'tjm', 'salary', 1], ['net', 'tjm', 'salary', 2], ['total', 'salary', 'cout', 2]]) {
    const { url, payload } = calculator.buildMulaRequest(settings, mode, input);
    assert.ok(url.endsWith(`/simulators/${endpoint}/compute`));
    assert.equal(payload[parameter], 500); assert.equal(payload.ope, ope);
    assert.equal(payload.management_fee, 5); assert.equal(payload.management_fee_fix, 0);
    assert.equal(payload.cout_total, mode === 'total' ? 1 : undefined);
    const pdf = new URL(calculator.mulaPdfUrl(settings.sourceSerial, payload));
    assert.equal(pdf.searchParams.get('management_fee'), '5');
  }
  assert.throws(() => calculator.buildMulaRequest({ ...settings, calculateEnabled: false }, 'tjm', input));
  assert.throws(() => calculator.buildMulaRequest({ ...settings, modes: { ...settings.modes, net: 'hidden' } }, 'net', input));
  for (const amount of ['', '-1', 'Infinity', 'not a number']) assert.throws(() => calculator.buildMulaRequest(settings, 'tjm', { ...input, amount }));
  assert.throws(() => calculator.buildMulaRequest({ ...settings, allowCDD: false }, 'tjm', { ...input, contract: 'CDD' }));
  assert.throws(() => mula.parseMulaSettings({ ...settings, sourceSerial: '../invalid' }));
  assert.throws(() => mula.parseMulaSettings({ ...settings, modes: { ...settings.modes, tjm: 'hidden' } }));
  assert.throws(() => mula.parseMulaSettings({ ...settings, contactHref: 'javascript:alert(1)' }));
  const fetchBefore = globalThis.fetch;
  try {
    globalThis.fetch = async () => ({ ok: true, json: async () => ({ net_a_payer: 4000 }) });
    await assert.rejects(calculator.calculateWithMula('https://example.com', {}, new AbortController().signal), /incomplète/);
    globalThis.fetch = async () => ({ ok: true, json: async () => ({ simulator_show_results: false }) });
    assert.deepEqual(await calculator.calculateWithMula('https://example.com', {}, new AbortController().signal), { simulator_show_results: false });
  } finally { globalThis.fetch = fetchBefore; }
});

test('admin settings publish to the CMS, retry a failed publication and reject stale edits', async () => {
  let row = null;
  let serial = 0;
  let failPublish = false;
  const calls = [];
  globalThis.__siteFeaturesTestClient = {
    from(table) {
      return { select() { return this; }, eq() { return this; },
        async maybeSingle() { return { data: row && { ...row }, error: null }; },
        async single() { return { data: table === 'cms_published_content' && row ? { published_content: row.published_content } : null, error: null }; },
      };
    },
    async rpc(name, args) {
      calls.push(name);
      if (name === 'cms_create_content_block') row = { draft_content: args.requested_fallback, published_content: args.requested_fallback, updated_at: String(++serial), published_version: 1, status: 'published' };
      if (name === 'cms_save_draft') row = { ...row, draft_content: args.requested_content, updated_at: String(++serial), status: 'draft' };
      if (name === 'cms_publish_content') {
        if (failPublish) return { data: null, error: { message: 'Publication momentanément indisponible' } };
        row = { ...row, published_content: row.draft_content, updated_at: String(++serial), published_version: row.published_version + 1, status: 'published' };
      }
      return { data: { ...row }, error: null };
    },
  };
  const { default: Panel } = await loadModule('src/components/admin/CmsSettingsPanel.tsx');
  const { document, window } = parseHTML('<html><body><div id="test-root"></div></body></html>');
  const previousWindow = globalThis.window;
  const previousDocument = globalThis.document;
  globalThis.window = window; globalThis.document = document; globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const root = createRoot(document.getElementById('test-root'));
  let edit;
  const publish = () => [...document.querySelectorAll('button')].find((button) => button.textContent.includes('Publier sur le site'));
  try {
    await act(async () => root.render(createElement(Panel, { contentKey: team.PUBLIC_TEAM_KEY, route: '/qui-sommes-nous', defaults: team.defaultPublicTeam, parse: team.parsePublicTeam }, (value, change) => { edit = change; return createElement('p', null, value.heading); })));
    assert.deepEqual(calls, [], 'opening settings must never publish defaults');
    await act(async () => publish().dispatchEvent(new window.Event('click', { bubbles: true })));
    assert.deepEqual(calls, ['cms_create_content_block']);
    assert.ok(document.body.textContent.includes('publiée et vérifiée'));
    await act(async () => edit((value) => ({ ...value, heading: 'Une équipe qui vous accompagne' })));
    failPublish = true;
    await act(async () => publish().dispatchEvent(new window.Event('click', { bubbles: true })));
    assert.equal(JSON.parse(row.published_content).heading, team.defaultPublicTeam.heading);
    assert.ok(document.querySelector('[role="alert"]'));
    failPublish = false;
    await act(async () => publish().dispatchEvent(new window.Event('click', { bubbles: true })));
    assert.equal(JSON.parse(row.published_content).heading, 'Une équipe qui vous accompagne');
    const writesBeforeConflict = calls.length;
    row = { ...row, updated_at: String(++serial) };
    await act(async () => edit((value) => ({ ...value, heading: 'Un changement concurrent' })));
    await act(async () => publish().dispatchEvent(new window.Event('click', { bubbles: true })));
    assert.equal(calls.length, writesBeforeConflict);
    assert.ok(document.querySelector('[role="alert"]').textContent.includes('autre administrateur'));
  } finally {
    await act(async () => root.unmount());
    globalThis.window = previousWindow; globalThis.document = previousDocument;
    delete globalThis.IS_REACT_ACT_ENVIRONMENT; delete globalThis.__siteFeaturesTestClient;
  }
});

test('CMS loader reads beyond 1,000 rows without duplicates and propagates partial failure', async () => {
  const rows = Array.from({ length: 1188 }, (_, id) => ({ id }));
  const requests = [];
  const result = await loadCmsPages(async (from, to) => { requests.push([from, to]); return { data: rows.slice(from, to + 1), error: null }; });
  assert.deepEqual(result, rows);
  assert.deepEqual(requests, [[0, 499], [500, 999], [1000, 1499]]);
  await assert.rejects(loadCmsPages(async (from) => from ? { data: null, error: new Error('network failed') } : { data: rows.slice(0, 500), error: null }), /network failed/);
});

test('popup timing respects first delay, dismissal cooldown and administrator limits', () => {
  const { defaultNotifications: settings, nextNotificationTime, parseNotifications } = notifications;
  const now = 1_000_000;
  assert.equal(nextNotificationTime(now, 0, settings), now);
  assert.equal(nextNotificationTime(now, now - 10000, settings), now + 110000);
  assert.equal(nextNotificationTime(now, Infinity, settings), now);
  assert.equal(nextNotificationTime(now, 0, { ...settings, firstDelaySeconds: 180 }), now + 180000);
  assert.throws(() => parseNotifications({ ...settings, intervalSeconds: 30 }));
  assert.throws(() => parseNotifications({ ...settings, intervalSeconds: NaN }));
  assert.throws(() => parseNotifications({ ...settings, messages: [] }));
  assert.deepEqual(parseNotifications({ ...settings, enabled: false, messages: [] }).messages, []);
  assert.equal(parseNotifications({ ...settings, position: 'bottom-right' }).position, 'bottom-right');
  assert.throws(() => parseNotifications({ ...settings, position: 'top-center' }));
  const legacy = structuredClone(settings);
  delete legacy.position;
  for (const message of legacy.messages) { delete message.showImage; delete message.image; delete message.imageAlt; }
  const upgraded = parseNotifications(legacy);
  assert.equal(upgraded.position, 'bottom-left');
  assert.equal(upgraded.messages[0].showImage, true);
  assert.equal(upgraded.messages[1].showImage, true);
});

test('CMS settings reject unsafe links and duplicate identifiers without stripping valid quotes', () => {
  const { safeWebUrl, parseNotifications, defaultNotifications } = notifications;
  for (const url of ['javascript:alert(1)', 'data:text/html,test', '//evil.example', '/\\evil.example', 'https://good.example\n@evil.example']) assert.equal(safeWebUrl(url), '');
  assert.equal(safeWebUrl('/portage-salarial'), '/portage-salarial');
  assert.equal(safeWebUrl('https://example.org/offres'), 'https://example.org/offres');
  assert.throws(() => parseNotifications({ ...defaultNotifications, messages: [defaultNotifications.messages[0], defaultNotifications.messages[0]] }));
  const next = structuredClone(team.defaultPublicTeam);
  next.members[0].quote = '« Notre accompagnement, à votre rythme. »';
  next.members.reverse(); next.members[1].visible = false;
  assert.deepEqual(team.parsePublicTeam(JSON.stringify(next)), next);
  assert.throws(() => team.parsePublicTeam({ ...next, members: [{ ...next.members[0], image: 'javascript:alert(1)' }] }));
});

test('team carousel supports hidden members, pending quotes and safe rendering of quotations', () => {
  const next = structuredClone(team.defaultPublicTeam);
  next.members = [{ ...next.members[0], quote: '<script>alert(1)</script>' }, { ...next.members[1], visible: false }];
  const html = renderToStaticMarkup(createElement(TeamCarousel, { preview: next }));
  const { document } = parseHTML(html);
  assert.equal(document.querySelectorAll('.team-carousel__slide').length, 1);
  assert.equal(document.querySelector('blockquote p').textContent, '<script>alert(1)</script>');
  assert.equal(document.querySelector('script'), null);
  assert.equal(document.querySelector('.team-carousel__controls'), null);
  const pending = renderToStaticMarkup(createElement(TeamCarousel, { preview: team.defaultPublicTeam }));
  assert.equal(parseHTML(pending).document.querySelector('blockquote'), null);
  assert.equal(parseHTML(pending).document.querySelectorAll('[inert]').length, 2);
  assert.equal(renderToStaticMarkup(createElement(TeamCarousel, { preview: { ...next, members: [] } })), '');
});

test('notification preview has no modal overlay and cannot execute an unsafe draft link', () => {
  const html = renderToStaticMarkup(createElement(NotificationCard, { preview: true, message: { ...notifications.defaultNotifications.messages[0], href: 'javascript:alert(1)' } }));
  const { document } = parseHTML(html);
  assert.equal(document.querySelector('a').getAttribute('href'), null);
  assert.equal(document.querySelector('[aria-modal]'), null);
});

test('built pages preserve section keys and only mount notifications on the homepage', async () => {
  const { document: portage } = parseHTML(await readFile('dist/portage-salarial/index.html', 'utf8'));
  discoverEditableText(portage, '/portage-salarial', '/_global');
  assert.deepEqual([...portage.querySelectorAll('#frais,#parrainage,.portage-faq')].map((n) => n.id || 'faq'), ['frais', 'parrainage', 'faq']);
  assert.equal(portage.querySelector('#frais h2').dataset.cmsKey, 'pages.portage-salarial.auto.heading.1qnyctv');
  assert.equal(portage.querySelector('#parrainage h2').dataset.cmsKey, 'pages.portage-salarial.auto.heading.1xfppdk');
  assert.equal(portage.querySelector('.portage-faq h2 span').dataset.cmsKey, 'pages.portage-salarial.auto.paragraph.yb10yo');
  assert.equal(portage.querySelector('.portage-faq details p').dataset.cmsKey, 'pages.portage-salarial.auto.paragraph.lrj3uk');
  assert.equal(portage.querySelector('.site-notice-host'), null);
  assert.equal(portage.querySelectorAll('.site-footer__cta').length, 1);
  assert.equal(portage.querySelector('.management-fees__number'), null);
  assert.ok(!/Étape\s+[0-9]/.test(portage.querySelector('#parrainage').textContent));
  const { document: home } = parseHTML(await readFile('dist/index.html', 'utf8'));
  discoverEditableText(home, '/', '/_global');
  assert.equal(home.querySelectorAll('.site-footer__cta').length, 1);
  assert.equal(home.querySelector('.light-final-cta'), null, 'homepage must not duplicate the shared final CTA');
  assert.deepEqual([...home.querySelectorAll('#home-hero-title [data-cms-key]')].map((node) => node.dataset.cmsKey), ['pages.home.auto.paragraph.og6wsy', 'pages.home.auto.paragraph.1ey54qb', 'pages.home.auto.paragraph.v73dw4']);
  assert.ok(home.querySelector('.site-notice-host'));
  assert.ok(!/hellowork/i.test(home.querySelector('.light-hellowork-section').textContent));
  assert.equal(home.querySelector('.site-footer__cta h2').textContent.trim(), 'Il reste sûrement une question. Posez-la.');
  assert.equal(home.querySelectorAll('.site-footer__cta-actions a').length, 2);
  assert.ok(home.querySelector('a[href="/candidat"]'));
  const { document: about } = parseHTML(await readFile('dist/qui-sommes-nous/index.html', 'utf8'));
  assert.equal(about.querySelector('.site-notice-host'), null);
  assert.equal(about.querySelectorAll('.ecosystem-offer--esn [data-cms-key][data-cms-rich="true"]').length, 8);
  assert.equal(about.querySelectorAll('.team-carousel__slide').length, 3);
  assert.equal(about.querySelector('.team-carousel__number'), null);
  assert.equal(about.querySelectorAll('[data-portage-offer-tab]').length, 4);
  assert.equal(about.querySelectorAll('[data-portage-offer-panel]').length, 4);
  assert.equal(about.querySelectorAll('.portage-offer-highlights > span').length, 7);
  const { document: expertises } = parseHTML(await readFile('dist/expertises/index.html', 'utf8'));
  assert.ok(!/0[1-9]\s*·/.test(expertises.querySelector('.expertise-signal-stage').textContent));
  const { document: simulator } = parseHTML(await readFile('dist/simulateur/index.html', 'utf8'));
  assert.equal(simulator.querySelectorAll('[role="tab"]').length, 5);
  assert.equal(simulator.querySelector('input[name="managementFee"]').value, '5');
  assert.ok(simulator.querySelector('input[name="managementFee"]').hasAttribute('disabled'));
  const { document: candidate } = parseHTML(await readFile('dist/candidat/index.html', 'utf8'));
  discoverEditableText(candidate, '/candidat', '/_global');
  assert.equal(candidate.querySelector('h1').textContent.trim(), 'Votre prochaine opportunité commence par un échange utile.');
  assert.ok(candidate.querySelector('#candidature'));
  assert.ok(candidate.querySelector('astro-island[component-export="default"]'));
  assert.equal(candidate.querySelectorAll('.candidate-hero__pills li').length, 3);
  assert.equal(portage.querySelectorAll('[data-fee-card]').length, 7);
  assert.ok(!/Explorer/i.test(portage.querySelector('#frais').textContent));
  assert.equal(portage.querySelectorAll('[data-fee-dot]').length, 7);
  assert.ok(portage.querySelector('.management-fees__promise').textContent.includes('Pas de frais cachés'));
  assert.equal(portage.querySelectorAll('.portage-table thead th').length, 6);
  assert.deepEqual([...portage.querySelectorAll('[data-comparison-button]')].map((button) => button.dataset.comparisonButton), ['portage', 'micro', 'ei', 'sasu', 'eurl']);
  const { document: admin } = parseHTML(await readFile('dist/admin/dashboard/index.html', 'utf8'));
  const adminLinks = [...admin.querySelectorAll('.admin-nav-item')].map((link) => link.getAttribute('href'));
  for (const removed of ['/admin/meetings', '/admin/calendar', '/admin/analytics', '/admin/team', '/admin/notifications']) assert.ok(!adminLinks.includes(removed));
});
