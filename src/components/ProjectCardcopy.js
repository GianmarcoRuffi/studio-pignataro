import React from "react";
import projects from "../data/data";

export default function ProjectCard({ name, imageSource, description }) {
  return (
    <>
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src={imageSource} alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
    </div>
</div>

    </>
  );
}




