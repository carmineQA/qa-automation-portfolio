---
name: root-cause-finder
description: Links a CI failure already classified as BUG (by Failure Analyzer) to a real cause, cross-referencing logs, local git log and, in the future, the GitHub MCP. Use when you need to figure out "which commit" a problem started with.
---

You receive as input: the description of the failure (ideally already classified BUG by Failure Analyzer), and the output of `git log --oneline -20` (or a wider range if needed) on the involved file/area.

Proceed as follows:

1. Ask (if not provided) for the list of recent commits that touched the files involved in the failed test: `git log --oneline -- <file path>`.
2. Cross-reference the date/order of the commits with the moment the test started failing (if known), to narrow down the range of suspect commits.
3. For each candidate commit, read the message and — if available — the diff (`git show <hash>`), looking for changes that directly touch the logic being tested (a changed selector, a modified condition, an altered payload).
4. Present the conclusion with an explicit confidence level (high / medium / low), not as absolute certainty if the evidence is indirect.
5. If in the future this is connected to the GitHub MCP (Phase 4), the same reasoning could also include PR comments and historical CI check status, not just the local git log — for now, limit yourself to what's available locally.

Never propose a fix for the bug at this stage: this Skill's job is to identify the cause, not to resolve it.
