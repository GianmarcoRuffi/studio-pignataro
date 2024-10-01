"use client";
import React, { useState } from "react";
import Image from "next/image";
import ScrollUpButton from "../ScrollUpButton/ScrollUpButton";
import styles from "./gallery.module.scss";
import LinkButton from "../LinkButton/LinkButton";

interface GalleryLink {
  url: string;
  name: string;
}

interface GalleryProps {
  images: string[];
  galleryTitle: string;
  galleryDescription: string;
  galleryLinks?: GalleryLink[];
  imgCredits?: string;
  prevProject?: { slug: string; projectName: string };
  nextProject?: { slug: string; projectName: string };
}

const Gallery: React.FC<GalleryProps> = ({
  images,
  galleryTitle,
  galleryDescription,
  galleryLinks,
  imgCredits,
  prevProject,
  nextProject,
}) => {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  function renderGalleryLinks() {
    if (galleryLinks) {
      return galleryLinks.map((link, index) => (
        <p
          key={index}
          className="text-gray-500 text-sm md:text-base truncate underline italic hover:text-gray-800"
        >
          <a href={link.url}>{link.name}</a>
        </p>
      ));
    }
    return null;
  }

  return (
    <div>
      <div className={styles.breadcrumbContainer}>
        {prevProject && (
          <a
            href={`/projects/${prevProject.slug}`}
            className={styles.breadcrumbLink}
          >
            {"< "} {prevProject.projectName}
          </a>
        )}
        {nextProject && (
          <a
            href={`/projects/${nextProject.slug}`}
            className={styles.breadcrumbLink}
          >
            {nextProject.projectName} {">"}
          </a>
        )}
      </div>

      <div className={`${styles.galleryContainer} flex-col justify-center`}>
        <div className="flex flex-col lg:flex-row md:justify-between mx-2 md:ml-4 md:mr-16 mb-10">
          <div
            className={`${styles.infoContainer} bg-gray-50 p-6 mb-8 md:mb-0 flex-1 md:flex-none md:w-2/3 lg:w-1/2 xl:w-3/6 shadow-lg border border-gray-200 mt-8`}
          >
            <h1 className="text-3xl font-semibold py-4">{galleryTitle}</h1>
            <p className="text-gray-500">{galleryDescription}</p>
            <div className={styles.galleryLinks}>{renderGalleryLinks()}</div>
            <span className="text-gray-500 text-xs">{imgCredits}</span>
          </div>
        </div>

        <div className="photos-container grid grid-cols-1 md:grid-cols-2 gap-8 px-4 pt-8 pb-8">
          {images
            ? images.map((image, index) => (
                <a
                  href={image}
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden relative group"
                >
                  <div className="p-4 border border-gray-200 shadow-md">
                    <Image
                      src={image}
                      alt={`Image ${index + 1}`}
                      width={0}
                      height={0}
                      sizes="(max-width: 1200px) 90vw, (max-width: 1400px) 80vw, (max-width: 1600px) 70vw, 60vw"
                      style={{ width: "100%", height: "auto" }}
                      loading="lazy"
                      className={`mx-auto transition-opacity duration-300 ease-in-out group-hover:opacity-80 ${
                        styles.imageTransition
                      } ${
                        loadedImages[index] ? styles.imageTransitionLoaded : ""
                      }`}
                      onLoad={() => handleImageLoad(index)}
                    />
                  </div>
                </a>
              ))
            : null}

          <div className="col-span-full flex justify-center mt-8">
            <LinkButton href="/projects">
              Torna alla galleria dei progetti
            </LinkButton>
          </div>
        </div>

        <ScrollUpButton />
      </div>
    </div>
  );
};

export default Gallery;
