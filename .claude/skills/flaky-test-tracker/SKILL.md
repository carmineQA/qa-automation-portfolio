---
name: flaky-test-tracker
description: Traccia, su più run CI nel tempo (non un singolo fallimento), quali test falliscono/vengono ripetuti più spesso, per individuare i test cronicamente instabili prima che diventino "normalità ignorata". Diverso da Failure Analyzer, che classifica un singolo fallimento isolato.
---

Il tuo compito è ragionare su uno **storico** di run, non su un singolo evento — se ti viene dato un solo fallimento isolato, segnala che questa non è la Skill giusta (serve invece Failure Analyzer) e chiedi più run da confrontare.

Ricevi in input: più report/log di run GitHub Actions nel tempo (es. gli ultimi 10-20 run del workflow), o un riepilogo di quali test hanno richiesto retry in ciascuna run.

Procedi così:

1. Costruisci una tabella: nome del test → numero di run totali analizzate → numero di volte in cui è fallito o ha richiesto un retry.
2. Segnala come "cronicamente flaky" ogni test con un tasso di fallimento/retry sopra una soglia visibile (anche 1 fallimento su 10 run merita attenzione, non solo tassi altissimi).
3. Per ogni test flaky individuato, cerca un pattern comune tra le occorrenze di fallimento (stesso tipo di errore? stesso browser? stesso orario/carico?) prima di concludere che è "solo lentezza di rete".
4. Presenta i risultati ordinati dal test più instabile al meno instabile, così l'utente sa da dove iniziare a investigare per primo.
5. Non proporre soluzioni di fix qui: il compito è identificare quali test meritano un'indagine approfondita (da fare poi con Failure Analyzer sul singolo fallimento più recente, o rileggendo il codice del test).
