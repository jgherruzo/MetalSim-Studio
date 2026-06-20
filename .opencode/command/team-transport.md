---
description: Coordinate the transport phenomena team on heat/mass transfer modeling tasks
agent: process-domain-director
---

# /team-transport — Transport Phenomena Team Coordination

Invoke **transport-phenomena-lead** to coordinate **heat-transfer-specialist**, **mass-transfer-specialist**, and **fluid-dynamics-specialist**.

## Typical Use Cases
- Adding transport models for a new process or stage type
- Implementing heat losses for a new furnace geometry
- Adding interfacial mass transfer to a new slag-metal system
- Debugging energy balance discrepancies

## Coordination Flow
1. **transport-phenomena-lead** identifies which transport mechanisms are relevant
2. **heat-transfer-specialist** handles: wall losses, radiation, electrode heating, Cp(T) data
3. **mass-transfer-specialist** handles: gas-slag, slag-metal interphase mass transfer coefficients
4. **fluid-dynamics-specialist** handles: mixing time, stirring model, bubble dynamics
5. **transport-phenomena-lead** verifies coupling: heat and mass source terms are consistent
6. Cross-check with **reaction-kinetics-lead**: transport-limited vs. reaction-limited regime

## Coupling Protocol
Transport modules provide **source terms** to the stage ODE system:
```python
# Heat source term [W] or [J/s]
Q_arc = electrode_heating.compute(power_kW, arc_efficiency)
Q_wall_loss = wall_conduction.compute(T_bath_K, T_ambient_K, geometry)

# Mass transfer flux [mol/s]
J_O2 = gas_slag_transfer.compute(C_O2_gas, C_O2_slag_eq, k_L, A_interface)
```

These feed directly into the ODE right-hand side. **Never call thermodynamics or kinetics from transport modules** — data flows one way through the interface.

## Integration Test
After team completes work: run the energy balance check (`/energy-balance-check`) on a test scenario to confirm closure within 0.5%.
