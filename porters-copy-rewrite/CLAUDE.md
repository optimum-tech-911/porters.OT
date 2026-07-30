# Project memory — The Porters site

Claude Code loads this file automatically at the start of every session.
If this repo already has a CLAUDE.md, append the section below to it
instead of replacing the file.

---

## Copy & navigation rewrite — binding rules

Before any copy or navigation work, read all four:

    docs/copy-plan.md    strategy, page briefs, guardrails, protocol
    docs/fact-base.md    every fact, with source and publication status
    docs/copy-bank.md    approved French copy blocks
    docs/nav-plan.md     navigation, labels, information architecture

### Language
- Instructions are English. Every word published on the site is French.
- Never translate a French copy block. It is final text, not source material.
- French typography is mandatory: « » guillemets, non-breaking space before
  : ; ! ? and before », typographic apostrophe ’, decimal comma (41,53 €),
  € after the number, thin space in thousands (10 000).

### Facts
- Only PUBLISHABLE facts from docs/fact-base.md may appear on the site.
- Anything else → leave <!-- TODO-CLIENT: F-XXX --> and continue.
- Never invent a number, a client name, a sector, or a certification.
- Any figure that carries a year must display that year, or not appear.
- Never publish a personal name in a mission or project context.

### Copy
- Copy comes from docs/copy-bank.md. If a needed block does not exist,
  propose exactly two options and stop. Never write a third.
- Banned vocabulary is in copy-plan §5.2 and §10.7.
  "accompagnement" is allowed once per page, maximum.

### Scope
- Text and nav labels only.
- No slugs, no URLs, no internal link targets, no canonicals.
- No components, no config, no styling, no images.
- No new pages, no deleted pages, no legal pages.
- Navigation: labels and grouping are in scope (nav-plan §8). Slugs are not.
- Out-of-scope ideas go in docs/copy-questions.md, never into a commit.

### Discipline
- One page per commit. Never batch.
- Run the copy-plan §11.4 pre-commit checklist and paste the result.
- The nav restructure is its own commit, containing no copy edits.
- When you need a fact you do not have: stop and ask. Do not fill the gap.

### Hard blocks
- The string "KwickStart" must not exist in this repository.
- No "X projets" / "Plus de X" or any unfilled placeholder.
- HOME-LOGOS is frozen until Q3 is answered.
- /agences and the four city pages are blocked until Q2 is answered.
- The cybersecurity hub is blocked until Q11 is answered.
