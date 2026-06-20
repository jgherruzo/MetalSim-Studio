---
description: Generate a simulation summary report for a completed batch run
agent: software-architecture-director
---

# /report-generate — Simulation Report Generation

Invoke **data-io-lead** → **results-persistence-specialist** + **visualization-specialist**.

## Report Sections

1. **Run Summary**: Run ID, recipe file, model version, execution time, timestamp
2. **Batch Recipe**: Process name, stages, key parameters (table)
3. **Mass Balance Table**: All elements, input vs. output, closure %
4. **Energy Balance**: Heat input sources, losses, net, energy efficiency
5. **Stage-by-Stage Results**: For each stage: T profile, composition evolution, phase fractions
6. **Key Performance Indicators**: Yield, recovery, specific energy, cycle time
7. **Solver Performance**: Steps taken, evaluations, convergence status per stage
8. **Alarms and Warnings**: Any conditions triggered during run
9. **Appendix**: Full parameter listing, software version, recipe/config as used

## Output Format
- Whatever format and tooling the project's chosen tech stack supports —
  typically an HTML report with embedded charts, optionally exportable to
  PDF, plus raw time-series data in a structured format (CSV or similar).
  The specific libraries/tools depend on decisions made with
  `software-architecture-director` — check `design/architecture/`.

## Optional: Verify Before Sharing
For reports going to someone outside this conversation (a stakeholder, a
plant engineer, a written deliverable), consider running `/verify-loop` on
the KPI section (item 6) and the mass/energy balance tables (items 3-4)
before sharing — it re-derives each figure directly from the run's stored
output rather than trusting the report template rendered it correctly, and
catches the class of bug where a report shows a stale or mismatched number.
Not necessary for quick internal looks at a run you just executed yourself.
