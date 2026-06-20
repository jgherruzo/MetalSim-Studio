---
description: Onboard a new developer to the actual project this team has built
agent: validation-director
---

# /onboard — Developer Onboarding

Invoke **qa-lead** → **documentation-specialist**.

## Before This Command Is Useful
This command onboards someone to **your actual project** once it exists —
a chosen tech stack, real code, a real test suite. If no project has been
started yet (no ADRs in `design/architecture/`, no PSRD in `design/srd/`),
tell the user to run `/start` first; there's nothing to onboard into yet.

## Onboarding Checklist

### Environment Setup
1. Clone the repo
2. Set up the environment per whatever the project's actual tech stack
   requires — check `design/architecture/` for the ADR that documents the
   chosen language, package manager, and dependency setup
3. Run the project's test suite (command depends on the chosen stack —
   check the ADR or ask `software-architecture-director`) — must all pass
4. Run a demo/reference simulation if one exists in the project, to confirm
   the environment works end-to-end

### Architecture Overview
- Walk through `design/architecture/` — read all ADRs in order; this is
  the actual source of truth for what's been decided and why
- Study whatever the project's core interfaces/contracts are (the ADRs
  should point to where these live in the real codebase)
- Read `design/srd/process-science-requirements.md` for domain context —
  this explains the metallurgical process being simulated, independent of
  any code

### Contributing Guide
- Branching: feature branches, PRs required
- Commit format: `[module] short description` (e.g., `[kinetics] add grain model`)
- All physics code requires tests before PR approval
- Run `/code-review` before submitting a PR

### Domain Knowledge Resources
- `design/process-models/` — all governing equations with references
- `docs/knowledge-base/` (check `INDEX.md` first) — process specs, plant
  data, and other reference material the team has accumulated
- `docs/user-manual/` — process descriptions for non-specialists, once
  written
