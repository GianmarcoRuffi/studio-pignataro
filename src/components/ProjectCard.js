import React from "react";
import projects from "../data/data";


export default function ProjectCard({ name, imageSource, description }) {
  return (
    <>


      <div class="rounded overflow-hidden shadow-lg">
        <img src={imageSource} alt="contacts" />
        <div class="px-6 py-4 ">
          <div class="font-bold text-lg mb-2 break-words">{name}</div>
          <p class="text-gray-700 text-base">{description}</p>
        </div>
      </div>
      
    </>
  );
}