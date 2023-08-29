import React from "react";

export default function ProjectCard({ name, imageSource, description }) {
  return (
    <>
      <div className="rounded overflow-hidden shadow-lg">
        <div className="object-contain">
          <img src={imageSource} alt="" className="" />
        </div>

        <div className="project-box px-6 py-4 ">
          <div className="font-bold text-lg mb-2 break-words text-sm md:text-base">
            {name}
          </div>
          <p className="text-gray-700 text-sm md:text-base">{description}</p>
        </div>
      </div>
    </>
  );
}
