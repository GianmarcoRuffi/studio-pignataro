import { useState, useEffect } from "react";

export const useImageLoader = (imageSelector: string): boolean => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    const img = document.querySelector<HTMLImageElement>(imageSelector);
    if (img) {
      const onLoad = () => setIsImageLoaded(true);

      img.addEventListener("load", onLoad);

      // Check if the image is already cached and loaded
      if (img.complete) {
        setIsImageLoaded(true);
      }

      // Cleanup event listener on unmount
      return () => {
        img.removeEventListener("load", onLoad);
      };
    }
  }, [imageSelector]);

  return isImageLoaded;
};
