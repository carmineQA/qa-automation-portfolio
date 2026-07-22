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

## 2026-07-22 — API-seeded account for tests where login is only a precondition

**Decision:** `tests/e2e/automation-exercise/checkout.spec.ts` creates and authenticates its
test account through `fixtures/automationExercise.ts` (`testAccount` + `authenticatedPage`),
which calls the public `POST /api/createAccount` and `DELETE /api/deleteAccount` endpoints
that Automation Exercise documents on its own site, instead of driving the full multi-step
signup wizard through the UI. The fixture still performs the actual **login** through the UI
(`SignupLoginPage.login`), since that's the one step needed to establish a real browser
session. `tests/e2e/automation-exercise/registration.spec.ts` is deliberately **not** changed:
its entire purpose is to verify the UI signup flow itself, so replacing that flow with an API
call would remove the very thing the test exists to check.

**Why:** every test that required a logged-in account was repeating the same multi-field
signup wizard (name/email → ~15-field account form → confirmation) purely as setup, not as
something being verified. That's slower than necessary and adds UI surface (and therefore
failure surface) to tests that aren't about signup at all — the same principle that already
guided keeping assertions out of Page Objects, applied to test data setup instead of to code
structure. Restful Booker tests already follow the equivalent approach at the API layer
(`BookingApiClient`) for the same reason.

**How to apply:** when adding a new Automation Exercise test that needs an authenticated
account only as a precondition (not as the behavior under test), request the `testAccount`
and/or `authenticatedPage` fixtures from `fixtures/automationExercise.ts` instead of repeating
the UI signup flow. If a test's actual purpose is to verify signup/login/account-deletion
itself, keep driving it through the UI, as `registration.spec.ts` does.
