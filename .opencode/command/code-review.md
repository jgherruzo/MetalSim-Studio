---
description: Run a structured code review on changed or specified files
agent: validation-director
---

# /code-review — Code Review

Invoke **qa-lead** → **code-review-specialist**. For physics-bearing code, also involves the relevant domain lead.

## Review Scope
- If a file/PR is specified: review those files
- If no scope: review all staged/unstaged changes (`git diff`)

## Review Checklist

### General Code Quality
- [ ] Follows the formatting/linting standards the project has actually
      adopted for its chosen language (check `design/architecture/` or
      `docs/coding-standards.md` for what's been decided)
- [ ] No bare print/console statements for diagnostic output — uses
      whatever logging mechanism the project has adopted
- [ ] No hardcoded magic numbers — all constants named and referenced to a
      source
- [ ] No `TODO`/`FIXME` without an associated issue number
- [ ] All public functions/classes have documentation

### Physics Code (wherever thermodynamics, kinetics, and transport modules
actually live in this project — check `design/architecture/` if unsure)
- [ ] Equations documented with formula + literature reference
- [ ] All parameters have units documented
- [ ] Limiting cases tested (zero concentration, equilibrium, pure component)
- [ ] Physical plausibility checks present (negative mass, impossible temperature)
- [ ] Thermodynamic consistency verified (Gibbs-Duhem, detailed balance)

### Engine Code (wherever the simulation engine actually lives)
- [ ] Implements whatever the project's actual stage-module / state /
      error-handling contracts are (check the relevant ADR in
      `design/architecture/` — these are project-specific, not assumed)
- [ ] No direct mutation of shared state where the architecture calls for
      immutability
- [ ] Solver/numerical failures caught and surfaced clearly, not silently
      swallowed
- [ ] Any checkpoint/persistence writes are atomic

### Tests
- [ ] New physics function has at least one unit test with analytical ground truth
- [ ] Floating-point comparisons use an explicit, documented tolerance
- [ ] No internet access in tests

### Data / Configuration
- [ ] New schemas/configs are validated against whatever schema mechanism
      the project uses
- [ ] Recipe/config templates validate against the project's actual schema
- [ ] Breaking schema changes have a migration path documented

## Output
Review report with PASS / NEEDS CHANGES / BLOCK per section. Specific line references for issues found.
