import type { HeroFeature } from "@/lib/content";

type HeroFeatureIconProps = {
  featureKey: HeroFeature["key"];
};

type FeatureIconSvgProps = {
  gradientId: string;
  glowId: string;
};

function FeatureIconDefs({ gradientId, glowId }: FeatureIconSvgProps) {
  return (
    <defs>
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b026ff" />
        <stop offset="55%" stopColor="#7b5cff" />
        <stop offset="100%" stopColor="#00d1ff" />
      </linearGradient>
      <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow dx="0" dy="0" stdDeviation="0.65" floodColor="#b026ff" floodOpacity="0.55" />
        <feDropShadow dx="0" dy="0" stdDeviation="1.1" floodColor="#00d1ff" floodOpacity="0.25" />
      </filter>
    </defs>
  );
}

function ScanningIcon({ gradientId, glowId }: FeatureIconSvgProps) {
  const stroke = `url(#${gradientId})`;

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="home-hero-feature-icon">
      <FeatureIconDefs gradientId={gradientId} glowId={glowId} />
      <g filter={`url(#${glowId})`} fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round">
        {/* Outer isometric wireframe cube */}
        <path strokeWidth="1.15" d="M16 26.5 23.5 22.25 16 18 8.5 22.25 16 26.5Z" />
        <path strokeWidth="1.15" d="M16 14.5 23.5 10.25 16 6 8.5 10.25 16 14.5Z" />
        <path strokeWidth="1.15" d="M16 26.5V14.5M23.5 22.25V10.25M8.5 22.25V10.25" />

        {/* Inner scan geometry */}
        <path strokeWidth="1" d="M16 23.75 20.75 21 16 18.25 11.25 21 16 23.75Z" />
        <path strokeWidth="1" d="M16 17.25 20.75 14.5 16 11.75 11.25 14.5 16 17.25Z" />
        <path strokeWidth="1" d="M16 23.75V17.25M20.75 21V14.5M11.25 21V14.5" />

        {/* Structural scan lines */}
        <path strokeWidth="0.85" opacity="0.75" d="M16 26.5 16 23.75M23.5 22.25 20.75 21M8.5 22.25 11.25 21" />
        <path strokeWidth="0.85" opacity="0.75" d="M16 14.5 16 17.25M23.5 10.25 20.75 14.5M8.5 10.25 11.25 14.5" />
        <path strokeWidth="0.85" opacity="0.55" d="M16 18.25 16 11.75" />
      </g>
    </svg>
  );
}

function TwinsIcon({ gradientId, glowId }: FeatureIconSvgProps) {
  const stroke = `url(#${gradientId})`;

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="home-hero-feature-icon">
      <FeatureIconDefs gradientId={gradientId} glowId={glowId} />
      <g filter={`url(#${glowId})`} fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round">
        <path strokeWidth="1.15" d="M16 24.5 23.5 20.25 16 16 8.5 20.25 16 24.5Z" />
        <path strokeWidth="1.15" d="M16 18.5 23.5 14.25 16 10 8.5 14.25 16 18.5Z" />
        <path strokeWidth="1.15" d="M16 12.5 23.5 8.25 16 4 8.5 8.25 16 12.5Z" />
        <path strokeWidth="0.85" opacity="0.55" d="M16 16V10M16 22V18.5" />
      </g>
    </svg>
  );
}

function ImmersiveIcon({ gradientId, glowId }: FeatureIconSvgProps) {
  const stroke = `url(#${gradientId})`;

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="home-hero-feature-icon">
      <FeatureIconDefs gradientId={gradientId} glowId={glowId} />
      <g filter={`url(#${glowId})`} fill="none" stroke={stroke} strokeLinecap="round">
        <circle cx="16" cy="16" r="10.5" strokeWidth="1.15" />
        <circle cx="16" cy="16" r="6.25" strokeWidth="1.05" opacity="0.9" />
        <circle cx="16" cy="16" r="2.1" strokeWidth="1" fill={`url(#${gradientId})`} />
      </g>
    </svg>
  );
}

export function HeroFeatureIcon({ featureKey }: HeroFeatureIconProps) {
  const gradientId = `hero-feature-gradient-${featureKey}`;
  const glowId = `hero-feature-glow-${featureKey}`;
  const props = { gradientId, glowId };

  if (featureKey === "scanning") {
    return <ScanningIcon {...props} />;
  }

  if (featureKey === "twins") {
    return <TwinsIcon {...props} />;
  }

  return <ImmersiveIcon {...props} />;
}
