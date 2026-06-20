# Verification Checklist Template

This is the most important artifact in any `/verify-loop` run. A loop with a
vague checklist catches nothing; a loop with a checklist of concrete,
source-traceable assertions catches real errors. Write this **before**
dispatching any work, not after.

---

## What Makes a Checklist Item Strict Enough

A weak item asks for a judgment call:
> "Does the mass balance look reasonable?"

A strict item asks for a comparison against a real artifact, with an
explicit pass/fail boundary:
> "Mass balance closure = |Σmol_in − Σmol_out| / Σmol_in. Computed from
> [the project's actual run-output location for this run]. PASS if ≤ 0.001
> (0.1%). Cite the exact closure value computed, not a restatement of the
> threshold."

The difference: the strict version forces the verifier to actually open the
file and compute the number, not just trust that the executing agent did.
If the verifier can pass an item without touching a real data source,
rewrite the item.

---

## Checklist Item Anatomy

Every item needs all four parts:

```
ASSERTION:  [What must be true, stated as a checkable fact, not a vibe]
SOURCE:     [Exact file path, dataset row, or equation the assertion must
             trace back to — never "general knowledge" or "as expected"]
TOLERANCE:  [Numeric threshold or exact-match requirement — no "roughly"]
ON FAIL:    [What rejection reason gets attached when this fails, so the
             requeued task knows exactly what to fix]
```

---

## Worked Example — Validating a Kinetic Model

> **Note**: the file paths below (`data/validation-sets/...`,
> `src/thermodynamics/...`) are illustrative placeholders showing what a
> *fully specified* SOURCE field looks like — they are not real paths in
> this project. Substitute your project's actual reference-dataset
> location and code layout once those exist.

```markdown
UNIT: Shrinking-core model for FeS2 oxidation (POX process)
ASSIGNED TO: topochemical-model-specialist

CHECKLIST:

1. ASSERTION:  Predicted conversion at t=4h matches reference data within
               tolerance.
   SOURCE:     [project's reference dataset location]/DS-07-pyrite-oxidation.csv,
               column "conversion_4h"
   TOLERANCE:  |predicted - reference| / reference ≤ 0.05 (5% relative)
   ON FAIL:    "Conversion mismatch: predicted {X}, reference {Y} from
               DS-07 row {N}, relative error {Z}% exceeds 5% tolerance.
               Check rate constant or activation energy."

2. ASSERTION:  Rate law returns exactly zero at the equilibrium conversion
               (thermodynamic consistency).
   SOURCE:     Direct computation: call the project's rate-law function at
               the equilibrium conversion for this system (wherever that's
               implemented in the project's actual codebase).
   TOLERANCE:  |rate(X_eq)| ≤ 1e-10 (numerical zero)
   ON FAIL:    "Rate law does not vanish at equilibrium: rate(X_eq) = {V}.
               Thermodynamic consistency violated — review driving force
               term."

3. ASSERTION:  Activation energy parameter is in physically plausible range.
   SOURCE:     The Ea value used in the implementation, read directly from
               wherever this project's shrinking-core rate model actually
               lives in code.
   TOLERANCE:  15 kJ/mol ≤ Ea ≤ 350 kJ/mol
   ON FAIL:    "Ea = {V} kJ/mol is outside the physically plausible range
               for solid-state/gas-solid reactions. Verify against
               literature source cited in the docstring."

4. ASSERTION:  Every numeric parameter in the implementation has a literature
               citation in its docstring.
   SOURCE:     Docstring of the implementing function/class.
   TOLERANCE:  Exact requirement — citation present and resolvable (a real
               paper, DOI, or entry in docs/knowledge-base/), not "not yet
               documented citation pending."
   ON FAIL:    "Missing or unresolvable citation for parameter {name}.
               Docstring must name a real source."
```

---

## Worked Example — Verifying a Simulation Report KPI

> **Note**: the file paths and format below (`outputs/[run_id]/results.h5`,
> `src/io/hdf5_writer.py`) are illustrative placeholders — they assume
> HDF5 as a results format only as an example. Substitute your project's
> actual results storage format and location once those have been decided
> with `software-architecture-director`.

```markdown
UNIT: "Metal yield: 94.2%" claim in batch summary report
ASSIGNED TO: dashboard-specialist (report generation)

CHECKLIST:

1. ASSERTION:  The 94.2% figure is computed from actual run output, not
               estimated or carried over from a different run.
   SOURCE:     [project's actual results store]/run_[id]/summary/metal_yield_pct
   TOLERANCE:  Exact match (the report must show the literal stored value)
   ON FAIL:    "Report shows {claimed}% but the stored run output contains
               {actual}% for run {run_id}. Report is not reading from the
               correct run output."

2. ASSERTION:  The yield calculation method (mass out / mass in × 100) is
               correctly applied — not a different formula mislabeled as
               "yield."
   SOURCE:     Whichever function in the project's actual codebase wrote
               this summary field — check `design/architecture/` if unsure
               where that lives.
   TOLERANCE:  Formula must match the definition in
               docs/domain-standards.md exactly.
   ON FAIL:    "Yield formula doesn't match documented definition — recheck
               which masses are included/excluded."
```

---

## Anti-Patterns to Avoid

- **"Looks correct"** — not a checklist item, it's an opinion. Replace with
  a specific comparison.
- **Verifying against the same agent's own restatement** — if the
  specialist who built the model is also the one confirming it matches the
  reference, that's not independent verification. The verify step in
  `/verify-loop` should re-derive the check itself when feasible, not just
  ask the original agent "are you sure?"
- **Tolerances with no stated basis** — every tolerance should trace to
  `docs/domain-standards.md` or `design/srd/validation-plan.md`, not be
  invented per-checklist for convenience.
- **Skipping the "ON FAIL" reason** — a rejection with no reason just bounces
  back into the queue with no information; the requeued attempt will likely
  fail the same way again.
