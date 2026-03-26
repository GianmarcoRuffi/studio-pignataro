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
    // Check if splash was already shown in this session
    const splashShown = sessionStorage.getItem("splash-shown");
    
    if (splashShown) {
      // Skip splash if already shown
      onComplete();
      return;
    }

    // Show splash for minimum time then exit
    const timer = setTimeout(() => {
      setIsExiting(true);
      
      // Mark splash as shown for this session
      sessionStorage.setItem("splash-shown", "true");
      
      // Wait for exit animation to complete
      setTimeout(() => {
        onComplete();
      }, 600);
    }, minDisplayTime);

    return () => clearTimeout(timer);
  }, [minDisplayTime, onComplete]);

  // Don't render if already shown
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
          src="/logo.jpg"
          alt="Studio Architetto Gianluca Pignataro"
          width={400}
          height={133}
          priority
          className={styles.logo}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
