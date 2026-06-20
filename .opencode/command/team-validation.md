---
description: Coordinate validation team for a full model validation campaign
agent: validation-director
---

# /team-validation — Validation Team Coordination

Invoke **validation-director** to coordinate **process-validation-lead**, **verification-lead**, and **qa-lead**.

## Validation Campaign Workflow
1. **validation-director** defines scope and acceptance criteria
2. **verification-lead** confirms all unit tests pass (code is correct)
3. **process-validation-lead** runs model against reference datasets
4. **benchmark-data-specialist** confirms dataset provenance is documented
5. **model-calibration-specialist** calibrates if initial validation fails
6. **qa-lead** reviews validation report for completeness
7. **validation-director** issues VALIDATED / NOT VALIDATED verdict

## Output
Validation Report in `docs/technical/validation-reports/` plus updated status in validation tracker.

## Relationship to /verify-loop
This command defines **who does what** in a validation campaign (the
organizational flow across leads). `/verify-loop` is the **execution
mechanism** step 3 actually runs on — instead of `process-validation-lead`
running each model once and reporting results for `validation-director` to
read passively, the loop's reject-and-requeue cycle is what step 3 should
use when validating more than one model in the same campaign.
