"use client";
import React from "react";
import Slider from "../components/Slider/Slider";
import projects from "../data/data";
import styles from "./styles/page.home.module.css";
import MainSkeleton from "../components/MainSkeleton/MainSkeleton";
import SplashScreen from "../components/SplashScreen/SplashScreen";
import { useArrayImageLoader } from "../hooks/useArrayImageLoader";

export default function Home() {
  const projectImages = projects.map((project) => project.image);

  const areImagesLoaded = useArrayImageLoader(projectImages);

  return (
    <div className={styles.homeContainer}>
              <SplashScreen />
      {areImagesLoaded ? <Slider projects={projects} /> : <MainSkeleton />}
    </div>
  );
}
