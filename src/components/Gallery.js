import React from "react";
import Image from "next/image";
import ScrollUpButton from "./ScrollUpButton";
import styles from './gallery.module.css';

export default function Gallery({
  images,
  galleryTitle,
  galleryDescription,
  galleryLinks,
  imgCredits,
}) {
  function renderGalleryLinks() {
    if (galleryLinks) {
      return galleryLinks.map((link, index) => (
        <p key={index} className="text-gray-500 text-sm md:text-base truncate">
          <a href={link}>{link}</a>
        </p>
      ));
    }

    return "";
  }

  return (
    <div className="flex-col justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row md:justify-between mx-2 md:ml-4 md:mr-16 mb-10">
        <div className="info-container bg-gray-50 p-6 mb-8 md:mb-0 flex-1 md:flex-none md:w-2/3 lg:w-1/2 xl:w-3/6 shadow-lg border border-gray-200 mt-8">
          <h1 className="text-3xl font-semibold py-4">{galleryTitle}</h1>
          <p className="text-gray-500">{galleryDescription}</p>
          <div className="gallery-links">{renderGalleryLinks()}</div>
          <span className="text-gray-500 text-xs">{imgCredits}</span>
        </div>

        <div className="button-container flex items-center md:ml-8 mt-8">
          <a
            href="/projects"
            className={styles.buttonLink}
          >
            <span>Torna alla galleria dei progetti</span>
          </a>
        </div>
      </div>

      {/* Modifica da flex a grid per ottenere 2 card per riga */}
      <div className="photos-container grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-100 px-4 pt-8 pb-8">
        {images
          ? images.map((image, index) => (
              <div
                className="bg-gray-100 p-4 border border-gray-200 shadow-md"
                key={index}
              >
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  width={0}
                  height={0}
                  sizes="(max-width: 1200px) 90vw, (max-width: 1400px) 80vw, (max-width: 1600px) 70vw, 60vw"
                  style={{ width: "100%", height: "auto" }}
                  priority={true}
                  className="mx-auto"
                />
              </div>
            ))
          : ""}
      </div>

      <ScrollUpButton />
    </div>
  );
}
