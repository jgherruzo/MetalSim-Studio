# MetalSim Studios — OpenCode Edition
### Dynamic Batch Simulation for Metallurgical Processes

This is the **OpenCode adaptation** of MetalSim Studios — a 46-agent team for
designing, developing, and validating batch-specific dynamic simulation
software for metallurgical processes, running on
[OpenCode](https://opencode.ai) instead of Claude Code.

**46 agents (4 directors + 11 leads + 31 specialists). 34 custom commands.**

---

## What Changed From the Claude Code Version

| Claude Code concept | OpenCode equivalent | Where it lives here |
|---|---|---|
| `CLAUDE.md` | `AGENTS.md` | Project root — loaded automatically |
| `.claude/agents/*.md` (YAML frontmatter + body) | `opencode.jsonc` (`agent.*` config) + `.opencode/agent/*.md` (body only) | Config in `opencode.jsonc`, prompts in `.opencode/agent/` |
| Subagent hierarchy via delegation prose | `mode: primary` / `mode: subagent` + `permission.task` allow-lists | Enforced structurally, not just by convention |
| `.claude/skills/*/skill.md` | `.opencode/command/*.md` | One flat file per command, same `/name` syntax |
| `.claude/hooks/*.sh` | Not ported — OpenCode hooks work differently (plugin-based) | See "Hooks" section below |
| `.claude/rules/*.md` | Folded into `AGENTS.md` + per-agent `permission.edit` path scoping | Same intent, enforced via permissions instead of prose |

The **agent roles, domain knowledge, and standards are unchanged** from the
Claude Code version — only the *plumbing* (how agents are invoked, how
permissions are scoped, how commands are triggered) is adapted to
OpenCode's model. One additional correction versus an earlier draft of this
port: this edition also removes all sample simulator code and project
scaffolding that had crept into the original template — see "Why There's
No Predefined Simulator Code" below for why that matters.

---

## Agent Hierarchy in OpenCode Terms

### Primary Agents (4) — switch with **Tab**
```
chief-simulation-director         Global coordination, sprint planning, phase gates
process-domain-director           Process science: thermo, kinetics, transport
software-architecture-director    Engine, solvers, I/O, UI architecture
validation-director               V&V strategy, acceptance criteria, releases
```

### Subagents (42) — invoked by directors or `@mention`
11 leads + 31 specialists, all `mode: subagent`. Each director's
`permission.task` config restricts which subagents it can delegate to,
mirroring the original vertical-delegation rule. You can always reach any
subagent directly:
```
@thermodynamics-lead implement the MQM activity model for FeO-SiO2-CaO
@heat-transfer-specialist add radiation losses for the EAF roof
```
Most Tier-3 specialists are `hidden: true` to keep the `@` autocomplete menu
manageable — they're still callable by name and still invoked automatically
by their lead when relevant.

---

## Model / Provider Setup — OpenCode Go

All 46 agents run on a single subscription: **OpenCode Go**
(https://opencode.ai/docs/go/) — $5 for the first month, then $10/month.
It covers every model this team uses, so there's no juggling multiple
provider accounts or API keys.

| Tier | Models used | Provider |
|------|------------|----------|
| Directors | DeepSeek V4 Pro / V4 Flash | `opencode-go` |
| Science leads | Qwen3.7 Max / Plus, Qwen3.6 Plus | `opencode-go` |
| Engineering leads | Kimi K2.7 Code / K2.6 | `opencode-go` |
| Specialists | GLM-5.2 / GLM-5.1 | `opencode-go` |
| Specialists | MiMo-V2.5-Pro | `opencode-go` |
| Specialists | MiniMax M3 / M2.7 | `opencode-go` |

**Setup**:
1. Sign in at [opencode.ai/auth](https://opencode.ai/auth) and subscribe to Go
2. In the OpenCode TUI, run `/connect`, select **OpenCode Go**, paste your API key
3. Run `/models` to confirm the models above show up for your account

**Usage limits** are dollar-based and shared across every agent in this
team, since they're one subscription: $12 per 5 hours, $30/week, $60/month.
Cheaper models (DeepSeek V4 Flash, MiMo-V2.5-Pro) allow far more requests
than expensive ones (GLM-5.2, Qwen3.7 Max) — if you're hitting limits
often, check `opencode.jsonc` for which agents use the pricier models and
consider whether a cheaper tier would serve that role just as well. See
[opencode.ai/docs/go](https://opencode.ai/docs/go/) for current per-model
request estimates and pricing.

If you exceed the plan's limits, OpenCode automatically falls back to free
models rather than blocking your requests outright (or to your Zen balance
if you've enabled "Use balance" in the console).

**Changing a model**: every agent's model is a one-line edit in
`opencode.jsonc` — find the agent's `"model"` field and swap the
`opencode-go/<model-id>` value. Run `opencode models` after connecting to
see the exact IDs available to your account.

---

## Permission Model (your "amplio" choice — deferred until real structure exists)

You originally asked for implementation agents (engine, numerics, I/O, UI,
testing) to have **broad edit access within their own domain folder** and
**bash fully allowed**. That preference is preserved, but it can't be
encoded as real folder paths yet — there is no source tree in this
template (see "Why There's No Predefined Simulator Code" below). So today,
every agent's `edit` permission defaults to just asking:

```jsonc
"core-engine-lead": {
  "permission": {
    "edit": { "*": "ask" },
    "bash": { "*": "allow" }
  }
}
```

Bash is already fully open for engineering leads/specialists per your
preference (that doesn't require knowing a folder structure). Once you've
gone through `/start` and `/model-design` and have a real architecture ADR
in `design/architecture/`, run **`/apply-permissions`** —
`software-architecture-director` will read the approved architecture,
propose a real folder-to-agent mapping, get your sign-off, and then update
`opencode.jsonc` with the actual `"src/thermodynamics/**": "allow"`-style
rules (using your real folder names, not a guess). That's the point at
which your original "amplio" preference actually takes effect.

Science leads (thermodynamics, kinetics, transport) keep `bash` on `ask`
outside of basic git/grep commands, since their primary output is models
and documentation, not arbitrary shell scripting — once a language is
chosen, `/apply-permissions` can also add the stack's test/lint commands
(e.g., `pytest*` for Python) to their allow-list if that's appropriate.

Directors keep `edit: ask` everywhere — they coordinate and draft
documents, but substantial implementation goes through a lead.

You can loosen or tighten any of this directly in `opencode.jsonc` — it's
plain JSON(C), no special tooling needed to edit it.

---

## Simplicity-First Rule (anti-overengineering)

Every agent follows a mandatory check before writing new code, defined in
`AGENTS.md`: stop at the first rung that resolves the need (does this need
to exist? → does NumPy/SciPy already do this? → does an existing interface
cover it? → is there a sibling function to extend? → can this be a function
instead of a class? → only then write minimal new code).

This is adapted from the open-source
[ponytail](https://github.com/DietrichGebert/ponytail) project — credit to
[@DietrichGebert](https://github.com/DietrichGebert) for the core idea — but
the rung order is rewritten for scientific computing rather than general
software. Ponytail's hierarchy ("stdlib → native platform feature →
installed dependency → one line") makes sense for web/app development;
here, the priority is "does an established numerical library already solve
this correctly" before anything else, because a custom-rolled ODE solver or
root-finder is a much bigger correctness risk in this codebase than a few
extra lines of glue code.

**What this rule does NOT relax**: physical plausibility checks, unit
documentation, literature references, dimensional analysis, and test
coverage are never "optimized away" by this rule — it's about how much
*new machinery* an agent builds, never about how rigorously that machinery
gets verified once it exists.

**Tracking deferred shortcuts**: when an agent deliberately takes a
narrower-than-general shortcut (e.g., implementing a binary-system model
when the long-term need might be ternary), it marks the spot inline with
a `# metalsim:` comment describing the upgrade path. Run `/simplicity-debt`
periodically (recommended: end of every sprint) to harvest all of these
into a reviewable ledger at `production/simplicity-debt.md`, so a shortcut
that should eventually be generalized doesn't just get forgotten.

---

## Self-Verifying Loop (anti-hallucination for batch validation)

`/verify-loop` runs a plan → dispatch → verify-against-source →
reject-and-requeue cycle over any batch of checkable claims, instead of
trusting a single pass of agent output. `validation-director` acts as the
loop coordinator: it writes a strict checklist (every item must trace to a
real file/dataset/computation, never a restatement), delegates execution to
the relevant lead, independently re-derives each check against the actual
source rather than accepting the executing agent's self-report, and
requeues anything that fails with a specific rejection reason attached. The
loop stops on a clean pass or escalates to you if rejections aren't
decreasing after 3 passes.

Two built-in use cases ship with the command:
- **Batch model validation** — verify several process models against the
  project's reference datasets (check `docs/knowledge-base/INDEX.md`) in
  one run instead of running `/validate-model` one at a time with no
  cross-checking discipline
- **Report KPI verification** — confirm every numeric claim in a generated
  report traces to the actual run output before sharing it, catching the
  "report says 94.2% but the stored output says 91.7%" class of error

**Adapted from the public write-up by
[@0xRicker](https://x.com/0xRicker)** describing a 300-agent research swarm
with an Opus verifier rejecting and requeuing failed units until a clean
pass. The mechanics are the same; the checklist content
(`docs/templates/verify-checklist-template.md`) is rewritten for
metallurgical simulation — mass balance closure, thermodynamic consistency
at equilibrium, physically plausible parameter ranges — rather than
financial data feeds. The scale claim is also adjusted to be honest: this
project runs a handful of specialists per department, not hundreds of
parallel agents. What's borrowed is the verify-reject-requeue discipline,
not the throughput number.

---

## Hooks — Not Ported (Yet)

The Claude Code version had bash hooks for session start/stop logging and
pre-commit validation. OpenCode's automation model is plugin-based
(TypeScript/JS), not bash-script-based, so these weren't ported 1:1.

What you still have:
- `production/sprint-current.md` and `production/session-state/` — manual
  continuity notes, same as before, just no longer auto-populated by a hook
- The original commit-validation logic (no bare print statements, valid
  JSON/YAML configs) is now better enforced by `qa-lead`'s `/code-review`
  command, applied to whatever the project's actual code looks like once
  it exists — run on-demand instead of automatically on every commit

If you want automated hooks later, OpenCode supports a
[Plugins](https://opencode.ai/docs/plugins/) system — worth a separate pass
once the core team is working well for you.

---

## Project Knowledge Base (Living Reference Docs)

`docs/knowledge-base/` is where you drop project-specific reference material
as the project grows: process specs, plant data exports, vendor datasheets,
literature notes, standards — anything that doesn't fit neatly into the
formal `design/` documents but the team needs to consult.

**This is not RAG and it's not auto-injected context.** OpenCode doesn't have
native vector search, so instead of embeddings, this uses a manifest
pattern: `docs/knowledge-base/INDEX.md` is a small table that says what each
document covers and which agents care about it. Every agent is instructed
(via `AGENTS.md`) to check that index before assuming information doesn't
exist, then read *only* the specific file that matches — never the whole
folder. This keeps the folder scalable to hundreds of documents without
bloating any single agent's context window.

### Usage
- **Adding documents one at a time during a conversation**: just mention the
  file to whichever agent you're talking to — they'll read it, use it, and
  add a row to the index themselves.
- **Bulk-adding several documents at once**: drop them all into
  `docs/knowledge-base/`, then run `/kb-sync` to have
  `chief-simulation-director` scan the folder, summarize each new document,
  and propose index rows for your approval.
- **During requirements gathering**: `/requirements-gather` checks the index
  as its first step — if you've already added process specs or plant data,
  it'll use them to pre-fill questions instead of starting from a blank
  slate.

### Permissions
Every agent has `edit: allow` scoped specifically to
`docs/knowledge-base/**` (set at the global `permission` level in
`opencode.jsonc`), regardless of their other restrictions. A specialist deep
in implementation can register a new reference document without needing to
go through a director first — the index itself is low-stakes to edit; what
matters is keeping it accurate.

---

## Why There's No Predefined Simulator Code

This ZIP contains **only the agent team and its workflow** — agent
prompts, commands, permission config, domain standards, and document
templates. It deliberately contains **no `src/`, no `data/`, no recipe
YAMLs, no `interfaces.py`, no `pyproject.toml`** — nothing that represents
an actual simulator implementation or a specific tech stack.

This is intentional, not an oversight. An earlier version of this template
shipped with sample code (Python interfaces, example batch recipes) meant
as illustrative scaffolding. That was a mistake: it encoded real
architectural decisions — a single-batch-timeline engine, Python, HDF5
results — without ever running them through the team's own collaboration
protocol (`Question → Options → Decision → Draft → Approval` from
`AGENTS.md`). Anyone using the template would inherit those decisions
silently, even if their actual process needs something structurally
different (for example: multiple coupled units with discrete buffers
between a continuous unit and a batch unit — a single-timeline engine
doesn't fit that case at all).

**The correct flow**: you run `/start`, describe your actual process,
and `software-architecture-director` proposes the architecture *with you*
— presenting options, not a fait accompli — based on what your process
actually needs. The same applies to language choice, numerical libraries,
results format, and UI framework. None of that should be decided by a
template; all of it should come out of a real `/model-design` and
architecture conversation once the team understands your case.

What you get in this ZIP is the team that will have that conversation with
you, not a pre-built answer to a question it never asked you.

---

## Quick Start

```bash
cd MetalSim-Studios-OpenCode
opencode
```

Then in the OpenCode TUI:
```
/start
```

This runs `chief-simulation-director` through the same onboarding flow as
the Claude Code version: process selection, simulation objectives, fidelity
level, tech stack confirmation, then activates the relevant leads.

---

## Project Structure

```
opencode.jsonc                    All provider, agent, and permission config
AGENTS.md                         Project-wide instructions (loaded automatically)
README.md                         This file
UPGRADING.md                      Template version migration notes

.opencode/
  agent/                          4 director prompts (primary agents)
  agent/subagents/                42 lead + specialist prompts
  command/                        34 custom slash commands

docs/
  agent-roster.md                 Full agent catalog
  agent-coordination-map.md       Delegation hierarchy diagram
  domain-standards.md             Units, physical plausibility, consistency rules
  coding-standards.md             Style and engineering conventions
  directory-structure.md          Reference layout for the project this team builds
  knowledge-base/                 Living reference-doc folder (see AGENTS.md)
  knowledge-base/INDEX.md         Manifest for the knowledge base
  templates/                      ADR, PSRD, validation report, verify-checklist templates

design/
  srd/  architecture/  process-models/
                                  Empty work-destination folders — this is
                                  where the team's actual deliverables
                                  (requirements docs, ADRs, governing
                                  equations) get written once you start a
                                  real project via /start

production/
  sprint-current.md               Empty sprint template, filled in by
                                   chief-simulation-director via /sprint-plan
  session-state/                  Session continuity notes
```

**Deliberately absent**: `src/`, `data/`, `tests/`, `tools/`, `models/`, and
any `pyproject.toml`/build config. This ZIP is the **agent team and its
workflow**, not a simulator. Programming language, project layout, file
formats, and dependencies are all decisions `software-architecture-director`
makes *with you*, in your own first session — see "Why There's No
Predefined Simulator Code" below.

---

## Original Template

This OpenCode edition is a port of the Claude Code version of MetalSim
Studios, itself adapted from the structure of
[Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios).
See `docs/agent-roster.md` and `docs/agent-coordination-map.md` for the full
agent catalog and delegation map — these are tool-agnostic and apply
identically here.
