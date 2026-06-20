# Reference Directory Layout (Suggested, Not Prescribed)

This is a **starting-point suggestion** for how a metallurgical batch
simulator's codebase might be organized, based on the domain split this
agent team uses (thermodynamics / kinetics / transport / engine / I/O /
UI). It is not a structure that exists in this project, and it is not a
requirement.

**Use this only as a discussion aid** when `software-architecture-director`
and you are deciding on an actual project layout via `/start` and an
architecture ADR. The real, binding layout for your actual project is
whatever gets written into an ADR in `design/architecture/` — if this
document and an ADR ever disagree, the ADR wins.

```
<project-root>/
  <source-root>/              naming and nesting depend on chosen language
    core/                      simulation engine framework, shared interfaces
    batch-engine/              batch-level control, scheduling, optimization
    metallurgy/                process-specific implementations
    thermodynamics/            thermodynamic models
    kinetics/                  reaction rate models
    transport/                 transport phenomena (heat/mass/momentum)
    ui/                        user interface
    io/                        data input/output, persistence, schemas

  <reference-data-root>/      naming and format depend on chosen approach
    process-specs/             process reference data
    material-db/                thermochemical and property data
    batch-recipes/              recipe/config files
    validation-sets/            reference datasets for V&V

  <tests-root>/
    unit/  integration/  regression/  validation/

  <tools-root>/
    analysis/  calibration/  build/
```

## Why This Project Doesn't Ship With This Already Built
An earlier version of this template shipped sample code implementing a
structure like the one above, in Python, with HDF5 results and specific
class names. That was a mistake — it encoded real architectural decisions
without ever discussing them with the user, and it didn't fit every
process (multi-unit plants with mixed continuous/batch units and discrete
buffers between them need a meaningfully different shape than a single
sequential batch timeline). See `README.md`'s "Why There's No Predefined
Simulator Code" section for the full reasoning.

This document survives as a **conversation starting point**, not as code.
