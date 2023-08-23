import React from "react";
import Image from "next/image";

export default function Gallery({ images, galleryTitle, galleryDescription }) {
  return (
    <div>

<div className="flex justify-center pl-5">
   
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-8">
      <div className="row max-w-7xl text-justify mb-20">
        <h1 className="text-3xl font-semibold py-4">{galleryTitle}</h1>
        <p className="text-gray-500">{galleryDescription}</p>
      </div>
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
      </div>
    </div>
  );
}
