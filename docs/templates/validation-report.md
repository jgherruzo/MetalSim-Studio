# Validation Report
## Model: [Module Name] — v[X.Y.Z]

**Date**: [YYYY-MM-DD]  
**Validator**: process-validation-lead  
**Reviewed by**: validation-director  
**Verdict**: ✓ VALIDATED / ⚠ PARTIAL / ✗ NOT VALIDATED  

---

## 1. Model Under Validation

**Module**: `[location of this model in the project's actual codebase]`  
**Description**: [What this module computes]  
**Version**: [git commit hash or tag]  

---

## 2. Acceptance Criteria

| Criterion | Threshold | Reference |
|-----------|-----------|-----------|
| Product composition RMSE | ≤ 2× analytical uncertainty | Validation Plan §3.2 |
| Temperature profile MAE | ≤ 15 °C | Validation Plan §3.3 |
| Mass balance closure | ≤ 0.1% | Validation Plan §3.1 |
| Energy balance closure | ≤ 0.5% | Validation Plan §3.1 |

---

## 3. Reference Datasets

| ID | Source | Process Conditions | Variables | # Points | Provenance |
|----|--------|-------------------|---------|---------|-----------|
| DS-01 | [Author, Year] | [T, P, composition] | Temperature | 24 | [location in the project's reference-dataset store — check `docs/knowledge-base/INDEX.md`] |
| DS-02 | Plant data [Site, confidential] | Industrial scale | Tap composition | 48 heats | [location in the project's reference-dataset store] |

---

## 4. Simulation Configuration

[Describe how the simulation was configured to match the reference conditions.
Include: recipe file used, parameter values set, any overrides applied.]

**Recipe/config used**: `[location of the recipe/config file in the project's actual configuration store]`  
**Run IDs**: [list of run IDs used for this validation]  

---

## 5. Results

### 5.1 Comparison Table

| Variable | Reference (mean ± σ) | Simulated | AE | RE [%] | Status |
|----------|---------------------|-----------|-----|--------|--------|
| T_tap [°C] | 1620 ± 8 | 1614 | 6.0 | 0.37% | ✓ PASS |
| [C] wt% | 0.045 ± 0.003 | 0.048 | 0.003 | 6.7% | ✓ PASS |
| [O] ppm | 450 ± 40 | 510 | 60 | 13.3% | ⚠ MARGINAL |

### 5.2 Time-Series Comparison

[Include or reference plots of simulated vs. measured profiles]

![Temperature profile comparison](figures/temperature_comparison.png)

### 5.3 Mass Balance
Closure: **0.08%** — ✓ PASS (threshold: 0.1%)

### 5.4 Energy Balance
Closure: **0.31%** — ✓ PASS (threshold: 0.5%)

---

## 6. Discussion

[Interpret the results. Where does the model agree well? Where does it diverge?
Identify the likely causes of any discrepancies. Are they acceptable given the model's scope?]

---

## 7. Limitations

[Conditions or ranges under which this validation does NOT apply.]

---

## 8. Verdict

| Criterion | Result | Status |
|-----------|--------|--------|
| Composition RMSE | 4.2% (threshold: ≤ 10%) | ✓ PASS |
| Temperature MAE | 9.3 °C (threshold: ≤ 15 °C) | ✓ PASS |
| Mass balance | 0.08% (threshold: ≤ 0.1%) | ✓ PASS |
| Energy balance | 0.31% (threshold: ≤ 0.5%) | ✓ PASS |

**Overall Verdict: ✓ VALIDATED**  
The model is validated for [conditions/process range stated here].

---

## 9. Approval

| Reviewer | Role | Decision | Date |
|----------|------|---------|------|
| | process-validation-lead | | |
| | validation-director | | |
| | User | APPROVED / REJECTED | |
