"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import projects from "../../data/data";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";
import styles from "./projects.module.scss";
import { Project } from "../../models/models";

const Projects: React.FC = () => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="projects-container flex-row justify-center">
      <div
        className={`${styles.cardBox} ${
          loaded ? "loaded" : ""
        } p-10 grid grid-cols-1 md:grid-cols-2 gap-8`}
      >
        {projects.map((project: Project, index: number) =>
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
};

export default Projects;
