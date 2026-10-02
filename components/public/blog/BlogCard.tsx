import Image from "next/image";
import Link from "next/link";
import { blogDelayStyle, BLOG_ENTER_BASE_DELAY_S, BLOG_ENTER_STEP_DELAY_S, BLOG_GRID_STAGGER_CAP } from "@/lib/blog-motion";

type BlogCardProps = {
  href: string;
  image: string;
  imageAlt: string;
  dateIso: string;
  dateLabel: string;
  title: string;
  excerpt?: string;
  readMore: string;
  eyebrow?: string;
  index: number;
};

function CtaArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="blog-card-cta-icon">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BlogCard({
  href,
  image,
  imageAlt,
  dateIso,
  dateLabel,
  title,
  excerpt,
  readMore,
  eyebrow,
  index,
}: BlogCardProps) {
  const delayIndex = Math.min(index, BLOG_GRID_STAGGER_CAP - 1);
  const delay = BLOG_ENTER_BASE_DELAY_S + (delayIndex + 1) * BLOG_ENTER_STEP_DELAY_S;
  const accent = index % 2 === 0 ? "purple" : "cyan";

  return (
    <li className="blog-card-item blog-animate" data-accent={accent} style={blogDelayStyle(delay)}>
      <Link href={href} prefetch className="blog-card">
        <span className="blog-card-glow" aria-hidden="true" />
        <span className="blog-card-shimmer" aria-hidden="true" />
        <span className="blog-card-edge blog-card-edge-top" aria-hidden="true" />
        <span className="blog-card-edge blog-card-edge-bottom" aria-hidden="true" />
        <div className="blog-card-media">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="blog-card-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span className="blog-card-media-glow" aria-hidden="true" />
          <span className="blog-card-media-frame" aria-hidden="true" />
        </div>
        <div className="blog-card-body">
          {eyebrow ? <p className="blog-card-eyebrow">{eyebrow}</p> : null}
          <time className="blog-card-date" dateTime={dateIso}>
            {dateLabel}
          </time>
          <h2 className="blog-card-title">{title}</h2>
          {excerpt ? <p className="blog-card-description">{excerpt}</p> : null}
          <span className="blog-card-cta">
            <span>{readMore}</span>
            <CtaArrowIcon />
          </span>
        </div>
      </Link>
    </li>
  );
}
