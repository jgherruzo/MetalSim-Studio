# Coding Standards

These are the standards the team applies once a project's tech stack has
been chosen with `software-architecture-director`. This document
intentionally does not assume a language — fill in the stack-specific
tooling section once that decision is made, and record the decision itself
as an ADR in `design/architecture/`.

## Style (language-agnostic principles)
- Consistent formatting enforced by an automated formatter for whatever
  language is chosen (e.g., Black for Python, gofmt for Go, Prettier for
  JS/TS) — pick one and apply it everywhere, don't hand-format
- Consistent linting enforced by an automated linter for the chosen language
- Type annotations on all public function/method signatures, using
  whatever the chosen language's type system provides
- Stricter type checking for the core engine and any physics-bearing
  modules (thermodynamics, kinetics, transport) than for UI/glue code —
  errors in physics code are more costly than errors in display code

## No Magic Numbers
Bad (any language): a literal physical constant typed inline with no name
or source.
Good: a named constant, defined once, with its value, units, and source
documented at the definition site — then imported/referenced everywhere
it's used. Where exactly that constants module/file lives depends on the
project's chosen layout — see `design/architecture/`.

## Parameter Provenance (stricter than "no magic numbers")
"No Magic Numbers" covers universal constants (R, NA, Faraday's constant) —
those just need a name and a source, since their value never changes
between projects. **Process and model parameters are a different,
stricter case**: a setpoint temperature, an activity-model interaction
parameter, a rate constant, an assumed equilibrium composition, a particle
size — these describe *this specific process*, not physics in general. A
wrong universal constant breaks everything obviously; a wrong process
parameter can silently simulate a different process than the one intended,
while still running and producing plausible-looking numbers.

Every process/model parameter used inside a physics function must trace to
one of:
- the batch recipe / config, as loaded at runtime — not copied into the
  function as a default
- a value already established in `design/process-models/` for this system,
  with its own citation
- a cited literature or database source, documented at the point of use
  (formula reference, parameter source, and validity range — e.g. "Wagner
  interaction parameter ε_Cu-As from [source], valid for x_As < 0.02")

A parameter with no traceable origin — typed as a bare literal "because
that's roughly right for this system" — fails review even if the resulting
number is physically plausible. Plausibility is necessary but not
sufficient; the team needs to know *why* that specific value was chosen,
not just that it didn't produce an obviously wrong answer. This is checked
in `/code-review`'s Physics Code section and is a `BLOCK`, not a
`NEEDS CHANGES`, since it's about whether the simulation is trustworthy at
all, not a style nit.

## Error Handling
- All solver/numerical calls must catch and surface failure explicitly —
  never silently swallow an error or proceed with an invalid result
- All file I/O must use whatever resource-management pattern the chosen
  language provides (e.g., context managers in Python) to guarantee
  cleanup on both success and failure paths

## Logging
- No bare print/console-log statements for diagnostic output in production
  code paths — use a structured logging mechanism appropriate to the
  chosen stack, with at least DEBUG/INFO/WARNING/ERROR levels
- Logger scoping should follow the chosen language's idiomatic pattern
  (e.g., `__name__`-based loggers in Python)

## Where Project-Specific Rules Live
Once a tech stack is chosen, project- and path-specific coding rules
(e.g., "files under X get extra type-checking rigor") get recorded as part
of the relevant ADR in `design/architecture/` — not duplicated here. This
document stays at the level of language-agnostic principles; the ADRs
carry the stack-specific specifics.
