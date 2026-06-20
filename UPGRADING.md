# Upgrading MetalSim Studios (OpenCode Edition)

This file tracks breaking changes between versions of the **agent team
template itself** and provides migration instructions. It has nothing to
do with whatever simulator you build using this team — that code lives in
your own project history, not in this template.

---

## Migrating to v0.2.x from v0.1.x

*(Not yet released — this section will be populated at v0.2.0)*

---

## How to Update the Template

If you started a project on an older version of this template and want to
incorporate new/changed agents, commands, or rules:

### 1. Check What Changed
Compare your `.opencode/agent/`, `.opencode/command/`, `opencode.jsonc`, and
`AGENTS.md` against the new template version.

### Safe to Overwrite
- Any new agent prompt files (if you haven't customized them yourself)
- Any new command files
- `docs/templates/*` (unless you've customized a template)

### Needs Manual Merge
- `opencode.jsonc` — likely contains your provider/model choices and any
  permission tweaks you've made
- `AGENTS.md` — may contain project-specific context you've added over time
- `docs/knowledge-base/INDEX.md` — this is **your** living document, never
  overwrite it; only add new entries
- `production/sprint-current.md` and `production/session-state/` — your
  actual project history, never touched by a template update

### 2. Run After Updating
```bash
opencode
```
Then sanity-check that your agents and commands still load as expected —
`Tab` through the 4 directors, try a command you use often.

---

## Reporting Issues

If an agent gives bad guidance, a command workflow is broken, or a
permission rule blocks something it shouldn't, note:
1. The agent or command name
2. What you asked it to do
3. What it did
4. What you expected

This helps improve the template — it's about the team's behavior, not
about any specific simulator you've built with it.
