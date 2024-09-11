"use client";
import styles from "./slider.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft  } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import React, { useState, useEffect } from "react";

function Slider({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setActiveIndex((activeIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    setActiveIndex((activeIndex - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    let interval;

    if (!isHovered) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000); // Cambia immagine ogni 5 secondi
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeIndex, isHovered]);

  // Slider //

  return (
    <>
      <div
        className={styles.slider}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          className={`${styles.prev} ${styles.sliderButton} `}
          onClick={prevSlide}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div className={styles["slide-container"]}>
          <div className={styles["img-container"]}>
            {projects.map((project, index) => (
              <div
                key={index}
                className={`${styles.slide} ${
                  index === activeIndex ? styles.active : ""
                }`}
                style={{
                  display: index === activeIndex ? "block" : "none",
                }}
              >
                <a href={`/projects/${project.slug}`} rel="noopener noreferrer">
                  <Image
                    src={project.imgSrc}
                    alt={`Slide ${index}`}
                    sizes="(max-width: 1200px) 90vw, (max-width: 1400px) 80vw, (max-width: 1800px) 70vw, 60vw"
                    style={{ objectFit: "contain" }}
                    priority={true}
                    fill={true}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
        <button
          className={`${styles.next} ${styles.sliderButton}`}
          onClick={nextSlide}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </>
  );
}

export default Slider;
