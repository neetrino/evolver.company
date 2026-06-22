import type { CSSProperties } from "react";
import type { AboutSectionContent } from "@/lib/about-section";

const ABOUT_HEADLINE_BASE_DELAY_S = 0.22;
const ABOUT_HEADLINE_STEP_DELAY_S = 0.12;

type AboutHeadlineProps = {
  content: AboutSectionContent;
};

function headlineDelayStyle(index: number): CSSProperties {
  return {
    "--about-headline-delay": `${ABOUT_HEADLINE_BASE_DELAY_S + index * ABOUT_HEADLINE_STEP_DELAY_S}s`,
  } as CSSProperties;
}

export function AboutHeadline({ content }: AboutHeadlineProps) {
  return (
    <h2 id="about-section-heading" className="about-section-headline">
      {content.headline.map((line, index) => (
        <span
          key={line.text}
          className={[
            "about-section-headline-line",
            "about-section-headline-line-animate",
            line.gradient ? "about-section-headline-line--gradient" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={headlineDelayStyle(index)}
        >
          {line.text}
        </span>
      ))}
    </h2>
  );
}
