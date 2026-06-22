"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { HeroFeatureIcon } from "@/components/public/HeroFeatureIcon";
import { Container } from "@/components/shared/Container";
import { getHomeContent } from "@/lib/content";
import { getHomeHeroSlideImageSrc, getHomeHeroSlideLines } from "@/lib/home-hero-utils";
import type { HomeHeroSlide } from "@/lib/home-hero-types";
import { localePath, type Locale } from "@/lib/i18n";

const AUTO_SLIDE_MS = 8000;
const SWIPE_THRESHOLD_PX = 40;
const SWIPE_LOCK_PX = 12;
const HERO_ENTER_BASE_DELAY_S = 0.12;
const HERO_ENTER_STEP_DELAY_S = 0.11;
const HERO_FEATURE_BASE_DELAY_S = 0.72;
const HERO_FEATURE_STEP_DELAY_S = 0.1;
const PARALLAX_MAX_X_PX = 14;
const PARALLAX_MAX_Y_PX = 10;

type HeroCarouselProps = {
  slides: HomeHeroSlide[];
  locale: Locale;
};

function heroDelayStyle(delaySeconds: number): CSSProperties {
  return { "--hero-delay": `${delaySeconds}s` } as CSSProperties;
}

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

type HeroBackgroundProps = {
  slide: HomeHeroSlide;
  priority?: boolean;
  slideKey: number;
};

function HeroBackground({ slide, priority = false, slideKey }: HeroBackgroundProps) {
  const desktopSrc = getHomeHeroSlideImageSrc(slide, "desktop");
  const mobileSrc = getHomeHeroSlideImageSrc(slide, "mobile");
  const external = isExternalImage(desktopSrc) || isExternalImage(mobileSrc);

  if (external) {
    return (
      <div key={slideKey} className="home-hero-bg-layer">
        <Image
          src={desktopSrc}
          alt=""
          fill
          unoptimized
          priority={priority}
          className="home-hero-bg-image home-hero-bg-image-desktop"
        />
        <Image
          src={mobileSrc}
          alt=""
          fill
          unoptimized
          priority={priority}
          className="home-hero-bg-image home-hero-bg-image-mobile"
        />
      </div>
    );
  }

  return (
    <div key={slideKey} className="home-hero-bg-layer">
      <Image
        src={desktopSrc}
        alt=""
        fill
        priority={priority}
        className="home-hero-bg-image home-hero-bg-image-desktop object-cover"
        sizes="100vw"
      />
      <Image
        src={mobileSrc}
        alt=""
        fill
        priority={priority}
        className="home-hero-bg-image home-hero-bg-image-mobile object-cover"
        sizes="100vw"
      />
    </div>
  );
}

function HeroCtaArrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="home-hero-cta-arrow">
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeroCarousel({ slides, locale }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const hasMultipleSlides = slides.length > 1;
  const heroContent = getHomeContent(locale).hero;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function resetParallax(): void {
      const layer = parallaxRef.current;
      if (layer) {
        layer.style.transform = "";
      }
    }

    function handlePointerMove(event: MouseEvent): void {
      const sectionEl = sectionRef.current;
      const layer = parallaxRef.current;
      if (motionQuery.matches || window.innerWidth < 1024 || !sectionEl || !layer) {
        return;
      }

      const rect = sectionEl.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

      layer.style.transform = `translate3d(${offsetX * PARALLAX_MAX_X_PX}px, ${offsetY * PARALLAX_MAX_Y_PX}px, 0)`;
    }

    function handleMotionPreferenceChange(): void {
      if (motionQuery.matches) {
        resetParallax();
      }
    }

    const sectionEl = sectionRef.current;
    if (!sectionEl) {
      return;
    }

    sectionEl.addEventListener("mousemove", handlePointerMove);
    sectionEl.addEventListener("mouseleave", resetParallax);
    motionQuery.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      sectionEl.removeEventListener("mousemove", handlePointerMove);
      sectionEl.removeEventListener("mouseleave", resetParallax);
      motionQuery.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, []);

  function handleHeroMouseLeave(): void {
    if (parallaxRef.current) {
      parallaxRef.current.style.transform = "";
    }
  }

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

  function handleTouchStart(event: React.TouchEvent<HTMLElement>): void {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLElement>): void {
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
  const slideLines = getHomeHeroSlideLines(activeSlide, locale);
  const description = slideLines.description || heroContent.subtitle;
  const ctaLabel = slideLines.ctaLabel || heroContent.primaryCta;
  const ctaHref = resolveCtaHref(locale, activeSlide.ctaHref);

  return (
    <section
      ref={sectionRef}
      className={`home-hero ${isReady ? "home-hero--ready" : ""} ${locale === "hy" ? "home-hero--hy" : ""}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseLeave={handleHeroMouseLeave}
      aria-label="Homepage hero"
    >
      <div className="home-hero-visual" aria-hidden="true">
        <div ref={parallaxRef} className="home-hero-parallax">
          <HeroBackground slide={activeSlide} priority={activeIndex === 0} slideKey={activeIndex} />
        </div>
        <div className="home-hero-overlay home-hero-overlay-base" />
        <div className="home-hero-overlay home-hero-overlay-radial home-hero-overlay-radial-animated" />
        <div className="home-hero-overlay home-hero-overlay-left" />
        <div className="home-hero-overlay home-hero-overlay-noise" />
        <div className="home-hero-orb home-hero-orb-purple" />
        <div className="home-hero-orb home-hero-orb-cyan" />
        <div className="home-hero-scan-beam" />
      </div>

      <Container className="home-hero-inner">
        <div className="home-hero-body">
          <div className="home-hero-content">
            <p className="home-hero-eyebrow home-hero-animate" style={heroDelayStyle(HERO_ENTER_BASE_DELAY_S)}>
              {heroContent.eyebrow}
            </p>

            <h1 className="home-hero-title">
              {heroContent.headline.map((line, index) => (
                <span
                  key={line.text}
                  className={`home-hero-title-line home-hero-animate ${
                    line.gradient ? "home-hero-title-gradient home-hero-title-gradient-animated" : ""
                  }`}
                  style={heroDelayStyle(HERO_ENTER_BASE_DELAY_S + (index + 1) * HERO_ENTER_STEP_DELAY_S)}
                >
                  {line.text}
                </span>
              ))}
            </h1>

            {description ? (
              <p
                className="home-hero-description home-hero-animate"
                style={heroDelayStyle(
                  HERO_ENTER_BASE_DELAY_S + (heroContent.headline.length + 2) * HERO_ENTER_STEP_DELAY_S,
                )}
              >
                {description}
              </p>
            ) : null}

            {ctaLabel ? (
              <Link
                href={ctaHref}
                className="home-hero-cta home-hero-animate home-hero-cta-animated"
                style={heroDelayStyle(
                  HERO_ENTER_BASE_DELAY_S + (heroContent.headline.length + 3) * HERO_ENTER_STEP_DELAY_S,
                )}
              >
                <span>{ctaLabel}</span>
                <HeroCtaArrow />
              </Link>
            ) : null}
          </div>
        </div>

        <ul className="home-hero-features home-hero-features-animated">
          {heroContent.features.map((feature, index) => (
            <li
              key={feature.key}
              className="home-hero-feature home-hero-animate"
              style={heroDelayStyle(HERO_FEATURE_BASE_DELAY_S + index * HERO_FEATURE_STEP_DELAY_S)}
            >
              <HeroFeatureIcon featureKey={feature.key} />
              <span>{feature.label}</span>
            </li>
          ))}
        </ul>
      </Container>

      {hasMultipleSlides ? (
        <div className="home-hero-dots" role="tablist" aria-label="Hero slides">
          {slides.map((_slide, index) => (
            <button
              key={`dot-${index}`}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to slide ${index + 1}`}
              className={`home-hero-dot ${index === activeIndex ? "home-hero-dot-active" : ""}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
