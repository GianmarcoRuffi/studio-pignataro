"use client";
import { useState, useEffect } from "react";

export const usePageLoading = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const checkNavigationType = () => {
      const entry = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;

      const isReload = entry?.type === "reload";
      const isBackForward = entry?.type === "back_forward";
      const isDirectOrBookmark =
        !document.referrer ||
        !document.referrer.includes(window.location.hostname);
      const isFirstVisit = !sessionStorage.getItem("siteVisited");

      const shouldShowLoading =
        isDirectOrBookmark && isFirstVisit && !isReload && !isBackForward;

      setIsPageLoading(shouldShowLoading);

      sessionStorage.setItem("siteVisited", "true");
    };

    checkNavigationType();
  }, []);

  const handleLoadingComplete = () => {
    setIsPageLoading(false);
  };

  return { isPageLoading, handleLoadingComplete };
};
