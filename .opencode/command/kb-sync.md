---
description: Scan docs/knowledge-base/ for untracked documents and update the index
agent: chief-simulation-director
---

# /kb-sync — Knowledge Base Sync

Invoke **chief-simulation-director**.

## Purpose
Run this any time you've dropped one or more new documents into
`docs/knowledge-base/` and want them properly indexed before the team relies
on them — for example, after a bulk upload of plant data exports or a batch
of literature PDFs converted to markdown.

## Workflow

### 1. List Folder Contents
List every file in `docs/knowledge-base/` (excluding `INDEX.md` itself).

### 2. Diff Against the Index
Read `docs/knowledge-base/INDEX.md` and compare its Document Registry table
against the folder listing. Identify:
- **Untracked files** — present in the folder but missing from the table
- **Stale rows** — present in the table but the file no longer exists
  (flag these for the user to confirm deletion, don't remove silently)

### 3. Summarize Each Untracked Document
For each untracked file, read enough of it to determine:
- A one-sentence topic summary
- Which existing topic tag(s) it fits (`process-spec`, `plant-data`,
  `thermo-reference`, `kinetics-reference`, `standards`, `vendor-docs`) — or
  propose a new tag if none fit
- Which agents/leads would plausibly need it (based on content, not
  filename)

### 4. Present Proposed Rows
Show the user the proposed new registry rows before writing them — this is
a judgment call (what's "relevant to" isn't always obvious from content
alone) and the user may know better than a content scan would.

### 5. Update the Index
Once approved, append the new rows to the Document Registry table in
`docs/knowledge-base/INDEX.md`, and add any new topic tags to the Topic Tags
section. Flag any stale rows for the user's explicit decision rather than
removing them.

### 6. Report
Summarize what was added: "Indexed N new documents under M topic tags.
Flagged K stale entries for your review." List anything that didn't fit a
clear category so the user can decide manually.
