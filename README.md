# Playwright TypeScript Automation Portfolio

[![Playwright Tests](https://github.com/carmineQA/playwright-typescript-automation-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/carmineQA/playwright-typescript-automation-portfolio/actions/workflows/playwright.yml)

A test automation portfolio built with Playwright and TypeScript, demonstrating UI, API, and end-to-end testing across three progressively complex targets. Backed by a sharded CI pipeline and augmented with custom Claude Code skills and a QA engineer agent used throughout development.

This is the flagship of a three-stack portfolio — see also [Selenium + Java](../selenium-java-automation-portfolio) and [Cypress + JavaScript](../cypress-javascript-automation-portfolio).

## Tech stack

- [Playwright](https://playwright.dev/) + TypeScript — test runner and browser automation
- [Zod](https://zod.dev/) — API response schema validation
- [Faker.js](https://fakerjs.dev/) — randomized test data generation
- GitHub Actions — CI, with a fast smoke suite on every push/PR and a sharded regression matrix publishing an HTML report to GitHub Pages

## Project structure

| Level | Target | Tests | Type |
|---|---|---|---|
| 1 | [SauceDemo](https://www.saucedemo.com/) | `tests/ui/saucedemo` | UI |
| 2 | [Restful Booker](https://restful-booker.herokuapp.com/) | `tests/api/restful-booker` | API |
| 3 | [Automation Exercise](https://automationexercise.com/) | `tests/e2e/automation-exercise` | Full E2E |

Page Objects live under `pages/` and `components/`, API clients under `api/`, shared fixtures under `fixtures/`, test data under `test-data/`.

When a target exposes a usable API (Restful Booker, Automation Exercise), tests that only need a precondition — an authenticated account, an existing booking — set it up through an API client instead of repeating the full UI flow (see `AccountApiClient` and the `testAccount`/`authenticatedPage` fixtures). Tests whose actual purpose is to verify a UI flow itself, such as registration, are still driven entirely through the UI, as intended.

The `ai/` and `.claude/` folders contain the Claude Code skills and QA agent used to assist development (failure analysis, coverage-gap detection, PR review). These support the workflow but are independent of the test suite.

Several real reliability issues — and the reasoning behind non-obvious architectural choices, such as why the `e2e` project is excluded from CI — were found, investigated, and fixed during development. The full record is in [`docs/decisions.md`](docs/decisions.md).

## Prerequisites

- Node.js (LTS)
- npm

## Installation

```bash
git clone https://github.com/carmineQA/playwright-typescript-automation-portfolio.git
cd playwright-typescript-automation-portfolio
npm install
npx playwright install --with-deps
```

## Configuration

Create a `.env` file in the project root with the Restful Booker demo credentials, required by the API test suite:

```
RESTFUL_BOOKER_USERNAME=admin
RESTFUL_BOOKER_PASSWORD=password123
```

## Running the tests

| Command | Description |
|---|---|
| `npm test` | Full suite, all projects (chromium, firefox, webkit, api, e2e) |
| `npm run test:smoke` | `@smoke` tests only — same as the push/PR CI workflow |
| `npm run test:regression` | `@regression` tests, all browsers + api project — same as the CI regression workflow |

## Code quality

| Command | Description |
|---|---|
| `npm run typecheck` | TypeScript strict type-check |
| `npm run lint` | ESLint (TypeScript + Playwright-specific rules) |
| `npm run format:check` | Prettier formatting check |
| `npm run format` | Prettier auto-fix |

These three checks (`typecheck`, `lint`, `format:check`) run as a required `lint` job in CI before any test job starts — see `.github/workflows/`.

## Report

```bash
npm run report   # opens a local server on :9323 to browse the last HTML report — Ctrl+C to stop it
```

The regression workflow also publishes its merged HTML report to GitHub Pages on every run to `main`. On pull requests, the smoke workflow posts a pass/fail test summary as a PR comment (via `daun/playwright-report-summary`).

## Dependency updates

Dependabot checks weekly for outdated `npm` dependencies and GitHub Actions used in the workflows (`.github/dependabot.yml`).

## License

MIT
