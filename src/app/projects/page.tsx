"use client";

import { FC, useCallback, useMemo, useState } from "react";
import Link from "next/link";
import projects from "../../data/projectsData";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";
import { useInfiniteLoadTrigger } from "../../hooks/useInfiniteLoadTrigger";
import { useMultiImageLoader } from "../../hooks/useMultiImageLoader";
import { useResponsiveSkeletonCount } from "../../hooks/useResponsiveSkeletonCount";
import { preloadImage } from "../../utils/imageUtils";
import { LOADING } from "../../constants";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import styles from "./projects.module.scss";
import { Project } from "../../models/models";

const Projects: FC = () => {
  const [visibleCards, setVisibleCards] = useState<number>(LOADING.INITIAL_ITEMS);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const skeletonCount = useResponsiveSkeletonCount();

  const visibleProjects = useMemo(
    () => projects.filter((project) => !project.invisible),
    []
  );
  const initialImages = useMemo(
    () => visibleProjects.slice(0, LOADING.INITIAL_ITEMS).map((project) => project.imgSrc),
    [visibleProjects]
  );
  const preloadRemainingImages = useCallback(() => {
    visibleProjects.slice(LOADING.INITIAL_ITEMS).forEach((project) => {
      const img = document.createElement("img");
      img.src = project.imgSrc;
    });
  }, [visibleProjects]);

  const { isLoading } = useMultiImageLoader(initialImages, {
    timeout: 4000,
    onComplete: preloadRemainingImages,
  });

  const loadMoreCards = useCallback(() => {
    if (isLoadingMore || visibleCards >= visibleProjects.length) return;

    const nextVisibleCards = Math.min(visibleCards + LOADING.ITEMS_PER_LOAD, visibleProjects.length);
    const nextImageSources = visibleProjects
      .slice(visibleCards, nextVisibleCards)
      .map((project) => project.imgSrc);

    setIsLoadingMore(true);

    void Promise.all(nextImageSources.map((src) => preloadImage(src))).finally(
      () => {
        setVisibleCards(nextVisibleCards);
        setIsLoadingMore(false);
      }
    );
  }, [isLoadingMore, visibleCards, visibleProjects]);

  const hasMoreCards = visibleCards < visibleProjects.length;
  const loadMoreRef = useInfiniteLoadTrigger({
    enabled: !isLoading,
    hasMore: hasMoreCards,
    onIntersect: loadMoreCards,
    threshold: 0.01,
    rootMargin: "900px 0px",
  });

  return (
    <div className={styles.projectsContainer}>
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Progetti</h1>
          <p className={styles.pageSubtitle}>
            Una selezione dei miei progetti di architettura e interior design,
            dalla ristrutturazione di edifici storici a soluzioni innovative per
            interni contemporanei.
          </p>
        </div>
      </div>

      <div className={styles.contentSection}>
        {isLoading ? (
          <div className={styles.cardGrid}>
            <CardSkeleton
              count={skeletonCount}
              descriptionLines={3}
              className={styles.cardSkeleton}
              placeholderClassName={styles.skeletonPlaceholder}
              textClassName={styles.skeletonText}
              titleClassName={styles.skeletonTitle}
              descClassName={styles.skeletonDesc}
            />
          </div>
        ) : (
          <>
            <div className={styles.cardGrid}>
              {visibleProjects
                .slice(0, visibleCards)
                .map((project: Project, index: number) => (
                  <div
                    key={project.slug}
                    className={styles.cardWrapper}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Link href={`/projects/${project.slug}`}>
                      <ProjectCard
                        name={project.projectName}
                        imageSource={project.imgSrc}
                        description={project.description}
                      />
                    </Link>
                  </div>
                ))}
            </div>

            {visibleCards < visibleProjects.length && (
              <div className={styles.loadMoreSection} ref={loadMoreRef}>
                {isLoadingMore && (
                  <>
                    <div className={styles.loadingIndicator}>
                      <div className={styles.spinner}></div>
                      <span>Caricamento progetti...</span>
                    </div>
                    <div className={styles.cardGrid}>
                      <CardSkeleton
                        count={Math.min(LOADING.ITEMS_PER_LOAD, visibleProjects.length - visibleCards)}
                        descriptionLines={3}
                        className={styles.cardSkeleton}
                        placeholderClassName={styles.skeletonPlaceholder}
                        textClassName={styles.skeletonText}
                        titleClassName={styles.skeletonTitle}
                        descClassName={styles.skeletonDesc}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <ScrollUpButton />
    </div>
  );
};

export default Projects;
