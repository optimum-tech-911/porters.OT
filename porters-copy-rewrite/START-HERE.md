# START HERE

Everything needed to run the copy and navigation rewrite of The Porters site.

---

## 1 · What's in this package

```
CLAUDE.md                       → repo root. Claude Code loads it every session.
AGENTS.md                       → repo root. Same rules, for Codex / other agents.
.claude/skills/page/SKILL.md    → gives you the /page command.
docs/copy-plan.md               → strategy, page briefs, guardrails, protocol.
docs/fact-base.md               → every fact, with source and publication status.
docs/copy-bank.md               → approved French copy blocks.
docs/nav-plan.md                → navigation, labels, information architecture.
```

**Read order for you:** `copy-plan.md` §1–§2 (the diagnosis and the positioning shift), then `copy-plan.md` §13 (the seventeen open questions). That's about fifteen minutes and it's the whole project.

**Read order for the client:** `copy-plan.md` §2 and §13 only. Nothing else. Their job is to answer questions, not to review a method document.

---

## 2 · Install — five minutes

Copy the contents of this package into your repo root, preserving the structure:

```bash
cp -r docs .claude CLAUDE.md AGENTS.md /path/to/your/repo/
```

If your repo already has a `CLAUDE.md`, **append** the rules section rather than overwriting it.

Delete whichever of `CLAUDE.md` / `AGENTS.md` you don't need — keep both only if you're running two agents (see §5).

Then:

```bash
cd /path/to/your/repo
git checkout -b copy-rewrite
git add docs .claude CLAUDE.md AGENTS.md
git commit -m "docs: add copy and navigation rewrite plan"
```

Working on a branch means a bad phase is one `git reset` away instead of a manual cleanup.

---

## 3 · Keep the source documents OUT of the repo

This is the most important setup decision in the whole project.

The four client documents — the Mémoire Technique especially — contain revenue figures, personal mobile numbers, named clients under no publication agreement, and a document belonging to a different group brand. **If the agent can read them directly, it will use them.**

`docs/fact-base.md` exists precisely to be the filter between those documents and the website. Do not defeat it.

Keep the sources outside the repo entirely, or:

```bash
echo "sources/" >> .gitignore
```

---

## 4 · Before you run anything: answer three questions

From `copy-plan.md` §13. All three block pages, and an agent that hits a blocker either stalls or invents.

| # | Question | Blocks |
|---|---|---|
| **Q2** | How many agencies, and which? Four sources give four different answers. | `/agences` + 4 city pages + legal mentions |
| **Q3** | Are the homepage logos actual clients, with written authorisation? | The homepage |
| **Q11** | Is cybersecurity a live commercial offer, or an inherited capability? | The whole expertise hub |

Twenty minutes with your client on those three saves a day of rework.

Record every answer in the resolution log at the bottom of `fact-base.md`. That table is the project's state — if it's current, anyone can pick the work up cold.

---

## 5 · Running it

### Phase 0 — audit, in plan mode

```
/plan
```

Then:

```
Read docs/copy-plan.md, docs/fact-base.md, docs/copy-bank.md and
docs/nav-plan.md in full.

Execute Phase 0 (copy-plan §8) plus the nav inventory (nav-plan §2).
Produce docs/copy-inventory.md. Do not edit any site copy.

When done, stop and show me the inventory plus the list of unresolved
facts you hit.
```

Plan mode keeps it read-only, which is exactly right for an audit. Review `copy-inventory.md` yourself before approving anything.

### Then, one page at a time

```
/page /tarifs
```

`/tarifs` is first on purpose. It's small, self-contained, and it's where the positioning is either real or it isn't. If your client can't approve a transparent fees page, the whole direction needs revisiting — better to find that out on the smallest page than on page fifteen.

Order is in `copy-plan.md` §11.1. The nav restructure is Phase 2b — after the homepage, before everything else, in its own commit with no copy in it.

### Session hygiene

`/clear` between phases. Long sessions drift: by page eight the agent is pattern-matching on its own earlier output instead of the plan. Clearing forces it back to `CLAUDE.md` and the four documents.

### Two agents, if you have them

The failure mode here isn't a bug — it's a hallucinated fact that reads perfectly. An invented management fee. A stale CPAM parameter presented as current. Copy review won't catch it, because it reads beautifully.

So use a second model as auditor:

```
Read docs/fact-base.md. Review this diff.
Every factual claim in it must map to a PUBLISHABLE fact ID.
List any that don't.
```

Different training, different blind spots. Costs one prompt per page and it's the single strongest check available.

---

## 6 · The client review loop

Hold this rule (`copy-plan.md` §11.5). It's the mechanism that ends the meeting cycle:

1. Client rejects a block, giving **one sentence** of reason.
2. Agent returns **two** options.
3. Client **picks one**.

Three rounds maximum per block. After three, it escalates as a positioning question — because at that point that's what it is.

Reviews happen **by block ID**, never "the page in general." `HOME-H1`, not "you know, the big sentence at the top." That single discipline takes a review from forty minutes to five.

---

## 7 · If something goes wrong

| Symptom | Cause | Fix |
|---|---|---|
| Agent invented a number | It read a source document, or ignored the fact base | Check §3. Re-run with the fact IDs named explicitly in the prompt |
| Agent touched components or config | Scope drift over a long session | `git checkout` the file, `/clear`, restart the phase |
| Copy reads like a translation | Register not set | Pick Sobre or Affirmé in `copy-bank.md` and state it in the prompt |
| Client keeps reopening the same block | It's not a wording problem | Escalate to §13. Almost always Q1 or Q17 |
| "KwickStart" appears anywhere | A source doc leaked in | Stop. Fix §3 before continuing |

---

## 8 · Done means

- [ ] All seventeen questions in `copy-plan.md` §13 answered and logged in `fact-base.md`
- [ ] No `VERIFY_BEFORE_USE` fact published anywhere
- [ ] No `TODO-CLIENT` markers left in shipped pages
- [ ] Nav matches `nav-plan.md` §4, with no slug changed
- [ ] `grep -ri kwickstart .` returns nothing
- [ ] Every page passes the §12 client checklist
- [ ] `npm run build` passes
