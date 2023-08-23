"use client";

import Image from "next/image";
import Header from "./Header";
import Link from "next/link";

import { createContext } from "react";

import React, { useState, useEffect } from "react";

function Slider({ images, imageLinks }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
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

  return (
    <>
      <div
        className="slider"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button onClick={prevSlide}>&lt;</button>
        <div className="slide-container">
          {images.map((image, index) => (
            <div
              key={index}
              className={`slide ${index === activeIndex ? "active" : ""}`}
              style={{ display: index === activeIndex ? "block" : "none" }}
            >
              <div className="img-container">
                <a
                  href={imageLinks[index]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={image}
                    alt={`Slide ${index}`}
                    width={0}
                    height={0}
                    sizes="(max-width: 1200px) 90vw, (max-width: 1400px) 80vw, (max-width: 1600px) 70vw, 60vw"
                    style={{ width: "100%", height: "auto" }}
                    priority={true}
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
        <button onClick={nextSlide}>&gt;</button>
      </div>
    </>
  );
}

export default Slider;
