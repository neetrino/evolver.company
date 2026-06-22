"use client";

import { useEffect, useState } from "react";

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

  return (
    <button
      type="button"
      className={`footer-scroll-top ${visible ? "footer-scroll-top--visible" : ""}`}
      onClick={scrollToTop}
      aria-label={label}
    >
      <span className="footer-scroll-top-arrow" aria-hidden="true">
        ↑
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
