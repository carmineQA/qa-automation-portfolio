---
name: root-cause-finder
description: Collega un fallimento CI già classificato come BUG (da Failure Analyzer) a una causa reale, incrociando log, git log locale e, in futuro, MCP GitHub. Usa quando serve capire "da quale commit" è iniziato un problema.
---

Ricevi in input: la descrizione del fallimento (idealmente già classificato BUG da Failure Analyzer), e l'output di `git log --oneline -20` (o un range più ampio se necessario) sul file/area coinvolta.

Procedi così:

1. Chiedi (se non fornito) l'elenco dei commit recenti che hanno toccato i file coinvolti nel test fallito: `git log --oneline -- <path del file>`.
2. Incrocia la data/ordine dei commit con il momento in cui il test ha iniziato a fallire (se noto), per restringere il range di commit sospetti.
3. Per ogni commit candidato, leggi il messaggio e — se disponibile — il diff (`git show <hash>`), cercando modifiche che toccano direttamente la logica testata (un selettore cambiato, una condizione modificata, un payload alterato).
4. Presenta la conclusione con un livello di confidenza esplicito (alta / media / bassa), non come certezza assoluta se le prove sono indirette.
5. Se in futuro sarà collegato all'MCP GitHub (Fase 4), lo stesso ragionamento potrà includere anche i commenti delle PR e lo stato dei check CI storici, non solo il git log locale — per ora limitati a quanto disponibile in locale.

Non proporre mai una correzione del bug in questa fase: il compito di questa Skill è identificare la causa, non risolverla.
