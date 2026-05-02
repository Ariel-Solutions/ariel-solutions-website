const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60_000;

export function ratelimit(ip: string): { success: boolean } {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return { success: true };
  }

  if (entry.count >= RATE_LIMIT) return { success: false };

  entry.count++;
  return { success: true };
}