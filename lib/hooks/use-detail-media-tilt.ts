"use client";

import { useCallback, useRef } from "react";

const DETAIL_MEDIA_TILT_MAX_DEG = 7;

export function useDetailMediaTilt() {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * DETAIL_MEDIA_TILT_MAX_DEG * 2;
    const rotateX = (0.5 - y) * DETAIL_MEDIA_TILT_MAX_DEG * 2;

    element.style.setProperty("--detail-tilt-x", `${rotateX.toFixed(2)}deg`);
    element.style.setProperty("--detail-tilt-y", `${rotateY.toFixed(2)}deg`);
    element.style.setProperty("--detail-spot-x", `${(x * 100).toFixed(1)}%`);
    element.style.setProperty("--detail-spot-y", `${(y * 100).toFixed(1)}%`);
  }, []);

  const handlePointerLeave = useCallback(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    element.style.setProperty("--detail-tilt-x", "0deg");
    element.style.setProperty("--detail-tilt-y", "0deg");
    element.style.setProperty("--detail-spot-x", "50%");
    element.style.setProperty("--detail-spot-y", "44%");
  }, []);

  return { ref, handlePointerMove, handlePointerLeave };
}
