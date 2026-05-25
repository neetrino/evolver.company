import {
  PRODUCT_SHOWCASE_COLUMN_LEFT,
  PRODUCT_SHOWCASE_COLUMN_RIGHT,
  WHAT_WE_DO_HEADLINE_LINES,
  WHAT_WE_DO_SUBTITLE,
} from '@/features/home/constants/content';
import { ProductShowcaseItemBlock } from '@/features/home/components/product-showcase-item';
import {
  WHAT_WE_DO_GRID_CLASS,
  WHAT_WE_DO_HEADLINE_CLASS,
  WHAT_WE_DO_INTRO_COL_CLASS,
  WHAT_WE_DO_PRODUCT_COL_CLASS,
  WHAT_WE_DO_PRODUCTS_ROW_CLASS,
  WHAT_WE_DO_SUBTITLE_CLASS,
} from '@/shared/constants/layout';

import { SectionShell } from './section-shell';

export function WhatWeDoSection() {
  return (
    <SectionShell id="services">
      <div className={WHAT_WE_DO_GRID_CLASS}>
        <div className={WHAT_WE_DO_INTRO_COL_CLASS}>
          <p className={WHAT_WE_DO_SUBTITLE_CLASS}>{WHAT_WE_DO_SUBTITLE}</p>
          <h2 className={WHAT_WE_DO_HEADLINE_CLASS}>
            {WHAT_WE_DO_HEADLINE_LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>

        <div className={WHAT_WE_DO_PRODUCTS_ROW_CLASS}>
          <div className={WHAT_WE_DO_PRODUCT_COL_CLASS}>
            {PRODUCT_SHOWCASE_COLUMN_LEFT.map((item) => (
              <ProductShowcaseItemBlock key={item.name} item={item} />
            ))}
          </div>
          <div className={WHAT_WE_DO_PRODUCT_COL_CLASS}>
            {PRODUCT_SHOWCASE_COLUMN_RIGHT.map((item) => (
              <ProductShowcaseItemBlock key={item.name} item={item} />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
