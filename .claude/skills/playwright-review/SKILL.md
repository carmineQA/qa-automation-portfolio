---
name: playwright-review
description: Reviews Playwright/TypeScript test files and Page Objects against project best practices (no assertions in Page Objects, no fixed waits, test isolation, consistent naming). Use before every PR touching tests/, pages/, components/ or fixtures/.
---

Check, in order, the given file or diff:

1. **Misplaced assertions**: no `expect(...)` inside `pages/*.ts` or `components/*.ts`. Assertions belong only in `*.spec.ts` files under `tests/`.
2. **Fixed waits**: no `page.waitForTimeout(...)`. Every wait must be on a real condition (`expect(locator).toBeVisible()`, `page.waitForResponse(...)`, etc.).
3. **Test isolation**: no test should depend on execution order or on state left behind by a previous test (e.g. a cart not emptied). Flag if a test reuses data created by another test in the same file without explicit setup.
4. **Consistent naming**:
   - test files: `<area>.spec.ts` (e.g. `checkout.spec.ts`)
   - Page Objects: file `<Name>Page.ts`, class `<Name>Page`
   - test titles: a natural-language sentence describing the expected behavior
5. **Fragile selectors**: prefer `[data-test="..."]` or `getByRole(...)` over CSS selectors tied to styling (classes that could change with a visual refactor).
6. **Correct fixture reuse**: if a test requires an already logged-in user, it must use `loggedInPage` from `fixtures/base.ts`, not repeat manual login.

For every violation found, state: file and line, what is wrong, and the corresponding correct example from the rest of the project (if one exists). Do not rewrite the whole file: propose only the targeted fix, leaving the decision to apply it to the user.
