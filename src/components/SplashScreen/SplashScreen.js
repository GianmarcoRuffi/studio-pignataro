"use client";
import { useEffect, useState } from "react";
import styles from "./splash-screen.module.css";

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisited");
    const hasSeenSplashThisSession = sessionStorage.getItem("hasSeenSplash");

    if (hasSeenSplashThisSession) {
      setShowSplash(false);
    } else if (hasVisitedBefore) {
      setShowSplash(false);
      sessionStorage.setItem("hasSeenSplash", true);
    } else {
      setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem("hasVisited", true);
        sessionStorage.setItem("hasSeenSplash", true);
      }, 2000);
    }
  }, []);

  if (!showSplash) {
    return null;
  }

  return (
    <div className={styles.splashContainer}>
      <img
        src={isDarkMode ? "/dark_theme_logo.jpg" : "/logo.jpg"}
        alt="Logo"
        className={styles.logo}
      />
    </div>
  );
};

export default SplashScreen;
