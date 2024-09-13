"use client";
import React, { useState, useEffect } from "react";

export default function PressesCard({
  description,
  imageSource,
  source,
  date,
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = document.querySelector(`img[src="${imageSource}"]`);
    // Verifica se l'immagine è già caricata (cache) e imposta lo stato di conseguenza
    if (img && img.complete) {
      setIsImageLoaded(true);
    }
  }, [imageSource]);

  return (
    <div className="rounded overflow-hidden shadow-lg">
      <div style={{ display: "flex" }}>
        <img
          src={imageSource}
          alt=""
          className={`transition-opacity duration-700 ease-in-out ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      <div className="presses-box px-6 p-4">
        <div
          className="font-bold mb-2 break-words text-sm md:text-lg"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="mb-2 break-words text-xs md:text-base">{source}</div>
        <p className="text-gray-700 text-xs md:text-base">{date}</p>
      </div>
    </div>
  );
}
