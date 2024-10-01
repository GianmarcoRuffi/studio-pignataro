"use client";
import React from "react";
import { useImageLoader } from "../../hooks/useImageLoader";
import { PressesCardProps } from "../../interfaces/interfaces";

const PressesCard: React.FC<PressesCardProps> = ({
  description,
  imageSource,
  source,
  date,
}) => {
  const isImageLoaded = useImageLoader(`img[src='${imageSource}']`);

  return (
    <div className="rounded overflow-hidden shadow-xl">
      <div style={{ display: "flex" }}>
        <img
          src={imageSource}
          alt=""
          className={`transition-opacity duration-700 ease-in-out ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
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
};

export default PressesCard;
