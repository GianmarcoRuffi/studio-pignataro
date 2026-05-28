"use client";
import { useCallback, useMemo, useState } from "react";
import PressesCard from "../../components/PressesCard/PressesCard";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";
import LinkButton from "../../components/LinkButton/LinkButton";
import pressesData from "../../data/pressesData";
import { useInfiniteLoadTrigger } from "../../hooks/useInfiniteLoadTrigger";
import { useMultiImageLoader } from "../../hooks/useMultiImageLoader";
import { useResponsiveSkeletonCount } from "../../hooks/useResponsiveSkeletonCount";
import { preloadImage } from "../../utils/imageUtils";
import { LOADING } from "../../constants";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import styles from "./presses.module.scss";
import { PressesData } from "../../models/models";

export default function Presses() {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [visibleCards, setVisibleCards] = useState<number>(LOADING.INITIAL_ITEMS);
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
    () => filteredData.slice(0, LOADING.INITIAL_ITEMS).map((press) => press.imageSource),
    [filteredData]
  );
  const preloadRemainingImages = useCallback(() => {
    for (const press of filteredData.slice(LOADING.INITIAL_ITEMS)) {
      const img = document.createElement("img");
      img.src = press.imageSource;
    }
  }, [filteredData]);

  const { isLoading } = useMultiImageLoader(currentImages, {
    timeout: 4000,
    onComplete: preloadRemainingImages,
  });

  const loadMoreCards = useCallback(() => {
    if (isLoadingMore || visibleCards >= filteredData.length) return;

    const nextVisibleCards = Math.min(visibleCards + LOADING.ITEMS_PER_LOAD, filteredData.length);
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
  }, [filteredData, isLoadingMore, visibleCards]);

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
                setVisibleCards(LOADING.INITIAL_ITEMS);
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
                  setVisibleCards(LOADING.INITIAL_ITEMS);
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
            <CardSkeleton
              count={skeletonCount}
              descriptionLines={2}
              className={styles.cardSkeleton}
              placeholderClassName={styles.skeletonPlaceholder}
              textClassName={styles.skeletonText}
              titleClassName={styles.skeletonTitle}
              descClassName={styles.skeletonDesc}
            />
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
                      <CardSkeleton
                        count={Math.min(LOADING.ITEMS_PER_LOAD, filteredData.length - visibleCards)}
                        descriptionLines={2}
                        className={styles.cardSkeleton}
                        placeholderClassName={styles.skeletonPlaceholder}
                        textClassName={styles.skeletonText}
                        titleClassName={styles.skeletonTitle}
                        descClassName={styles.skeletonDesc}
                      />
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
