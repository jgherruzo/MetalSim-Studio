# Domain Standards — Metallurgical Simulation

## Units Policy (SI internally, display with conversion)

| Quantity | Internal (SI) | Display / I/O |
|----------|---------------|---------------|
| Temperature | K | C (display) |
| Pressure | Pa | bar, atm |
| Amount | mol | kg with MM |
| Energy | J | kJ, GJ/t |
| Rate (vol.) | mol/(m3*s) | — |
| Composition | mol fraction | wt%, mol% |

Rule: variable names encode units — temperature_K, enthalpy_J_per_mol

## Physical Plausibility (check every time step)
- Temperature: 200 K < T < 5000 K
- All phase amounts >= 0
- Sum of phase fractions = 1.0 +/- 1e-8

## Thermodynamic Consistency
- K = exp(-dG/RT) for all equilibrium constants
- Gibbs-Duhem satisfied for all activity models
- Detailed balance: r_fwd/r_rev = K_eq

## Precision
- float64 always (never float32)
- rtol=1e-6, atol=1e-8 default solver tolerances

## Physics Function Documentation (mandatory)
Every equation function must have: formula, args with units, returns with units, reference.
