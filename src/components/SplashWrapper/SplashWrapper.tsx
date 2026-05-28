"use client";

import { FC, ReactNode } from "react";
import { UI_TIMINGS } from "../../constants";
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
        <SplashScreen
          onComplete={setSplashComplete}
          minDisplayTime={UI_TIMINGS.splash.initialMinDisplay}
        />
      )}
      <div
        style={{
          visibility: isSplashComplete ? "visible" : "hidden",
          opacity: isSplashComplete ? 1 : 0,
          transition: `opacity ${UI_TIMINGS.splash.contentFadeDuration}ms ease-in`,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default SplashWrapper;
