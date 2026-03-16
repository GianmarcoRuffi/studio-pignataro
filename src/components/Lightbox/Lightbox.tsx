"use client";
import {
  FC,
  useState,
  useEffect,
  useCallback,
  useRef,
  type TouchEvent,
} from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./lightbox.module.scss";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  isOpen: boolean;
}

interface NetworkConnectionInfo {
  saveData?: boolean;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g" | string;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
}

const Lightbox: FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  isOpen,
}) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const imageCacheRef = useRef<Map<number, boolean>>(new Map());
  const inFlightPreloadsRef = useRef<Map<number, Promise<boolean>>>(new Map());
  const preloadRadiusRef = useRef(3);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const updatePreloadRadiusFromConnection = useCallback(
    (connection: NetworkConnectionInfo | undefined) => {
      if (!connection) {
        preloadRadiusRef.current = 3;
        return;
      }

      if (connection.saveData) {
        preloadRadiusRef.current = 0;
        return;
      }

      if (
        connection.effectiveType === "slow-2g" ||
        connection.effectiveType === "2g"
      ) {
        preloadRadiusRef.current = 0;
        return;
      }

      if (connection.effectiveType === "3g") {
        preloadRadiusRef.current = 1;
        return;
      }

      preloadRadiusRef.current = 3;
    },
    []
  );

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: NetworkConnectionInfo;
      mozConnection?: NetworkConnectionInfo;
      webkitConnection?: NetworkConnectionInfo;
    };
    const connection =
      nav.connection ?? nav.mozConnection ?? nav.webkitConnection;

    updatePreloadRadiusFromConnection(connection);

    if (!connection) {
      return;
    }

    const handleConnectionChange = () => {
      updatePreloadRadiusFromConnection(connection);
    };

    connection.addEventListener?.("change", handleConnectionChange);

    return () => {
      connection.removeEventListener?.("change", handleConnectionChange);
    };
  }, [updatePreloadRadiusFromConnection]);

  const preloadImage = useCallback(
    (index: number): Promise<boolean> => {
      const cached = imageCacheRef.current.get(index);
      if (cached !== undefined) {
        return Promise.resolve(cached);
      }

      const inFlight = inFlightPreloadsRef.current.get(index);
      if (inFlight) {
        return inFlight;
      }

      const preloadPromise = new Promise<boolean>((resolve) => {
        const img = document.createElement("img");
        img.decoding = "async";

        img.onload = () => {
          imageCacheRef.current.set(index, true);
          inFlightPreloadsRef.current.delete(index);
          resolve(true);
        };
        img.onerror = () => {
          imageCacheRef.current.set(index, false);
          inFlightPreloadsRef.current.delete(index);
          resolve(false);
        };

        img.src = images[index];
      });

      inFlightPreloadsRef.current.set(index, preloadPromise);
      return preloadPromise;
    },
    [images]
  );

  const preloadAdjacentImages = useCallback(
    (index: number) => {
      if (images.length <= 1) {
        return;
      }

      const radius = preloadRadiusRef.current;
      if (radius <= 0) {
        return;
      }

      const indicesToPreload = new Set<number>();
      for (let step = 1; step <= radius; step++) {
        indicesToPreload.add((index - step + images.length) % images.length);
        indicesToPreload.add((index + step) % images.length);
      }

      void Promise.allSettled(
        [...indicesToPreload].map((idx) => preloadImage(idx))
      );
    },
    [images.length, preloadImage]
  );

  // Effetto per quando si apre la lightbox
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(currentIndex);
      const status = imageCacheRef.current.get(currentIndex);
      setImageError(status === false);
      setIsImageLoading(status !== true);
      preloadAdjacentImages(currentIndex);
    }
  }, [isOpen, currentIndex, preloadAdjacentImages]);

  // Effetto per quando cambia l'indice attivo
  useEffect(() => {
    if (isOpen) {
      const status = imageCacheRef.current.get(activeIndex);
      setImageError(status === false);
      setIsImageLoading(status !== true);
      preloadAdjacentImages(activeIndex);
    }
  }, [activeIndex, isOpen, preloadAdjacentImages]);

  // Effetto per gestire overflow del body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    setActiveIndex((current) => (current + 1) % images.length);
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    if (images.length <= 1) return;
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrevious]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) {
      return;
    }

    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (!touchStartRef.current || event.changedTouches.length !== 1) {
        touchStartRef.current = null;
        return;
      }

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      touchStartRef.current = null;

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      const swipeThreshold = 50;
      if (absX < swipeThreshold || absX <= absY || images.length <= 1) {
        return;
      }

      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    },
    [handleNext, handlePrevious, images.length]
  );

  if (!isOpen) return null;

  return (
    <div
      className={styles.lightboxOverlay}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className={styles.lightboxContainer}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Chiudi lightbox"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              className={styles.navButton + " " + styles.navButtonLeft}
              onClick={handlePrevious}
              aria-label="Immagine precedente"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              type="button"
              className={styles.navButton + " " + styles.navButtonRight}
              onClick={handleNext}
              aria-label="Immagine successiva"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>
        )}

        <div
          className={styles.imageContainer}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {isImageLoading && (
            <div className="absolute left-1/2 top-1/2 z-[10003] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 rounded-lg bg-[rgba(0,0,0,0.7)] p-8 text-center text-white">
              <div className={styles.spinner}></div>
              <span className="text-[14px] opacity-90">
                Caricamento immagine {activeIndex + 1} di {images.length}...
              </span>
            </div>
          )}

          {imageError ? (
            <div className={styles.errorIndicator}>
              <span>❌ Immagine non disponibile</span>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setImageError(false);
                    setIsImageLoading(true);
                    void preloadImage(activeIndex).then((isLoaded) => {
                      if (!isLoaded) {
                        setImageError(true);
                        setIsImageLoading(false);
                      }
                    });
                  }}
                  className={styles.retryButton}
                  aria-label="Riprova a caricare l'immagine"
                >
                  🔄 Riprova
                </button>
              </div>
            </div>
          ) : (
            <Image
              key={`lightbox-image-${activeIndex}`}
              src={images[activeIndex]}
              alt={`Immagine ${activeIndex + 1} di ${images.length}`}
              width={1920}
              height={1080}
              sizes="(max-width: 480px) 98vw, (max-width: 768px) 96vw, 96vw"
              unoptimized
              loading="eager"
              fetchPriority="high"
              className={styles.lightboxImage}
              style={{
                opacity: isImageLoading ? 0.3 : 1,
                transition: "opacity 0.3s ease-in-out",
              }}
              onLoad={() => {
                setIsImageLoading(false);
                setImageError(false);
                imageCacheRef.current.set(activeIndex, true);
              }}
              onError={() => {
                setIsImageLoading(false);
                setImageError(true);
                imageCacheRef.current.set(activeIndex, false);
              }}
            />
          )}
        </div>

        {images.length > 1 && (
          <div className={styles.indicators}>
            <span className={styles.counter}>
              {activeIndex + 1} di {images.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lightbox;
