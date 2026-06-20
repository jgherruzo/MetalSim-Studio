---
description: Structured requirements elicitation for the metallurgical process simulation
agent: chief-simulation-director
---

# /requirements-gather — Process Simulation Requirements Elicitation

Invoke **chief-simulation-director** with support from **process-domain-director**.

## Workflow

### 0. Check the Knowledge Base First
Before asking the user anything, read `docs/knowledge-base/INDEX.md`. If the
user has already dropped in process specs, plant data, or vendor documents
for this project, use them to pre-fill as much of the requirements below as
possible — then confirm with the user instead of asking from a blank slate.

If the index is empty or has nothing relevant, tell the user this is a good
time to add any reference documents they have (process flowsheets, plant
data exports, literature, vendor datasheets) to `docs/knowledge-base/`
before continuing, since requirements gathered now are much better grounded
in real data than in general process knowledge.

If documents get added mid-conversation, read them, extract what's relevant,
and **add a row to `docs/knowledge-base/INDEX.md`** before moving on — don't
leave a newly-added document untagged for the next session to rediscover.

### 1. Process Description
Collect: process name, industrial context, feedstock composition, target product, batch size, typical cycle time.

### 2. Stage Definition
For each batch stage:
- Stage name and industrial description
- Duration (typical, min, max)
- Temperature range [°C]
- Pressure [bar]
- Key reactions occurring
- Inputs added / outputs removed during stage
- Control variables (what operator controls)
- Stage-end criterion

### 3. Species & Phase List
- All chemical species (formula, name, role)
- Phases present in the system: solid(s), liquid metal, liquid slag, aqueous, gas
- Species distribution across phases

### 4. Simulation Outputs Required
- Time-series outputs: which variables vs. time
- Batch summary KPIs: yield, recovery, energy consumption, cycle time
- Derived quantities: liquidus temperature, viscosity, etc.

### 5. Data Availability
- Thermodynamic data: database available? Parameters known?
- Kinetic data: rate laws published? Need estimation?
- Transport data: property correlations available?
- Validation data: plant data or literature available?

### 6. Deliverable
Produce `design/srd/process-science-requirements.md` with all collected requirements structured by section. Cite which knowledge-base documents informed which sections, so future readers know the provenance. Present to user for approval before saving.
