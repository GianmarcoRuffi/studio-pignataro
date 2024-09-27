"use client";
import React, { useState, useEffect } from "react";
import Slider from "../components/Slider/Slider";
import projects from "../data/data";
import styles from "./styles/page.home.module.css";
import MainSkeleton from "../components/MainSkeleton/MainSkeleton";

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
    <div className={styles.homeContainer}>
      {isLoading ? <MainSkeleton /> : <Slider projects={projects} />}
    </div>
  );
}
