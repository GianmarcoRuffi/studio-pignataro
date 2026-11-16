"use client";
import { FC, useMemo } from "react";
import Slider from "../components/Slider/Slider";
import { getProjects } from "../data/projectsData";
import { useLocale } from "../locales/LocaleProvider";
import styles from "./styles/page.home.module.scss";

const Home: FC = () => {
  const { messages } = useLocale();
  const projects = useMemo(() => getProjects(messages), [messages]);
  return (
    <div className={styles.homeContainer}>
      <Slider projects={projects} />
    </div>
  );
};

export default Home;
