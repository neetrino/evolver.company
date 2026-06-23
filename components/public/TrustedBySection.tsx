"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { ClientLogoTile } from "@/components/public/ClientLogoTile";
import { Container } from "@/components/shared/Container";
import {
  buildMarqueeLogoSequence,
  getClientLogoMarqueeRows,
  getTrustedBySectionContent,
  resolveMarqueeGroupRepeats,
  TRUSTED_BY_DESKTOP_MARQUEE_ROWS,
  TRUSTED_BY_MARQUEE_DURATION_S,
  TRUSTED_BY_MARQUEE_MIN_GROUP_REPEATS,
  TRUSTED_BY_MARQUEE_MOBILE_BREAKPOINT_PX,
  TRUSTED_BY_MARQUEE_TRACK_COPIES,
  TRUSTED_BY_MOBILE_MARQUEE_ROWS,
  type ClientLogo,
} from "@/lib/clients-section";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";
import type { Locale } from "@/lib/i18n";

const TRUSTED_BY_ENTER_BASE_DELAY_S = 0.08;
const TRUSTED_BY_ENTER_STEP_DELAY_S = 0.045;
const TRUSTED_BY_VIEW_THRESHOLD = 0.12;

type TrustedBySectionProps = {
  locale: Locale;
};

type TrustedByMarqueeDirection = "left" | "right";

type TrustedByMarqueeRowProps = {
  clients: ClientLogo[];
  direction: TrustedByMarqueeDirection;
  durationSeconds: number;
  groupRepeats: number;
};

function trustedByDelayStyle(delaySeconds: number): CSSProperties {
  return { "--trusted-by-delay": `${delaySeconds}s` } as CSSProperties;
}

function trustedByMarqueeDurationStyle(durationSeconds: number): CSSProperties {
  return { "--trusted-by-marquee-duration": `${durationSeconds}s` } as CSSProperties;
}

function resolveMarqueeRowCount(viewportWidth: number): number {
  return viewportWidth <= TRUSTED_BY_MARQUEE_MOBILE_BREAKPOINT_PX
    ? TRUSTED_BY_MOBILE_MARQUEE_ROWS
    : TRUSTED_BY_DESKTOP_MARQUEE_ROWS;
}

function useTrustedByMarqueeRows(): ClientLogo[][] {
  const [marqueeRows, setMarqueeRows] = useState(() =>
    getClientLogoMarqueeRows(TRUSTED_BY_DESKTOP_MARQUEE_ROWS),
  );

  useEffect(() => {
    function syncMarqueeRows(): void {
      setMarqueeRows(getClientLogoMarqueeRows(resolveMarqueeRowCount(window.innerWidth)));
    }

    syncMarqueeRows();
    window.addEventListener("resize", syncMarqueeRows);

    return () => {
      window.removeEventListener("resize", syncMarqueeRows);
    };
  }, []);

  return marqueeRows;
}

function useMarqueeGroupRepeats(clientCount: number): number {
  const [groupRepeats, setGroupRepeats] = useState(() => {
    if (typeof window === "undefined") {
      return TRUSTED_BY_MARQUEE_MIN_GROUP_REPEATS;
    }

    return resolveMarqueeGroupRepeats(clientCount, window.innerWidth);
  });

  useEffect(() => {
    function syncGroupRepeats(): void {
      setGroupRepeats(resolveMarqueeGroupRepeats(clientCount, window.innerWidth));
    }

    syncGroupRepeats();
    window.addEventListener("resize", syncGroupRepeats);

    return () => {
      window.removeEventListener("resize", syncGroupRepeats);
    };
  }, [clientCount]);

  return groupRepeats;
}

function TrustedByMarqueeRow({ clients, direction, durationSeconds, groupRepeats }: TrustedByMarqueeRowProps) {
  const sequence = buildMarqueeLogoSequence(clients, groupRepeats);

  return (
    <div className={`trusted-by-marquee-row trusted-by-marquee-row--${direction}`}>
      <div className="trusted-by-marquee-track" style={trustedByMarqueeDurationStyle(durationSeconds)}>
        {Array.from({ length: TRUSTED_BY_MARQUEE_TRACK_COPIES }, (_, copyIndex) => (
          <div
            key={`trusted-by-marquee-copy-${copyIndex}`}
            className="trusted-by-marquee-group"
            aria-hidden={copyIndex > 0 ? true : undefined}
          >
            {sequence.map((item) => (
              <div key={`${copyIndex}-${item.key}`} className="trusted-by-marquee-item">
                <ClientLogoTile client={item.client} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TrustedByMarqueeRowWithRepeats({
  clients,
  direction,
  durationSeconds,
}: Omit<TrustedByMarqueeRowProps, "groupRepeats">) {
  const groupRepeats = useMarqueeGroupRepeats(clients.length);

  return (
    <TrustedByMarqueeRow
      clients={clients}
      direction={direction}
      durationSeconds={durationSeconds}
      groupRepeats={groupRepeats}
    />
  );
}

export function TrustedBySection({ locale }: TrustedBySectionProps) {
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: TRUSTED_BY_VIEW_THRESHOLD,
    rootMargin: "0px 0px -4% 0px",
  });
  const content = getTrustedBySectionContent(locale);
  const marqueeRows = useTrustedByMarqueeRows();

  return (
    <section
      ref={sectionRef}
      className={`trusted-by-section ${isVisible ? "trusted-by-section--visible" : ""}`}
      aria-labelledby="trusted-by-heading"
    >
      <div className="trusted-by-backdrop" aria-hidden="true">
        <span className="trusted-by-glow trusted-by-glow-purple" />
        <span className="trusted-by-glow trusted-by-glow-cyan" />
        <span className="trusted-by-floor-grid" />
        <span className="trusted-by-horizon" />
      </div>

      <Container className="trusted-by-container">
        <header
          className="trusted-by-header trusted-by-animate"
          style={trustedByDelayStyle(TRUSTED_BY_ENTER_BASE_DELAY_S)}
        >
          <span className="trusted-by-header-line trusted-by-header-line-left" aria-hidden="true">
            <span className="trusted-by-header-line-track" />
            <span className="trusted-by-header-line-beam" />
            <span className="trusted-by-header-dot trusted-by-header-dot-purple">
              <span className="trusted-by-header-dot-core" />
              <span className="trusted-by-header-dot-ring" />
            </span>
          </span>

          <h2 id="trusted-by-heading" className="trusted-by-title">
            <span className="trusted-by-title-text">{content.title}</span>
            <span className="trusted-by-title-glow" aria-hidden="true" />
          </h2>

          <span className="trusted-by-header-line trusted-by-header-line-right" aria-hidden="true">
            <span className="trusted-by-header-line-track" />
            <span className="trusted-by-header-line-beam" />
            <span className="trusted-by-header-dot trusted-by-header-dot-cyan">
              <span className="trusted-by-header-dot-core" />
              <span className="trusted-by-header-dot-ring" />
            </span>
          </span>
        </header>
      </Container>

      <div
        className="trusted-by-marquee trusted-by-animate"
        style={trustedByDelayStyle(TRUSTED_BY_ENTER_BASE_DELAY_S + TRUSTED_BY_ENTER_STEP_DELAY_S)}
      >
        {marqueeRows.map((rowClients, rowIndex) => (
          <TrustedByMarqueeRowWithRepeats
            key={`trusted-by-marquee-row-${rowIndex}`}
            clients={rowClients}
            direction={rowIndex % 2 === 0 ? "left" : "right"}
            durationSeconds={TRUSTED_BY_MARQUEE_DURATION_S + rowIndex * 4}
          />
        ))}
      </div>
    </section>
  );
}
