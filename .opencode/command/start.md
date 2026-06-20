---
description: Guided onboarding — define process, simulation objectives, and configure the team
agent: chief-simulation-director
---

# /start — MetalSim Studios Onboarding

Invoke **chief-simulation-director** to guide the onboarding flow.

## Instructions for chief-simulation-director

Walk the user through these steps in sequence. Ask one question at a time. After each answer, confirm before proceeding.

### Step 1: Project Status
Ask: "Where are you starting from?"
- A) Brand new — no process defined yet
- B) I have a process type in mind but no model yet
- C) I have existing model equations to implement
- D) Existing codebase to extend or refactor

### Step 2: Process Type Selection (if A or B)
Present the process categories. Direct to `/process-select` for detailed selection.

### Step 3: Simulation Objectives
Ask what the simulation will be used for:
- [ ] Process understanding / teaching
- [ ] Operating recipe optimization
- [ ] Scale-up support
- [ ] Troubleshooting / fault diagnosis
- [ ] Digital twin / real-time coupling
- [ ] Other (describe)

### Step 4: Fidelity Level
Ask what level of model fidelity is needed:
- Simple (mass/energy balance, equilibrium, no kinetics): fast, less data-hungry
- Medium (kinetic models, basic transport): typical engineering use
- High fidelity (detailed transport, CFD-coupling): research/advanced

### Step 5: Technology Confirmation
Confirm or choose:
- Thermodynamic database backend
- UI framework
- Programming language (Python default)

### Step 6: Team Activation
Based on answers, activate the relevant department leads:
- Always: core-engine-lead, data-io-lead, verification-lead
- If kinetics needed: reaction-kinetics-lead
- If transport needed: transport-phenomena-lead
- If optimization needed: process-control-lead
- If UI requested: ui-ux-lead

### Step 7: Generate Initial Documents
- Create `design/srd/project-overview.md` with all collected information
- Create starter batch recipe template
- Create initial sprint plan for first milestone

After completing: "Your MetalSim Studios team is configured. Use `/requirements-gather` to detail the process model requirements, or `/sprint-plan` to organize the first development sprint."
