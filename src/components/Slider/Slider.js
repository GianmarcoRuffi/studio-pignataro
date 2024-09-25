"use client";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import styles from "./slider.module.css";

function Slider({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const slideContainerRef = useRef(null);
  const imageRefs = useRef([]);
  let imagesRendered = useRef(0); // Track how many images are rendered

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

  useEffect(() => {
    if (imagesRendered.current === projects.length) {
      setIsRendered(true); // All images have rendered
    }
  }, [imagesRendered.current]);

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
    if (!isHovered && isRendered) {
      interval = setInterval(() => {
        nextSlide();
      }, 3000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isHovered, isRendered]);

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
                    ref={(el) => (imageRefs.current[index] = el)} // Store reference to image
                    src={project.imgSrc}
                    alt={`Slide ${index}`}
                    sizes="(max-width: 1200px) 90vw, (max-width: 1400px) 80vw, (max-width: 1800px) 70vw, 60vw"
                    style={{
                      objectFit: isLargeScreen ? "contain" : "cover",
                      opacity: isRendered ? 1 : 0,
                      transition: "opacity 0.5s ease",
                    }}
                    priority={true}
                    fill={true}
                    onLoadingComplete={() => {
                      imagesRendered.current += 1;
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
