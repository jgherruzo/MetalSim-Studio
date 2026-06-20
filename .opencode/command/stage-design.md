---
description: Design a new batch stage — define its physics, control logic, transitions, and recipe schema
agent: process-domain-director
---

# /stage-design — Batch Stage Design

Invoke **process-domain-director** → **process-control-lead** → **core-engine-lead**.

## What is a Stage?
A batch stage is one discrete phase of the batch cycle (e.g., "Charge", "Meltdown", "Refining", "Tapping").
Each stage has a defined start state, governing dynamics, control logic, and end criterion.

## Design Checklist

### 1. Stage Identity
- Name (machine-readable slug, e.g. `oxidative_refining`)
- Description (human-readable, 1–2 sentences)
- Type: `pyrometallurgical` / `hydrometallurgical` / `physical_metallurgy` / `transfer`

### 2. Physical Conditions
- Temperature range [°C or K]
- Pressure [bar]
- Phases present (list all: solid, liquid metal, slag, gas, aqueous)
- Duration (typical, min, max in seconds)

### 3. Mass Inputs During Stage
- Additions: material, quantity, timing (continuous / at t=0 / pulsed)
- Off-gas removal: species removed, flow rate model

### 4. Reactions Active
- List each reaction by name
- Rate model type for each
- Whether equilibrium or kinetically controlled

### 5. Control Variables
- What does the operator control during this stage?
  (e.g., power input, oxygen flow rate, coolant flow, temperature setpoint)
- Setpoint profile: ramp / step / hold

### 6. Stage End Criterion
- Time-based: `duration_s: 1800`
- Condition-based: `end_when: "state.composition['FeO_slag'] < 0.005"`
- Combined: first of time OR condition

### 7. Outputs Generated
- Product stream: what leaves at stage end
- Samples: what would be sampled for laboratory analysis

### Output
- Stage definition document: `design/process-models/stages/[stage-name].md`
- A stage fragment in whatever recipe/config format the project's
  architecture has settled on (ready to incorporate into a full recipe) —
  if no format has been chosen yet, write this stage definition in plain
  prose/structured markdown instead of guessing a format
- List of module implementations required (assign to specialists)
