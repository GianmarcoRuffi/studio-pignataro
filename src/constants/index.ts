// ====================================
// COSTANTI GLOBALI
// ====================================

// Animazioni
export const ANIMATIONS = {
  FADE_IN_DURATION: 0.6,
  FADE_DELAY: 0.1,
  HOVER_DURATION: 0.3,
  CUBIC_BEZIER: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

// Layout
export const LAYOUT = {
  CARD_GRID_GAP: "3rem",
  CONTAINER_MAX_WIDTH: "1200px",
  CONTAINER_PADDING: "2rem",
  SECTION_PADDING: "4rem",
} as const;

// Responsive Breakpoints
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const;

// Card Grid Configurations
export const CARD_GRIDS = {
  publications: {
    minWidth: "550px",
    gap: "3rem",
  },
  projects: {
    minWidth: "500px",
    gap: "3rem",
  },
  gallery: {
    minWidth: "400px",
    gap: "2rem",
  },
  bio: {
    minWidth: "300px",
    gap: "2rem",
  },
} as const;

// Loading States
export const LOADING = {
  INITIAL_ITEMS: 6,
  ITEMS_PER_LOAD: 6,
  SKELETON_COUNTS: {
    mobile: 3,
    tablet: 4,
    desktop: 6,
  },
} as const;

// Z-Index Scale
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
} as const;
