import React from "react";
import projects from "../data/data";

export default function ProjectCard({ name, imageSource, description }) {
  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700">
    <a href="#">
        <img className="rounded-t-lg" src={imageSource} alt="" />
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
    </div>
</div>

    </>
  );
}




