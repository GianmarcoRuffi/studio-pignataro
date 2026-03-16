"use client";
import { useState, useEffect } from "react";

export const usePageLoading = () => {
  const [isPageLoading, setIsPageLoading] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return !sessionStorage.getItem("siteVisited");
  });

  useEffect(() => {
    const checkNavigationType = () => {
      const entry = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;

      const isReload = entry?.type === "reload";
      const isBackForward = entry?.type === "back_forward";
      const isDirectOrBookmark =
        !document.referrer ||
        !document.referrer.includes(window.location.hostname);
      const isFirstVisit = !sessionStorage.getItem("siteVisited");

      const shouldShowLoading =
        isFirstVisit && isDirectOrBookmark && !isReload && !isBackForward;

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
