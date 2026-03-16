import { useEffect, useMemo, useRef, useState } from "react";

interface UseMultiImageLoaderOptions {
  timeout?: number;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

interface UseMultiImageLoaderReturn {
  isLoading: boolean;
  progress: number;
  error: string | null;
}

export const useMultiImageLoader = (
  imageSources: string[],
  options: UseMultiImageLoaderOptions = {}
): UseMultiImageLoaderReturn => {
  const { timeout = 5000, onComplete, onError } = options;
  const onCompleteRef = useRef(onComplete);
  const onErrorRef = useRef(onError);

  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const sourcesKey = useMemo(
    () => (imageSources ?? []).filter(Boolean).join("\u0001"),
    [imageSources]
  );

  useEffect(() => {
    onCompleteRef.current = onComplete;
    onErrorRef.current = onError;
  }, [onComplete, onError]);

  useEffect(() => {
    const sources = sourcesKey ? sourcesKey.split("\u0001") : [];

    setIsLoading(true);
    setProgress(0);
    setError(null);

    if (!sources.length) {
      setIsLoading(false);
      setProgress(100);
      onCompleteRef.current?.();
      return;
    }

    let isCancelled = false;
    let loadedCount = 0;
    let hasTimedOut = false;
    const totalImages = sources.length;

    const timeoutId = setTimeout(() => {
      if (!isCancelled) {
        hasTimedOut = true;
        setError("Timeout durante il caricamento delle immagini");
        setIsLoading(false);
        setProgress(100);
        onErrorRef.current?.(new Error("Image loading timeout"));
      }
    }, timeout);

    const updateProgress = () => {
      if (isCancelled) {
        return;
      }

      const newProgress = Math.round((loadedCount / totalImages) * 100);
      setProgress(newProgress);

      if (loadedCount === totalImages && !hasTimedOut) {
        setIsLoading(false);
        onCompleteRef.current?.();
        clearTimeout(timeoutId);
      }
    };

    sources.forEach((src, index) => {
      const img = document.createElement("img");
      let isSettled = false;

      const markLoaded = () => {
        if (isSettled || hasTimedOut || isCancelled) {
          return;
        }

        isSettled = true;
        loadedCount++;
        updateProgress();
      };

      img.onload = () => {
        markLoaded();
      };

      img.onerror = () => {
        if (!isSettled && !hasTimedOut && !isCancelled) {
          console.warn(
            `Failed to load image ${index + 1}/${totalImages}: ${src}`
          );
        }

        markLoaded();
      };

      img.src = src;

      if (img.complete) {
        markLoaded();
      }
    });

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [sourcesKey, timeout]);

  return {
    isLoading,
    progress,
    error,
  };
};
