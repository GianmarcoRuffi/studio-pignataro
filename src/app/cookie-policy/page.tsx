"use client";

import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";
import styles from "./cookie.module.scss";

export default function CookiePolicy() {
  return (
    <div className={styles.cookieContainer}>
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Cookie Policy</h1>
          <p className={styles.pageSubtitle}>
            Informativa sull'utilizzo dei cookie
          </p>
          <p className={styles.lastUpdated}>
            Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT")}
          </p>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.cookieContent}>
          <section className={styles.section}>
            <h2>1. Cosa sono i cookie</h2>
            <p>
              I cookie sono piccoli file di testo che vengono memorizzati sul
              dispositivo dell'utente quando visita un sito web. Permettono al
              sito di ricordare le azioni e preferenze dell'utente per un certo
              periodo di tempo.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Tipologie di cookie utilizzati</h2>

            <h3>Cookie tecnici necessari</h3>
            <p>
              Questi cookie sono essenziali per il corretto funzionamento del
              sito:
            </p>
            <ul>
              <li>
                <strong>Cookie di sessione:</strong> mantengono la sessione di
                navigazione
              </li>
              <li>
                <strong>Cookie di preferenze:</strong> ricordano le scelte
                dell'utente
              </li>
              <li>
                <strong>Cookie di sicurezza:</strong> proteggono da attacchi
                informatici
              </li>
            </ul>

            <h3>Cookie di analisi</h3>
            <p>
              Utilizziamo Google Analytics per raccogliere informazioni anonime
              su:
            </p>
            <ul>
              <li>Numero di visitatori del sito</li>
              <li>Pagine più visitate</li>
              <li>Tempo di permanenza sul sito</li>
              <li>Dispositivi e browser utilizzati</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. Cookie di terze parti</h2>
            <p>
              Il sito può utilizzare servizi di terze parti che impostano i
              propri cookie:
            </p>
            <ul>
              <li>
                <strong>Google Analytics:</strong> analisi del traffico web
              </li>
              <li>
                <strong>Google Fonts:</strong> caricamento dei font
                personalizzati
              </li>
              <li>
                <strong>FontAwesome:</strong> icone e simboli grafici
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. Gestione dei cookie</h2>
            <p>
              Puoi gestire o disabilitare i cookie attraverso le impostazioni
              del tuo browser:
            </p>
            <ul>
              <li>
                <strong>Chrome:</strong> Impostazioni → Privacy e sicurezza →
                Cookie
              </li>
              <li>
                <strong>Firefox:</strong> Impostazioni → Privacy e sicurezza →
                Cookie
              </li>
              <li>
                <strong>Safari:</strong> Preferenze → Privacy → Cookie
              </li>
              <li>
                <strong>Edge:</strong> Impostazioni → Privacy → Cookie
              </li>
            </ul>
            <p>
              <strong>Nota:</strong> La disabilitazione dei cookie tecnici
              potrebbe compromettere il corretto funzionamento del sito.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Consenso</h2>
            <p>
              L'utilizzo del sito implica l'accettazione dei cookie tecnici
              necessari. Per i cookie di analisi e marketing, il consenso viene
              richiesto attraverso il banner informativo.
            </p>
            <p>
              Il consenso può essere revocato in qualsiasi momento modificando
              le impostazioni del browser o contattandoci all'indirizzo:{" "}
              <a href="mailto:info@archpignataro.it">info@archpignataro.it</a>
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Cookie utilizzati nel dettaglio</h2>
            <div className={styles.cookieTable}>
              <div className={styles.tableHeader}>
                <span>Nome</span>
                <span>Scopo</span>
                <span>Durata</span>
                <span>Tipo</span>
              </div>
              <div className={styles.tableRow}>
                <span>cookie-consent</span>
                <span>Memorizza il consenso dell'utente</span>
                <span>1 anno</span>
                <span>Tecnico</span>
              </div>
              <div className={styles.tableRow}>
                <span>_ga</span>
                <span>Google Analytics - identificazione utenti</span>
                <span>2 anni</span>
                <span>Analisi</span>
              </div>
              <div className={styles.tableRow}>
                <span>_ga_*</span>
                <span>Google Analytics - ID della proprietà</span>
                <span>2 anni</span>
                <span>Analisi</span>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>7. Contatti</h2>
            <p>
              Per qualsiasi domanda riguardante questa Cookie Policy o per
              esercitare i tuoi diritti, contattaci:
            </p>
            <div className={styles.contactInfo}>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:glpignataro@yahoo.it">glpignataro@yahoo.it</a>
              </p>
              <p>
                <strong>Telefono:</strong>{" "}
                <a href="tel:+39070305880">070 305880</a>
              </p>
              <p>
                <strong>Cellulare:</strong>{" "}
                <a href="tel:+393485189797">348 5189797</a>
              </p>
              <p>
                <strong>Indirizzo:</strong> Via Arrigo Solmi 36, 09129 Cagliari
                (CA)
              </p>
              <p>
                <strong>P.IVA:</strong> 02783940923
              </p>
            </div>
          </section>
        </div>
      </div>

      <ScrollUpButton />
    </div>
  );
}
