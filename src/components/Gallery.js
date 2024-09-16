"use client";
import React, { useState } from "react";
import Image from "next/image";
import ScrollUpButton from "./ScrollUpButton";
import styles from "./gallery.module.css";
import LinkButton from "./LinkButton";

export default function Gallery({
  images,
  galleryTitle,
  galleryDescription,
  galleryLinks,
  imgCredits,
  prevProject,
  nextProject,
}) {
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (index) => {
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
            {"< "}{prevProject.projectName}
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

      <div className="gallery-container flex-col justify-center bg-gray-100">
        <div className="flex flex-col lg:flex-row md:justify-between mx-2 md:ml-4 md:mr-16 mb-10">
          <div className="info-container bg-gray-50 p-6 mb-8 md:mb-0 flex-1 md:flex-none md:w-2/3 lg:w-1/2 xl:w-3/6 shadow-lg border border-gray-200 mt-8">
            <h1 className="text-3xl font-semibold py-4">{galleryTitle}</h1>
            <p className="text-gray-500">{galleryDescription}</p>
            <div className={styles.galleryLinks}>{renderGalleryLinks()}</div>
            <span className="text-gray-500 text-xs">{imgCredits}</span>
          </div>

          <div className="button-container flex justify-center md:items-center md:justify-start md:ml-8 mt-8">
            <LinkButton href="/projects">
              Torna alla galleria dei progetti
            </LinkButton>
          </div>
        </div>

        <div className="photos-container grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-100 px-4 pt-8 pb-8">
          {images
            ? images.map((image, index) => (
                <a
                  href={image}
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden relative group"
                >
                  <div className="bg-gray-100 p-4 border border-gray-200 shadow-md relative">
                    <Image
                      src={image}
                      alt={`Image ${index + 1}`}
                      width={0}
                      height={0}
                      sizes="(max-width: 1200px) 90vw, (max-width: 1400px) 80vw, (max-width: 1600px) 70vw, 60vw"
                      style={{ width: "100%", height: "auto" }}
                      priority={true}
                      className={`mx-auto transition-opacity duration-300 ease-in-out group-hover:opacity-80 ${
                        styles.imageTransition
                      } ${
                        loadedImages[index] ? styles.imageTransitionLoaded : ""
                      }`}
                      onLoad={() => handleImageLoad(index)}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-gray-800 bg-opacity-75 text-white text-sm p-2 rounded">
                      Visualizza l'immagine
                    </div>
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
}
