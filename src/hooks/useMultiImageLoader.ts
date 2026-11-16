import { getImageProps } from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

interface UseMultiImageLoaderOptions {
  timeout?: number;
  responsive?: { sizes: string; quality: number };
  minimumLoadingTime?: number;
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
  const {
    timeout = 5000,
    responsive,
    minimumLoadingTime = 0,
    onComplete,
    onError,
  } = options;
  const sizes = responsive?.sizes;
  const quality = responsive?.quality;
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
    const loadingStartedAt = Date.now();

    setIsLoading(true);
    setProgress(0);
    setError(null);

    let isCancelled = false;
    let hasFinished = false;
    let loadedCount = 0;
    let hasTimedOut = false;
    const totalImages = sources.length;
    let settleTimeoutId: ReturnType<typeof setTimeout> | null = null;

    const finishLoading = (onFinished?: () => void) => {
      if (hasFinished || isCancelled) {
        return;
      }

      hasFinished = true;
      const elapsed = Date.now() - loadingStartedAt;
      const remaining = Math.max(0, minimumLoadingTime - elapsed);

      settleTimeoutId = setTimeout(() => {
        if (isCancelled) {
          return;
        }

        setIsLoading(false);
        onFinished?.();
      }, remaining);
    };

    if (!sources.length) {
      setProgress(100);
      finishLoading(() => {
        onCompleteRef.current?.();
      });

      return () => {
        isCancelled = true;
        if (settleTimeoutId) {
          clearTimeout(settleTimeoutId);
        }
      };
    }

    const timeoutId = setTimeout(() => {
      if (!isCancelled && !hasFinished) {
        hasTimedOut = true;
        setError("Timeout durante il caricamento delle immagini");
        setProgress(100);
        onErrorRef.current?.(new Error("Image loading timeout"));
        finishLoading();
      }
    }, timeout);

    const updateProgress = () => {
      if (isCancelled || hasFinished) {
        return;
      }

      const newProgress = Math.round((loadedCount / totalImages) * 100);
      setProgress(newProgress);

      if (loadedCount === totalImages && !hasTimedOut) {
        clearTimeout(timeoutId);
        finishLoading(() => {
          onCompleteRef.current?.();
        });
      }
    };

    sources.forEach((src, index) => {
      const img = document.createElement("img");
      let isSettled = false;

      const markLoaded = () => {
        if (isSettled || hasTimedOut || isCancelled || hasFinished) {
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
        if (!isSettled && !hasTimedOut && !isCancelled && !hasFinished) {
          console.warn(
            `Failed to load image ${index + 1}/${totalImages}: ${src}`
          );
        }

        markLoaded();
      };

      if (sizes && quality !== undefined && !src.endsWith(".gif")) {
        const { props } = getImageProps({
          src,
          alt: "",
          width: 600,
          height: 400,
          sizes,
          quality,
        });
        img.sizes = props.sizes ?? "";
        img.srcset = props.srcSet ?? "";
        img.src = props.src;
      } else {
        img.src = src;
      }

      if (img.complete) {
        markLoaded();
      }
    });

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
      if (settleTimeoutId) {
        clearTimeout(settleTimeoutId);
      }
    };
  }, [minimumLoadingTime, sourcesKey, timeout, sizes, quality]);

  return {
    isLoading,
    progress,
    error,
  };
};
