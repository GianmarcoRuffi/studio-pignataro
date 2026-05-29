import type Lenis from "lenis";

export const DEFAULT_SCROLL_CONTAINER_SELECTOR =
  ".layout-content:not(.homepage)";

type SmoothScrollController = Pick<Lenis, "scrollTo">;

let activeSmoothScrollController: SmoothScrollController | null = null;

export const getScrollContainer = (
  selector = DEFAULT_SCROLL_CONTAINER_SELECTOR
): HTMLElement | null => {
  if (typeof document === "undefined") {
    return null;
  }

  return document.querySelector(selector) as HTMLElement | null;
};

export const getScrollEventTarget = (
  selector = DEFAULT_SCROLL_CONTAINER_SELECTOR
): HTMLElement | Window | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return getScrollContainer(selector) ?? window;
};

export const getScrollTop = (
  selector = DEFAULT_SCROLL_CONTAINER_SELECTOR
): number => {
  const container = getScrollContainer(selector);

  if (container) {
    return container.scrollTop;
  }

  if (typeof window === "undefined") {
    return 0;
  }

  return window.scrollY || document.documentElement.scrollTop || 0;
};

export const registerSmoothScrollController = (
  controller: SmoothScrollController | null
) => {
  activeSmoothScrollController = controller;
};

interface ScrollToPositionOptions {
  top: number;
  selector?: string;
  behavior?: ScrollBehavior;
}

export const scrollToPosition = ({
  top,
  selector = DEFAULT_SCROLL_CONTAINER_SELECTOR,
  behavior = "smooth",
}: ScrollToPositionOptions) => {
  if (
    selector === DEFAULT_SCROLL_CONTAINER_SELECTOR &&
    activeSmoothScrollController !== null
  ) {
    activeSmoothScrollController.scrollTo(top, {
      immediate: behavior === "auto",
    });
    return;
  }

  const container = getScrollContainer(selector);

  if (container) {
    container.scrollTo({ top, behavior });
    return;
  }

  if (typeof window !== "undefined") {
    window.scrollTo({ top, behavior });
  }
};