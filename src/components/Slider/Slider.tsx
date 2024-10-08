"use client";

import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useArrayImageLoader } from "../../hooks/useArrayImageLoader";
import styles from "./slider.module.scss";
import { SliderProps } from "../../models/models";

const Slider: React.FC<SliderProps> = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState<number>(1); // Start from 1 to account for the cloned first slide
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true); // Control smooth transition
  const slideContainerRef = useRef<HTMLDivElement | null>(null);

  // Clone first and last slides
  const extendedProjects = [
    projects[projects.length - 1], // Clone last slide
    ...projects,
    projects[0], // Clone first slide
  ];

  const imageSources = extendedProjects.map((project) => project.imgSrc);
  const areImagesLoaded = useArrayImageLoader(imageSources);

  const handleResize = () => {
    setIsLargeScreen(window.matchMedia("(min-width: 1024px)").matches);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isHovered) {
      interval = setInterval(() => {
        nextSlide();
      }, 3000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isHovered]);

  // Infinite scrolling effect
  useEffect(() => {
    if (activeIndex === 0) {
      // Go from the cloned last slide to the real last slide
      setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(projects.length);
      }, 500);
    } else if (activeIndex === extendedProjects.length - 1) {
      // Go from the cloned first slide to the real first slide
      setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(1);
      }, 500);
    } else {
      setIsTransitioning(true);
    }
  }, [activeIndex, extendedProjects.length, projects.length]);

  useEffect(() => {
    if (slideContainerRef.current !== null) {
      slideContainerRef.current.style.height = `${slideContainerRef.current.scrollHeight}px`;
    }
  }, [activeIndex]);

  return (
    <div
      className={styles.slider}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className={`${styles.prev} ${styles.sliderButton} ${
          isHovered ? styles.visible : styles.hidden
        }`}
        onClick={prevSlide}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <div className={styles["slide-container"]} ref={slideContainerRef}>
        <div
          className={styles.slides}
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
            transition: isTransitioning ? "transform 0.5s ease" : "none",
          }}
        >
          {extendedProjects.map((project, index) => (
            <div key={index} className={styles.slide}>
              <a href={`/projects/${project.slug}`} rel="noopener noreferrer">
                <div className={styles.imageWrapper}>
                  <Image
                    src={project.imgSrc}
                    alt={`Slide ${index}`}
                    sizes="(max-width: 1200px) 90vw, (max-width: 1400px) 80vw, (max-width: 1800px) 70vw, 60vw"
                    style={{
                      objectFit: isLargeScreen ? "contain" : "cover",
                      opacity: areImagesLoaded ? 1 : 0,
                      transition: "opacity 0.5s ease",
                    }}
                    priority={true}
                    fill={true}
                    onLoad={() => {
                      if (slideContainerRef.current) {
                        slideContainerRef.current.style.height = `${slideContainerRef.current.scrollHeight}px`;
                      }
                    }}
                  />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      <button
        className={`${styles.next} ${styles.sliderButton} ${
          isHovered ? styles.visible : styles.hidden
        }`}
        onClick={nextSlide}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};

export default Slider;
