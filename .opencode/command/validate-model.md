---
description: Run model validation against reference data and produce validation report
agent: validation-director
---

# /validate-model — Model Validation

Invoke **validation-director** → **process-validation-lead**.

## Workflow
1. Select process model to validate
2. Identify available reference datasets — check `docs/knowledge-base/INDEX.md`
   for what's been catalogued, or wherever the project's actual reference
   dataset storage location is once that's been decided
3. Configure simulation to match reference experimental conditions
4. Execute simulation runs
5. Extract comparable outputs (same variables, same time points)
6. Statistical comparison: RMSE, mean absolute error, max error, R²
7. Visual comparison: overlay simulated vs. measured on time-series plots
8. Apply acceptance criteria (from `design/srd/validation-plan.md`)
9. Produce Validation Report in `docs/technical/validation-reports/`

## Acceptance Criteria
- Product composition: within 2× analytical uncertainty of reference
- Temperature profile: within ±15°C unless process justifies wider
- Mass balance closure: ≤0.1% relative error
- Energy balance closure: ≤0.5% relative error

## Output
`docs/technical/validation-reports/validate-[model]-[date].md` with VALIDATED / PARTIAL / FAILED verdict.

## When to Use /verify-loop Instead
This command validates **one model, once**, with no automatic retry. If
you're validating a **batch** of several models at once and want
rejected models automatically requeued with a specific failure reason
(rather than you re-running this command by hand for each failure), use
`/verify-loop` instead — it wraps this same acceptance-criteria logic in a
plan → dispatch → verify → reject/requeue cycle that runs until everything
in the batch passes or visibly gets stuck.
