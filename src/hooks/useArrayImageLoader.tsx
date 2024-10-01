import { useState, useEffect } from "react";

export function useArrayImageLoader(images: string[]): boolean {
  const [areImagesLoaded, setAreImagesLoaded] = useState<boolean>(false);

  useEffect(() => {
    const imagePromises = images.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    });

    Promise.all(imagePromises).then(() => {
      setAreImagesLoaded(true);
    });
  }, [images]);

  return areImagesLoaded;
}
