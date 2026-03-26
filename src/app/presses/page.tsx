"use client";
import { useCallback, useMemo, useState } from "react";
import PressesCard from "../../components/PressesCard/PressesCard";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";
import LinkButton from "../../components/LinkButton/LinkButton";
import pressesData from "../../data/pressesData";
import { useInfiniteLoadTrigger } from "../../hooks/useInfiniteLoadTrigger";
import { useMultiImageLoader } from "../../hooks/useMultiImageLoader";
import { useResponsiveSkeletonCount } from "../../hooks/useResponsiveSkeletonCount";
import styles from "./presses.module.scss";
import { PressesData } from "../../models/models";

export default function Presses() {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [visibleCards, setVisibleCards] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const skeletonCount = useResponsiveSkeletonCount();

  const years = useMemo(
    () =>
      Array.from(
        new Set(
          pressesData.map((press) => {
            const regex = /\d{4}/;
            const result = regex.exec(press.date);
            return result?.[0] || "Unknown";
          })
        )
      ).sort((a, b) => {
        if (b === "Unknown") return -1;
        if (a === "Unknown") return 1;
        return Number.parseInt(b, 10) - Number.parseInt(a, 10);
      }),
    []
  );
  const filteredData = useMemo(
    () =>
      selectedYear === "all"
        ? pressesData
        : pressesData.filter((press) => press.date.includes(selectedYear)),
    [selectedYear]
  );
  const currentImages = useMemo(
    () => filteredData.slice(0, 6).map((press) => press.imageSource),
    [filteredData]
  );
  const preloadRemainingImages = useCallback(() => {
    for (const press of filteredData.slice(6)) {
      const img = document.createElement("img");
      img.src = press.imageSource;
    }
  }, [filteredData]);

  const { isLoading } = useMultiImageLoader(currentImages, {
    timeout: 4000,
    onComplete: preloadRemainingImages,
  });

  const preloadImage = useCallback((src: string) => {
    return new Promise<void>((resolve) => {
      const img = new window.Image();
      let isSettled = false;

      const settle = () => {
        if (isSettled) {
          return;
        }

        isSettled = true;
        resolve();
      };

      img.onload = settle;
      img.onerror = settle;
      img.src = src;

      if (img.complete) {
        settle();
      }
    });
  }, []);

  const loadMoreCards = useCallback(() => {
    if (isLoadingMore || visibleCards >= filteredData.length) return;

    const nextVisibleCards = Math.min(visibleCards + 6, filteredData.length);
    const nextImageSources = filteredData
      .slice(visibleCards, nextVisibleCards)
      .map((press) => press.imageSource);

    setIsLoadingMore(true);

    void Promise.all(nextImageSources.map((src) => preloadImage(src))).finally(
      () => {
        setVisibleCards(nextVisibleCards);
        setIsLoadingMore(false);
      }
    );
  }, [filteredData, isLoadingMore, preloadImage, visibleCards]);

  const hasMoreCards = visibleCards < filteredData.length;
  const loadMoreRef = useInfiniteLoadTrigger({
    enabled: !isLoading,
    hasMore: hasMoreCards,
    onIntersect: loadMoreCards,
    threshold: 0.01,
    rootMargin: "900px 0px",
  });

  return (
    <div className={styles.pressesContainer}>
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Pubblicazioni</h1>
          <p className={styles.pageSubtitle}>
            Una selezione di articoli e menzioni del mio lavoro su riviste
            specializzate e pubblicazioni del settore architettonico e del
            design.
          </p>
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterContainer}>
          <span className={styles.filterLabel}>Filtra per anno:</span>
          <div className={styles.filterButtons}>
            <button
              onClick={() => {
                setSelectedYear("all");
                setVisibleCards(6);
              }}
              className={`${styles.filterButton} ${selectedYear === "all" ? styles.active : ""}`}
            >
              Tutti
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => {
                  setSelectedYear(year);
                  setVisibleCards(6);
                }}
                className={`${styles.filterButton} ${selectedYear === year ? styles.active : ""}`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        {isLoading ? (
          <div className={styles.cardGrid}>
            {Array.from({ length: skeletonCount }, (_, index) => (
              <div
                key={`skeleton-${index}`}
                className={styles.cardSkeleton}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.skeletonPlaceholder}></div>
                <div className={styles.skeletonText}>
                  <div className={styles.skeletonTitle}></div>
                  <div className={styles.skeletonDesc}></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className={styles.cardGrid}>
              {filteredData
                .slice(0, visibleCards)
                .map((press: PressesData, index: number) => (
                  <div
                    key={`${press.date}-${press.imageSource}`}
                    className={styles.cardWrapper}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <PressesCard
                      description={press.description}
                      imageSource={press.imageSource}
                      source={
                        press.source ? (
                          <LinkButton
                            href={press.source}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Vai all'articolo
                          </LinkButton>
                        ) : null
                      }
                      date={press.date}
                    />
                  </div>
                ))}
            </div>

            {visibleCards < filteredData.length && (
              <div className={styles.loadMoreSection} ref={loadMoreRef}>
                {isLoadingMore && (
                  <>
                    <div className={styles.loadingIndicator}>
                      <div className={styles.spinner}></div>
                      <span>Caricamento pubblicazioni...</span>
                    </div>
                    <div className={styles.cardGrid}>
                      {Array.from(
                        {
                          length: Math.min(6, filteredData.length - visibleCards),
                        },
                        (_, index) => (
                          <div
                            key={`skeleton-more-${index}`}
                            className={styles.cardSkeleton}
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <div className={styles.skeletonPlaceholder}></div>
                            <div className={styles.skeletonText}>
                              <div className={styles.skeletonTitle}></div>
                              <div className={styles.skeletonDesc}></div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <ScrollUpButton />
    </div>
  );
}
