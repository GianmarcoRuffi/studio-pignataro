"use client";

import { FC, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToPosition } from "../../utils/scroll";

const ScrollToTop: FC = () => {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.location.hash) return;
    scrollToPosition({
      top: 0,
      selector: ".layout-content",
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
