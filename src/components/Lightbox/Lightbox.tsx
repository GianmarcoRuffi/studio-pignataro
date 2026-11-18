"use client";
import { useLocale } from "../../locales/LocaleProvider";
import { formatMessage } from "../../locales";

import {
  FC,
  useState,
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useCallback,
  useRef,
  type TouchEvent,
} from "react";
import { createPortal } from "react-dom";
import { useModalAccessibility } from "../../hooks/useModalAccessibility";
import Image from "next/image";
import type { ImageDimensions } from "../../models/models";
import { UI_TIMINGS } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./lightbox.module.scss";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  isOpen: boolean;
  enableZoom?: boolean;
  imageDimensions?: ImageDimensions[];
}

interface NetworkConnectionInfo {
  saveData?: boolean;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g" | string;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
}

function getPinch(touches: TouchList | React.TouchList) {
  const first = touches[0];
  const second = touches[1];
  return {
    x: (first.clientX + second.clientX) / 2,
    y: (first.clientY + second.clientY) / 2,
    distance: Math.hypot(
      first.clientX - second.clientX,
      first.clientY - second.clientY
    ),
  };
}

const Lightbox: FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  isOpen,
  enableZoom = false,
  imageDimensions,
}) => {
  const { messages } = useLocale();
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [zoom, setZoom] = useState(1);
  const [viewport, setViewport] = useState({
    width: 1,
    height: 1,
    mobile: false,
  });
  const canZoom = enableZoom || viewport.mobile;
  const pinchStartRef = useRef<{
    distance: number;
    zoom: number;
    imageX: number;
    imageY: number;
  } | null>(null);
  const zoomAnchorRef = useRef<{
    x: number;
    y: number;
    imageX: number;
    imageY: number;
  } | null>(null);
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const imageSrc = images[activeIndex];
  const [imageState, setImageState] = useState<{
    src: string;
    status: "loaded" | "error";
  } | null>(null);
  const isImageLoading = imageState?.src !== imageSrc;
  const imageError =
    imageState?.src === imageSrc && imageState.status === "error";
  const activeSourceRef = useRef(imageSrc);
  const [loadingMessageSource, setLoadingMessageSource] = useState<
    string | null
  >(null);
  const [presentation, setPresentation] = useState<{
    current: string;
    previous: string | null;
  } | null>(null);
  const outgoingSource = isImageLoading
    ? presentation?.current
    : presentation?.previous;
  useLayoutEffect(() => {
    activeSourceRef.current = imageSrc;
  }, [imageSrc]);
  useEffect(() => {
    setLoadingMessageSource(null);
    if (!isOpen || !isImageLoading) return;
    const timer = setTimeout(
      () => setLoadingMessageSource(imageSrc),
      UI_TIMINGS.lightbox.loadingIndicatorDelay
    );
    return () => clearTimeout(timer);
  }, [isOpen, imageSrc, isImageLoading]);
  const [loadedSize, setLoadedSize] = useState<
    (ImageDimensions & { src: string }) | null
  >(null);
  const naturalSize =
    loadedSize?.src === imageSrc
      ? loadedSize
      : (imageDimensions?.[activeIndex] ?? { width: 1920, height: 1080 });
  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const dialog = dialogRef.current;
    if (!isOpen || !overlay || !dialog) return;
    const measure = () => {
      const css = getComputedStyle(dialog);
      const mobile = css.getPropertyValue("--mobile-layout").trim() === "1";
      const gap = parseFloat(css.getPropertyValue("--viewport-gap"));
      const navSize = parseFloat(css.getPropertyValue("--nav-size"));
      const side = mobile
        ? 0
        : navSize + parseFloat(css.getPropertyValue("--control-gap"));
      const vertical = mobile ? navSize + gap : 0;
      setViewport({
        width: Math.max(1, overlay.clientWidth - 2 * (gap + side)),
        height: Math.max(1, overlay.clientHeight - 2 * (gap + vertical)),
        mobile,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(overlay);
    return () => observer.disconnect();
  }, [isOpen]);
  useLayoutEffect(() => {
    setZoom(1);
    pinchStartRef.current = null;
    zoomAnchorRef.current = null;
    viewportRef.current?.scrollTo(0, 0);
  }, [isOpen, activeIndex, viewport.mobile]);
  const fit = Math.min(
    viewport.width / naturalSize.width,
    viewport.height / naturalSize.height,
    viewport.mobile ? Infinity : 1
  );
  const maxZoom = viewport.mobile ? Math.max(2, 1 / fit) : 1 / fit;
  const zoomLevel = Math.min(zoom, maxZoom);
  const isZoomed = zoomLevel > 1;
  const scale = fit * zoomLevel;
  const imageWidth = Math.max(1, naturalSize.width * scale);
  const imageHeight = Math.max(1, naturalSize.height * scale);
  const ImageFrame = canZoom ? "button" : "div";
  useLayoutEffect(() => {
    const element = viewportRef.current;
    const image = imageRef.current;
    if (!canZoom || !element || !image) return;
    const anchor = zoomAnchorRef.current;
    zoomAnchorRef.current = null;
    if (isZoomed && anchor) {
      const bounds = image.getBoundingClientRect();
      element.scrollBy(
        bounds.left + anchor.imageX * bounds.width - anchor.x,
        bounds.top + anchor.imageY * bounds.height - anchor.y
      );
      return;
    }
    element.scrollTo(
      isZoomed ? (imageWidth - element.clientWidth) / 2 : 0,
      isZoomed ? (imageHeight - element.clientHeight) / 2 : 0
    );
  }, [canZoom, isZoomed, imageWidth, imageHeight]);

  const handlePinchMove = useEffectEvent((event: globalThis.TouchEvent) => {
    if (event.touches.length !== 2 || !pinchStartRef.current) return;
    event.preventDefault();
    const { x, y, distance } = getPinch(event.touches);
    const {
      zoom: initialZoom,
      distance: initialDistance,
      imageX,
      imageY,
    } = pinchStartRef.current;
    const nextZoom = Math.min(
      maxZoom,
      Math.max(1, (initialZoom * distance) / initialDistance)
    );
    if (nextZoom === zoomLevel) return;
    zoomAnchorRef.current = { x, y, imageX, imageY };
    setZoom(nextZoom);
  });
  useEffect(() => {
    const element = viewportRef.current;
    if (!isOpen || !viewport.mobile || !element) return;
    const handleTouchMove = (event: globalThis.TouchEvent) =>
      handlePinchMove(event);
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => element.removeEventListener("touchmove", handleTouchMove);
  }, [isOpen, viewport.mobile]);
  useModalAccessibility(isOpen, dialogRef, onClose);
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

  useLayoutEffect(() => {
    if (isOpen) {
      setActiveIndex(currentIndex);
      // The displayed element must load, even when a preload is cached.
      setImageState(null);
    }
  }, [isOpen, currentIndex]);

  useEffect(() => {
    if (isOpen) preloadAdjacentImages(activeIndex);
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
      if (
        !isOpen ||
        (isZoomed &&
          e.target instanceof Node &&
          viewportRef.current?.contains(e.target))
      )
        return;

      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isZoomed, handleNext, handlePrevious]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1 || isZoomed) {
      touchStartRef.current = null;
    } else {
      const touch = event.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    }

    if (
      !viewport.mobile ||
      event.touches.length !== 2 ||
      isImageLoading ||
      imageError ||
      !imageRef.current
    ) {
      return;
    }
    const bounds = imageRef.current.getBoundingClientRect();
    const { x, y, distance } = getPinch(event.touches);
    pinchStartRef.current = {
      distance: Math.max(1, distance),
      zoom: zoomLevel,
      imageX: (x - bounds.left) / bounds.width,
      imageY: (y - bounds.top) / bounds.height,
    };
  };

  const handleTouchEnd = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (event.touches.length < 2) pinchStartRef.current = null;
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

      event.preventDefault();
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
      ref={overlayRef}
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
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <button
              type="button"
              className={styles.navButton + " " + styles.navButtonRight}
              onClick={handleNext}
              aria-label={messages.ui.lightbox.next}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </>
        )}

        <div
          ref={viewportRef}
          className={`${styles.imageContainer} ${canZoom ? styles.zoomViewport : ""} ${isZoomed ? styles.panning : ""}`}
          tabIndex={canZoom ? 0 : undefined}
          aria-busy={isImageLoading}
          style={
            canZoom || isImageLoading
              ? {
                  width: Math.min(viewport.width, imageWidth),
                  height: Math.min(viewport.height, imageHeight),
                }
              : undefined
          }
          role={canZoom ? "region" : undefined}
          aria-label={canZoom ? messages.ui.lightbox.zoomRegion : undefined}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => {
            touchStartRef.current = null;
            pinchStartRef.current = null;
          }}
        >
          {isImageLoading && loadingMessageSource === imageSrc && (
            <div
              className={`${styles.loadingPlaceholder} ${outgoingSource ? styles.overPrevious : ""}`}
              role="status"
            >
              <div className={styles.spinner} aria-hidden="true" />
              <span>
                {formatMessage(messages.ui.lightbox.loading, {
                  index: activeIndex + 1,
                  total: images.length,
                })}
              </span>
            </div>
          )}

          {!imageError && outgoingSource && outgoingSource !== imageSrc && (
            <Image
              src={outgoingSource}
              alt=""
              aria-hidden="true"
              fill
              unoptimized
              className={`${styles.outgoingImage} ${isImageLoading ? "" : styles.fadingOut}`}
            />
          )}

          {imageError ? (
            <div className={styles.errorIndicator}>
              <span>{messages.ui.lightbox.unavailable}</span>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    imageCacheRef.current.delete(activeIndex);
                    setImageState(null);
                  }}
                  className={styles.retryButton}
                  aria-label={messages.ui.lightbox.retryLabel}
                >
                  {messages.ui.lightbox.retry}
                </button>
              </div>
            </div>
          ) : (
            <ImageFrame
              type={canZoom ? "button" : undefined}
              aria-label={
                canZoom
                  ? isZoomed
                    ? messages.ui.lightbox.zoomOut
                    : messages.ui.lightbox.zoomIn
                  : undefined
              }
              aria-pressed={canZoom ? isZoomed : undefined}
              disabled={canZoom ? isImageLoading || maxZoom <= 1 : undefined}
              onClick={
                canZoom
                  ? () => {
                      setZoom(isZoomed ? 1 : maxZoom);
                    }
                  : undefined
              }
              className={
                canZoom
                  ? `${styles.zoomCanvas} ${isZoomed ? styles.zoomed : ""}`
                  : undefined
              }
              style={
                canZoom
                  ? {
                      width: imageWidth,
                      height: imageHeight,
                    }
                  : undefined
              }
            >
              <Image
                ref={imageRef}
                key={`lightbox-image-${activeIndex}`}
                src={images[activeIndex]}
                alt={formatMessage(messages.ui.lightbox.imageAlt, {
                  index: activeIndex + 1,
                  total: images.length,
                })}
                width={naturalSize.width}
                height={naturalSize.height}
                sizes="(max-width: 480px) 98vw, (max-width: 768px) 96vw, 96vw"
                unoptimized
                loading="eager"
                fetchPriority="high"
                draggable={false}
                className={`${styles.lightboxImage} ${canZoom ? styles.zoomImage : ""} ${images.length > 1 && !isImageLoading ? styles.fadingIn : ""}`}
                style={{
                  ...(canZoom
                    ? { width: imageWidth, height: imageHeight }
                    : {}),
                  opacity: isImageLoading ? 0 : 1,
                }}
                onLoad={(event) => {
                  if (activeSourceRef.current !== imageSrc) return;
                  setLoadedSize({
                    src: imageSrc,
                    width: event.currentTarget.naturalWidth,
                    height: event.currentTarget.naturalHeight,
                  });
                  setImageState({ src: imageSrc, status: "loaded" });
                  if (images.length > 1) {
                    setPresentation((previous) => ({
                      current: imageSrc,
                      previous: previous?.current ?? null,
                    }));
                  }
                  imageCacheRef.current.set(activeIndex, true);
                }}
                onError={() => {
                  if (activeSourceRef.current !== imageSrc) return;
                  setImageState({ src: imageSrc, status: "error" });
                  imageCacheRef.current.set(activeIndex, false);
                }}
              />
            </ImageFrame>
          )}
        </div>

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
