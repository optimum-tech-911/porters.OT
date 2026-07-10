# The Porters — UI/Motion Implementation Brief for the Next Codex Chat

Date: 2026-07-09  
Project: Astro website in `/Users/optimumtech/Desktop/Websites /the porters`

This file is the handoff brief for the next Codex chat. It consolidates all client notes, screenshots, current project context, visual direction, required assets, and the exact implementation order.

The main rule: do not restart the whole website. Keep the content work already done. The next work is a UI/UX, motion, and interaction improvement pass, starting with the landing page.

---

## 1. Current objective

The Porters website should feel:

- lighter and cleaner;
- premium, human, and trustworthy;
- more interactive without becoming heavy;
- inspired by the structure/animation feeling of Konectiv and Malt references, but visually authentic to The Porters;
- fully responsive, with mobile treated as equally important as desktop.

The client is unhappy with the current state because some sections are visually static, overcomplicated, or poorly planned. The next implementation must be more deliberate.

---

## 2. Important constraints

Do not change the validated content direction unless the requested UI requires small labels/CTA adjustments.

Do not blindly add generic marketing claims.

Do not use paid AI APIs.

Do not use LinkedIn-hosted images directly in the website. Use only images provided by the client/user and placed in the project.

Do not show “taux de gestion” in the simulator UI.

Do not put a simulator block in the homepage hero.

Do not copy Konectiv, Malt, or the reference map directly. Use them only as layout/motion inspiration.

Do not restore or delete unrelated dirty worktree changes unless explicitly asked.

Use the project’s existing Astro setup. Follow the project instruction:

```bash
astro dev --background
astro dev status
astro dev logs
astro dev stop
```

Use CSS transforms and opacity for most animation. Avoid heavy animation libraries unless there is a very clear benefit.

Respect accessibility:

- keyboard navigation;
- focus-visible states;
- `aria-expanded` on dropdowns/popovers;
- `prefers-reduced-motion`;
- pause auto-moving elements on hover/focus;
- no hover-only critical content on mobile.

---

## 3. Existing local files to inspect first

Before editing, inspect these files:

```txt
src/components/layout/SiteHeader.astro
src/components/home/HomeHero.astro
src/pages/index.astro
src/components/agencies/FranceAgencyMap.astro
src/data/agencies.data.ts
src/pages/qui-sommes-nous.astro
src/pages/faq.astro
src/styles/global.css
porters_hero_mockup_2.html
public/images/france-outline-source.svg
```

Known current issue from screenshots:

- An Astro dev error showed: `Image not found: /Users/optimumtech/Desktop/Websites /the porters/hero 2.webp`.
- Fix any absolute or missing image imports. Assets should be imported correctly from the project or placed in `public/images/...`.

---

## 4. Implementation phases

### Phase 1 — Landing page only

Start here. Do not begin About page redesign before Phase 1 is clean.

Deliver:

1. Rebuilt/polished navbar.
2. New homepage hero based on `porters_hero_mockup_2.html` direction.
3. Improved landing proof section: “Des repères clairs pour avancer avec confiance”.
4. Remove agencies/map section from landing page if it appears there.
5. Confirm landing desktop and mobile visually.

### Phase 2 — About page

Only after landing is approved.

Deliver:

1. Mission/vision section with real animated schema.
2. Expertise section with usable interactive orbit/radar.
3. “Notre histoire” with real scroll-driven timeline, not fake static cards.
4. Mobile-specific layouts for all schemas.

### Phase 3 — Supporting pages

After Phase 1 and Phase 2.

Deliver:

1. Dedicated agencies page map refinement.
2. FAQ page as an animated schema / guided question experience.
3. Final simulator visual cleanup.
4. Final global motion pass and QA.

---

## 5. Phase 1 detail — Navbar

The navbar must be visually fixed first. The current navbar feels heavy and not interactive enough.

### Desired feeling

Use the order/logic inspired by Konectiv’s centered-logo navigation, but keep The Porters identity:

- dark navy / transparent gradient background;
- centered logo;
- left/right nav groups closer to the logo;
- larger, more readable nav buttons;
- subtle hover underline / glow / dropdown reveal;
- smooth hide on scroll down;
- smooth reappear on scroll up.

Reference used: Konectiv currently uses a centered logo with left-side items like “Le portage salarial”, “Nos offres”, “Simulateur” and right-side items like “Nos avantages”, “Ressources”, “À propos”. The Porters should be inspired by the balance, not copy the content exactly.

### Navbar content

Remove:

- “Nos avantages” as a top-level nav item.

Replace with:

- “Le groupe”.

Recommended desktop structure:

```txt
Left group:
- Le portage salarial
- Nos offres
- Ressources

Center:
- The Porters logo

Right group:
- Le groupe
- Contact icon
- Rendez-vous
```

Optional: keep “Simulateur” as a less-dominant direct link if the client still wants it in the nav, but do not make it part of the hero and do not let it distract from the main conversion path. If keeping it, place it either under “Le portage salarial” or as a small direct item near “Nos offres”.

### Dropdowns / popovers

The dropdowns should be premium cards, not basic lists.

Suggested structure:

#### Le portage salarial

- Comprendre le portage salarial
- Pour consultants indépendants
- FAQ portage salarial

#### Nos offres

- Consultants
- Entreprises
- Expertises IT

#### Ressources

- Blog
- FAQ
- Livres blancs / Guides, if present

#### Le groupe

Only:

- Qui sommes-nous
- Nos agences

When hovering/focusing “Nos agences”, show a small rich popover:

- mini France outline;
- pins for agencies;
- short list of cities;
- CTA “Voir nos agences”;
- each city clickable if the page exists.

### Scroll behavior

Implement a smart header:

- visible at top of page;
- hides when scrolling down after about 100–140 px;
- reappears when scrolling up;
- remains visible when a dropdown/menu is open;
- remains visible when a nav item has focus;
- mobile menu must not close accidentally while scrolling;
- transition should be smooth and subtle, not jumpy.

Pseudo-logic:

```ts
let lastScrollY = window.scrollY;

onScroll:
  current = window.scrollY
  if current < 80 => show header
  else if current > lastScrollY + 8 and no menu open => hide header
  else if current < lastScrollY - 8 => show header
  lastScrollY = current
```

Use classes like:

```txt
site-header--hidden
site-header--scrolled
site-header--menu-open
```

### Mobile navbar

Mobile is critical.

Requirements:

- logo left, large circular menu button right;
- no clipped title under the fixed header;
- full-screen or large drawer menu;
- menu items grouped clearly;
- “Rendez-vous” CTA visible in drawer;
- dropdown content must be tap-friendly;
- no horizontal overflow;
- header height accounted for with page padding or `scroll-padding-top`.

---

## 6. Phase 1 detail — Homepage hero

The homepage hero must be redesigned. Use `porters_hero_mockup_2.html` as a structural inspiration, but do not copy its colors or exact demo content.

The user/client likes the Malt-style hero idea:

- strong editorial headline;
- lighter left side;
- visual/cards/people cluster on right;
- floating panels;
- hover/click interactions;
- useful contextual popups;
- not heavy, but alive.

### Key requirements

No simulator in the hero.

Use real The Porters people, not AI engineer placeholders.

People to use:

```txt
Eric BENSAID
Role: Fondateur
LinkedIn: https://fr.linkedin.com/in/eric-bensaid-73573816

Ambre LAMBERT
Role: Directrice commerciale IT
LinkedIn: https://fr.linkedin.com/in/ambrelambert

Lisa Delrieu
Role: Chargée de recrutement | The Porters
LinkedIn: https://fr.linkedin.com/in/lisa-delrieu
```

The user provided images for these three people. Use those local assets once they are placed in the project.

### Suggested hero message

The exact copy can be adjusted, but keep it clear and specific.

Preferred H1 direction:

```txt
Votre mission avance mieux quand le cadre est clair.
```

Alternative:

```txt
Des experts IT libres, un cadre humain pour les accompagner.
```

Alternative:

```txt
Le portage salarial, avec des interlocuteurs identifiés.
```

Suggested subcopy:

```txt
The Porters accompagne les consultants du numérique et les entreprises dans le cadrage des missions, la facturation, la paie et le suivi administratif.
```

### Hero CTAs

Primary:

```txt
Parler à un conseiller
```

Secondary:

```txt
Découvrir le portage
```

Optional third path:

```txt
Je suis une entreprise
```

Do not include:

```txt
Simuler mes revenus
```

inside the hero.

### Hero interaction concept

Build a right-side interactive cluster with:

- three person cards: Eric, Ambre, Lisa;
- small floating role/context cards;
- one central “Votre mission” or “Votre accompagnement” card;
- 3–4 small topic chips around the cluster:
  - Contrat
  - Facturation
  - Paie
  - Suivi

On hover/focus/click, each item opens a detail popover/panel.

Example popovers:

#### Eric — Fondateur

Text:

```txt
Une vision portée par l’expertise IT et la proximité humaine.
```

Buttons:

- Découvrir le groupe → `/qui-sommes-nous`
- Prendre rendez-vous → `/rendez-vous`

#### Ambre — Direction commerciale IT

Text:

```txt
Un point d’entrée pour qualifier les besoins entreprises et cadrer les missions.
```

Buttons:

- Je suis une entreprise → `/entreprises`
- Voir les expertises → `/expertises`

#### Lisa — Recrutement / accompagnement

Text:

```txt
Un accompagnement pour orienter les profils, clarifier les missions et faciliter les échanges.
```

Buttons:

- Je suis consultant → `/consultants`
- Parler à un conseiller → `/rendez-vous`

#### Contrat / Facturation / Paie / Suivi chips

Each opens a small explanation and routes to:

- `/portage-salarial`
- `/consultants`
- `/faq`

### Hero motion

Use tasteful motion:

- staggered reveal on load;
- floating cards with very subtle movement;
- image cards slight parallax on pointer movement;
- chips have hover lift and glow;
- popup opens with scale/opacity;
- dotted connector lines can animate softly;
- no constant aggressive animation.

Reduced motion:

- no floating;
- no parallax;
- simple opacity reveal only.

### Hero mobile

Do not cram desktop absolute-position elements into mobile.

Mobile layout should be:

1. headline;
2. subcopy;
3. CTA buttons;
4. horizontal swipe row of the three team cards;
5. expandable topic cards for Contrat / Facturation / Paie / Suivi;
6. popovers become inline accordions or bottom-sheet style panels.

No clipped content. No horizontal page overflow.

---

## 7. Phase 1 detail — “Des repères clairs pour avancer avec confiance”

Current section is not good enough. It is too static and not integrated into a stronger interaction system.

Keep the idea, improve the execution.

Suggested cards:

```txt
Une équipe réactive
Un interlocuteur identifiable pour comprendre la situation et les prochaines étapes.

Un accompagnement humain
Des échanges adaptés à la mission, au statut et au rythme du consultant.

Une présence nationale
Des points de contact locaux et des rendez-vous organisés à distance.

Une expertise IT
Cyber, data, IA, cloud, DevOps, produit, projet et transformation.
```

Possible implementation:

- dark navy full-width band;
- large editorial title;
- four glass/outline cards;
- circular animated accents inside each card;
- staggered scroll reveal;
- on hover/focus, card expands or reveals a short CTA row;
- CTA examples:
  - “Découvrir le portage”
  - “Voir les expertises”
  - “Parler à un conseiller”

Do not overcomplicate this section. It should be a confident premium proof section, not a heavy diagram.

---

## 8. Agencies/map requirements

The map belongs on the agencies page or inside navbar agency popover, not as a full landing-page section.

The user provided a real reference map with six agency points. Do not copy-paste the image. Use it to place the dots correctly.

Agencies shown in the latest map reference:

```txt
The Porters Lille
The Porters Paris
The Porters Lyon
The Porters Bordeaux
The Porters Montpellier
The Porters Aix-Marseille
```

Important current data note:

- Current `src/data/agencies.data.ts` has active detailed pages for Paris, Lyon, Aix-en-Provence, Marseille, Montpellier.
- It also contains legacy notes for Bordeaux and Lille in the current project history, but they may not be active pages.
- Before publishing Bordeaux and Lille as active agencies, confirm whether the client wants them active.
- If not confirmed, show them as “point de contact à confirmer” or keep them out of active links.

### Approximate pin coordinates

Use these as a starting point when positioning pins on the current SVG outline. Adjust visually against the supplied map.

Percent coordinates:

```ts
const agencyPinPositions = {
  lille: { x: 59, y: 10 },
  paris: { x: 55, y: 31 },
  lyon: { x: 73, y: 62 },
  bordeaux: { x: 33, y: 70 },
  montpellier: { x: 60, y: 86 },
  aixMarseille: { x: 74, y: 84 },
};
```

If Aix and Marseille are separate:

```ts
const agencyPinPositions = {
  aix: { x: 75, y: 81 },
  marseille: { x: 76, y: 87 },
};
```

### Map interaction

Desktop:

- hover/focus a pin → reveal city card;
- click pin/card → go to agency page if active;
- if page inactive → go to `/agences` or `/rendez-vous`;
- animated dashed connection lines are okay, but keep them accurate and subtle.

Mobile:

- map should not be the only navigation;
- show a city list below the map;
- tap a city row to open details;
- no tiny hover-only dots.

---

## 9. Phase 2 detail — About page

The About page currently has the right general ideas but the execution feels random and not top tier.

The client wants a section inspired by KwickStart’s “Qui sommes-nous ?” page:

- mission/vision;
- expertise;
- values;
- history/timeline;
- human/ESN context.

But do not copy KwickStart. Rewrite and adapt to The Porters and the existing content direction.

### Mission / vision schema

Current problem:

- central schema feels fake/static;
- cards are not animated enough;
- mobile layout is okay-ish but not premium.

Target:

- central statement;
- surrounding mission cards;
- cards reveal progressively on scroll;
- connectors animate in;
- hover/focus opens deeper explanation;
- mobile becomes a clean vertical narrative, not a broken orbit.

Possible central statement:

```txt
Libre dans la mission. Accompagné dans le cadre.
```

Surrounding principles:

```txt
Rendre le portage lisible
Comprendre les métiers tech
Valoriser l’expertise humaine
Créer une relation durable
Sécuriser sans alourdir
S’adapter au contexte
```

### Expertise section

Current issue:

- screenshot showed the expertise schema not functioning visually;
- layout can be too large/cropped;
- interactions need a real selected state.

Target:

- interactive radar/orbit section;
- central “Expertises IT” circle;
- domain pills/cards around it;
- hover/click selects an expertise;
- right-side detail card updates;
- clicking detail CTA goes to the correct expertise page.

Expertises:

```txt
Cybersécurité
Data & IA
Cloud & DevOps
Agilité & Coaching
Produit & Projet
```

Mobile:

- no giant orbit;
- show central card plus tap-friendly expertise list;
- selected detail card below;
- no overflow.

### Notre histoire

Current issue:

- feels like a fake static timeline.

Target:

- real scroll-driven timeline;
- progress line fills as user scrolls;
- active step enlarges/subtly highlights;
- text reveals beside the active date;
- desktop can be horizontal or vertical depending on layout;
- mobile must be vertical, clean, readable.

Suggested history steps:

```txt
2017 — Les racines de l’écosystème
L’aventure à l’origine du groupe démarre autour de THE BIG PORTERS, avec une ambition : rapprocher les entreprises de talents qualifiés sur leurs projets numériques.

Ensuite — Deux métiers complémentaires
L’écosystème se structure autour de deux réponses distinctes : l’expertise ESN portée par KwickStart et le portage salarial proposé par The Porters.

Aujourd’hui — Un cadre pensé pour les experts IT
The Porters accompagne des consultants et des entreprises sur des missions cyber, data, IA, cloud, DevOps, produit, projet et transformation.

La suite — Rester humain à mesure que le réseau grandit
La priorité reste la même : une information lisible, un interlocuteur identifiable et un accompagnement adapté à chaque mission.
```

---

## 10. Phase 3 detail — FAQ page

The FAQ should become more dynamic later.

Direction:

- not just a plain accordion list;
- create a guided schema:
  - “Comprendre le portage”
  - “Démarrer une mission”
  - “Facturation / paie”
  - “Entreprise”
  - “Expertises IT”
- clicking a topic filters/highlights questions;
- scroll reveal question cards;
- use accordion with `aria-expanded`;
- keyboard accessible;
- mobile clean.

---

## 11. Required assets from the user/client

Ask the user/client to provide these before or during Phase 1.

### Team portraits for hero

Place in:

```txt
public/images/team/
```

Needed files:

```txt
eric-bensaid.webp
ambre-lambert.webp
lisa-delrieu.webp
```

Preferred:

- 1200 × 1200 or larger;
- WebP or PNG;
- sharp face;
- enough margin around head/shoulders;
- consistent lighting if possible.

Optional cutout versions for a more Malt-like hero:

```txt
eric-bensaid-cutout.webp
ambre-lambert-cutout.webp
lisa-delrieu-cutout.webp
```

Cutout specs:

- transparent background;
- full bust / upper body;
- natural shadow can be added in CSS.

### Hero background / texture

Optional, but useful:

```txt
public/images/hero/porters-office-abstract.webp
public/images/hero/porters-team-bg.webp
```

This can be:

- blurred office background;
- meeting-room detail;
- The Porters brand wall;
- subtle abstract navy/cream texture.

### Icons / small graphics

Needed for hero chips and proof cards:

```txt
contract.svg
invoice.svg
payroll.svg
support.svg
expertise-it.svg
company.svg
consultant.svg
map-pin.svg
arrow-up-right.svg
```

Place in:

```txt
public/icons/
```

Keep them line-based, simple, and in The Porters palette.

### Map asset

Current project has:

```txt
public/images/france-outline-source.svg
```

If this outline is not accurate enough, provide a new clean vector:

```txt
public/images/france-outline-porters.svg
```

Requirements:

- France mainland outline only;
- no labels;
- no copyright-protected map directly copied;
- clean SVG paths;
- works on dark navy and cream backgrounds.

### Optional proof/client logos

If client approves public display, provide grayscale SVG/PNG logos for:

```txt
public/images/logos/
```

Only use logos that are explicitly approved.

---

## 12. Phase 1 suggested file changes

Likely files:

```txt
src/components/layout/SiteHeader.astro
src/components/home/HomeHero.astro
src/pages/index.astro
src/styles/global.css
```

Possible new files:

```txt
src/components/home/HeroTeamCard.astro
src/components/home/HeroInteractivePanel.astro
src/components/home/LandingProofCards.astro
src/components/layout/AgencyNavPreview.astro
src/utils/headerScroll.ts
```

Do not create too many small components if the existing structure is simpler. The goal is maintainability, not component theater.

---

## 13. Implementation standards

### Motion standards

Use:

```css
transform
opacity
clip-path only if performant and not abused
```

Avoid animating:

```css
width
height
top
left
box-shadow heavily
filter heavily
```

Every auto animation must:

- be subtle;
- pause on hover/focus if interactive;
- disable/reduce under `prefers-reduced-motion`.

### Interaction standards

For every hover interaction, provide an equivalent:

- focus;
- click/tap;
- mobile accordion or bottom panel.

### Visual standards

No broken layout.

No clipped headlines.

No tiny unreadable UI.

No random dots on the map.

No huge black/blank blobs.

No absolute-positioned desktop design forced onto mobile.

No top fixed header covering content.

---

## 14. Visual QA checklist

After implementation, run:

```bash
npm run build
```

Then run dev server:

```bash
astro dev --background
astro dev status
```

Open the local site and visually inspect:

Desktop:

```txt
1440 × 900
1280 × 800
```

Mobile:

```txt
390 × 844
430 × 932
```

Required checks:

- navbar appears correctly at top;
- navbar hides when scrolling down and reappears when scrolling up;
- dropdowns open on hover/focus;
- dropdowns are keyboard accessible;
- mobile menu opens/closes cleanly;
- hero does not show simulator;
- hero uses the three The Porters people;
- hero popovers/cards open correctly;
- hero CTAs route correctly;
- landing proof section has hover/focus states;
- no console errors;
- no image-not-found errors;
- no horizontal overflow;
- chatbot does not cover critical CTAs on mobile;
- reduced-motion mode does not break layout;
- build passes.

If browser inspection tools are available, take screenshots before finalizing.

---

## 15. Definition of done for Phase 1

Phase 1 is done only when:

1. The navbar is visually premium, centered, interactive, and scroll-aware.
2. “Nos avantages” is removed from the top nav and replaced by “Le groupe”.
3. The “Le groupe” dropdown contains only “Qui sommes-nous” and “Nos agences”.
4. The “Nos agences” preview is useful and has accurate city placement.
5. The hero follows the `porters_hero_mockup_2.html` design direction but with The Porters identity.
6. The hero has no simulator.
7. The hero uses Eric, Ambre, and Lisa.
8. Hero hover/click panels provide useful details and routes.
9. “Des repères clairs pour avancer avec confiance” is improved visually and interactively.
10. The landing page works well on desktop and mobile.
11. `npm run build` passes.
12. Visual inspection confirms no “wtf” layout issues.

---

## 16. Starter prompt for the next Codex chat

Use this prompt in the next chat:

```txt
You are working on The Porters Astro website.

Read NEXT_CODEX_UI_IMPLEMENTATION_BRIEF.md first and follow it exactly.

Start with Phase 1 only:
- fix/enhance the navbar;
- rebuild the homepage hero based on porters_hero_mockup_2.html but with The Porters identity;
- remove the hero simulator;
- use Eric BENSAID, Ambre LAMBERT, and Lisa Delrieu as the three hero people once their images are available;
- improve the landing section “Des repères clairs pour avancer avec confiance”;
- do not change the already validated content work;
- do not start the About page yet.

After implementation, run npm run build and visually inspect desktop and mobile before final response.
```

---

## 17. Open questions to confirm with the client/user

Ask these only if needed before publishing final UI:

1. Are Lille and Bordeaux active agencies again, or should they be shown only as legacy/reference points?
2. Should “Simulateur” remain in the navbar as a direct link, or move under “Le portage salarial”?
3. Are Eric, Ambre, and Lisa portraits approved for public homepage display?
4. Are LinkedIn profile links allowed on the website, or should the hero cards only route internally?
5. Which booking URL is canonical for “Rendez-vous”?
6. Are any client logos approved for public display?

---

## 18. Final reminder

The goal is not to add more visual noise. The goal is controlled premium interaction.

Build fewer elements, but make them feel intentional:

- cleaner hierarchy;
- better hover/focus/tap behavior;
- stronger motion;
- accurate map placement;
- real mobile design;
- no broken images;
- no fake claims.

