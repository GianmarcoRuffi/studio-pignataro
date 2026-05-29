/**
 * Genera un array di path immagini per una cartella specifica
 * @param folderName - Percorso cartella relativo alla root di public (es. "projects/via-asti/gallery")
 * @param count - Numero di immagini da generare
 * @param startFrom - Numero da cui iniziare (default: 1)
 * @param extension - Estensione file (default: "webp")
 * @returns Array di path immagini
 */
export function generateImagePaths(
  folderName: string,
  count: number,
  startFrom: number = 1,
  extension: string = "webp"
): string[] {
  const images: string[] = [];

  for (let i = startFrom; i < startFrom + count; i++) {
    images.push(`/${folderName}/${i}.${extension}`);
  }

  return images;
}

/**
 * Genera path immagini con nomi specifici
 * @param folderName - Percorso cartella relativo alla root di public
 * @param fileNames - Array di nomi file senza estensione
 * @param extension - Estensione file (default: "webp")
 * @returns Array di path immagini
 */
export function generateNamedImagePaths(
  folderName: string,
  fileNames: string[],
  extension: string = "webp"
): string[] {
  return fileNames.map((fileName) => `/${folderName}/${fileName}.${extension}`);
}

export function generateVanchigliaPaths(
  count: number,
  extension: string = "webp"
): string[] {
  const images: string[] = [];

  for (let i = 1; i <= count; i++) {
    const paddedNumber = i.toString().padStart(2, "0");
    images.push(
      `/projects/quartiere-vanchiglia/gallery/torino-${paddedNumber}.${extension}`
    );
  }

  return images;
}

/**
 * Preload a single image
 * @param src - Image source URL
 * @param minimumLoadingTime - Minimum time in ms before resolving
 * @returns Promise that resolves when image is loaded or fails
 */
export function preloadImage(
  src: string,
  minimumLoadingTime: number = 0
): Promise<void> {
  return new Promise<void>((resolve) => {
    const img = new window.Image();
    let isSettled = false;
    const loadingStartedAt = Date.now();

    const settle = () => {
      if (isSettled) return;

      isSettled = true;
      const elapsed = Date.now() - loadingStartedAt;
      const remaining = Math.max(0, minimumLoadingTime - elapsed);

      setTimeout(resolve, remaining);
    };

    img.onload = settle;
    img.onerror = settle;
    img.src = src;

    if (img.complete) {
      settle();
    }
  });
}
