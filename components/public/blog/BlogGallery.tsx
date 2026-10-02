"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { BlogGalleryItem } from "@/lib/blog/blocks";

type BlogGalleryProps = {
  items: BlogGalleryItem[];
  title: string;
};

export function BlogGallery({ items, title }: BlogGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : items[activeIndex];

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current === null ? current : (current + 1) % items.length));
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current === null ? current : (current - 1 + items.length) % items.length));
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, items.length]);

  return (
    <>
      <ul className="blog-gallery">
        {items.map((item, index) => (
          <li key={item.id ?? item.url}>
            <button type="button" className="blog-gallery-button" onClick={() => setActiveIndex(index)}>
              <Image src={item.url} alt={item.caption || item.alt || title} width={640} height={420} className="blog-gallery-image" />
            </button>
          </li>
        ))}
      </ul>
      {active ? (
        <div className="blog-lightbox" role="dialog" aria-modal="true" aria-label={title}>
          <button type="button" className="blog-lightbox-backdrop" aria-label="Close" onClick={() => setActiveIndex(null)} />
          <figure className="blog-lightbox-figure">
            <Image src={active.url} alt={active.caption || active.alt || title} width={1400} height={900} className="blog-lightbox-image" />
            {active.caption ? <figcaption>{active.caption}</figcaption> : null}
          </figure>
        </div>
      ) : null}
    </>
  );
}
