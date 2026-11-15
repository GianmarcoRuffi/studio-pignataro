# SEO — gestione e verifica

Obiettivo: notorietà di Gianluca Pignataro, progetti e pubblicazioni, anche nella
ricerca immagini. Nessuna nuova pagina editoriale o piattaforma a pagamento.

Risultati del primo audit e azioni editoriali: [SEO-AUDIT.md](SEO-AUDIT.md).

## Monitoraggio esterno

1. Verificare con il titolare la proprietà Search Console di archpignataro.it.
   Conservare il file di verifica Google esistente. Il meta token va confrontato
   con quello fornito dall'account: il nome del file non prova la validità del meta.
2. Registrare la baseline disponibile (28 e 90 giorni): query, pagine, paese,
   dispositivo e ricerca Web/Immagini. Separare ricerche sul nome dalle altre.
3. Inviare https://archpignataro.it/sitemap.xml a Google e Bing Webmaster Tools;
   Bing permette l'importazione della proprietà verificata Search Console.
4. Ispezionare homepage, biografia, pubblicazioni e almeno due progetti in IT/EN:
   canonical scelto, scansione, rendering e motivi di esclusione. Non dedurre
   l'indicizzazione dal solo numero di risultati di una ricerca `site:`.
5. Verificare Google Business Profile: nome reale, indirizzo, recapiti e sito.
   Controllare gli stessi dati su LinkedIn, Facebook e profili di architettura.
6. Eseguire crawl HTML con Screaming Frog gratuito (500 URL; rendering JavaScript
   escluso); Playwright copre il DOM renderizzato. Verificare JSON-LD con Schema
   Markup Validator e Rich Results Test, per i tipi supportati da Google.
7. Rilevare prestazioni mobile con PageSpeed Insights prima e dopo il rilascio:
   homepage, progetto e pubblicazioni. Obiettivi sul campo al 75° percentile:
   LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1; Lighthouse è una misura di laboratorio.
8. Dopo 30/60/90 giorni confrontare periodi comparabili: clic, impression, CTR,
   ricerche sul nome, accessi ai progetti e pubblicazioni, immagini e copertura.
   Annotare data del rilascio, correzioni editoriali e stagionalità.

Gli account non sono stati collegati o modificati da questo intervento. La
raccolta della baseline e gli esiti di indicizzazione restano da completare con
accessi verificati; ranking, rich result e indicizzazione non sono garantiti.

## Mappa query e contenuti

| Destinazione         | Intento da verificare in Search Console                               |
| -------------------- | --------------------------------------------------------------------- |
| Homepage e biografia | Gianluca Pignataro architetto; Studio Pignataro Cagliari              |
| Progetti             | Nome progetto + intervento + località effettiva                       |
| Progetti di recupero | Restauro e ristrutturazione centro storico nelle località documentate |
| Pubblicazioni        | Gianluca Pignataro pubblicazioni; 30 anni di inconsuetudine           |

Affinare titoli e descrizioni usando query osservate, senza inventare volumi o
ripetere keyword. Le località dei progetti fuori Sardegna restano quelle reali.
Testi italiani e inglesi hanno la stessa struttura; il nome ufficiale della
monografia non viene tradotto. `details` contiene soltanto fatti documentati;
quando mancano fonti resta vuoto. Gli approfondimenti iniziali derivano dalle
esperienze professionali presenti nella biografia, non da ipotesi sulle immagini.

Predisporre per lo studio un elenco di citazioni da aggiornare su testate e
portali già presenti nei dati, privilegiando backlink alla scheda pertinente.
Gli eventuali contatti editoriali e richieste alle testate sono a cura dello studio.

## Manutenzione tecnica

- Metadati: helper condiviso; Open Graph e Twitter completi perché Next.js
  sostituisce gli oggetti annidati. Nessun meta keywords.
- Dati strutturati: script nativo server con escape di `<`; tipi `schema-dts`
  soltanto in sviluppo. Non attribuire all'architetto la curatela della monografia.
- Sitemap: fonte unica `src/app/sitemap.ts`, immagini originali deduplicate,
  alternanze reciproche e slug invariati. `updatedAt` è una data ISO opzionale da
  impostare solo a seguito di una modifica editoriale effettiva; altrimenti manca
  `lastmod`. Non introdurre date di build, priority o changefreq.
- Gli indici nativi espandibili sono disponibili senza JavaScript e non dipendono
  dai filtri o dalla griglia progressiva. Le immagini restano responsive.
- Preview conserva `X-Robots-Tag: noindex`; Production resta indicizzabile.
- Verificare condivisioni social, 404 e redirect HTTP/www dopo il rilascio.

Riferimenti: [Google SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide),
[sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap),
[JSON-LD Next.js](https://nextjs.org/docs/app/guides/json-ld).
