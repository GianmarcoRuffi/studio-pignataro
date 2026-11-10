"use client";
import {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import ScrollUpButton from "../ScrollUpButton/ScrollUpButton";
import MasonryGallery from "../MasonryGallery/MasonryGallery";
import styles from "./gallery.module.scss";
import LinkButton from "../LinkButton/LinkButton";
import { preloadImage } from "../../utils/imageUtils";
import { LOADING } from "../../constants";
import { getGalleryRows } from "../../utils/galleryLayout";
import { GalleryProps, GalleryLink } from "../../models/models";

const Gallery: FC<GalleryProps> = ({
  images,
  imageDimensions,
  galleryTitle,
  galleryDescription,
  galleryLinks,
  imgCredits,
  prevProject,
  nextProject,
}) => {
  const [visibleImages, setVisibleImages] = useState<number>(
    LOADING.INITIAL_ITEMS
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);
  const loadMoreReleaseTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [measurement, setMeasurement] = useState({ width: 0, viewport: 0 });
  useLayoutEffect(() => {
    const container = frameRef.current;
    if (!container) return;
    const measure = () =>
      setMeasurement({
        width: container.getBoundingClientRect().width,
        viewport: window.innerWidth,
      });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  const rows = useMemo(
    () =>
      getGalleryRows(
        imageDimensions,
        measurement.width,
        measurement.viewport
      ).filter((row) => row[0].index < visibleImages),
    [imageDimensions, visibleImages, measurement]
  );
  const measured = measurement.width > 0;
  const initialBatchImages = useMemo(
    () => (images ?? []).slice(0, LOADING.INITIAL_ITEMS),
    [images]
  );

  useEffect(() => {
    if (!measured) return;
    let isCancelled = false;

    setVisibleImages(LOADING.INITIAL_ITEMS);
    if (!images || images.length === 0) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    let hasFinished = false;
    const loadingStartedAt = Date.now();
    let settleTimeoutId: ReturnType<typeof setTimeout> | null = null;

    const finishLoading = () => {
      if (hasFinished || isCancelled) {
        return;
      }

      hasFinished = true;
      const elapsed = Date.now() - loadingStartedAt;
      const remaining = Math.max(
        0,
        LOADING.BATCH_SKELETON_MIN_DISPLAY - elapsed
      );

      settleTimeoutId = setTimeout(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }, remaining);
    };

    const preloadPromises = initialBatchImages.map((imageSrc, index) =>
      preloadImage(imageSrc, 0, {
        sizes: `${Math.ceil(rows.flat().find((frame) => frame.index === index)?.width ?? measurement.width)}px`,
        quality: 85,
      })
    );

    const timeout = setTimeout(() => {
      if (!isCancelled) {
        finishLoading();
      }
    }, 5000);

    Promise.all(preloadPromises).then(() => {
      if (isCancelled) {
        return;
      }
      clearTimeout(timeout);
      finishLoading();
    });

    return () => {
      isCancelled = true;
      clearTimeout(timeout);
      if (settleTimeoutId) {
        clearTimeout(settleTimeoutId);
      }
    };
    // Width changes update the renderer without restarting the initial batch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, initialBatchImages, measured]);

  useEffect(() => {
    return () => {
      if (loadMoreReleaseTimeoutRef.current) {
        clearTimeout(loadMoreReleaseTimeoutRef.current);
      }
    };
  }, []);

  const loadMoreImages = useCallback(() => {
    if (!images || isLoadingMore || visibleImages >= images.length) {
      return;
    }

    const nextVisibleImages = Math.min(
      visibleImages + LOADING.ITEMS_PER_LOAD,
      images.length
    );

    setIsLoadingMore(true);

    if (loadMoreReleaseTimeoutRef.current) {
      clearTimeout(loadMoreReleaseTimeoutRef.current);
    }

    setVisibleImages(nextVisibleImages);
    loadMoreReleaseTimeoutRef.current = setTimeout(() => {
      setIsLoadingMore(false);
      loadMoreReleaseTimeoutRef.current = null;
    }, LOADING.IMAGE_SKELETON_MIN_DISPLAY);
  }, [images, isLoadingMore, visibleImages]);

  useEffect(() => {
    if (isLoading || !images || visibleImages >= images.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadMoreImages();
        }
      },
      {
        threshold: 0.01,
        rootMargin: "0px",
      }
    );

    const currentTrigger = loadMoreTriggerRef.current;
    if (currentTrigger) {
      observer.observe(currentTrigger);
    }

    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger);
      }
    };
  }, [isLoading, images, visibleImages, loadMoreImages]);

  function renderGalleryLinks() {
    if (galleryLinks) {
      const copyrightLinks = galleryLinks.filter(
        (link) => link.name === "Luigi Corda"
      );

      const articleLinks = galleryLinks.filter(
        (link) =>
          link.name !== "Luigi Corda" &&
          !link.name.toLowerCase().includes("mistralstudio")
      );

      return {
        copyrightLinks,
        articleLinks,
      };
    }
    return { copyrightLinks: [], articleLinks: [] };
  }

  function renderArticleLinks(articleLinks: GalleryLink[]) {
    if (articleLinks.length === 0) return null;

    return (
      <div className={styles.discreteLinksContainer}>
        {articleLinks.map((link, linkIndex) => (
          <span key={`article-${link.name}-${link.url}`}>
            {linkIndex > 0 && " • "}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.discreteLink}
            >
              {link.name}
            </a>
          </span>
        ))}
      </div>
    );
  }

  function renderClickableCredits() {
    const { copyrightLinks } = renderGalleryLinks();

    const luigiCordaLink = copyrightLinks.find(
      (link) => link.name === "Luigi Corda"
    );
    if (luigiCordaLink) {
      return (
        <a
          href={luigiCordaLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.clickableCredits}
        >
          {imgCredits}
        </a>
      );
    }

    if (imgCredits?.toLowerCase().includes("luigi corda")) {
      return (
        <a
          href="https://www.luigicorda.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.clickableCredits}
        >
          {imgCredits}
        </a>
      );
    }

    if (imgCredits?.toLowerCase().includes("mistralstudio")) {
      return (
        <a
          href="https://www.mistralstudio.it"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.clickableCredits}
        >
          {imgCredits}
        </a>
      );
    }

    return <span className={styles.creditsText}>{imgCredits}</span>;
  }

  return (
    <div>
      <div className={styles.breadcrumbContainer}>
        <div className={styles.breadcrumbPath}>
          <Link href="/" className={styles.breadcrumbItem}>
            Home
          </Link>
          <span className={styles.breadcrumbSeparator}>›</span>
          <Link href="/projects" className={styles.breadcrumbItem}>
            Progetti
          </Link>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span className={styles.breadcrumbCurrent}>{galleryTitle}</span>
        </div>
      </div>

      <div className={styles.galleryContainer}>
        <div className={styles.projectHeader}>
          <div className={styles.projectHeaderContent}>
            <h1 className={styles.projectTitle}>{galleryTitle}</h1>
            <p className={styles.projectDescription}>{galleryDescription}</p>

            {galleryLinks &&
              (() => {
                const { articleLinks } = renderGalleryLinks();
                return articleLinks.length > 0
                  ? renderArticleLinks(articleLinks)
                  : null;
              })()}

            <div className={styles.projectCredits}>
              {renderClickableCredits()}
            </div>
          </div>
        </div>

        <div
          ref={frameRef}
          className={isLoading ? styles.galleryGrid : undefined}
        >
          {images.length > 0 && (
            <MasonryGallery
              key={images[0]}
              images={images}
              imageDimensions={imageDimensions}
              rows={rows}
              visibleImages={visibleImages}
              skeletonOnly={isLoading}
              preloadedCount={Math.min(LOADING.INITIAL_ITEMS, images.length)}
            />
          )}
          {!isLoading && visibleImages < images.length && (
            <div ref={loadMoreTriggerRef} className={styles.loadMoreTrigger} />
          )}
        </div>

        {!isLoading && (!images || images.length === 0) && (
          <div className={styles.emptyState}>
            <p>Nessuna immagine disponibile per questa galleria.</p>
          </div>
        )}

        <div className={styles.projectNavigation}>
          <div className={styles.navButton}>
            {prevProject && (
              <a
                href={`/projects/${prevProject.slug}`}
                className={styles.navLink}
                aria-label={`Progetto precedente: ${prevProject.projectName}`}
              >
                <span className={styles.navArrow}>‹</span>
                <span className={styles.navText}>
                  <span className={styles.navLabel}>Precedente</span>
                  <span className={styles.navTitle}>
                    {prevProject.projectName}
                  </span>
                </span>
              </a>
            )}
          </div>

          <div className={styles.navButton}>
            {nextProject && (
              <a
                href={`/projects/${nextProject.slug}`}
                className={`${styles.navLink} ${styles.navLinkNext}`}
                aria-label={`Progetto successivo: ${nextProject.projectName}`}
              >
                <span className={styles.navText}>
                  <span className={styles.navLabel}>Successivo</span>
                  <span className={styles.navTitle}>
                    {nextProject.projectName}
                  </span>
                </span>
                <span className={styles.navArrow}>›</span>
              </a>
            )}
          </div>
        </div>

        <div className={styles.backSection}>
          <LinkButton href="/projects">
            ← Torna alla galleria dei progetti
          </LinkButton>
        </div>

        <ScrollUpButton />
      </div>
    </div>
  );
};

export default Gallery;
