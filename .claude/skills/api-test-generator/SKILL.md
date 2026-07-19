---
name: api-test-generator
description: Generates new Restful Booker API tests consistent with api/restfulBooker/bookingApiClient.ts, api/restfulBooker/bookingSchema.ts and the conventions already used in tests/api/restful-booker/, starting from a description of an endpoint or case to cover.
---

Before generating any new test, always read `api/restfulBooker/bookingApiClient.ts`, `api/restfulBooker/bookingSchema.ts` and at least one existing test in `tests/api/restful-booker/booking.spec.ts` to capture the style in use: how the client is created, how the body is read with `.json()`, how a sample payload is structured, how the Playwright `request` fixture is used.

When generating a new test:

1. Use the methods already available on `BookingApiClient` if they cover the case; if a needed method is missing (e.g. a new endpoint), propose adding it to the client first, then the test — do not write direct HTTP calls in the test bypassing the client.
2. If the test checks the shape of the response, reuse or extend a Zod schema in `api/restfulBooker/bookingSchema.ts` instead of validating fields one by one by hand.
3. Follow the same test title style already in use: an English sentence describing the expected behavior (e.g. `'updating a booking with a negative totalprice returns an error'`).
4. For error cases, first verify with a real call (or ask the user to verify) which status code the API actually returns, instead of assuming it — Restful Booker doesn't always validate fields as one would expect (e.g. it accepts invalid dates, but rejects a payload without `firstname`).
5. Always add cleanup for the data created (`deleteBooking`) when the test creates a real booking, so as not to leave orphaned data in the shared environment.
