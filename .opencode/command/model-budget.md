---
description: Report OpenCode Go model tier usage and suggest cost-aware delegation guidance for this project.
agent: chief-simulation-director
---

# /model-budget — OpenCode Go Model Budget Report

Use this command to understand which agents are assigned to which OpenCode Go
model tier and to identify cases where a cheaper agent may be sufficient.

## What This Is

This is a reporting/awareness command only. It does not change any model
assignments automatically.

OpenCode Go is a shared subscription for this project. The studio currently
runs 46 agents on one account, so every expensive model call counts toward the
same budget limit.

## What It Reports

- The current model assigned to each agent
- The relative cost tier of each agent's model
- Roles that are likely to be time- or rigor-sensitive and therefore justify a
  pricy model
- Roles where a cheaper model may be acceptable for routine or exploratory
  work, provided scientific rigor is not compromised

## Cost-Aware Delegation Principles

- Never trade scientific rigor for token savings. The goal is to use the least
  expensive agent that can still do the task correctly.
- Prefer a director only for scope, escalation, coordination, or quality-gate
  decisions. For routine scientific or implementation work, a lead or
  specialist is usually the right level.
- If a role is already assigned an expensive model only because it is the
  default director/lead, ask whether that task could be handled by a cheaper
  specialist first.
- Preserve rigorous review paths: use cheaper agents for execution when valid,
  but keep the expensive-model director/ or lead-level review step for any
  final acceptance gate where the extra reasoning power matters.

## When to Use `/model-budget`

- Before launching a large batch of verification or modeling work
- When the shared OpenCode Go budget is running low
- When you want to document a delegation decision that trades token cost for
  deliberate, justified efficiency rather than blind thrift

## Example Questions

- "Which agents in this project are using the costliest OpenCode Go models?"
- "Which of these roles could safely run on a cheaper model for a routine
  check?"
- "Where should I keep the expensive director/lead allocations for final
  verification only, not for every exploratory turn?"
