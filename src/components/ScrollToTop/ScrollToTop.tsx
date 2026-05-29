"use client";

import { FC, useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToPosition } from "../../utils/scroll";

const ScrollToTop: FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    scrollToPosition({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;