---
description: Identify and prioritize technical debt in the simulation codebase
agent: software-architecture-director
---

# /tech-debt — Technical Debt Assessment

Invoke **software-architecture-director** with **qa-lead**.

## Assessment Areas

### Code Health
- Run static analysis: ruff, mypy type checking
- Identify modules with coverage below threshold
- Flag any hardcoded parameters (should be in config)
- Identify duplicated physics code across modules

### Architecture Health
- Interface violations: modules bypassing defined interfaces
- Tight coupling: modules that directly access other modules' internals
- Missing abstractions: code that should be behind an interface but isn't

### Documentation Debt
- Undocumented public functions/classes
- Out-of-date docstrings (function signature changed but docs didn't)
- Missing model assumption documentation

### Validation Debt
- Models listed as NOT VALIDATED or PARTIAL
- Unit tests that don't cover edge cases

## Output
Technical debt register in `production/tech-debt.md` with Priority (High/Medium/Low), Effort estimate, and owning agent.

## Relationship to /simplicity-debt
This command is the broad, infrequent sweep — architecture, coverage,
documentation, validation status. `/simplicity-debt` is narrower and
faster: it only harvests self-reported `# metalsim:` shortcut markers left
by agents following the Simplicity-First Rule in `AGENTS.md`. Run
`/simplicity-debt` at the end of every sprint; run this command at heavier
checkpoints (e.g., before `/release-checklist`). If `/simplicity-debt` has
flagged items as "Blocking," fold those into this register's priority list
rather than tracking them in two places.
