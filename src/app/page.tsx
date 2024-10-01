"use client";
import React, { useState, useEffect } from "react";
import { Project, HomeProps } from "../interfaces/interfaces";
import Slider from "../components/Slider/Slider";
import projects from "../data/data";
import styles from "./styles/page.home.module.scss";
import MainSkeleton from "../components/MainSkeleton/MainSkeleton";

const Home: React.FC<HomeProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const imagePromises = (projects as Project[]).map((project) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = project.imgSrc;
        img.onload = () => resolve();
        img.onerror = () => resolve();
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
};

export default Home;
