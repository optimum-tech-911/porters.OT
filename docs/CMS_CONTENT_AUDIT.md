# CMS content audit

## Route inventory

The Astro build currently generates 68 pages, including:

- Core routes: `/`, `/consultants`, `/entreprises`, `/portage-salarial`, `/tarifs`, `/simulateur`, `/contact`, `/rendez-vous`, `/faq`, `/qui-sommes-nous`, `/equipe`, `/recrutement`, `/parrainage`, `/rse`, `/espace-client`, `/livres-blancs`.
- Legal/system routes: `/mentions-legales`, `/confidentialite`, `/404`.
- Dynamic expertise routes from `src/data/expertises.data.ts`: five expertise pages plus `/expertises`.
- Dynamic agency routes from `src/data/agencies.data.ts`: five generated city pages plus `/agences`.
- Blog routes from `src/data/blog.data.ts`: the index, category pages, and 21 generated articles.
- Admin routes: dashboard, visual editor, login, and the existing operations views. Every route using `AdminLayout` is guarded by Supabase Auth and the `cms_admins` allow-list.

There is no localization or translation framework. The site is French-only (`lang="fr"`) and uses source modules under `src/content` and `src/data` for shared content.

## Editable content groups found

- Page headings, eyebrow labels, paragraphs, CTA labels, list items, testimonials, service descriptions, FAQ previews, and recruitment copy.
- Shared header navigation, popover descriptions, mobile navigation, footer columns, agency labels, and repeated contact CTAs.
- Content data modules for home, consultants, companies, about, experts, agencies, team, benefits, resources, FAQ, testimonials, and blog articles.
- React UI copy in the contact form, simulator, chatbot, and admin components.

## Content intentionally kept in code during the homepage proof

- `<title>`, meta descriptions, canonical URLs, Open Graph tags, and structured data. Changing these dynamically in a static client-only CMS would create an SEO mismatch.
- Route slugs, links, email addresses, external URLs, image alt text tied to an asset, ARIA labels, units, calculator constants, validation and error messages.
- Legal and privacy wording until it has a separate approval workflow.
- Google review authors and quotations so third-party statements remain exact.
- FAQ question/answer source data because the same entries drive the FAQ page and FAQ structured data; these should migrate together in a later phase.
- Blog article bodies and dynamic-route source data until a structured article workflow is designed.

## Implemented convention

The homepage uses `home.section.element` keys. Repeated values use the same key wherever they appear (for example team-card copy shown in both a portrait card and its detail panel). Global future content should use `global.navigation.*`, `global.footer.*`, and `global.cta.*`.

## Recommended expansion order

1. Validate the homepage editor with the owner.
2. Register global header and footer copy once for all routes.
3. Migrate the primary conversion pages: consultants, portage, companies, simulator, contact, and appointments.
4. Migrate shared FAQ data and update its structured-data rendering in the same change.
5. Migrate expertise, agency, and corporate pages.
6. Design a structured blog editor separately rather than treating full articles as single text fields.
