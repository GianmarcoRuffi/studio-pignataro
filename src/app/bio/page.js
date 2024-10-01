"use client";
import { useImageLoader } from "../../hooks/useImageLoader";
import styles from "./bio.module.css";
import { bioData } from "../../data/bioData";

export default function Bio() {
  const isImageLoaded = useImageLoader(`img[src='${bioData.image}']`);

  return (
    <div className={`${styles["bio-container"]} flex max-lg:flex-col`}>
      <div className={`${styles["image-box"]} lg:w-1/2`}>
        <img
          src={bioData.image}
          alt="bio"
          className={`transition-opacity duration-700 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div
        className={`${styles["bio-box"]} lg:w-1/2 text-justify py-4 lg:ml-4`}
      >
        <h1>
          <strong>{bioData.name}</strong>
        </h1>
        <p>{bioData.intro}</p>

        <h2>{bioData.professionalExperiencesTitle}</h2>

        {bioData.experiences.map((experience, index) => (
          <div key={index}>
            <h3>{experience.title}</h3>
            <h4>{experience.role}</h4>
            <p>{experience.description}</p>

            <ul>
              {experience.projects.map((project, projectIndex) =>
                typeof project === "string" ? (
                  <li key={projectIndex}>{project}</li>
                ) : (
                  <li key={projectIndex}>
                    {project.description}
                    {project.links &&
                      project.links.map((link, linkIndex) => (
                        <p key={linkIndex}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.name}
                          </a>
                        </p>
                      ))}
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
