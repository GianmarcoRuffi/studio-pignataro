"use client";
import { useEffect, useState } from "react";
import styles from "./splash-screen.module.scss";

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisited");
    const hasSeenSplashThisSession = sessionStorage.getItem("hasSeenSplash");

    if (hasSeenSplashThisSession) {
      // If the splash has been seen in this session, don't show it again
      setShowSplash(false);
    } else if (hasVisitedBefore) {
      // If the user has visited before, just set a session flag to not show again
      setShowSplash(false);
      sessionStorage.setItem("hasSeenSplash", true);
    } else {
      // Show the splash screen and then set both local and session flags
      setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem("hasVisited", true); // Remember the user for future sessions
        sessionStorage.setItem("hasSeenSplash", true); // Don't show again in this session
      }, 2000);
    }
  }, []);

  if (!showSplash) {
    return null;
  }

  return (
    <div className={styles.splashContainer}>
      <img src="/logo.jpg" alt="Logo" className={styles.logo} />
    </div>
  );
};

export default SplashScreen;
