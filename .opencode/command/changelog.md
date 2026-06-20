---
description: Generate or update the CHANGELOG for the current release
agent: validation-director
---

# /changelog — Changelog Generation

Invoke **qa-lead** → **documentation-specialist**.

## Workflow

1. Determine version range: from last tag to HEAD (`git log v0.x.y..HEAD --oneline`)
2. Group commits by type:
   - **New Process Models** — new metallurgical processes or stages added
   - **Model Improvements** — changes to thermodynamic, kinetic, transport models
   - **Engine Changes** — core batch engine, solver, state management
   - **New Skills / Workflows** — new slash commands
   - **Validation** — new validation campaigns, updated results
   - **Bug Fixes** — corrected behavior
   - **Performance** — speed or memory improvements
   - **Breaking Changes** — schema changes, API changes requiring user action
   - **Documentation** — user manual, API docs

3. Draft CHANGELOG entry following Keep a Changelog format:

```markdown
## [X.Y.Z] — YYYY-MM-DD

### New Process Models
- Added flash smelting stage type (copper/nickel concentrates)

### Model Improvements
- Improved MQM activity model convergence for Fe-O-S system

### Breaking Changes
- BatchRecipe schema v2: `duration` field renamed to `duration_s` (run migration script)

### Bug Fixes
- Fixed mass balance error in gas phase when CO2 fraction exceeded 0.8 mol/mol
```

4. Present draft to user for review before writing to CHANGELOG.md
5. Never auto-write CHANGELOG without user approval
