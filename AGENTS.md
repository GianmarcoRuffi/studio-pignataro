# Repository Guidelines

## Manutenzione obbligatoria

Leggi questo file prima di intervenire. A ogni modifica del progetto, aggiorna `AGENTS.md` nello stesso intervento: allinea le indicazioni oppure registra l'intervento in «Ultimo aggiornamento». Elimina le informazioni superate; evita un changelog cumulativo.

## Architettura e contenuti

Portfolio italiano dello Studio Architetto Gianluca Pignataro: Next.js 16 App Router, React 19, TypeScript, Sass e Tailwind CSS 4, con contenuti locali.

- `src/data/projectsData.ts` alimenta slider, elenco e dettagli `/projects/[slug]`, inclusi metadati e `generateStaticParams`. Mantieni gli slug esistenti, sensibili alle maiuscole; `invisible` filtra l'elenco progetti, ma non impedisce la generazione del dettaglio.
- Il sistema visivo «Monografia contemporanea» usa token condivisi in `globals.scss`, Century Gothic per navigazione e didascalie e Source Serif 4 locale (con licenza OFL in `src/app/fonts`) per titoli e testi editoriali. L'elenco progetti usa due colonne uguali allineate, una sotto 769 px, copertine 3:2 e didascalie con filetto inferiore. Le gallerie mantengono righe giustificate, gap di 16 px e blocchi indipendenti di sei immagini; ogni foto dei dettagli, apertura compresa, ha una cornice grigia interna di 1 px con il token `--color-photo-border`, senza modificare la geometria. La prima foto di ogni galleria corrisponde alla copertina del carosello, senza duplicati nella sequenza. Ogni dettaglio apre con questa stessa foto a tutta larghezza, non cliccabile, con due chevron sovrapposti che seguono la navigazione ciclica precedente/successivo in fondo alla pagina, con etichette e nomi sotto le frecce, entrambi visibili solo su hover o focus da tastiera. Il dettaglio non mostra breadcrumb né il relativo spazio; la sequenza sottostante conserva tutte le foto, inclusa la prima, con lightbox. La foto di apertura usa un’altezza responsive compatta (`clamp(220px, 50vw, 52svh)`), seguita da titolo, descrizione e link con spaziature responsive e gerarchia tipografica proporzionata; rispetta `imageFit` e `imagePosition` del progetto e, con `contain`, riempie lo sfondo con la stessa immagine sfocata e scurita del carosello. Il ritratto della biografia mantiene il punto focale a sinistra; tutte le pubblicazioni, monografia compresa, usano colonne 32/68 e riquadri 16:9 con immagini intere centrate.
- Tutti i testi UI, editoriali, accessibili e SEO sono centralizzati in `src/locales/it.json` ed `en.json`, con stessa struttura e segnaposto nominati. `src/locales/index.ts` espone tipi, `formatMessage` e helper dei percorsi. Le pagine italiane mantengono gli URL originali; quelle inglesi usano `/en`. `src/proxy.ts` determina la lingua dal percorso e sovrascrive l’header interno; layout e metadati sono renderizzati per richiesta con `getServerMessages`, mentre i componenti client usano `LocaleProvider`. I dati editoriali espongono factory per dizionario e conservano gli export italiani compatibili. La bandierina dopo «Contatti» apre la stessa pagina nell’altra lingua con ricaricamento completo e tooltip «English Version»/«Versione Italiana», disponibile anche da tastiera e su mobile. Tutti i link interni conservano la lingua; canonical, hreflang e sitemap includono entrambe le versioni. Nessun cookie o rilevamento automatico della lingua. I moduli `data.ts` restano adattatori; URL, percorsi, identificatori e date editoriali restano tecnici. I contatti condivisi sono in `src/data/contactsData.ts`, i tipi in `src/models/models.ts`.
- Le immagini sono in `public/`; `src/utils/imageUtils.ts` genera anche percorsi numerati. Verifica corrispondenza tra nomi, quantità dichiarate e file effettivi.
- `src/constants/index.ts` centralizza URL, loghi, breakpoint e tempi di caricamento. Il logo principale e il suo sfondo chiaro sono usati da header, splash e schermata di caricamento indipendentemente dal tema del dispositivo; il file del logo scuro resta disponibile ma non è selezionato. I layout e `src/utils/metadata.ts` gestiscono i metadati; `StructuredData` produce JSON-LD.

## Comportamenti da preservare

Il layout radice coordina splash, header, footer e consenso cookie. L’header delle pagine interne passa da 88 a 76 px oltre 64 px di scroll e torna normale sotto 24 px, sincronizzando logo e spazio della pagina in 250 ms; homepage sempre a 88 px e movimento ridotto rispettato. Le pagine interne scorrono in `main.layout-content`, con `[data-scroll-content]` e Lenis; la homepage ospita lo slider senza scorrimento. Usa `src/utils/scroll.ts` per le operazioni di scroll e rispetta `prefers-reduced-motion`.

Gallerie e schede combinano precaricamento, skeleton e caricamento incrementale; conserva le durate minime definite in `LOADING`. `OptionalScripts` abilita i figli solo con consenso `accepted`, usando `cookie-consent` e l'evento `cookie-consent-change`.

## Comandi e verifiche

Usa Node.js 26 LTS (`.nvmrc` e `engines.node: "26.x"`) e npm con `package-lock.json`. Mantieni il vincolo della stessa major anche nel lockfile e nel pannello Vercel: un intervallo aperto come `>=26` può selezionare major successive. I tipi Node seguono la major 26; la CLI Vercel è sulla linea 65, compatibile con il nuovo runtime.

- `npm ci`; `npm run dev`.
- I push su `staging` generano Preview tramite l'integrazione Git nativa Vercel; `master` resta il branch di produzione. Flusso, URL stabile e impostazioni sono in `DEPLOYMENT.md`. Il vecchio workflow Actions duplicato è stato rimosso.
- `npm run deploy:staging` è facoltativo: da `staging` pubblica una Preview e aggiorna gli alias staging; richiede autenticazione CLI o `VERCEL_TOKEN` e progetto collegato. Gli stessi alias sono domini Preview collegati a `staging` e seguono anche i deploy Git automatici. Lo staging resta pubblico e con `noindex`.
- `npm run lint`; `npm run type-check`; `npm run format:check`.
- `npm run format` riscrive i file formattabili.
- `npm run build` rigenera `public/sitemap.xml` prima della build; `npm start` avvia la produzione.
- `next.config.js` aggiunge `X-Robots-Tag: noindex` soltanto con `VERCEL_ENV=preview`, anche sugli alias staging personalizzati. Conserva l'indicizzabilità di Production.
- `npm run playwright:install`; `npm run test:e2e`.
- Singolo test: `npm run test:e2e -- -g "homepage keeps the hero slider visible"`.

`tsconfig.json` esclude soltanto `.next/dev/types/validator.ts`: il validatore generato da `next dev` contiene import e tipi inutilizzati incompatibili con `noUnusedLocals`. Restano attivi i controlli strict sui sorgenti e il validatore delle rotte di produzione in `.next/types`.

Playwright avvia build e server sulla porta 3100; verifica slider, skeleton, caricamento incrementale e scroll. Per modifiche soltanto documentali verifica percorsi, comandi e formattazione.

## Convenzioni

TypeScript strict vieta variabili e parametri inutilizzati. ESLint usa Next Core Web Vitals; Prettier impone due spazi, doppi apici, punto e virgola, LF e larghezza 80. Segui PascalCase, SCSS Modules e import relativi esistenti. Commit prevalentemente `feat:`, `fix:` e `refactor:`, in inglese.

La review e le priorità residue sono in `CODE_REVIEW.md`; i test di regressione sono in `tests/e2e/review-regressions.spec.ts` e quelli del restyling in `tests/e2e/monograph.spec.ts`. Gli allineamenti di gallerie e pubblicazioni sono verificati in `tests/e2e/gallery-layout.spec.ts`.

## Consenso, modali e immagini

- `src/utils/consent.ts` e `useCookieConsent` condividono una preferenza valida per 365 giorni; senza data valida il consenso è assente. Il footer mantiene una sola riga e omette indirizzo, telefoni, email e partita IVA su tutte le pagine. Su desktop mostra copyright a sinistra e informative/preferenze a destra; sotto 769 px nasconde le informative e centra copyright e «Preferenze cookie». I recapiti restano nella pagina Contatti e nelle informative. La mappa Google passa da `OptionalScripts` e viene rimossa alla revoca.
- `useModalAccessibility` gestisce focus, Escape, isolamento con `inert` e blocco dello scroll interno/Lenis per lightbox, menu e banner. La lightbox usa un portal nel body. Le immagini delle pubblicazioni aprono la stessa modale con proporzioni native, rendering naturale e nessun ingrandimento oltre la risoluzione originale: clic o Invio/Spazio sull’immagine alternano vista adattata e dimensioni native, con scorrimento interno; la X ed Escape chiudono ripristinando il focus sulla copertina. I collegamenti agli articoli restano esterni.
- Usa `src/utils/storage.ts` per lo storage di sessione, con fallback in memoria. Le date editoriali delle informative sono esplicite nei rispettivi `data.ts`.
- Il carosello della homepage non mostra attualmente il nome del progetto né la freccia diagonale in basso a sinistra; conserva il contatore a destra, i chevron laterali e il collegamento sulla foto. Lo slider carica soltanto la slide attiva e le due adiacenti; slider e galleria usano immagini responsive ottimizzate, preservando il GIF animato. I test mobile misurano anche i byte delle copertine.

## Audit dipendenze

L'override di `tar` mantiene la linea 7 sulla patch di sicurezza 7.5.22 o successiva. L'audit produzione è privo di segnalazioni; l'audit completo rileva ancora vulnerabilità transitive degli strumenti di sviluppo, documentate in `CODE_REVIEW.md`. Non usare `npm audit fix --force` senza verificare le modifiche di versione proposte.

## Ultimo aggiornamento

2026-11-12: nascosti nome e freccia diagonale nel carosello della homepage; ribilanciata l’apertura dei dettagli progetto con foto più contenuta, titolo proporzionato e spazi responsive per descrizione, link e crediti.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
