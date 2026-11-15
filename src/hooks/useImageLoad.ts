import { getImageProps } from "next/image";
import { useEffect, useState } from "react";

interface UseImageLoadOptions {
  minimumLoadingTime?: number;
  responsive?: { sizes: string; quality: number };
}

/**
 * Hook to track image loading state
 * Consolidates image loading logic used across multiple components
 *
 * @param src - Image source URL
 * @param options - Optional timing controls for the loading state
 * @returns boolean - true when image is loaded or failed (ready to display)
 *
 * @example
 * const isLoaded = useImageLoad(imageUrl, { minimumLoadingTime: 200 });
 * <img className={isLoaded ? 'loaded' : 'loading'} src={imageUrl} />
 */
export function useImageLoad(
  src: string,
  options: UseImageLoadOptions = {}
): boolean {
  const sizes = options.responsive?.sizes;
  const quality = options.responsive?.quality;
  const minimumLoadingTime = options.minimumLoadingTime ?? 0;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsLoaded(false);
      return;
    }

    setIsLoaded(false);

    const img = new window.Image();
    const loadingStartedAt = Date.now();
    let settleTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let isCancelled = false;
    let isSettled = false;

    const settle = () => {
      if (isCancelled || isSettled) {
        return;
      }

      isSettled = true;
      const elapsed = Date.now() - loadingStartedAt;
      const remaining = Math.max(0, minimumLoadingTime - elapsed);

      settleTimeoutId = setTimeout(() => {
        if (!isCancelled) {
          setIsLoaded(true);
        }
      }, remaining);
    };

    img.onload = settle;
    img.onerror = settle;
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
      settle();
    }

    return () => {
      isCancelled = true;
      if (settleTimeoutId) {
        clearTimeout(settleTimeoutId);
      }

      img.onload = null;
      img.onerror = null;
    };
  }, [minimumLoadingTime, src, sizes, quality]);

  return isLoaded;
}
