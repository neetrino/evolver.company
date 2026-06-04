"use client";

import { useState } from "react";
import {
  resetHomeHeroAction,
  saveHomeHeroAction,
  type HomeHeroActionState,
} from "@/app/admin/home-hero/actions";
import { HomeHeroSlideEditor } from "@/components/admin/HomeHeroSlideEditor";
import { createEmptyHomeHeroSlide } from "@/lib/home-hero";
import { MAX_HOME_HERO_SLIDES } from "@/lib/home-hero-validation";
import type { HomeHeroConfig, HomeHeroSlide } from "@/lib/home-hero-types";

type HomeHeroEditorProps = {
  initialConfig: HomeHeroConfig;
};

export function HomeHeroEditor({ initialConfig }: HomeHeroEditorProps) {
  const [slides, setSlides] = useState<HomeHeroSlide[]>(initialConfig.slides);
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([0]);
  const [status, setStatus] = useState<HomeHeroActionState>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  function toggleExpanded(index: number): void {
    setExpandedIndexes((current) =>
      current.includes(index) ? current.filter((value) => value !== index) : [...current, index],
    );
  }

  function addSlide(): void {
    if (slides.length >= MAX_HOME_HERO_SLIDES) {
      setStatus({ error: `Maximum ${MAX_HOME_HERO_SLIDES} slides allowed.` });
      return;
    }

    const nextIndex = slides.length;
    setSlides((current) => [...current, createEmptyHomeHeroSlide()]);
    setExpandedIndexes((current) => [...current, nextIndex]);
    setStatus({});
  }

  function removeSlide(index: number): void {
    if (slides.length <= 1) {
      return;
    }

    setSlides((current) => current.filter((_, slideIndex) => slideIndex !== index));
    setExpandedIndexes((current) =>
      current
        .filter((value) => value !== index)
        .map((value) => (value > index ? value - 1 : value)),
    );
    setStatus({});
  }

  function updateSlide(index: number, slide: HomeHeroSlide): void {
    setSlides((current) => current.map((item, slideIndex) => (slideIndex === index ? slide : item)));
    setStatus({});
  }

  async function handleSave(): Promise<void> {
    setIsSaving(true);
    setStatus({});

    const result = await saveHomeHeroAction({ slides });
    setStatus(result);
    setIsSaving(false);
  }

  async function handleReset(): Promise<void> {
    const confirmed = window.confirm("Reset home hero to default slides? Unsaved changes will be lost.");
    if (!confirmed) {
      return;
    }

    setIsResetting(true);
    setStatus({});

    const result = await resetHomeHeroAction();
    if (result.success) {
      window.location.reload();
      return;
    }

    setStatus(result);
    setIsResetting(false);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#dcc090]/30 bg-white/90 shadow-[0_8px_30px_rgba(139,92,246,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#8b5cf6] px-5 py-4 text-[#dcc090]">
        <h2 className="text-sm font-semibold uppercase tracking-wide">Home Hero Slides</h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-lg border border-[#dcc090]/40 bg-[#dcc090]/15 px-3 py-2 text-sm text-[#dcc090] transition hover:border-[#dcc090] hover:bg-[#dcc090]/25"
            onClick={addSlide}
            disabled={isSaving || isResetting || slides.length >= MAX_HOME_HERO_SLIDES}
          >
            Add Slide
          </button>
          <button
            type="button"
            className="rounded-lg border border-[#dcc090]/40 bg-[#dcc090]/15 px-3 py-2 text-sm text-[#dcc090] transition hover:border-[#dcc090] hover:bg-[#dcc090]/25"
            onClick={() => void handleReset()}
            disabled={isSaving || isResetting}
          >
            {isResetting ? "Resetting..." : "Reset Defaults"}
          </button>
        </div>
      </div>

      <div className="space-y-4 p-5">
        {status.error ? <p className="text-sm text-red-600">{status.error}</p> : null}
        {status.success ? <p className="text-sm text-green-700">{status.success}</p> : null}

        {slides.map((slide, index) => (
          <HomeHeroSlideEditor
            key={`slide-${index}`}
            index={index}
            slide={slide}
            expanded={expandedIndexes.includes(index)}
            canRemove={slides.length > 1}
            onToggle={() => toggleExpanded(index)}
            onRemove={() => removeSlide(index)}
            onChange={(nextSlide) => updateSlide(index, nextSlide)}
          />
        ))}
      </div>

      <div className="flex justify-end border-t border-[#dcc090]/20 px-5 py-4">
        <button
          type="button"
          className="rounded-lg bg-[#8b5cf6] px-5 py-2.5 text-sm font-medium text-[#dcc090] transition hover:bg-[#7c3aed] disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() => void handleSave()}
          disabled={isSaving || isResetting}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
