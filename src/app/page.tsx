"use client";
import { FC } from "react";
import Slider from "../components/Slider/Slider";
import projects from "../data/projectsData";
import styles from "./styles/page.home.module.scss";

const Home: FC = () => {
  return (
    <div className={styles.homeContainer}>
      <Slider projects={projects} />
    </div>
  );
};

export default Home;
