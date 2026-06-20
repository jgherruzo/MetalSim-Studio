---
description: Run a systematic parameter sweep and visualize the response surface
agent: software-architecture-director
---

# /parameter-sweep — Parameter Sweep Runner

Invoke **numerical-methods-lead** → **optimization-specialist**.

## Workflow
1. User specifies:
   - Parameters to sweep (1D: single; 2D: grid; ND: factorial design)
   - Range and number of points for each parameter
   - Output variable(s) to track
2. Generate parameter combinations (full factorial, Latin hypercube, or custom grid)
3. Run all simulations (parallel if requested)
4. Collect results into summary table
5. Visualize: 1D → line plot, 2D → heatmap / contour plot, ND → parallel coordinates
6. Save all results to `outputs/sweeps/[sweep_id]/`

## Output
- Summary DataFrame with all parameter combinations and outputs
- Response surface plots
- Optimal point identification
