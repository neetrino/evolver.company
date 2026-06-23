"use client";

import { useEffect, useState } from "react";
import { FOOTER_ENTER_BASE_DELAY_S, FOOTER_ENTER_STEP_DELAY_S, footerDelayStyle } from "@/lib/footer-motion";

type FooterScrollTopProps = {
  label: string;
};

const SCROLL_THRESHOLD_PX = 320;

export function FooterScrollTop({ label }: FooterScrollTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SCROLL_THRESHOLD_PX);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const delay = FOOTER_ENTER_BASE_DELAY_S + FOOTER_ENTER_STEP_DELAY_S * 4.5;

  return (
    <button
      type="button"
      className={`footer-scroll-top footer-animate ${visible ? "footer-scroll-top--scrolled" : ""}`}
      style={footerDelayStyle(delay)}
      onClick={scrollToTop}
      aria-label={label}
    >
      <span className="footer-scroll-top-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="footer-scroll-top-arrow-svg">
          <path
            d="M12 19V5M5 12l7-7 7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="footer-scroll-top-label">{label}</span>
      <span className="footer-scroll-top-dots" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
    </button>
  );
}
