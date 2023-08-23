import React from "react";
import Image from "next/image";

export default function Gallery({ images, galleryTitle, galleryDescription }) {
  return (
    <div>
      <div className="text-center mb-20">
        <h1 className="text-3xl font-semibold py-4">{galleryTitle}</h1>
        <p className="text-gray-500">{galleryDescription}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {images.map((image, index) => (
          <div className="border p-4 border-none" key={index}>
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
  );
}
