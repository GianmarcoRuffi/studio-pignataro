import { useEffect, useState } from "react";

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
    mobile = 3,
    tablet = 4,
    desktop = 6,
    mobileBreakpoint = 768,
    tabletBreakpoint = 1200,
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
