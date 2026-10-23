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
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(pointer: fine)");
    const wrapper = getScrollContainer(DEFAULT_SCROLL_CONTAINER_SELECTOR);
    const content = wrapper?.querySelector(
      "[data-scroll-content]"
    ) as HTMLElement | null;

    if (!wrapper || !content) {
      registerSmoothScrollController(null);
      return;
    }

    let lenis: Lenis | null = null;
    const configure = () => {
      registerSmoothScrollController(null);
      lenis?.destroy();
      lenis = null;
      if (motion.matches || !pointer.matches) return;
      lenis = new Lenis({
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
    };
    configure();
    motion.addEventListener("change", configure);
    pointer.addEventListener("change", configure);
    return () => {
      motion.removeEventListener("change", configure);
      pointer.removeEventListener("change", configure);
      registerSmoothScrollController(null);
      lenis?.destroy();
    };
  }, [pathname]);

  return null;
};

export default PageSmoothScroll;
