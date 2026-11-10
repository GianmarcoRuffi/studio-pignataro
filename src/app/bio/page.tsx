"use client";

import Image from "next/image";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";
import { useImageLoad } from "../../hooks/useImageLoad";
import styles from "./bio.module.scss";
import { bioData } from "./data";
import { Link as BioLink } from "../../models/models";

export default function Bio() {
  const isImageLoaded = useImageLoad(bioData.image);

  const renderProjectLinks = (links: BioLink[] | undefined) => {
    if (!links || links.length === 0) return null;

    return (
      <div className={styles.projectLinks}>
        {links.map((link) => (
          <a
            key={`link-${link.url}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.projectLink}
          >
            {link.name} →
          </a>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.bioContainer}>
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <div className={styles.profileImage}>
            <Image
              src={bioData.image}
              alt={bioData.name}
              fill
              sizes="(max-width: 768px) 100vw, 450px"
              quality={95}
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              className={`${styles.profileImg} ${
                isImageLoaded ? styles.loaded : styles.loading
              }`}
            />
          </div>
          <div className={styles.profileInfo}>
            <p className={styles.eyebrow}>Lo studio · Cagliari</p>
            <h1 className={styles.profileName}>{bioData.name}</h1>
            <div className={styles.profileIntro}>
              {bioData.intro
                .split(
                  /(?=La pratica professionale|Nel campo della progettazione)/
                )
                .map((paragraph) => (
                  <p key={paragraph.slice(0, 30)}>{paragraph.trim()}</p>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.experiencesSection}>
        <div className={styles.experiencesContent}>
          <h2 className={styles.sectionTitle}>
            {bioData.professionalExperiencesTitle}
          </h2>

          <div className={styles.experienceGrid}>
            {bioData.experiences.map((experience) => (
              <div
                key={`exp-${experience.title}-${experience.role}`}
                className={styles.experienceCard}
              >
                <div className={styles.experienceHeader}>
                  <p className={styles.experienceDate}>
                    {experience.title.split(", da ")[1]}
                  </p>
                  <h3 className={styles.experienceTitle}>
                    {experience.title.split(", da ")[0]}
                  </h3>
                  <h4 className={styles.experienceRole}>{experience.role}</h4>
                </div>

                <p className={styles.experienceDescription}>
                  {experience.description}
                </p>

                <div className={styles.projectsList}>
                  {experience.projects.map((project) =>
                    typeof project === "string" ? (
                      <div
                        key={`proj-${project.substring(0, 30)}`}
                        className={styles.projectItem}
                      >
                        <span className={styles.projectBullet}>•</span>
                        <span className={styles.projectText}>{project}</span>
                      </div>
                    ) : (
                      <div
                        key={`proj-${project.description.substring(0, 30)}`}
                        className={styles.projectItem}
                      >
                        <span className={styles.projectBullet}>•</span>
                        <div className={styles.projectContent}>
                          <span className={styles.projectText}>
                            {project.description}
                          </span>
                          {renderProjectLinks(project.links)}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ScrollUpButton />
    </div>
  );
}
