"use client";

import { CSSProperties, FC, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { UI_TIMINGS } from "../../constants";
import { useSplash } from "../../context/SplashContext";
import styles from "./slider.module.scss";
import { SliderProps } from "../../models/models";

const Slider: FC<SliderProps> = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isCookieVisible, setIsCookieVisible] = useState<boolean>(false);
  const slideContainerRef = useRef<HTMLDivElement | null>(null);
  const { isSplashComplete } = useSplash();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(media.matches);
    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);
    return () => media.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const handleCookieVisibility = (e: Event) => {
      const customEvent = e as CustomEvent<{ isVisible: boolean }>;
      setIsCookieVisible(customEvent.detail.isVisible);
    };

    window.addEventListener("cookie-popup-visible", handleCookieVisibility);
    return () => {
      window.removeEventListener(
        "cookie-popup-visible",
        handleCookieVisibility
      );
    };
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(
      () => setIsLoading(false),
      UI_TIMINGS.slider.imageLoadTimeout
    );
    return () => clearTimeout(timeout);
  }, []);

  const effectiveLoading = !isSplashComplete && isLoading;

  const nextSlide = () => {
    if (effectiveLoading) {
      return;
    }

    setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    if (effectiveLoading) {
      return;
    }

    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (
      !prefersReducedMotion &&
      !isHovered &&
      !effectiveLoading &&
      !isCookieVisible &&
      isSplashComplete
    ) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
      }, UI_TIMINGS.slider.autoplayInterval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    prefersReducedMotion,
    isHovered,
    effectiveLoading,
    projects.length,
    isCookieVisible,
    isSplashComplete,
  ]);

  useEffect(() => {
    if (slideContainerRef.current !== null) {
      slideContainerRef.current.style.height = `${slideContainerRef.current.scrollHeight}px`;
    }
  }, [activeIndex]);

  return (
    <section
      className={styles.slider}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Slider progetti"
    >
      <button
        type="button"
        className={`${styles.prev} ${styles.sliderButton} ${
          isHovered && !effectiveLoading ? styles.visible : styles.hidden
        }`}
        onClick={prevSlide}
        aria-label="Slide precedente"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      <div className={styles["slide-container"]} ref={slideContainerRef}>
        {projects.map((project, projectIndex) => {
          const effectiveImageFit = project.imageFit ?? "cover";
          const isContain = effectiveImageFit === "contain";
          const shouldLoad =
            projectIndex === activeIndex ||
            projectIndex === (activeIndex + 1) % projects.length ||
            projectIndex ===
              (activeIndex - 1 + projects.length) % projects.length;
          const imageStyle = {
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: effectiveImageFit,
            objectPosition: project.imagePosition ?? "center",
          } as CSSProperties;

          return (
            <div
              key={project.slug}
              className={`${styles.slide} ${projectIndex === activeIndex ? styles.active : ""}`}
              aria-hidden={projectIndex !== activeIndex}
              inert={projectIndex !== activeIndex}
            >
              <Link href={`/projects/${project.slug}`}>
                <div
                  className={`${styles.imageWrapper} ${
                    isContain ? styles.withBackdrop : ""
                  }`}
                >
                  {shouldLoad && isContain && (
                    <Image
                      src={project.imgSrc}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="100vw"
                      quality={85}
                      className={styles.slideBackdrop}
                      loading="eager"
                    />
                  )}
                  {shouldLoad && (
                    <Image
                      src={project.imgSrc}
                      alt={project.projectName}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                      quality={85}
                      style={imageStyle}
                      loading="eager"
                      fetchPriority={
                        projectIndex === activeIndex ? "high" : "low"
                      }
                      onLoad={() => {
                        if (projectIndex === activeIndex) setIsLoading(false);
                      }}
                      onError={() => {
                        if (projectIndex === activeIndex) setIsLoading(false);
                      }}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className={`${styles.next} ${styles.sliderButton} ${
          isHovered && !effectiveLoading ? styles.visible : styles.hidden
        }`}
        onClick={nextSlide}
        aria-label="Slide successivo"
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </section>
  );
};

export default Slider;
