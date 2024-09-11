"use client";
import styles from "./slider.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

function Slider({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const slideContainerRef = useRef(null);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  };

  useEffect(() => {
    let interval;

    if (!isHovered) {
      interval = setInterval(() => {
        nextSlide();
      }, 3000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isHovered, activeIndex]);

  useEffect(() => {
    if (slideContainerRef.current) {
      slideContainerRef.current.style.height = `${slideContainerRef.current.scrollHeight}px`;
    }
  }, [activeIndex, projects]);

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
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {projects.map((project, index) => (
            <div key={index} className={styles.slide}>
              <a href={`/projects/${project.slug}`} rel="noopener noreferrer">
                <div className={styles.imageWrapper}>
                  <Image
                    src={project.imgSrc}
                    alt={`Slide ${index}`}
                         sizes="(max-width: 1200px) 90vw, (max-width: 1400px) 80vw, (max-width: 1800px) 70vw, 60vw"
                    style={{ objectFit: "contain" }}
                    priority={true}
                    fill={true}
                    onLoadingComplete={() => {
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
}

export default Slider;
