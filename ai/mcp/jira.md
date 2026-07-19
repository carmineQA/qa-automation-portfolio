# MCP Jira

## What it enables
Lets Claude Code read and (in the future, once the Phase 5 Agent is in place) create
Jira issues directly, instead of tracking bugs/tasks manually outside the tool. Used
to simulate a real dev workflow even though this is a personal project, and it is the
technical prerequisite for the Phase 5 Agent (which will search for duplicate tickets
before proposing a new one).

## How it's configured
- Server: official Atlassian Remote MCP server, endpoint `https://mcp.atlassian.com/v1/sse`
- Transport: SSE, authenticated via OAuth (unlike the GitHub MCP server, this endpoint
  supports the automatic OAuth login flow with a regular Atlassian Cloud account —
  no Personal Access Token was needed)
- Site: `carminedelprete28.atlassian.net` (personal Atlassian account, separate from
  the Namirial work account/organization)
- Jira project: `QA Portfolio` (key `SCRUM`)
- Scope: local to this project (not shared with other Claude Code projects)

## Important note — do not confuse with the pre-existing "claude.ai Atlassian" connector
This Claude Code installation is licensed through the Namirial Enterprise account, which
already has its own pre-configured, already-connected Atlassian connector
(`claude.ai Atlassian`, endpoint `https://mcp.atlassian.com/v1/mcp`) pointing at Namirial's
own Atlassian organization. That connector must **not** be used for this project — it was
deliberately avoided in favor of registering a separate, dedicated `atlassian` connector
authenticated with the personal `carminedelprete28@gmail.com` account instead.

## Planned deprecation
Atlassian will retire the HTTP+SSE endpoint after 2026-06-30 in favor of a Streamable HTTP
endpoint (`https://mcp.atlassian.com/v1/mcp`). If the connector stops working after that
date, re-register it with the new endpoint.

## How to reconfigure it from scratch
```
claude mcp add --transport sse atlassian https://mcp.atlassian.com/v1/sse
claude mcp login atlassian
```
During the OAuth login, make sure to authenticate as `carminedelprete28@gmail.com` and
authorize access to `carminedelprete28.atlassian.net`, not any Namirial-owned site.

## Verification
`/mcp` inside Claude Code must show `atlassian · connected`. A safe test prompt:
"list the Jira projects available through the atlassian connector" — the result must
show the `QA Portfolio` (`SCRUM`) project on `carminedelprete28.atlassian.net`.
