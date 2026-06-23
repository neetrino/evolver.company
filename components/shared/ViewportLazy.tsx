"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const DEFAULT_ROOT_MARGIN = "240px 0px";
const DEFAULT_MIN_HEIGHT = "480px";

type ViewportLazyProps = {
  children: ReactNode;
  minHeight?: string;
  className?: string;
  rootMargin?: string;
};

export function ViewportLazy({
  children,
  minHeight = DEFAULT_MIN_HEIGHT,
  className = "",
  rootMargin = DEFAULT_ROOT_MARGIN,
}: ViewportLazyProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const node = containerRef.current;
    if (!node || isActive) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsActive(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isActive, rootMargin]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={!isActive ? { minHeight } : undefined}
      aria-hidden={!isActive}
    >
      {isActive ? children : null}
    </div>
  );
}
