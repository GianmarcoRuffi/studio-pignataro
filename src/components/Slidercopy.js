"use client";
import { useState } from 'react';
import Image from 'next/image';

const Slider = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative overflow-hidden">
      <div className="slider relative">
        <div className="slide-container grid grid-cols-1 gap-0">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`slide ${
                index === activeIndex ? 'active' : ''
              }`}
              style={{ display: index === activeIndex ? 'block' : 'none' }}
            >
              <div className="img-container relative">
                <a
                  href={project.projectLink}
                  rel="noopener noreferrer"
                >
                  <Image
                    src={project.imgSrc}
                    alt={`Slide ${index}`}
                    layout="responsive"
                    width={1200}
                    height={800}
                    priority={true}
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2"
        onClick={prevSlide}
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2"
        onClick={nextSlide}
      >
        &gt;
      </button>
    </div>
  );
};

export default Slider;
