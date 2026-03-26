"use client";

import { FC, ReactNode } from "react";
import { useSplash } from "../../context/SplashContext";
import SplashScreen from "../SplashScreen/SplashScreen";

interface SplashWrapperProps {
  children: ReactNode;
}

const SplashWrapper: FC<SplashWrapperProps> = ({ children }) => {
  const { isSplashComplete, setSplashComplete, shouldShowSplash } = useSplash();

  return (
    <>
      {shouldShowSplash && !isSplashComplete && (
        <SplashScreen onComplete={setSplashComplete} minDisplayTime={1800} />
      )}
      <div
        style={{
          visibility: isSplashComplete ? "visible" : "hidden",
          opacity: isSplashComplete ? 1 : 0,
          transition: "opacity 0.3s ease-in",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default SplashWrapper;
