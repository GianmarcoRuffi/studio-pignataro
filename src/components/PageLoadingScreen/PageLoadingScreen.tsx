"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import {
  BRANDING_LOGO_DIMENSIONS,
  BRANDING_LOGO_PATH,
  UI_TIMINGS,
} from "../../constants";
import styles from "./page-loading-screen.module.scss";

interface PageLoadingScreenProps {
  onLoadingComplete: () => void;
}

const PageLoadingScreen: FC<PageLoadingScreenProps> = ({
  onLoadingComplete,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  useEffect(() => {
    if (!isLogoLoaded) return;

    let hideTimer: number | undefined;
    const fadeTimer = window.setTimeout(() => {
      setIsFading(true);

      hideTimer = window.setTimeout(() => {
        setIsVisible(false);
        onLoadingComplete();
      }, UI_TIMINGS.pageLoading.fadeOutDuration);
    }, UI_TIMINGS.pageLoading.logoDisplayDuration);

    return () => {
      clearTimeout(fadeTimer);
      if (hideTimer !== undefined) {
        clearTimeout(hideTimer);
      }
    };
  }, [isLogoLoaded, onLoadingComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`${styles.loadingContainer} ${isFading ? styles.fadeOut : ""}`}
    >
      <Image
        src={BRANDING_LOGO_PATH}
        alt="Logo"
        width={BRANDING_LOGO_DIMENSIONS.width}
        height={BRANDING_LOGO_DIMENSIONS.height}
        className={styles.logo}
        style={{ width: "auto", height: "auto" }}
        onLoad={() => setIsLogoLoaded(true)}
        onError={() => setIsLogoLoaded(true)}
      />
    </div>
  );
};

export default PageLoadingScreen;
