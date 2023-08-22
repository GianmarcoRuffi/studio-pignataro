"use client";

import Image from "next/image";
import Header from "./Header";
import Link from "next/link";

import { createContext } from "react";

import React, { useState, useEffect } from "react";

function Slider({ images }) {
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
      }, 3000); // Cambia immagine ogni 3 secondi
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeIndex, isHovered]);

  return (
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
            className={`slide ${index === activeIndex ? 'active' : ''}`}
            style={{ display: index === activeIndex ? "block" : "none" }}
          >
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
      <button onClick={nextSlide}>&gt;</button>
    </div>
  );
}

export default Slider;
