import { sharedContactsData } from "../../data/contactsData";

export interface PolicySection {
  id: string;
  title: string;
  content: string | string[];
  list?: {
    items: string[];
    type?: "ul" | "ol";
  };
  subsections?: Array<{
    title: string;
    content: string;
    list?: {
      items: string[];
      type?: "ul" | "ol";
    };
  }>;
}

export const privacyPolicyData: PolicySection[] = [
  {
    id: "titolare",
    title: "1. Titolare del trattamento",
    content: `Il Titolare del trattamento dei dati personali è l’Architetto Gianluca Pignataro, con sede in ${sharedContactsData.studio}, Partita IVA: ${sharedContactsData.vatNumber}, Email: ${sharedContactsData.email.address}`,
  },
  {
    id: "tipologie",
    title: "2. Tipologie di dati raccolti",
    content:
      "Questo sito raccoglie alcuni dati personali degli utenti. I dati possono essere:",
    list: {
      items: [
        "<strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, sistema operativo, pagine visitate",
        "<strong>Dati forniti volontariamente:</strong> nome, email e messaggio inviati tramite il form di contatto, via email o comunicati telefonicamente allo studio",
        "<strong>Preferenze locali:</strong> scelta sui servizi facoltativi e stato delle schermate introduttive, memorizzati nel browser",
        "<strong>Google Maps:</strong> dati tecnici comunicati a Google soltanto quando autorizzi la mappa nella pagina Contatti",
      ],
    },
  },
  {
    id: "finalita",
    title: "3. Finalità del trattamento",
    content: "I dati personali sono trattati per le seguenti finalità:",
    list: {
      items: [
        "Erogazione dei servizi richiesti",
        "Risposta alle richieste di contatto",
        "Visualizzazione della mappa facoltativa previo consenso",
        "Sicurezza e funzionamento della navigazione",
        "Adempimenti legali e fiscali",
      ],
    },
  },
  {
    id: "base-giuridica",
    title: "4. Base giuridica del trattamento",
    content:
      "La mappa facoltativa viene attivata con il consenso dell’interessato (art. 6, par. 1, lett. a GDPR), revocabile tramite «Preferenze cookie» nel footer. Le richieste di consulenza sono trattate per adottare misure precontrattuali o eseguire il servizio richiesto (lett. b); gli adempimenti previsti dalla legge si basano sulla lett. c. La sicurezza e il funzionamento del sito perseguono il legittimo interesse alla sua erogazione (lett. f).",
  },
  {
    id: "conservazione",
    title: "5. Conservazione dei dati",
    content:
      "I dati personali sono conservati per il tempo strettamente necessario al conseguimento delle finalità per cui sono stati raccolti:",
    list: {
      items: [
        "Dati di contatto: per il tempo necessario a gestire la richiesta e gli eventuali obblighi contrattuali o di legge",
        "Preferenze dei servizi facoltativi: validità di 365 giorni; stato delle schermate introduttive: sessione della scheda",
        "Dati tecnici dell’hosting e di Google Maps: secondo i tempi e le condizioni dei rispettivi fornitori",
      ],
    },
  },
  {
    id: "fornitori",
    title: "Fornitori e collegamenti esterni",
    content: [
      'L’hosting è erogato da Vercel, che riceve i dati tecnici necessari a rispondere alle richieste del browser. Consulta <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">l’informativa di Vercel</a> per il trattamento effettuato dal fornitore.',
      'Google Maps resta bloccato fino al consenso. Dopo l’attivazione si applicano anche <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">le condizioni privacy di Google</a>, comprese le informazioni su destinatari e trasferimenti internazionali. La disattivazione rimuove la mappa, senza cancellare i dati già ricevuti da Google.',
      "Il form di contatto invia nome, indirizzo email e messaggio all’API del sito, che utilizza Resend per recapitare l’email allo studio. La gestione della richiesta include controlli anti-spam e di frequenza basati sull’indirizzo IP.",
      "I collegamenti a siti e social esterni vengono aperti solo su tua azione; si applicano le informative dei siti visitati.",
    ],
  },
  {
    id: "diritti",
    title: "6. Diritti dell'interessato",
    content: "L'interessato ha diritto di ottenere dal Titolare:",
    list: {
      items: [
        "Accesso ai propri dati personali",
        "Rettifica o cancellazione degli stessi",
        "Limitazione del trattamento",
        "Portabilità dei dati",
        "Opposizione al trattamento",
        "Revoca del consenso",
      ],
    },
  },
  {
    id: "reclami",
    title: "7. Reclami",
    content:
      "L'interessato ha diritto di proporre reclamo al Garante per la protezione dei dati personali (www.gpdp.it) qualora ritenga che il trattamento che lo riguarda violi il Regolamento.",
  },
  {
    id: "modifiche",
    title: "8. Modifiche alla Privacy Policy",
    content:
      "Questa Privacy Policy può essere modificata periodicamente. Le modifiche saranno pubblicate su questa pagina con indicazione della data di ultimo aggiornamento.",
  },
];

export const privacyContactEmail = sharedContactsData.email.address;
export const privacyPolicyUpdatedAt = "2026-10-23";
