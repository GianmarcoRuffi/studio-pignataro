"use client";
import React, { useState } from "react";
import Link from "next/link";
import projects from "../../data/data";
import ProjectCard from "../../components/ProjectCard";
import ScrollUpButton from "../../components/ScrollUpButton";
import styles from "./projects.module.css";

export default function Projects() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="projects-container flex-row justify-center">
      <div
        className={`${styles.cardBox} ${loaded ? 'loaded' : ''} bg-gray-100 p-10 grid grid-cols-1 md:grid-cols-2 gap-8`}
        onLoad={() => setLoaded(true)} // Mark cards as loaded when images are loaded
      >
        {projects.map((project, index) =>
          project.invisible ? null : (
            <Link key={index} href={`/projects/${project.slug}`}>
              <div className="project-card">
                <ProjectCard
                  name={project.projectName}
                  imageSource={project.imgSrc}
                  description={project.description}
                />
              </div>
            </Link>
          )
        )}
      </div>
      <ScrollUpButton />
    </div>
  );
}
