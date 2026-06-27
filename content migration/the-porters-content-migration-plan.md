# The Porters — Content Migration Plan
**Old WordPress site → New Astro / React / Tailwind site**
Prepared for handoff to Codex · Last crawl: June 26, 2026

## Legend (used throughout this document)

| Mark | Meaning |
|---|---|
| ✅ | Extracted directly from the live old site — source URL given |
| 📧 | Comes only from the client email, not visible on the old site |
| 🆕 | New copy/structure proposed for the migration, grounded in ✅ and/or 📧 |
| ⚠️ | Needs client validation before it goes live — see Section 9 for the full checklist |

No addresses, phone numbers, team members, testimonial quotes, certifications, or metrics in this document were invented. Anything not explicitly sourced is flagged ⚠️.

---

## 0. Sources crawled for this plan

| Page | URL |
|---|---|
| Homepage | https://www.porters.fr/ |
| Qui sommes-nous | https://www.porters.fr/qui-sommes-nous/ |
| FAQ | https://www.porters.fr/faq/ |
| Contact | https://www.porters.fr/contactez-nous/ |
| Blog index | https://www.porters.fr/blog/ |
| The Porters Paris | https://www.porters.fr/the-porters-paris/ |
| The Porters Lyon | https://www.porters.fr/old-portage-salarial-lyon/ |
| The Porters Aix-Marseille | https://www.porters.fr/old-portage-salarial-marseille/ |
| The Porters Bordeaux | https://www.porters.fr/old-portage-salarial-bordeaux/ |
| The Porters Lille | https://www.porters.fr/old-portage-salarial-lille/ |
| The Porters Montpellier | https://www.porters.fr/old-portage-salarial-montpellier/ |
| 8 blog posts | listed in Section 5 |

**Pages linked from the nav but NOT audited in this pass** (do not assume their content — they need their own pass before migration): `/portage-salarial-sur-mesure/`, `/avantages-du-portage-salarial-pour-les-entreprises/`, `/livres-blancs/`, `/recrutement-commercial-porters/`, `/parrainage/`, `/simulation-revenus/`, `/simulateur-de-salaire/`, `/reunion-d-information/`, `/prendre-rdv-avec-un-charge-d-affaires/`.

---

## 1. Homepage content to migrate

### 1.1 Hero / testimonial carousel ✅
*Source: homepage*

Three rotating slides, each pairing a short testimonial line with a CTA. All three link to `/contactez-nous/` under the label "Prendre RDV avec un chargé d'affaires."

| Slide | Name / role | CTA label |
|---|---|---|
| 1 | Delphine, Paris — Product-Owner en Portage Salarial | Prendre RDV avec un chargé d'affaires |
| 2 | Chloé, Toulouse — DSI en Portage Salarial | Prendre RDV avec un chargé d'affaires |
| 3 | Andy P. — Chef de Projet Digital en Portage Salarial | Prendre RDV avec un chargé d'affaires |

Full quotes are in Section 3.

⚠️ The CTA says "Prendre RDV" (book an appointment) but currently routes to a plain contact form, not a calendar/booking tool. Two other URLs (`/reunion-d-information/`, `/prendre-rdv-avec-un-charge-d-affaires/`) appear elsewhere on the site and may be the actual booking flow — confirm with client which is canonical before wiring the new hero CTA.

**Recommendation:** keep the rotating testimonial-hero pattern (it's a strong, low-effort trust signal for a B2B/consultant audience) but point the CTA at one clear, working booking destination.

### 1.2 "L'atelier du Portage Salarial" process blocks ✅
*Source: homepage*

Tagline: *"Simplicité, Souplesse, Service, Sécurité…"*

Three steps, each with a short label and one paragraph of supporting copy:

1. **Optimisez vos revenus** — the consultant negotiates the mission directly with the client; The Porters sets up the legal framework (employment contract consultant↔The Porters + service contract The Porters↔client).
2. **Libérez-vous des contraintes administratives** — The Porters manages the full administrative/financial relationship between consultant and client.
3. **Conservez votre statut de salarié** — The Porters converts revenue into net salary, handles invoicing and payslips, consultant keeps full employee social benefits.

**Recommendation:** the 3-step structure is clear and worth keeping as a homepage section; rewrite the copy in the new brand voice. ⚠️ Confirm with client whether the "L'atelier du Portage Salarial" name should be kept or replaced — it reads as a slightly dated WordPress-era heading.

### 1.3 Simulator CTA ✅
*Source: homepage*

"Simulez vos revenus dès maintenant — Obtenir une proposition immédiate en quelques clics" → button "Calculer mon salaire."

⚠️ The old site uses **two different simulator URLs** depending on the page (`/simulation-revenus/` on the homepage, `/simulateur-de-salaire/` on the FAQ and agency pages). Confirm with client which tool is canonical/still maintained before linking the new site's CTA.

### 1.4 Testimonials section ✅
*Source: homepage*

Heading: *"Ils partagent leurs expériences"* — stat: **"97% de collaborateurs satisfaits."**

⚠️ No date or methodology is shown anywhere for the 97% figure. Recommend asking the client whether this stat is current and where it originates before reusing it on the new site — publishing an unsourced satisfaction stat is a credibility risk if challenged.

### 1.5 Blog preview ✅
*Source: homepage*

The homepage shows the 3 most recent posts under the heading *"Le Live #The Porters."* At crawl time these were: "Les secteurs d'activité les plus adaptés au portage salarial," "Comment optimiser sa rémunération en portage salarial ?," "Le rôle du chargé de compte en portage salarial."

**Recommendation:** keep a "3 latest posts" homepage module, fed dynamically from `blog.data.ts` (Section 8) so it never needs manual upkeep. ⚠️ Confirm if "Le Live #The Porters" naming should carry over.

### 1.6 Trust / differentiation blocks based on the client email 📧

The 7 differentiators below come from the client email. Cross-checking them against the live site found that **several are already echoed in real content** — useful corroboration — while a couple have **no supporting evidence on the old site at all** and need real proof points before publishing. Detail and exact wording in Section 2; summary:

| Differentiator | Corroborated on old site? |
|---|---|
| Accompagnement humain et personnalisé | ✅ Yes — phrase appears verbatim on the Paris, Lyon, Bordeaux, Montpellier agency pages |
| Équipe disponible et réactive | ✅ Yes — contact page promises "Nous vous répondrons sous 24h" |
| Interlocuteur unique | ✅ Yes — stated explicitly in the blog post "Le portage salarial, une solution flexible" |
| Paie rapide (5 premiers jours ouvrés) + avance de trésorerie | ✅ Partially — FAQ confirms salary paid "entre le 1er et le 5 du mois suivant," and two sources mention a salary advance. The specific "5 premiers jours ouvrés" framing itself is 📧 only |
| Politique tarifaire transparente, sans frais cachés | ✅ Partially — a testimonial says "les charges sont transparentes" and the FAQ details fee handling. "Sans frais cachés" as a phrase is 📧 only |
| Présence nationale | ⚠️ Tension — "Qui sommes-nous" describes presence only in **Île-de-France, PACA, and Rhône-Alpes** — three regions, not a national footprint. See Section 4 |
| Engagement RSE | ⚠️ **No RSE content found anywhere on the old site.** This is 100% new content — do not publish generic RSE claims without real, client-supplied proof points (certifications, concrete actions, policies) |

---

## 2. Differentiation section — proposed French copy 📧🆕

Polished copy for 7 cards/blocks, ready to drop into a new differentiation section. Grounding notes are in brackets where relevant.

**1. Un accompagnement humain et personnalisé**
> Chez The Porters, chaque salarié porté est suivi par une équipe à taille humaine, pas par un centre d'appels. De votre premier rendez-vous à la fin de votre mission, nos chargés d'affaires connaissent votre dossier et adaptent leur accompagnement à votre activité.

**2. Une équipe disponible et réactive**
> Une question, un imprévu sur une mission ? Notre équipe vous répond rapidement, sans vous faire attendre dans une file de tickets. *(Cohérent avec la promesse existante "Nous vous répondrons sous 24h" — à reconfirmer comme engagement officiel.)*

**3. Un interlocuteur unique**
> Vous n'avez pas un service différent à chaque étape : un seul interlocuteur dédié vous accompagne du contrat à la facturation, pour une collaboration fluide et sans rupture d'information.

**4. Une paie rapide, dès les 5 premiers jours ouvrés**
> Votre trésorerie ne dépend pas des délais de paiement de vos clients. The Porters vous verse votre salaire dans les 5 premiers jours ouvrés du mois, avec une avance de trésorerie qui vous protège des retards de règlement. ⚠️ *(Le délai exact et le mécanisme d'avance doivent être confirmés mot pour mot par le client avant publication — la FAQ existante mentionne un versement "entre le 1er et le 5 du mois suivant," ce qui est cohérent mais pas identique.)*

**5. Une politique tarifaire transparente, sans frais cachés**
> Frais de gestion proportionnels à votre chiffre d'affaires, frais professionnels clairement définis : vous savez exactement ce que vous touchez, sans surprise sur votre bulletin de paie.

**6. Une présence nationale**
> The Porters vous accompagne partout en France, avec des équipes implantées dans plusieurs régions. ⚠️ *(À calibrer avec précision : le site actuel ne documente une présence confirmée qu'en Île-de-France, PACA et Rhône-Alpes — voir Section 4. Évitez une formulation "national" trop large si elle ne peut pas être justifiée.)*

**7. Un engagement RSE**
> The Porters s'engage pour un portage salarial responsable. ⚠️ *(Aucun contenu RSE n'existe sur l'ancien site. Cette section ne doit pas être publiée tant que le client n'a pas fourni de preuves concrètes — actions, partenariats, certifications, politique RSE réelle.)*

---

## 3. Testimonials ✅

*Source: homepage — all three quotes appear identically in the hero carousel and in the testimonials grid.*

| Field | Testimonial 1 | Testimonial 2 | Testimonial 3 |
|---|---|---|---|
| **Name** | Delphine | Chloé | Andy P. |
| **Location** | Paris | Toulouse | *(not specified on site)* |
| **Role** | Product-Owner en Portage Salarial | DSI en Portage Salarial | Chef de Projet Digital en Portage Salarial |
| **Quote** | "Je voulais devenir indépendante mais je ne souhaitais pas non plus créer ma propre entreprise pour le moment. J'ai entendu parler du portage salarial et j'ai pu me lancer grâce à THE PORTERS. A mi-chemin entre l'indépendance et le salariat, je me sens à la fois libre et accompagnée." | "Grâce au portage salarial, je me sens plus libre et sécurisée. Les charges sont transparentes, je continue à toucher mes indemnités chômage et retraite. Je recommande le portage salarial à tout indépendant voulant bénéficier des avantages du salariat." | "Le jour où j'ai passé le cap du Portage Salarial, j'ai regardé le soleil se coucher. J'avais été tellement inquiet de trouver un emploi que j'avais oublié d'apprécier les petites choses. Je suis beaucoup plus occupé ces jours-ci, mais je n'oublie plus de prendre le temps de respirer." |
| **Recommended placement** | Homepage hero + Paris agency page | Homepage hero + Toulouse page (new, see Section 4) | Homepage hero + general testimonials grid |
| **Image status** | ⚠️ Placeholder generic vector icon only (`Objet-dynamique-vectoriel_6.png`) — same icon reused for all 3 people. **No real photo exists.** Recommend client supply real photos (with consent) or commit to a deliberate illustrative-avatar style for the new design. | Same placeholder icon — same recommendation. | Same placeholder icon — same recommendation. |

---

## 4. Agency strategy

### 4.1 What the old site actually shows ✅

| Agency page | Named contact | Email / phone | Street address found | Notes |
|---|---|---|---|---|
| Paris (`/the-porters-paris/`) | Clarence Preira, Responsable Paris | clarence@porters.fr · 07 81 46 28 99 | ⚠️ **Two conflicting addresses**: page body says *27 rue Marbeuf, 75008 Paris*; site-wide footer says *26 rue de Berri, 75008 Paris* | Otherwise the most complete, credible agency page on the site |
| Lyon (`/old-portage-salarial-lyon/`) | Simon Girardey, Responsable Lyon | simon@porters.fr · 06 45 32 31 84 | 4 place Amédée Bonnet, 69002 Lyon — matches footer ✅ | Consistent, ready to migrate. Note: a broken legacy link to `theporters.fr` (wrong domain, no https) was found in the page footer |
| Aix-Marseille (`/old-portage-salarial-marseille/`) | Eric Bensaid, "Responsable Marseille et Aix-en-Provence" | ebensaid@porters.fr · 07 68 67 08 50 | ⚠️ None given — only a generic map centered on Marseille | |
| Bordeaux (`/old-portage-salarial-bordeaux/`) | Eric Bensaid, "Responsable Bordeaux" | **Identical** ebensaid@porters.fr · 07 68 67 08 50 | ⚠️ None given — generic map of Bordeaux only | Same contact info as Marseille page — see flag below |
| Lille (`/old-portage-salarial-lille/`) | Eric Bensaid, "Responsable Lille" | **Identical** ebensaid@porters.fr · 07 68 67 08 50 | ⚠️ None given — generic map of Lille only | Same contact info as Marseille/Bordeaux pages |
| Montpellier (`/old-portage-salarial-montpellier/`) | Eric Bensaid, "Responsable Montpellier" | **Identical** ebensaid@porters.fr · 07 68 67 08 50 | 120 rue de Thor, 34000 Montpellier — matches footer ✅ | ⚠️ **Content bug**: this page's `<title>`, meta description, body copy ("région Grand Est") and embedded Google Map all describe **Strasbourg**, not Montpellier. Only the H1 and the footer address say Montpellier. Do not reuse this page's body copy as-is |

⚠️ **One contact, four cities.** Eric Bensaid is listed as the named "Responsable" for Marseille, Bordeaux, Lille, and Montpellier simultaneously, with identical email and phone across all four pages. This is either (a) one person genuinely covering four regions, or (b) a leftover WordPress template that was duplicated without updating the contact block. Needs client confirmation either way — do not present this as four separately-staffed local offices without checking.

⚠️ The company's own "Qui sommes-nous" page states collaborators are present *"notamment en Île-de-France, région PACA et Rhône-Alpes"* — i.e., three regions. It does not mention Hauts-de-France (Lille), Nouvelle-Aquitaine (Bordeaux), or Occitanie (Montpellier), even though dedicated pages exist for those cities. This reinforces the need to confirm which agencies are genuinely staffed today.

### 4.2 Old agencies vs. client email's current city list

The client email lists **Paris, Lyon, Marseille, Montpellier, and Toulouse** as the current focus. Comparing to the old site:

| City | On old site? | In client email? | Read |
|---|---|---|---|
| Paris | ✅ Yes (strong page) | 📧 Yes | Keep — high confidence |
| Lyon | ✅ Yes (strong page) | 📧 Yes | Keep — high confidence |
| Marseille / Aix | ✅ Yes (thin page) | 📧 Yes | Keep, but needs validation (address, real local presence) |
| Montpellier | ✅ Yes (buggy page) | 📧 Yes | Keep, but needs full content rewrite (see 4.1) and contact validation |
| Toulouse | ⚠️ No dedicated page — only appears as Chloé's testimonial location and a passing mention on the Bordeaux page ("de Bordeaux à Toulouse") | 📧 Yes | New page — needs full client validation (no source content exists at all) |
| Bordeaux | ✅ Yes (thin page) | ⚠️ Not mentioned | Not in current focus list — confirm with client whether this agency is still active before deciding keep vs. redirect |
| Lille | ✅ Yes (thin page) | ⚠️ Not mentioned | Same as Bordeaux — confirm before keep vs. redirect |

### 4.3 Recommendation for the new site

| Agency | Action | Proposed route |
|---|---|---|
| Paris | Migrate now, rewrite copy in new design. ⚠️ Resolve the two-address conflict before publishing | `/agences/paris` |
| Lyon | Migrate now, rewrite copy in new design — content is internally consistent | `/agences/lyon` |
| Marseille | Migrate, but hold for client validation on address + whether Eric Bensaid is the correct/current contact | `/agences/marseille` |
| Montpellier | Migrate, but **do not reuse old body copy** (Strasbourg mix-up) — needs a full rewrite plus contact validation | `/agences/montpellier` |
| Toulouse | Build new — no old source exists, needs full client input (address, contact person, whether there's a physical presence at all) | `/agences/toulouse` |
| Bordeaux | Hold. If client confirms the agency is no longer active, 301-redirect the old URL to `/agences` or `/contact`. If still active, treat like Marseille (full validation needed, no usable address) | `/agences/bordeaux` (conditional) |
| Lille | Same treatment as Bordeaux | `/agences/lille` (conditional) |

**Open strategic question carried over from the client email, unresolved by this crawl:** *dedicated The Porters site vs. one shared site for the three legal entities* (the footer consistently shows three entities — IDF, PACA, Auvergne-Rhône-Alpes — under one SIRET, 82895473500027, capital €50,000). This is a business/IA decision for the client, not something this content audit can answer — flagged in Section 9.

---

## 5. Blog migration

The blog index currently lists exactly 8 posts (confirmed — no pagination found). These match the client's priority list. A 9th, older post ("Qu'est-ce que la cooptation et quels sont ses avantages ?", 19 mai 2023) was found via internal navigation but does **not** appear on the blog index itself — flagging this as a sign there may be more orphaned posts beyond what's listed; recommend a full XML-sitemap pull before final cutover to make sure nothing is missed.

| # | Old URL | Current title | Published | Proposed new slug | New route | Priority | Action |
|---|---|---|---|---|---|---|---|
| 1 | `/les-secteurs-dactivite-les-plus-adaptes-au-portage-salarial/` | Les secteurs d'activité les plus adaptés au portage salarial | 8 oct. 2024 | `secteurs-portage-salarial` | `/blog/secteurs-portage-salarial` | High | Rewrite |
| 2 | `/comment-optimiser-sa-remuneration-en-portage-salarial/` | Comment optimiser sa rémunération en portage salarial ? | 5 sept. 2024 | `optimiser-remuneration-portage-salarial` | `/blog/optimiser-remuneration-portage-salarial` | High | Rewrite |
| 3 | `/le-role-du-charge-de-compte-en-portage-salarial-un-soutien-indispensable/` | Le rôle du chargé de compte en portage salarial : un soutien indispensable | 1 août 2024 | `role-charge-de-compte` | `/blog/role-charge-de-compte` | Medium | Rewrite, shorten title |
| 4 | `/portage-salarial-et-international-travailler-a-letranger-en-toute-securite/` | Portage salarial et international : travailler à l'étranger en toute sécurité | 8 juil. 2024 | `portage-salarial-international` | `/blog/portage-salarial-international` | Medium | Rewrite, shorten title |
| 5 | `/portage-salarial-pour-entreprises/` | Se tourner vers le portage salarial en tant qu'entreprise | 28 mai 2024 | `portage-salarial-entreprises` | `/blog/portage-salarial-entreprises` | High (B2B audience aligns with target market) | Rewrite |
| 6 | `/portage-salarial-solution-flexible/` | Le portage salarial, une solution flexible | 17 mai 2024 | `portage-salarial-solution-flexible` | `/blog/portage-salarial-solution-flexible` | Medium | Rewrite or **merge** — content overlaps heavily with #7 below |
| 7 | `/decouvrez-le-monde-du-portage-salarial-votre-guide-simplifie/` | Découvrez le monde du portage salarial : votre guide simplifié | 7 déc. 2023 | `guide-portage-salarial` | `/blog/guide-portage-salarial` | High — best candidate for a cornerstone "what is portage salarial" pillar page | Rewrite |
| 8 | `/trouver-des-missions-en-portage-salarial/` | Trouver des missions en portage salarial | 10 oct. 2023 | `trouver-missions-portage-salarial` | `/blog/trouver-missions-portage-salarial` | High — directly supports the recurring FAQ on mission-finding support | Rewrite — current content is generic listicle advice, not The Porters–specific; rewrite to fold in the company's actual mission-support services (networking events, dedicated advisor — see Section 6) |

**Weak WordPress pages found, to exclude from migration (per brief):**
- `/category/actualite-portage-salarial/` (category archive) → 410 or noindex
- `/tag/portage-salarial/`, `/tag/entreprise-portage-salarial/`, `/tag/societe-portage-salarial/` (tag archives) → 410 or noindex
- Author archives and monthly archives weren't directly hit in this crawl but follow the same WordPress pattern — recommend checking `/author/*` and date-based archive URLs and applying the same treatment

---

## 6. FAQ migration

The old FAQ has 16 items, all consultant/porté-focused. None match the client's 3 priority questions **verbatim**, but related content exists for two of the three. Mapped by the categories the client asked for:

| Category | Old FAQ source (if any) | Recommendation |
|---|---|---|
| **Fonctionnement du portage salarial** | ✅ "Le Portage Salarial est-il vraiment reconnu ?" (cites Loi du 25 juin 2008, Ordonnance du 2 avril 2015, Article L1254-1 du Code du Travail) + "Quel est mon statut ?" | 🆕 Write a new lead FAQ item titled exactly "Comment fonctionne le portage salarial ?", synthesizing these two existing, legally-sourced answers — this becomes the new site's top FAQ entry |
| **Accompagnement dans la recherche de missions** | ⚠️ "Lorsque ma mission se termine, l'entreprise de portage me fournit-elle d'autres missions ?" — current answer is a legal disclaimer (no obligation to find missions), softened only by "The PORTERS peut également vous conseiller" | ⚠️ Tension to resolve with client: agency pages promise networking events and a "conseiller dédié" to help find missions, but the FAQ's tone is more reserved. Rewrite to stay legally accurate while reflecting the real support mechanisms found on the agency pages |
| **Frais professionnels** | ✅ "Quels types de frais sont pris en compte lors du calcul de ma paie ?" — solid existing detail: internet, phone, equipment/services, travel, meals, lodging, each justified by an invoice | Migrate/rewrite directly — content is already strong |
| **Rémunération** | ✅ "Comment et quand je suis payé(e) ?" (420€ HT threshold, salary paid 1st–5th of following month) + "Que se passe-t-il si mon client ne règle pas ses factures dans les temps ?" (salary advance) | Migrate/rewrite — also reuse for the differentiation section (Section 2, item 4) |
| **Simulateur** | ✅ FAQ links to a salary simulator | Migrate, but resolve the duplicate-URL issue first (Section 1.3) |
| **Entreprises** | ⚠️ No B2B-facing FAQ items exist on the old site at all | 🆕 Net-new content needed — needs client input, since nothing here can be extracted |
| **Agences** | ⚠️ Not covered in FAQ | 🆕 Net-new — could be answered once Section 4's open questions are resolved |
| **Rendez-vous** | ⚠️ Not covered in FAQ | 🆕 Net-new — depends on which booking tool is confirmed canonical (Section 1.1) |

Other existing FAQ items (legal status, social coverage, mutuelle, contracts, invoicing minimums/maximums, inactivity periods, leave calculation, interim vs. portage) are solid, extractable content — recommend migrating them as-is/lightly rewritten under a general "Fonctionnement" category, not reproduced verbatim here to keep this plan focused, but available in full at the FAQ source URL above.

---

## 7. SEO migration map

| Old URL | New URL | Action |
|---|---|---|
| `/` | `/` | Keep |
| `/blog/` | `/blog` | Keep |
| `/faq/` | `/faq` | Rewrite |
| `/qui-sommes-nous/` | `/qui-sommes-nous` (or `/a-propos`, pending IA decision) | Rewrite |
| `/contactez-nous/` | `/contact` | Rewrite |
| `/the-porters-paris/` | `/agences/paris` | 301 redirect + rewrite |
| `/old-portage-salarial-lyon/` | `/agences/lyon` | 301 redirect + rewrite |
| `/old-portage-salarial-marseille/` | `/agences/marseille` | 301 redirect + rewrite (pending validation) |
| `/old-portage-salarial-bordeaux/` | `/agences/bordeaux` or `/contact` | 301 redirect (pending client decision — Section 4.3) |
| `/old-portage-salarial-lille/` | `/agences/lille` or `/contact` | 301 redirect (pending client decision — Section 4.3) |
| `/old-portage-salarial-montpellier/` | `/agences/montpellier` | 301 redirect + full rewrite (Strasbourg content bug) |
| 8 blog post URLs | `/blog/{new-slug}` (Section 5) | 301 redirect + rewrite each |
| `/category/actualite-portage-salarial/` | — | 410 / noindex |
| `/tag/*` | — | 410 / noindex |
| `/livres-blancs/` | TBD | Needs its own audit pass — out of scope here |
| `/recrutement-commercial-porters/` | TBD | Needs its own audit pass |
| `/parrainage/` | TBD | Needs its own audit pass |
| `/portage-salarial-sur-mesure/` | TBD | Needs its own audit pass (core service page, high traffic likely) |
| `/avantages-du-portage-salarial-pour-les-entreprises/` | TBD | Needs its own audit pass (core B2B page) |
| `/simulation-revenus/` vs `/simulateur-de-salaire/` | One canonical `/simulateur` | Pick one, 301 the other — confirm which is the live tool first |
| `/reunion-d-information/`, `/prendre-rdv-avec-un-charge-d-affaires/` | TBD | Needs validation — likely the real booking flow behind the homepage's "Prendre RDV" CTA |

---

## 8. Content data output

Copy blocks below are structured for direct use; fields marked `needsValidation: true` or `TODO_CONFIRM` correspond to the ⚠️ flags above and should not be published until resolved.

### `testimonials.data.ts`
```ts
export interface Testimonial {
  id: string;
  name: string;
  location: string | null;
  role: string;
  quote: string;
  placement: string[];
  imageStatus: "placeholder_only" | "real_photo";
  needsValidation?: boolean;
  sourceUrl: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "delphine-paris",
    name: "Delphine",
    location: "Paris",
    role: "Product-Owner en Portage Salarial",
    quote:
      "Je voulais devenir indépendante mais je ne souhaitais pas non plus créer ma propre entreprise pour le moment. J'ai entendu parler du portage salarial et j'ai pu me lancer grâce à THE PORTERS. A mi-chemin entre l'indépendance et le salariat, je me sens à la fois libre et accompagnée.",
    placement: ["homepage_hero", "agency_paris"],
    imageStatus: "placeholder_only",
    needsValidation: true, // real photo needed
    sourceUrl: "https://www.porters.fr/",
  },
  {
    id: "chloe-toulouse",
    name: "Chloé",
    location: "Toulouse",
    role: "DSI en Portage Salarial",
    quote:
      "Grâce au portage salarial, je me sens plus libre et sécurisée. Les charges sont transparentes, je continue à toucher mes indemnités chômage et retraite. Je recommande le portage salarial à tout indépendant voulant bénéficier des avantages du salariat.",
    placement: ["homepage_hero", "homepage_grid", "agency_toulouse"],
    imageStatus: "placeholder_only",
    needsValidation: true,
    sourceUrl: "https://www.porters.fr/",
  },
  {
    id: "andy-p",
    name: "Andy P.",
    location: null, // not specified on old site
    role: "Chef de Projet Digital en Portage Salarial",
    quote:
      "Le jour où j'ai passé le cap du Portage Salarial, j'ai regardé le soleil se coucher. J'avais été tellement inquiet de trouver un emploi que j'avais oublié d'apprécier les petites choses. Je suis beaucoup plus occupé ces jours-ci, mais je n'oublie plus de prendre le temps de respirer.",
    placement: ["homepage_hero", "homepage_grid"],
    imageStatus: "placeholder_only",
    needsValidation: true,
    sourceUrl: "https://www.porters.fr/",
  },
];
```

### `agencies.data.ts`
```ts
export interface Agency {
  slug: string;
  city: string;
  region: string;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  address: string | null;
  status: "ready" | "needs_validation" | "new_no_source";
  notes: string;
  oldUrl: string | null;
}

export const agencies: Agency[] = [
  {
    slug: "paris",
    city: "Paris",
    region: "Île-de-France",
    contactName: "Clarence Preira",
    contactEmail: "clarence@porters.fr",
    contactPhone: "07 81 46 28 99",
    address: "TODO_CONFIRM", // conflicting: "27 rue Marbeuf" (page body) vs "26 rue de Berri" (site footer)
    status: "needs_validation",
    notes: "Two different street addresses found on old site — must reconcile before publishing.",
    oldUrl: "https://www.porters.fr/the-porters-paris/",
  },
  {
    slug: "lyon",
    city: "Lyon",
    region: "Auvergne-Rhône-Alpes",
    contactName: "Simon Girardey",
    contactEmail: "simon@porters.fr",
    contactPhone: "06 45 32 31 84",
    address: "4 place Amédée Bonnet, 69002 Lyon",
    status: "ready",
    notes: "Address consistent across page body and footer.",
    oldUrl: "https://www.porters.fr/old-portage-salarial-lyon/",
  },
  {
    slug: "marseille",
    city: "Marseille / Aix-en-Provence",
    region: "Provence-Alpes-Côte d'Azur",
    contactName: "Eric Bensaid",
    contactEmail: "ebensaid@porters.fr",
    contactPhone: "07 68 67 08 50",
    address: "TODO_CONFIRM", // no street address given on old site
    status: "needs_validation",
    notes:
      "Same contact (name/email/phone) also listed for Bordeaux, Lille, and Montpellier — confirm whether this is one person covering 4 regions or a stale template.",
    oldUrl: "https://www.porters.fr/old-portage-salarial-marseille/",
  },
  {
    slug: "montpellier",
    city: "Montpellier",
    region: "Occitanie",
    contactName: "Eric Bensaid",
    contactEmail: "ebensaid@porters.fr",
    contactPhone: "07 68 67 08 50",
    address: "120 rue de Thor, 34000 Montpellier",
    status: "needs_validation",
    notes:
      "Address matches site footer, BUT old page's title/meta/body copy and map all reference Strasbourg, not Montpellier. Do not reuse old body copy. Confirm contact is current.",
    oldUrl: "https://www.porters.fr/old-portage-salarial-montpellier/",
  },
  {
    slug: "toulouse",
    city: "Toulouse",
    region: "Occitanie",
    contactName: null,
    contactEmail: null,
    contactPhone: null,
    address: null,
    status: "new_no_source",
    notes:
      "No agency page exists on the old site. Mentioned in client email and in Chloé's testimonial location. Needs full client input before publishing.",
    oldUrl: null,
  },
  {
    slug: "bordeaux",
    city: "Bordeaux",
    region: "Nouvelle-Aquitaine",
    contactName: "Eric Bensaid",
    contactEmail: "ebensaid@porters.fr",
    contactPhone: "07 68 67 08 50",
    address: "TODO_CONFIRM",
    status: "needs_validation",
    notes:
      "Not mentioned in client email's current city list — confirm whether this agency is still active. If not, redirect instead of migrating.",
    oldUrl: "https://www.porters.fr/old-portage-salarial-bordeaux/",
  },
  {
    slug: "lille",
    city: "Lille",
    region: "Hauts-de-France",
    contactName: "Eric Bensaid",
    contactEmail: "ebensaid@porters.fr",
    contactPhone: "07 68 67 08 50",
    address: "TODO_CONFIRM",
    status: "needs_validation",
    notes: "Not mentioned in client email's current city list — same treatment as Bordeaux.",
    oldUrl: "https://www.porters.fr/old-portage-salarial-lille/",
  },
];
```

### `faq.data.ts`
```ts
export interface FaqItem {
  id: string;
  category:
    | "fonctionnement"
    | "remuneration"
    | "frais"
    | "missions"
    | "entreprises"
    | "agences"
    | "rendez-vous"
    | "simulateur";
  question: string;
  answerSummary: string;
  source: "old_site" | "client_email" | "new_needs_validation";
  sourceUrl?: string;
}

export const faq: FaqItem[] = [
  {
    id: "fonctionnement-portage",
    category: "fonctionnement",
    question: "Comment fonctionne le portage salarial ?",
    answerSummary:
      "Synthesize: portage salarial is a tripartite relationship (consultant / client company / portage company), introduced into the Code du Travail in 2008 and regulated by the Ordonnance of April 2, 2015. The consultant keeps employee status and social benefits while managing their own clients and pricing.",
    source: "old_site",
    sourceUrl: "https://www.porters.fr/faq/",
  },
  {
    id: "recherche-missions",
    category: "missions",
    question: "Pouvez-vous m'accompagner dans la recherche de missions ?",
    answerSummary:
      "The Porters has no legal obligation to supply missions (Article L1254-2), but offers advisory support, networking events, and a dedicated advisor to help consultants find clients. NEEDS CLIENT ALIGNMENT: old FAQ tone is reserved/legal, agency pages describe more active support — reconcile before publishing.",
    source: "new_needs_validation",
    sourceUrl: "https://www.porters.fr/faq/",
  },
  {
    id: "frais-professionnels",
    category: "frais",
    question: "Comment sont gérés les frais professionnels ?",
    answerSummary:
      "All business expenses tied to the consultant's activity are reimbursed without a cap, provided each is justified by an invoice: internet, phone subscription, equipment/services, and (depending on the offer) travel, meals, and lodging.",
    source: "old_site",
    sourceUrl: "https://www.porters.fr/faq/",
  },
  {
    id: "remuneration-timing",
    category: "remuneration",
    question: "Comment et quand suis-je payé(e) ?",
    answerSummary:
      "Salary is generated once invoiced revenue (net of commission) reaches a threshold; revenue credited between the 1st and last day of the month, expenses declared before the 25th, salary paid between the 1st and 5th of the following month.",
    source: "old_site",
    sourceUrl: "https://www.porters.fr/faq/",
  },
  {
    id: "entreprises-faq",
    category: "entreprises",
    question: "TBD — no B2B FAQ exists on the old site",
    answerSummary: "Net-new content required; needs client input.",
    source: "new_needs_validation",
  },
  {
    id: "agences-faq",
    category: "agences",
    question: "TBD — no agency-specific FAQ exists on the old site",
    answerSummary: "Net-new content required; depends on Section 4 decisions.",
    source: "new_needs_validation",
  },
  {
    id: "rendez-vous-faq",
    category: "rendez-vous",
    question: "TBD — no appointment-booking FAQ exists on the old site",
    answerSummary: "Net-new content required; depends on which booking tool is confirmed canonical.",
    source: "new_needs_validation",
  },
];
```

### `blog.data.ts`
```ts
export interface BlogPost {
  oldUrl: string;
  title: string;
  publishedAt: string; // ISO date
  newSlug: string;
  priority: "high" | "medium" | "low";
  action: "rewrite" | "merge" | "redirect";
  notes?: string;
}

export const blogPosts: BlogPost[] = [
  {
    oldUrl: "https://www.porters.fr/les-secteurs-dactivite-les-plus-adaptes-au-portage-salarial/",
    title: "Les secteurs d'activité les plus adaptés au portage salarial",
    publishedAt: "2024-10-08",
    newSlug: "secteurs-portage-salarial",
    priority: "high",
    action: "rewrite",
  },
  {
    oldUrl: "https://www.porters.fr/comment-optimiser-sa-remuneration-en-portage-salarial/",
    title: "Comment optimiser sa rémunération en portage salarial ?",
    publishedAt: "2024-09-05",
    newSlug: "optimiser-remuneration-portage-salarial",
    priority: "high",
    action: "rewrite",
  },
  {
    oldUrl:
      "https://www.porters.fr/le-role-du-charge-de-compte-en-portage-salarial-un-soutien-indispensable/",
    title: "Le rôle du chargé de compte en portage salarial : un soutien indispensable",
    publishedAt: "2024-08-01",
    newSlug: "role-charge-de-compte",
    priority: "medium",
    action: "rewrite",
  },
  {
    oldUrl:
      "https://www.porters.fr/portage-salarial-et-international-travailler-a-letranger-en-toute-securite/",
    title: "Portage salarial et international : travailler à l'étranger en toute sécurité",
    publishedAt: "2024-07-08",
    newSlug: "portage-salarial-international",
    priority: "medium",
    action: "rewrite",
  },
  {
    oldUrl: "https://www.porters.fr/portage-salarial-pour-entreprises/",
    title: "Se tourner vers le portage salarial en tant qu'entreprise",
    publishedAt: "2024-05-28",
    newSlug: "portage-salarial-entreprises",
    priority: "high",
    action: "rewrite",
    notes: "Aligns directly with target B2B audience.",
  },
  {
    oldUrl: "https://www.porters.fr/portage-salarial-solution-flexible/",
    title: "Le portage salarial, une solution flexible",
    publishedAt: "2024-05-17",
    newSlug: "portage-salarial-solution-flexible",
    priority: "medium",
    action: "merge",
    notes: "Heavy topical overlap with the 'guide-portage-salarial' pillar post — consider merging.",
  },
  {
    oldUrl: "https://www.porters.fr/decouvrez-le-monde-du-portage-salarial-votre-guide-simplifie/",
    title: "Découvrez le monde du portage salarial : votre guide simplifié",
    publishedAt: "2023-12-07",
    newSlug: "guide-portage-salarial",
    priority: "high",
    action: "rewrite",
    notes: "Best candidate for cornerstone 'what is portage salarial' pillar page.",
  },
  {
    oldUrl: "https://www.porters.fr/trouver-des-missions-en-portage-salarial/",
    title: "Trouver des missions en portage salarial",
    publishedAt: "2023-10-10",
    newSlug: "trouver-missions-portage-salarial",
    priority: "high",
    action: "rewrite",
    notes: "Current content is generic; rewrite to highlight The Porters' actual mission-support services.",
  },
];
```

### `homepage.data.ts`
```ts
export interface HomepageSections {
  heroSlides: { name: string; role: string; location: string | null; ctaLabel: string; ctaHref: string }[];
  processSteps: { title: string; body: string }[];
  simulatorCta: { headline: string; buttonLabel: string; href: string; needsValidation: boolean };
  trustStat: { label: string; needsValidation: boolean };
  differentiators: { id: string; needsRealProof: boolean }[];
}

export const homepage: HomepageSections = {
  heroSlides: [
    { name: "Delphine", role: "Product-Owner en Portage Salarial", location: "Paris", ctaLabel: "Prendre RDV avec un chargé d'affaires", ctaHref: "TODO_CONFIRM_BOOKING_URL" },
    { name: "Chloé", role: "DSI en Portage Salarial", location: "Toulouse", ctaLabel: "Prendre RDV avec un chargé d'affaires", ctaHref: "TODO_CONFIRM_BOOKING_URL" },
    { name: "Andy P.", role: "Chef de Projet Digital en Portage Salarial", location: null, ctaLabel: "Prendre RDV avec un chargé d'affaires", ctaHref: "TODO_CONFIRM_BOOKING_URL" },
  ],
  processSteps: [
    { title: "Optimisez vos revenus", body: "Vous négociez votre mission, The Porters met en place le cadre légal (contrat de travail + contrat de prestation)." },
    { title: "Libérez-vous des contraintes administratives", body: "The Porters gère l'intégralité de la relation administrative et financière avec votre client." },
    { title: "Conservez votre statut de salarié", body: "The Porters facture votre client, établit vos bulletins de paie et vous verse votre salaire." },
  ],
  simulatorCta: {
    headline: "Simulez vos revenus dès maintenant",
    buttonLabel: "Calculer mon salaire",
    href: "TODO_CONFIRM_CANONICAL_SIMULATOR_URL",
    needsValidation: true,
  },
  trustStat: { label: "97% de collaborateurs satisfaits", needsValidation: true },
  differentiators: [
    { id: "accompagnement-humain", needsRealProof: false },
    { id: "equipe-reactive", needsRealProof: false },
    { id: "interlocuteur-unique", needsRealProof: false },
    { id: "paie-rapide", needsRealProof: false },
    { id: "tarifs-transparents", needsRealProof: false },
    { id: "presence-nationale", needsRealProof: true },
    { id: "engagement-rse", needsRealProof: true },
  ],
};
```

### `migration-map.ts`
```ts
export interface RedirectRule {
  oldPath: string;
  newPath: string | null;
  action: "keep" | "rewrite" | "merge" | "redirect301" | "noindex" | "410";
  notes?: string;
}

export const migrationMap: RedirectRule[] = [
  { oldPath: "/", newPath: "/", action: "keep" },
  { oldPath: "/blog/", newPath: "/blog", action: "keep" },
  { oldPath: "/faq/", newPath: "/faq", action: "rewrite" },
  { oldPath: "/qui-sommes-nous/", newPath: "/qui-sommes-nous", action: "rewrite" },
  { oldPath: "/contactez-nous/", newPath: "/contact", action: "rewrite" },
  { oldPath: "/the-porters-paris/", newPath: "/agences/paris", action: "redirect301" },
  { oldPath: "/old-portage-salarial-lyon/", newPath: "/agences/lyon", action: "redirect301" },
  { oldPath: "/old-portage-salarial-marseille/", newPath: "/agences/marseille", action: "redirect301", notes: "pending validation" },
  { oldPath: "/old-portage-salarial-bordeaux/", newPath: "/agences/bordeaux", action: "redirect301", notes: "conditional on client decision" },
  { oldPath: "/old-portage-salarial-lille/", newPath: "/agences/lille", action: "redirect301", notes: "conditional on client decision" },
  { oldPath: "/old-portage-salarial-montpellier/", newPath: "/agences/montpellier", action: "redirect301", notes: "old body copy is broken (Strasbourg content) — full rewrite required" },
  { oldPath: "/les-secteurs-dactivite-les-plus-adaptes-au-portage-salarial/", newPath: "/blog/secteurs-portage-salarial", action: "redirect301" },
  { oldPath: "/comment-optimiser-sa-remuneration-en-portage-salarial/", newPath: "/blog/optimiser-remuneration-portage-salarial", action: "redirect301" },
  { oldPath: "/le-role-du-charge-de-compte-en-portage-salarial-un-soutien-indispensable/", newPath: "/blog/role-charge-de-compte", action: "redirect301" },
  { oldPath: "/portage-salarial-et-international-travailler-a-letranger-en-toute-securite/", newPath: "/blog/portage-salarial-international", action: "redirect301" },
  { oldPath: "/portage-salarial-pour-entreprises/", newPath: "/blog/portage-salarial-entreprises", action: "redirect301" },
  { oldPath: "/portage-salarial-solution-flexible/", newPath: "/blog/guide-portage-salarial", action: "merge", notes: "merge into pillar guide post" },
  { oldPath: "/decouvrez-le-monde-du-portage-salarial-votre-guide-simplifie/", newPath: "/blog/guide-portage-salarial", action: "redirect301" },
  { oldPath: "/trouver-des-missions-en-portage-salarial/", newPath: "/blog/trouver-missions-portage-salarial", action: "redirect301" },
  { oldPath: "/category/actualite-portage-salarial/", newPath: null, action: "410" },
  { oldPath: "/tag/portage-salarial/", newPath: null, action: "410" },
  { oldPath: "/tag/entreprise-portage-salarial/", newPath: null, action: "410" },
  { oldPath: "/tag/societe-portage-salarial/", newPath: null, action: "410" },
  { oldPath: "/livres-blancs/", newPath: null, action: "noindex", notes: "needs its own audit pass" },
  { oldPath: "/recrutement-commercial-porters/", newPath: null, action: "noindex", notes: "needs its own audit pass" },
  { oldPath: "/parrainage/", newPath: null, action: "noindex", notes: "needs its own audit pass" },
  { oldPath: "/portage-salarial-sur-mesure/", newPath: null, action: "noindex", notes: "core page, needs its own audit pass before deciding final action" },
  { oldPath: "/avantages-du-portage-salarial-pour-les-entreprises/", newPath: null, action: "noindex", notes: "core B2B page, needs its own audit pass" },
  { oldPath: "/simulation-revenus/", newPath: "/simulateur", action: "redirect301", notes: "pick this OR /simulateur-de-salaire/ as canonical, not both" },
  { oldPath: "/simulateur-de-salaire/", newPath: "/simulateur", action: "redirect301", notes: "see above" },
];
```

---

## 9. Open questions for client validation (consolidated checklist)

1. **Paris address conflict** — 27 rue Marbeuf vs. 26 rue de Berri. Which is current?
2. **Eric Bensaid's role** — is he genuinely the responsible contact for Marseille, Bordeaux, Lille, *and* Montpellier, or is this a stale template? What are real, distinct contact details per city if they exist?
3. **Bordeaux & Lille agencies** — still active? They're absent from the client email's current city list.
4. **Montpellier page content** — confirmed broken (Strasbourg copy/map). Needs a full content rewrite from the client/Codex, not a reuse of old text.
5. **Toulouse** — client wants it, but there's no existing address, contact, or office info to migrate. What should populate this page?
6. **"Présence nationale" claim** — the company's own About page only documents 3 regions. Should this claim be scoped down, or does the client have broader, undocumented coverage to confirm?
7. **RSE commitment** — no content exists anywhere on the old site. What concrete actions/certifications should back this section?
8. **97% satisfaction stat** — source/date unknown. Still accurate? Keep, update, or drop?
9. **Booking flow** — which URL is the real "Prendre RDV" destination: the contact form, `/reunion-d-information/`, or `/prendre-rdv-avec-un-charge-d-affaires/`?
10. **Simulator URL** — `/simulation-revenus/` or `/simulateur-de-salaire/` — which is canonical?
11. **One Porters site vs. three-entity site** — open strategic/IA question from the original brief, unresolved by this content audit.
12. **Pages out of scope for this pass** — `/portage-salarial-sur-mesure/`, `/avantages-du-portage-salarial-pour-les-entreprises/`, `/livres-blancs/`, `/recrutement-commercial-porters/`, `/parrainage/` should get their own content audit before the new site launches, since this plan didn't cover them.
