import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";

type AboutUsPageChromeProps = {
  locale: Locale;
  searchLabel: string;
};

function AboutUsSearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="about-us-page-search-icon">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M16 16L20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AboutUsPageChrome({ locale, searchLabel }: AboutUsPageChromeProps) {
  return (
    <Link
      href={localePath(locale, "/contact-us")}
      className="about-us-page-search"
      aria-label={searchLabel}
    >
      <AboutUsSearchIcon />
    </Link>
  );
}
