---
description: Run a standard benchmark scenario to verify simulator performance and accuracy
agent: validation-director
---

# /benchmark-run — Standard Benchmark Run

Invoke **verification-lead** with **process-validation-lead**.

## Purpose
Execute a predefined benchmark scenario with known analytical or literature solution.
Used to: verify a new model implementation, check after refactoring, and establish performance baselines.

## Available Benchmarks

### Benchmark 1: Isothermal Binary Equilibrium
- Single liquid phase, binary system, ideal solution
- Analytical solution: Raoult's law
- Expected: composition matches ideal to within 1e-6

### Benchmark 2: Simple Cooling — Stefan Problem (Solidification)
- Pure metal cooling from above liquidus, tracking solidification front
- Analytical solution: Neumann's solution
- Expected: solidification front position matches analytical within 0.5%

### Benchmark 3: Single Shrinking Core Reduction
- Spherical particle of FeO reducing with H2 at constant T and P
- Analytical solution (gas-film control): X(t) = 1 - (1 - t/tau)
- Expected: conversion profile matches analytical within 1%

### Benchmark 4: Multi-Stage EAF Heat Balance
- Electric arc furnace: charge, meltdown, refining stages
- Reference: published mass/energy balance from literature
- Expected: final temperature and composition within stated literature range

## Workflow
1. Select benchmark(s) to run
2. Execute simulation(s)
3. Compare to analytical/literature solution automatically
4. Output: PASS / FAIL with deviation table
5. Log the result in the project's regression-test record — location and
   format depend on the chosen tech stack; check `design/architecture/`
   for where this lives, or ask `verification-lead` if unsure

## Running All Benchmarks
Run via whatever test runner the project's chosen stack uses (e.g.,
`pytest` if Python was chosen) — check `design/architecture/` for the
actual command, since this depends on decisions made with
`software-architecture-director`.
