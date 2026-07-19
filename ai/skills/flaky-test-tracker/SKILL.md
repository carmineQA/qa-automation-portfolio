---
name: flaky-test-tracker
description: Tracks, across multiple CI runs over time (not a single failure), which tests fail/get retried most often, to spot chronically unstable tests before they become "ignored normality". Different from Failure Analyzer, which classifies a single isolated failure.
---

Your job is to reason over a **history** of runs, not a single event — if given only one isolated failure, say this isn't the right Skill for it (Failure Analyzer is) and ask for more runs to compare.

You receive as input: multiple GitHub Actions run reports/logs over time (e.g. the last 10-20 runs of the workflow), or a summary of which tests required a retry in each run.

Proceed as follows:

1. Build a table: test name → total runs analyzed → number of times it failed or required a retry.
2. Flag as "chronically flaky" any test with a failure/retry rate above a visible threshold (even 1 failure out of 10 runs deserves attention, not only very high rates).
3. For each flaky test identified, look for a common pattern among the failure occurrences (same error type? same browser? same time of day/load?) before concluding it's "just network slowness".
4. Present the results ordered from the most unstable test to the least, so the user knows where to start investigating first.
5. Do not propose fixes here: the job is to identify which tests deserve deeper investigation (to be done later with Failure Analyzer on the most recent single failure, or by reading the test code).
