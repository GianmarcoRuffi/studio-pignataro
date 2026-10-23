# Code review — 23 ottobre 2026

**Verdetto:** NEEDS DISCUSSION per le informative e le scelte sul consenso ancora da definire.
**Confidenza:** MEDIA; analisi statica del progetto e verifiche automatiche locali, senza audit dell'ambiente Vercel o dei servizi esterni.

## Ambito

Review del progetto corrente rispetto ad `AGENTS.md`, con correzioni dei difetti riproducibili. La modifica preesistente a `.vscode/settings.json` è stata preservata. Nessuno slug o contenuto progettuale è stato modificato.

## Incongruenze corrette

| Priorità | Problema e correzione                                                                                                                                                                      | File                                            |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| P1       | Le pagine interne ereditavano il canonical della homepage. Ogni layout ora specifica canonical e URL Open Graph della propria pagina. I dettagli mantengono i propri metadati.             | `src/utils/metadata.ts`, sei layout interni     |
| P2       | Sitemap priva dei dettagli: lo script cercava `src/data/data.ts`. Ora legge `projectsData.ts` e fallisce se la sorgente manca, anziché omettere silenziosamente i progetti.                | `generate-sitemap.js`, `public/sitemap.xml`     |
| P1       | Workflow staging interrotto da un comando npm inesistente. Aggiunto il collegamento allo script già presente.                                                                              | `package.json`                                  |
| P2       | «Riprova» nella lightbox riutilizzava un errore memorizzato. Ora invalida la voce prima del nuovo caricamento. Corretto anche il pannello errore, che collassava e nascondeva il pulsante. | `src/components/Lightbox/Lightbox.tsx`          |
| P2       | Slider automatico e scroll esplicito ignoravano il movimento ridotto. Disattivati autoplay e transizioni dello slider e richiesto scroll immediato con questa preferenza.                  | `src/components/Slider/`, `src/utils/scroll.ts` |
| P2       | I link delle slide trasparenti rimanevano raggiungibili da tastiera. Le slide inattive ora sono `inert` e nascoste alle tecnologie assistive; gli alt riportano il nome del progetto.      | `src/components/Slider/Slider.tsx`              |
| P2       | Galleria con quantità di caricamento duplicate. Ora utilizza `LOADING.INITIAL_ITEMS` e `LOADING.ITEMS_PER_LOAD`.                                                                           | `src/components/Gallery/Gallery.tsx`            |
| P2       | 29 file non rispettavano Prettier. Applicata la configurazione esistente.                                                                                                                  | File TS, TSX e SCSS                             |

I report Playwright sono ora esclusi da ESLint e Prettier: prima una suite eseguita poteva far fallire i controlli sui file generati.

## Miglioramenti ancora necessari

| Priorità | Evidenza e impatto                                                                                                                                                                                                                                                                                                          | Intervento consigliato                                                                                                                             |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| P2       | `src/app/cookie-policy/data.ts` e `src/app/privacy-policy/data.ts` dichiarano Analytics, Google Fonts e un form contatti assenti dal codice. Il banner parla di accettazione continuando la navigazione, mentre `OptionalScripts` richiede `accepted`. Le informative riportano anche email diverse dai contatti condivisi. | Allineare le dichiarazioni all'implementazione e confermare i dati editoriali con il titolare.                                                     |
| P2       | `src/app/contacts/page.tsx` carica la mappa Google fuori da `OptionalScripts`, anche con preferenza `declined`. Il valore di consenso non ha una scadenza applicativa né un comando per riaprire le preferenze; la policy dichiara un anno.                                                                                 | Definire il comportamento desiderato per mappa, revoca e durata, quindi coprirlo con test.                                                         |
| P2       | `src/components/Lightbox/Lightbox.tsx` imposta `aria-modal` senza spostare, confinare e ripristinare il focus. Blocca `body`, mentre lo scroll delle pagine interne appartiene a `main.layout-content`.                                                                                                                     | Gestire focus e blocco del contenitore effettivo. Verificare anche banner cookie e menu mobile con tastiera.                                       |
| P2       | `src/components/Header/Header.tsx` ascolta `window.scrollY`; le pagine interne scorrono nel contenitore.                                                                                                                                                                                                                    | Usare `getScrollEventTarget` e `getScrollTop`, aggiornando la registrazione al cambio pagina.                                                      |
| P2       | `SplashContext`, `SplashScreen` e `usePageLoading` accedono a `sessionStorage` senza fallback. Un errore dello storage può interrompere gli effetti di inizializzazione.                                                                                                                                                    | Gestire le eccezioni e verificare il sito con storage non disponibile.                                                                             |
| P2       | `src/components/PolicyLayout/PolicyLayout.tsx` genera la data di aggiornamento al rendering.                                                                                                                                                                                                                                | Usare una data editoriale esplicita: una visita o una build non rappresentano una revisione dei testi.                                             |
| P3       | Lo slider precarica tutte le copertine e slider/galleria usano immagini non ottimizzate. I test esistenti riguardano soprattutto desktop e caricamento.                                                                                                                                                                     | Misurare traffico e prestazioni su mobile prima di cambiare il precaricamento; aggiungere copertura mobile, consenso, navigazione e accessibilità. |

Le osservazioni sulle informative descrivono discrepanze nel codice e nei testi: non costituiscono una valutazione legale.

## Verifiche

- Node.js 22; lint, controllo TypeScript, Prettier e `git diff --check`: superati.
- Build di produzione tramite la suite Playwright: riuscita; 10 test su 10 superati.
- Test esistenti su slider, skeleton, caricamento incrementale e scroll; nuove regressioni su canonical, sitemap, movimento ridotto e riprova lightbox.
- Tutti i 155 percorsi immagine dei 14 progetti esistono, comprese le sequenze generate. Nessuna immagine mancante anche nei 25 riferimenti letterali locali rilevati nei sorgenti.
- Script staging verificato sintatticamente e con CLI simulata per entrambi gli alias. Il primo tentativo di simulazione tramite npm ha invece risolto la CLI reale, che ha respinto il token; nessun deployment o alias è stato aggiornato. Il deploy effettivo resta da verificare con credenziali valide.
