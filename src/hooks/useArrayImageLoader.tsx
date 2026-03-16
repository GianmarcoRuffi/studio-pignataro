import { useState, useEffect, useCallback } from "react";

export interface UseArrayImageLoaderOptions {
  onProgress?: (loaded: number, total: number) => void;
  onError?: (failedImages: string[]) => void;
}

export function useArrayImageLoader(
  images: string[],
  options?: UseArrayImageLoaderOptions
): {
  areImagesLoaded: boolean;
  loadingProgress: number;
  failedImages: string[];
} {
  const [areImagesLoaded, setAreImagesLoaded] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const loadImages = useCallback(async () => {
    if (images.length === 0) {
      setAreImagesLoaded(true);
      setLoadingProgress(100);
      return;
    }

    let loadedCount = 0;
    const failed: string[] = [];
    let isTimedOut = false;

    const timeoutId = setTimeout(() => {
      isTimedOut = true;
      console.warn("Image loading timeout - forcing completion");
      setAreImagesLoaded(true);
      setLoadingProgress(100);
    }, 5000);

    const imagePromises = images.map((src) => {
      return new Promise<void>((resolve) => {
        if (isTimedOut) {
          resolve();
          return;
        }

        const img = new Image();

        const imgTimeout = setTimeout(() => {
          console.warn(`Image timeout: ${src}`);
          failed.push(src);
          loadedCount++;
          const progress = Math.round((loadedCount / images.length) * 100);
          setLoadingProgress(progress);
          options?.onProgress?.(loadedCount, images.length);
          resolve();
        }, 3000);

        const cleanup = () => {
          clearTimeout(imgTimeout);
        };

        const onLoad = () => {
          cleanup();
          if (!isTimedOut) {
            loadedCount++;
            const progress = Math.round((loadedCount / images.length) * 100);
            setLoadingProgress(progress);
            options?.onProgress?.(loadedCount, images.length);
          }
          resolve();
        };

        const onError = () => {
          cleanup();
          console.warn(`Failed to load image: ${src}`);
          failed.push(src);
          if (!isTimedOut) {
            loadedCount++;
            const progress = Math.round((loadedCount / images.length) * 100);
            setLoadingProgress(progress);
            options?.onProgress?.(loadedCount, images.length);
          }
          resolve();
        };

        img.onload = onLoad;
        img.onerror = onError;
        img.src = src;
      });
    });

    try {
      await Promise.all(imagePromises);
      clearTimeout(timeoutId);

      if (!isTimedOut) {
        setFailedImages(failed);
        setAreImagesLoaded(true);

        if (failed.length > 0) {
          options?.onError?.(failed);
        }
      }
    } catch (error) {
      clearTimeout(timeoutId);
      console.error("Error loading images:", error);
      setAreImagesLoaded(true);
    }
  }, [images, options]);

  useEffect(() => {
    setAreImagesLoaded(false);
    setLoadingProgress(0);
    setFailedImages([]);
    loadImages();
  }, [loadImages]);

  return { areImagesLoaded, loadingProgress, failedImages };
}
