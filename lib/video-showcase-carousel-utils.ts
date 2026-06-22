import type { HomeVideoItem } from "@/lib/home-videos";

export const VIDEO_LOOP_COPIES = 3;

export type LoopedHomeVideoItem = HomeVideoItem & {
  loopKey: string;
};

export function buildLoopedVideos(videos: HomeVideoItem[]): LoopedHomeVideoItem[] {
  return Array.from({ length: VIDEO_LOOP_COPIES }, (_, copyIndex) =>
    videos.map((video) => ({
      ...video,
      loopKey: `${video.id}-loop-${copyIndex}`,
    })),
  ).flat();
}

export function toLogicalVideoIndex(rawIndex: number, videoCount: number): number {
  return ((rawIndex % videoCount) + videoCount) % videoCount;
}

export function getMiddleRawIndex(logicalIndex: number, videoCount: number): number {
  return videoCount + logicalIndex;
}

export function resolveCenterSlideIndex(slides: HTMLElement[], track: HTMLDivElement): number {
  const trackCenter = track.scrollLeft + track.clientWidth / 2;
  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  slides.forEach((slide, index) => {
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
    const distance = Math.abs(trackCenter - slideCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

export function getScrollLeftForSlide(track: HTMLDivElement, slide: HTMLElement): number {
  return slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
}

export function getDirectionalTargetRawIndex(
  startRawIndex: number,
  scrollDelta: number,
  thresholdPx: number,
): number {
  if (Math.abs(scrollDelta) < thresholdPx) {
    return startRawIndex;
  }

  return startRawIndex + (scrollDelta > 0 ? 1 : -1);
}

/** Re-center into the middle copy without visible animation. */
export function normalizeInfiniteScrollPosition(
  track: HTMLDivElement,
  slides: HTMLElement[],
  rawIndex: number,
  videoCount: number,
): number | null {
  if (videoCount <= 1) {
    return null;
  }

  let targetRawIndex: number | null = null;

  if (rawIndex < videoCount) {
    targetRawIndex = rawIndex + videoCount;
  } else if (rawIndex >= videoCount * 2) {
    targetRawIndex = rawIndex - videoCount;
  }

  if (targetRawIndex === null) {
    return null;
  }

  const targetSlide = slides[targetRawIndex];
  if (!targetSlide) {
    return null;
  }

  track.scrollTo({ left: getScrollLeftForSlide(track, targetSlide), behavior: "auto" });
  return targetRawIndex;
}
