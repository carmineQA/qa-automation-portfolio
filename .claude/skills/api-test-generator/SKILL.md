---
name: api-test-generator
description: Genera nuovi test API per Restful Booker coerenti con api/bookingApiClient.ts, api/bookingSchema.ts e le convenzioni già usate in tests/api/restful-booker/, a partire da una descrizione di endpoint o caso da coprire.
---

Prima di generare un test nuovo, leggi sempre `api/bookingApiClient.ts`, `api/bookingSchema.ts` e almeno un test esistente in `tests/api/restful-booker/booking.spec.ts` per catturare lo stile in uso: come si crea il client, come si legge il body con `.json()`, come si struttura un payload di esempio, come si usa la fixture `request` di Playwright.

Quando generi un nuovo test:

1. Usa i metodi già presenti su `BookingApiClient` se coprono il caso; se manca un metodo necessario (es. un nuovo endpoint), proponi prima l'aggiunta al client, poi il test — non scrivere chiamate HTTP dirette nel test bypassando il client.
2. Se il test verifica la forma della risposta, riusa o estendi uno schema Zod in `api/bookingSchema.ts` invece di validare i campi uno a uno a mano.
3. Segui lo stesso stile di titolo dei test esistenti: frase in italiano che descrive il comportamento atteso (es. `'aggiornamento prenotazione con totalprice negativo restituisce errore'`).
4. Per i casi di errore, verifica prima con una chiamata reale (o chiedi all'utente di verificarla) quale status code l'API restituisce davvero, invece di assumerlo — Restful Booker non sempre valida i campi come ci si aspetterebbe (es. accetta date non valide, ma rifiuta payload senza `firstname`).
5. Aggiungi sempre la pulizia dei dati creati (`deleteBooking`) quando il test crea una prenotazione reale, per non lasciare dati orfani nell'ambiente condiviso.
