import { test, expect } from '@playwright/test';
import { BookingApiClient, BookingPayload } from '../../../api/bookingApiClient';
import { createBookingResponseSchema } from '../../../api/bookingSchema';

const validPayload: BookingPayload = {
  firstname: 'Mario',
  lastname: 'Rossi',
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-01-01',
    checkout: '2026-01-05',
  },
  additionalneeds: 'Breakfast',
};

test('ping conferma che l\'API è attiva', async ({ request }) => {
  const response = await request.get('/ping');
  expect(response.status()).toBe(201);
});

test('creazione prenotazione restituisce uno schema valido', async ({ request }) => {
  const response = await request.post('/booking', { data: validPayload });
  expect(response.status()).toBe(200);

  const body = await response.json();
  const result = createBookingResponseSchema.safeParse(body);
  expect(result.success).toBe(true);
  expect(body.booking.firstname).toBe(validPayload.firstname);
});

test('creazione, lettura, aggiornamento e cancellazione di una prenotazione (CRUD completo)', async ({ request }) => {
  const client = new BookingApiClient(request);
  const username = process.env.RESTFUL_BOOKER_USERNAME;
  const password = process.env.RESTFUL_BOOKER_PASSWORD;
  if (!username || !password) {
    throw new Error('RESTFUL_BOOKER_USERNAME / RESTFUL_BOOKER_PASSWORD non trovate: controlla il file .env');
  }
  await client.authenticate(username, password);

  const createResponse = await client.createBooking(validPayload);
  expect(createResponse.status()).toBe(200);
  const created = await createResponse.json();
  const bookingId = created.bookingid;

  const getResponse = await client.getBooking(bookingId);
  expect(getResponse.status()).toBe(200);
  const fetched = await getResponse.json();
  expect(fetched.firstname).toBe(validPayload.firstname);

  const updatedPayload: BookingPayload = { ...validPayload, totalprice: 200 };
  const updateResponse = await client.updateBooking(bookingId, updatedPayload);
  expect(updateResponse.status()).toBe(200);
  const updated = await updateResponse.json();
  expect(updated.totalprice).toBe(200);

  const deleteResponse = await client.deleteBooking(bookingId);
  expect(deleteResponse.status()).toBe(201);
});

test('creazione prenotazione senza il campo obbligatorio firstname restituisce errore', async ({ request }) => {
  const { firstname, ...invalidPayload } = validPayload;
  const response = await request.post('/booking', { data: invalidPayload });
  expect(response.status()).toBe(500);
});
