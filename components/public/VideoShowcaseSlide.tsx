"use client";

import { useEffect, useRef, type SyntheticEvent } from "react";
import type { HomeVideoItem } from "@/lib/home-videos";

export type VideoShowcaseSlideItem = HomeVideoItem & {
  loopKey: string;
};

type VideoShowcaseSlideProps = {
  video: VideoShowcaseSlideItem;
  isCenter: boolean;
  isVisible: boolean;
  shouldPreload?: boolean;
};

export function VideoShowcaseSlide({
  video,
  isCenter,
  isVisible,
  shouldPreload = false,
}: VideoShowcaseSlideProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) {
      return;
    }

    if (isVisible && isCenter) {
      element.preload = "auto";
      void element.play().catch(() => undefined);
      return;
    }

    element.pause();
    if (!isCenter) {
      element.preload = shouldPreload ? "metadata" : "none";
      element.currentTime = 0;
    }
  }, [isCenter, isVisible, shouldPreload]);

  function blockVideoInteraction(event: SyntheticEvent<HTMLVideoElement>): void {
    event.preventDefault();
  }

  return (
    <article className={`video-showcase-slide ${isCenter ? "video-showcase-slide-center" : "video-showcase-slide-side"}`}>
      <div className="video-showcase-frame">
        {isCenter ? <span className="video-showcase-frame-glow" aria-hidden="true" /> : null}
        <span className="video-showcase-frame-border" aria-hidden="true" />
        <div className="video-showcase-media">
          <video
            ref={videoRef}
            className="video-showcase-video"
            src={video.src}
            poster={video.poster}
            muted
            loop
            playsInline
            autoPlay={isVisible && isCenter}
            preload={isCenter ? "auto" : shouldPreload ? "metadata" : "none"}
            controls={false}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noplaybackrate"
            tabIndex={-1}
            aria-hidden="true"
            onContextMenu={blockVideoInteraction}
            onClick={blockVideoInteraction}
          />
          <span
            className={`video-showcase-media-overlay ${isCenter ? "" : "video-showcase-media-overlay-side"}`}
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
}
