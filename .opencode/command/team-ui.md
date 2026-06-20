---
description: Coordinate the UI/UX team to build or improve a dashboard, visualization, or recipe editor feature
agent: software-architecture-director
---

# /team-ui — UI/UX Team Coordination

Invoke **ui-ux-lead** to coordinate **dashboard-specialist**, **visualization-specialist**, and **recipe-editor-specialist**.

## Typical Use Cases
- Adding a new results view for a process model
- Building the initial dashboard for a new UI framework
- Adding a new plot type for a new output variable
- Improving the recipe editor for a new stage type

## Coordination Flow
1. **ui-ux-lead** defines the screen layout and user interaction model
2. Present mockup/wireframe to user for approval before implementation
3. **dashboard-specialist** handles: control panel, KPI cards, run monitoring
4. **visualization-specialist** handles: time-series, phase diagrams, sweep plots
5. **recipe-editor-specialist** handles: stage builder, process flow diagram
6. **ui-ux-lead** reviews integration: consistent styling, correct unit display

## UI Rules (enforced by ui-ux-lead)
- Every quantity display must show units: "1523 °C", "87.3 mol%", "2.4 GJ/t"
- No process-specific logic in UI code — UI is generic, data comes from results schema
- All plots exportable as PNG (300 dpi) and SVG
- Long-running simulations use progress callbacks — UI never blocks
- Color scheme: a defined engineering palette, not a plotting library's
  default — once a UI framework is chosen, this gets defined once and
  reused everywhere rather than improvised per-screen

## Before Starting Implementation
- Confirm UI framework choice with user if not already decided
- Check whether a shared style/plot-styling module already exists in the
  project (for color palette, font sizes) — check `design/architecture/`
  if unsure where that would live
- Check how the project's actual results-loading code works before writing
  new loading logic — don't duplicate it
