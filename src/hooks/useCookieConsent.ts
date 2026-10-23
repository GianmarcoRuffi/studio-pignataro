"use client";

import { useEffect, useState } from "react";
import {
  CONSENT_CHANGE_EVENT,
  readConsent,
  type ConsentStatus,
} from "../utils/consent";

export function useCookieConsent() {
  const [status, setStatus] = useState<ConsentStatus | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const evaluate = () => {
      clearTimeout(timer);
      const consent = readConsent();
      setStatus(consent?.status ?? null);
      setIsReady(true);
      if (consent) {
        timer = setTimeout(
          evaluate,
          Math.min(consent.expiresAt - Date.now(), 2_147_483_647)
        );
      }
    };
    const handleStorage = (event: StorageEvent) => {
      if (
        event.key === null ||
        event.key === "cookie-consent" ||
        event.key === "cookie-consent-date"
      )
        evaluate();
    };
    evaluate();
    window.addEventListener(CONSENT_CHANGE_EVENT, evaluate);
    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", evaluate);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(CONSENT_CHANGE_EVENT, evaluate);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", evaluate);
    };
  }, []);

  return { status, isReady };
}
