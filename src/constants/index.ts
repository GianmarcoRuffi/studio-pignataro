export const BREAKPOINTS = {
  tablet: 768,
  desktop: 1024,
  large: 1200,
  wide: 1400,
} as const;

export const LOADING = {
  INITIAL_ITEMS: 6,
  ITEMS_PER_LOAD: 6,
  SKELETON_COUNTS: {
    mobile: 3,
    tablet: 4,
    desktop: 6,
  },
} as const;
