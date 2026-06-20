# Agent Coordination Map

Visual delegation and escalation paths for MetalSim Studios.

## Delegation Hierarchy

```
USER
 │
 ▼
chief-simulation-director  [DeepSeek V4 Pro]
 ├── process-domain-director  [DeepSeek V4 Pro]
 │    ├── thermodynamics-lead  [Qwen3.7 Max]
 │    │    ├── phase-equilibria-specialist  [GLM-5.2]
 │    │    ├── activity-model-specialist  [GLM-5.2]
 │    │    └── gibbs-minimization-specialist  [MiMo-V2.5-Pro]
 │    ├── reaction-kinetics-lead  [Qwen3.7 Max]
 │    │    ├── topochemical-model-specialist  [GLM-5.2]
 │    │    ├── homogeneous-kinetics-specialist  [MiMo-V2.5-Pro]
 │    │    └── dissolution-kinetics-specialist  [GLM-5.1]
 │    ├── transport-phenomena-lead  [Qwen3.7 Max]
 │    │    ├── heat-transfer-specialist  [GLM-5.2]
 │    │    ├── mass-transfer-specialist  [MiMo-V2.5-Pro]
 │    │    └── fluid-dynamics-specialist  [GLM-5.1]
 │    └── process-control-lead  [Qwen3.7 Plus]
 │         ├── pid-control-specialist  [MiniMax M2.7]
 │         ├── batch-optimization-specialist  [MiniMax M3]
 │         └── alarm-management-specialist  [GLM-5.1]
 │
 ├── software-architecture-director  [DeepSeek V4 Pro]
 │    ├── core-engine-lead  [Kimi K2.7 Code]
 │    │    ├── batch-scheduler-specialist  [Kimi K2.6]
 │    │    ├── state-manager-specialist  [Kimi K2.6]
 │    │    └── event-system-specialist  [GLM-5.2]
 │    ├── numerical-methods-lead  [Kimi K2.7 Code]
 │    │    ├── ode-solver-specialist  [MiniMax M3]
 │    │    ├── nonlinear-solver-specialist  [MiniMax M3]
 │    │    └── optimization-specialist  [GLM-5.2]
 │    ├── data-io-lead  [Kimi K2.7 Code]
 │    │    ├── config-schema-specialist  [GLM-5.1]
 │    │    ├── results-persistence-specialist  [MiniMax M2.7]
 │    │    └── data-import-specialist  [GLM-5.1]
 │    └── ui-ux-lead  [Qwen3.7 Plus]
 │         ├── dashboard-specialist  [Qwen3.6 Plus]
 │         ├── visualization-specialist  [Qwen3.6 Plus]
 │         └── recipe-editor-specialist  [GLM-5.2]
 │
 └── validation-director  [DeepSeek V4 Pro]
      ├── process-validation-lead  [DeepSeek V4 Flash]
      │    ├── benchmark-data-specialist  [GLM-5.2]
      │    └── model-calibration-specialist  [MiniMax M3]
      ├── verification-lead  [Qwen3.6 Plus]
      │    ├── unit-test-specialist  [GLM-5.1]
      │    ├── integration-test-specialist  [MiniMax M3]
      │    └── regression-test-specialist  [GLM-5.1]
      └── qa-lead  [Qwen3.6 Plus]
           ├── code-review-specialist  [GLM-5.1]
           └── documentation-specialist  [GLM-5.1]
```

## Key Cross-Domain Consultation Paths

These consultations happen frequently — not escalations, but peer reviews:

| Initiator | Consults | Topic |
|-----------|----------|-------|
| reaction-kinetics-lead | thermodynamics-lead | Thermodynamic driving force for rate laws |
| transport-phenomena-lead | reaction-kinetics-lead | Transport vs. reaction rate-limiting regime |
| core-engine-lead | numerical-methods-lead | Solver selection for new stage type |
| data-io-lead | core-engine-lead | State serialization format |
| process-validation-lead | thermodynamics-lead | Model configuration for validation runs |
| verification-lead | (all leads) | Physics knowledge for test design |

## Conflict Resolution Paths

```
Process science dispute:
  Anyone → process-domain-director → (if unresolved) → chief-simulation-director → USER

Architecture dispute:
  Anyone → software-architecture-director → (if unresolved) → chief-simulation-director → USER

Validation criteria dispute:
  Anyone → validation-director → (if unresolved) → chief-simulation-director → USER

Scope change (always):
  Anyone → chief-simulation-director → USER (mandatory)
```

## Phase Gate Ownership

| Phase | Entry Condition Owner | Exit Condition Owner |
|-------|----------------------|---------------------|
| Requirements | chief-simulation-director | chief-simulation-director + USER |
| Design | process-domain-director | software-architecture-director |
| Implementation | core-engine-lead | verification-lead |
| Validation | validation-director | validation-director + USER |
| Release | qa-lead | chief-simulation-director + USER |
