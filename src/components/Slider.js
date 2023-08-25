"use client";

import Image from "next/image";
import Header from "./Header";
import Link from "next/link";
import { createContext } from "react";

import React, { useState, useEffect } from "react";

function Slider({ projects }) {
  const [activeIndex, setActiveIndex] = useState(1);
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
      {/* <button className="prev" onClick={prevSlide}>&lt;</button> */}
      <div
        className="slider"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="slide-container">
          <div className="img-container">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`slide ${index === activeIndex ? "active" : ""}`}
                style={{ display: index === activeIndex ? "block" : "none" }}
              >
                <a href={project.projectLink} rel="noopener noreferrer">
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
      </div>
      {/* <button className="next" onClick={nextSlide}>
        &gt;
      </button> */}
    </>
  );
}

export default Slider;
