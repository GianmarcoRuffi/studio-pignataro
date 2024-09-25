"use client";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import styles from "./slider.module.css";

function Slider({ projects, currentImageRef }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const slideContainerRef = useRef(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const handleResize = () => {
    setIsLargeScreen(window.matchMedia("(min-width: 1024px)").matches);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      }, 3000); // Adjust this as needed
    }
    return () => clearInterval(interval);
  }, [isHovered, activeIndex]);

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
                    ref={index === activeIndex ? currentImageRef : null}
                    src={project.imgSrc}
                    alt={`Slide ${index}`}
                    sizes="(max-width: 1200px) 90vw, (max-width: 1400px) 80vw, (max-width: 1800px) 70vw, 60vw"
                    priority={true}
                    fill={true}
                    style={{
                      objectFit: isLargeScreen.current ? "contain" : "cover",
                      transition: "opacity 0.5s ease",
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
