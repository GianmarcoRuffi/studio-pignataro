"use client";
import { localizedPath } from "../../locales";
import { useLocale } from "../../locales/LocaleProvider";

import {
  CSSProperties,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { UI_TIMINGS } from "../../constants";
import { useSplash } from "../../context/SplashContext";
import styles from "./slider.module.scss";
import { SliderProps } from "../../models/models";

const Slider: FC<SliderProps> = ({ projects }) => {
  const { messages, locale } = useLocale();
  const [offset, setOffset] = useState(0);
  const [settling, setSettling] = useState(false);
  const gesture = useRef<{
    x: number;
    y: number;
    dx: number;
    dragging: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (finishTimer.current) clearTimeout(finishTimer.current);
    },
    []
  );
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isCookieVisible, setIsCookieVisible] = useState<boolean>(false);
  const slideContainerRef = useRef<HTMLDivElement | null>(null);
  const { isSplashComplete } = useSplash();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(media.matches);
    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);
    return () => media.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const handleCookieVisibility = (e: Event) => {
      const customEvent = e as CustomEvent<{ isVisible: boolean }>;
      setIsCookieVisible(customEvent.detail.isVisible);
    };

    window.addEventListener("cookie-popup-visible", handleCookieVisibility);
    return () => {
      window.removeEventListener(
        "cookie-popup-visible",
        handleCookieVisibility
      );
    };
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(
      () => setIsLoading(false),
      UI_TIMINGS.slider.imageLoadTimeout
    );
    return () => clearTimeout(timeout);
  }, []);

  const effectiveLoading = !isSplashComplete && isLoading;

  const finishSlide = useCallback(
    (direction: number) => {
      if (settling || effectiveLoading) return;
      setSettling(true);
      setOffset(-direction * (slideContainerRef.current?.clientWidth ?? 0));
      finishTimer.current = setTimeout(
        () => {
          setActiveIndex(
            (index) => (index + direction + projects.length) % projects.length
          );
          setSettling(false);
          setOffset(0);
        },
        prefersReducedMotion ? 0 : 500
      );
    },
    [settling, effectiveLoading, projects.length, prefersReducedMotion]
  );
  const nextSlide = () => {
    if (effectiveLoading) {
      return;
    }

    finishSlide(1);
  };

  const prevSlide = () => {
    if (effectiveLoading) {
      return;
    }

    finishSlide(-1);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (
      !prefersReducedMotion &&
      !isHovered &&
      !settling &&
      !gesture.current &&
      !effectiveLoading &&
      !isCookieVisible &&
      isSplashComplete
    ) {
      interval = setInterval(() => {
        finishSlide(1);
      }, UI_TIMINGS.slider.autoplayInterval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    finishSlide,
    settling,
    activeIndex,
    prefersReducedMotion,
    isHovered,
    effectiveLoading,
    projects.length,
    isCookieVisible,
    isSplashComplete,
  ]);

  useEffect(() => {
    const reset = () => {
      if (finishTimer.current) clearTimeout(finishTimer.current);
      gesture.current = null;
      setOffset(0);
      setSettling(false);
      setIsHovered(false);
    };
    window.addEventListener("resize", reset);
    return () => window.removeEventListener("resize", reset);
  }, []);

  return (
    <section
      className={styles.slider}
      onMouseEnter={() => {
        if (matchMedia("(hover: hover)").matches) setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClickCapture={(event) => {
        if (suppressClick.current) {
          event.preventDefault();
          event.stopPropagation();
          suppressClick.current = false;
        }
      }}
      onPointerDown={(event) => {
        suppressClick.current = false;
        if (
          event.pointerType === "mouse" ||
          settling ||
          effectiveLoading ||
          (event.target as HTMLElement).closest("button")
        )
          return;
        suppressClick.current = false;
        gesture.current = {
          x: event.clientX,
          y: event.clientY,
          dx: 0,
          dragging: false,
        };
        setIsHovered(true);
      }}
      onPointerMove={(event) => {
        const g = gesture.current;
        if (!g) return;
        const dx = event.clientX - g.x;
        if (
          !g.dragging &&
          Math.abs(dx) > 8 &&
          Math.abs(dx) > Math.abs(event.clientY - g.y)
        ) {
          g.dragging = true;
          event.currentTarget.setPointerCapture(event.pointerId);
        }
        if (g.dragging) {
          g.dx = dx;
          suppressClick.current = true;
          setOffset(dx);
        }
      }}
      onPointerUp={() => {
        const g = gesture.current;
        gesture.current = null;
        setIsHovered(false);
        if (!g?.dragging) return;
        const threshold = Math.max(
          40,
          (slideContainerRef.current?.clientWidth ?? 0) * 0.15
        );
        finishSlide(Math.abs(g.dx) >= threshold ? (g.dx < 0 ? 1 : -1) : 0);
      }}
      onPointerCancel={() => {
        gesture.current = null;
        setIsHovered(false);
        finishSlide(0);
      }}
      aria-label={messages.ui.slider.label}
    >
      <button
        type="button"
        className={`${styles.prev} ${styles.sliderButton} ${
          isHovered && !effectiveLoading ? styles.visible : styles.hidden
        }`}
        onClick={prevSlide}
        aria-label={messages.ui.slider.previous}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      <div className={styles["slide-container"]} ref={slideContainerRef}>
        {projects.map((project, projectIndex) => {
          const effectiveImageFit = project.imageFit ?? "cover";
          const isContain = effectiveImageFit === "contain";
          const shouldLoad =
            projectIndex === activeIndex ||
            projectIndex === (activeIndex + 1) % projects.length ||
            projectIndex ===
              (activeIndex - 1 + projects.length) % projects.length;
          const imageStyle = {
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: effectiveImageFit,
            objectPosition: project.imagePosition ?? "center",
          } as CSSProperties;

          return (
            <div
              key={project.slug}
              className={`${styles.slide} ${projectIndex === activeIndex ? styles.active : ""}`}
              style={{
                transform: `translateX(calc(${projectIndex === activeIndex ? 0 : projectIndex === (activeIndex + 1) % projects.length ? 100 : projectIndex === (activeIndex - 1 + projects.length) % projects.length ? -100 : 200}% + ${offset}px))`,
                transition: settling ? "transform 500ms ease" : "none",
                visibility: shouldLoad ? "visible" : "hidden",
              }}
              aria-hidden={projectIndex !== activeIndex}
              inert={projectIndex !== activeIndex}
            >
              <Link href={localizedPath(`/projects/${project.slug}`, locale)}>
                <div
                  className={`${styles.imageWrapper} ${
                    isContain ? styles.withBackdrop : ""
                  }`}
                >
                  {shouldLoad && isContain && (
                    <Image
                      src={project.imgSrc}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="100vw"
                      quality={85}
                      className={styles.slideBackdrop}
                      loading="eager"
                    />
                  )}
                  {shouldLoad && (
                    <Image
                      src={project.imgSrc}
                      alt={project.projectName}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                      quality={85}
                      style={imageStyle}
                      loading="eager"
                      fetchPriority={
                        projectIndex === activeIndex ? "high" : "low"
                      }
                      onLoad={() => {
                        if (projectIndex === activeIndex) setIsLoading(false);
                      }}
                      onError={() => {
                        if (projectIndex === activeIndex) setIsLoading(false);
                      }}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <div className={styles.slideCaption}>
        <span
          className={styles.slideCounter}
          aria-label={messages.ui.slider.position}
        >
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <button
        type="button"
        className={`${styles.next} ${styles.sliderButton} ${
          isHovered && !effectiveLoading ? styles.visible : styles.hidden
        }`}
        onClick={nextSlide}
        aria-label={messages.ui.slider.next}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </section>
  );
};

export default Slider;
