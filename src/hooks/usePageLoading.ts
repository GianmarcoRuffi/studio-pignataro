"use client";
import { useState, useEffect } from "react";

export const usePageLoading = () => {
  // Start with false on server to avoid hydration mismatch
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (hasChecked) return;

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
      setHasChecked(true);
    };

    checkNavigationType();
  }, [hasChecked]);

  const handleLoadingComplete = () => {
    setIsPageLoading(false);
  };

  return { isPageLoading, handleLoadingComplete };
};
