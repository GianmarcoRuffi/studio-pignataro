"use client";

import { createContext, useContext, type ReactNode } from "react";
import { messages, type Dictionary, type Locale } from ".";

const LocaleContext = createContext<{ locale: Locale; messages: Dictionary }>({
  locale: "it",
  messages,
});

export function LocaleProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Dictionary;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, messages }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
