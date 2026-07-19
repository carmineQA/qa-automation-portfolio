---
name: pr-reviewer
description: Revisiona l'intera Pull Request (logica, sicurezza, coerenza con le convenzioni del progetto, test mancanti), non solo i file di test. Usa come secondo parere prima del merge, in aggiunta a Playwright Review.
---

A differenza di Playwright Review (che controlla solo `tests/`, `pages/`, `components/`), questa Skill guarda l'intera Pull Request: codice applicativo (`api/`), configurazione (`playwright.config.ts`, workflow in `.github/workflows/`), documentazione, e non solo i test.

Controlla, in ordine:

1. **Segreti**: nessuna credenziale, token o password hardcoded nel diff. Se compare qualcosa che assomiglia a un segreto, segnalalo come bloccante, non come suggerimento.
2. **Coerenza con le convenzioni esistenti**: naming dei file, stile dei titoli dei test, struttura delle cartelle rispettata (vedi `docs/decisions.md` se presente, per le decisioni architetturali già prese).
3. **Test mancanti**: se il diff aggiunge un nuovo metodo pubblico (es. su `BookingApiClient` o su un Page Object) senza un test corrispondente, segnalalo esplicitamente.
4. **Effetti collaterali non ripuliti**: se un test crea dati reali (es. una prenotazione via API), verifica che li cancelli a fine test.
5. **Leggibilità**: nomi di variabili/funzioni chiari, nessuna duplicazione palese tra file diversi che potrebbe già essere centralizzata in `utils/` o `helpers/`.

Per ogni punto, dai un verdetto esplicito (OK / da correggere / bloccante) invece di un commento vago tipo "sembra a posto". Se non trovi nulla da segnalare in una categoria, scrivilo comunque ("Segreti: OK, nessuna credenziale nel diff") così chi legge sa che il controllo è stato fatto, non saltato.
