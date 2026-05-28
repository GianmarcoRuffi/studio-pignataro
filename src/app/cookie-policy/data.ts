export interface CookieTableRow {
  name: string;
  purpose: string;
  duration: string;
  type: string;
}

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
  cookieTable?: CookieTableRow[];
  contactInfo?: {
    email: string;
    phone: string;
    mobile: string;
    address: string;
    vat: string;
  };
}

export const cookiePolicyData: PolicySection[] = [
  {
    id: "cosa-sono",
    title: "1. Cosa sono i cookie",
    content:
      "I cookie sono piccoli file di testo che vengono memorizzati sul dispositivo dell'utente quando visita un sito web. Permettono al sito di ricordare le azioni e preferenze dell'utente per un certo periodo di tempo.",
  },
  {
    id: "tipologie",
    title: "2. Tipologie di cookie utilizzati",
    content: "",
    subsections: [
      {
        title: "Cookie tecnici necessari",
        content: "Questi cookie sono essenziali per il corretto funzionamento del sito:",
        list: {
          items: [
            "<strong>Cookie di sessione:</strong> mantengono la sessione di navigazione",
            "<strong>Cookie di preferenze:</strong> ricordano le scelte dell'utente",
            "<strong>Cookie di sicurezza:</strong> proteggono da attacchi informatici",
          ],
        },
      },
      {
        title: "Cookie di analisi",
        content: "Utilizziamo Google Analytics per raccogliere informazioni anonime su:",
        list: {
          items: [
            "Numero di visitatori del sito",
            "Pagine più visitate",
            "Tempo di permanenza sul sito",
            "Dispositivi e browser utilizzati",
          ],
        },
      },
    ],
  },
  {
    id: "terze-parti",
    title: "3. Cookie di terze parti",
    content: "Il sito può utilizzare servizi di terze parti che impostano i propri cookie:",
    list: {
      items: [
        "<strong>Google Analytics:</strong> analisi del traffico web",
        "<strong>Google Fonts:</strong> caricamento dei font personalizzati",
        "<strong>FontAwesome:</strong> icone e simboli grafici",
      ],
    },
  },
  {
    id: "gestione",
    title: "4. Gestione dei cookie",
    content: "Puoi gestire o disabilitare i cookie attraverso le impostazioni del tuo browser:",
    list: {
      items: [
        "<strong>Chrome:</strong> Impostazioni → Privacy e sicurezza → Cookie",
        "<strong>Firefox:</strong> Impostazioni → Privacy e sicurezza → Cookie",
        "<strong>Safari:</strong> Preferenze → Privacy → Cookie",
        "<strong>Edge:</strong> Impostazioni → Privacy → Cookie",
      ],
    },
  },
  {
    id: "consenso",
    title: "5. Consenso",
    content: [
      "L'utilizzo del sito implica l'accettazione dei cookie tecnici necessari. Per i cookie di analisi e marketing, il consenso viene richiesto attraverso il banner informativo.",
      "Il consenso può essere revocato in qualsiasi momento modificando le impostazioni del browser o contattandoci all'indirizzo: <a href=\"mailto:info@archpignataro.it\">info@archpignataro.it</a>",
    ],
  },
  {
    id: "dettaglio",
    title: "6. Cookie utilizzati nel dettaglio",
    content: "",
    cookieTable: [
      {
        name: "cookie-consent",
        purpose: "Memorizza il consenso dell'utente",
        duration: "1 anno",
        type: "Tecnico",
      },
      {
        name: "_ga",
        purpose: "Google Analytics - identificazione utenti",
        duration: "2 anni",
        type: "Analisi",
      },
      {
        name: "_ga_*",
        purpose: "Google Analytics - ID della proprietà",
        duration: "2 anni",
        type: "Analisi",
      },
    ],
  },
  {
    id: "contatti",
    title: "7. Contatti",
    content:
      "Per qualsiasi domanda riguardante questa Cookie Policy o per esercitare i tuoi diritti, contattaci:",
    contactInfo: {
      email: "glpignataro@yahoo.it",
      phone: "070 305880",
      mobile: "348 5189797",
      address: "Via Arrigo Solmi 36, 09129 Cagliari (CA)",
      vat: "02783940923",
    },
  },
];

export const cookieDisclaimerNote =
  "<strong>Nota:</strong> La disabilitazione dei cookie tecnici potrebbe compromettere il corretto funzionamento del sito.";