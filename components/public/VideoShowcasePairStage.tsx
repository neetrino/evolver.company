"use client";

import { useRef, useState, type TouchEvent } from "react";
import type { HomeVideoItem } from "@/lib/home-videos";
import type { Locale } from "@/lib/i18n";
import { VideoShowcaseSlide, type VideoShowcaseSlideItem } from "@/components/public/VideoShowcaseSlide";

const PAIR_SWIPE_THRESHOLD_PX = 48;

type SlideDirection = "next" | "prev";

type VideoShowcasePairStageProps = {
  locale: Locale;
  videos: [HomeVideoItem, HomeVideoItem];
  isVisible: boolean;
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onDirectionChange?: (direction: SlideDirection) => void;
};

function toSlideItem(video: HomeVideoItem, slot: string): VideoShowcaseSlideItem {
  return { ...video, loopKey: `${video.id}-${slot}` };
}

export function VideoShowcasePairStage({
  locale,
  videos,
  isVisible,
  activeIndex,
  onActiveIndexChange,
  onDirectionChange,
}: VideoShowcasePairStageProps) {
  const touchStartXRef = useRef(0);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>("next");
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const activeVideo = videos[activeIndex];
  const sideVideo = videos[activeIndex === 0 ? 1 : 0];

  function dismissSwipeHint(): void {
    setShowSwipeHint(false);
  }

  function goTo(direction: SlideDirection): void {
    dismissSwipeHint();
    setSlideDirection(direction);
    onDirectionChange?.(direction);
    onActiveIndexChange(activeIndex === 0 ? 1 : 0);
  }

  function handlePrev(): void {
    goTo("prev");
  }

  function handleNext(): void {
    goTo("next");
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>): void {
    touchStartXRef.current = event.touches[0]?.clientX ?? 0;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>): void {
    const touch = event.changedTouches[0];
    if (!touch) {
      return;
    }

    const deltaX = touchStartXRef.current - touch.clientX;
    if (Math.abs(deltaX) < PAIR_SWIPE_THRESHOLD_PX) {
      return;
    }

    dismissSwipeHint();

    if (deltaX > 0) {
      handleNext();
      return;
    }

    handlePrev();
  }

  return (
    <div className="video-showcase-stage video-showcase-stage--pair">
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

      <div
        className="video-showcase-viewport video-showcase-viewport--pair"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-roledescription="carousel"
        aria-label={locale === "hy" ? "Վիդեո ցուցադրություն" : "Video showcase"}
      >
        <span className="video-showcase-edge-hint video-showcase-edge-hint-left" aria-hidden="true" />
        <span className="video-showcase-edge-hint video-showcase-edge-hint-right" aria-hidden="true" />

        <div className="video-showcase-pair-layout" data-direction={slideDirection}>
          <div className="video-showcase-pair-side video-showcase-pair-side-left" key={`left-${sideVideo.id}`}>
            <VideoShowcaseSlide
              video={toSlideItem(sideVideo, "pair-left")}
              isCenter={false}
              isVisible={isVisible}
              shouldPreload
            />
          </div>

          <div className="video-showcase-pair-center" key={`center-${activeVideo.id}`}>
            <VideoShowcaseSlide
              video={toSlideItem(activeVideo, "pair-center")}
              isCenter
              isVisible={isVisible}
            />
          </div>

          <div className="video-showcase-pair-side video-showcase-pair-side-right" key={`right-${sideVideo.id}`}>
            <VideoShowcaseSlide
              video={toSlideItem(sideVideo, "pair-right")}
              isCenter={false}
              isVisible={isVisible}
              shouldPreload
            />
          </div>
        </div>

        <div
          className={`video-showcase-swipe-hint ${showSwipeHint ? "" : "video-showcase-swipe-hint--hidden"}`}
          aria-hidden="true"
        >
          <svg className="video-showcase-swipe-hint-icon" width="16" height="16" viewBox="0 0 24 24">
            <path
              d="M7 12h10M13 8l4 4-4 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{locale === "hy" ? "Թերթեք" : "Swipe"}</span>
          <svg className="video-showcase-swipe-hint-icon video-showcase-swipe-hint-icon-reverse" width="16" height="16" viewBox="0 0 24 24">
            <path
              d="M7 12h10M13 8l4 4-4 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

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
    </div>
  );
}
