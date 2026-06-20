---
description: Coordinate full thermodynamics department on a coupled task
agent: process-domain-director
---

# /team-thermodynamics — Thermodynamics Team Coordination

Invoke **thermodynamics-lead** to coordinate **phase-equilibria-specialist**, **activity-model-specialist**, and **gibbs-minimization-specialist**.

## Typical Use Cases
- Implementing a new metallurgical system (new element set, new process)
- Updating thermodynamic database for an existing system
- Debugging thermodynamic inconsistencies

## Coordination Flow
1. **thermodynamics-lead** assesses scope and divides work
2. **gibbs-minimization-specialist** ensures species database and G°(T) data are ready
3. **activity-model-specialist** implements/updates activity models for each phase
4. **phase-equilibria-specialist** implements phase equilibrium calculator for the system
5. **thermodynamics-lead** reviews all three components for consistency
6. Integration test: verify phase diagram reproduces known binary/ternary data
