"use client";
import { useLocale } from "../../locales/LocaleProvider";
import { formatMessage } from "../../locales";

import {
  FC,
  useState,
  useEffect,
  useCallback,
  useRef,
  type TouchEvent,
} from "react";
import { createPortal } from "react-dom";
import { useModalAccessibility } from "../../hooks/useModalAccessibility";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./lightbox.module.scss";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  isOpen: boolean;
  enableZoom?: boolean;
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
  enableZoom = false,
}) => {
  const { messages } = useLocale();
  const dialogRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [naturalSize, setNaturalSize] = useState({ width: 1920, height: 1080 });
  useEffect(() => {
    if (!isOpen || !enableZoom || !viewportRef.current) return;
    const element = viewportRef.current;
    const observer = new ResizeObserver(() => {
      setViewport({ width: element.clientWidth, height: element.clientHeight });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [isOpen, enableZoom]);
  useEffect(() => {
    setZoom(1);
    viewportRef.current?.scrollTo(0, 0);
  }, [isOpen, currentIndex]);
  const fit = Math.min(
    viewport.width / naturalSize.width,
    viewport.height / naturalSize.height,
    1
  );
  const imageWidth = Math.max(1, naturalSize.width * fit * zoom);
  const imageHeight = Math.max(1, naturalSize.height * fit * zoom);
  useModalAccessibility(isOpen, dialogRef, onClose);
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

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(currentIndex);
      const status = imageCacheRef.current.get(currentIndex);
      setImageError(status === false);
      setIsImageLoading(status !== true);
      preloadAdjacentImages(currentIndex);
    }
  }, [isOpen, currentIndex, preloadAdjacentImages]);

  useEffect(() => {
    if (isOpen) {
      const status = imageCacheRef.current.get(activeIndex);
      setImageError(status === false);
      setIsImageLoading(status !== true);
      preloadAdjacentImages(activeIndex);
    }
  }, [activeIndex, isOpen, preloadAdjacentImages]);

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

      if (e.key === "ArrowRight") {
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

  return createPortal(
    <div
      className={styles.lightboxOverlay}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className={styles.lightboxContainer}
        ref={dialogRef}
        tabIndex={-1}
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-label={messages.ui.lightbox.label}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label={messages.ui.lightbox.close}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              className={styles.navButton + " " + styles.navButtonLeft}
              onClick={handlePrevious}
              aria-label={messages.ui.lightbox.previous}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              type="button"
              className={styles.navButton + " " + styles.navButtonRight}
              onClick={handleNext}
              aria-label={messages.ui.lightbox.next}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>
        )}

        <div
          ref={viewportRef}
          className={`${styles.imageContainer} ${enableZoom ? styles.zoomViewport : ""}`}
          tabIndex={enableZoom ? 0 : undefined}
          role={enableZoom ? "region" : undefined}
          aria-label={enableZoom ? messages.ui.lightbox.zoomRegion : undefined}
          onTouchStart={enableZoom ? undefined : handleTouchStart}
          onTouchEnd={enableZoom ? undefined : handleTouchEnd}
        >
          {isImageLoading && (
            <div className="absolute left-1/2 top-1/2 z-[10003] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 rounded-lg bg-[rgba(0,0,0,0.7)] p-8 text-center text-white">
              <div className={styles.spinner}></div>
              <span className="text-[14px] opacity-90">
                {formatMessage(messages.ui.lightbox.loading, {
                  index: activeIndex + 1,
                  total: images.length,
                })}
              </span>
            </div>
          )}

          {imageError ? (
            <div className={styles.errorIndicator}>
              <span>{messages.ui.lightbox.unavailable}</span>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    imageCacheRef.current.delete(activeIndex);
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
                  aria-label={messages.ui.lightbox.retryLabel}
                >
                  {messages.ui.lightbox.retry}
                </button>
              </div>
            </div>
          ) : (
            <div
              className={enableZoom ? styles.zoomCanvas : undefined}
              style={
                enableZoom
                  ? {
                      width: Math.max(viewport.width, imageWidth),
                      height: Math.max(viewport.height, imageHeight),
                    }
                  : undefined
              }
            >
              <Image
                key={`lightbox-image-${activeIndex}`}
                src={images[activeIndex]}
                alt={formatMessage(messages.ui.lightbox.imageAlt, {
                  index: activeIndex + 1,
                  total: images.length,
                })}
                width={1920}
                height={1080}
                sizes="(max-width: 480px) 98vw, (max-width: 768px) 96vw, 96vw"
                unoptimized
                loading="eager"
                fetchPriority="high"
                className={`${styles.lightboxImage} ${enableZoom ? styles.zoomImage : ""}`}
                style={{
                  ...(enableZoom
                    ? { width: imageWidth, height: imageHeight }
                    : {}),
                  opacity: isImageLoading ? 0.3 : 1,
                  transition: "opacity 0.3s ease-in-out",
                }}
                onLoad={(event) => {
                  if (enableZoom)
                    setNaturalSize({
                      width: event.currentTarget.naturalWidth,
                      height: event.currentTarget.naturalHeight,
                    });
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
            </div>
          )}
        </div>

        {enableZoom && !imageError && (
          <div className={styles.zoomControls}>
            <button
              type="button"
              aria-label={messages.ui.lightbox.zoomOut}
              disabled={zoom === 1 || isImageLoading}
              onClick={() => setZoom((value) => Math.max(1, value - 0.5))}
            >
              <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
            </button>
            <output aria-live="polite">{Math.round(zoom * 100)}%</output>
            <button
              type="button"
              aria-label={messages.ui.lightbox.zoomIn}
              disabled={zoom === 3 || isImageLoading}
              onClick={() => setZoom((value) => Math.min(3, value + 0.5))}
            >
              <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
            </button>
          </div>
        )}

        {images.length > 1 && (
          <div className={styles.indicators}>
            <span className={styles.counter}>
              {formatMessage(messages.ui.lightbox.counter, {
                index: activeIndex + 1,
                total: images.length,
              })}
            </span>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Lightbox;
