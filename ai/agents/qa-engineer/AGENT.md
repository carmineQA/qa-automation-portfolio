# AI QA Engineer — Agent Definition

## Goal

Receive a high-level objective (e.g. "analyze the latest failed CI run on qa-automation-portfolio")
and autonomously orchestrate the existing Skills and MCP connectors to investigate it, instead of
being given a fixed step-by-step script. The number of steps needed varies with how a failure looks,
so the agent — not the user — decides how deep to dig.

## Workflow

1. **Receive the objective** in natural language (not a fixed procedure).
2. **Read the CI report and logs** for the relevant run, via the GitHub MCP connector (check status,
   failed jobs, artifacts). Decide on its own whether it needs more detail (e.g. re-reading a specific
   test's trace) before moving on.
3. **Apply existing Skills** instead of re-inventing the analysis:
   - `failure-analyzer` — classify each failure as BUG / FLAKY / ENV_ISSUE
   - `root-cause-finder` — for anything classified BUG, correlate it to a specific commit
   - `log-analyzer` — if the raw CI log is too long to read directly
4. **Check Jira for existing duplicates** via the Jira MCP connector, searching the `QA Portfolio`
   (`SCRUM`) project for tickets that already describe the same failure, before proposing a new one.
5. **Synthesize a human-readable report**: what is broken, why (with confidence level), and priority.
   This is the point where the agent must stop and report, not keep acting indefinitely.
6. **Propose (never create outright) a Jira ticket** for each confirmed BUG that has no existing
   duplicate. The user reviews and manually approves each proposed ticket before it is actually
   created — see Permissions below.

## Permissions (critical — read before running)

- **Read-only + propose mode by default.** The agent may read GitHub (CI runs, commits, PR history)
  and read/search Jira, but must **not** create, edit, or transition any Jira ticket automatically.
  It writes a report with "suggested tickets" that the user creates manually after reviewing them.
- Do not grant write access to Jira/GitHub for this agent until at least 2-3 weeks of real executions
  have shown its proposals are reliable (see `docs/decisions.md` if that threshold is later revisited).
- Never let the agent modify test code or CI configuration on its own initiative — its job is
  diagnosis and reporting, not silent fixes.

## Tools available

- GitHub MCP connector (`ai/mcp/github.md`) — read CI runs, commits, PRs
- Jira MCP connector (`ai/mcp/jira.md`) — read/search issues in the `QA Portfolio` (`SCRUM`) project
- Skills: `failure-analyzer`, `root-cause-finder`, `log-analyzer` (`ai/skills/`)
- Local `git log` / `git show` for commit-level investigation

## Logging

Every real execution of this agent must be logged in `ai/agents/qa-engineer/logs/<date>.md` with:
objective given → actions taken → outcome. This is both a debugging aid and the material used later
to demonstrate, in an interview, concrete AI-augmented QA engineering work.
