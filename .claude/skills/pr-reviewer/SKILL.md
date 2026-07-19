---
name: pr-reviewer
description: Reviews an entire Pull Request (logic, security, consistency with project conventions, missing tests), not just test files. Use as a second opinion before merging, in addition to Playwright Review.
---

Unlike Playwright Review (which only checks `tests/`, `pages/`, `components/`), this Skill looks at the whole Pull Request: application code (`api/`), configuration (`playwright.config.ts`, workflows in `.github/workflows/`), documentation, not just tests.

Check, in order:

1. **Secrets**: no credential, token or password hardcoded in the diff. If something that looks like a secret appears, flag it as blocking, not as a suggestion.
2. **Consistency with existing conventions**: file naming, test title style, folder structure respected (see `docs/decisions.md` if present, for architectural decisions already made).
3. **Missing tests**: if the diff adds a new public method (e.g. on `BookingApiClient` or on a Page Object) without a corresponding test, flag it explicitly.
4. **Uncleaned side effects**: if a test creates real data (e.g. a booking via API), verify it deletes it at the end of the test.
5. **Readability**: clear variable/function names, no obvious duplication between files that could already be centralized in `utils/` or `helpers/`.

For each point, give an explicit verdict (OK / needs fixing / blocking) instead of a vague comment like "looks fine". If you find nothing to flag in a category, write it anyway ("Secrets: OK, no credentials in the diff") so the reader knows the check was actually performed, not skipped.
