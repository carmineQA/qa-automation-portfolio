---
name: playwright-review
description: Revisiona file di test e Page Object Playwright/TypeScript applicando le best practice del progetto (niente assert nei Page Object, niente wait fissi, isolamento tra test, naming coerente). Usa prima di ogni PR che tocca tests/, pages/, components/ o fixtures/.
---

Controlla, in ordine, il file o il diff fornito:

1. **Asserzioni fuori posto**: nessun `expect(...)` dentro `pages/*.ts` o `components/*.ts`. Le asserzioni vanno solo nei file `*.spec.ts` dentro `tests/`.
2. **Wait fissi**: nessun `page.waitForTimeout(...)`. Ogni attesa deve essere su una condizione reale (`expect(locator).toBeVisible()`, `page.waitForResponse(...)`, ecc.).
3. **Isolamento tra test**: nessun test deve dipendere dall'ordine di esecuzione o da stato lasciato da un test precedente (es. un carrello non svuotato). Segnala se un test riusa dati creati da un altro test nello stesso file senza un setup esplicito.
4. **Naming coerente**:
   - file di test: `<area>.spec.ts` (es. `checkout.spec.ts`)
   - Page Object: file `<Nome>Page.ts`, classe `<Nome>Page`
   - titoli dei test: frase in linguaggio naturale che descrive il comportamento atteso
5. **Selettori fragili**: preferire `[data-test="..."]` o `getByRole(...)` rispetto a selettori CSS legati allo stile (classi che potrebbero cambiare con un refactor grafico).
6. **Fixture riusate correttamente**: se un test richiede un utente già loggato, deve usare `loggedInPage` da `fixtures/base.ts`, non ripetere login manuale.

Per ogni violazione trovata, indica: file e riga, cosa c'è di sbagliato, come corrispondente esempio corretto dal resto del progetto (se esiste). Non riscrivere l'intero file: proponi solo la correzione puntuale, lasciando all'utente la decisione di applicarla.
