"use client";

import { type FC, type ReactNode } from "react";
import { useCookieConsent } from "../../hooks/useCookieConsent";

type OptionalScriptsProps = {
  children?: ReactNode;
  fallback?: ReactNode;
};

const OptionalScripts: FC<OptionalScriptsProps> = ({
  children,
  fallback = null,
}) => {
  const { status } = useCookieConsent();
  return <>{status === "accepted" ? children : fallback}</>;
};

export default OptionalScripts;
