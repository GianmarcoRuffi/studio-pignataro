"use client";
import { useEffect, useState } from 'react';
import styles from './splash-screen.module.css';

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (hasVisited) {
      setShowSplash(false);
    } else {
      setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem('hasVisited', true);
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