"use client";

import { FC, useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookie, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSplash } from "../../context/SplashContext";
import { LEGAL_PATHS, UI_TIMINGS } from "../../constants";
import { useCookieConsent } from "../../hooks/useCookieConsent";
import { useModalAccessibility } from "../../hooks/useModalAccessibility";
import { CONSENT_OPEN_EVENT, saveConsent } from "../../utils/consent";
import styles from "./CookieConsent.module.scss";

const CookieConsent: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { isSplashComplete } = useSplash();

  const { status, isReady } = useCookieConsent();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closePopup = () => {
    setIsClosing(true);
    closeTimer.current = setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, UI_TIMINGS.cookieConsent.closeDuration);
  };
  const handleAccept = () => {
    saveConsent("accepted");
    closePopup();
  };
  const handleDecline = () => {
    saveConsent("declined");
    closePopup();
  };
  useModalAccessibility(isVisible, dialogRef, handleDecline);

  useEffect(() => {
    if (!isSplashComplete || !isReady || status !== null) return;
    const timer = setTimeout(
      () => setIsVisible(true),
      UI_TIMINGS.cookieConsent.showDelay
    );
    return () => clearTimeout(timer);
  }, [isSplashComplete, isReady, status]);

  useEffect(() => {
    const open = () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      setIsClosing(false);
      setIsVisible(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => {
      window.removeEventListener(CONSENT_OPEN_EVENT, open);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("cookie-popup-visible", { detail: { isVisible } })
    );
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.cookieOverlay} ${isClosing ? styles.closing : ""}`}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        tabIndex={-1}
        data-lenis-prevent
        className={`${styles.cookiePopup} ${isClosing ? styles.slideOut : styles.slideIn}`}
      >
        <div className={styles.cookieHeader}>
          <div className={styles.cookieIcon}>
            <FontAwesomeIcon icon={faCookie} />
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleDecline}
            aria-label="Chiudi e usa solo necessari"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h3 id="cookie-consent-title" className={styles.cookieTitle}>
            Utilizzo dei Cookie
          </h3>
        </div>

        <div className={styles.cookieContent}>
          <p className={styles.cookieText}>
            Il sito memorizza le preferenze di navigazione sul tuo dispositivo.
            La mappa Google Maps è un servizio esterno facoltativo e viene
            caricata solo se la autorizzi.
          </p>
          <p className={styles.cookieSubtext}>
            Puoi rifiutare i servizi facoltativi e continuare a visitare il
            sito. La scelta vale per un anno; puoi cambiarla in qualsiasi
            momento tramite «Preferenze cookie» nel footer. La navigazione non
            esprime consenso.
          </p>

          <div className={styles.cookieLinks}>
            <a
              href={LEGAL_PATHS.privacyPolicy}
              className={styles.policyLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            <a
              href={LEGAL_PATHS.cookiePolicy}
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
            aria-label="Solo necessari"
          >
            Solo necessari
          </button>
          <button
            type="button"
            className={styles.acceptButton}
            onClick={handleAccept}
            aria-label="Accetta servizi facoltativi"
          >
            Accetta servizi facoltativi
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
