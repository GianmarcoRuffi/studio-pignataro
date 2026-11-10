# Produzione e staging su Vercel

Il progetto Vercel `studio-pignataro` è collegato a questo repository tramite
l'integrazione Git nativa. Vercel esegue installazione, build Next.js e deploy a
ogni push, senza richiedere secret Vercel in GitHub Actions.

| Branch    | Ambiente   | Indirizzo                                                                |
| --------- | ---------- | ------------------------------------------------------------------------ |
| `master`  | Production | https://archpignataro.it                                                 |
| `staging` | Preview    | https://studio-pignataro-git-staging-gianmarcoruffis-projects.vercel.app |

L'indirizzo di branch di staging segue l'ultimo deployment Preview riuscito.
Ogni deployment ha anche un proprio URL immutabile, disponibile nel controllo
`Vercel` del commit su GitHub e nel pannello Vercel.

## Aggiornare staging

Partire da un working tree pulito, aggiornare i riferimenti remoti e integrare
il branch da verificare:

```bash
git fetch origin
git switch staging
git merge --ff-only origin/staging
git merge --no-ff feature/nome-feature
git push origin staging
```

Attendere il controllo `Vercel` sul commit pubblicato. Deve terminare con
`Deployment has completed` e il deployment deve essere nell'ambiente `Preview`.
Un errore di build lascia disponibile l'ultimo deployment riuscito: leggere i
log del deployment fallito prima di considerare aggiornato staging.

Il vecchio workflow GitHub Actions `Deploy Staging` è stato rimosso: duplicava
l'integrazione nativa e falliva al passaggio `vercel pull` perché i secret
richiesti non erano configurati.

## Impostazioni Vercel da mantenere

- Production Branch: `master`; i domini di produzione restano associati a questo
  ambiente.
- Preview Deployments abilitati per `staging`, con le eventuali variabili
  d'ambiente nell'ambito Preview.
- Node.js Version: `26.x` (LTS), coerente con `.nvmrc` e con il vincolo
  `engines.node` in `package.json` e `package-lock.json`. Non usare `>=26`:
  Vercel potrebbe scegliere major successive anche con Node 26 nel pannello.
- Per l'ambiente locale con nvm, eseguire `nvm install` e `nvm use` dalla root
  prima di `npm ci`. La CLI Vercel del progetto è sulla linea 65; per eventuali
  deploy prebuilt con Node 26 è richiesta almeno la versione 65.8.0.
- Build Command: `npm run build`, senza l'override precedente `CI=' '`. La build
  Next.js è verificata anche con `CI=1`; il comando include la generazione della
  sitemap prevista dal progetto.
- Non promuovere i deployment di staging a Production e non associare loro il
  dominio `archpignataro.it`.
- Lo staging è intenzionalmente pubblico: nessuna autenticazione Vercel o
  password deve essere aggiunta alla Preview. Mantenerlo escluso dai motori di
  ricerca con l'header `X-Robots-Tag: noindex`: `next.config.js` lo aggiunge a
  tutte le risposte soltanto quando `VERCEL_ENV=preview`, coprendo anche i due
  alias personalizzati a cui Vercel non applica automaticamente l'header.
  Production e sviluppo locale non ricevono questo header dalla configurazione.

## Alias staging

Anche gli indirizzi seguenti sono registrati nei domini del progetto come
Preview collegate al Git branch `staging`, entrambi verificati:

- https://archpignataro-staging.vercel.app
- https://studio-pignataro-stg.vercel.app

Seguono automaticamente i deployment Git riusciti di `staging`, come l'URL di
branch principale; non puntano più al vecchio deploy manuale del febbraio 2026.

`npm run deploy:staging` resta disponibile per pubblicare manualmente una
Preview da `staging` e aggiornare gli alias `archpignataro-staging.vercel.app` e
`studio-pignataro-stg.vercel.app`. Richiede il progetto Vercel già collegato e
una sessione CLI autenticata oppure `VERCEL_TOKEN`; in CI servono anche
`VERCEL_ORG_ID` e `VERCEL_PROJECT_ID` se manca il collegamento locale.

Il comando manuale è facoltativo: il normale flusso di aggiornamento resta
`git push origin staging`.

Riferimenti: [Vercel per GitHub](https://vercel.com/docs/git/vercel-for-github),
[URL dei deployment](https://vercel.com/docs/deployments/generated-urls).
