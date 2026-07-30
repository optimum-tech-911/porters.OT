# PROMPTS — ready to paste

For the layout where `porters-copy-rewrite/` sits inside the Porters repo root.

```
<repo-root>/
├── CLAUDE.md                  ← moved out (see §0)
├── .claude/skills/page/       ← copied out (see §0)
├── porters-copy-rewrite/
│   └── docs/
│       ├── copy-plan.md
│       ├── fact-base.md
│       ├── copy-bank.md
│       └── nav-plan.md
├── src/
└── ...
```

---

## 0 · One-time setup

`CLAUDE.md` is only auto-loaded from the repo root. `.claude/skills/` only registers from the repo root. Nested, neither works.

```bash
cd /path/to/porters-repo
mv porters-copy-rewrite/CLAUDE.md .
cp -r porters-copy-rewrite/.claude .
git checkout -b copy-rewrite
```

If a `CLAUDE.md` already exists at root, append the rules section to it instead of moving.

Then edit the four path references inside `CLAUDE.md` — change `docs/` to `porters-copy-rewrite/docs/`. Or paste this into the agent and let it do it:

```
In CLAUDE.md at the repo root, update the four document paths to point to
porters-copy-rewrite/docs/ instead of docs/. Change nothing else in the file.
```

---

## 1 · Session opener — paste at the start of every new session

Short, because `CLAUDE.md` already carries the rules. This just orients.

```
Project context: docs are in porters-copy-rewrite/docs/ —
copy-plan.md, fact-base.md, copy-bank.md, nav-plan.md.

Read all four before doing anything. Confirm in one line that you've read
them and tell me which phase we're on according to copy-plan §11.1.
Then wait.
```

If it summarises the plan back at you instead of waiting, it hasn't read them — say so and make it re-read.

---

## 2 · Phase 0 — the audit

Run this in plan mode (`/plan`) so it stays read-only.

```
Execute Phase 0.

Scope:
- copy-plan §8 (the repo copy audit)
- nav-plan §2 (the navigation inventory)

Produce porters-copy-rewrite/docs/copy-inventory.md containing:
1. Which pattern this project uses for user-visible French text —
   hardcoded in .astro, content collections, or a data layer. Say which,
   with file paths.
2. One row per text block: | Block ID | File | Line | Type | Current FR text
   (verbatim) | Chars |  — using the block ID convention in copy-plan
   Appendix A.
3. The current nav structure: | Position | Label | Slug | Parent |
   Component | Line |
4. Flags: shared components whose text is reused across pages, orphan
   pages not in the nav, dead nav links, whether mobile nav is a separate
   component, any i18n setup, all meta-title / meta-description values.
5. Every occurrence of: "KwickStart", "LAYA", "inPORTERS", and any figure
   matching a percentage, €, K€, M€ or Mds — cross-checked against
   fact-base.md, flagging any that has no matching fact ID.

Edit nothing. Inventory only.

When done: stop, show me the inventory, and give me a separate list of
every fact the site currently publishes that is NOT PUBLISHABLE in
fact-base.md.
```

That last list is the one to read first. It tells you what's already live and shouldn't be.

---

## 3 · Per page

With the skill installed:

```
/page /tarifs
```

Without it, or if you want it explicit:

```
Rewrite /tarifs. One page only.

1. Read its brief in porters-copy-rewrite/docs/copy-plan.md §9.4.
2. Before editing, list: the block IDs you'll touch, the fact IDs from
   fact-base.md you'll rely on, and the copy-bank blocks you'll place.
   If any fact you need is not PUBLISHABLE, stop and tell me which one
   and what it blocks. Do not substitute a plausible value.
3. Apply the changes. Text only. Nothing in copy-plan §10.1.
4. Run the copy-plan §11.4 checklist and paste it back line by line,
   pass or fail against each item.
5. Show me the diff. Do not commit until I approve.

If the brief and the existing page structure conflict, stop and describe
the conflict. Do not resolve it yourself.
```

**Order:** `/tarifs` → `/` → nav (§4 below) → `/portage-salarial` → `/consultants` → `/expertises` → `/entreprises` → `/qui-sommes-nous` → `/rse` → `/faq` → the rest. Full order in copy-plan §11.1.

`/clear` between phases.

---

## 4 · Phase 2b — the navigation

Only after `/` is rewritten and approved. Its own commit, no copy in it.

```
Phase 2b: navigation restructure.

Read porters-copy-rewrite/docs/nav-plan.md in full, then:

1. Show me a diff table: current nav (from copy-inventory.md) vs the
   target in nav-plan §4. One row per item, marking each as
   RELABEL / REGROUP / MOVE-TO-FOOTER / UNCHANGED.
2. Confirm explicitly that no slug changes. If the target structure
   appears to require one, stop and tell me which — do not do it.
3. Apply labels and grouping only. Add the #anchor targets on /expertises.
4. Check both desktop and mobile nav components.
5. Verify every label follows nav-plan §5, and that nav and footer use
   identical wording for the same page.

This commit contains no page copy. Show me the diff before committing.
```

---

## 5 · Fact audit — run on every diff

Best in a second session, or a second model. Different blind spots catch different inventions.

```
Read porters-copy-rewrite/docs/fact-base.md.

Review this diff. For every factual claim in it — numbers, dates, client
names, sectors, certifications, tool names, volumes, process descriptions —
state the fact ID that authorises it.

List separately anything that has no matching PUBLISHABLE fact ID.
Do not fix anything. Report only.
```

This is the highest-value prompt in the file. The failure mode of this project isn't a bug, it's an invented fact that reads perfectly — a plausible management fee, a stale CPAM parameter presented as current. Copy review won't catch those. This will.

---

## 6 · After `/clear`

```
Re-read porters-copy-rewrite/docs/copy-plan.md, fact-base.md, copy-bank.md
and nav-plan.md.

We've completed: [list pages]. Next is [page].
Confirm you've re-read the four documents, then wait.
```

---

## 7 · When it goes off the rails

**It invented a number:**
```
Stop. [number] is not in fact-base.md as PUBLISHABLE.
Revert that change, replace it with <!-- TODO-CLIENT: F-XXX --> and tell
me which fact ID it should have been.
```

**It touched something out of scope:**
```
You modified [file], which copy-plan §10.1 puts out of scope.
Revert it. Text only.
```

**Its French reads translated:**
```
Re-read copy-plan §5. Rewrite [block] in native French B2B register.
Give me two options, Sobre and Affirmé. Don't pick for me.
```

**It's rewriting the same block for the third time:**
```
Stop. copy-plan §11.5: three rounds maximum, then this escalates as a
positioning question. Add it to porters-copy-rewrite/docs/copy-questions.md
with what the disagreement actually is, and move on.
```

---

## 8 · Closing out

```
Final verification pass. Do not edit anything.

1. grep the repo for "KwickStart", "X projets", "Plus de X" — report hits.
2. List every remaining TODO-CLIENT marker with its file and fact ID.
3. List every published figure and its fact ID. Flag any that is
   VERIFY_BEFORE_USE or has no ID.
4. Confirm no slug, URL or internal link changed across the whole branch.
5. Run npm run build and report.

Report only. Fix nothing.
```
