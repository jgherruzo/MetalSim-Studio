# Knowledge Base Index

This is the **manifest** for `docs/knowledge-base/` — a living folder of
reference documentation (process specs, plant data summaries, vendor
datasheets, standards, literature notes, anything the team needs to consult
during requirements gathering or implementation).

**Agents: read this index first. Do not read the full content of every file
in this folder — only open the specific document(s) relevant to your current
task, using the path listed below.**

---

## How This Works

1. Anyone (you or an agent) drops a new reference document into
   `docs/knowledge-base/`.
2. Whoever adds it appends one row to the table below — filename, one-line
   topic summary, and which agents/domains it's relevant to.
3. Going forward, any agent that needs background on that topic checks this
   table, finds the matching row, and reads *only that file* — not the whole
   folder.
4. If a document doesn't fit any existing topic tag, add a new tag rather
   than leaving it untagged. An untagged document is invisible in practice —
   agents won't know to look for it.

This keeps the knowledge base scalable: it can grow to hundreds of documents
without ever bloating any single agent's context, because nothing gets
loaded unless this index says it's relevant to the task at hand.

---

## Document Registry

| File | Topic | Relevant To | Added |
|------|-------|-------------|-------|
| _(none yet — add your first document below)_ | | | |

<!--
Row template — copy this when adding a document:

| `filename.md` | One-sentence description of what's in it | thermodynamics-lead, process-domain-director | 2026-06-19 |

"Relevant To" should list agent names (leads or specialists) or domain tags
(thermodynamics, kinetics, transport, validation, ui) — whatever makes it
easy for an agent to recognize "this is for me."
-->

---

## Topic Tags in Use

_(Keep this list in sync with the registry above — add a tag here the first
time you use it in a row.)_

- `process-spec` — industrial process descriptions, plant flowsheets
- `plant-data` — historian exports, mass balance tables, lab assay sheets
- `thermo-reference` — thermodynamic data sources, activity model parameters
- `kinetics-reference` — published rate laws, activation energies
- `standards` — industry standards, safety codes, regulatory references
- `vendor-docs` — equipment datasheets, instrumentation specs

---

## For Agents: Required Workflow

When a task might benefit from project-specific reference material that
isn't already in your prompt or in `design/`:

1. **Read this index file** (`docs/knowledge-base/INDEX.md`) — it's small,
   read it in full.
2. **Scan the Document Registry table** for a row matching your task's topic
   or your own agent name in the "Relevant To" column.
3. **Read only the matching file(s)**, not the entire folder.
4. If nothing in the index matches but you suspect relevant material might
   exist untagged, tell the user — don't silently skip it, and don't read
   every file in the folder to check.
5. If you create or are given a new reference document during your work,
   **add a row to the registry** before finishing your task, so the next
   agent (or session) can find it.

This applies especially during `/requirements-gather` and `/model-design` —
both commands should check this index as a standard step.
