"use client";
import React, { useState } from "react";
import Link from "next/link";
import projects from "../../data/data";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";
import styles from "./projects.module.scss";

export default function Projects() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="projects-container flex-row justify-center">
      <div
        className={`${styles.cardBox} ${
          loaded ? "loaded" : ""
        } p-10 grid grid-cols-1 md:grid-cols-2 gap-8`}
        onLoad={() => setLoaded(true)}
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
