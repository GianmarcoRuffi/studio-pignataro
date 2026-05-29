"use client";

import Lenis from "lenis";
import { FC, useEffect } from "react";
import { usePathname } from "next/navigation";
import { UI_TIMINGS } from "../../constants";
import {
  DEFAULT_SCROLL_CONTAINER_SELECTOR,
  getScrollContainer,
  registerSmoothScrollController,
} from "../../utils/scroll";

const PageSmoothScroll: FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (prefersReducedMotion || !hasFinePointer) {
      registerSmoothScrollController(null);
      return;
    }

    const wrapper = getScrollContainer(DEFAULT_SCROLL_CONTAINER_SELECTOR);
    const content = wrapper?.querySelector(
      "[data-scroll-content]"
    ) as HTMLElement | null;

    if (!wrapper || !content) {
      registerSmoothScrollController(null);
      return;
    }

    const lenis = new Lenis({
      wrapper,
      content,
      eventsTarget: wrapper,
      autoRaf: true,
      smoothWheel: true,
      allowNestedScroll: true,
      overscroll: true,
      lerp: UI_TIMINGS.smoothScroll.lerp,
      wheelMultiplier: UI_TIMINGS.smoothScroll.wheelMultiplier,
    });

    registerSmoothScrollController(lenis);
    lenis.resize();

    return () => {
      registerSmoothScrollController(null);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
};

export default PageSmoothScroll;