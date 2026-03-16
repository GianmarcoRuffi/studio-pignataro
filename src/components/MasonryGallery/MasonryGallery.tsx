"use client";
import { FC, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Lightbox from "../Lightbox/Lightbox";
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
  const [columns, setColumns] = useState(3);
  const [loadingImages, setLoadingImages] = useState<Record<number, boolean>>(
    {}
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setColumns(1);
      } else if (width < 1024) {
        setColumns(2);
      } else if (width < 1400) {
        setColumns(3);
      } else {
        setColumns(4);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  useEffect(() => {
    setLoadingImages((prev) => {
      const newLoadingState = { ...prev };
      for (let i = 0; i < Math.min(visibleImages, images.length); i++) {
        if (!(i in newLoadingState)) {
          newLoadingState[i] = i >= preloadedCount;
        }
      }
      return newLoadingState;
    });
  }, [visibleImages, images.length, preloadedCount]);

  const handleImageLoad = (index: number) => {
    setLoadingImages((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const organizeImages = () => {
    const columnArrays: number[][] = Array.from({ length: columns }, () => []);

    for (let i = 0; i < Math.min(visibleImages, images.length); i++) {
      const columnIndex = i % columns;
      columnArrays[columnIndex].push(i);
    }

    return columnArrays;
  };

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setLightboxOpen(false);
  };

  const columnArrays = organizeImages();

  return (
    <>
      <div className={styles.masonryContainer} ref={containerRef}>
        {columnArrays.map((columnImages, columnIndex) => (
          <div
            key={`masonry-column-${columnIndex}-${columnImages.join("-")}`}
            className={styles.masonryColumn}
          >
            {columnImages.map((imageIndex) => (
              <div
                key={imageIndex}
                className={styles.imageWrapper}
                style={{ animationDelay: `${(imageIndex + 1) * 0.05}s` }}
              >
                <button
                  type="button"
                  className={styles.imageLink}
                  onClick={() => handleImageClick(imageIndex)}
                  aria-label={`Visualizza immagine ${imageIndex + 1}`}
                >
                  <div className={styles.imageContainer}>
                    {loadingImages[imageIndex] && (
                      <div className="absolute left-0 top-0 z-[2] flex h-full w-full flex-col items-center justify-center gap-4 bg-[rgba(255,255,255,0.95)]">
                        <div className={styles.loaderSpinner}></div>
                        <span className="text-[0.85rem] font-medium text-[#666]">
                          Caricamento...
                        </span>
                      </div>
                    )}

                    <Image
                      src={images[imageIndex]}
                      alt={`Gallery image ${imageIndex + 1}`}
                      width={600}
                      height={400}
                      className={`${styles.image} ${
                        loadingImages[imageIndex]
                          ? styles.imageLoading
                          : styles.imageLoaded
                      }`}
                      onLoad={() => handleImageLoad(imageIndex)}
                      onError={() => {
                        setLoadingImages((prev) => ({
                          ...prev,
                          [imageIndex]: false,
                        }));
                      }}
                      priority={imageIndex < 6}
                      quality={85}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />

                    {!loadingImages[imageIndex] && (
                      <div className={styles.imageOverlay}>
                        <span className={styles.zoomIcon}>🔍</span>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            ))}
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
