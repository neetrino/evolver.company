import { Fragment } from "react";
import { ServiceDetailBridge } from "@/components/public/ServiceDetailBridge";
import { ServiceDetailSection } from "@/components/public/ServiceDetailSection";
import type { ServicesDetailContent } from "@/lib/services-detail";

type ServicesDetailSectionsProps = {
  content: ServicesDetailContent;
};

export function ServicesDetailSections({ content }: ServicesDetailSectionsProps) {
  return (
    <div className="services-detail-stack">
      <div className="services-detail-stack-intro" aria-hidden="true">
        <span className="services-detail-stack-intro-line" />
        <span className="services-detail-stack-intro-glow" />
      </div>

      {content.blocks.map((block, index) => (
        <Fragment key={block.id}>
          {index > 0 ? (
            <ServiceDetailBridge
              fromAccent={content.blocks[index - 1].accent}
              toAccent={block.accent}
              stepLabel={String(index + 1).padStart(2, "0")}
            />
          ) : null}
          <ServiceDetailSection block={block} index={index} />
        </Fragment>
      ))}

      <div className="services-detail-stack-outro" aria-hidden="true">
        <span className="services-detail-stack-outro-aurora services-detail-stack-outro-aurora-purple" />
        <span className="services-detail-stack-outro-aurora services-detail-stack-outro-aurora-cyan" />
        <span className="services-detail-stack-outro-grid" />
        <span className="services-detail-stack-outro-line" />
        <span className="services-detail-stack-outro-beam" />
        <span className="services-detail-stack-outro-fade" />
      </div>
    </div>
  );
}
