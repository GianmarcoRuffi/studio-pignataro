"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PressesCard from "../../components/PressesCard/PressesCard";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";
import LinkButton from "../../components/LinkButton/LinkButton";
import pressesData from "../../data/pressesData";
import { useMultiImageLoader } from "../../hooks/useMultiImageLoader";
import styles from "./presses.module.scss";
import { PressesData } from "../../models/models";

export default function Presses() {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [visibleCards, setVisibleCards] = useState(6);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [skeletonCount, setSkeletonCount] = useState(6);

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

  useEffect(() => {
    const updateSkeletonCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSkeletonCount(3);
      } else if (width < 1200) {
        setSkeletonCount(4);
      } else {
        setSkeletonCount(6);
      }
    };

    updateSkeletonCount();
    window.addEventListener("resize", updateSkeletonCount);

    return () => {
      window.removeEventListener("resize", updateSkeletonCount);
    };
  }, []);

  const loadMoreCards = useCallback(() => {
    if (isLoadingMore || visibleCards >= filteredData.length) return;

    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCards((prev) => Math.min(prev + 6, filteredData.length));
      setIsLoadingMore(false);
    }, 300);
  }, [filteredData.length, isLoadingMore, visibleCards]);

  useEffect(() => {
    if (isLoading || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCards < filteredData.length) {
          loadMoreCards();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [filteredData.length, isLoading, loadMoreCards, visibleCards]);

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
              {filteredData.slice(0, visibleCards).map((press: PressesData) => (
                <div
                  key={`${press.date}-${press.description.substring(0, 20)}`}
                  className={styles.cardWrapper}
                  style={{
                    animationDelay: `${filteredData.indexOf(press) * 0.1}s`,
                  }}
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
