import { useEffect, useRef } from "react";

interface UseInfiniteLoadTriggerOptions {
  enabled: boolean;
  hasMore: boolean;
  onIntersect: () => void;
  threshold?: number;
  rootMargin?: string;
}

export function useInfiniteLoadTrigger(options: UseInfiniteLoadTriggerOptions) {
  const {
    enabled,
    hasMore,
    onIntersect,
    threshold = 0.1,
    rootMargin = "100px",
  } = options;
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !hasMore || !targetRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [enabled, hasMore, onIntersect, rootMargin, threshold]);

  return targetRef;
}
