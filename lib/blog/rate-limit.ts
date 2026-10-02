import { API_RATE_LIMIT, API_RATE_WINDOW_MS } from "@/lib/blog/constants";

type RateBucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateBucket>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || now >= current.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + API_RATE_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > API_RATE_LIMIT;
}
