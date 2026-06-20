# Process Science Requirements Document (PSRD)
## [Project Name] — [Process Name]

**Version**: 0.1-draft  
**Author**: [Name]  
**Date**: [Date]  
**Status**: DRAFT / REVIEW / APPROVED  

---

## 1. Process Overview

**Process Name**: [e.g., Electric Arc Furnace Steelmaking]  
**Industrial Context**: [Where this process is used, typical capacity, importance]  
**Simulation Purpose**: [What decisions this simulation supports]  
**Batch Size (reference)**: [e.g., 120 t heat]  

---

## 2. Batch Cycle Structure

| Stage | Description | Duration (typical) | T range [°C] | P [bar] |
|-------|-------------|-------------------|--------------|---------|
| 1. Charge | Loading scrap into furnace | 5–10 min | 20–800 | 1.0 |
| 2. Meltdown | Arc melting of scrap | 30–50 min | 800–1550 | 1.0 |
| 3. Refining | Composition adjustment | 15–25 min | 1550–1620 | 1.0 |
| 4. Tapping | Pouring to ladle | 3–5 min | 1600–1650 | 1.0 |

---

## 3. Chemical System

### 3.1 Species

| Formula | Name | Phase(s) | Role |
|---------|------|---------|------|
| Fe | Iron | L_metal, S | Main product |
| C | Carbon | L_metal | Solute / reductant |
| O | Oxygen | L_metal | Oxidant (dissolved) |
| FeO | Iron oxide | L_slag, S | Slag component |
| SiO2 | Silica | L_slag | Slag component |
| CaO | Lime | L_slag | Flux |
| CO | Carbon monoxide | gas | Off-gas product |
| CO2 | Carbon dioxide | gas | Off-gas product |

### 3.2 Phases

| Phase ID | Name | State | Key Species |
|----------|------|-------|-------------|
| L_metal | Liquid steel | Liquid | Fe, C, Mn, Si, O, S, P |
| L_slag | Liquid slag | Liquid | FeO, CaO, SiO2, MgO, Al2O3 |
| gas | Furnace atmosphere | Gas | CO, CO2, N2, O2 |
| S_scrap | Solid scrap | Solid | Fe (initial) |

---

## 4. Key Reactions

| # | Reaction | Type | Rate-Controlling Mechanism |
|---|---------|------|---------------------------|
| R1 | C + O → CO | Decarburization | Mixed: mass transfer + chemical |
| R2 | FeO (slag) ↔ Fe (metal) + O | Slag-metal exchange | Mass transfer limited |
| R3 | S (metal) + CaO → CaS + O | Desulfurization | Mass transfer at slag-metal |
| R4 | Fe (s) → Fe (l) | Scrap melting | Heat transfer limited |

---

## 5. Thermodynamic Models Required

| System | Model | Database |
|--------|-------|---------|
| Liquid steel (Fe-C-Mn-Si-O-S) | Wagner UIP / Hess | Published εᵢⱼ |
| Slag (CaO-SiO2-FeO-MgO-Al2O3) | Modified Quasichemical | FToxid |
| Gas phase | Ideal gas | JANAF |

---

## 6. Required Simulation Outputs

### Time-Series (vs. time within each stage)
- [ ] Bath temperature [°C]
- [ ] Carbon content in steel [wt%]
- [ ] Oxygen content in steel [ppm]
- [ ] FeO content in slag [wt%]
- [ ] CO/CO2 off-gas flow rate [Nm³/min]

### Batch Summary KPIs
- [ ] Metal yield [%]
- [ ] Final steel composition [wt% each element]
- [ ] Total electrical energy [kWh/t]
- [ ] Total cycle time [min]
- [ ] Slag volume and composition at tapping

---

## 7. Validation Data Available

| Type | Source | Variables | # Data Points |
|------|--------|---------|---------------|
| Literature | [Author, Year, Journal] | Temperature profile | 1 campaign |
| Plant data | [Source, confidential?] | Tap composition | 50 heats |

---

## 8. Simplifications and Out-of-Scope

### In Scope
- [List what IS modeled]

### Out of Scope (with justification)
- CFD/fluid flow inside furnace — lumped mixing model sufficient for this purpose
- Electrode wear — not relevant to process chemistry simulation
- [Other exclusions]

---

## 9. Approval

| Reviewer | Role | Status | Date |
|----------|------|--------|------|
| | Process Domain Director | PENDING | |
| | Chief Simulation Director | PENDING | |
| | User | PENDING | |
