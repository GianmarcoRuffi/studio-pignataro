import React from "react";
import Image from "next/image";
import ScrollUpButton from "./ScrollUpButton";

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

    return null;
  }

  return (
    <div className="flex-col justify-center bg-gray-100">
      <div className="mb-20 flex flex-col align-center mx-2 md:ml-16">
        <h1 className="text-3xl font-semibold py-4">{galleryTitle}</h1>
        <p className="text-gray-500">{galleryDescription}</p>
        <div className="gallery-links">{renderGalleryLinks()}</div>
        <span className="text-gray-500  text-xs">{imgCredits}</span>
      </div>

      <div className="flex flex-wrap gap-8 bg-gray-100 justify-center">
        {images
          ? images.map((image, index) => (
              <div className="border py-4 border-none" key={index}>
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
          : null}
      </div>

      <ScrollUpButton />
    </div>
  );
}
