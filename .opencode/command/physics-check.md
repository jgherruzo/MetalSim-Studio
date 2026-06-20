---
description: Review a model or code for physical correctness — dimensional analysis, limiting cases, conservation laws
agent: process-domain-director
---

# /physics-check — Physical Correctness Review

Invoke **process-domain-director** with **thermodynamics-lead** and **reaction-kinetics-lead** as needed.

## Review Protocol

### 1. Dimensional Analysis
- Verify every equation term has consistent units
- Check that rate expressions have correct dimensions [mol/(m³·s)] or [mol/(m²·s)]
- Verify activity is dimensionless, chemical potential in [J/mol], entropy in [J/(mol·K)]

### 2. Limiting Cases
For each model, test at boundaries:
- Zero concentration → rate = 0
- Thermodynamic equilibrium → net rate = 0
- Pure component → activity = 1 (Raoult's law standard state)
- Zero driving force → zero flux

### 3. Conservation Check
- Mass: trace each species from inputs to outputs, verify closure
- Energy: verify all heat sources and sinks are accounted for
- Charge: for electrochemical models, verify electron balance

### 4. Parameter Sanity
- Activation energies: flag if outside 15–350 kJ/mol
- Pre-exponential factors: flag if physically implausible
- Diffusivities: flag if outside 10⁻¹⁴ – 10⁻⁸ m²/s range for solids/liquids

### Output
Produce a physics review checklist with PASS / WARN / FAIL for each item. Flag issues for Process Domain Director attention.
