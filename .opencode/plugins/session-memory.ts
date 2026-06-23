export const SessionMemoryPlugin = async ({ client, directory }) => {
  const fs = await import("node:fs/promises")
  const path = await import("node:path")
  const sessionState = new Map<string, {
    sessionId: string
    createdAt: string
    lastIdleAt: string | null
    lastEventType: string
    priorSummary: string
    openDecisions: string[]
    activeFiles: string[]
    pendingTasks: string[]
  }>()

  const summaryFile = path.join(directory, "production", "session-state", "last-session.md")

  const ensureSessionId = (event: any) => {
    return event?.sessionId ?? event?.session?.id ?? event?.payload?.sessionId ?? event?.session?.sessionId ?? "unknown"
  }

  const loadPriorSummary = async () => {
    try {
      return await fs.readFile(summaryFile, "utf8")
    } catch {
      return ""
    }
  }

  const formatSummary = (state: {
    sessionId: string
    createdAt: string
    lastIdleAt: string | null
    lastEventType: string
    priorSummary: string
    openDecisions: string[]
    activeFiles: string[]
    pendingTasks: string[]
  }) => {
    return [
      "# Session summary",
      "",
      `- session id: ${state.sessionId}`,
      `- created at: ${state.createdAt}`,
      `- last idle event: ${state.lastIdleAt ?? "n/a"}`,
      `- last event type: ${state.lastEventType}`,
      "",
      "## Open decisions",
      state.openDecisions.length > 0
        ? state.openDecisions.map((item) => `- ${item}`).join("\n")
        : "- <no explicit open decisions captured>",
      "",
      "## Active files",
      state.activeFiles.length > 0
        ? state.activeFiles.map((item) => `- ${item}`).join("\n")
        : "- <no active files explicitly captured>",
      "",
      "## Pending tasks",
      state.pendingTasks.length > 0
        ? state.pendingTasks.map((item) => `- ${item}`).join("\n")
        : "- <no pending tasks explicitly captured>",
      "",
      "## Prior session summary",
      state.priorSummary ? state.priorSummary.trim() : "- none",
      "",
      "_This file is maintained by .opencode/plugins/session-memory.ts. It is OpenCode harness tooling, not simulator source code._",
    ].join("\n")
  }

  const saveSummary = async (sessionId: string) => {
    const state = sessionState.get(sessionId)
    if (!state) {
      return
    }

    await fs.mkdir(path.dirname(summaryFile), { recursive: true })
    await fs.writeFile(summaryFile, formatSummary(state), "utf8")
  }

  const log = async (message: string, extra: Record<string, unknown>) => {
    await client.app.log({
      body: {
        service: "session-memory",
        level: "info",
        message,
        extra,
      },
    })
  }

  return {
    "session.created": async (event: any) => {
      const sessionId = ensureSessionId(event)
      const priorSummary = await loadPriorSummary()
      sessionState.set(sessionId, {
        sessionId,
        createdAt: new Date().toISOString(),
        lastIdleAt: null,
        lastEventType: "created",
        priorSummary,
        openDecisions: [],
        activeFiles: [],
        pendingTasks: [],
      })

      if (priorSummary) {
        await log("Loaded prior session summary from production/session-state/last-session.md", {
          sessionId,
          priorSummaryLines: priorSummary.split("\n").length,
        })
      } else {
        await log("No prior session summary file found", { sessionId })
      }
    },

    "session.idle": async (event: any) => {
      const sessionId = ensureSessionId(event)
      if (!sessionId || sessionId === "unknown") {
        return
      }

      const now = new Date().toISOString()
      let state = sessionState.get(sessionId)

      if (!state) {
        state = {
          sessionId,
          createdAt: now,
          lastIdleAt: now,
          lastEventType: "idle",
          priorSummary: "",
          openDecisions: [],
          activeFiles: [],
          pendingTasks: [],
        }
        sessionState.set(sessionId, state)
      } else {
        state.lastIdleAt = now
        state.lastEventType = "idle"
      }

      await saveSummary(sessionId)
      await log("Wrote updated session summary on session.idle", { sessionId, lastIdleAt: now })
    },

    "experimental.session.compacting": async (input: any, output: any) => {
      const sessionId = ensureSessionId(input.event ?? input)
      if (!sessionId || sessionId === "unknown") {
        return
      }
      const state = sessionState.get(sessionId)
      if (!state) {
        return
      }
      output.context.push(formatSummary(state))
    },
  }
}
