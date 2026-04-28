"use client";

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
  const [isSplashComplete, setIsSplashComplete] = useState(false);
  const [shouldShowSplash, setShouldShowSplash] = useState(true);

  useEffect(() => {
    const splashShown = sessionStorage.getItem("splash-shown");
    if (splashShown) {
      setIsSplashComplete(true);
      setShouldShowSplash(false);
    }
  }, []);

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
