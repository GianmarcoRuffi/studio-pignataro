import { useState, useEffect } from "react";

export function useArrayImageLoader(images) {
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);

  useEffect(() => {
    const imagePromises = images.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all(imagePromises).then(() => {
      setAreImagesLoaded(true);
    });
  }, [images]);

  return areImagesLoaded;
}
