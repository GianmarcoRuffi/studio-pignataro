"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./bio.module.css";
import { bioData } from "../../data/bioData";

export default function Bio() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageRef = useRef(null);
  const bioBoxRef = useRef(null);

  useEffect(() => {
    const updateBioBoxHeight = () => {
      if (imageRef.current && bioBoxRef.current) {
        const img = imageRef.current.querySelector("img");
        if (img) {
          bioBoxRef.current.style.height = `${img.offsetHeight}px`;
        }
      }
    };

    const img = imageRef.current.querySelector("img");
    if (img) {
      img.addEventListener("load", () => {
        setIsImageLoaded(true);
        updateBioBoxHeight();
      });

      // Controllo per vedere se l'immagine è già stata caricata (es. dalla cache)
      if (img.complete) {
        setIsImageLoaded(true);
        updateBioBoxHeight();
      }
    }

    return () => {
      if (img) {
        img.removeEventListener("load", updateBioBoxHeight);
      }
    };
  }, []);

  return (
    <div
      className={`${styles["bio-container"]} flex bg-gray-100 max-lg:flex-col`}
    >
      <div
        className={`${styles["image-container"]} lg:w-2/3 lg:mr-4`}
        ref={imageRef}
      >
        <img
          src="/Bio.jpg"
          alt="bio"
          className={`transition-opacity duration-700 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div
        className={`${styles["bio-box"]} lg:w-1/3 text-justify py-4`}
        ref={bioBoxRef}
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
