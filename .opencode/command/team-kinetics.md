---
description: Coordinate kinetics department on a new reaction system
agent: process-domain-director
---

# /team-kinetics — Kinetics Team Coordination

Invoke **reaction-kinetics-lead** to coordinate kinetics specialists.

## Typical Use Cases
- Adding kinetic model for a new reaction or process
- Extending an existing model to new temperature/composition range
- Resolving thermodynamic-kinetic coupling issues

## Coordination Flow
1. **reaction-kinetics-lead** defines reaction list and rate-controlling mechanisms
2. Assign to correct specialist: topochemical / homogeneous / dissolution
3. Implement rate laws with activity-corrected driving forces
4. Integration check with **thermodynamics-lead**: verify rates → 0 at equilibrium
5. Unit tests for each rate model
6. Integration test: verify conversion profiles against known data
