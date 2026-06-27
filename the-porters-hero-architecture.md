# The Porters — homepage hero rebuild
### Architecture & build brief for Codex

This document is the spec. Hand the whole file to Codex, or paste section 11 alone if you want a shorter prompt. Everything below is derived from: the 3DS.com/fr, Malt.fr and HelloWork.com screenshots (desktop + mobile) you provided, a live fetch of malt.fr and the current porters.fr site, the client's two emails, and the "Refonte site The Porters" requirements spreadsheet.

---

## 0. How to use this document

- **Section 1** explains *why* each design decision was made — read this once so you (and Codex, if it has to make a judgment call) don't drift back to generic patterns.
- **Sections 2–4** are the spec itself: tokens, hero anatomy, page flow.
- **Section 5** is for Codex specifically: file structure, data shape, component responsibilities.
- **Section 6** is copy-paste-ready French content.
- **Section 10** lists what's still undecided — don't let Codex silently invent answers to these.

---

## 1. Strategic synthesis — what we're borrowing, and why

The client's brief (both emails) boils down to three complaints about the current site and three reference points:

> "Trop simple", "effet site Ikea", design "grossier" → inspired by **Malt, HelloWork, Hays, Septeo**.

None of the three reference sites should be copied wholesale — each solves a different problem, and The Porters has a different one again (B2B *and* B2C trust, for a payroll/finance service, not a marketplace). Here's what each one actually contributes:

| Reference | What it's good at | What we take | What we leave behind |
|---|---|---|---|
| **3DS.com/fr** | Cinematic full-bleed photography, a confident minimal headline over a dark-overlay image, a bottom strip of slide thumbnails that doubles as navigation | The full-bleed photo treatment, the dark gradient overlay for legible white text, the bottom strip mechanic | The 6-slide unrelated-topics carousel — The Porters only has 2 audiences, not 6 stories, so we repurpose the strip instead of copying it |
| **Malt.fr** | A bold headline with one highlighted stat baked into the sentence, a floating card collage as social proof, a dual-tab search bar, a trust-badge row directly under the CTA | The highlighted-stat-in-headline trick, the trust-badge row placement (this is *exactly* what the spreadsheet's "Repères de confiance" item is asking for), the floating stat card as a compact alternative to Malt's full photo collage | The marketplace search bar (irrelevant — The Porters isn't a search product) and Malt's coral brand color (not The Porters' palette) |
| **HelloWork.com** | A huge raw number as proof ("909 822 offres"), a two-field search bar, a friendly AI-assistant callout card | The big-raw-number proof pattern, applied to The Porters' own numbers (+150 missions, +10 ans) | The 3D toy illustration style — playful illustration suits a consumer job board, but undercuts trust for a payroll/finance company. Real photography reads as more credible here (this is also closer to what Hays and Septeo do) |
| **Hays / Septeo** (named in the client's email, not screenshotted) | Restrained, "finance-grade" visual confidence — fewer competing elements, real photography, structured sub-navigation | The overall restraint: one signature move per section, not five at once | — |

**The signature move for this page** (per the design process: spend your boldness in one place): the 3DS-style bottom strip stops being decorative slide dots and becomes a **working audience switcher** — "Je suis consultant" / "Je suis entreprise" — that swaps the headline, photo, stat badge and CTA. This single mechanic solves four separate spreadsheet line items at once: *Accroche*, *Double discours*, *Navigation double cible*, and *Preuve sociale chiffrée*. It's also exactly the kind of thing that's cheap for Codex to build (one state variable, no new libraries) but reads as a deliberate, expensive-feeling interaction.

A second, smaller signature: **every number on the page renders in monospace** (stat badges, "+150", "+10 ans", agency count). This is a quiet nod to the actual audience — cybersecurity/data/DevOps consultants who read numbers in terminals all day — and it gives the page one consistent, recognizable typographic tic instead of zero.

---

## 2. Brand & design system

The current site already has the bones of a real identity (navy wordmark, a brass/gold underline on the eyebrow text, a warm background) — the "Ikea effect" the client describes is low contrast and flatness, not a wrong palette. So this refines what exists rather than replacing it.

### 2.1 Color tokens

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#11243B` | Primary text, nav background, dark overlay base on hero photo |
| `--ink-soft` | `#1C3550` | Secondary dark surface (cards on dark bg) |
| `--brass` | `#B8893B` | Accent only — underlines, the audience-switcher active state, icon strokes. Never as a body-text color on light backgrounds (fails contrast) |
| `--canvas` | `#F5F2EA` | Page background — warm stone, not stark white, not the previous pale-yellow "Ikea" beige |
| `--surface` | `#FFFFFF` | Cards, the floating stat badge, form fields |
| `--slate` | `#5B6472` | Secondary / muted text |
| `--signal` | `#1F6F56` | "Active" indicators — mission status dots, the RSE/sustainability callout. Used sparingly, never as a CTA color |

Contrast check: `--ink` on `--canvas` = 12.6:1 (AAA). `--brass` on `--ink` = 4.6:1 (AA for text ≥14px bold or icons; do not set brass body copy on white — only 2.1:1).

### 2.2 Typography

| Role | Typeface | Why |
|---|---|---|
| Display / headlines | **Bricolage Grotesque**, 700 | A grotesque with just enough personality to avoid the generic-SaaS feel of Inter/Helvetica-everywhere, without going full editorial-serif (which would push this toward the generic "warm cream + serif" AI look the brief should avoid) |
| Body / UI | **Inter**, 400/500 | Clean French-diacritic support, disappears into the background the way body text should |
| Numbers, stats, tags | **IBM Plex Mono**, 500 | The signature device described above — every digit on the page uses this, nothing else does |

All three are free, open-license Google Fonts — no licensing step blocks the build.

Type scale (desktop): H1 `clamp(2.5rem, 4vw, 3.75rem)` / H2 `2.25rem` / H3 `1.5rem` / body `1.0625rem` / small `0.875rem`. Line-height 1.1 for display, 1.6 for body.

### 2.3 Spacing & shape

- 8px base unit. Section vertical rhythm: 96px desktop / 56px mobile between major sections.
- Corner radius: 4px on buttons/inputs, 16px on cards, 0 on the hero photo itself (full-bleed, no rounding).
- One hairline border color only: `rgba(17,36,59,0.12)` — used for the trust-bar dividers and card outlines. No drop shadows on the hero layer (keeps the cinematic photo feel from 3DS); soft shadows (`0 8px 24px rgba(17,36,59,0.12)`) are fine on the floating stat card, which is meant to read as "lifted."

### 2.4 Motion

- Audience switch: 220ms crossfade + 12px slide on the content panel, image crossfades at 280ms. Stat badge number does a simple opacity/translate-y swap, no counting animation (counting-up animations on every load read as dated/templated — skip it).
- Respect `prefers-reduced-motion`: swap instantly, no transition, no scroll-reveals.
- No autoplay on the audience switcher — unlike 3DS's auto-rotating carousel, this one is user-driven only. The two audiences aren't interchangeable content to skim past, they're a fork the visitor should consciously choose.

---

## 3. Hero section — full anatomy

(The diagram above shows the zone layout — this section fills in what goes in each zone, at each breakpoint.)

### 3.1 Desktop (≥1024px), structure top to bottom

1. **Header** (sticky, `--ink` background, white text) — logo left; center nav split into "Consultants" / "Entreprises" / "The Porters" / "Ressources", each with a sub-category mega-menu (mirrors Septeo's structured sub-nav, per spreadsheet's "Sous-catégories" item); right side: "Rendez-vous" (ghost button) + "Simuler" (filled brass-on-ink button).
2. **Hero stage**, ~92vh, full-bleed photo with a left-to-right dark gradient overlay (`--ink` at 85% opacity on the left third, fading to 20% on the right, so the photo stays visible on the right while the text on the left stays legible — this is the exact 3DS mechanic).
   - **Content panel** (left ~55%): eyebrow label → headline → subhead (max 2 lines, ~60 characters/line) → primary CTA + secondary ghost CTA, stacked with 24px gaps.
   - **Visual panel** (right ~45%, behind the gradient): the photo itself, plus one **floating stat card** anchored bottom-right over the photo (white surface, 16px radius, soft shadow) — this is the Malt-style floating proof card, simplified to a single card instead of Malt's three-card collage, showing one mono-numeral stat tied to the active audience.
3. **Switcher + trust bar strip** (full width, sits at the bottom edge of the hero stage, `--ink-soft` background so it reads as part of the hero, not a separate section):
   - Left half: two tabs, "Je suis consultant" / "Je suis entreprise", styled as the 3DS thumbnail-strip but functional — active tab gets a 2px `--brass` underline (no background fill change, keep it quiet).
   - Right half: three trust items in a row, icon + one line each, separated by hairline dividers — this directly answers the spreadsheet's "Repères de confiance: sous le CTA principal, comme Malt".

### 3.2 Mobile (≤640px)

Photo and text don't sit side by side on a 380px-wide screen — they stack, the way the 3DS and Malt mobile screenshots both do:

1. Header collapses to logo + hamburger.
2. Hero photo becomes a shorter full-width band (~55vh) with a uniform dark overlay (not a gradient — on mobile there's no "right side" to keep clear) so headline text always sits on a readable dark photo.
3. Eyebrow → headline → subhead → CTA stack on top of the photo, left-aligned, full-width buttons.
4. The floating stat card is **not** absolutely positioned on mobile (it would collide with text) — it becomes an inline pill directly under the subhead instead: `+150` (mono) `missions en cours` (regular), same component, different layout mode.
5. Switcher tabs become two full-width pills stacked or side-by-side (whichever fits — test at 360px), placed directly under the photo, above the trust bar.
6. Trust bar becomes a vertically stacked list of 3 rows (icon + text), exactly like the Malt mobile screenshot's pattern under its hero search bar.

### 3.3 The audience switcher — what actually changes

| Element | "Je suis consultant" (default) | "Je suis entreprise" |
|---|---|---|
| Eyebrow | Portage salarial · Consultants IT | Solutions IT · Entreprises |
| Headline | Restez libre. On porte le reste. | Le bon consultant IT, sans la lourdeur administrative. |
| Subhead | Cybersécurité, data/IA, DevOps, agilité : vous gardez la mission, nous gérons le contrat, la paie et l'administratif. | Sourcing rapide, zéro gestion RH, un interlocuteur unique du brief à la fin de mission. |
| Photo | Consultant-facing (individual at work, laptop/screen context) | Client-facing (handshake, team/office context) |
| Stat badge | +150 · missions en cours | +10 ans · d'expertise IT |
| Primary CTA | Simuler mon salaire | Trouver un consultant |
| Secondary CTA | Prendre rendez-vous | Prendre rendez-vous |

Trust bar stays identical across both states (it's company-wide proof, not audience-specific) — only the content panel and visual panel swap.

---

## 4. Below the fold — how the rest of the homepage extends the hero

You asked specifically about the hero, but the spreadsheet's "Page d'accueil" section is really describing the hero *plus* what comes right after it, so here's the rest of the page skeleton for context (build order is in section 9 — you don't need to build all of this to ship the hero):

1. **Stat band** — 3–4 raw numbers in a row, mono numerals, large (HelloWork's "909 822 offres" move, scaled down): collaborateurs, +150 missions en cours, +10 ans d'expérience, 5 agences. *(Needs real figures — see section 10.)*
2. **Dual-audience cards** — two large clickable panels, "Consultant" / "Entreprise", each linking into its own space (mirrors HelloWork's "Trouver mon job / Trouver mon entreprise" split, and answers the spreadsheet's "Statuts proposés": portage salarial, CDI, CDD, freelance).
3. **Domains of expertise grid** — Cybersécurité / Data & IA / DevOps / Agilité / Product Ownership & chefferie de projet, each a card linking to a sub-page (the "Septeo-style sub-categories" item).
4. **"Les Plus" toggle** — reuses the same consultant/entreprise state as the hero switcher (global, lifted to page level) to show the matching benefits list from the spreadsheet (client benefits vs. collaborator benefits) without building a second switcher component.
5. **Logo wall** — client logos (BPCE, Groupama, Airbus, Safran, Thales, CMA-CGM…) and partner ESN logos (Sopra Steria, Akka, Scalian, Synanto, Inetum…), grayscale until hover.
6. **Testimonials carousel** — reuse the existing approved testimonials, restyled into the new card system.
7. **Agencies** — list/map of office locations.
8. **Simulators teaser** — two distinct entry points (freelance simulator vs. portage simulator — see open decisions, the spreadsheet calls for these as *separate* tools), plus the RDV booking CTA.
9. **FAQ accordion** — seeded with the client's 3 recurring questions (how portage works, mission-finding support, expense handling).
10. **Footer** — legal, the 5 agency addresses, links to the Group entities.

---

## 5. Component & code architecture (for Codex)

I don't know which stack you're handing Codex, so here's the same structure in both forms — use whichever matches the actual project.

### 5.1 Data shape (use this regardless of stack)

```json
{
  "consultant": {
    "eyebrow": "Portage salarial · Consultants IT",
    "headline": "Restez libre. On porte le reste.",
    "subhead": "Cybersécurité, data/IA, DevOps, agilité : vous gardez la mission, nous gérons le contrat, la paie et l'administratif.",
    "stat": { "value": "+150", "label": "missions en cours" },
    "ctaPrimary": { "label": "Simuler mon salaire", "href": "/simulateur-freelance" },
    "ctaSecondary": { "label": "Prendre rendez-vous", "href": "/rendez-vous" },
    "bgImage": { "src": "/assets/images/hero/hero-consultant.jpg", "alt": "Consultant IT en mission" }
  },
  "entreprise": {
    "eyebrow": "Solutions IT · Entreprises",
    "headline": "Le bon consultant IT, sans la lourdeur administrative.",
    "subhead": "Sourcing rapide, zéro gestion RH, un interlocuteur unique du brief à la fin de mission.",
    "stat": { "value": "+10 ans", "label": "d'expertise IT" },
    "ctaPrimary": { "label": "Trouver un consultant", "href": "/entreprises" },
    "ctaSecondary": { "label": "Prendre rendez-vous", "href": "/rendez-vous" },
    "bgImage": { "src": "/assets/images/hero/hero-entreprise.jpg", "alt": "Équipe The Porters avec un client" }
  }
}
```

```json
[
  { "icon": "wallet", "text": "Paie versée avant le 5 du mois, avance de trésorerie incluse" },
  { "icon": "user-check", "text": "Un interlocuteur unique du premier brief à la fin de mission" },
  { "icon": "shield-check", "text": "Frais de gestion transparents : aucun coût caché" }
]
```

### 5.2 If plain HTML / CSS / JS

```
/index.html
/assets/css/tokens.css        ← the section-2 variables as :root custom properties
/assets/css/hero.css
/assets/js/hero-switcher.js    ← reads the JSON above, swaps data-bound elements
/assets/images/hero/
```

`hero-switcher.js` responsibility: on tab click, set `aria-selected`, swap `textContent`/`src` on the bound elements from the JSON object, toggle a `.is-entreprise` class on the hero root for any CSS-only differences, and early-return with no transition if `matchMedia('(prefers-reduced-motion: reduce)').matches`.

### 5.3 If React / Next.js

```
/components/Hero/Hero.tsx              ← owns activeAudience state, passed down
/components/Hero/HeroContent.tsx       ← eyebrow, headline, subhead, CTAs
/components/Hero/HeroVisual.tsx        ← bg image + StatBadge
/components/Hero/AudienceSwitcher.tsx  ← the two tabs, role="tablist"
/components/Hero/TrustBar.tsx
/components/StatBadge.tsx              ← reused in section 4's stat band
/data/heroContent.ts                   ← the JSON above, typed
/styles/tokens.css
```

`Hero.tsx` lifts `activeAudience` so the page-level "Les Plus" toggle (section 4.4) can read the same state without duplicating a switcher.

### 5.4 Accessibility wiring (both stacks)

- Switcher: `role="tablist"` wrapping two `role="tab" aria-selected="true|false"` buttons; content panel is `role="tabpanel"`.
- Every hero photo gets descriptive `alt` text per the JSON above (not "hero image").
- Focus ring: 2px `--brass` outline, visible on every interactive element including the switcher tabs and trust-bar items if they're links.
- Color contrast already checked in section 2.1 — don't substitute different shades without re-checking.

---

## 6. Content & copy kit (French, ready to use)

This is new copy written for this brief — not lifted from any reference site. Swap in real figures before launch (see section 10).

**Eyebrow:** Portage salarial · Consultants IT

**Headlines (pick one per audience, or A/B both):**
- Consultant: *"Restez libre. On porte le reste."* / alt: *"Consultants tech : votre liberté, notre structure."*
- Entreprise: *"Le bon consultant IT, sans la lourdeur administrative."* / alt: *"Vos besoins IT, nos consultants vérifiés."*

**Trust bar (3 lines):**
1. Paie versée avant le 5 du mois, avance de trésorerie incluse
2. Un interlocuteur unique du premier brief à la fin de mission
3. Frais de gestion transparents : aucun coût caché

**Stat band placeholders (confirm real numbers — section 10):**
- `[X]` consultants accompagnés
- +150 missions en cours
- +10 ans d'expertise IT
- 5 agences en France

**FAQ seed (from the client's email):**
1. Comment fonctionne le portage salarial ?
2. Pouvez-vous m'accompagner dans la recherche de missions ?
3. Comment sont gérés les frais professionnels ?

---

## 7. Asset & image brief

Since you're starting with image creation before code, here's what to source or generate first:

- **Two hero photographs** (one per audience state), real photography rather than AI-generated people or 3D illustration — for a payroll/finance trust category, real photography reads as more credible (this is the Hays/Septeo direction the client asked for, not the HelloWork toy-illustration direction). Consultant shot: one person, laptop or dual-monitor context, natural light, not a posed stock-smile. Entreprise shot: two people in conversation, office context, mid-conversation rather than looking at camera.
- **Team photos** for the "Qui sommes-nous" page — the client's email explicitly asked for "photo + courte vidéo dynamique" of real collaborators, not stock photography. Flag this to the client as a shoot to schedule, not something to fake.
- **Icon set**: outline style, consistent stroke width — wallet, user-check, shield-check, map-pin, clock, badge-check, trending-up. (Lucide or Tabler icons both fit; pick one set and don't mix.)
- **Client + partner logos**: BPCE, Groupama, Airbus, Safran, Thales, CMA-CGM (clients) and Sopra Steria, Akka, Scalian, Synanto, Inetum (partner ESNs) — request vector (SVG) versions from the client rather than screenshotting their current logos off other sites.

---

## 8. Accessibility, performance, responsive checklist

- Breakpoints: mobile ≤640px / tablet 641–1024px / desktop ≥1025px.
- LCP target: the hero photo is almost certainly the LCP element — serve it via `<picture>` with AVIF/WebP + JPG fallback, `fetchpriority="high"`, and preload the default (consultant) variant; lazy-load the entreprise-variant image only once the visitor switches tabs.
- `font-display: swap` on all three custom fonts; subset to Latin + French accented characters to keep the font files small.
- No layout shift on tab switch — both hero variants must render at the same content-panel height (pad the shorter subhead, don't let the box resize).
- `prefers-reduced-motion`: instant state swap, no crossfade, no scroll-triggered reveals anywhere on the page.

---

## 9. Build sequence

1. **Foundations** — lock tokens (section 2), resolve the open decisions in section 10, get final photography and real stats.
2. **Hero + trust bar + stat band** — this is the literal scope of your current ask; ship it as a standalone, testable unit first.
3. **Dual-audience cards + expertise grid + logo wall + testimonials** — rest of the homepage.
4. **Simulators** (two separate tools — freelance and portage) **+ RDV booking integration**.
5. **Full IA migration** — agency pages, FAQ page, "Qui sommes-nous"/Groupe page, blog carry-over from the current WordPress site.

---

## 10. Open decisions — don't let these get silently auto-decided

| Decision | Why it's open | Recommendation if you need a default |
|---|---|---|
| **One site vs. one site for all 3 Group entities** | Client explicitly asked which is better in their email | Keep The Porters as its own dedicated site if the three entities have distinct offers/audiences — clearer SEO topical focus and a clearer message per the spreadsheet's "Double discours" concern. Only merge if all three genuinely target the same buyer with overlapping services. |
| **Agency city list** | The email lists *Paris, Lyon, Marseille, Montpellier, Toulouse*; the spreadsheet lists *Paris, Lyon, Aix-en-Provence, siège à Montpellier* — these don't match | Confirm the authoritative list with the client before it ships anywhere on the page |
| **Real stats** | "+150 missions", number of collaborateurs, masse salariale figure are all referenced as proof points but no source numbers were provided | Get exact, current figures — don't ship placeholder numbers as if they were real |
| **Tech stack** | Not specified in your message | Section 5 covers both plain HTML/CSS/JS and React/Next — tell Codex (or me) which one the actual project uses and I can collapse this doc to just that path |
| **Photography vs. illustration** | Client referenced both marketplace sites (illustration-friendly) and Hays/Septeo (photography-led) | Recommendation above is real photography — flag if the client pushes back |
| **Color/type tokens approval** | Section 2 refines rather than replaces the current brand | Get a quick client thumbs-up on the hex values before Codex bakes them into 40 components |

---

## 11. Condensed brief — paste this directly into Codex

```
Build the new homepage hero for "The Porters" (French IT portage salarial company).

STRUCTURE (desktop): sticky header → full-bleed photo hero (~92vh) with a
left-to-right dark gradient overlay → left content panel (eyebrow, headline,
subhead, primary+secondary CTA) → right visual panel (photo + one floating
white stat card, mono numerals) → full-width bottom strip with two tabs
("Je suis consultant" / "Je suis entreprise") that swap headline+subhead+
photo+stat+CTA, plus 3 trust-bar items with icons on the same strip.

MOBILE: photo+overlay shrink to ~55vh, content stacks on top of it, the
floating stat card becomes an inline pill under the subhead, switcher tabs
go full-width, trust bar becomes a stacked 3-row list.

TOKENS: --ink #11243B, --brass #B8893B, --canvas #F5F2EA, --surface #FFFFFF,
--slate #5B6472, --signal #1F6F56. Fonts: Bricolage Grotesque 700 (headlines),
Inter 400/500 (body/UI), IBM Plex Mono 500 (every number on the page, no
exceptions). Radius 4px controls / 16px cards / 0 on the hero photo.

DATA: use the JSON content object in section 5.1 of the attached spec for
the two audience states, and the trust-bar array in 5.1.

BEHAVIOR: switcher is click-only, no autoplay. 220ms crossfade on switch,
instant swap if prefers-reduced-motion. role="tablist"/"tab"/"tabpanel" for
a11y. No layout shift between the two states.

Use [STACK: tell Codex plain HTML/CSS/JS or React/Next here] — see section
5.2/5.3 of the attached spec for the exact file structure.
```
