---
description: Update opencode.jsonc's edit/bash permissions to match the real project structure once an architecture ADR exists
agent: software-architecture-director
---

# /apply-permissions — Apply Real Permissions from an Approved Architecture

Invoke **software-architecture-director**.

## Why This Command Exists
This project ships with no predefined source tree, so every agent's `edit`
permission in `opencode.jsonc` starts as just `{"*": "ask"}` (plus a few
real studio paths like `docs/knowledge-base/**`). That's deliberate — see
`README.md`'s "Why There's No Predefined Simulator Code" section.

But the user's original preference for implementation agents (engine,
numerics, I/O, UI, testing leads/specialists) was **broad edit access
within their own domain folder, with bash fully allowed** — a reasonable
choice once there's an actual folder to scope to. This command is what
delivers on that preference, the moment there's a real architecture to
scope it against.

## Preconditions
Do not run the substantive part of this command until:
1. At least one architecture ADR exists in `design/architecture/` defining
   a real project layout (source folders, test folders, tooling folders)
2. The ADR specifies which language/stack was chosen, since that
   determines whether stack-specific bash commands (e.g., `pytest*` for
   Python, `go test*` for Go) make sense to allow

If neither precondition is met, tell the user there's nothing to apply yet
and point them to `/model-design` or a direct architecture conversation
with `software-architecture-director` first.

## Workflow

### 1. Read the Approved Architecture
Read every ADR in `design/architecture/` to extract:
- The real source-tree layout (what folder holds thermodynamics code, what
  folder holds the core engine, etc.)
- The chosen language and its standard test/lint/typecheck commands
- Any folders that map cleanly to existing department ownership (ones
  already defined by the agent roster: thermodynamics, kinetics,
  transport, core engine, numerical methods, data I/O, UI, process
  control, validation, verification, QA)

### 2. Propose the Permission Mapping
Before editing `opencode.jsonc`, present a table mapping each
lead/specialist to the real folder(s) they should get `edit: allow` on,
and which stack-specific bash commands (if any) should move from `ask` to
`allow`. Example:

```
Agent                    | Edit allow path(s)         | Bash allow additions
-------------------------|-----------------------------|----------------------
thermodynamics-lead      | packages/thermo/**          | pytest* (if Python)
core-engine-lead         | packages/engine/**          | (already broad)
phase-equilibria-specialist | packages/thermo/equilibria/** | —
```

Get explicit user approval on this table before writing anything — this is
still a real architectural commitment, even though it's "just permissions."

### 3. Update opencode.jsonc
Once approved, edit each agent's `permission.edit` block to add the
approved real path(s) with `"allow"`, keeping the existing `"*": "ask"`
fallback and any already-present real studio paths
(`docs/knowledge-base/**`, etc.) untouched. Add any approved stack-specific
bash commands to `permission.bash` the same way.

### 4. Validate
After editing, confirm `opencode.jsonc` is still valid JSON (strip the
leading `//` comment header before parsing) and that every agent referenced
in the mapping table actually exists in the file. Report back the full
diff of what changed.

### 5. Record It
Note in the relevant ADR (or as a follow-up note in
`design/architecture/`) that permissions were synced to that ADR's
decisions, with the date — so a future architecture change has a clear
trigger to re-run this command.

## Re-running After Architecture Changes
If a later ADR changes or supersedes the project layout (e.g., a folder
gets renamed, a new department's code gets a new home), re-run this
command — it should propose updates, not just additions, and should flag
any `opencode.jsonc` permission path that no longer matches any current
ADR as a candidate for removal.
