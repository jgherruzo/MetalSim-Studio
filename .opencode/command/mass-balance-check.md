---
description: Run and report a complete mass balance check on a simulation result
agent: process-domain-director
---

# /mass-balance-check — Mass Balance Verification

Invoke **process-domain-director** with **data-io-lead**.

## Workflow

1. Load the specified simulation result (from the project's actual results store, or the last run)
2. For each element present in the system:
   - Sum element in all input streams (feed, reagent additions)
   - Sum element in all output streams (product, off-gas, slag tapping)
   - Calculate: closure = (input - output) / input × 100%
3. Flag any element with closure > 0.5% for investigation
4. Identify the likely source of imbalance (phase not tracked, missing reaction, unit error)
5. Produce mass balance table with all elements and streams

## Output Format
```
MASS BALANCE REPORT — [Run ID] — [Timestamp]
=============================================
Element | Input [mol] | Output [mol] | Closure [%] | Status
--------|-------------|--------------|-------------|--------
Fe      | 1000.0      | 999.3        | 0.07%       | ✓ PASS
Cu      | 150.0       | 148.1        | 1.27%       | ✗ WARN
O       | 2300.0      | 2297.8       | 0.10%       | ✓ PASS
```
