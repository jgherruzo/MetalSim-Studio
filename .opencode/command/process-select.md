---
description: Select and configure the target metallurgical process
agent: process-domain-director
---

# /process-select — Metallurgical Process Selection

Invoke **process-domain-director**.

## Process Categories

### Pyrometallurgy
- **EAF (Electric Arc Furnace)**: scrap melting, steel/alloy production
- **BOF/Converter**: steel refining, dephosphorization, desulfurization  
- **Ladle Furnace**: secondary metallurgy, alloy additions, temperature homogenization
- **Flash Smelting**: copper/nickel concentrate smelting (Outotec process)
- **Isasmelt/Ausmelt**: bath smelting for copper, lead, tin
- **Submerged Arc Furnace**: ferroalloy production (FeMn, FeCr, FeSi)
- **Aluminum Smelting**: Hall-Héroult process (electrolytic)
- **Lead Blast Furnace**: lead/zinc smelting
- **Roasting**: sulfide oxidation, prereduction

### Hydrometallurgy
- **Pressure Oxidation (POX)**: refractory gold, base metal sulfides
- **Atmospheric Leaching**: copper oxide, zinc oxide, nickel laterite
- **Heap Leaching**: large-scale copper, gold leaching
- **CIL/CIP**: carbon-in-leach / carbon-in-pulp gold recovery
- **SX-EW**: solvent extraction + electrowinning (copper, cobalt)
- **Cementation**: copper recovery by iron

### Physical Metallurgy
- **Casting / Solidification**: ingot, continuous casting, die casting
- **Heat Treatment**: annealing, normalizing, hardening + tempering
- **Precipitation / Aging**: aluminum alloys, superalloys

## Selection Output
After selection: generate process-specific starter recipe template + identify required model modules + flag known thermodynamic databases for that system.
