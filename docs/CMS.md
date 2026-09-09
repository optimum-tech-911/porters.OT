# The Porters visual CMS

The CMS keeps the Astro site static and SEO-resilient while loading published overrides from Supabase after the page HTML is visible. The existing source text remains the fallback if the network, Supabase, or a content row is unavailable.

## Architecture

- `cms_content_blocks` stores separate draft and published values, controlled formatting, status, editor, timestamps, and the current published version.
- `cms_content_versions` stores immutable published snapshots.
- `cms_content_activity` stores immutable before/after records for draft saves,
  publications, restorations, and content creation. Existing published versions
  are backfilled into this audit when the migration is applied.
- `cms_admin_activity_summary` provides per-account totals without counting a
  draft save and its subsequent publication as two separate edits.
- `cms_admins` is the explicit allow-list linked to Supabase Auth users.
- `cms_published_content` is the only anonymous content surface. It contains no draft or audit columns and reads through the narrowly typed `cms_read_published_content()` function; the base table is never granted to anonymous users.
- `cms_save_draft`, `cms_publish_content`, `cms_restore_version`, and `cms_create_content_block` validate authorization on the database side.
- RLS is enabled on all three exposed tables. A signed-in user who is not in `cms_admins` cannot read drafts or history.

The public page makes one request for the current route and shared `/_global` content, then converts the response into a key/value map. The editor uses the same real page inside an iframe and requests the full draft state once for that route.

All 52 editable public routes are inventoried in `src/cms/editable-pages.json`. `CmsRuntime.astro` discovers eligible rendered text using a deterministic structural key. Explicit keys in `content-registry.json` remain supported for content that needs a human-readable identifier or a mirror attribute. Header and footer text uses shared global keys.

## Environment variables

Set these in Cloudflare Pages for both Production and Preview:

```env
PUBLIC_SUPABASE_URL=https://qyzpqajotnnairsgdhqu.supabase.co
PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_gA70Y0N7q-Bdal1VRzdSeA_ddjkhpUD
```

These are public browser credentials. Authorization is enforced by RLS. Never add a service-role key or a Supabase management access token to Cloudflare, source code, or a `PUBLIC_` variable.

Supabase Auth is configured with sign-up enabled, the production Site URL `https://www.porters.fr/admin/login`, and redirect allow-list entries for `porters.fr`, `www.porters.fr`, and local port 4321. Email auto-confirm currently follows the project setting (`mailer_autoconfirm = true`). Registration never creates a `cms_admins` row.

## Create the first administrator

The bootstrap script uses the management token only for the one-time Auth user and allow-list setup. It does not write the token or password to disk.

```sh
SUPABASE_ACCESS_TOKEN='your-management-token' \
CMS_ADMIN_EMAIL='owner@example.com' \
CMS_ADMIN_PASSWORD='a-long-temporary-password' \
CMS_ADMIN_NAME='Owner name' \
CMS_ADMIN_ROLE='owner' \
npm run cms:admin
```

If the Auth user already exists, omit `CMS_ADMIN_PASSWORD`; the script will only approve or update that user in `cms_admins`.

The administrator signs in at `/admin/login`, opens `/admin/editor`, clicks a highlighted text, then follows:

```text
Edit → Save draft → Preview → Publish
```

A restored version becomes a draft first. It must be reviewed and explicitly published.

## Administrator activity audit

The account report is available at `/admin/activity`. It shows, for every
approved CMS account:

- total known modifications;
- publications and distinct texts touched;
- the exact date, page, content key, and action;
- complete before/after text and formatting snapshots.

The report starts with the first immutable published version in
`cms_content_versions`. Draft saves made before the activity migration cannot be
reconstructed because the original CMS stored only the latest draft. After the
migration, every changed draft save is retained in `cms_content_activity`.

## Content keys and fallback registry

Keys use lowercase dot notation:

```text
home.hero.title
home.journeys.consultant.description
home.final_cta.advisor
global.navigation.contact
```

Human-authored homepage keys remain in [content-registry.json](../src/cms/content-registry.json). The full route registry and editor page list are generated from the production build:

```sh
npm run cms:discover
```

This writes `auto-content-registry.json`, `editable-pages.json`, and the idempotent all-routes seed migration. The seed uses `ON CONFLICT` to update only route, type, and fallback metadata. It never overwrites an administrator's draft or published text.

To add a new route or rendered text:

1. Add the page or text normally, preserving its hardcoded fallback.
2. Run `npm run cms:discover` and commit the regenerated registry, page list, and migration.
3. Apply the new migration to Supabase.
4. Test fallback, draft, preview, publish, navigation, and mobile layout.

For explicit keys, render the fallback with `cmsText(key)` and add `cmsAttrs(key)` to the exact text element before discovery.

## Controlled formatting

Only validated presets can be stored:

- size: default, small, large, very large;
- weight: regular, medium, semibold, bold;
- alignment: left, center, right;
- brand color: navy, gold, dark, light, muted;
- line height: compact, normal, relaxed.

Unknown JSON keys and values fail the database constraint. Raw CSS, positions, transforms, animation rules, breakpoints, and arbitrary sizes are not accepted.

## Verification

```sh
npm run check
npm run build
SUPABASE_ACCESS_TOKEN='your-management-token' npm run cms:verify
```

`cms:verify` registers a temporary Auth user through the public sign-up endpoint, proves non-admin RLS denial, approves the temporary user, tests draft/save/publish/public-read/history/restore, then removes all temporary rows and the user.

## Current rollout scope

All 52 editable public routes are connected with 2,575 unique keys, including 46 shared header/footer and form keys. SEO metadata, JSON-LD, image attributes, and non-visible source data intentionally remain source-controlled; visible headings, paragraphs, navigation labels, buttons, cards, FAQs, CTAs, and footer copy are editable while their hardcoded text remains the fallback.


## September site controls

The public team, homepage notifications and MULA simulator now have dedicated CMS
settings screens. See [the 6 September audit and rollout status](CMS-AUDIT-2026-09-06.md)
for their routes, database migrations, verified behavior and remaining CMS issues.
The prepared migrations have not been applied to Supabase from this session.
