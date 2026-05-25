import { describe, expect, it } from 'vitest';

import { cn } from '@/shared/lib/cn';

describe('cn', () => {
  it('merges conflicting tailwind classes', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });
});
