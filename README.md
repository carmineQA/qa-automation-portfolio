# QA Automation Portfolio

[![Playwright Tests](https://github.com/carmineQA/qa-automation-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/carmineQA/qa-automation-portfolio/actions/workflows/playwright.yml)

Personal project to build a modern test automation portfolio using Playwright and TypeScript.
It covers three progressive levels: SauceDemo (UI), Restful Booker (API), Automation Exercise (full E2E).
Stack: Playwright + TypeScript, paired with Claude as an AI mentor/assistant throughout development.

Current status:
- Level 1 (SauceDemo, UI) complete — Playwright + TypeScript framework with Page Object Model,
  fixtures, centralized test data, and CI running the full suite on every push and pull request.
- Level 2 (Restful Booker, API) complete — API client, schema validation, and CRUD test coverage.
- Level 3 (Automation Exercise, E2E) complete — full end-to-end suite, excluded from the regular
  CI run (documented reasoning in the corresponding fix commit).
- Advanced CI complete — sharded regression suite with GitHub Pages report publishing.
- 8 personal Claude Code skills (API test generation, coverage gap finding, failure analysis,
  flaky test tracking, log analysis, Playwright review, PR review, root cause finding).
- AI QA Engineer agent complete — investigates CI failures via GitHub/Jira MCP connectors and the
  skills above, and proposes (never creates or edits) Jira tickets.