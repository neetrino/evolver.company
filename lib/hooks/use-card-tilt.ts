"use client";

import { useCallback, useRef } from "react";

const CARD_TILT_MAX_DEG = 9;

export function useCardTilt() {
  const ref = useRef<HTMLAnchorElement>(null);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLAnchorElement>) => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * CARD_TILT_MAX_DEG * 2;
    const rotateX = (0.5 - y) * CARD_TILT_MAX_DEG * 2;

    element.style.setProperty("--card-tilt-x", `${rotateX.toFixed(2)}deg`);
    element.style.setProperty("--card-tilt-y", `${rotateY.toFixed(2)}deg`);
    element.style.setProperty("--card-glow-x", `${(x * 100).toFixed(1)}%`);
    element.style.setProperty("--card-glow-y", `${(y * 100).toFixed(1)}%`);
  }, []);

  const handlePointerLeave = useCallback(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    element.style.setProperty("--card-tilt-x", "0deg");
    element.style.setProperty("--card-tilt-y", "0deg");
    element.style.setProperty("--card-glow-x", "50%");
    element.style.setProperty("--card-glow-y", "42%");
  }, []);

  return { ref, handlePointerMove, handlePointerLeave };
}
