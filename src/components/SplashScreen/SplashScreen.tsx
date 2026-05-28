"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./SplashScreen.module.scss";

interface SplashScreenProps {
  onComplete: () => void;
  minDisplayTime?: number;
}

const SplashScreen: FC<SplashScreenProps> = ({
  onComplete,
  minDisplayTime = 1500,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const splashShown = sessionStorage.getItem("splash-shown");
    
    if (splashShown) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setIsExiting(true);
      sessionStorage.setItem("splash-shown", "true");
      
      setTimeout(() => {
        onComplete();
      }, 600);
    }, minDisplayTime);

    return () => clearTimeout(timer);
  }, [minDisplayTime, onComplete]);

  const [shouldRender, setShouldRender] = useState(true);
  
  useEffect(() => {
    const splashShown = sessionStorage.getItem("splash-shown");
    if (splashShown) {
      setShouldRender(false);
    }
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className={`${styles.splashScreen} ${isExiting ? styles.exiting : ""}`}>
      <div className={styles.logoContainer}>
        <Image
          src="/branding/logo.jpg"
          alt="Studio Architetto Gianluca Pignataro"
          width={400}
          height={133}
          priority
          className={styles.logo}
          style={{ width: "auto", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
