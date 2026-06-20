---
description: Compare two or more simulation runs side-by-side
agent: software-architecture-director
---

# /scenario-compare — Multi-Run Comparison

Invoke **visualization-specialist** with **data-io-lead**.

## Workflow
1. Select 2–N runs to compare (by run ID or results file path)
2. Load all results from the project's actual results store
3. Align time axes if runs have different stage durations
4. Generate comparison plots:
   - Overlaid time-series for each tracked variable
   - KPI comparison bar chart
   - Mass balance comparison table
   - Deviation table: run vs. base case (absolute and % differences)
5. Generate comparison report: `outputs/comparisons/[comparison_id].html`

## Common Use Cases
- Base case vs. optimized recipe
- Model version A vs. version B (regression check)
- Operating condition sensitivity (3–5 runs varying one parameter)
