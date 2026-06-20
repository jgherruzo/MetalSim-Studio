---
description: Run and report a complete energy balance check on a simulation result
agent: process-domain-director
---

# /energy-balance-check — Energy Balance Verification

Invoke **process-domain-director** with **transport-phenomena-lead**.

## Workflow

1. Load the specified simulation result (from the project's actual results store, or the last run)
2. For each batch stage:

### Heat Sources (inputs)
   - Electrical/fuel energy input [kJ]
   - Enthalpy of feed streams at feed temperature [kJ]
   - Exothermic reaction heats: Σ(ξᵢ · ΔHᵣ,ᵢ) for all reactions [kJ]
   - Sensible heat of additions (alloys, reagents) [kJ]

### Heat Sinks (outputs)
   - Enthalpy of product/off-gas streams at exit temperature [kJ]
   - Wall heat losses (conduction + radiation) [kJ]
   - Cooling water extraction [kJ]
   - Endothermic reaction heats [kJ]
   - Latent heats (melting, phase transformation) [kJ]

### Balance
   - Accumulation = Sources - Sinks
   - Closure % = (Sources - Sinks - Accumulation) / Sources × 100

3. Flag any stage with |closure| > 0.5%
4. Identify most likely source of imbalance (missing heat loss term, incorrect Cp, wrong ΔHᵣ)

## Output Format
```
ENERGY BALANCE REPORT — [Run ID] — [Stage: X]
==============================================
Heat Sources:
  Electrical input:      1850.0 kJ   (74.2%)
  Reaction heat (exo):    450.0 kJ   (18.0%)
  Feed enthalpy:          193.0 kJ    (7.8%)
  Total IN:              2493.0 kJ

Heat Sinks:
  Product enthalpy:      2180.0 kJ   (87.4%)
  Wall losses:            285.0 kJ   (11.4%)
  Endothermic reactions:   20.0 kJ    (0.8%)
  Total OUT:             2485.0 kJ

Accumulation (dU/dt):       5.0 kJ    (0.2%)
Closure:                    0.12%     ✓ PASS
```
