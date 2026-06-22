"use client";

import { type CSSProperties } from "react";
import { ClientLogoTile } from "@/components/public/ClientLogoTile";
import { Container } from "@/components/shared/Container";
import {
  getClientLogoRows,
  getTrustedBySectionContent,
  TRUSTED_BY_LOGOS_PER_ROW,
  TRUSTED_BY_ROW_ALIGNMENTS,
} from "@/lib/clients-section";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";
import type { Locale } from "@/lib/i18n";

const TRUSTED_BY_ENTER_BASE_DELAY_S = 0.08;
const TRUSTED_BY_ENTER_STEP_DELAY_S = 0.045;
const TRUSTED_BY_VIEW_THRESHOLD = 0.12;

type TrustedBySectionProps = {
  locale: Locale;
};

function trustedByDelayStyle(delaySeconds: number): CSSProperties {
  return { "--trusted-by-delay": `${delaySeconds}s` } as CSSProperties;
}

export function TrustedBySection({ locale }: TrustedBySectionProps) {
  const { isVisible, sectionRef } = useSectionReveal({
    threshold: TRUSTED_BY_VIEW_THRESHOLD,
    rootMargin: "0px 0px -4% 0px",
  });
  const content = getTrustedBySectionContent(locale);
  const clientRows = getClientLogoRows();

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
            <span className="trusted-by-header-dot trusted-by-header-dot-purple" />
          </span>

          <h2 id="trusted-by-heading" className="trusted-by-title">
            {content.title}
          </h2>

          <span className="trusted-by-header-line trusted-by-header-line-right" aria-hidden="true">
            <span className="trusted-by-header-dot trusted-by-header-dot-cyan" />
          </span>
        </header>

        <div className="trusted-by-rows">
          {clientRows.map((rowClients, rowIndex) => {
            const alignment = TRUSTED_BY_ROW_ALIGNMENTS[rowIndex] ?? "left";
            const rowOffset = rowIndex * TRUSTED_BY_LOGOS_PER_ROW;

            return (
              <div
                key={`trusted-by-row-${rowIndex}`}
                className={`trusted-by-row trusted-by-row--${alignment}`}
              >
                {rowClients.map((client, columnIndex) => (
                  <div
                    key={client.id}
                    className="trusted-by-grid-item trusted-by-animate"
                    style={trustedByDelayStyle(
                      TRUSTED_BY_ENTER_BASE_DELAY_S +
                        (rowOffset + columnIndex + 1) * TRUSTED_BY_ENTER_STEP_DELAY_S,
                    )}
                  >
                    <ClientLogoTile client={client} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
