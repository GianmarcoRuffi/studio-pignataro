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
    content:
      "Il Titolare del trattamento dei dati personali è l'Architetto Gianluca Pignataro, con sede in Via Arrigo Solmi 36, 09129 Cagliari (CA), Partita IVA: 02783940923, Email: glpignataro@yahoo.it",
  },
  {
    id: "tipologie",
    title: "2. Tipologie di dati raccolti",
    content: "Questo sito raccoglie alcuni dati personali degli utenti. I dati possono essere:",
    list: {
      items: [
        "<strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, sistema operativo, pagine visitate",
        "<strong>Dati forniti volontariamente:</strong> nome, email, messaggio (tramite form di contatto)",
        "<strong>Cookie tecnici:</strong> necessari per il funzionamento del sito",
        "<strong>Cookie di analisi:</strong> per migliorare l'esperienza utente (Google Analytics)",
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
        "Analisi statistiche anonime del traffico web",
        "Miglioramento della qualità del sito",
        "Adempimenti legali e fiscali",
      ],
    },
  },
  {
    id: "base-giuridica",
    title: "4. Base giuridica del trattamento",
    content:
      "Il trattamento è basato sul consenso dell'interessato (art. 6 lett. a GDPR) per le attività di marketing e profilazione, e sull'interesse legittimo (art. 6 lett. f GDPR) per l'erogazione dei servizi richiesti.",
  },
  {
    id: "conservazione",
    title: "5. Conservazione dei dati",
    content:
      "I dati personali sono conservati per il tempo strettamente necessario al conseguimento delle finalità per cui sono stati raccolti:",
    list: {
      items: [
        "Dati di contatto: 2 anni dalla raccolta",
        "Dati di navigazione: 26 mesi (Google Analytics)",
        "Cookie tecnici: durata della sessione",
      ],
    },
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

export const privacyContactEmail = "info@archpignataro.it";