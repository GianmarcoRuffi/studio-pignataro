"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./project-card.module.css";

export default function ProjectCard({ name, imageSource, description }) {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div className="rounded overflow-hidden shadow-lg lg:h-[600px] md:h-[500px] h-auto flex flex-col transition-opacity duration-1000 ease-in-out hover:opacity-75">
      <div className="h-[300px] lg:h-4/5 md:h-3/5 w-full relative">
        <Image
          src={imageSource}
          alt={name}
          layout="fill"
          objectFit="cover"
          className={`${styles.image} ${loaded ? styles.loaded : ""}`}
          onLoad={handleImageLoad}
        />
        <div className="absolute inset-0 bg-transparent transition-opacity duration-1000 ease-in-out" />
      </div>

      <div className="px-6 py-4 flex-1 flex flex-col justify-center">
        <div className="font-bold text-lg mb-2 text-left break-words text-sm md:text-base">
          {name}
        </div>
        <p className="text-gray-700 text-sm md:text-base line-clamp-3 text-left">
          {description}
        </p>
      </div>
    </div>
  );
}
