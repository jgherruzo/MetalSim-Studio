---
description: Run parameter sensitivity analysis on a batch simulation
agent: software-architecture-director
---

# /sensitivity-run — Sensitivity Analysis

Invoke **numerical-methods-lead** → **optimization-specialist**.

## Workflow
1. Define the base case recipe (from file or current config)
2. User specifies: which parameters to perturb, which outputs to track
3. Choose sensitivity method:
   - One-at-a-time (OAT): ±10% on each parameter independently
   - Morris screening: efficient multi-parameter screening
   - Sobol global: full variance decomposition (most runs, most information)
4. Run the analysis using whatever sensitivity-analysis tooling exists in
   the project's actual codebase (location depends on the chosen tech
   stack — check `design/architecture/`)
5. Present results: tornado chart, Sobol index bar chart
6. Flag top 3 most influential parameters for each output

## Output
- Tornado chart: output variation vs. parameter variation
- Sensitivity index table: Sobol S1 and ST for each parameter
- Interpretation: which parameters need tightest control/measurement
