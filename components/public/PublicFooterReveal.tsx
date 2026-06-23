"use client";

import { type ReactNode } from "react";
import {
  FOOTER_REVEAL_ROOT_MARGIN,
  FOOTER_VIEW_THRESHOLD,
} from "@/lib/footer-motion";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";

type PublicFooterRevealProps = {
  children: ReactNode;
};

export function PublicFooterReveal({ children }: PublicFooterRevealProps) {
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: FOOTER_VIEW_THRESHOLD,
    rootMargin: FOOTER_REVEAL_ROOT_MARGIN,
  });

  return (
    <footer
      ref={sectionRef}
      className={`public-footer ${isVisible ? "public-footer--visible" : ""}`}
    >
      {children}
    </footer>
  );
}
