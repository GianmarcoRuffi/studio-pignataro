import { useState, useEffect } from "react";

export function useArrayImageLoader(images) {
  const [transitionClass, settransitionClass] = useState(
    images.map(() => "opacity-0")
  );

  useEffect(() => {
    const imagePromises = images.map((src, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          settransitionClass((prev) => {
            const newClasses = [...prev];
            newClasses[index] = "transition-opacity duration-700 opacity-100";
            return newClasses;
          });
          resolve();
        };
        img.onerror = resolve;
      });
    });

    Promise.all(imagePromises).then(() => {});
  }, [images]);

  return transitionClass;
}
