# Repository Guidelines

## Manutenzione obbligatoria

Leggi questo file prima di intervenire. A ogni modifica del progetto, aggiorna `AGENTS.md` nello stesso intervento: allinea le indicazioni oppure registra l'intervento in «Ultimo aggiornamento». Elimina le informazioni superate; evita un changelog cumulativo.

## Architettura e contenuti

Portfolio italiano dello Studio Architetto Gianluca Pignataro: Next.js 16 App Router, React 19, TypeScript, Sass e Tailwind CSS 4, con contenuti locali.

- `src/data/projectsData.ts` alimenta slider, elenco e dettagli `/projects/[slug]`, inclusi metadati e `generateStaticParams`. Mantieni gli slug esistenti, sensibili alle maiuscole; `invisible` filtra l'elenco progetti, ma non impedisce la generazione del dettaglio.
- Il branch `feature/contact-form` include `ContactForm` e `/api/contact`, con invio via Resend; richiede `RESEND_API_KEY`, `EMAIL_FROM` ed `EMAIL_TO`. Mantieni il form insieme al blocco della mappa prima del consenso.
- I contenuti delle altre pagine sono nei rispettivi `data.ts`; i contatti condivisi sono in `src/data/contactsData.ts`, i tipi in `src/models/models.ts`.
- Le immagini sono in `public/`; `src/utils/imageUtils.ts` genera anche percorsi numerati. Verifica corrispondenza tra nomi, quantità dichiarate e file effettivi.
- `src/constants/index.ts` centralizza URL, loghi, breakpoint e tempi di caricamento. Il logo principale e il suo sfondo chiaro sono usati da header, splash e schermata di caricamento indipendentemente dal tema del dispositivo; il file del logo scuro resta disponibile ma non è selezionato. I layout e `src/utils/metadata.ts` gestiscono i metadati; `StructuredData` produce JSON-LD.

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

## Consenso, modali e immagini

- `src/utils/consent.ts` e `useCookieConsent` condividono una preferenza valida per 365 giorni; senza data valida il consenso è assente. Il footer mantiene una sola riga: mostra tutti i dati sui desktop larghi, nasconde i contatti sotto 1366 px e le informative sotto 769 px, lasciando sempre visibili copyright e «Preferenze cookie». La mappa Google passa da `OptionalScripts` e viene rimossa alla revoca.
- `useModalAccessibility` gestisce focus, Escape, isolamento con `inert` e blocco dello scroll interno/Lenis per lightbox, menu e banner. La lightbox usa un portal nel body.
- Usa `src/utils/storage.ts` per lo storage di sessione, con fallback in memoria. Le date editoriali delle informative sono esplicite nei rispettivi `data.ts`.
- Lo slider carica soltanto la slide attiva e le due adiacenti; slider e galleria usano immagini responsive ottimizzate, preservando il GIF animato. I test mobile misurano anche i byte delle copertine.

## Audit dipendenze

L'override di `tar` mantiene la linea 7 sulla patch di sicurezza 7.5.22 o successiva. L'audit produzione è privo di segnalazioni; l'audit completo rileva ancora vulnerabilità transitive degli strumenti di sviluppo, documentate in `CODE_REVIEW.md`. Non usare `npm audit fix --force` senza verificare le modifiche di versione proposte.

## Ultimo aggiornamento

2026-10-23: mantenuto `dark-theme-logo.png` nel progetto, ma il logo standard e i relativi sfondi chiari sono ora usati anche con preferenza di sistema scura. Il footer resta su una sola riga alle diverse larghezze.
