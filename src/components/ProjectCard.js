import React from "react";

export default function ProjectCard({ name, imageSource, description }) {
  return (
    <>
      <div className="rounded overflow-hidden shadow-lg">
        <div className="object-contain">
          <img src={imageSource} alt="" className="" />
        </div>

        <div className="px-6 py-4 sm:max-md:text-sm ">
          <div className="font-bold text-lg mb-2 break-words sm:max-md:text-sm">
            {name}
          </div>
          <p className="text-gray-700 text-base sm:max-md:text-sm">
            {description}
          </p>
        </div>
      </div>
    </>
  );
}
