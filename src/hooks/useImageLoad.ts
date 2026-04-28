import { useEffect, useState } from "react";

/**
 * Hook to track image loading state
 * Consolidates image loading logic used across multiple components
 * 
 * @param src - Image source URL
 * @returns boolean - true when image is loaded or failed (ready to display)
 * 
 * @example
 * const isLoaded = useImageLoad(imageUrl);
 * <img className={isLoaded ? 'loaded' : 'loading'} src={imageUrl} />
 */
export function useImageLoad(src: string): boolean {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsLoaded(false);
      return;
    }

    setIsLoaded(false);

    const img = new window.Image();
    
    const handleLoad = () => setIsLoaded(true);
    const handleError = () => setIsLoaded(true);

    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = src;

    if (img.complete) {
      setIsLoaded(true);
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return isLoaded;
}
