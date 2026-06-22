"use client";

import { useEffect, useRef, useState } from "react";

type UseSectionRevealOptions = {
  threshold?: number;
  rootMargin?: string;
};

export function useSectionReveal(options: UseSectionRevealOptions = {}) {
  const { threshold = 0.12, rootMargin = "0px 0px -5% 0px" } = options;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      requestAnimationFrame(() => setIsVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return { isVisible, sectionRef };
}
