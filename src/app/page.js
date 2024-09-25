"use client";
import React, { useState, useEffect, useRef } from "react";
import Slider from "../components/Slider/Slider";
import projects from "../data/data";
import styles from "./styles/page.home.module.css";
import MainSkeleton from "../components/MainSkeleton/MainSkeleton";
import { useArrayImageLoader } from "../hooks/useArrayImageLoader";

export default function Home() {
  const projectImages = projects.map((project) => project.image);
  const [isRendered, setIsRendered] = useState(false);
  const containerRef = useRef(null);

  const areImagesLoaded = useArrayImageLoader(projectImages);

  useEffect(() => {
    if (areImagesLoaded) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList" || mutation.type === "attributes") {
            setIsRendered(true);
          }
        });
      });

      if (containerRef.current) {
        observer.observe(containerRef.current, {
          childList: true,
          attributes: true,
        });
      }

      return () => {
        if (containerRef.current) {
          observer.disconnect();
        }
      };
    }
  }, [areImagesLoaded]);

  return (
    <div className={styles.homeContainer} ref={containerRef}>
      {isRendered ? <Slider projects={projects} /> : <MainSkeleton />}
    </div>
  );
}
