"use client";

import { HomeHeroImageUploader } from "@/components/admin/HomeHeroImageUploader";
import {
  HOME_HERO_ADMIN_LOCALES,
  type HomeHeroAdminLocale,
  type HomeHeroSlide,
} from "@/lib/home-hero-types";
import { getHomeHeroSlidePreviewTitle } from "@/lib/home-hero";

const LOCALE_LABELS: Record<HomeHeroAdminLocale, string> = {
  hy: "Armenian",
  en: "English",
};

type HomeHeroSlideEditorProps = {
  index: number;
  slide: HomeHeroSlide;
  expanded: boolean;
  canRemove: boolean;
  onToggle: () => void;
  onRemove: () => void;
  onChange: (slide: HomeHeroSlide) => void;
};

export function HomeHeroSlideEditor({
  index,
  slide,
  expanded,
  canRemove,
  onToggle,
  onRemove,
  onChange,
}: HomeHeroSlideEditorProps) {
  const previewTitle = getHomeHeroSlidePreviewTitle(slide);

  function updateCopy(
    locale: HomeHeroAdminLocale,
    field: keyof HomeHeroSlide["copy"]["en"],
    value: string,
  ): void {
    onChange({
      ...slide,
      copy: {
        ...slide.copy,
        [locale]: {
          ...slide.copy[locale],
          [field]: value,
        },
      },
    });
  }

  return (
    <div className="rounded-xl border border-[#dcc090]/25 bg-white/95 transition hover:border-[#dcc090]/50 hover:shadow-[0_4px_16px_rgba(139,92,246,0.06)]">
      <div className="flex items-start gap-3 p-4">
        <button
          type="button"
          aria-expanded={expanded}
          aria-label={expanded ? "Collapse slide" : "Expand slide"}
          className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#dcc090]/35 text-black transition hover:border-[#dcc090]"
          onClick={onToggle}
        >
          <span
            className={`inline-block text-sm transition-transform ${expanded ? "rotate-90" : ""}`}
          >
            ›
          </span>
        </button>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-black">Slide {index + 1}</p>
          {previewTitle ? (
            <p className="truncate text-sm text-black/70">{previewTitle}</p>
          ) : (
            <p className="text-sm text-black/50">No title yet</p>
          )}
        </div>

        <button
          type="button"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onRemove}
          disabled={!canRemove}
        >
          Remove
        </button>
      </div>

      {expanded ? (
        <div className="space-y-6 border-t border-[#dcc090]/20 px-4 pb-4 pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <HomeHeroImageUploader
              label="Desktop image"
              value={slide.imageUrl}
              onChange={(url) => onChange({ ...slide, imageUrl: url })}
              onClear={() => onChange({ ...slide, imageUrl: "" })}
              clearLabel="Remove desktop image"
            />
            <HomeHeroImageUploader
              label="Mobile image"
              value={slide.mobileImageUrl ?? ""}
              onChange={(url) => onChange({ ...slide, mobileImageUrl: url })}
              onClear={() =>
                onChange({
                  ...slide,
                  mobileImageUrl: undefined,
                })
              }
              clearLabel="Remove mobile image"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-black" htmlFor={`cta-${index}`}>
              CTA href
            </label>
            <input
              id={`cta-${index}`}
              type="text"
              value={slide.ctaHref}
              onChange={(event) => onChange({ ...slide, ctaHref: event.target.value })}
              className="w-full rounded-lg border border-[#dcc090]/35 bg-white px-3 py-2 text-black focus:border-[#dcc090] focus:outline-none focus:ring-2 focus:ring-[#dcc090]/30"
              placeholder="/projects"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {HOME_HERO_ADMIN_LOCALES.map((locale) => (
              <div
                key={locale}
                className="space-y-3 rounded-lg border border-[#dcc090]/25 bg-white p-3"
              >
                <p className="text-sm font-semibold text-black">{LOCALE_LABELS[locale]}</p>
                <div>
                  <label className="mb-1 block text-xs text-black/70" htmlFor={`${locale}-title-${index}`}>
                    Title
                  </label>
                  <input
                    id={`${locale}-title-${index}`}
                    type="text"
                    value={slide.copy[locale].title}
                    onChange={(event) => updateCopy(locale, "title", event.target.value)}
                    className="w-full rounded-lg border border-[#dcc090]/35 bg-white px-3 py-2 text-sm text-black focus:border-[#dcc090] focus:outline-none focus:ring-2 focus:ring-[#dcc090]/30"
                  />
                </div>
                <div>
                  <label
                    className="mb-1 block text-xs text-black/70"
                    htmlFor={`${locale}-description-${index}`}
                  >
                    Description
                  </label>
                  <textarea
                    id={`${locale}-description-${index}`}
                    value={slide.copy[locale].description}
                    onChange={(event) => updateCopy(locale, "description", event.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-[#dcc090]/35 bg-white px-3 py-2 text-sm text-black focus:border-[#dcc090] focus:outline-none focus:ring-2 focus:ring-[#dcc090]/30"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-black/70" htmlFor={`${locale}-cta-${index}`}>
                    CTA label
                  </label>
                  <input
                    id={`${locale}-cta-${index}`}
                    type="text"
                    value={slide.copy[locale].ctaLabel}
                    onChange={(event) => updateCopy(locale, "ctaLabel", event.target.value)}
                    className="w-full rounded-lg border border-[#dcc090]/35 bg-white px-3 py-2 text-sm text-black focus:border-[#dcc090] focus:outline-none focus:ring-2 focus:ring-[#dcc090]/30"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
