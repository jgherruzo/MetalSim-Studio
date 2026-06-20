---
description: Optimize batch operating recipe to maximize yield, minimize energy, or hit a target
agent: process-domain-director
---

# /optimize-batch — Batch Recipe Optimization

Invoke **process-control-lead** → **batch-optimization-specialist**.

## Workflow
1. Define optimization goal:
   - Maximize: metal yield [%], recovery [%], throughput [t/h]
   - Minimize: energy consumption [GJ/t], cycle time [h], reagent cost [$/t]
   - Hit target: product composition [wt%], temperature at tapping [°C]
2. Define decision variables (what can be changed):
   - Stage durations, temperature setpoints, feed addition timing and quantity
3. Define constraints (what cannot be violated):
   - Equipment limits (max power, max temperature), safety limits, product spec
4. Select optimizer: gradient-free (DE, Nelder-Mead) for noisy/discontinuous; SLSQP for smooth
5. Run the optimization using whatever optimization tooling exists in the
   project's actual codebase (location depends on the chosen tech stack —
   check `design/architecture/`)
6. Present optimized recipe vs. base case
7. Verify optimized recipe with full simulation run
8. Save the optimized recipe wherever the project stores recipes/configs —
   check `design/architecture/` for the actual location
