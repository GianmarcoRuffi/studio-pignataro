# Code review — 23 ottobre 2026

Tutti i punti applicativi della review sono stati affrontati. Restano separati i limiti dell'audit delle dipendenze di sviluppo e della verifica dell'ambiente di hosting.

## Dipendenze

Eseguiti `npm update`, `npm audit fix` e `npm install`, aggiornando il lockfile nei vincoli del progetto. Versioni installate principali: Next.js ed eslint-config-next 16.4.2, React/React DOM 19.3.1, TypeScript 5.9.3, Playwright 1.64.1 e Lenis 1.3.27. Aggiornati anche i browser Playwright.

Aggiunto un override limitato alla linea 7 di `tar`, portandola a 7.5.22 per eliminare la segnalazione critica. L'audit delle dipendenze di produzione non rileva vulnerabilità. L'audit completo rileva ancora **42 segnalazioni negli strumenti di sviluppo: 38 alte, 3 moderate e 1 bassa**, soprattutto nelle dipendenze transitive di Vercel CLI ed ESLint. Sono conteggi di pacchetti, comprese le catene di dipendenze, non 42 difetti indipendenti dell'applicazione.

`npm audit fix` non risolve queste segnalazioni nei vincoli attuali. Il suggerimento automatico `--force` include downgrade incompatibili di Vercel ed eslint-config-next: non è stato applicato. La toolchain richiede un aggiornamento dedicato e una verifica dei comandi di deploy; l'assenza di segnalazioni in produzione non rende sicuri per definizione gli strumenti di sviluppo.

## Correzioni applicate

| Area              | Risultato                                                                                                                                                                                                                                                                                                      | Riferimenti                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Informative       | Rimossi i riferimenti a un form e a servizi di analisi/marketing assenti. Descritti memorie locali, font e icone locali e mappa facoltativa. Contatti ricavati dai dati condivisi; eliminati tempi di conservazione attribuiti a Google Analytics.                                                             | `src/app/privacy-policy/`, `src/app/cookie-policy/`                                                |
| Consenso          | Validità esplicita di 365 giorni, verifica della data, rinnovo alla scadenza e sincronizzazione fra schede. Preferenze riapribili dal footer anche su mobile. Chiusura ed Escape mantengono solo i servizi necessari.                                                                                          | `src/utils/consent.ts`, `src/hooks/useCookieConsent.ts`, `CookieConsent`, `Footer`                 |
| Google Maps       | Nessun iframe prima del consenso. Accettazione e revoca montano/rimuovono la mappa; il segnaposto permette di aprire le preferenze. La revoca non viene descritta come cancellazione dei dati già inviati al fornitore.                                                                                        | `src/app/contacts/page.tsx`, `OptionalScripts`                                                     |
| Modali            | Focus iniziale, navigazione Tab/Shift+Tab confinata, Escape, ripristino del focus e isolamento dei contenuti sottostanti con `inert`. Bloccati contenitore interno e Lenis, preservando gli stili precedenti. Lightbox in un portal nel body. Menu chiuso escluso dal focus.                                   | `src/hooks/useModalAccessibility.ts`, `Lightbox`, `Header`, `CookieConsent`, `src/utils/scroll.ts` |
| Header            | Legge lo scroll del contenitore tramite le utility comuni; registra nuovamente il listener dopo la navigazione. I link mobile chiudono il menu.                                                                                                                                                                | `src/components/Header/Header.tsx`                                                                 |
| Storage           | Splash e schermate di caricamento continuano a funzionare quando sessionStorage è bloccato. La scelta di consenso può restare in memoria durante la visita se localStorage non è utilizzabile. Ripuliti i timer dello splash.                                                                                  | `src/utils/storage.ts`, `SplashContext`, `SplashScreen`, `usePageLoading`                          |
| Date              | Data editoriale esplicita nei dati di ciascuna informativa, visualizzata con un elemento `time`; nessuna data generata in base alla visita o alla build.                                                                                                                                                       | `PolicyLayout`, dati delle informative                                                             |
| Immagini          | Slider limitato alla slide attiva e alle due adiacenti, con immagini responsive ottimizzate e senza precaricare tutte le copertine. Galleria con `sizes` coerente alle colonne e precaricamento delle stesse varianti responsive; GIF animato preservato. Lightbox mantiene gli originali per l'ingrandimento. | `Slider`, `MasonryGallery`, `Gallery`, `src/utils/imageUtils.ts`                                   |
| Movimento ridotto | Preferenza rispettata anche quando cambia durante la visita; disattivati Lenis e autoplay quando richiesto e ridotte animazioni/transizioni dell'interfaccia.                                                                                                                                                  | `PageSmoothScroll`, `Slider`, stili globali                                                        |

Restano attive le correzioni della prima review: sitemap con tutti gli slug, canonical delle pagine interne, comando npm staging, riprova/pannello errore lightbox e formattazione. Gli slug e le durate minime `LOADING` sono preservati.

## Verifiche e copertura

- Lint, TypeScript, Prettier e controllo whitespace: superati.
- Build di produzione tramite Playwright: riuscita; suite completa con 28 test su 28 superati.
- Suite ampliata a 28 casi desktop/mobile: regressioni iniziali, consenso e revoca, scadenza, sincronizzazione fra schede, focus e scroll delle modali, navigazione mobile, header, storage disabilitato e date editoriali.
- Misurazione dei byte delle tre copertine effettivamente richieste a viewport mobile, confrontati con gli stessi file originali. Il test verifica anche l'assenza di richieste dirette alle copertine e la navigazione dello slider. Su viewport da 390 px, gli stessi tre originali pesano 412.132 byte: le risposte ottimizzate misurate pesano 52.550 byte con DPR 1 e 114.200 byte nell’emulazione Pixel 7. Le misure sono nelle annotazioni `mobile-image-bytes` del report Playwright; non sono un benchmark di rete reale né un punteggio Lighthouse.
- Due worker Playwright limitano la contesa delle risorse nei test che verificano brevi finestre temporali degli skeleton.

## Limiti

Non sono stati eseguiti deploy o modifiche ad alias. I test della mappa simulano il contenuto remoto: verificano il controllo delle richieste, non il funzionamento dell'account Google o dei suoi cookie. La verifica del repository non controlla impostazioni dei log, contratti o servizi abilitati direttamente nel pannello di hosting.

Le informative sono state allineate all'implementazione visibile; la configurazione effettiva dei fornitori e gli obblighi del titolare richiedono riscontro nell'ambiente reale. I criteri di scelta e revoca sono stati confrontati con le [linee guida del Garante](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876); i riferimenti giuridici con il [GDPR, art. 6](https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32016R0679).

Il dimensionamento responsive segue la [documentazione Next.js Image](https://nextjs.org/docs/app/api-reference/components/image). Per i trattamenti dei fornitori sono richiamate le informative di [Google](https://policies.google.com/privacy?hl=it) e [Vercel](https://vercel.com/legal/privacy-notice).
