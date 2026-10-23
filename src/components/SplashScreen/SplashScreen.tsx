"use client";
import { readSessionValue, writeSessionValue } from "../../utils/storage";

import { FC, useEffect, useState } from "react";
import {
  BRANDING_LOGO_DIMENSIONS,
  BRANDING_LOGO_PATH,
  UI_TIMINGS,
} from "../../constants";
import styles from "./SplashScreen.module.scss";

interface SplashScreenProps {
  onComplete: () => void;
  minDisplayTime?: number;
}

const SplashScreen: FC<SplashScreenProps> = ({
  onComplete,
  minDisplayTime = UI_TIMINGS.splash.defaultMinDisplay,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const splashShown = readSessionValue("splash-shown");

    if (splashShown) {
      onComplete();
      return;
    }

    let exitTimer: ReturnType<typeof setTimeout>;
    const timer = setTimeout(() => {
      setIsExiting(true);
      writeSessionValue("splash-shown", "true");

      exitTimer = setTimeout(() => {
        onComplete();
      }, UI_TIMINGS.splash.exitDuration);
    }, minDisplayTime);

    return () => {
      clearTimeout(timer);
      clearTimeout(exitTimer);
    };
  }, [minDisplayTime, onComplete]);

  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const splashShown = readSessionValue("splash-shown");
    if (splashShown) {
      setShouldRender(false);
    }
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`${styles.splashScreen} ${isExiting ? styles.exiting : ""}`}
    >
      <div className={styles.logoContainer}>
        <picture>
          <img
            src={BRANDING_LOGO_PATH}
            alt="Studio Architetto Gianluca Pignataro"
            width={BRANDING_LOGO_DIMENSIONS.width}
            height={BRANDING_LOGO_DIMENSIONS.height}
            className={styles.logo}
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      </div>
    </div>
  );
};

export default SplashScreen;
