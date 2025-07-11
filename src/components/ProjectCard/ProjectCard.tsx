"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./project-card.module.scss";
import { ProjectCardProps } from "../../models/models";

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  imageSource,
  description,
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div className="rounded overflow-hidden shadow-2xl lg:h-[600px] md:h-[500px] h-auto flex flex-col transition-opacity duration-1000 ease-in-out hover:opacity-75">
      <div className="h-[300px] lg:h-4/5 md:h-3/5 w-full relative">
        <Image
          src={imageSource}
          alt={name}
          fill
          loading="lazy"
          className={`${styles.image} ${
            loaded ? styles.loaded : ""
          } object-cover xs:object-cover sm:object-cover md:object-cover lg:object-contain xl:object-contain`}
          onLoad={handleImageLoad}
        />
        <div className="absolute inset-0 bg-transparent transition-opacity duration-1000 ease-in-out" />
      </div>

      <div className="px-6 py-4 flex-1 flex flex-col justify-center items-center">
        <div className="font-bold text-lg mb-2 text-left break-words text-sm md:text-base">
          {name}
        </div>
        <p className="text-gray-700 text-sm md:text-base line-clamp-3 text-left">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
