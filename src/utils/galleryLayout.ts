import type { ImageDimensions } from "../models/models";
import { LOADING } from "../constants";

export interface GalleryFrame {
  index: number;
  width: number;
  height: number;
}

export function getGalleryRows(
  dimensions: ImageDimensions[],
  containerWidth: number,
  viewportWidth: number
): GalleryFrame[][] {
  if (containerWidth <= 0) return [];
  if (viewportWidth <= 768) {
    return dimensions.map(({ width, height }, index) => [
      {
        index,
        width: containerWidth,
        height: (containerWidth * height) / width,
      },
    ]);
  }

  const target = viewportWidth > 1024 ? 280 : 220;
  const rows: GalleryFrame[][] = [];
  for (
    let batch = 0;
    batch < dimensions.length;
    batch += LOADING.ITEMS_PER_LOAD
  ) {
    const end = Math.min(batch + LOADING.ITEMS_PER_LOAD, dimensions.length);
    const candidates = new Map<
      number,
      { cost: number; rows: GalleryFrame[][] }
    >();
    candidates.set(end, { cost: 0, rows: [] });

    // Optimize the whole batch, rather than leaving an orphan after a locally
    // ideal row. The complete source array identifies the only ragged final row.
    for (let start = end - 1; start >= batch; start--) {
      let ratioSum = 0;
      let best = { cost: Infinity, rows: [] as GalleryFrame[][] };
      for (let rowEnd = start + 1; rowEnd <= end; rowEnd++) {
        const dimension = dimensions[rowEnd - 1];
        ratioSum += dimension.width / dimension.height;
        const available = containerWidth - (rowEnd - start - 1) * 16;
        if (available <= 0) break;
        const fullHeight = available / ratioSum;
        const height =
          rowEnd === dimensions.length
            ? Math.min(target, fullHeight)
            : fullHeight;
        const remainder = candidates.get(rowEnd)!;
        const cost = ((height - target) / target) ** 2 + remainder.cost;
        if (cost >= best.cost) continue;
        const row = Array.from({ length: rowEnd - start }, (_, offset) => {
          const index = start + offset;
          return {
            index,
            width:
              (height * dimensions[index].width) / dimensions[index].height,
            height,
          };
        });
        best = { cost, rows: [row, ...remainder.rows] };
      }
      candidates.set(start, best);
    }
    rows.push(...candidates.get(batch)!.rows);
  }
  return rows;
}
