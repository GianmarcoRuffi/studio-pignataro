/**
 * Utility per generare automaticamente i path delle immagini
 */

/**
 * Genera un array di path immagini per una cartella specifica
 * @param folderName - Nome della cartella (es. "CasaCorda", "Home")
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
 * @param folderName - Nome della cartella
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

/**
 * Genera path immagini per la cartella Home (che usa numerazione 01, 02, etc.)
 * @param count - Numero di immagini
 * @param extension - Estensione file (default: "webp")
 * @returns Array di path immagini
 */
export function generateHomePaths(
  count: number,
  extension: string = "webp"
): string[] {
  const images: string[] = [];

  for (let i = 1; i <= count; i++) {
    const paddedNumber = i.toString().padStart(2, "0");
    images.push(`/Home/${paddedNumber}.${extension}`);
  }

  return images;
}

/**
 * Genera path immagini per Vanchiglia (formato Torino_01.JPG -> Torino_01.webp)
 * @param count - Numero di immagini
 * @param extension - Estensione file (default: "webp")
 * @returns Array di path immagini
 */
export function generateVanchigliaPaths(
  count: number,
  extension: string = "webp"
): string[] {
  const images: string[] = [];

  for (let i = 1; i <= count; i++) {
    const paddedNumber = i.toString().padStart(2, "0");
    images.push(`/Vanchiglia/Torino_${paddedNumber}.${extension}`);
  }

  return images;
}

/**
 * Conversione rapida da JPG/JPEG a WEBP per un array di path
 * @param imagePaths - Array di path immagini
 * @param newExtension - Nuova estensione (default: "webp")
 * @returns Array di path con nuova estensione
 */
export function convertImageExtensions(
  imagePaths: string[],
  newExtension: string = "webp"
): string[] {
  return imagePaths.map((path) =>
    path.replace(/\.(jpg|jpeg|JPG|JPEG)$/i, `.${newExtension}`)
  );
}
