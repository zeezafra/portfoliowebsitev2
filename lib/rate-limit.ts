// Basic in-memory IP + timestamp rate limit, per the roadmap's "simple
// IP+timestamp check in the API route" option. The Map lives in module
// scope, so it persists across requests within one running server
// process (`next dev`, `next start`, and Vercel's dev server). On a
// serverless deploy with multiple concurrent instances this resets
// per-instance rather than being globally accurate — fine as a basic
// spam brake, not a hard guarantee. If Zee wants a stronger guarantee
// later, swap this for Vercel KV/Edge Config or a dedicated rate-limit
// service — the roadmap explicitly allows either approach.

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 3;

const hits = new Map<string, number[]>();

export function checkRateLimit(key: string): {
  allowed: boolean;
  retryAfterSeconds?: number;
} {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(key, timestamps);
    const oldest = timestamps[0];
    const retryAfterSeconds = Math.ceil((WINDOW_MS - (now - oldest)) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return { allowed: true };
}
