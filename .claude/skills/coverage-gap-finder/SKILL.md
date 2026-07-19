---
name: coverage-gap-finder
description: Compares the public methods of Page Objects/API client with their actual use in test files, to flag methods that are written but never tested, or application behaviors not yet covered. Use periodically (end of milestone/level), not on every commit.
---

Your job is to find "silent gaps" in coverage, not failures — this is a proactive check, not a reactive one.

Proceed as follows:

1. List every public method defined in `pages/*.ts`, `components/*.ts` and `api/*.ts` (e.g. `CartPage.removeItem`, `BookingApiClient.updateBooking`).
2. Search, across all `*.spec.ts` files under `tests/`, which of these methods are actually called at least once.
3. For every method never called by any test, flag it as a "coverage gap" with the file and line where it's defined.
4. Beyond methods, also reason about known application behaviors that might lack a dedicated test (e.g. on SauceDemo: the anomalous behavior of `problem_user`, or checkout validation errors with missing fields) — flag these separately as "untested application scenario", distinguishing them from method gaps.
5. Order the results by priority: a state-changing method (e.g. `removeItem`, `deleteBooking`) that is untested is more critical than a getter never called directly but already covered indirectly by other assertions.

Do not propose writing the missing tests right away: this Skill's job is to produce the list of gaps, leaving the priority of which ones to cover first to Test Designer (or to the user's decision).
