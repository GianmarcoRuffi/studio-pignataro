"use client";
import { FC, useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Lightbox from "../Lightbox/Lightbox";
import { LOADING, GALLERY_IMAGE_SIZES } from "../../constants";
import styles from "./MasonryGallery.module.scss";

interface MasonryGalleryProps {
  images: string[];
  visibleImages: number;
  preloadedCount?: number;
}

const MasonryGallery: FC<MasonryGalleryProps> = ({
  images,
  visibleImages,
  preloadedCount = 0,
}) => {
  const [loadingImages, setLoadingImages] = useState<Record<number, boolean>>(
    {}
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingStartedAtRef = useRef<Record<number, number>>({});
  const settleTimeoutsRef = useRef<
    Record<number, ReturnType<typeof setTimeout>>
  >({});

  useEffect(() => {
    setLoadingImages((prev) => {
      const newLoadingState = { ...prev };
      for (let i = 0; i < Math.min(visibleImages, images.length); i++) {
        if (!(i in newLoadingState)) {
          newLoadingState[i] = i >= preloadedCount;

          if (newLoadingState[i]) {
            loadingStartedAtRef.current[i] = Date.now();
          }
        }
      }
      return newLoadingState;
    });
  }, [visibleImages, images.length, preloadedCount]);

  useEffect(() => {
    const settleTimeouts = settleTimeoutsRef.current;

    return () => {
      Object.values(settleTimeouts).forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
    };
  }, []);

  const settleImageLoading = useCallback((index: number) => {
    if (settleTimeoutsRef.current[index]) {
      return;
    }

    const loadingStartedAt = loadingStartedAtRef.current[index] ?? Date.now();
    const elapsed = Date.now() - loadingStartedAt;
    const remaining = Math.max(0, LOADING.IMAGE_SKELETON_MIN_DISPLAY - elapsed);

    settleTimeoutsRef.current[index] = setTimeout(() => {
      setLoadingImages((prev) => {
        if (!prev[index]) {
          return prev;
        }

        return {
          ...prev,
          [index]: false,
        };
      });

      delete settleTimeoutsRef.current[index];
      delete loadingStartedAtRef.current[index];
    }, remaining);
  }, []);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setLightboxOpen(false);
  };

  return (
    <>
      <div className={styles.masonryContainer} ref={containerRef}>
        {images.slice(0, visibleImages).map((imageSource, imageIndex) => (
          <div key={imageIndex} className={styles.imageWrapper}>
            <button
              type="button"
              className={styles.imageLink}
              onClick={() => handleImageClick(imageIndex)}
              aria-label={`Visualizza immagine ${imageIndex + 1}`}
            >
              <div className={styles.imageContainer}>
                {loadingImages[imageIndex] && (
                  <div className={styles.imageSkeleton}>
                    <div className={styles.skeletonPlaceholder}></div>
                  </div>
                )}

                <Image
                  src={imageSource}
                  alt={`Fotografia del progetto, immagine ${imageIndex + 1}`}
                  width={600}
                  height={400}
                  sizes={
                    imageIndex === 0
                      ? "(max-width: 1440px) 100vw, 1300px"
                      : GALLERY_IMAGE_SIZES
                  }
                  unoptimized={imageSource.endsWith(".gif")}
                  loading={imageIndex < preloadedCount ? "eager" : "lazy"}
                  className={`${styles.image} ${
                    loadingImages[imageIndex]
                      ? styles.imageLoading
                      : styles.imageLoaded
                  }`}
                  onLoad={() => settleImageLoading(imageIndex)}
                  onError={() => settleImageLoading(imageIndex)}
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />

                {!loadingImages[imageIndex] && (
                  <div className={styles.imageOverlay}>
                    <span className={styles.zoomIcon} aria-hidden="true">
                      ↗
                    </span>
                  </div>
                )}
              </div>
            </button>
          </div>
        ))}
      </div>

      <Lightbox
        images={images}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={handleLightboxClose}
      />
    </>
  );
};

export default MasonryGallery;
