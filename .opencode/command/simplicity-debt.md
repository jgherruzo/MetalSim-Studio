---
description: Harvest all "metalsim:" shortcut markers from the codebase into a reviewable ledger
agent: software-architecture-director
---

# /simplicity-debt — Simplicity Shortcut Ledger

Invoke **software-architecture-director**.

## Purpose
Every agent in this project follows the Simplicity-First Rule (see
`AGENTS.md`): prefer the smallest correct implementation, and when a
deliberate shortcut is taken with a known more-general upgrade path, mark it
inline with a `# metalsim:` comment. This command harvests every one of
those markers across the codebase into a single reviewable list, so
"generalize this later" doesn't quietly become "never."

This is the scientific-computing analog of a generic tech-debt scan — but
narrower and more useful, because it only surfaces *intentionally deferred*
simplifications that the agent who wrote them already flagged, not every
possible code smell.

## Workflow

### 1. Scan
Search the project's actual source tree for the marker pattern (adjust the
path and file extension to whatever the project's chosen language/layout
actually is — check `design/architecture/` if unsure):
```bash
grep -rn "# metalsim:" <project-source-root>
```

### 2. Categorize Each Finding
For each match, classify by what's being deferred:
- **Scope narrowing** — works for a specific case (binary system, single
  reaction, isothermal) but not the general case
- **Performance shortcut** — correct but not optimized (e.g., dense matrix
  where sparse would scale better)
- **Missing feature** — a parameter or mode that isn't wired up yet
- **Validation gap** — implemented but not yet checked against reference
  data (this category should also already appear in `process-validation-lead`'s
  tracking — cross-reference, don't duplicate)

### 3. Assess Urgency
For each item, a quick judgment:
- **Blocking** — the current project scope already needs the general case;
  this should move to the active sprint, not stay deferred
- **Reasonable** — the narrow case covers everything the project currently
  needs; fine to leave deferred
- **Stale** — the comment no longer makes sense given how the code evolved;
  flag for removal or rewrite

### 4. Produce the Ledger
Write to `production/simplicity-debt.md`:
```markdown
# Simplicity Debt Ledger — [date]

| File:Line | Category | Description | Urgency | Owner |
|-----------|----------|--------------|---------|-------|
| [thermodynamics module]:42 | Scope narrowing | Binary Fe-O only, no ternary | Reasonable | thermodynamics-lead |
| [kinetics module]:88 | Missing feature | Particle size distribution not yet supported, single d80 assumed | Blocking | topochemical-model-specialist |
```

### 5. Report and Recommend
Summarize: "Found N deferred shortcuts. M are Blocking and should be added
to the next sprint. K are Stale and should be cleaned up." Present this
before the user decides what to act on — this command surfaces the debt, it
doesn't resolve it unilaterally.

## Relationship to /tech-debt
`/tech-debt` covers architecture, coverage, and documentation debt broadly.
`/simplicity-debt` is narrower and faster — it only surfaces shortcuts that
were *self-reported* at the moment they were taken. Run this one more
often (e.g., end of every sprint); run `/tech-debt` at less frequent,
heavier checkpoints (e.g., before `/release-checklist`).
