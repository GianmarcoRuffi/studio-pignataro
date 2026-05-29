"use client";

import { FC } from "react";
import Image from "next/image";
import { useImageLoad } from "../../hooks/useImageLoad";
import { LOADING } from "../../constants";
import styles from "./project-card.module.scss";
import { ProjectCardProps } from "../../models/models";

const ProjectCard: FC<ProjectCardProps> = ({
  name,
  imageSource,
  description,
}) => {
  const loaded = useImageLoad(imageSource, {
    minimumLoadingTime: LOADING.IMAGE_SKELETON_MIN_DISPLAY,
  });

  return (
    <article className={styles.projectCard}>
      <div className={styles.imageContainer}>
        <div
          className={`${styles.imageSkeleton} ${
            loaded ? styles.skeletonHidden : styles.skeletonVisible
          }`}
        >
          <div className={styles.skeletonShimmer}></div>
        </div>
        <Image
          src={imageSource}
          alt={`${name} - ${description}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          className={`${styles.cardImage} ${loaded ? styles.loaded : styles.loading}`}
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
