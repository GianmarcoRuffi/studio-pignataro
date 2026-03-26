"use client";

import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";
import styles from "./privacy.module.scss";

export default function PrivacyPolicy() {
  return (
    <div className={styles.privacyContainer}>
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Privacy Policy</h1>
          <p className={styles.pageSubtitle}>
            Informativa sul trattamento dei dati personali
          </p>
          <p className={styles.lastUpdated}>
            Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT")}
          </p>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.privacyContent}>
          <section className={styles.section}>
            <h2>1. Titolare del trattamento</h2>
            <p>
              Il Titolare del trattamento dei dati personali è l'Architetto
              Gianluca Pignataro, con sede in Via Arrigo Solmi 36, 09129
              Cagliari (CA), Partita IVA: 02783940923, Email:
              glpignataro@yahoo.it
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Tipologie di dati raccolti</h2>
            <p>
              Questo sito raccoglie alcuni dati personali degli utenti. I dati
              possono essere:
            </p>
            <ul>
              <li>
                <strong>Dati di navigazione:</strong> indirizzo IP, tipo di
                browser, sistema operativo, pagine visitate
              </li>
              <li>
                <strong>Dati forniti volontariamente:</strong> nome, email,
                messaggio (tramite form di contatto)
              </li>
              <li>
                <strong>Cookie tecnici:</strong> necessari per il funzionamento
                del sito
              </li>
              <li>
                <strong>Cookie di analisi:</strong> per migliorare l'esperienza
                utente (Google Analytics)
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. Finalità del trattamento</h2>
            <p>I dati personali sono trattati per le seguenti finalità:</p>
            <ul>
              <li>Erogazione dei servizi richiesti</li>
              <li>Risposta alle richieste di contatto</li>
              <li>Analisi statistiche anonime del traffico web</li>
              <li>Miglioramento della qualità del sito</li>
              <li>Adempimenti legali e fiscali</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. Base giuridica del trattamento</h2>
            <p>
              Il trattamento è basato sul consenso dell'interessato (art. 6
              lett. a GDPR) per le attività di marketing e profilazione, e
              sull'interesse legittimo (art. 6 lett. f GDPR) per l'erogazione
              dei servizi richiesti.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Conservazione dei dati</h2>
            <p>
              I dati personali sono conservati per il tempo strettamente
              necessario al conseguimento delle finalità per cui sono stati
              raccolti:
            </p>
            <ul>
              <li>Dati di contatto: 2 anni dalla raccolta</li>
              <li>Dati di navigazione: 26 mesi (Google Analytics)</li>
              <li>Cookie tecnici: durata della sessione</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>6. Diritti dell'interessato</h2>
            <p>L'interessato ha diritto di ottenere dal Titolare:</p>
            <ul>
              <li>Accesso ai propri dati personali</li>
              <li>Rettifica o cancellazione degli stessi</li>
              <li>Limitazione del trattamento</li>
              <li>Portabilità dei dati</li>
              <li>Opposizione al trattamento</li>
              <li>Revoca del consenso</li>
            </ul>
            <p>
              Per esercitare i propri diritti, contattare:
              <a href="mailto:info@archpignataro.it">info@archpignataro.it</a>
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Reclami</h2>
            <p>
              L'interessato ha diritto di proporre reclamo al Garante per la
              protezione dei dati personali (www.gpdp.it) qualora ritenga che il
              trattamento che lo riguarda violi il Regolamento.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Modifiche alla Privacy Policy</h2>
            <p>
              Questa Privacy Policy può essere modificata periodicamente. Le
              modifiche saranno pubblicate su questa pagina con indicazione
              della data di ultimo aggiornamento.
            </p>
          </section>
        </div>
      </div>

      <ScrollUpButton />
    </div>
  );
}
