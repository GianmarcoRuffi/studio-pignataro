import { useState, useEffect } from "react";

export const useImageLoader = (imageSelector) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = document.querySelector(imageSelector);
    if (img) {
      img.addEventListener("load", () => {
        setIsImageLoaded(true);
      });

      // Controlla se l'immagine è già caricata dalla cache
      if (img.complete) {
        setIsImageLoaded(true);
      }
    }
  }, [imageSelector]);

  return isImageLoaded;
};
