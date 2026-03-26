"use client";

import {
  CSSProperties,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useMultiImageLoader } from "../../hooks/useMultiImageLoader";
import { useSplash } from "../../context/SplashContext";
import styles from "./slider.module.scss";
import { SliderProps } from "../../models/models";

const Slider: FC<SliderProps> = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isCookieVisible, setIsCookieVisible] = useState<boolean>(false);
  const slideContainerRef = useRef<HTMLDivElement | null>(null);
  const { isSplashComplete } = useSplash();

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

  const imageSources = useMemo(
    () => projects.slice(0, 3).map((project) => project.imgSrc),
    [projects]
  );
  const preloadRemainingImages = useCallback(() => {
    for (const project of projects.slice(3)) {
      const img = document.createElement("img");
      img.src = project.imgSrc;
    }
  }, [projects]);

  const { isLoading } = useMultiImageLoader(imageSources, {
    timeout: 6000,
    onComplete: preloadRemainingImages,
  });
  
  // Consider loading complete once splash is done OR images are loaded
  const effectiveLoading = !isSplashComplete && isLoading;

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isHovered && !effectiveLoading && !isCookieVisible && isSplashComplete) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
      }, 3000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isHovered, effectiveLoading, projects.length, isCookieVisible, isSplashComplete]);

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
        disabled={effectiveLoading}
        aria-label="Slide precedente"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      <div className={styles["slide-container"]} ref={slideContainerRef}>
        {projects.map((project, projectIndex) => {
          const isContain = project.imageFit === "contain";
          const wrapperStyle = isContain
            ? ({ "--slide-bg": `url(${project.imgSrc})` } as CSSProperties)
            : undefined;
          const imageStyle = {
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: project.imageFit ?? "cover",
            objectPosition: project.imagePosition ?? "center",
          } as CSSProperties;

          return (
            <div
              key={project.slug}
              className={`${styles.slide} ${projectIndex === activeIndex ? styles.active : ""}`}
            >
              <Link href={`/projects/${project.slug}`}>
                <div
                  className={`${styles.imageWrapper} ${
                    isContain ? styles.withBackdrop : ""
                  }`}
                  style={wrapperStyle}
                >
                  <Image
                    src={project.imgSrc}
                    alt={`Slide ${projectIndex + 1}`}
                    fill
                    sizes="100vw"
                    quality={95}
                    style={imageStyle}
                    priority={projectIndex <= 2}
                    loading={projectIndex > 2 ? "lazy" : "eager"}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
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
        disabled={effectiveLoading}
        aria-label="Slide successivo"
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </section>
  );
};

export default Slider;
