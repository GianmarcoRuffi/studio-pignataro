"use client";

import { FC, useCallback, useMemo, useState } from "react";
import Link from "next/link";
import projects from "../../data/data";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";
import { useInfiniteLoadTrigger } from "../../hooks/useInfiniteLoadTrigger";
import { useMultiImageLoader } from "../../hooks/useMultiImageLoader";
import { useResponsiveSkeletonCount } from "../../hooks/useResponsiveSkeletonCount";
import styles from "./projects.module.scss";
import { Project } from "../../models/models";

const Projects: FC = () => {
  const [visibleCards, setVisibleCards] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const skeletonCount = useResponsiveSkeletonCount();

  const visibleProjects = useMemo(
    () => projects.filter((project) => !project.invisible),
    []
  );
  const initialImages = useMemo(
    () => visibleProjects.slice(0, 6).map((project) => project.imgSrc),
    [visibleProjects]
  );
  const preloadRemainingImages = useCallback(() => {
    visibleProjects.slice(6).forEach((project) => {
      const img = document.createElement("img");
      img.src = project.imgSrc;
    });
  }, [visibleProjects]);

  const { isLoading } = useMultiImageLoader(initialImages, {
    timeout: 4000,
    onComplete: preloadRemainingImages,
  });

  const preloadImage = useCallback((src: string) => {
    return new Promise<void>((resolve) => {
      const img = new window.Image();
      let isSettled = false;

      const settle = () => {
        if (isSettled) {
          return;
        }

        isSettled = true;
        resolve();
      };

      img.onload = settle;
      img.onerror = settle;
      img.src = src;

      if (img.complete) {
        settle();
      }
    });
  }, []);

  const loadMoreCards = useCallback(() => {
    if (isLoadingMore || visibleCards >= visibleProjects.length) return;

    const nextVisibleCards = Math.min(visibleCards + 6, visibleProjects.length);
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
  }, [isLoadingMore, preloadImage, visibleCards, visibleProjects]);

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
            {Array.from({ length: skeletonCount }, (_, index) => (
              <div
                key={`skeleton-${index}`}
                className={styles.cardSkeleton}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.skeletonPlaceholder}></div>
                <div className={styles.skeletonText}>
                  <div className={styles.skeletonTitle}></div>
                  <div className={styles.skeletonDesc}></div>
                  <div className={styles.skeletonDesc}></div>
                </div>
              </div>
            ))}
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
                  <div className={styles.cardGrid}>
                    {Array.from(
                      {
                        length: Math.min(
                          6,
                          visibleProjects.length - visibleCards
                        ),
                      },
                      (_, index) => (
                        <div
                          key={`skeleton-more-${index}`}
                          className={styles.cardSkeleton}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className={styles.skeletonPlaceholder}></div>
                          <div className={styles.skeletonText}>
                            <div className={styles.skeletonTitle}></div>
                            <div className={styles.skeletonDesc}></div>
                            <div className={styles.skeletonDesc}></div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
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
