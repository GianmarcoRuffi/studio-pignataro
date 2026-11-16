# Code review — 16 novembre 2026

Review mirata a correttezza, prestazioni e manutenibilità. Sono stati riprodotti
quattro difetti, corretti senza cambiare contenuti, URL o dipendenze.

## Correzioni

- **Modali (P1):** la rimozione del consenso durante una lightbox rendeva entrambe
  le finestre `inert`. Un registro delle modali attive permette alle preferenze
  cookie di attendere la chiusura di menu o lightbox. La revoca dei servizi resta
  immediata; focus, isolamento e scroll restano gestiti dall’hook condiviso.
- **Bio e Contatti (P2):** il precaricamento dell’originale aggiungeva 1.020.764 e
  666.984 byte e nascondeva la foto ottimizzata già pronta. Lo stato segue ora gli
  eventi dell’immagine visualizzata.
- **Caricamento incrementale (P2):** una richiesta sospesa bloccava indefinitamente
  il gruppo successivo. Il precaricamento termina entro 5 secondi, rispettando
  il tempo minimo degli skeleton. I cataloghi ignorano i completamenti obsoleti
  dopo smontaggio o cambio filtro.
- **Lightbox (P2):** il pannello opaco nascondeva la foto precedente dopo 300 ms.
  Quando una foto è già presente, lo stato di caricamento ha sfondo trasparente.

## Verifiche

La baseline precedente alle modifiche supera lint, TypeScript, Prettier, build e
81 test E2E. Dopo le correzioni, lint, TypeScript, Prettier e build superati;
suite completa: **88 test E2E superati**, inclusi i sette nuovi casi.
Le regressioni aggiuntive in `tests/e2e/review-loading.spec.ts`
verificano sovrapposizione delle modali, immagini responsive, richieste sospese e
conservazione della foto durante il caricamento e cambio filtro con una
richiesta ancora in corso.

## Dipendenze e limiti

L’audit eseguito durante la review rileva zero segnalazioni in produzione e
44 nei pacchetti di sviluppo: 21 alte e 23 moderate, comprese le catene
transitive di Vercel CLI ed ESLint. Non sono 44 difetti indipendenti
nell’applicazione. I conteggi possono cambiare con gli advisory del registro.
Non sono stati applicati aggiornamenti generalizzati né `npm audit fix --force`.
L’override di `tar` resta sulla linea 7.5.22 o successiva.

Nessun deploy o modifica ad alias e servizi remoti. I test della mappa simulano
il contenuto remoto; non verificano account, cookie o configurazione del fornitore.
