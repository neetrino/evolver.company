"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/shared/Container";
import {
  getHomeHeroSlideImageSrc,
  getHomeHeroSlideLines,
} from "@/lib/home-hero";
import type { HomeHeroSlide } from "@/lib/home-hero-types";
import { localePath, type Locale } from "@/lib/i18n";

const AUTO_SLIDE_MS = 3000;
const SWIPE_THRESHOLD_PX = 40;
const SWIPE_LOCK_PX = 12;

type HeroCarouselProps = {
  slides: HomeHeroSlide[];
  locale: Locale;
};

function isExternalImage(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

function resolveCtaHref(locale: Locale, href: string): string {
  const trimmed = href.trim();
  if (!trimmed) {
    return localePath(locale, "/projects");
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("#")) {
    return trimmed;
  }

  const normalized = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return localePath(locale, normalized);
}

type HeroSlideImageProps = {
  slide: HomeHeroSlide;
  priority?: boolean;
};

function HeroSlideImage({ slide, priority = false }: HeroSlideImageProps) {
  const desktopSrc = getHomeHeroSlideImageSrc(slide, "desktop");
  const mobileSrc = getHomeHeroSlideImageSrc(slide, "mobile");
  const external = isExternalImage(desktopSrc) || isExternalImage(mobileSrc);

  if (external) {
    return (
      <>
        <img
          src={desktopSrc}
          alt=""
          className="hero-carousel-image hero-carousel-image-desktop"
        />
        <img
          src={mobileSrc}
          alt=""
          className="hero-carousel-image hero-carousel-image-mobile"
        />
      </>
    );
  }

  return (
    <>
      <Image
        src={desktopSrc}
        alt=""
        fill
        priority={priority}
        className="hero-carousel-image hero-carousel-image-desktop object-cover"
        sizes="100vw"
      />
      <Image
        src={mobileSrc}
        alt=""
        fill
        priority={priority}
        className="hero-carousel-image hero-carousel-image-mobile object-cover"
        sizes="100vw"
      />
    </>
  );
}

export function HeroCarousel({ slides, locale }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const hasMultipleSlides = slides.length > 1;

  const goToSlide = useCallback(
    (index: number) => {
      if (slides.length === 0) {
        return;
      }

      const normalized = ((index % slides.length) + slides.length) % slides.length;
      setActiveIndex(normalized);
    },
    [slides.length],
  );

  const goNext = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    if (!hasMultipleSlides) {
      return;
    }

    const timer = window.setInterval(goNext, AUTO_SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [goNext, hasMultipleSlides]);

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>): void {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>): void {
    if (!touchStartRef.current || !hasMultipleSlides) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(deltaY) > SWIPE_LOCK_PX && Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }

    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) {
      return;
    }

    if (deltaX < 0) {
      goNext();
      return;
    }

    goPrev();
  }

  if (slides.length === 0) {
    return null;
  }

  const activeSlide = slides[activeIndex];
  const lines = getHomeHeroSlideLines(activeSlide, locale);
  const ctaHref = resolveCtaHref(locale, activeSlide.ctaHref);

  return (
    <section className="hero-carousel-section">
      <Container>
        <div
          className="hero-carousel"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="hero-carousel-frame">
            <HeroSlideImage slide={activeSlide} priority={activeIndex === 0} />
            <div className="hero-carousel-overlay" />
            <div className="hero-carousel-content">
              {lines.title ? <h1 className="hero-carousel-title">{lines.title}</h1> : null}
              {lines.description ? (
                <p className="hero-carousel-description">{lines.description}</p>
              ) : null}
              {lines.ctaLabel ? (
                <Link href={ctaHref} className="hero-carousel-cta">
                  {lines.ctaLabel}
                </Link>
              ) : null}
            </div>
          </div>

          {hasMultipleSlides ? (
            <div className="hero-carousel-dots" role="tablist" aria-label="Hero slides">
              {slides.map((_slide, index) => (
                <button
                  key={`dot-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`hero-carousel-dot ${index === activeIndex ? "hero-carousel-dot-active" : ""}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
