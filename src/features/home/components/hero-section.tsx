import { HERO_DESCRIPTION, HERO_TITLE } from '@/features/home/constants/content';
import { HERO_VISUAL_ALT } from '@/shared/constants/brand';
import {
  HERO_CONTENT_WRAPPER_CLASS,
  HERO_COPY_COLUMN_CLASS,
  HERO_DESCRIPTION_TEXT_CLASS,
  HERO_SECTION_CLASS,
  HERO_TITLE_TEXT_CLASS,
} from '@/shared/constants/layout';

export function HeroSection() {
  return (
    <section
      id="hero"
      className={HERO_SECTION_CLASS}
      aria-label={HERO_VISUAL_ALT}
      aria-labelledby="hero-title"
    >
      <div className={HERO_CONTENT_WRAPPER_CLASS}>
        <div className={HERO_COPY_COLUMN_CLASS}>
          <h1 id="hero-title" className={HERO_TITLE_TEXT_CLASS}>
            {HERO_TITLE}
          </h1>
          <p className={HERO_DESCRIPTION_TEXT_CLASS}>{HERO_DESCRIPTION}</p>
        </div>
      </div>
    </section>
  );
}
