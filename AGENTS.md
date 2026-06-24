# MetalSim Studios — Dynamic Batch Simulation for Metallurgical Processes

Multi-agent AI team specialized in designing, developing, and validating
**dynamic batch simulation software** for metallurgical processes, running on OpenCode.

46 coordinated agents (4 directors + 11 leads + 31 specialists). One integrated
simulation development team, adapted from a Claude Code agent template.

## Project Domain

Batch-specific dynamic simulation of metallurgical processes:
- Pyrometallurgical processes (smelting, roasting, reduction, refining)
- Hydrometallurgical processes (leaching, solvent extraction, electrowinning)
- Physical metallurgy (solidification, heat treatment, phase transformations)
- Mass and energy balance, thermodynamic equilibria, reaction kinetics
- Process control and optimization within batch cycles

## Technology Stack — Entirely Undecided

**Nothing below is chosen.** This project ships with no programming
language, no numerical library, no UI framework, no data storage format
decided — all of it is determined with `software-architecture-director`
once a real process is described via `/start` and `/model-design`. The
items below are a *menu of commonly relevant categories* to discuss, not
defaults:

* **Simulation core language/runtime**: to be chosen — common choices for
  this kind of work include Python, Julia, or compiled languages (C++,
  Rust) for performance-critical engines; trade-offs depend on team
  familiarity, performance needs, and ecosystem fit for the chosen
  numerical libraries
* **Thermodynamic backend**: to be chosen — options include FactSage API,
  Thermochimica, OpenCalphad, or a custom implementation, depending on the
  process and what databases are accessible
* **ODE/DAE solver approach**: to be chosen once a language is picked —
  options vary widely by ecosystem
* **UI framework**: to be chosen — depends on whether a web app, desktop
  app, or notebook-based interface fits the actual users best
* **Data storage/results format**: to be chosen — options include
  structured binary formats, relational/document databases, or simpler
  flat-file formats, depending on data volume and query needs
* **Visualization approach**: to be chosen alongside the UI framework
* **Version control**: Git — this one's a safe default regardless of stack
* **Testing approach**: to be chosen alongside the language — every modern
  language ecosystem has a standard testing framework and most have a
  property-based testing library worth using for invariant checks

## How This Team Is Organized in OpenCode

### Primary Agents (switch with Tab)
The 4 directors are **primary agents** — these are the entry points for any
conversation. Tab between them depending on what kind of decision you're making:

| Director | Use for |
|----------|---------|
| `chief-simulation-director` | Project status, scope, sprint planning, phase gates |
| `process-domain-director` | Process science: thermodynamics, kinetics, transport questions |
| `software-architecture-director` | Architecture, engine design, interfaces, tech stack |
| `validation-director` | V&V strategy, acceptance criteria, validation reports |

### Subagents (invoke with @mention or let a director delegate)
The 11 department leads and 25 specialists are **subagents**. Each director's
`permission.task` config restricts it to delegating only within its domain
(e.g., `process-domain-director` can only invoke `thermodynamics-lead`,
`reaction-kinetics-lead`, `transport-phenomena-lead`, `process-control-lead`).

You can always invoke any subagent directly even if hidden from the @ menu:
```
@thermodynamics-lead implement the MQM activity model for the FeO-SiO2-CaO slag system
```

Most Tier 3 specialists are marked `hidden: true` to keep the @ autocomplete
menu manageable — they're still invokable by name, and leads delegate to them
automatically based on task description.

## Collaboration Protocol

**User-driven collaboration, not autonomous execution.**
Every task follows: **Question → Options → Decision → Draft → Approval**

- Directors ask before editing files (`permission.edit: ask`) — they coordinate
  and write design docs, but implementation work goes to leads/specialists.
- Leads and specialists are configured for **broad edit permission within
  their own domain folder**, but since no project structure exists yet,
  this currently resolves to asking for everything except the studio's own
  living documents (`docs/knowledge-base/**`). Once a real architecture
  ADR exists, run `/apply-permissions` to activate the broad domain-folder
  access this team is designed to have.
- Bash is broadly allowed for engineering agents (engine, numerics, I/O, UI,
  testing) to support fast iteration; science leads keep bash on `ask`
  outside of basic git/grep commands, since their primary output is models
  and documentation, not scripts — `/apply-permissions` can also add the
  chosen stack's test/lint commands to their allow-list once that's decided.
- Multi-file changes spanning departments should go through the relevant
  director so the change is coordinated, not just delegated blindly.
- Numerical results must include units, uncertainty estimates, and physical
  sanity checks — this applies to every agent, not just leads.

## Simplicity-First Rule (applies to every agent, every time)

Before writing any new code — function, class, module, abstraction layer —
stop and check these rungs **in order**. Use the first one that resolves the
need. Do not skip ahead to "write new code" out of habit or because it feels
more thorough.

```
1. Does this need to exist at all?
     -> A specialist often adds a layer "to be safe" or "for future
        flexibility" that the current recipe/task never calls for.
        If nothing in design/ or the current task requires it, don't build it.

2. Does the standard library or an already-chosen numerical/scientific
   library already do this?
     -> Once a tech stack is chosen (see `/start` and
        `software-architecture-director`), this project will likely lean on
        established numerical libraries (e.g., SciPy/NumPy if Python, or
        whatever equivalent the chosen stack provides) for ODE/DAE solving,
        root-finding, interpolation, and linear algebra. Custom
        implementations of these are almost never justified — check what
        the chosen stack already provides before writing one.

3. Does an existing interface defined earlier in *this* project already
   cover the contract you need?
     -> Once `software-architecture-director` and the team have defined
        core interfaces (e.g., something playing the role of a stage
        module, a thermodynamic backend, a result writer) for your actual
        process, implement against those rather than inventing a parallel
        contract because it feels cleaner for your specific case. A
        fragmented set of near-duplicate interfaces is a worse outcome than
        reusing a slightly-less-perfect existing one. This project ships
        with no predefined interfaces — they get designed with you, for
        your actual process, via `/model-design` and architecture review.

4. Is there already a function in this codebase that's 80% of what you
   need?
     -> Extend or parametrize it rather than writing a sibling function.
        Check sibling specialist folders in the same department first
        (e.g., before writing a new dissolution rate law, check what
        topochemical-model-specialist already has).

5. Can this be one clear function instead of a class?
     -> A class with one method and no state is a function wearing a
        costume. Reserve classes for things that actually hold state
        across calls (a simulation's state representation, a stateful
        controller, a database connection) — not for grouping related math.

6. Only then: write the minimum new code that satisfies the governing
   equation / interface / test, in one well-documented function or class.
```

**This rung-skipping check is lazy about code volume, never about physics
or correctness.** Dimensional analysis, limiting-case checks, unit tests,
literature references, and physical plausibility checks (per
`docs/domain-standards.md`) are never optional and are never the thing being
"simplified away." A function that's 5 lines instead of 50 still needs its
docstring, units, and a test with a real ground truth. Laziness applies to
*how much machinery you build*, not to *how rigorously you verify it*.

**Marking shortcuts.** When you take a shortcut that has a known, more
general upgrade path you're deliberately not building yet, mark it inline:
```python
# metalsim: hardcoded for binary Fe-O system; generalize to n-component
# via gibbs-minimization-specialist if a ternary system is needed later
```
This makes deferred generality searchable and reviewable later, instead of
silently buried in a comment no one will find.

**When the rung check and the task genuinely conflict** — for example, the
governing equation truly requires a custom numerical method NumPy/SciPy
doesn't provide — implement it, but say so explicitly when reporting back:
"Custom implementation needed because [reason]; checked scipy.[module] first
and it doesn't cover [specific gap]." This keeps the default bias toward
reuse without blocking legitimate cases where a custom implementation is
the correct scientific choice.

## Domain Standards

See `docs/domain-standards.md` for:
- Units policy (SI internal, display conversion)
- Physical plausibility checks (temperature ranges, mass conservation)
- Thermodynamic consistency requirements
- Numerical precision defaults

See `docs/coding-standards.md` for:
- Style conventions for whatever language gets chosen (formatting, linting,
  stricter type-checking for core/physics modules)
- No-magic-numbers policy for universal constants
- **Parameter Provenance** — a stricter rule for process/model parameters:
  every value used inside a physics function (setpoints, rate constants,
  activity parameters, etc.) must trace to the recipe/config, a documented
  value in `design/process-models/`, or a cited source — never a bare
  literal "that's roughly right." Checked in `/code-review` as a BLOCK,
  not a style nit.
- Error handling and logging conventions

## Project Knowledge Base (Living Reference Documents)

`docs/knowledge-base/` is a growing folder of project-specific reference
material: process specifications, plant data summaries, vendor datasheets,
literature notes, standards — anything the user adds over the course of the
project. It is **not** preloaded into context. Treat it as documentation you
look up on demand, not documentation you already know.

**Before assuming information doesn't exist, check the index:**

1. Read `docs/knowledge-base/INDEX.md` — it's short, a manifest table, safe
   to read in full every time.
2. Scan the Document Registry for a row matching your current task's topic
   or your own agent name.
3. Read **only** the specific file(s) that match — never read the whole
   `knowledge-base/` folder speculatively, since it grows over time and most
   of it will be irrelevant to any single task.
4. If you produce or receive a new reference document worth keeping, save it
   into `docs/knowledge-base/` and add a row to the index yourself before
   finishing your task.

This applies to **every agent**, not just the directors. A specialist deep
in implementation who needs a plant data point, a standard, or a literature
value should check the index the same way a director would during
requirements gathering.

`/requirements-gather` and `/model-design` both treat checking this index
as a mandatory first step — but it's relevant any time, not just then.

## Project Structure

```
opencode.jsonc                     OpenCode configuration: providers, agents, permissions
AGENTS.md                          This file — loaded automatically as project context
README.md  UPGRADING.md

.opencode/
  agent/                           4 director system prompts (primary agents)
  agent/subagents/                 42 lead + specialist system prompts
  command/                         34 custom slash commands (30 ported from skills + /kb-sync + /simplicity-debt + /verify-loop + /apply-permissions)

docs/
  agent-roster.md                  Full agent catalog
  agent-coordination-map.md        Delegation hierarchy
  domain-standards.md              Units, physical plausibility, consistency rules
  coding-standards.md              Style and engineering conventions (stack-agnostic)
  knowledge-base/                  Living reference-doc folder + INDEX.md manifest
  templates/                       ADR, PSRD, validation report, verify-checklist templates
  user-manual/  technical/  api/   Empty — populated as the team produces real docs

design/
  srd/  architecture/  process-models/
                                   Empty work-destination folders for the
                                   team's actual deliverables once a real
                                   project starts

production/
  sprint-current.md                Empty sprint template
  session-state/                   Session continuity notes
```

**No `src/`, `data/`, `tests/`, `tools/`, or build config ships with this
template.** This project is the agent team and its workflow — not a
simulator. Language, libraries, project layout, and file formats are all
decisions you make *with* `software-architecture-director` once you
describe your actual process via `/start`, not assumptions baked into the
template. See `README.md`'s "Why There's No Predefined Simulator Code"
section for the full reasoning.

## Getting Started

First session? Run:
```
/start
```

This invokes `chief-simulation-director` to walk through process selection,
simulation objectives, fidelity level, and technology stack confirmation, then
activates the relevant department leads.

## Provider Setup Reminder

This team runs entirely on **OpenCode Go**, a single subscription covering
every model in the roster. Before your first real session:

```
1. Sign in at https://opencode.ai/auth and subscribe to Go
2. /connect  -> select "OpenCode Go" -> paste your API key
3. /models   -> confirm the roster's models are available
```

See `README.md`'s "Model / Provider Setup — OpenCode Go" section for usage
limits and how to swap an individual agent's model if needed.
