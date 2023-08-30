import React from "react";
import Image from "next/image";
import ScrollUpButton from "./ScrollUpButton";

export default function Gallery({
  images,
  galleryTitle,
  galleryDescription,
  galleryLink,
  galleryLinkTwo,
  imgCredits,
}) {
  return (
    <div className="flex-col justify-center bg-gray-100">
      <div className="mb-20 flex flex-col align-center ml-2 md:ml-0 text-justify">
        <h1 className="text-3xl font-semibold py-4">{galleryTitle}</h1>
        <p className="text-gray-500">{galleryDescription}</p>
        <p className="text-gray-500 gallery-link text-sm md:text-base  mr-11 md:mr-0">
          {galleryLink}
        </p>
        <p className="text-gray-500 gallery-link text-sm md:text-base  mr-11 md:mr-0">
          {galleryLinkTwo}
        </p>
        <span className="text-gray-500  text-xs">{imgCredits}</span>
      </div>

      <div className="flex flex-wrap gap-8 bg-gray-100 justify-center">
        {images.map((image, index) => (
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
        ))}
      </div>

      <ScrollUpButton />
    </div>
  );
}
