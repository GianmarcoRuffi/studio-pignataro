"use client";

import { FC, ReactNode, useEffect, useState } from "react";

type OptionalScriptsProps = {
  children?: ReactNode;
};

const OptionalScripts: FC<OptionalScriptsProps> = ({ children }) => {
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const evaluateConsent = () => {
      try {
        const consent = localStorage.getItem("cookie-consent");
        setIsAllowed(consent === "accepted");
      } catch {
        setIsAllowed(false);
      }
    };

    const handleConsentChange = (event: Event) => {
      const status = (event as CustomEvent<{ status?: string }>).detail?.status;
      if (status === "accepted" || status === "declined") {
        setIsAllowed(status === "accepted");
        return;
      }
      evaluateConsent();
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "cookie-consent") {
        evaluateConsent();
      }
    };

    evaluateConsent();
    window.addEventListener(
      "cookie-consent-change",
      handleConsentChange as EventListener,
    );
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(
        "cookie-consent-change",
        handleConsentChange as EventListener,
      );
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  if (!isAllowed) return null;

  return <>{children}</>;
};

export default OptionalScripts;
