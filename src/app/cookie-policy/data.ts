import { sharedContactsData } from "../../data/contactsData";

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

export const cookiePolicyUpdatedAt = "2026-10-23";

export const cookiePolicyData: PolicySection[] = [
  {
    id: "cosa-sono",
    title: "1. Cookie e memoria del browser",
    content:
      "I cookie e le memorie locali del browser permettono di conservare informazioni sul dispositivo. Questo sito usa localStorage per ricordare la scelta sui servizi facoltativi e sessionStorage per gestire le schermate introduttive durante la visita.",
  },
  {
    id: "tipologie",
    title: "2. Strumenti utilizzati dal sito",
    content:
      "Le preferenze di navigazione sono memorizzate sul dispositivo. Il sito non integra Google Analytics o strumenti di marketing; i font e le icone sono serviti dal sito, senza collegamenti a Google Fonts o CDN FontAwesome.",
  },
  {
    id: "terze-parti",
    title: "3. Mappa Google Maps",
    content: [
      'La pagina Contatti può mostrare una mappa fornita da Google Maps. La mappa resta disattivata finché non scegli «Accetta servizi facoltativi». Dopo l’attivazione il browser si collega a Google, comunicando dati tecnici quali indirizzo IP e informazioni del dispositivo; Google può usare propri cookie e strumenti di memoria secondo le sue impostazioni. Per i dettagli consulta <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">l’informativa privacy di Google</a>.',
    ],
  },
  {
    id: "gestione",
    title: "4. Gestione delle preferenze",
    content:
      "Il pulsante «Preferenze cookie» nel footer, disponibile anche su mobile, permette di cambiare la scelta in ogni momento. «Solo necessari» impedisce il caricamento della mappa e rimuove quella eventualmente aperta. La revoca interrompe le nuove connessioni della mappa ma non cancella i dati già ricevuti da Google o i cookie di terze parti: questi possono essere eliminati nelle impostazioni del browser.",
  },
  {
    id: "consenso",
    title: "5. Durata della scelta",
    content:
      "La scelta viene registrata con la data e resta valida per 365 giorni, poi viene richiesta nuovamente. Una scelta senza data valida è considerata scaduta. Navigare o scorrere la pagina non autorizza servizi facoltativi. Se il browser impedisce la memorizzazione, la scelta vale soltanto durante la visita corrente.",
  },
  {
    id: "dettaglio",
    title: "6. Memorie locali utilizzate",
    content:
      "Queste voci sono memorie locali del browser, non cookie inviati al server. È possibile cancellarle tramite le impostazioni del browser.",
    cookieTable: [
      {
        name: "cookie-consent",
        purpose: "Scelta accepted o declined (localStorage)",
        duration: "365 giorni",
        type: "Preferenza tecnica",
      },
      {
        name: "cookie-consent-date",
        purpose: "Data della scelta e controllo della scadenza (localStorage)",
        duration: "365 giorni",
        type: "Preferenza tecnica",
      },
      {
        name: "splash-shown / siteVisited",
        purpose: "Evita di ripetere le schermate introduttive (sessionStorage)",
        duration: "Sessione della scheda",
        type: "Navigazione",
      },
    ],
  },
  {
    id: "contatti",
    title: "7. Contatti",
    content: "Per informazioni su questa pagina contatta lo studio:",
    contactInfo: {
      email: sharedContactsData.email.address,
      phone: sharedContactsData.phone.landline,
      mobile: sharedContactsData.phone.mobile,
      address: sharedContactsData.studio,
      vat: sharedContactsData.vatNumber,
    },
  },
];

export const cookieDisclaimerNote =
  "<strong>Nota:</strong> rifiutare i servizi facoltativi consente di consultare comunque il portfolio e i contatti dello studio.";
