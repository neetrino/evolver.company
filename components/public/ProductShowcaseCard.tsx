import Image from "next/image";
import type { ProductShowcaseItem } from "@/lib/product-showcase";

const SHOWCASE_PARTICLE_KEYS = ["one", "two", "three", "four", "five", "six"] as const;

type ProductShowcaseCardProps = {
  product: ProductShowcaseItem;
};
function ExternalLinkIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="product-showcase-card-arrow-icon"
    >
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProductShowcaseCard({ product }: ProductShowcaseCardProps) {
  return (
    <a
      href={product.href}
      className="product-showcase-card"
      data-accent={product.accent}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={product.title}
    >
      <span className="product-showcase-card-glow" aria-hidden="true" />
      <span className="product-showcase-card-particles" aria-hidden="true">
        {SHOWCASE_PARTICLE_KEYS.map((key) => (
          <span key={key} className={`product-showcase-card-particle product-showcase-card-particle-${key}`} />
        ))}
      </span>
      <span className="product-showcase-card-corner product-showcase-card-corner-tl" aria-hidden="true" />
      <span className="product-showcase-card-corner product-showcase-card-corner-br" aria-hidden="true" />
      <span className="product-showcase-card-arrow" aria-hidden="true">
        <ExternalLinkIcon />
      </span>

      <div className="product-showcase-card-logo-wrap">
        <Image
          src={product.logoSrc}
          alt={product.title}
          width={product.logoWidth}
          height={product.logoHeight}
          className="product-showcase-card-logo"
          sizes="(max-width: 768px) 120px, 140px"
        />
      </div>

      <div className="product-showcase-card-body">
        <span className="product-showcase-card-accent-line" aria-hidden="true" />
        <p className="product-showcase-card-description">{product.description}</p>
      </div>
    </a>
  );
}
