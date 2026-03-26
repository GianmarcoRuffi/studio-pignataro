"use client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { PressesCardProps } from "../../models/models";
import styles from "./pressesCard.module.scss";

const PressesCard: FC<PressesCardProps> = ({
  description,
  imageSource,
  source,
  date,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    setIsImageLoaded(false);

    const img = new window.Image();
    img.onload = () => setIsImageLoaded(true);
    img.onerror = () => setIsImageLoaded(true);
    img.src = imageSource;

    if (img.complete) {
      setIsImageLoaded(true);
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSource]);

  const handleImageClick = () => {
    window.open(imageSource, "_blank", "noopener,noreferrer");
  };

  const descriptionLines = description
    .split(/<br\s*\/?>/gi)
    .map((line) => line.trim());

  return (
    <article className={styles.pressCard}>
      <button
        type="button"
        className={styles.imageContainer}
        onClick={handleImageClick}
        aria-label={`Visualizza ${description}`}
      >
        <div
          className={`${styles.imageSkeleton} ${
            isImageLoaded ? styles.skeletonHidden : styles.skeletonVisible
          }`}
        >
          <div className={styles.skeletonShimmer}></div>
        </div>
        <Image
          src={imageSource}
          alt={`Copertina: ${date}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          quality={90}
          className={`${styles.cardImage} ${
            isImageLoaded ? styles.loaded : styles.loading
          }`}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(true)}
        />
        <div className={styles.zoomOverlay}>
          <span className={styles.zoomIcon} aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </span>
        </div>
      </button>

      <div className={styles.cardContent}>
        <div className={styles.cardMeta}>
          <span className={styles.dateBadge}>{date}</span>
        </div>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>
            {descriptionLines.map((line, index) => (
              <span key={`${date}-${index}`}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </h3>
        </div>

        {source && <div className={styles.cardAction}>{source}</div>}
      </div>
    </article>
  );
};

export default PressesCard;
