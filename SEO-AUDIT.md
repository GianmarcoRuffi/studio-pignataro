# Audit SEO e prestazioni — 15 novembre 2026

Nota del 16 novembre 2026: rimossi gli indici visibili, la presentazione aggiuntiva
della monografia, i secondi paragrafi e i collegamenti editoriali aggiunti.
Metadati, sitemap, JSON-LD e ottimizzazioni di caricamento restano attivi.
Le misure seguenti documentano la build del 15 novembre, prima di questa rimozione.

## Copertura verificata

Crawl HTTP della sitemap e dell'HTML iniziale su produzione e build locale,
con lo script ripetibile `scripts/audit-seo.py`. Le segnalazioni riguardano
la risposta iniziale, non l'indicizzazione effettiva nel motore.

| Controllo                              | Produzione attuale   | Build locale SEO             |
| -------------------------------------- | -------------------- | ---------------------------- |
| URL verificati                         | 42                   | 42                           |
| Errori HTTP sulle pagine               | 0                    | 0                            |
| Canonical e alternanze IT/EN/x-default | presenti             | presenti                     |
| Titoli duplicati nella stessa lingua   | 0                    | 0                            |
| JSON-LD nell'HTML iniziale             | assente su 42 pagine | presente su 42 pagine        |
| Immagini dichiarate nella sitemap      | 0                    | 163 distinte, tutte HTTP 200 |

La produzione non include ancora le modifiche locali. L'assenza di JSON-LD
iniziale non prova un errore di indicizzazione: Google può eseguire JavaScript.
I controlli non sostituiscono Ispezione URL di Search Console.

Verificati anche HTTP e `www` verso HTTPS senza `www`, `robots.txt` raggiungibile,
404 per un percorso inesistente e header `X-Robots-Tag: noindex` sulle homepage
dei due alias `archpignataro-staging.vercel.app` e `studio-pignataro-stg.vercel.app`
(entrambi pubblici, HTTP 200). Production non restituisce quell'header sulle
risposte campionate.

## Lighthouse mobile

Lighthouse 13.6.0, Chromium headless, configurazione mobile e throttling simulato
predefiniti. Primo ingresso, senza preferenze memorizzate. Ogni riga è una singola
misura di laboratorio; hosting, cache, CPU e banner differiscono fra ambienti.
Non interpretare gli scarti produzione/locale come incrementi o regressioni
causati dal codice. Non sono dati CrUX e TBT non è INP.

| Ambiente e pagina            | Performance | Accessibilità | SEO | LCP simulato |
| ---------------------------- | ----------- | ------------- | --- | ------------ |
| Pubblico — home              | 83          | 96            | 100 | 0.96 s       |
| Pubblico — progetto          | 64          | 100           | 100 | 5.21 s       |
| Pubblico — pubblicazioni     | 55          | 96            | 100 | 5.98 s       |
| Locale prima — home          | 76          | 96            | 100 | 4.14 s       |
| Locale prima — progetto      | 57          | 100           | 100 | 6.32 s       |
| Locale prima — pubblicazioni | 68          | 100           | 100 | 8.34 s       |

Misure finali locali dopo la correzione di precaricamento e contrasto:

| Pagina               | Performance | Accessibilità | SEO | LCP simulato | Immagini trasferite |
| -------------------- | ----------- | ------------- | --- | ------------ | ------------------- |
| Homepage             | 78          | 100           | 100 | 4.68 s       | 81 KB               |
| Quartiere Vanchiglia | 66          | 100           | 100 | 5.72 s       | 173 KB              |
| Pubblicazioni        | 95          | 100           | 100 | 1.07 s       | 153 KB              |

Pubblicazioni: traffico immagini totale da 1.61 MB a 153 KB nelle due prove locali. Nessuna richiesta alle copertine originali dopo la correzione. Best Practices 100/100 e CLS 0 nelle tre prove finali. I punteggi restano campioni di laboratorio, non una stima statistica dell’esperienza reale.

Verifiche di regressione: build, lint, controllo tipi, formattazione e **79 test E2E superati**, compresa la verifica di rete delle copertine su desktop/mobile.

Il punteggio SEO 100 riguarda soltanto i controlli base di Lighthouse: non misura
ranking, copertura dell'indice, autorevolezza o completezza dei contenuti.
Il CLS osservato è 0 in tutte le prove iniziali.

## Problemi individuati e correzioni

- Il precaricamento delle schede scaricava copertine originali e poi le versioni
  responsive. Su Pubblicazioni la prova iniziale ha trasferito circa 1,5 MB di
  immagini originali, comprese copertine non ancora mostrate. Ora renderer e
  precaricamento condividono `sizes` e qualità; le durate minime degli skeleton
  restano invariate. Il test di rete controlla l'assenza dei download originali.
- Il testo secondario del banner cookie aveva contrasto 4,11:1, inferiore a
  4,5:1 per quel corpo. Ora usa `--color-text-tertiary`, coerente con il tema.
- Restano da monitorare LCP e lavoro JavaScript sul thread principale, soprattutto
  nei dettagli e nelle pubblicazioni. La verifica successiva va ripetuta sullo
  stesso hosting dopo il rilascio, integrandola con i dati reali disponibili.

## Presenza editoriale: azioni pronte

| Fonte verificata                                                                         | Evidenza                                                                                                     | Azione successiva                                                                                       |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| [Homify](https://www.homify.it/esperti/6791/studio-dott-arch-gianluca-pignataro)         | Sito e cellulare presenti; presentazione ferma a venti anni di esperienza                                    | Aggiornare il testo e completare l'indirizzo con i dati attuali                                         |
| [Edilportale](https://www.edilportale.com/gianluca-pignataro/)                           | Profilo e archivio progetti presenti; collegamento al dominio non trovato nel contenuto estratto             | Verificare dal pannello il campo sito e collegare i progetti alle schede canoniche                      |
| [Tubes](https://www.tubesradiatori.com/it/progetti/ristrutturazione-di-un-appartamento/) | Crediti dell'architetto e del fotografo presenti; collegamento al dominio non trovato nel contenuto estratto | Chiedere alla redazione un link alla scheda Via Machiavelli, già associata alla fonte nei dati del sito |

Le verifiche sul testo estratto non escludono collegamenti presenti in altre
parti del DOM. Nessun profilo è stato modificato e nessuna richiesta è stata
inviata a terzi.

Testo proposto per la presentazione Homify, basato sulla biografia dello studio:

> Studio dell'architetto Gianluca Pignataro a Cagliari. Laureato a Firenze, svolge
> da oltre trent'anni attività di progettazione architettonica, interior design,
> restauro e recupero dell'edilizia storica. Il portfolio comprende interventi
> residenziali e commerciali in Italia e a Puerto Rico. Progetti e pubblicazioni
> sono consultabili su archpignataro.it.

## Attività che richiedono account o rilascio

- Search Console: proprietà, query e pagine degli ultimi 28/90 giorni,
  indicizzazione Web/Immagini, canonical scelti da Google e invio sitemap.
- Bing Webmaster Tools: proprietà verificata e invio sitemap; Google Business
  Profile: verifica dati, proprietà e completezza della scheda.
- OpenSEO è stato individuato come possibile integrazione con Search Console;
  non risulta collegato in questa sessione. Nessun servizio a pagamento attivato.
- Dopo il rilascio: validazione Google Rich Results Test e Schema Markup Validator,
  ripetizione audit sul dominio canonico, controllo Preview noindex e confronti
  a 30/60/90 giorni. Non sono stati dichiarati esiti di questi strumenti esterni.

## Ripetere le misure

Avviare la build con Node 26 e il server locale, poi:

```bash
python3 scripts/audit-seo.py http://127.0.0.1:3100 /tmp/seo-local.json
python3 scripts/audit-seo.py https://archpignataro.it /tmp/seo-public.json
```

Per Lighthouse usare una versione fissata e un Chrome disponibile sul computer:

```bash
npx --yes lighthouse@13.6.0 https://archpignataro.it/ --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/lighthouse-home.json
```

In questa sessione i report JSON completi e i log sono in
`/tmp/studio-seo-audit/`. La sintesi in questo documento resta nel repository;
i report temporanei non vengono versionati.
