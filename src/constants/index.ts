export const BREAKPOINTS = {
  tablet: 768,
  desktop: 1024,
  large: 1200,
  wide: 1400,
} as const;

export const SITE_URL = "https://archpignataro.it";
export const BRANDING_LOGO_FILENAME = "logo.png";
export const BRANDING_LOGO_PATH = `/branding/${BRANDING_LOGO_FILENAME}`;
export const BRANDING_LOGO_URL = `${SITE_URL}${BRANDING_LOGO_PATH}`;
export const BRANDING_LOGO_DIMENSIONS = {
  width: 237,
  height: 128,
} as const;
export const LEGAL_PATHS = {
  privacyPolicy: "/privacy-policy",
  cookiePolicy: "/cookie-policy",
} as const;

export const UI_TIMINGS = {
  cookieConsent: {
    showDelay: 500,
    closeDuration: 300,
  },
  smoothScroll: {
    lerp: 0.085,
    wheelMultiplier: 0.9,
  },
  splash: {
    defaultMinDisplay: 1500,
    initialMinDisplay: 1800,
    exitDuration: 600,
    contentFadeDuration: 300,
  },
  pageLoading: {
    logoDisplayDuration: 1200,
    fadeOutDuration: 800,
  },
  slider: {
    imageLoadTimeout: 6000,
    autoplayInterval: 3000,
  },
} as const;

export const LOADING = {
  INITIAL_ITEMS: 6,
  ITEMS_PER_LOAD: 6,
  BATCH_SKELETON_MIN_DISPLAY: 450,
  IMAGE_SKELETON_MIN_DISPLAY: 220,
  SKELETON_COUNTS: {
    mobile: 3,
    tablet: 4,
    desktop: 6,
  },
} as const;
