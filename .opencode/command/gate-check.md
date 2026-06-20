---
description: Run a phase gate check before advancing to the next project phase
agent: chief-simulation-director
---

# /gate-check — Phase Gate Check

Invoke **chief-simulation-director** to assess readiness for phase transition.

## Phase Gates

### Gate 1: Requirements → Design
- [ ] Process type and scope defined and approved
- [ ] All batch stages listed with duration, T, P, reactions
- [ ] Species and phase list complete
- [ ] Required simulation outputs specified
- [ ] Validation strategy defined
- [ ] Technology stack decided

### Gate 2: Design → Implementation
- [ ] Governing equations documented for all modules
- [ ] Model assumptions documented with justification
- [ ] Architecture design reviewed by Software Architecture Director
- [ ] Interface contracts defined (whatever the project's actual core
      contracts turn out to be — stage module contract, thermodynamic
      backend contract, etc. — named and documented in an ADR, not assumed)
- [ ] Directory structure created and populated

### Gate 3: Implementation → Validation
- [ ] Unit tests passing (coverage thresholds met)
- [ ] Mass balance closure ≤ 0.1% on test cases
- [ ] Energy balance closure ≤ 0.5% on test cases
- [ ] Solver convergence stable for all test scenarios
- [ ] Code review complete

### Gate 4: Validation → Release
- [ ] All model validations PASSED or PARTIAL with documented limitations
- [ ] Validation report completed and reviewed
- [ ] User manual draft complete
- [ ] Release checklist passed

Output: GATE PASSED / GATE BLOCKED with list of open items.
