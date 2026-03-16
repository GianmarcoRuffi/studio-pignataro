"use client";

import { FC, useState } from "react";
import Image from "next/image";
import styles from "./project-card.module.scss";
import { ProjectCardProps } from "../../models/models";

const ProjectCard: FC<ProjectCardProps> = ({
  name,
  imageSource,
  description,
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <article className={styles.projectCard}>
      <div className={styles.imageContainer}>
        <Image
          src={imageSource}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          className={`${styles.cardImage} ${loaded ? styles.loaded : styles.loading}`}
          onLoad={handleImageLoad}
        />
        <div className={styles.overlay}>
          <span className={styles.viewProject}>Visualizza Progetto</span>
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{name}</h3>
        </div>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </article>
  );
};

export default ProjectCard;
