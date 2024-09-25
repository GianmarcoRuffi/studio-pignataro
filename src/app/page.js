"use client";
import React, { useState, useEffect, useRef } from "react";
import Slider from "../components/Slider/Slider";
import projects from "../data/data";
import styles from "./styles/page.home.module.css";
import MainSkeleton from "../components/MainSkeleton/MainSkeleton";

export default function Home() {
  const [isCurrentImageRendered, setIsCurrentImageRendered] = useState(false);
  const currentImageRef = useRef(null);

  useEffect(() => {
    if (!currentImageRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && entry.target.complete) {
          setIsCurrentImageRendered(true);
        }
      },
      { threshold: 0.5 }
    );

    if (currentImageRef.current) {
      observer.observe(currentImageRef.current);
    }

    return () => {
      if (currentImageRef.current) observer.unobserve(currentImageRef.current);
    };
  }, [currentImageRef]);

  return (
    <div className={styles.homeContainer}>
      {isCurrentImageRendered ? (
        <Slider projects={projects} currentImageRef={currentImageRef} />
      ) : (
        <MainSkeleton />
      )}
    </div>
  );
}
