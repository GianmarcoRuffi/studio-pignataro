# Repository Guidelines

## Manutenzione obbligatoria

Leggi questo file prima di intervenire. A ogni modifica del progetto, aggiorna `AGENTS.md` nello stesso intervento: allinea le indicazioni oppure registra l'intervento in «Ultimo aggiornamento». Elimina le informazioni superate; evita un changelog cumulativo.

## Architettura e contenuti

Portfolio italiano dello Studio Architetto Gianluca Pignataro: Next.js 16 App Router, React 19, TypeScript, Sass e Tailwind CSS 4, con contenuti locali.

- `src/data/projectsData.ts` alimenta slider, elenco e dettagli `/projects/[slug]`, inclusi metadati e `generateStaticParams`. Mantieni gli slug esistenti, sensibili alle maiuscole; `invisible` filtra l'elenco progetti, ma non impedisce la generazione del dettaglio.
- I contenuti delle altre pagine sono nei rispettivi `data.ts`; i contatti condivisi sono in `src/data/contactsData.ts`, i tipi in `src/models/models.ts`.
- Le immagini sono in `public/`; `src/utils/imageUtils.ts` genera anche percorsi numerati. Verifica corrispondenza tra nomi, quantità dichiarate e file effettivi.
- `src/constants/index.ts` centralizza URL, loghi chiaro/scuro, breakpoint e tempi di caricamento. I layout e `src/utils/metadata.ts` gestiscono i metadati; `StructuredData` produce JSON-LD.

## Comportamenti da preservare

Il layout radice coordina splash, header, footer e consenso cookie. Le pagine interne scorrono in `main.layout-content`, con `[data-scroll-content]` e Lenis; la homepage ospita lo slider senza scorrimento. Usa `src/utils/scroll.ts` per le operazioni di scroll e rispetta `prefers-reduced-motion`.

Gallerie e schede combinano precaricamento, skeleton e caricamento incrementale; conserva le durate minime definite in `LOADING`. `OptionalScripts` abilita i figli solo con consenso `accepted`, usando `cookie-consent` e l'evento `cookie-consent-change`.

## Comandi e verifiche

Usa Node.js 22 (`.nvmrc`) e npm con `package-lock.json`.

- `npm ci`; `npm run dev`.
- `npm run deploy:staging` esegue lo script Vercel e aggiorna gli alias staging; richiede autenticazione CLI o `VERCEL_TOKEN` e progetto collegato.
- `npm run lint`; `npm run type-check`; `npm run format:check`.
- `npm run format` riscrive i file formattabili.
- `npm run build` rigenera `public/sitemap.xml` prima della build; `npm start` avvia la produzione.
- `npm run playwright:install`; `npm run test:e2e`.
- Singolo test: `npm run test:e2e -- -g "homepage keeps the hero slider visible"`.

Playwright avvia build e server sulla porta 3100; verifica slider, skeleton, caricamento incrementale e scroll. Per modifiche soltanto documentali verifica percorsi, comandi e formattazione.

## Convenzioni

TypeScript strict vieta variabili e parametri inutilizzati. ESLint usa Next Core Web Vitals; Prettier impone due spazi, doppi apici, punto e virgola, LF e larghezza 80. Segui PascalCase, SCSS Modules e import relativi esistenti. Commit prevalentemente `feat:`, `fix:` e `refactor:`, in inglese.

La review e le priorità residue sono in `CODE_REVIEW.md`; i test di regressione aggiunti sono in `tests/e2e/review-regressions.spec.ts`.

## Problemi noti

- Le informative dichiarano Google Analytics, Google Fonts e un form contatti non presenti nell'applicazione; allineare i testi ai servizi effettivi e definire conservazione e revoca delle preferenze. La mappa Google nei contatti viene caricata indipendentemente da `OptionalScripts`.
- La lightbox richiede gestione del focus e blocco dello scroll del contenitore interno; l'header legge ancora lo scroll di `window`.
- Le date delle informative sono generate al rendering, anziché rappresentare una revisione editoriale esplicita.

## Ultimo aggiornamento

2026-10-23: review del progetto; corretti sitemap, comando staging, canonical delle pagine interne, riprova e pannello errore lightbox, esclusione report generati dai controlli, riduzione movimento e accessibilità delle slide inattive; allineati caricamento galleria e formattazione. Verificati i 155 percorsi immagine dei 14 progetti; build, lint, TypeScript, Prettier e 10 test Playwright superati.
