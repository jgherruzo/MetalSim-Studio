---
description: Design the governing equations and architecture for a new process model module
agent: process-domain-director
---

# /model-design — Process Model Design

Invoke **process-domain-director** with **software-architecture-director**.

## Workflow

This skill produces the governing equations document BEFORE any code is written.
No implementation begins until the model design is approved.

### Step 1: Scope Definition
- What physical/chemical phenomena does this module model?
- What are the inputs (state variables consumed)?
- What are the outputs (state variables produced or updated)?
- What is the time resolution: instantaneous (algebraic) or dynamic (ODE/DAE)?

### Step 2: Governing Equations
For each phenomenon, document:
```
Phenomenon: [name]
Equation:   [mathematical expression with variable definitions]
Type:       [ODE / algebraic / empirical correlation]
Variables:  [list with units and typical range]
Parameters: [list with units, typical values, and literature source]
Assumptions: [explicit list of simplifications]
Validity:   [conditions under which model is applicable]
Reference:  [literature citation]
```

### Step 3: Coupling Analysis
- Which variables are shared with thermodynamics? → define what data needs
  to flow to/from the thermodynamic model (the actual interface name and
  shape is an architecture decision, not assumed here)
- Which variables are shared with kinetics? → define coupling protocol
- Which variables are shared with transport? → define boundary conditions

### Step 4: Interface Design
Describe, in plain terms, what this module needs to consume and produce:
- What state does it read? (composition, temperature, phase amounts, etc.)
- What does it return? (a rate, a source term, an updated value — be
  specific about units)
- Does it fit an interface/contract the project has already established in
  an approved architecture ADR (`design/architecture/`)? If so, use that.
  If no such contract exists yet for this kind of module, flag this as a
  decision for `software-architecture-director` to make — don't invent a
  contract here on the process-science side, since interface design is
  architecture's call, not process-domain's.

Only once a real architecture exists should this step reference actual
interface/class names — and even then, pull them from the approved ADR,
not from memory or assumption.

### Step 5: Test Strategy
- What analytical solution exists for a limiting case?
- What literature data can validate this module?
- What are the acceptance criteria?

### Output
Document saved to `design/process-models/[module-name].md`
Present to user for approval → then assign to relevant specialist for implementation.
