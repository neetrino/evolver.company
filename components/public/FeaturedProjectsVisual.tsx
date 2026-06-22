"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const VISUAL_VIEWBOX_WIDTH = 520;
const VISUAL_VIEWBOX_HEIGHT = 420;
const NEON_PURPLE = "#bc13fe";
const NEON_CYAN = "#00f2ff";
const NEON_PINK = "#e040fb";
const WIRE_WIDTH = 118;
const WIRE_DEPTH = 52;
const WIRE_HEIGHT = 34;
const PARALLAX_MAX_X_PX = 18;
const PARALLAX_MAX_Y_PX = 12;

type Point = { x: number; y: number };

type WireframeFrameConfig = {
  id: string;
  ox: number;
  oy: number;
  strokeId: string;
  delay: number;
  floatDuration: number;
};

const WIREFRAME_FRAMES: WireframeFrameConfig[] = [
  { id: "frame-1", ox: 68, oy: 272, strokeId: "projects-visual-stroke-cyan", delay: 0.32, floatDuration: 6.4 },
  { id: "frame-2", ox: 98, oy: 212, strokeId: "projects-visual-stroke-blue", delay: 0.46, floatDuration: 5.9 },
  { id: "frame-3", ox: 128, oy: 152, strokeId: "projects-visual-stroke-pink", delay: 0.6, floatDuration: 5.5 },
  { id: "frame-4", ox: 158, oy: 92, strokeId: "projects-visual-stroke-purple", delay: 0.74, floatDuration: 5.1 },
];

const VISUAL_PARTICLES = [
  { cx: 448, cy: 62, fill: NEON_PURPLE, delay: 0.2 },
  { cx: 52, cy: 334, fill: NEON_CYAN, delay: 0.55 },
  { cx: 388, cy: 178, fill: "#7b5cff", delay: 0.35 },
  { cx: 420, cy: 320, fill: NEON_CYAN, delay: 0.7 },
  { cx: 108, cy: 118, fill: NEON_PINK, delay: 0.45 },
  { cx: 468, cy: 248, fill: "#ffffff", delay: 0.85 },
] as const;

type WireframePaths = {
  top: string;
  outline: string;
};

function buildWireframePaths(ox: number, oy: number): WireframePaths {
  const p0: Point = { x: ox, y: oy };
  const p1: Point = { x: ox + WIRE_WIDTH, y: oy + WIRE_WIDTH * 0.46 };
  const p2: Point = { x: ox + WIRE_WIDTH + WIRE_DEPTH * 0.72, y: oy + WIRE_WIDTH * 0.46 - WIRE_DEPTH * 0.42 };
  const p3: Point = { x: ox + WIRE_DEPTH * 0.72, y: oy - WIRE_DEPTH * 0.42 };
  const q0: Point = { x: p0.x, y: p0.y + WIRE_HEIGHT };
  const q1: Point = { x: p1.x, y: p1.y + WIRE_HEIGHT };
  const q2: Point = { x: p2.x, y: p2.y + WIRE_HEIGHT };
  const q3: Point = { x: p3.x, y: p3.y + WIRE_HEIGHT };

  return {
    top: `M ${p0.x} ${p0.y} L ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} Z`,
    outline: `M ${p0.x} ${p0.y} L ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} Z M ${p0.x} ${p0.y} L ${q0.x} ${q0.y} L ${q1.x} ${q1.y} L ${p1.x} ${p1.y} M ${p2.x} ${p2.y} L ${q2.x} ${q2.y} L ${q3.x} ${q3.y} L ${p3.x} ${p3.y} M ${q0.x} ${q0.y} L ${q1.x} ${q1.y} L ${q2.x} ${q2.y} L ${q3.x} ${q3.y} Z`,
  };
}

type WireframeFrameProps = WireframeFrameConfig;

function WireframeFrame({ id, ox, oy, strokeId, delay, floatDuration }: WireframeFrameProps) {
  const paths = buildWireframePaths(ox, oy);

  return (
    <g
      className={`projects-showcase-visual-frame projects-showcase-visual-frame-${id}`}
      style={
        {
          "--projects-visual-delay": `${delay}s`,
          "--projects-frame-float-duration": `${floatDuration}s`,
        } as CSSProperties
      }
    >
      <path d={paths.top} fill="url(#projects-visual-face-fill)" className="projects-showcase-visual-fill" />
      <path
        d={paths.outline}
        fill="none"
        stroke={`url(#${strokeId})`}
        strokeWidth="5"
        strokeLinejoin="round"
        opacity="0.32"
        className="projects-showcase-visual-draw projects-showcase-visual-draw-glow"
        filter="url(#projects-visual-glow-xl)"
      />
      <path
        d={paths.outline}
        fill="none"
        stroke={`url(#${strokeId})`}
        strokeWidth="2"
        strokeLinejoin="round"
        className="projects-showcase-visual-draw projects-showcase-visual-draw-main"
        filter="url(#projects-visual-glow-strong)"
      />
    </g>
  );
}

type FeaturedProjectsVisualProps = {
  isActive: boolean;
};

export function FeaturedProjectsVisual({ isActive }: FeaturedProjectsVisualProps) {
  const visualRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const visualEl = visualRef.current;
    if (!visualEl || !isActive) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function resetParallax(): void {
      visualEl?.style.setProperty("--visual-parallax-x", "0px");
      visualEl?.style.setProperty("--visual-parallax-y", "0px");
    }

    function handlePointerMove(event: MouseEvent): void {
      if (motionQuery.matches || window.innerWidth < 1024 || !visualEl) {
        return;
      }

      const rect = visualEl.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

      visualEl.style.setProperty("--visual-parallax-x", `${offsetX * PARALLAX_MAX_X_PX}px`);
      visualEl.style.setProperty("--visual-parallax-y", `${offsetY * PARALLAX_MAX_Y_PX}px`);
    }

    function handleMotionPreferenceChange(): void {
      if (motionQuery.matches) {
        resetParallax();
      }
    }

    visualEl.addEventListener("mousemove", handlePointerMove);
    visualEl.addEventListener("mouseleave", resetParallax);
    motionQuery.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      visualEl.removeEventListener("mousemove", handlePointerMove);
      visualEl.removeEventListener("mouseleave", resetParallax);
      motionQuery.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, [isActive]);

  return (
    <div
      ref={visualRef}
      className={`projects-showcase-visual ${isActive ? "projects-showcase-visual--active" : ""}`}
      aria-hidden="true"
    >
      <div className="projects-showcase-visual-ambient">
        <span className="projects-showcase-visual-glow projects-showcase-visual-glow-purple" />
        <span className="projects-showcase-visual-glow projects-showcase-visual-glow-cyan" />
        <span className="projects-showcase-visual-glow projects-showcase-visual-glow-center" />
        <span className="projects-showcase-visual-aurora" />
      </div>

      <div className="projects-showcase-visual-scene">
        <svg
          className="projects-showcase-visual-svg"
          viewBox={`0 0 ${VISUAL_VIEWBOX_WIDTH} ${VISUAL_VIEWBOX_HEIGHT}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="presentation"
        >
          <defs>
            <linearGradient id="projects-visual-face-fill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(188, 19, 254, 0.42)" />
              <stop offset="100%" stopColor="rgba(0, 242, 255, 0.22)" />
            </linearGradient>
            <linearGradient id="projects-visual-stroke-purple" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fce4ff" />
              <stop offset="40%" stopColor={NEON_PURPLE} />
              <stop offset="100%" stopColor={NEON_PINK} />
            </linearGradient>
            <linearGradient id="projects-visual-stroke-pink" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={NEON_PINK} />
              <stop offset="100%" stopColor="#7b5cff" />
            </linearGradient>
            <linearGradient id="projects-visual-stroke-blue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7b5cff" />
              <stop offset="100%" stopColor="#0070ff" />
            </linearGradient>
            <linearGradient id="projects-visual-stroke-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a8fbff" />
              <stop offset="50%" stopColor={NEON_CYAN} />
              <stop offset="100%" stopColor="#0070ff" />
            </linearGradient>
            <linearGradient id="projects-visual-grid-fade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 242, 255, 0.38)" />
              <stop offset="100%" stopColor="rgba(188, 19, 254, 0.1)" />
            </linearGradient>
            <linearGradient id="projects-visual-horizon" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 242, 255, 1)" />
              <stop offset="22%" stopColor="rgba(0, 209, 255, 0.65)" />
              <stop offset="100%" stopColor="rgba(188, 19, 254, 0.15)" />
            </linearGradient>
            <filter id="projects-visual-glow-strong" x="-70%" y="-70%" width="240%" height="240%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="projects-visual-glow-xl" x="-90%" y="-90%" width="280%" height="280%">
              <feGaussianBlur stdDeviation="11" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
              </feMerge>
            </filter>
          </defs>

          <g className="projects-showcase-visual-blueprint">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <line
                key={`bp-v-${index}`}
                x1={48 + index * 46}
                y1={228}
                x2={128 + index * 46}
                y2={396}
                stroke="url(#projects-visual-grid-fade)"
                strokeWidth="0.85"
              />
            ))}
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <line
                key={`bp-h-${index}`}
                x1={40}
                y1={244 + index * 26}
                x2={488}
                y2={244 + index * 26}
                stroke="url(#projects-visual-grid-fade)"
                strokeWidth="0.85"
              />
            ))}
          </g>

          <g className="projects-showcase-visual-pillars">
            <line x1="92" y1="308" x2="92" y2="128" stroke="rgba(188, 19, 254, 0.4)" strokeWidth="0.75" strokeDasharray="4 6" />
            <line x1="152" y1="248" x2="152" y2="88" stroke="rgba(0, 242, 255, 0.32)" strokeWidth="0.75" strokeDasharray="4 6" />
            <line x1="212" y1="188" x2="212" y2="68" stroke="rgba(224, 64, 251, 0.28)" strokeWidth="0.75" strokeDasharray="4 6" />
          </g>

          {WIREFRAME_FRAMES.map((frame) => (
            <WireframeFrame key={frame.id} {...frame} />
          ))}

          <g className="projects-showcase-visual-horizon">
            <line
              x1="20"
              y1="404"
              x2="500"
              y2="404"
              stroke="url(#projects-visual-horizon)"
              strokeWidth="1.75"
              className="projects-showcase-visual-draw projects-showcase-visual-horizon-line"
              style={{ "--projects-visual-delay": "0.92s" } as CSSProperties}
              filter="url(#projects-visual-glow-strong)"
            />
            <circle cx="48" cy="404" r="5" fill={NEON_CYAN} className="projects-showcase-visual-particle" />
            <circle cx="48" cy="404" r="2" fill="#ffffff" />
          </g>

          <g className="projects-showcase-visual-particles">
            {VISUAL_PARTICLES.map((particle, index) => (
              <circle
                key={`particle-${index}`}
                cx={particle.cx}
                cy={particle.cy}
                r={index % 2 === 0 ? 3.5 : 2.5}
                fill={particle.fill}
                className="projects-showcase-visual-particle"
                style={{ "--projects-particle-delay": `${particle.delay}s` } as CSSProperties}
              />
            ))}
            <path d="M448 62 L498 82" stroke="rgba(188, 19, 254, 0.55)" strokeWidth="1" strokeDasharray="4 6" className="projects-showcase-visual-spark-line" />
            <path d="M52 334 L8 354" stroke="rgba(0, 242, 255, 0.48)" strokeWidth="1" strokeDasharray="4 6" className="projects-showcase-visual-spark-line projects-showcase-visual-spark-line-delayed" />
          </g>
        </svg>
      </div>
    </div>
  );
}
