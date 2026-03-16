"use client";

import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import projects from "../../data/data";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";
import { useMultiImageLoader } from "../../hooks/useMultiImageLoader";
import styles from "./projects.module.scss";
import { Project } from "../../models/models";

const Projects: FC = () => {
  const [visibleCards, setVisibleCards] = useState(6);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [skeletonCount, setSkeletonCount] = useState(6);

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

  useEffect(() => {
    const updateSkeletonCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSkeletonCount(3);
      } else if (width < 1200) {
        setSkeletonCount(4);
      } else {
        setSkeletonCount(6);
      }
    };

    updateSkeletonCount();
    window.addEventListener("resize", updateSkeletonCount);

    return () => {
      window.removeEventListener("resize", updateSkeletonCount);
    };
  }, []);

  const loadMoreCards = useCallback(() => {
    if (isLoadingMore || visibleCards >= visibleProjects.length) return;

    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCards((prev) => Math.min(prev + 6, visibleProjects.length));
      setIsLoadingMore(false);
    }, 300);
  }, [isLoadingMore, visibleCards, visibleProjects.length]);

  useEffect(() => {
    if (isLoading || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleCards < visibleProjects.length
        ) {
          loadMoreCards();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isLoading, loadMoreCards, visibleCards, visibleProjects.length]);

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
                    key={index}
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
