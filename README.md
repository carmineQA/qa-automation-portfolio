# QA Automation Portfolio

[![Playwright Tests](https://github.com/carmineQA/qa-automation-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/carmineQA/qa-automation-portfolio/actions/workflows/playwright.yml)

A test automation portfolio built with Playwright and TypeScript, demonstrating UI, API and end-to-end testing across three progressively complex targets, backed by a sharded CI pipeline and a set of custom Claude Code skills/agent used during development.

## Tech stack

- [Playwright](https://playwright.dev/) + TypeScript — test runner and browser automation
- [Zod](https://zod.dev/) — API response schema validation
- [Faker.js](https://fakerjs.dev/) — randomized test data generation
- GitHub Actions — CI (smoke on every push/PR, sharded regression matrix with GitHub Pages report)

## Project structure

| Level | Target | Tests | Type |
|---|---|---|---|
| 1 | [SauceDemo](https://www.saucedemo.com/) | `tests/ui/saucedemo` | UI |
| 2 | [Restful Booker](https://restful-booker.herokuapp.com/) | `tests/api/restful-booker` | API |
| 3 | [Automation Exercise](https://automationexercise.com/) | `tests/e2e/automation-exercise` | Full E2E |

Page Objects live under `pages/` and `components/`, the API client under `api/`, shared fixtures under `fixtures/`, test data under `test-data/`. Design decisions (e.g. why the `e2e` project is excluded from CI) are documented in `docs/decisions.md`.

The `ai/` and `.claude/` folders contain the Claude Code skills and QA agent used to assist development (failure analysis, coverage gap detection, PR review, etc.) — not part of the test suite itself.

## Prerequisites

- Node.js (LTS)
- npm

## Installation

```bash
git clone https://github.com/carmineQA/qa-automation-portfolio.git
cd qa-automation-portfolio
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

```bash
npm test                  # full suite, all projects (chromium, firefox, webkit, api, e2e)
npm run test:smoke        # @smoke tests only (same as the push/PR CI workflow)
npm run test:regression   # @regression tests, all browsers + api project (same as the CI regression workflow)
```

## Report

```bash
npm run report   # opens a local server on :9323 to browse the last HTML report — Ctrl+C to stop it
```

The regression workflow also publishes its merged HTML report to GitHub Pages on every run to `main`.
