import { useState, useEffect, useCallback } from "react";

export const useSingleImageLoader = (imageSrc: string): boolean => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const loadImage = useCallback(() => {
    if (!imageSrc) return;

    const img = new Image();

    const onLoad = () => {
      setIsImageLoaded(true);
    };

    const onError = () => {
      console.warn(`Failed to load image: ${imageSrc}`);
      setIsImageLoaded(false);
    };

    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);
    img.src = imageSrc;

    if (img.complete) {
      setIsImageLoaded(true);
    }

    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, [imageSrc]);

  useEffect(() => {
    const cleanup = loadImage();
    return cleanup;
  }, [loadImage]);

  return isImageLoaded;
};
