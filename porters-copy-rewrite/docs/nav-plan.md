# THE PORTERS — NAVIGATION & INFORMATION ARCHITECTURE

**Version** 1.0 · Companion to `docs/copy-plan.md`, `docs/fact-base.md`, `docs/copy-bank.md`
**Status** Proposal. Nothing here ships until §6 is signed off.

---

## 1. THE THREE TIERS — READ THIS FIRST

"Changing the navigation" is three different jobs with three different risk levels. Conflating them is how sites lose their rankings.

| Tier | What it means | Reversible? | SEO risk | Ships in this pass? |
|---|---|---|---|---|
| **T1 · Labels** | The words in the menu. `Nos solutions entreprises` → `Entreprises`. | Instantly | None | ✅ Yes — this is copy |
| **T2 · Structure** | Grouping, order, nesting, what sits under what. No URL changes. | Yes, one commit | Minimal | ⚠️ Yes, with client sign-off |
| **T3 · Slugs & page set** | Renaming URLs, merging pages, deleting pages, adding pages. | **No** | **High** | ❌ Not without a redirect map |

**T3 is the dangerous one.** A renamed slug breaks every inbound link, every bookmark, every backlink someone built, and resets that URL's search history. It is recoverable only with 301 redirects, and only partially. The rule in `copy-plan.md` §10.1 stands: **no slug changes in the copy pass.** If a slug genuinely has to change, it goes through §5 of this document.

---

## 2. CURRENT STATE — TO BE COMPLETED IN PHASE 0

I could not fetch the staging site's sub-pages, so I have the page *list* (from homepage links) but not the actual menu labels, grouping, or order.

**Phase 0 addition** — the agent extends `docs/copy-inventory.md` with:

```
1. Locate the nav component(s) and the footer component(s).
   Report the file path and whether nav items are hardcoded or
   driven by a data file / content collection.

2. Emit the exact current structure:

   | Position | Label (verbatim FR) | Slug | Parent | Component | Line |

3. Flag:
   - any label that appears in both nav and footer with different wording
   - any page in src/pages/ that is NOT reachable from the nav (orphans)
   - any nav item pointing to a page that doesn't exist (dead links)
   - the mobile nav — is it the same component or a separate one?
   - whether the nav is one flat list or already has dropdowns

4. Do not edit. Inventory only.
```

Until that table exists, everything below is a target, not a diff.

---

## 3. THE DIAGNOSIS — WHY THE CURRENT NAV CAN'T BE NAMED WELL

The site is organised on **two axes at once**:

- a **topic** axis — `Portage salarial`, `Expertises`
- an **audience** axis — `Consultants`, `Entreprises`

Every page therefore fits in two places, which means no page has an obvious name, which means every naming discussion is unwinnable. This is the navigation version of the problem in `copy-plan.md` §1: it isn't a wording argument, it's an unresolved structural decision being re-litigated one label at a time.

**Pick one axis.** For this business the answer is audience-first, for three reasons:

1. There are exactly two audiences and they want completely different things. A consultant and a DSI share almost no page.
2. `Entreprises` sitting as a **top-level peer** of the portage section is itself the vision shift made visible. A visitor who sees only portage concludes "administrative intermediary" before reading a word (§2.1).
3. Audience-first survives growth. Topic-first accumulates a new top-level item every time a service is added.

### 3.1 The cannibalisation problem

`/portage-salarial` and `/consultants` serve **the same reader** and almost certainly overlap in content and in search intent. Two pages competing for `portage salarial` split their own authority and force the visitor to guess which one to click.

**Do not merge them** — `/portage-salarial` is very likely the strongest SEO asset on the site and merging would be a T3 change with real downside. Instead, differentiate them sharply, exactly as briefed in `copy-plan.md` §9.2 and §9.3:

- `/portage-salarial` = **the mechanism.** How it works legally and financially. Written for someone who does not yet know what portage is.
- `/consultants` = **the lived experience.** What your year looks like, month by month. Written for someone who has decided in principle.

Then nest both under one nav section so the visitor is never asked to choose between them.

---

## 4. PROPOSED TARGET NAVIGATION

Four top-level items, one primary CTA, one utility link. Nothing else.

```
┌─────────────────────────────────────────────────────────────┐
│  [logo]   Le portage salarial ▾   Entreprises ▾              │
│           Expertises ▾   Le groupe ▾                         │
│                          [Simuler mes revenus]  Espace client│
└─────────────────────────────────────────────────────────────┘
```

### Le portage salarial ▾ *(everything for the consultant)*

| Label | Slug | Note |
|---|---|---|
| Comment ça marche | `/portage-salarial` | unchanged slug |
| Votre quotidien de salarié porté | `/consultants` | unchanged slug |
| Frais et rémunération | `/tarifs` | unchanged slug |
| Simuler mes revenus | `/simulateur` | unchanged slug |
| Questions fréquentes | `/faq` | unchanged slug |

### Entreprises ▾

| Label | Slug |
|---|---|
| Faire appel à un consultant | `/entreprises` |
| Nos expertises | `/expertises` |
| Nous contacter | `/contact` |

*If this dropdown feels thin, it is because the entreprises side is genuinely under-built today. That is a content gap, not a nav problem — do not pad it.*

### Expertises ▾

| Label | Slug | Condition |
|---|---|---|
| Cybersécurité | `/expertises#cyber` | ⚠️ Q11 — omit entirely if not a live offer |
| Data & intelligence artificielle | `/expertises#data-ia` | |
| Cloud & DevOps | `/expertises#cloud-devops` | |
| Agilité & transformation | `/expertises#agilite` | |

> **Anchors, not new pages.** Four hub sections on one page is a T2 change. Four new pages is T3 and creates four thin pages that compete with each other. If the client later wants dedicated pages, that is a separate, budgeted phase with a redirect plan.

### Le groupe ▾

| Label | Slug | Condition |
|---|---|---|
| Qui sommes-nous | `/qui-sommes-nous` | |
| L'équipe | `/equipe` | |
| Nos agences | `/agences` | 🔴 blocked on Q2 |
| Engagements RSE | `/rse` | |
| Nous rejoindre | `/recrutement` | |

### Not in the main nav

`/parrainage` · `/blog` · `/livres-blancs` · `/rendez-vous` · `/mentions-legales` · `/confidentialite` → footer only.

`/rendez-vous` is reached from CTAs throughout the site, not from the menu. `/blog` and `/livres-blancs` go in the footer under **Ressources** until there is enough published to justify a menu slot.

### Primary CTA

**`Simuler mes revenus`** — one CTA, visually distinct, always visible including on mobile.

Not `Parler à un conseiller`. The simulator converts better because it gives before it asks, and it pre-qualifies: someone who runs it and comes back has already decided the numbers work. Keep `Parler à un conseiller` as a secondary CTA in page bodies, not in the nav.

---

## 5. LABEL NAMING RULES

Apply to nav, footer, breadcrumbs, and in-page CTAs alike.

| Rule | ✅ | ❌ |
|---|---|---|
| Say what the visitor gets, not what the company sells | `Frais et rémunération` | `Nos tarifs`, `Notre offre` |
| Two words where possible, three maximum | `Nos agences` | `Nos implantations régionales` |
| No internal vocabulary | `Votre quotidien de salarié porté` | `Parcours porté`, `Onboarding` |
| A label that could head any page is not a label | `Cybersécurité` | `Nos solutions`, `Nos services`, `Notre approche` |
| Verbs in CTAs, nouns in nav | CTA: `Simuler mes revenus` · nav: `Simulateur` | nav: `Découvrez nos solutions` |
| Same page, same label everywhere | — | `Tarifs` in nav, `Nos frais` in footer |
| No `Découvrir`, `En savoir plus`, `Cliquez ici` as a standalone link | `Voir les frais détaillés` | `En savoir plus` |

**Capitalisation:** French sentence case. `Le portage salarial`, not `Le Portage Salarial`. Accented capitals kept: `À propos`, `Équipe`.

---

## 6. WHAT SHIPS, AND WHEN

| Change | Tier | Ships in copy pass? | Gate |
|---|---|---|---|
| Rewriting nav and footer labels | T1 | ✅ Yes | §5 rules |
| Regrouping into the four dropdowns above | T2 | ⚠️ Yes, after client sign-off on §4 | One dedicated commit, no copy in it |
| Reordering top-level items | T2 | ⚠️ Same commit as above | — |
| Moving `/blog`, `/livres-blancs`, `/parrainage` to footer | T2 | ⚠️ Same commit | Verify no page links to them expecting a nav position |
| Adding `#anchor` targets on `/expertises` | T2 | ✅ Yes | Anchors only, no new routes |
| **Renaming any slug** | T3 | ❌ **No** | §7 |
| **Merging `/portage-salarial` + `/consultants`** | T3 | ❌ **No** | §3.1 — differentiate instead |
| **Creating four expertise pages** | T3 | ❌ **No** | Separate budgeted phase |
| **Deleting any page** | T3 | ❌ **No** | §7 |

**Commit discipline:** the nav change is **one commit, on its own**, containing no copy edits. If it breaks something, you revert one commit and lose nothing else. Never bundle a nav restructure into a page rewrite.

---

## 7. IF A SLUG MUST CHANGE — the redirect protocol

Only if the client insists and accepts the risk.

1. Record the old URL, the new URL, and the reason in a redirect table in this file.
2. Implement a **301 permanent** redirect, old → new. Cloudflare Pages supports a `_redirects` file; confirm the project's actual mechanism first.
3. Update every internal link pointing at the old slug — the agent greps for it, no exceptions.
4. Update the sitemap and the canonical tag.
5. Keep the redirect **permanently.** Not "for six months."
6. Expect a ranking dip for several weeks even when done correctly. Budget for it or don't do it.

Deleting a page is worse than renaming one. A deleted page with no redirect returns 404 to everyone who ever linked to it. If a page must go, redirect it to the closest surviving page — never to the homepage, which search engines treat as a soft 404.

---

## 8. AMENDMENT TO `copy-plan.md`

§10.1 and §10.5 currently forbid all navigation work. They are amended as follows:

> **§10.1 (amended)** — Slugs, URLs, internal link targets, canonicals and `hreflang` remain untouchable in the copy pass. **Nav labels and nav grouping are now in scope**, governed by `docs/nav-plan.md`, in a dedicated commit, after client sign-off on nav-plan §4.

> **§10.5 (amended)** — The agent still does not add pages, delete pages, or redesign. It may reorganise the existing nav into the structure defined in nav-plan §4, and add in-page anchors. Anything beyond that goes in `docs/copy-questions.md`.

**Execution order:** the nav commit slots in **after Phase 2** (`/` rewritten) and **before Phase 3**. Rewriting the homepage first tells you whether the positioning holds; restructuring the nav before that is committing to an architecture you haven't tested.

---

## 9. OPEN QUESTIONS

| # | Question | Blocks | Recommendation |
|---|---|---|---|
| **N1** | Audience-first nav (§4) validated? | Everything here | Yes — it is the structural expression of the positioning |
| **N2** | Does `/portage-salarial` outrank `/consultants` in Search Console? | §3.1 | Check before touching either. The stronger page keeps the primary keyword |
| **N3** | Four expertise **anchors** or four **pages**? | `/expertises` | Anchors now. Pages later, if traffic justifies them |
| **N4** | Cybersecurity in the nav at all? | Expertises dropdown | Depends on Q11. If it is not a live offer, it does not appear in the menu |
| **N5** | Is `Espace client` used enough to keep in the header? | Header | Check analytics. If usage is low, footer |
| **N6** | Is the mobile nav a separate component? | All T2 work | Phase 0 answers this. If separate, every change is doubled |
