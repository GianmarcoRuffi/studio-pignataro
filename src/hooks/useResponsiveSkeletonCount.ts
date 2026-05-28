import { useEffect, useState } from "react";
import { BREAKPOINTS, LOADING } from "../constants";

interface UseResponsiveSkeletonCountOptions {
  mobile?: number;
  tablet?: number;
  desktop?: number;
  mobileBreakpoint?: number;
  tabletBreakpoint?: number;
}

export function useResponsiveSkeletonCount(
  options: UseResponsiveSkeletonCountOptions = {}
): number {
  const {
    mobile = LOADING.SKELETON_COUNTS.mobile,
    tablet = LOADING.SKELETON_COUNTS.tablet,
    desktop = LOADING.SKELETON_COUNTS.desktop,
    mobileBreakpoint = BREAKPOINTS.tablet,
    tabletBreakpoint = BREAKPOINTS.large,
  } = options;

  const [count, setCount] = useState(desktop);

  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;

      if (width < mobileBreakpoint) {
        setCount(mobile);
        return;
      }

      if (width < tabletBreakpoint) {
        setCount(tablet);
        return;
      }

      setCount(desktop);
    };

    updateCount();
    window.addEventListener("resize", updateCount);

    return () => {
      window.removeEventListener("resize", updateCount);
    };
  }, [desktop, mobile, mobileBreakpoint, tablet, tabletBreakpoint]);

  return count;
}
