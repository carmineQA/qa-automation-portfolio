# MCP GitHub

## What it enables
Lets Claude Code read/write directly on GitHub (pull requests, commits, CI check status)
instead of working on manually pasted diffs. Used in this project by Pull Request Reviewer
(`ai/skills/pr-reviewer/`) to read real PRs.

## How it's configured
- Server: official GitHub MCP server, endpoint `https://api.githubcopilot.com/mcp/`
- Transport: HTTP, authenticated via an `Authorization: Bearer <token>` header
  (note: this endpoint does not support the automatic OAuth login flow without an
  active GitHub Copilot subscription, so a Personal Access Token is used instead
  of the standard OAuth flow)
- Token: fine-grained PAT, scoped to the `qa-automation-portfolio` repository only,
  with Pull requests (read/write), Contents (read-only) and Actions (read-only) permissions
- Scope: local to this project (not shared with other Claude Code projects)

## How to reconfigure it from scratch
```
claude mcp add --transport http github https://api.githubcopilot.com/mcp/ \
  --header "Authorization: Bearer <TOKEN>"
```

## Verification
`/mcp` inside Claude Code must show `github · connected`.
