# Repository Guidelines

## Manutenzione obbligatoria

Leggi questo file prima di intervenire. A ogni modifica del progetto, aggiorna `AGENTS.md` nello stesso intervento: allinea le indicazioni oppure registra l'intervento in «Ultimo aggiornamento». Elimina le informazioni superate; evita un changelog cumulativo.

## Architettura e contenuti

Portfolio italiano dello Studio Architetto Gianluca Pignataro: Next.js 16 App Router, React 19, TypeScript, Sass e Tailwind CSS 4, con contenuti locali.

- `src/data/projectsData.ts` alimenta slider, elenco e dettagli `/projects/[slug]`, inclusi metadati e `generateStaticParams`. Mantieni gli slug esistenti, sensibili alle maiuscole; `invisible` filtra l'elenco progetti, ma non impedisce la generazione del dettaglio.
- Il sistema visivo «Monografia contemporanea» usa token condivisi in `globals.scss`, Century Gothic per navigazione e didascalie e Source Serif 4 locale (con licenza OFL in `src/app/fonts`) per titoli e testi editoriali. Fotografie senza cornici decorative, elenco progetti 7/5 alternato e galleria sequenziale a due colonne con prima immagine ampia. Il ritratto della biografia mantiene il punto focale a sinistra; la monografia usa il rapporto panoramico originale del composito, senza ritagli.
- I contenuti delle altre pagine sono nei rispettivi `data.ts`; i contatti condivisi sono in `src/data/contactsData.ts`, i tipi in `src/models/models.ts`.
- Le immagini sono in `public/`; `src/utils/imageUtils.ts` genera anche percorsi numerati. Verifica corrispondenza tra nomi, quantità dichiarate e file effettivi.
- `src/constants/index.ts` centralizza URL, loghi, breakpoint e tempi di caricamento. Il logo principale e il suo sfondo chiaro sono usati da header, splash e schermata di caricamento indipendentemente dal tema del dispositivo; il file del logo scuro resta disponibile ma non è selezionato. I layout e `src/utils/metadata.ts` gestiscono i metadati; `StructuredData` produce JSON-LD.

## Comportamenti da preservare

Il layout radice coordina splash, header, footer e consenso cookie. Le pagine interne scorrono in `main.layout-content`, con `[data-scroll-content]` e Lenis; la homepage ospita lo slider senza scorrimento. Usa `src/utils/scroll.ts` per le operazioni di scroll e rispetta `prefers-reduced-motion`.

Gallerie e schede combinano precaricamento, skeleton e caricamento incrementale; conserva le durate minime definite in `LOADING`. `OptionalScripts` abilita i figli solo con consenso `accepted`, usando `cookie-consent` e l'evento `cookie-consent-change`.

## Comandi e verifiche

Usa Node.js 22 (`.nvmrc`) e npm con `package-lock.json`.

- `npm ci`; `npm run dev`.
- I push su `staging` generano Preview tramite l'integrazione Git nativa Vercel; `master` resta il branch di produzione. Flusso, URL stabile e impostazioni sono in `DEPLOYMENT.md`. Il vecchio workflow Actions duplicato è stato rimosso.
- `npm run deploy:staging` è facoltativo: da `staging` pubblica una Preview e aggiorna soltanto gli alias precedenti; richiede autenticazione CLI o `VERCEL_TOKEN` e progetto collegato. Gli alias non seguono i deploy Git automatici.
- `npm run lint`; `npm run type-check`; `npm run format:check`.
- `npm run format` riscrive i file formattabili.
- `npm run build` rigenera `public/sitemap.xml` prima della build; `npm start` avvia la produzione.
- `npm run playwright:install`; `npm run test:e2e`.
- Singolo test: `npm run test:e2e -- -g "homepage keeps the hero slider visible"`.

`tsconfig.json` esclude soltanto `.next/dev/types/validator.ts`: il validatore generato da `next dev` contiene import e tipi inutilizzati incompatibili con `noUnusedLocals`. Restano attivi i controlli strict sui sorgenti e il validatore delle rotte di produzione in `.next/types`.

Playwright avvia build e server sulla porta 3100; verifica slider, skeleton, caricamento incrementale e scroll. Per modifiche soltanto documentali verifica percorsi, comandi e formattazione.

## Convenzioni

TypeScript strict vieta variabili e parametri inutilizzati. ESLint usa Next Core Web Vitals; Prettier impone due spazi, doppi apici, punto e virgola, LF e larghezza 80. Segui PascalCase, SCSS Modules e import relativi esistenti. Commit prevalentemente `feat:`, `fix:` e `refactor:`, in inglese.

La review e le priorità residue sono in `CODE_REVIEW.md`; i test di regressione sono in `tests/e2e/review-regressions.spec.ts` e quelli del restyling in `tests/e2e/monograph.spec.ts`.

## Consenso, modali e immagini

- `src/utils/consent.ts` e `useCookieConsent` condividono una preferenza valida per 365 giorni; senza data valida il consenso è assente. Il footer mantiene una sola riga: mostra tutti i dati sui desktop larghi, nasconde i contatti sotto 1366 px e le informative sotto 769 px, lasciando sempre visibili copyright e «Preferenze cookie». La mappa Google passa da `OptionalScripts` e viene rimossa alla revoca.
- `useModalAccessibility` gestisce focus, Escape, isolamento con `inert` e blocco dello scroll interno/Lenis per lightbox, menu e banner. La lightbox usa un portal nel body.
- Usa `src/utils/storage.ts` per lo storage di sessione, con fallback in memoria. Le date editoriali delle informative sono esplicite nei rispettivi `data.ts`.
- Lo slider carica soltanto la slide attiva e le due adiacenti; slider e galleria usano immagini responsive ottimizzate, preservando il GIF animato. I test mobile misurano anche i byte delle copertine.

## Audit dipendenze

L'override di `tar` mantiene la linea 7 sulla patch di sicurezza 7.5.22 o successiva. L'audit produzione è privo di segnalazioni; l'audit completo rileva ancora vulnerabilità transitive degli strumenti di sviluppo, documentate in `CODE_REVIEW.md`. Non usare `npm audit fix --force` senza verificare le modifiche di versione proposte.

## Ultimo aggiornamento

2026-11-10: integrato `feature/layout-change` in `staging`. Staging usa i deploy Preview nativi Vercel e l'URL stabile di branch; rimosso il workflow Actions duplicato senza secret. Documentato il flusso in `DEPLOYMENT.md` e reso esplicito e limitato a `staging` il comando facoltativo per gli alias precedenti.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
