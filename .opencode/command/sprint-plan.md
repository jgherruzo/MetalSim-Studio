---
description: Plan a development sprint with tasks assigned to the right agents
agent: chief-simulation-director
---

# /sprint-plan — Sprint Planning

Invoke **chief-simulation-director** with all department leads.

## Sprint Planning Workflow

1. **chief-simulation-director** reviews current project status and backlog
2. Present backlog items grouped by department
3. User selects priority items for this sprint
4. Assign each item to responsible agent (lead or specialist)
5. Estimate effort (S/M/L) per item
6. Identify dependencies between items
7. Confirm sprint goal: what will be demonstrably working at sprint end?

## Sprint Document Template
Saved to `production/sprint-[N].md`:
```
Sprint N | Start: [date] | End: [date]
Goal: [one sentence describing the sprint outcome]

| Task | Agent | Estimate | Depends on | Status |
|------|-------|----------|------------|--------|
| ... |
```
