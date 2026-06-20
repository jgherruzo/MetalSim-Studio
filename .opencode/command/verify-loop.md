---
description: Run a self-verifying loop over a batch of verifiable units — plan, dispatch, verify against source, reject and requeue until clean
agent: validation-director
---

# /verify-loop — Self-Verifying Loop

Invoke **validation-director** as loop coordinator.

## What This Is

A generic pattern for any batch of independently-checkable work where
"looks plausible" isn't good enough and every claim needs to trace to a
real source. Two built-in use cases ship with this command, but the pattern
generalizes to any batch of verifiable units.

**Adapted from the "self-verifying loop" pattern** (plan → dispatch →
verify → reject/requeue → repeat until clean), credit to the public
write-up by [@0xRicker](https://x.com/0xRicker) describing a 300-agent
research swarm with an Opus verifier. The mechanics are the same; the
checklist content here is rewritten for metallurgical simulation, and the
scale claim is honest — this project runs a handful of specialists per
department, not hundreds of parallel agents. What's borrowed is the
discipline (nothing ships until a clean verify pass), not the throughput.

## Built-In Use Cases

### Use Case A: Batch Model Validation
Verify a set of process models against the project's reference datasets
(check `docs/knowledge-base/INDEX.md` for what's catalogued) in one loop
instead of running `/validate-model` one at a time with no cross-checking
discipline.

### Use Case B: Report KPI Verification
Verify every numeric claim in a generated simulation report traces to the
actual run output before the report is considered final — catches the
"report says 94.2% but the file says 91.7%" class of error before it
reaches the user.

### Use Case C: Anything Else
Any other batch of checkable claims (literature citations in a new SRD
section, parameter values across a calibration run, etc.) — define the
units and checklist following the same structure.

---

## Workflow

### 1. PLAN — Define the Batch and the Checklist
- Identify the batch: what is the list of independent units to verify?
  (e.g., "12 process models," "every KPI line in report.html," "every
  citation in the new PSRD section")
- For each unit type, write a checklist following
  `docs/templates/verify-checklist-template.md` — every item needs
  ASSERTION, SOURCE, TOLERANCE, ON FAIL.
- Present the checklist to the user before dispatching. A loop with a weak
  checklist is worse than no loop — it creates false confidence.

### 2. DISPATCH — Delegate Execution
- Break the batch into units and delegate to the relevant lead(s) via the
  Task tool (e.g., `process-validation-lead` for model validation units,
  `dashboard-specialist`/`results-persistence-specialist` for report KPI
  units).
- Units that are genuinely independent can be delegated in the same turn;
  don't force artificial sequencing where there's no real dependency.
- Each delegated unit gets the checklist items relevant to it, not the
  whole batch's checklist.

### 3. VERIFY — Check Every Returned Unit Against Its Source
- For every returned unit, re-derive the check yourself (or have
  `verification-lead` re-derive it) rather than accepting the executing
  agent's self-report. Open the actual file, recompute the actual number,
  resolve the actual citation.
- Mark each unit PASS or REJECT. A REJECT must carry the specific ON FAIL
  reason from the checklist item that failed — never a bare "failed."

### 4. REJECT & REQUEUE
- Any rejected unit goes back to step 2 with its rejection reason attached,
  so the re-attempt has concrete information about what to fix.
- Track which units have failed multiple times — a unit failing the same
  check twice usually means the checklist item itself needs a second look,
  not just another blind retry.

### 5. REPEAT — Until Clean or Until Stuck
- Continue passes until a full pass rejects zero units.
- **Stop and escalate to the user** if rejections aren't decreasing after 3
  passes — at that point, keep looping blindly is wasted effort; the
  checklist or the underlying model likely needs human judgment.
- Report pass-by-pass results in this format:

```
VERIFY-LOOP REPORT — [batch description] — [date]
====================================================
Pass 1: 14 checked, 11 passed, 3 rejected
  - unit_07: mass balance closure 0.34% (threshold 0.1%)
  - unit_09: citation in docstring does not resolve
  - unit_12: Ea = 480 kJ/mol outside plausible range

Pass 2: 3 checked, 2 passed, 1 rejected
  - unit_12: Ea = 480 kJ/mol outside plausible range (still failing —
    flagging for user review rather than a 3rd blind retry)

LOOP STOPPED: 1 unit still failing after 2 requeue attempts.
Escalating unit_12 to user — recommend reviewing the literature source
for this activation energy rather than re-running automatically.
```

### 6. Final Output
- For a clean loop: confirmation that every unit passed, with the full
  checklist results saved to
  `docs/technical/validation-reports/verify-loop-[date].md` (model
  validation use case) or attached to the report generation record
  (KPI verification use case).
- For a stuck loop: the escalation above, with the user deciding whether to
  revise the checklist, accept the discrepancy with documented rationale,
  or dig further with a specialist.

## When NOT to Use This
- Single, simple checks with no real batch (just ask the relevant agent
  directly, or use `/mass-balance-check` / `/energy-balance-check` /
  `/validate-model` for the one-off case)
- Subjective quality judgments with no source to verify against (e.g., "is
  this UI layout good?") — the loop only adds value when there's a real
  artifact to check claims against
