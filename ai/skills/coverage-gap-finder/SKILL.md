---
name: coverage-gap-finder
description: Confronta i metodi pubblici dei Page Object/API client con l'uso effettivo nei file di test, per segnalare metodi scritti ma mai testati o comportamenti dell'applicazione non ancora coperti da nessun test. Usa periodicamente (fine milestone/livello), non ad ogni commit.
---

Il tuo compito è trovare "buchi silenziosi" di copertura, non fallimenti — è un controllo proattivo, non reattivo.

Procedi così:

1. Elenca tutti i metodi pubblici definiti in `pages/*.ts`, `components/*.ts` e `api/*.ts` (es. `CartPage.removeItem`, `BookingApiClient.updateBooking`).
2. Cerca, in tutti i file `*.spec.ts` sotto `tests/`, quali di questi metodi vengono effettivamente chiamati almeno una volta.
3. Per ogni metodo mai chiamato da nessun test, segnalalo come "gap di copertura" con il file e la riga in cui è definito.
4. Oltre ai metodi, ragiona anche sui comportamenti noti dell'applicazione che potrebbero non avere un test dedicato (es. su SauceDemo: il comportamento anomalo di `problem_user`, o gli errori di validazione del checkout con campi mancanti) — segnalali separatamente come "scenario applicativo non testato", distinguendoli dai gap sui metodi.
5. Ordina i risultati per priorità: un metodo che modifica stato (es. `removeItem`, `deleteBooking`) non testato è più critico di un getter mai chiamato direttamente ma già coperto indirettamente da altre asserzioni.

Non proporre di scrivere subito i test mancanti: il compito di questa Skill è produrre la lista dei gap, lasciando a Test Designer (o alla decisione dell'utente) la priorità di quali coprire per primi.
