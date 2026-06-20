---
description: Fit model parameters to plant or experimental data
agent: validation-director
---

# /calibrate-model — Model Calibration

Invoke **process-validation-lead** → **model-calibration-specialist**.

## Workflow
1. Select model to calibrate (kinetics, heat transfer, activity model)
2. Select a calibration dataset — check `docs/knowledge-base/INDEX.md` for
   what's available, or wherever the project's reference datasets actually
   live once that's been decided
3. Identify parameters to fit (with bounds from physical reasoning)
4. Define objective function: minimize sum of squared residuals
5. Run calibration using whatever calibration tooling exists in the
   project's actual codebase (location depends on the chosen tech stack —
   check `design/architecture/`)
6. Check calibration quality: residual plot, correlation matrix, confidence intervals
7. Cross-validate: check fitted model on held-out data
8. Produce calibration report with fitted parameters and uncertainty
9. Save the calibrated parameter set wherever the project stores material
   parameters — check `design/architecture/` for the actual location

## Anti-overfitting Check
- Fitted parameters must remain within physical bounds
- Chi-squared per degree of freedom should be near 1.0
- Residuals should be randomly distributed (no systematic trend)
