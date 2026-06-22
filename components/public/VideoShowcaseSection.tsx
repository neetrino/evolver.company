"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Container } from "@/components/shared/Container";
import { VideoShowcasePairStage } from "@/components/public/VideoShowcasePairStage";
import { VideoShowcaseSlide } from "@/components/public/VideoShowcaseSlide";
import { getHomeVideoCopy, getHomeVideos } from "@/lib/home-videos";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";
import type { Locale } from "@/lib/i18n";
import {
  buildLoopedVideos,
  getDirectionalTargetRawIndex,
  getMiddleRawIndex,
  getScrollLeftForSlide,
  normalizeInfiniteScrollPosition,
  resolveCenterSlideIndex,
  toLogicalVideoIndex,
} from "@/lib/video-showcase-carousel-utils";

const VIDEO_VIEW_THRESHOLD = 0.12;
const SCROLL_DIRECTION_THRESHOLD_PX = 28;
const SCROLL_END_DEBOUNCE_MS = 80;
const SCROLL_ANIMATION_MAX_MS = 650;

type VideoShowcaseSectionProps = {
  locale: Locale;
};

function videoDelayStyle(delaySeconds: number): CSSProperties {
  return { "--video-showcase-delay": `${delaySeconds}s` } as CSSProperties;
}

function waitForScrollEnd(track: HTMLDivElement): Promise<void> {
  return new Promise((resolve) => {
    let settled = false;

    const finish = (): void => {
      if (settled) {
        return;
      }
      settled = true;
      track.removeEventListener("scrollend", finish);
      window.clearTimeout(fallbackTimer);
      resolve();
    };

    const fallbackTimer = window.setTimeout(finish, SCROLL_ANIMATION_MAX_MS);
    track.addEventListener("scrollend", finish, { once: true });
  });
}

export function VideoShowcaseSection({ locale }: VideoShowcaseSectionProps) {
  const videos = getHomeVideos();
  const videoCount = videos.length;
  const copy = getHomeVideoCopy(locale);
  const isPairMode = videoCount === 2;
  const loopedVideos =
    videoCount > 1
      ? buildLoopedVideos(videos)
      : videos.map((video) => ({ ...video, loopKey: video.id }));
  const { isVisible: isSectionVisible, sectionRef } = useSectionReveal({
    threshold: VIDEO_VIEW_THRESHOLD,
  });
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const scrollEndTimerRef = useRef<number | null>(null);
  const isNormalizingRef = useRef(false);
  const isProgrammaticScrollRef = useRef(false);
  const rawActiveIndexRef = useRef(videoCount > 1 ? getMiddleRawIndex(0, videoCount) : 0);
  const scrollSessionStartLeftRef = useRef<number | null>(null);
  const scrollSessionStartRawIndexRef = useRef<number | null>(null);
  const [activeLogicalIndex, setActiveLogicalIndex] = useState(0);
  const [rawActiveIndex, setRawActiveIndex] = useState(() =>
    videoCount > 1 ? getMiddleRawIndex(0, videoCount) : 0,
  );
  const [previewCenterIndex, setPreviewCenterIndex] = useState(() =>
    videoCount > 1 ? getMiddleRawIndex(0, videoCount) : 0,
  );
  const [captionDirection, setCaptionDirection] = useState<"next" | "prev">("next");

  const applyCarouselIndex = useCallback((nextRawIndex: number): void => {
    rawActiveIndexRef.current = nextRawIndex;
    setRawActiveIndex(nextRawIndex);
    setPreviewCenterIndex(nextRawIndex);
    setActiveLogicalIndex(toLogicalVideoIndex(nextRawIndex, videoCount));
  }, [videoCount]);

  const getSlides = useCallback((): HTMLElement[] => {
    return slideRefs.current.filter(Boolean) as HTMLElement[];
  }, []);

  const scrollToRawIndex = useCallback(async (index: number, smooth: boolean): Promise<void> => {
    const track = trackRef.current;
    const slide = slideRefs.current[index];
    if (!track || !slide) {
      return;
    }

    isProgrammaticScrollRef.current = true;
    track.scrollTo({
      left: getScrollLeftForSlide(track, slide),
      behavior: smooth ? "smooth" : "auto",
    });

    if (smooth) {
      await waitForScrollEnd(track);
    }
  }, []);

  const finalizeRawIndex = useCallback(
    async (targetRawIndex: number): Promise<void> => {
      const track = trackRef.current;
      const slides = getSlides();
      if (!track || slides.length === 0) {
        return;
      }

      let resolvedRawIndex = targetRawIndex;

      if (videoCount > 1) {
        isNormalizingRef.current = true;
        const normalizedIndex = normalizeInfiniteScrollPosition(track, slides, targetRawIndex, videoCount);
        if (normalizedIndex !== null) {
          resolvedRawIndex = normalizedIndex;
        }
        isNormalizingRef.current = false;
      }

      applyCarouselIndex(resolvedRawIndex);
      isProgrammaticScrollRef.current = false;
      scrollSessionStartLeftRef.current = null;
      scrollSessionStartRawIndexRef.current = null;
    },
    [applyCarouselIndex, getSlides, videoCount],
  );

  const navigateToRawIndex = useCallback(
    async (targetRawIndex: number, smooth = true): Promise<void> => {
      await scrollToRawIndex(targetRawIndex, smooth);
      await finalizeRawIndex(targetRawIndex);
    },
    [finalizeRawIndex, scrollToRawIndex],
  );

  const updatePreviewCenter = useCallback((): void => {
    const track = trackRef.current;
    const slides = getSlides();
    if (!track || slides.length === 0) {
      return;
    }

    setPreviewCenterIndex(resolveCenterSlideIndex(slides, track));
  }, [getSlides]);

  const beginScrollSession = useCallback((): void => {
    const track = trackRef.current;
    if (!track || scrollSessionStartLeftRef.current !== null) {
      return;
    }

    scrollSessionStartLeftRef.current = track.scrollLeft;
    scrollSessionStartRawIndexRef.current = rawActiveIndexRef.current;
  }, []);

  const finishScrollSession = useCallback(async (): Promise<void> => {
    const track = trackRef.current;
    const startLeft = scrollSessionStartLeftRef.current;
    const startRawIndex = scrollSessionStartRawIndexRef.current;
    if (!track || startLeft === null || startRawIndex === null) {
      return;
    }

    const scrollDelta = track.scrollLeft - startLeft;
    const targetRawIndex = getDirectionalTargetRawIndex(
      startRawIndex,
      scrollDelta,
      SCROLL_DIRECTION_THRESHOLD_PX,
    );

    await navigateToRawIndex(targetRawIndex, true);
  }, [navigateToRawIndex]);

  useEffect(() => {
    rawActiveIndexRef.current = rawActiveIndex;
  }, [rawActiveIndex]);

  useEffect(() => {
    if (!isSectionVisible || isPairMode) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      void navigateToRawIndex(videoCount > 1 ? getMiddleRawIndex(0, videoCount) : 0, false);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isPairMode, isSectionVisible, navigateToRawIndex, videoCount]);

  useEffect(() => {
    return () => {
      if (scrollEndTimerRef.current !== null) {
        window.clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, []);

  if (videoCount === 0) {
    return null;
  }

  const hasMultiple = videoCount > 1;
  const activeVideo = videos[activeLogicalIndex];
  const centerIndex = previewCenterIndex;

  function handlePrev(): void {
    void navigateToRawIndex(rawActiveIndexRef.current - 1, true);
  }

  function handleNext(): void {
    void navigateToRawIndex(rawActiveIndexRef.current + 1, true);
  }

  function handleTrackScroll(): void {
    if (isNormalizingRef.current || isProgrammaticScrollRef.current) {
      return;
    }

    beginScrollSession();
    updatePreviewCenter();

    if (scrollEndTimerRef.current !== null) {
      window.clearTimeout(scrollEndTimerRef.current);
    }

    scrollEndTimerRef.current = window.setTimeout(() => {
      void finishScrollSession();
    }, SCROLL_END_DEBOUNCE_MS);
  }

  function handleTrackPointerDown(): void {
    if (isProgrammaticScrollRef.current) {
      return;
    }

    beginScrollSession();
  }

  function isAdjacentSlide(index: number): boolean {
    return Math.abs(index - centerIndex) === 1;
  }

  return (
    <section
      ref={sectionRef}
      className={`video-showcase-section ${isSectionVisible ? "video-showcase-section--visible" : ""}`}
      aria-label={copy.titleLines.map((line) => line.text).join(" ")}
    >
      <Container className="video-showcase-container">
        <header className="video-showcase-header">
          <span className="video-showcase-badge video-showcase-animate" style={videoDelayStyle(0.08)}>
            <span className="video-showcase-badge-dot" aria-hidden="true" />
            {copy.eyebrow}
          </span>

          <h2 className="video-showcase-title">
            {copy.titleLines.map((line, index) => (
              <span
                key={line.text}
                className={`video-showcase-title-line video-showcase-animate ${
                  line.gradient ? "video-showcase-title-gradient" : ""
                }`}
                style={videoDelayStyle(0.08 + (index + 1) * 0.1)}
              >
                {line.text}
              </span>
            ))}
          </h2>

          <p className="video-showcase-subtitle video-showcase-animate" style={videoDelayStyle(0.32)}>
            {copy.subtitle}
          </p>
        </header>

        {isPairMode ? (
          <VideoShowcasePairStage
            locale={locale}
            videos={[videos[0], videos[1]]}
            isVisible={isSectionVisible}
            activeIndex={activeLogicalIndex}
            onActiveIndexChange={setActiveLogicalIndex}
            onDirectionChange={setCaptionDirection}
          />
        ) : (
          <div className="video-showcase-stage">
            {hasMultiple ? (
              <button
                type="button"
                className="video-showcase-nav video-showcase-nav-prev"
                aria-label={locale === "hy" ? "Նախորդ վիդեո" : "Previous video"}
                onClick={handlePrev}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M15 18l-6-6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : null}

            <div className="video-showcase-viewport">
              <div
                ref={trackRef}
                className="video-showcase-track"
                onScroll={handleTrackScroll}
                onPointerDown={handleTrackPointerDown}
                role="region"
                aria-roledescription="carousel"
                aria-label={locale === "hy" ? "Վիդեո ցուցադրություն" : "Video showcase"}
              >
                {loopedVideos.map((video, index) => (
                  <div
                    key={video.loopKey}
                    ref={(node) => {
                      slideRefs.current[index] = node;
                    }}
                    className={`video-showcase-slide-wrap ${
                      index === centerIndex ? "video-showcase-slide-wrap-active" : ""
                    }`}
                  >
                    <VideoShowcaseSlide
                      video={video}
                      isCenter={index === centerIndex}
                      isVisible={isSectionVisible}
                      shouldPreload={isAdjacentSlide(index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {hasMultiple ? (
              <button
                type="button"
                className="video-showcase-nav video-showcase-nav-next"
                aria-label={locale === "hy" ? "Հաջորդ վիդեո" : "Next video"}
                onClick={handleNext}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M9 18l6-6-6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : null}
          </div>
        )}

        {activeVideo ? (
          <div
            className="video-showcase-caption-bar"
            key={activeVideo.id}
            data-direction={captionDirection}
          >
            <h3 className="video-showcase-caption-title">{activeVideo.title[locale]}</h3>
            {activeVideo.description?.[locale] ? (
              <p className="video-showcase-caption-text">{activeVideo.description[locale]}</p>
            ) : null}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
