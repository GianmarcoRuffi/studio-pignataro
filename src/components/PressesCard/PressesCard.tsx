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
    // Reset state when source changes
    setIsImageLoaded(false);

    // Se l'immagine è già caricata nel buffer (es. precaricata da useMultiImageLoader),
    // Next/Image potrebbe non scatenare onLoad.
    const img = new window.Image();
    img.src = imageSource;
    if (img.complete) {
      setIsImageLoaded(true);
    }
  }, [imageSource]);

  const handleImageClick = () => {
    window.open(imageSource, "_blank", "noopener,noreferrer");
  };

  const descriptionLines = description.split(/<br\s*\/?>/gi).map((line) => line.trim());

  return (
    <article className={styles.pressCard}>
      <button
        type="button"
        className={styles.imageContainer}
        onClick={handleImageClick}
        aria-label={`Visualizza ${description}`}
      >
        <Image
          src={imageSource}
          alt={`Copertina: ${date}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
          quality={90}
          className={`${styles.cardImage} ${
            isImageLoaded ? styles.loaded : styles.loading
          }`}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(true)}
        />
        <div className={styles.zoomOverlay}>
          <span className={styles.zoomIcon}>🔍</span>
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
