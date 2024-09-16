"use client";
import React, { useState, useEffect } from "react";
import Slider from "../components/Slider";
import projects from "../data/data";
import styles from "./page.home.module.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const imagePromises = projects.map((project) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = project.image;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all(imagePromises).then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div className={styles.sliderContainer}>
      {isLoading ? (
        <div className={styles.sliderSkeleton}>
          <div className={styles.loader}></div>
        </div>
      ) : (
        <Slider projects={projects} />
      )}
    </div>
  );
}
