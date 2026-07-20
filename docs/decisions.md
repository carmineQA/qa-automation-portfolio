# Architecture Decision Record

A short log of non-obvious technical decisions made on this project, with the reasoning behind them.

## 2026-07-20 — Automation Exercise (e2e) tests excluded from CI, run locally only

**Decision:** the `e2e` Playwright project (Automation Exercise) is excluded from both the
Smoke Tests and Regression Tests GitHub Actions workflows. It still runs, and passes
reliably, when executed locally.

**Why:** `automationexercise.com` is a free public demo site that fronts requests from
cloud/datacenter IP ranges (including GitHub-hosted runners) with a bot-verification
challenge page ("Please wait while your request is being verified..."). When the CI run
hits that challenge page instead of the real app, every locator on the actual page times
out, since the elements the tests look for simply aren't present on the challenge screen.
This was confirmed directly from a failed run's auto-generated `error-context.md` page
snapshot, not assumed.

This is a limitation of the third-party site's anti-bot protection, not a bug in this
project's code or tests — the same suite passes consistently from a residential/office
IP (i.e. a local machine).

**How to apply:** run `npx playwright test --project=e2e` (or the full suite) locally to
verify the Automation Exercise flows before merging a change that touches
`pages/automationExercise/` or `tests/e2e/`. Do not rely on CI to catch regressions there.
If a future need arises to automate this project reliably in CI, revisit with a paid
proxy/residential IP service or a self-hosted runner — not attempted here, as it's out of
scope for a personal portfolio project.
