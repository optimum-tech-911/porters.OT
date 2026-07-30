# THE PORTERS — SITE COPY & POSITIONING PLAN

**Version** 2.0 — integrates the supplemental source pack (legacy agility + expertise decks)
**Target site** `porters-ot.pages.dev` (staging) → `www.porters.fr` (production)
**Stack** Astro v7
**Execution** Claude Code, VS Code
**Language convention** Instructions in English. All published copy in French. Never translate French copy blocks — they are final text, not source material.

### This plan is four files

| File | Role | Who edits it |
|---|---|---|
| `docs/copy-plan.md` *(this file)* | Strategy, page briefs, guardrails, execution protocol. **The decision layer.** | Nobody, without a version bump |
| `docs/fact-base.md` | Every fact from all six sources, with status, source, and publication clearance. **The binding reference layer.** | Client validates statuses; agent adds rows, never changes a status |
| `docs/copy-bank.md` | Approved French copy blocks, ready to place. **The production layer.** | Client picks between registers; agent proposes |
| `docs/nav-plan.md` | Navigation, labels, information architecture. **The structure layer.** | Client signs off §4 before any nav commit |

The agent reads all four. It writes only what `fact-base.md` clears and `copy-bank.md` provides. When it needs something none of them contains, it stops (§11.3).

> ⚠️ **§10.1 and §10.5 are amended by `nav-plan.md` §8.** Nav labels and nav grouping are now in scope. Slugs, URLs and the page set are still not.

---

## 0. HOW TO USE THIS DOCUMENT

This file is the single source of truth for the copy rewrite. It replaces meetings.

**Rules of engagement:**

1. The agent reads this file **before** editing anything, and re-reads §10 (Guardrails) before every commit.
2. Where a block offers **Option A / Option B**, the client picks one. They do not write a third. If neither works, they say why in one sentence and the agent produces two new options. This is the mechanism that ends the meeting cycle — the client's job is *selection*, not *authorship*.
3. §6 (Fact Base) is binding. Any number, claim, or client name not listed in §6 as `PUBLISHABLE` must not appear on the site.
4. Phase 0 (§8) runs first and produces `docs/copy-inventory.md`. Nothing else starts until that file exists.

---

## 1. DIAGNOSIS — WHY THE MEETINGS NEVER END

The client is not arguing about words. They are arguing because **the positioning was never decided**, so every sentence is negotiable and every reviewer is equally right.

Evidence, drawn from the current site and the four source documents:

| Signal | What it shows |
|---|---|
| Homepage H1 is a rotating phrase: *"Votre projet / Notre accompagnement / Une collaboration durable"* | No claim is made. Nothing can be agreed or disagreed with, so it survives every review and persuades nobody. |
| Testimonials are first-name-only with stock avatars (*Delphine, Paris* / *Chloé, Toulouse*) | Unverifiable social proof. Reads as filler. |
| Logo wall (BPCE, Groupama, Airbus, Safran, Thales, Capgemini) under the caption *"un écosystème habitué aux projets exigeants"* | Deliberately ambiguous — are these clients, or companies where consultants have worked? The vagueness is the tell. **See §10.3 — this is also a legal exposure.** |
| The word *"accompagnement"* appears in nearly every section | It is the default filler of the French services sector. It means nothing and therefore offends no one. |
| Source docs contain URSSAF and CDC Habitat project sheets, a 10 000+ profile talent pool, CIGREF/SYNTEC referentials, RGAA/WCAG/RGESN commitments | **None of this is on the website.** The company's actual credibility is sitting in a tender response. |

**The core problem in one sentence:** the site describes a *legal status* (portage salarial) when the company's real asset is *IT talent operations at scale*.

That is the vision shift.

---

## 2. THE VISION SHIFT

### 2.1 From → To

| | Today (what visitors understand) | Target (what they should understand) |
|---|---|---|
| **Category** | An administrative intermediary. Turns invoices into payslips. | An IT talent operator. Portage salarial is one of two contractual routes it offers, not the whole business. |
| **Differentiation** | None discernible. Interchangeable with ~150 competitors. | Depth in IT specifically: real projects, real referentials, a pool of 10 000+ IT profiles, a track record in demanding public-sector SI environments. |
| **Proof** | Anonymous testimonials, a logo wall, "97% satisfaits" with no source. | Named project types, methodological standards, verifiable structure. Fewer claims, each one checkable. |
| **Emotional register** | Reassurance ("liberté", "sérénité", beach photo). | Competence. The reader is a senior technical professional; treat them as one. |
| **Company shape** | One company doing portage. | A group: **The Porters** (portage salarial, 2016, FEPS) · **The Big Porters** (ESN IT, 2018) · **KwickStart** (Région Sud). |

### 2.2 The comprehension ladder

What the visitor must understand at each depth. This is the acceptance test for every page.

**At 5 seconds** (hero, above fold)
> "Ils font du portage salarial *pour des profils IT*. Pas du portage généraliste."

**At 30 seconds** (scan of the homepage)
> "Ils connaissent mon métier. Ils ont un vivier et des missions. Ils ont un cadre salarié qui tient. Et il y a une deuxième porte : la prestation via l'ESN du groupe."

**At 3 minutes** (a service page read properly)
> "Je vois précisément ce qu'ils prennent en charge, ce que ça coûte, ce qui reste à ma charge, et quel type de mission ils placent. Je peux décider sans les appeler."

The third rung is the commercially important one. A consultant who understands the model before contact arrives qualified. A site that withholds information to force a phone call converts worse and reads as evasive to exactly the audience being targeted.

### 2.3 The one-line positioning (to be validated by the client)

**Option A — talent-first**
> The Porters accompagne les experts IT qui choisissent leurs missions, et met à leur disposition un cadre salarié complet : contrat, paie, protection sociale, gestion administrative.

**Option B — group-first**
> Groupe Porters réunit deux façons d'exercer dans l'IT : le portage salarial pour les indépendants, la prestation pour les entreprises. Un même vivier, un même exigence d'exécution.

> **Decision required.** Everything downstream depends on this. Option A is safer and matches the current site architecture. Option B is stronger but requires the client to commit publicly to the group structure — see §13, Q1.

---

## 3. AUDIENCES

Three readers. Every page must declare, at the top of its brief, which one it serves. Pages that serve two readers serve neither.

### 3.1 The consultant (primary — ~70% of traffic intent)

Senior IT profile: Product Owner, Scrum Master, DevOps, data engineer, cyber, cloud architect, applicative project manager. Typically 8–20 years' experience. Often leaving a permanent role, or already freelance under SASU/micro and tired of the admin.

- **Wants:** net income clarity, mission flow, no bad surprises, someone who understands "IBM i" is not a typo.
- **Fears:** hidden fees, being a line item, dead months, losing unemployment rights.
- **Reads:** the simulator first, then fees, then everything else.
- **Kills the deal:** vague pricing, generic tech vocabulary, a form wall in front of basic information.

> **Do not write for a junior testing the waters.** The source documents describe consultants working on URSSAF Hortonworks→Cloudera migrations and AS/400 core banking-adjacent systems. Write for that person. A junior reading senior-level copy still converts; a senior reading junior-level copy leaves.

### 3.2 The client company (secondary — high value)

DSI, procurement, or an operational manager needing an expert profile quickly, on a fixed perimeter, without an internal hire.

- **Wants:** speed of mobilisation, profile quality, contractual security, compliance (RGPD, security charters, traceability).
- **Fears:** a body-shop with no vetting, a profile who disappears in month two.
- **Reads:** who else uses them, how profiles are selected, what happens if it goes wrong.

### 3.3 The candidate / internal recruit (tertiary)

Only relevant on `/recrutement`. Do not let this reader's tone leak into commercial pages.

---

## 4. MESSAGE ARCHITECTURE

One page, one idea. If a page cannot be summarised in one sentence, it is two pages.

| Page | The one idea | Reader |
|---|---|---|
| `/` | Portage salarial built for IT experts, by a group that also runs IT projects. | Consultant |
| `/portage-salarial` | Here is exactly how the mechanism works, legally and financially. | Consultant |
| `/consultants` | Here is what your year looks like with us, month by month. | Consultant |
| `/tarifs` | Here is what we take and what you get. No asterisks. | Consultant |
| `/simulateur` | See your net income before you talk to anyone. | Consultant |
| `/expertises` | We know your specific job, not "the IT sector". | Both |
| `/entreprises` | We mobilise vetted IT profiles fast, under a contract that protects you. | Client company |
| `/qui-sommes-nous` | Who we are, how the group is structured, and why that matters to you. | Both |
| `/equipe` | Real people with names and roles. | Both |
| `/agences` + 4 city pages | Local presence is real, not a mailbox. | Both |
| `/rse` | Concrete commitments, measurable, not a manifesto. | Client company |
| `/faq` | Fast answers to the questions that block a decision. | Consultant |
| `/blog`, `/livres-blancs` | We know this market well enough to publish about it. | Both |
| `/recrutement`, `/parrainage` | Join us / bring someone. | Tertiary |
| `/rendez-vous`, `/contact` | Talk to a named human. | All |
| `/espace-client` | Client login. | Existing |
| `/mentions-legales`, `/confidentialite` | Legal. **Do not rewrite — see §10.1.** | — |

### 4.1 The narrative spine

Every page carries the same three-beat story in a different register. If a page carries none of them, it is filler.

1. **Vous êtes un expert IT.** (recognition — we know your job)
2. **Vous choisissez vos missions.** (autonomy — we don't own you)
3. **Le cadre tient.** (security — contract, pay, protection, admin — and it is precise, not vague)

---

## 5. TONE & VOCABULARY RULES *(these apply to the French copy)*

### 5.1 Principles

- **Concret avant abstrait.** « Vous êtes payé le 5 du mois suivant » bat « une rémunération sécurisée ».
- **Le chiffre bat l'adjectif.** Si on ne peut pas chiffrer, on ne l'écrit pas.
- **Phrases courtes.** 20 mots maximum en moyenne. Une idée par phrase.
- **Vouvoiement, jamais de tutoiement.**
- **Voix active.** « Nous facturons votre client » et non « la facturation est assurée ».
- **Pas de superlatif sans preuve.** « leader », « référence », « expert reconnu » → interdits sauf source citée.

### 5.2 Vocabulaire interdit

Ces mots sont le bruit de fond du secteur. Ils ne différencient rien.

| Interdit | Remplacer par |
|---|---|
| accompagnement / accompagner *(sauf 1× max par page)* | le verbe précis : gérer, facturer, déclarer, conseiller, former, placer |
| solution sur-mesure | ce que vous faites réellement |
| partenaire de confiance | (supprimer) |
| propulser / booster / libérer votre potentiel | (supprimer) |
| écosystème | secteur, clients, réseau |
| au cœur de | (supprimer) |
| transformation digitale *(en accroche)* | l'objet réel du projet |
| serein / sérénité / en toute liberté | le fait concret qui produit ce sentiment |
| innovant | (supprimer, ou dire en quoi) |
| notre ADN | (supprimer) |
| des résultats concrets | les résultats, chiffrés |

### 5.3 Nommage — à figer

Le corpus source est incohérent. Une seule forme par entité, partout :

| Correct | Interdit |
|---|---|
| **The Porters** | THE PORTERS, The PORTERS, ThePorters, Porters (seul, en première mention) |
| **The Big Porters** | BIG PORTERS, Big Porters |
| **Groupe Porters** | Group Porters, GROUPE PORTERS |
| **portage salarial** (minuscules) | Portage Salarial, portage Salarial |
| **salarié porté** | porté (seul), consultant porté |
| **TJM** (définir à la 1re occurrence) | taux journalier, tarif journalier |

> ⚠️ **Nom de l'outil de gestion : à trancher.** Le livre blanc utilise **LAYA** dans un paragraphe et **in]PORTERS** dans un visuel de la même page. Un seul nom doit survivre. → §13, Q4.

### 5.4 Typographie française

Non négociable, l'agent doit vérifier à chaque commit :

- Espace **insécable** avant `: ; ! ?` et `»`, après `«` → `&nbsp;` ou U+00A0
- Guillemets français `« »`, jamais `" "`
- Apostrophe typographique `’`, jamais `'`
- Espace insécable dans les nombres : `10 000 profils`, `2,4 Mds€`
- Décimale : virgule (`41,53 €`), jamais point
- Symbole `€` **après** le nombre, avec espace insécable
- Majuscules accentuées : `À`, `É` (ex. `À propos`)
- Pas de capitales intégrales dans le corps de texte

---

## 6. FACT BASE

> ⚠️ **`docs/fact-base.md` is authoritative.** The tables below are a working summary kept here for readability. Where the two disagree, `fact-base.md` wins. Every fact there carries an ID (`F-001`…), a source, a page reference, and a status. Cite the ID in commits.

**Four-state status model** — every fact carries exactly one:

| Status | Meaning | Agent may publish? |
|---|---|---|
| `PUBLISHABLE` | Verified, current, cleared | ✅ Yes |
| `VERIFY_BEFORE_USE` | Real but stale, undated, or unsourced | ⚠️ Only after the client confirms and dates it |
| `CLIENT_APPROVAL_REQUIRED` | Valuable proof, but needs written authorisation (client names, logos, testimonials, volume claims) | ❌ Not until approval is recorded in `fact-base.md` |
| `DO_NOT_PUBLISH` | Confidential, personal data, placeholder, or structurally incompatible | ❌ Never |

**Binding.** The agent may only publish `PUBLISHABLE` facts. Everything else is blocked pending client confirmation.

### 6.1 PUBLISHABLE — verified, safe

| Fait | Valeur | Source |
|---|---|---|
| Création The Porters | 2016 | Registre / livre blanc |
| Création The Big Porters | 2018 | Mémoire technique |
| Adhésion | FEPS (Fédération des Entreprises de Portage Salarial) | Livre blanc |
| Cadre légal du portage | Code du travail ; ANI 2008 ; ordonnance du 2 avril 2015 | Public |
| Relation tripartite | salarié porté / entreprise cliente / société de portage | Public |
| Contrat | CDI (ou CDD), statut cadre | Livre blanc |
| Protection sociale | régime général, prévoyance, retraite de base + complémentaire, congés payés, assurance chômage, mutuelle collective | Livre blanc |
| Congés payés | 2,5 jours ouvrés acquis par mois | Code du travail |
| Autonomie | le salarié porté choisit ses missions et négocie ses tarifs ; aucun lien hiérarchique | Livre blanc |
| Cumul | portage + emploi salarié (accord employeur, 48 h/semaine max) ou + retraite | Livre blanc |
| Zone d'intervention | France entière, télétravail possible, client français ou étranger | Livre blanc |
| Agences | Paris, Lyon, Montpellier, Aix-Marseille | Site actuel — **mais voir Q2** |
| Contact | contact@porters.fr | Livre blanc |
| Référentiels métiers utilisés | CIGREF, SYNTEC, ROME | Mémoire technique |
| Pratiques méthodo | ITIL ; cycle en V, Agile (Scrum/Kanban), hybride | Mémoire technique |
| Accessibilité | RGAA, WCAG | Mémoire technique |
| Numérique responsable | RGESN, Green IT, charte NR interne, référent NR désigné | Mémoire technique |
| Diversité | signataire de la Charte de la diversité | Mémoire technique |
| Familles de métiers IT | PO, Scrum Master, Agile Coach, DevOps, Data Analyst/Scientist/Engineer/Architect, Data Governance, BI Developer, ML Engineer, AI Architect, Cloud Architect/Engineer/Security, cyber, AMOA, chef de projet applicatif | Docs Agilité + Data/IA |

### 6.2 REFRESH REQUIRED — real but stale

These are dated 2023–2024. We are in 2026. **Publishing them as current is a factual error.** The agent must either update from an authoritative source or omit.

| Fait | Valeur dans les sources | Action |
|---|---|---|
| Salariés portés en France | 200 000 (2023) | Vérifier le chiffre FEPS/PEPS le plus récent, ou écrire « plus de 200 000 » avec l'année |
| Croissance du secteur | +390 % 2013→2023 ; +20 %/an ; 2,4 Mds€ de CA 2024 | Redater ou omettre |
| Mutuelle | 41,53 €/mois, dont 20,77 € pris en charge | **Ne pas publier tant que non reconfirmé par la paie** |
| Provision rupture conventionnelle | 2,18 % | Idem |
| Frais rupture conventionnelle | 380 € | Idem |
| Plafond mensuel Sécurité sociale | 3 666 € « en 2023 » | Valeur 2026 obligatoire, ou supprimer le chiffre |
| Indemnités journalières maladie | 50 % du SJB, 3 jours de carence, relais prévoyance à 90 jours | Revérifier (paramètres CPAM révisés régulièrement) |
| Congé paternité | 4 jours + 21 jours | Revérifier |
| Cooptation | 1 journée de TJM (cooptant) / ½ journée (coopté) | Confirmer que l'offre est toujours active |
| Délais de paie | CRA avant le 20 → paiement J+1 à J+5 ouvrés ; CRA du 20 au 31 → à partir du 10e jour ouvré | Confirmer que le process n'a pas changé |

> **Rule for the agent:** any figure carrying a year must display that year in the copy. `« 200 000 salariés portés en 2023 »` is honest. `« 200 000 salariés portés »` in 2026 is not.

### 6.3 DO NOT PUBLISH — confidential or unauthorised

The *Mémoire Technique* is a **public-procurement tender response**. It is a confidential commercial document. The following must never reach a public page:

- ❌ **Named contacts and mobile numbers** (référent commercial, référent technique). Personal data, not web content.
- ❌ **Revenue figures** — 2025: 880 K€ / Groupe 5,2 M€ ; 2024: 680 K€ / 4,9 M€ ; 2023: 500 K€ / 4,5 M€.
- ❌ **Headcount** (11) — accurate but undermines the "10 000 profils" claim if placed nearby. Only publish if the client explicitly wants it.
- ❌ **CDC Habitat / GIE SIN specifics** — lot numbers, CCTP references, tender context, the fact of already working for them via Inetum.
- ❌ **Named client references** — CDC Habitat, URSSAF, Keolis, Vinci Autoroutes, Transdev, Pro BTP, Softway Medical, CA Technologies & Services, Horiba, BPCE. **Each requires written authorisation before its name or logo appears publicly.** See §10.3.
- ❌ **ATS/CRM screenshot** and the internal profile-map screenshot — contain real candidate data.
- ❌ **The map of profile distribution by region** — internal.

> **What you *can* do instead:** describe the *type* of engagement without naming the client. « Migration d'un socle Big Data Hortonworks vers Cloudera Data Platform pour un organisme public national » is publishable and just as persuasive. This is the single highest-value transformation in this whole plan — it converts a confidential document into credible public proof.

### 6.4 CLAIMS TO KILL

| Claim | Where | Why |
|---|---|---|
| « 97 % de collaborateurs satisfaits » | site actuel `porters.fr` | Aucune source, aucune méthodologie, aucune date. Supprimer ou sourcer (n, période, méthode). |
| « 100 % Territoire couvert » | nouveau site, accueil | Vrai mais creux — toute société de portage couvre la France. Remplacer par le fait local réel. |
| Témoignages prénom + ville, sans photo réelle | ancien et nouveau site | Non vérifiables. Remplacer par des avis Google réels (déjà présents sur le nouveau site — les garder, supprimer les autres). |
| « un écosystème habitué aux projets exigeants » + mur de logos | nouveau site, accueil | Voir §10.3. Formulation volontairement ambiguë. |

---

## 7. SOURCE DOCUMENT VERDICTS

The client supplied four documents. They are **not** of equal value, and one of them is a trap.

### 7.1 `Porters_-_Memoire_Technique_CDC_-_Lot_n1.pdf` — ⭐ THE GOLDMINE

The single best asset. It is the only document that proves competence rather than asserting it. Mine it for:

- `/entreprises` — the entire sourcing → selection → validation process (5 steps), governance model, continuity mechanism.
- `/expertises` — the anonymised project sheets (see §6.3 for how).
- `/rse` — a genuinely concrete RSE section: train-first travel policy, dematerialised admin, reconditioned hardware, RGESN/Green IT, diversity charter, RSE indicators in steering committees. This is far above the sector's usual RSE boilerplate.
- `/qui-sommes-nous` — the group structure.

**Constraint:** it is written in tender register — long, defensive, dense. It must be *cut hard*, not transposed. Ratio: roughly 5 lines of tender → 1 line of web copy.

### 7.2 `LE_LIVRE_BLANC_-_THE_PORTERS.pdf` — ⭐ THE MECHANISM

The definitive reference for *how portage works at The Porters*. Feeds `/portage-salarial`, `/consultants`, `/tarifs`, `/faq` almost line for line.

**Its best asset is the "PAS DE FRAIS CACHÉS" page** — 7 items covering what the management fee actually buys: avance de trésorerie, apport d'affaires, accompagnement humain, gestion administrative, RC Pro, financement des formations, garantie financière. **This should become the `/tarifs` page.** Fee transparency is the #1 consultant anxiety and almost no competitor answers it plainly.

**Constraint:** Edition 2024. Every figure in it is subject to §6.2.

### 7.3 `Agilite__1.pdf` — ✅ EDITORIAL FUEL

Market data on agile roles: demand share, geography, 2019–2024 evolution, 2025–2030 forecasts (citing DARES).

- **Use for:** `/expertises` (the agile roles section) and 4–6 blog articles.
- **Do not use for:** commercial pages. It is a market study, not a sales argument.
- ⚠️ **Sourcing rule:** salary and demand figures in this document are undated internal estimates except where DARES is cited. Publishing them as fact is a credibility risk in an audience that knows these numbers. Either **cite the source and the year inline**, or reframe as ranges observed by The Porters. Do not publish a bare « le salaire moyen d'un Scrum Master est de 60 000 € ».
- 💡 **The best thing in this document:** the geographic demand map (Paris, Lyon, Lille, Bordeaux, Toulouse, Montpellier, Aix-Marseille, Sophia Antipolis, Nantes) **maps directly onto the four agencies**. That is a real narrative bridge for the city pages — "we are where the demand is" — rather than four interchangeable pages with a swapped city name.

### 7.4 `BIG_DATA___IA_.docx` — 🛑 DO NOT USE AS-IS

**This document is not about The Porters. It is about KwickStart.**

Findings:

1. Every occurrence of the company name is **KwickStart**, not The Porters. KwickStart is a Marseille-based group entity (registered object: portage salarial de consultants; The Porters SASU is its président) — so it is *related*, but it is a **different brand with its own site, `kwickstart.fr`**.
2. The document contains **unfilled placeholders**: « **X projets** livrés en 2025 », « Plus de **X candidats** spécialisés en Data », repeated across all three sections. It is an unfinished draft.
3. It contains **three versions of the same text** (base, V2, V3) concatenated in one file.
4. Its register is exactly what §5.2 bans: *propulsons votre entreprise vers l'avenir*, *libérez la puissance de vos données*, *un véritable trésor*, *au cœur de l'innovation*. Publishing it would **actively reverse** the vision shift.

**Verdict:** the *only* salvageable part is **the job-family taxonomy in V3** — the lists of Data / IA / Cloud roles with one-line definitions. Those are factual, well-written, and go straight into `/expertises`. Everything else is discarded.

> ⚠️ **Agent instruction:** if the string `KwickStart` appears anywhere in the repo after the rewrite, the build is wrong. Add it to the forbidden-strings check in §11.4.
>
> ⚠️ **Client question:** is KwickStart meant to be presented on porters.fr at all, or does it stay a separate brand? → §13, Q1.

### 7.5 `Claude_PORTERS_information.txt` — ⚠️ EXCELLENT REGISTER, WEAK COPY BANK

A consolidation of two legacy decks (agility, 30 pp., dated 11 Dec 2024 · ESN expertise, 15 pp.) that could not be uploaded directly. Two very different halves.

**What it adds — genuinely valuable, take all of it:**

1. **Cybersecurity as a service line.** Entirely absent from the previous four documents beyond a passing keyword. Now structured: *diagnostic* (audit, analyse des risques, évaluation de la gouvernance) · *conseil* (stratégie, assistance technique, sensibilisation) · *plan d'action* (tests, déploiement, amélioration continue, budget). Plus five profiles including RSSI. **This is a new commercial pillar — or it is dead weight. See §13, Q11.**
2. **A role competency catalogue** — 13 roles with competencies *and* soft skills (DSI/CIO, RSSI, PO, Scrum Master, Change Manager, Agile PM, RTE, Agile Coach, Technical Coordinator, DevOps, UX/UI, Business Analyst, Solution Architect). Moved to `fact-base.md` §R. This is the raw material for the profile explorer (§9.5b).
3. **Concrete DevOps tooling** — Ansible, Terraform, Docker, Kubernetes, Grafana, Prometheus. The first named technologies in the whole corpus. Use them, with the caveat in `fact-base.md` F-R12.
4. **A four-state status taxonomy and a fact-table schema** — better than v1.0 of this plan. Adopted wholesale (§6, `fact-base.md`).
5. **Independent confirmation** of the KwickStart placeholder problem (§7.4) and of the agency-count contradiction. Two separate analyses reaching the same conclusion is worth noting.
6. **A new PII risk not previously identified** — the cybersecurity deck names individual consultants alongside client organisations in project examples. → §10.6.

**Where it must not be followed — the copy bank (§9 of the pack):**

The ten ready-to-use French blocks are safe, and that is their only virtue. Measured against §5.2 of this plan they fail on their own terms:

| Pack copy | Problem |
|---|---|
| « PORTERS place la qualité de la relation **au cœur de** chaque mission » | Banned construction (§5.2) |
| « expertise, écoute et **accompagnement personnalisé** » | Three abstract nouns; `accompagnement` used as the main verb |
| « PORTERS **aide les entreprises à identifier** les compétences nécessaires » | Used near-verbatim in the cyber, data, cloud and IA blocks — same sentence, swapped noun |
| « **rapprocher** un besoin précis… et des talents capables d'y répondre **avec justesse** » | Empty qualifier; positions the company as a broker |
| « **met en relation** », « **mobilise des profils** », « **rapproche** les entreprises de spécialistes » | — |

That last row is the structural problem. **Every block in the pack's copy bank describes The Porters as an intermediary.** Written to avoid legal risk, it has accidentally re-encoded the exact perception this whole project exists to change (§2.1). A reader of that copy concludes: *ils font de la mise en relation*. That is what they already think.

**Resolution:** the pack's *taxonomy* is adopted, its *risk register* is adopted, its *French copy is replaced*. `docs/copy-bank.md` contains the rewrites, each one shown against the pack version so the difference is visible and arguable. Safety is preserved — none of the rewrites adds a claim. What changes is that they describe work being done rather than introductions being made.

---

## 8. PHASE 0 — REPO AUDIT *(agent task, runs first)*

I could not crawl the sub-pages of the staging site — fetch permissions blocked everything past the homepage. The agent has the repo and can do this properly, which is better anyway: real file paths beat scraped HTML.

**Task:** produce `docs/copy-inventory.md` before writing any copy.

```
1. Locate every source of user-visible French text:
     src/pages/**/*.astro
     src/components/**/*.astro
     src/content/**            (content collections)
     src/data/**               (JSON/YAML/TS copy files)
     src/layouts/**
     astro.config.*            (site metadata)
   Report which pattern this project actually uses — hardcoded in .astro,
   content collections, or a data layer. This determines edit strategy.

2. For every page, emit one row per text block:

   | Block ID | File | Line | Type | Current FR text (verbatim) | Chars |

   Type ∈ {h1, h2, h3, lead, body, cta, label, nav, meta-title,
           meta-description, alt, faq-q, faq-a, quote, stat, footer}

3. Flag separately:
   - blocks reused across pages (shared components) — editing one edits many
   - hardcoded text inside components that LOOKS page-specific but is not
   - any i18n setup (if present, copy lives in locale files, not templates)
   - all meta-title / meta-description / og: values
   - the string "KwickStart" anywhere
   - the string "LAYA" and "inPORTERS" anywhere
   - any figure matching /\d+\s*(%|€|Mds|K€|M€)/ — cross-check against §6

4. Do NOT edit anything in this phase. Inventory only.
```

**Block ID convention** — see Appendix A. Use it from Phase 0 onward. Once IDs exist, the client says "HOME-H1" instead of "you know, the big sentence at the top", and review time drops by an order of magnitude.

---

## 9. PAGE-BY-PAGE BRIEFS

> For the homepage I have the actual current text (I fetched it). For every other page, the agent fills the "Current" column during Phase 0, then applies the brief.

---

### 9.1 `/` — Accueil

**Reader:** consultant · **One idea:** portage salarial built for IT experts, by a group that also runs IT projects.

| Block ID | Current (verbatim) | Verdict | Instruction |
|---|---|---|---|
| `HOME-EYEBROW` | PORTAGE SALARIAL • CONSULTANTS • ENTREPRISES | Keep concept | Add the IT qualifier — it is the whole differentiation. → `PORTAGE SALARIAL • EXPERTS IT • ENTREPRISES` |
| `HOME-H1` | Votre projet / Notre accompagnement / Une collaboration durable | ❌ **Replace** | Rotating abstraction, makes no claim. See options below. |
| `HOME-LEAD` | Nous vous accompagnons avec réactivité, proximité et transparence, afin que vous puissiez vous consacrer pleinement à votre expertise. | ❌ **Replace** | Three abstract nouns + « accompagner ». Replace with the mechanism. |
| `HOME-CTA-1/2/3` | Parler à un conseiller / Découvrir le portage / Nos solutions entreprises | ⚠️ **Reduce to 2** | Three equal CTAs = no CTA. Primary: `Simuler mes revenus`. Secondary: `Parler à un conseiller`. Move the entreprises link into the nav only. |
| `HOME-BADGES` | Interlocuteur dédié · Missions sécurisées · Statut salarié · Expertise métier | ⚠️ **Sharpen** | « Missions sécurisées » is meaningless. → `Interlocuteur dédié · Payé dès le 1er mois · CDI statut cadre · Spécialistes IT` |
| `HOME-LOGOS` | BPCE, Groupama, Airbus, Safran, Thales, Capgemini + « Un écosystème habitué aux projets exigeants » | 🛑 **BLOCKED** | Do not touch until §13 Q3 is answered. Legal exposure, see §10.3. |
| `HOME-STEPS-01..04` | Accompagnement humain / Cadre salarié / Cadre administratif suivi / Expertise IT & transformation | ✅ Structure good | Rewrite bodies with concrete facts (see §6.1). Rename 03 → `Administratif pris en charge`. Promote 04 to position 01 — the IT specialism is the differentiator and it is currently last. |
| `HOME-REVIEWS` | 3 avis Google réels, nommés | ✅ **Keep** | Real, sourced, verifiable. Best proof asset on the page. Keep the link to the Google reviews page. |
| `HOME-FAQ` | 4 questions | ✅ **Keep** | Accurate and well written. Only fix typography per §5.4. |
| `HOME-COVERAGE` | 4 agences · 100 % Territoire couvert · 2 modes · France entière | ⚠️ **Rework** | « 100 % Territoire couvert » says nothing (see §6.4). Replace the stat block with what is locally true — and link the Agilité geographic data (§7.3) to make it mean something. |
| `HOME-FINAL-CTA` | Prêt à donner un nouveau cadre à votre indépendance ? | ✅ Keep | Good. Only the two CTAs beneath need aligning with `HOME-CTA`. |
| `HOME-META-TITLE` | Portage salarial pour experts IT — The Porters | ✅ **Keep** | Already correct — and notably better than the H1. Align the H1 up to the meta, not the reverse. |

**`HOME-H1` — pick one:**

> **Option A** — direct, mechanism-led
> # Vous choisissez vos missions IT. Nous tenons le cadre.
> **Lead:** Contrat de travail, facturation, paie, déclarations, protection sociale. Vous restez indépendant sur le fond, salarié sur la forme.

> **Option B** — expertise-led
> # Le portage salarial, pensé pour les métiers de l'IT.
> **Lead:** Cyber, data, cloud, DevOps, produit, agilité. Nous connaissons vos missions parce que nous en pilotons aussi — et nous transformons votre chiffre d'affaires en salaire, dès le premier mois.

*A is stronger for conversion. B is stronger for the vision shift. If the client hesitates: A for the H1, B's second sentence in the lead.*

---

### 9.2 `/portage-salarial`

**Reader:** consultant · **One idea:** here is exactly how the mechanism works.

- **Source:** Livre blanc pp. 2–8 (définition, relation tripartite, éligibilité, liberté/avantages).
- **Must contain:** the tripartite diagram in text form; CDI statut cadre; the full social protection list; autonomy (missions, tarifs, no hierarchy); who is eligible; who is not (professions réglementées, services à la personne).
- **Must NOT contain:** fees (that is `/tarifs`), the consultant journey (that is `/consultants`).
- **Length:** ≤ 900 words. The livre blanc has ~4 000. Cut ruthlessly.
- **Trap:** do not repeat the homepage FAQ answers verbatim. Cross-link instead.

### 9.3 `/consultants`

**Reader:** consultant · **One idea:** here is what your year looks like with us.

- **Source:** Livre blanc — « VOTRE ENTRÉE », « VOTRE RÉMUNÉRATION », congés, santé, chômage, retraite, trésorerie, apport d'affaires, « VOTRE SORTIE ».
- **Structure:** chronological. Entrée → premier mois → rythme mensuel → aléas (maladie, congés, maternité/paternité) → sortie. Nobody else in this sector documents the exit. **Documenting it is a trust signal, not a risk.**
- **Include:** the compte de trésorerie — genuinely differentiating and poorly explained everywhere on the current site.
- **Figures:** all subject to §6.2. If unconfirmed, describe the mechanism without the number.

### 9.4 `/tarifs` — 🎯 HIGHEST-LEVERAGE PAGE

**Reader:** consultant · **One idea:** here is what we take and what you get.

- **Source:** Livre blanc, page « PAS DE FRAIS CACHÉS » — the 7 items.
- **Structure:** state the fee model, then the 7 items as *what the fee buys*: avance de trésorerie (payé dès le 1er mois, avant règlement client) · apport d'affaires · interlocuteur unique · gestion administrative complète · RC Pro · financement des formations (CPF, OPCO) · garantie financière.
- **Then state what is *not* included.** A page that only lists inclusions is not transparent. This single section will outperform every other page on the site for trust.
- **Client decision needed:** publish the actual percentage, or not? → §13, Q5. My recommendation: publish it. The audience will ask on the first call anyway; publishing pre-qualifies and removes the main reason a consultant bounces to a competitor who does.

### 9.5 `/expertises`

**Reader:** both · **One idea:** we know your specific job, not "the IT sector".

- **Sources:** supplemental pack §3–4 (cyber service families, role catalogue) + Agilité doc + Big Data/IA doc **V3 taxonomy only** (§7.4) + mémoire technique (anonymised project types, §6.3).

**Structure — four hubs, not eleven thin pages.** The supplemental pack proposes this grouping and it is correct: it is maintainable, it matches how a buyer thinks, and it avoids the thin-content penalty that one-page-per-keyword produces.

| Hub | Covers | Copy block |
|---|---|---|
| **Cybersécurité** | gouvernance, audit, risques & conformité, sécurité opérationnelle, sensibilisation | `CB-04` |
| **Data & intelligence artificielle** | analyse, ingénierie, architecture, gouvernance, ML, industrialisation | `CB-05` |
| **Cloud & DevOps** | architecture, migration, CI/CD, IaC, conteneurisation, observabilité, sécurité cloud | `CB-06` |
| **Agilité & transformation** | PO, Scrum Master, Agile Coach, RTE, Business Analyst, architecte | `CB-07` |

- **Per hub:** the intro block from `copy-bank.md`, then the mobilisable profiles, then 1–2 anonymised project types. **The project types are the point.** Every competitor publishes the profile list; almost none publishes what the missions actually look like.
- ⚠️ **Cybersécurité is conditional on §13 Q11.** If it is not a live commercial offer, the hub does not ship. Publishing an offer the company cannot staff is worse than publishing nothing — the enquiry arrives, and it cannot be answered.
- ⚠️ Strip every trace of KwickStart branding and every `X` placeholder.
- ⚠️ Do **not** name a sector (télécoms, énergie, santé, aéronautique…) as a served market without clearance. The pack lists 14 sectors drawn from a document about a different company. → `fact-base.md` F-S01.

### 9.5b Profile explorer *(new component — proposal, not an instruction)*

The role catalogue in `fact-base.md` §R supports a filterable component: six families (stratégie & gouvernance · produit & agilité · cybersécurité · data & IA · cloud, infra & DevOps · architecture, analyse & design), each role as a card with mission scope, core competencies, and collaboration qualities.

This is the highest-value addition available from the new material, because it is the only element that would make the site *demonstrably* more knowledgeable than a competitor's rather than merely claiming to be.

**But it is out of scope for this pass.** §10.5 stands: the agent rewrites text, it does not add components. The agent's job here is to write `docs/copy-questions.md` with the proposal and the data ready, so the client can scope it as a second phase with a real budget. Do not build it inside a copy commit.

**Never display on a profile card:** salary, availability, years of experience, or candidate volume — unless tied to real approved data (`fact-base.md` F-V01).

### 9.6 `/entreprises`

**Reader:** client company · **One idea:** we mobilise vetted IT profiles fast, under a contract that protects you.

- **Source:** mémoire technique §3 (sourcing, 5-step selection, governance) and §5 (execution method).
- **Must contain:** the 5-step selection process (analyse → référentiels métiers → entretiens structurés → tests/mise en situation → validation finale) — this is concrete and nobody publishes it; the multi-channel sourcing; the referentials (CIGREF, SYNTEC, ROME); the continuity mechanism (binôme, relais identifié); RGPD and security-charter compliance; anonymised profile transmission.
- **The 10 000+ profile pool** may be published **only** if the client confirms the figure is current and defensible. → §13, Q6.
- **Register shift:** the tender text is defensive and exhaustive. Web copy is assertive and short. Cut ~80%.

### 9.7 `/qui-sommes-nous`

**Reader:** both · **One idea:** who we are, how the group is structured, why that matters to you.

- Depends entirely on §13 Q1 (group visibility).
- **If group-visible:** The Porters (2016, portage, FEPS) · The Big Porters (2018, ESN IT) · KwickStart (Région Sud) — with the reason it benefits the reader: two contractual routes, one talent pool.
- **If not:** The Porters only, with the IT specialism as the through-line.
- Keep the président's video (`HOME-PRESIDENT` block) — a real named person is worth more than three paragraphs of mission statement.

### 9.8 `/agences` + `/agences/{paris,lyon,montpellier,aix-en-provence}`

**Reader:** both · **One idea:** local presence is real, not a mailbox.

- **The trap:** four pages identical except the city name. Google treats that as thin content and readers see through it instantly.
- **The fix:** use the Agilité geographic data (§7.3). Each city page states *what the local IT market actually looks like* and which profiles are in demand there:
  - **Paris** — Scrum Master, PO, Agile Coach ; grands comptes, télécoms, finance
  - **Lyon** — Scrum Master, Agile Coach, DevOps ; industrie en transition
  - **Montpellier** — PO, Scrum Master, DevOps ; santé, éducation, numérique (siège)
  - **Aix-Marseille** — DevOps, Scrum Master, Agile Coach ; énergie, logistique, santé numérique ; proximité Sophia Antipolis
- **Each page must carry a real address** and, ideally, a named contact. → §13, Q2 (the old site lists 6 agencies including Bordeaux and Lille; the new one lists 4; the tender says *siège Montpellier + bureaux Paris*. Three different answers. This must be resolved before publication — it is a legal-mentions issue as much as a copy one.)

### 9.9 `/rse`

**Reader:** client company · **One idea:** concrete, measurable commitments.

- **Source:** mémoire technique §6 — the strongest RSE material in the corpus.
- **Publish:** train-first for long-distance travel, soft mobility locally · fully dematerialised administration · reconditioned peripherals + recycling/donation channels · RGESN, Green IT, éco-conception, accessibility (RGAA/WCAG) · Charte de la diversité · référent numérique responsable désigné · RSE indicators reviewed in steering committees.
- **Do not publish:** the CDC Habitat framing, the ITNR certification *trajectory* stated as achievement, the partner logos.
- ⚠️ **Precision rule:** the tender says "nous nous engageons à inscrire l'organisation dans une trajectoire vers ces référentiels". On a website that must not become "certifiés". → §13, Q7.

### 9.10 `/faq`

**Source:** homepage FAQ (already good) + livre blanc + the questions the sales team actually receives.
Add, at minimum: how the TJM converts to net · what happens between missions · are unemployment rights preserved · can I keep my own clients · what the exit costs · can I combine portage with another activity.
**Answer format:** direct answer in the first sentence. Nuance after. Never open with « Cela dépend ».

### 9.11 `/simulateur`, `/rendez-vous`, `/contact`

Functional pages. Copy work is limited to: removing friction, naming the human on the other end, stating what happens next and when. « Réponse sous 24 h ouvrées » beats « nous vous recontacterons rapidement ».

### 9.12 `/blog`, `/livres-blancs`

Not a rewrite target in this pass. Note for the client: the Agilité document contains material for 4–6 solid articles that would meaningfully support the vision shift. Scope separately.

### 9.13 `/recrutement`, `/parrainage`, `/espace-client`

Low priority. Apply §5 tone rules only. Do not restructure.

### 9.14 `/mentions-legales`, `/confidentialite`

🛑 **Do not touch.** See §10.1.

---

## 10. GUARDRAILS

### 10.1 Never edit

- `/mentions-legales`, `/confidentialite` — legal text. Any change needs a lawyer, not a copy agent. The **only** permitted exception is correcting the agency list once §13 Q2 is answered, and even then the client validates before commit.
- URLs and slugs — changing them breaks inbound links and rankings. If a slug is genuinely wrong, propose a redirect; do not rename.
- Internal link targets, `hreflang`, canonical tags.
- Component structure, props, class names, Tailwind utilities, any JS.
- Image files, paths, and dimensions.
- `astro.config.*`, build config, dependencies.

### 10.2 Never publish without written client confirmation

Everything in §6.2 and §6.3. When in doubt, the agent writes the copy with a `<!-- TODO-CLIENT: confirm figure X -->` marker and leaves the number out. **An empty space is recoverable. A wrong number in Google's index is not.**

### 10.3 Client names and logos — legal

Displaying a client's name or logo generally requires their authorisation, and implying a commercial relationship that does not exist is actionable. Two specific exposures here:

1. **The homepage logo wall** (BPCE, Groupama, Airbus, Safran, Thales, Capgemini) does not match the client list in the tender document (CDC Habitat, URSSAF, Keolis, Vinci Autoroutes, Transdev, Pro BTP, Softway Medical, CA Technologies & Services, Horiba). Two different sets. At least one is not a client list.
2. The caption *"Un écosystème habitué aux projets exigeants"* is ambiguous by construction — which is itself the signal that someone knew the direct claim could not be made.

**Agent instruction:** freeze `HOME-LOGOS` and do not modify it. This is a client decision (§13, Q3), not a copy decision.

*I am not a lawyer and this is not legal advice — but the discrepancy is clear enough on the face of the documents that it should be checked with counsel before this site goes to production.*

### 10.4 SEO

- Never change a page's `meta-title` / `meta-description` without recording the old value in the inventory.
- Preserve one `h1` per page. Do not change heading hierarchy to fit copy.
- Keep the primary keyword (`portage salarial` + qualifier) in `h1`, `meta-title`, and the first 100 words.
- Every image keeps or gains a French `alt`.

### 10.5 Scope

The agent rewrites **text**. It does not redesign, restructure navigation, add pages, delete pages, or "improve" layout. Any such proposal goes in `docs/copy-questions.md` — not into a commit.


### 10.6 Personal data — named individuals

Newly identified in the legacy cybersecurity deck: **project examples that name individual consultants alongside the client organisation they worked for.**

That combination — a person's name plus where they were placed — is personal data with a professional-confidentiality dimension. It must not reach a public page under any circumstance, including in an "our consultants" or "case study" format, without the individual's explicit written consent *and* the client's.

**Agent instruction:** if a personal name appears in a source document in a project or mission context, it is `DO_NOT_PUBLISH`. No exceptions, no anonymisation-by-initials, no "un de nos consultants, Jean D." The only names that may appear on the site are those of The Porters' own staff on `/equipe`, and only with their agreement.

### 10.7 Banned superlatives *(extends §5.2)*

Never publish, in any language, without separately recorded evidence:
`acteur incontournable` · `leader` · `le meilleur` · `expertise de pointe` · `excellence garantie` · `transformation réussie` (as a promise) · `transparence totale` · `solutions parfaitement adaptées` · any guarantee of result, performance, delay, or project success.

Also barred by extension: `ISO 27001` / `RGPD` / any certification stated as *held* rather than *aligned with* (§13 Q7); pentest, SOC, or CERT capability (§13 Q11).
---

## 11. EXECUTION PROTOCOL

### 11.1 Order

```
Phase 0  Repo audit → docs/copy-inventory.md          [no edits]
Phase 1  /tarifs                  ← highest leverage, smallest surface
Phase 2  /                        ← validates tone against the whole plan
Phase 2b NAV RESTRUCTURE          ← nav-plan §4, its own commit, no copy in it
Phase 3  /portage-salarial, /consultants
Phase 4  /expertises, /entreprises
Phase 5  /qui-sommes-nous, /agences ×5, /rse
Phase 6  /faq, /simulateur, /rendez-vous, /contact
Phase 7  /recrutement, /parrainage, /espace-client
```

**Phase 2b sits where it does deliberately.** Restructuring the navigation before the homepage is rewritten means committing to an architecture you haven't tested. Rewrite the homepage first — if the positioning holds there, the nav follows from it. If it doesn't, you've changed one page instead of the whole skeleton.

**Phase 1 is `/tarifs`, not the homepage.** It is small, self-contained, and it is where the vision shift is either real or it is not. If the client cannot approve a transparent fees page, the whole positioning needs revisiting before more pages are written. Fail fast on the smallest page.

### 11.2 One page per commit

```
copy(<page-slug>): <one-line summary>

Blocks: HOME-H1, HOME-LEAD, HOME-CTA-1
Plan:   §9.1
Status: awaiting client validation
TODO:   HOME-LOGOS frozen (§13 Q3)
```

Never batch pages. The client must be able to review, revert, or approve one page at a time.

### 11.3 Stop conditions — ask, do not invent

The agent **stops and asks** when:

- a fact is needed that is not in §6.1
- a figure would need updating and no authoritative source is available
- the brief and the existing structure conflict
- a change would touch anything in §10.1
- a client name, logo, or certification claim is involved
- a source document contradicts another (they do — see §5.3, §13 Q2)

**Inventing a plausible number is the single worst failure mode available here.** The site is a legal and commercial document. A hallucinated management fee, a wrong CPAM parameter, or an invented client reference does damage that a copy review will not catch, because it will read perfectly.

### 11.4 Pre-commit checks

```
□ No occurrence of "KwickStart"
□ No occurrence of "X projets" / "Plus de X" / any "..." placeholder
□ No banned word from §5.2 (allow "accompagnement" ×1 per page max)
□ No banned superlative from §10.7
□ No personal name in a mission or project context (§10.6)
□ No sector named as a served market without clearance (fact-base F-S01)
□ No certification stated as held rather than aligned-with (§13 Q7)
□ Every figure traceable to a PUBLISHABLE fact ID in fact-base.md, or carries its year, or is absent
□ Every published sentence traceable to a copy-bank block or a page brief
□ French typography per §5.4 (nbsp, « », ’, virgule décimale, € postposé)
□ Naming per §5.3
□ One h1 per page
□ meta-title and meta-description present, ≤ 60 / ≤ 155 chars
□ All alt attributes present and in French
□ No slug, URL, or internal link changed
□ Any unresolved item marked <!-- TODO-CLIENT: ... -->
□ npm run build passes
```

### 11.5 Client validation loop

The agent never rewrites the same block twice on unstructured feedback. If a block is rejected:

1. Client states the reason in one sentence.
2. Agent produces **two** new options.
3. Client picks one.

Three rounds maximum per block. After three, the block is escalated as an open positioning question, not a wording question — because that is what it will actually be.

---

## 12. CHECKLIST DE VALIDATION CLIENT *(par page, 2 minutes)*

À faire lire au client tel quel.

```
□ 1. En 5 secondes, je comprends à qui s'adresse cette page.
□ 2. La page défend UNE idée. Je peux la dire en une phrase.
□ 3. Chaque chiffre affiché est vérifiable, à jour, et je sais d'où il vient.
□ 4. Aucun nom de client ni logo n'apparaît sans autorisation écrite.
□ 5. Je ne lis aucun mot de la liste interdite (§5.2).
□ 6. Aucune promesse qui ne soit pas tenue par un fait précis.
□ 7. Un consultant senior lirait ça sans se sentir pris pour un débutant.
□ 8. La typographie française est correcte (« », espaces insécables, virgules décimales).
□ 9. Rien n'a changé en dehors du texte : pas de lien, pas d'URL, pas de mise en page.
□ 10. S'il reste une question ouverte, elle est marquée TODO-CLIENT et je sais qui tranche.
```

**Règle de revue :** on valide ou on refuse **par bloc**, en citant son identifiant (`HOME-H1`). On ne commente pas « la page en général ». C'est ce qui fait passer une revue de 40 minutes à 5.

---

## 13. QUESTIONS OUVERTES — À TRANCHER PAR LE CLIENT

Ces décisions bloquent la rédaction. Aucune ne peut être prise par l'agent.

| # | Question | Bloque | Recommandation |
|---|---|---|---|
| **Q1** | Le groupe est-il visible sur porters.fr ? The Big Porters (ESN) et KwickStart apparaissent-ils, ou restent-ils des marques séparées ? | §2.3, `/qui-sommes-nous`, `/entreprises`, `/expertises` | **Oui, visible.** C'est le principal levier du changement de perception. Un groupe qui pilote aussi des projets IT n'est plus un intermédiaire administratif. |
| **Q2** 🔴 | **Combien d'agences, et lesquelles ?** Quatre sources, quatre réponses : ancien site → 6 villes (Paris, Lyon, Aix-Marseille, Bordeaux, Lille, Montpellier) · nouveau site → 4 · mémoire technique → « siège Montpellier + bureaux Paris » · deck legacy → 7 régions (Nord, IdF, Rhône-Alpes, Bordeaux/Ouest, Sud-Ouest, Occitanie, PACA). | `/agences` ×5, footer, mentions légales, accueil | **Priorité absolue.** Et distinguer trois choses différentes que les sources confondent : (a) bureau physique, (b) couverture commerciale, (c) présence de consultants en mission. Une carte qui affiche (c) en laissant croire à (a) est une allégation trompeuse. |
| **Q3** | Les logos de l'accueil (BPCE, Groupama, Airbus, Safran, Thales, Capgemini) : clients réels ? Autorisations écrites ? | `HOME-LOGOS` | Voir §10.3. À faire valider par un juriste. Si pas d'autorisation : retirer le bandeau, garder les avis Google. |
| **Q4** | L'outil de gestion s'appelle **LAYA** ou **in]PORTERS** ? Les deux figurent sur la même page du livre blanc. | `/consultants`, `/espace-client`, FAQ | Un seul nom. |
| **Q5** | Publie-t-on le taux de frais de gestion ? | `/tarifs` | **Oui.** C'est la première question de tout consultant. Le publier pré-qualifie et supprime la principale raison de partir chez un concurrent qui l'affiche. |
| **Q6** | Le vivier de **10 000+ profils IT** est-il un chiffre actuel et défendable ? | `/entreprises` | Si oui, c'est un des meilleurs arguments du corpus. Si le chiffre est ancien, l'actualiser ou l'omettre — pas l'arrondir. |
| **Q7** | Certifications : détenues ou visées ? Le mémoire parle d'une « trajectoire » vers les référentiels ITNR ; ISO est mentionné comme « compatible », pas comme certifié. | `/rse`, `/entreprises` | Écrire exactement ce qui est vrai. « Aligné sur ITIL » ≠ « certifié ITIL ». Une certification revendiquée à tort est vérifiable en trente secondes. |
| **Q8** | Les chiffres du livre blanc (mutuelle 41,53 €, provision 2,18 %, frais rupture 380 €, délais de paie) sont-ils toujours exacts en 2026 ? | `/tarifs`, `/consultants`, FAQ | À confirmer par le service paie avant toute publication. |
| **Q9** | Les témoignages « Delphine / Chloé / Andy » sont-ils réels et autorisés ? | Accueil | Sinon : supprimer. Les avis Google réels suffisent et valent plus. |
| **Q10** | La revendication « 97 % de collaborateurs satisfaits » repose-t-elle sur une enquête (n, période, méthode) ? | Accueil | Sans source : supprimer. |
| **Q11** 🔴 | **La cybersécurité est-elle une offre commerciale active aujourd'hui, ou une capacité héritée ?** Le pack décrit une gamme complète (diagnostic, conseil, plan d'action) et cinq profils dont RSSI. | Hub `/expertises`, SEO, `/entreprises` | Si active : c'est le pilier le plus vendeur du corpus et il mérite un hub complet. Si héritée : ne rien publier. Une offre affichée mais non staffable produit des demandes qu'on ne peut pas honorer — c'est pire que le silence. |
| **Q12** | Data, IA, Cloud et DevOps : quatre offres distinctes, ou une seule offre « expertise numérique » ? | Architecture `/expertises` | Recommandation : deux hubs (Data & IA · Cloud & DevOps). Quatre pages fines se cannibalisent en SEO et se maintiennent mal. |
| **Q13** | Quels rôles du catalogue (`fact-base.md` §R) sont **réellement représentés** dans le vivier aujourd'hui ? | `/expertises`, profile explorer | Ne publier une fiche métier que si le profil existe. Un catalogue exhaustif mais partiellement fictif se détecte au premier appel. |
| **Q14** | Quels secteurs peuvent être nommés publiquement ? Le pack en liste 14, issus d'un document portant sur une autre société. | `/expertises`, `/entreprises`, SEO | N'en nommer aucun sans référence réelle derrière. |
| **Q15** | Quel est le processus réel de qualification client → sélection → onboarding → suivi de mission ? | `/entreprises`, bloc `CB-11` | Le mémoire technique en décrit un, détaillé et crédible. Confirmer qu'il s'applique hors marchés publics — sinon le bloc `CB-11` doit être réécrit. |
| **Q16** | Quels outils, frameworks et certifications peuvent être nommés publiquement ? (Ansible, Terraform, Docker, Kubernetes, Grafana, Prometheus, BoondManager, CIGREF, SYNTEC, ROME, ITIL, RGAA, RGESN…) | `/expertises`, `/entreprises`, `/rse` | Nommer des outils est un signal de compétence fort et peu risqué — à condition de dire « nos consultants interviennent sur » et non « nous maîtrisons ». |
| **Q17** | Communication principale : société de portage salarial, partenaire d'expertise, ESN, ou modèle hybride assumé ? | Tout | C'est Q1 formulée autrement, posée indépendamment par le pack. Deux analyses séparées convergent sur la même question non tranchée — ce qui confirme qu'elle est la cause racine des réunions à répétition (§1). |

---

## APPENDIX A — BLOCK ID CONVENTION

```
<PAGE>-<TYPE>[-<INDEX>]

PAGE   HOME · PORT (portage-salarial) · CONS (consultants) · ENTR · EXPE
       TARI · SIMU · RDV · CONT · QSN · EQUIPE · AGEN · AG-PAR · AG-LYO
       AG-MTP · AG-AIX · RSE · RECR · PARR · FAQ · BLOG · LIVR · ESPC

TYPE   H1 · H2 · H3 · EYEBROW · LEAD · BODY · CTA · BADGE · STAT
       QUOTE · FAQ-Q · FAQ-A · NAV · FOOT · META-T · META-D · ALT

Examples
  HOME-H1              the homepage headline
  TARI-BODY-03         third body paragraph on /tarifs
  AG-MTP-LEAD          Montpellier page intro
  EXPE-H3-DATA         "Data" family heading on /expertises
```

Every block in `docs/copy-inventory.md` gets an ID. Every commit message lists the IDs it touched. Every client comment references an ID.

---

## APPENDIX B — KICKOFF PROMPT FOR CLAUDE CODE

Place all three files in `docs/`, then paste this into Claude Code:

```
Read these three files in full before doing anything:
  docs/copy-plan.md    strategy, page briefs, guardrails, protocol
  docs/fact-base.md    every fact, with source and publication status
  docs/copy-bank.md    approved French copy blocks

You are executing a copy rewrite on this Astro site. Your instructions are
in English; every word you write for publication is in French.

Start with Phase 0 (copy-plan §8): audit the repo and produce
docs/copy-inventory.md. Do not edit a single file of site copy in this
phase.

Rules you must not break:
- fact-base.md is binding. Only PUBLISHABLE facts may appear on the site.
  For anything else, leave <!-- TODO-CLIENT: F-XXX --> and move on.
- Copy comes from copy-bank.md. If a block you need does not exist there,
  you propose two options and stop. You do not write a third.
- copy-plan §10: text only. No slugs, no URLs, no links, no components,
  no config, no legal pages. No new pages, no new components.
- copy-plan §11.3: when you need a fact you don't have, stop and ask.
  Never invent a number, a client name, a sector, or a certification.
- Never publish a personal name in a mission or project context (§10.6).
- The string "KwickStart" must not exist in this repo when you are done.

Blocked pending client answers — do not write these pages:
  Q2  agency count and status        → /agences and the 4 city pages
  Q3  homepage client logos           → HOME-LOGOS is frozen
  Q11 is cybersecurity a live offer?  → the cyber hub on /expertises

When Phase 0 is complete, stop and show me docs/copy-inventory.md plus the
unresolved-facts list before proceeding to Phase 1 (/tarifs).
```

**Second prompt, after Phase 0 is approved:**

```
Phase 0 is approved. Proceed to Phase 1: /tarifs only.

One page, one commit, using the commit format in copy-plan §11.2.
List the block IDs you touched and the fact IDs you relied on.
Run the §11.4 pre-commit checklist and paste the result.
Then stop. Do not start Phase 2.
```

---

*Sources for this plan: the four documents supplied by the client (Mémoire Technique Lot n°1, Livre Blanc édition 2024, L'agilité dans l'IT, Big Data/IA), the live site `www.porters.fr`, the staging site homepage `porters-ot.pages.dev`, and public company registry data. Sub-pages of the staging site could not be retrieved directly — Phase 0 exists to close that gap from the repo, which is the more reliable source anyway.*
