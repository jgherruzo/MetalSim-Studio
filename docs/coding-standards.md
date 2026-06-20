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
