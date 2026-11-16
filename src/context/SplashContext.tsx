"use client";
import { usePathname } from "next/navigation";
import { stripLocale } from "../locales";
import { readSessionValue } from "../utils/storage";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
  FC,
} from "react";

interface SplashContextType {
  isSplashComplete: boolean;
  setSplashComplete: () => void;
  shouldShowSplash: boolean;
}

const SplashContext = createContext<SplashContextType | undefined>(undefined);

export const useSplash = (): SplashContextType => {
  const context = useContext(SplashContext);
  if (!context) {
    throw new Error("useSplash must be used within a SplashProvider");
  }
  return context;
};

interface SplashProviderProps {
  children: ReactNode;
}

export const SplashProvider: FC<SplashProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const [isHomeEntry] = useState(() => stripLocale(pathname) === "/");
  const [isSplashComplete, setIsSplashComplete] = useState(!isHomeEntry);
  const [shouldShowSplash, setShouldShowSplash] = useState(false);

  useEffect(() => {
    // Decide once per document entry, before revealing the homepage content.
    const show = isHomeEntry && !readSessionValue("splash-shown");
    setShouldShowSplash(show);
    setIsSplashComplete(!show);
  }, [isHomeEntry]);

  const setSplashComplete = useCallback(() => {
    setIsSplashComplete(true);
  }, []);

  return (
    <SplashContext.Provider
      value={{ isSplashComplete, setSplashComplete, shouldShowSplash }}
    >
      {children}
    </SplashContext.Provider>
  );
};
