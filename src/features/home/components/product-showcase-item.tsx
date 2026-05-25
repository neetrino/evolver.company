import Image from 'next/image';
import Link from 'next/link';

import type { ProductShowcaseItem } from '@/features/home/constants/content';
import { PRODUCT_LOGO_INTRINSIC_SIZE } from '@/shared/constants/brand';
import {
  PRODUCT_SHOWCASE_BLOCK_WIDTH_CLASS,
  PRODUCT_SHOWCASE_TAGLINE_CLASS,
} from '@/shared/constants/layout';
type ProductShowcaseItemProps = {
  item: ProductShowcaseItem;
};

export function ProductShowcaseItemBlock({ item }: ProductShowcaseItemProps) {
  const isExternal = item.href.startsWith('http');

  return (
    <article className={PRODUCT_SHOWCASE_BLOCK_WIDTH_CLASS}>
      <Link
        href={item.href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b10]"
        aria-label={item.name}
      >
        <Image
          src={item.logoSrc}
          alt=""
          width={PRODUCT_LOGO_INTRINSIC_SIZE}
          height={PRODUCT_LOGO_INTRINSIC_SIZE}
          className="h-auto w-full"
        />
      </Link>
      <p className={PRODUCT_SHOWCASE_TAGLINE_CLASS}>{item.tagline}</p>
    </article>
  );
}
