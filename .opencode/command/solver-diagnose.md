---
description: Diagnose numerical solver issues: convergence failures, stiffness, instability
agent: software-architecture-director
---

# /solver-diagnose — Solver Diagnostics

Invoke **numerical-methods-lead**.

## Diagnosis Workflow

### 1. Classify the Problem
- Convergence failure: solver returns with failed flag
- Slow convergence: solver takes many iterations / very small time steps
- Instability: oscillating or diverging solution
- Non-physical result: negative concentrations, temperatures above physical maximum

### 2. Stiffness Check
- Compute condition number of Jacobian at failure point
- If cond(J) > 1e6: system is stiff → switch to Radau or BDF solver
- Log eigenvalue spectrum of Jacobian

### 3. Step-by-Step Checklist
- [ ] Check tolerances: are rtol/atol appropriate for variable magnitudes?
- [ ] Check initial conditions: physically consistent? All positives?
- [ ] Check for phase disappearance events that weren't handled
- [ ] Check for division-by-zero in rate expressions (zero phase amounts)
- [ ] Verify Jacobian is correct (compare analytical to finite-difference)
- [ ] Try tighter tolerances first, then looser as diagnostic
- [ ] Try different solver (LSODA auto-detects stiffness)

### 4. Output
Diagnostic report with identified issue, recommended fix, and test case to verify fix.
