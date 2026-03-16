"use client";

import { FC, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookie } from "@fortawesome/free-solid-svg-icons";
import styles from "./CookieConsent.module.scss";

const CookieConsent: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookie-consent");
      if (!consent) {
        setTimeout(() => setIsVisible(true), 1000);
      }
    } catch (e) {
      console.warn("localStorage not available:", e);
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const notifyConsentChange = (status: "accepted" | "declined") => {
    if (typeof window === "undefined") return;

    window.dispatchEvent(
      new CustomEvent("cookie-consent-change", {
        detail: { status },
      }),
    );
  };

  const handleAccept = () => {
    try {
      localStorage.setItem("cookie-consent", "accepted");
      localStorage.setItem("cookie-consent-date", new Date().toISOString());
    } catch (e) {
      console.warn("Cannot save cookie consent:", e);
    }
    notifyConsentChange("accepted");
    closePopup();
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("cookie-consent", "declined");
      localStorage.setItem("cookie-consent-date", new Date().toISOString());
    } catch (e) {
      console.warn("Cannot save cookie consent:", e);
    }
    notifyConsentChange("declined");
    closePopup();
  };

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.cookieOverlay} ${isClosing ? styles.closing : ""}`}
    >
      <div
        className={`${styles.cookiePopup} ${isClosing ? styles.slideOut : styles.slideIn}`}
      >
        <div className={styles.cookieHeader}>
          <div className={styles.cookieIcon}>
            <FontAwesomeIcon icon={faCookie} />
          </div>
          <h3 className={styles.cookieTitle}>Utilizzo dei Cookie</h3>
        </div>

        <div className={styles.cookieContent}>
          <p className={styles.cookieText}>
            Questo sito utilizza cookie tecnici strettamente necessari per il
            corretto funzionamento della navigazione. Utilizziamo inoltre cookie
            di analisi e profilazione per migliorare la tua esperienza.
          </p>

          <p className={styles.cookieSubtext}>
            Continuando la navigazione accetti l'utilizzo dei cookie. Puoi
            modificare le tue preferenze nelle impostazioni del browser.
          </p>

          <p className={styles.cookieSubtext}>
            I cookie tecnici non possono essere disabilitati poiché il sito non
            funzionerebbe correttamente senza di essi. Puoi scegliere di
            accettare tutti i cookie o proseguire solo con quelli necessari.
          </p>

          <div className={styles.cookieLinks}>
            <a
              href="/privacy-policy"
              className={styles.policyLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            <a
              href="/cookie-policy"
              className={styles.policyLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Cookie Policy
            </a>
          </div>
        </div>

        <div className={styles.cookieActions}>
          <button
            type="button"
            className={styles.declineButton}
            onClick={handleDecline}
            aria-label="Rifiuta e accetta solo necessari"
          >
            Rifiuta e accetta solo necessari
          </button>
          <button
            type="button"
            className={styles.acceptButton}
            onClick={handleAccept}
            aria-label="Accetta tutti i cookie"
          >
            Accetta tutti
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
