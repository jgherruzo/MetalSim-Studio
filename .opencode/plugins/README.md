# Session Memory Plugin

This plugin preserves session state for MetalSim Studios using OpenCode local plugin hooks.

## Purpose

- On `session.created`, it reads `production/session-state/last-session.md` if available and logs whether prior context is present.
- On `session.idle`, it writes an updated `production/session-state/last-session.md` summary.
- On `experimental.session.compacting`, it injects the current session summary into the compaction context.

## Why this is tooling, not simulator code

This file is part of OpenCode harness tooling. It lives under `.opencode/plugins/` and does not introduce any simulation language, model, or solver implementation.

## Notes

- The plugin uses `client.app.log()` for structured logging.
- It stores per-session state in a `Map` keyed by `sessionId`, avoiding global variable misuse.
- If the experimental compaction hook is unavailable, the plugin still provides file-based session state persistence via `session.created` and `session.idle`.
