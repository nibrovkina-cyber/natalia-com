/**
 * Distributed rate-limit для serverless.
 *
 * In-memory Map не работает на Vercel — каждая cold-start = новая instance =
 * счётчик сбрасывается. Эффективный rate-limit = бесконечность, бюджет API
 * сливается. Это критично для cost-amplification защиты.
 *
 * Решение — Vercel KV (Redis-backed, distributed). Если KV доступен — используем,
 * иначе фолбэк на in-memory (для dev и unconfigured environments).
 *
 * Provisioning Vercel KV (один раз):
 *   1. Vercel Dashboard → Project → Storage → Create → KV
 *   2. KV_REST_API_URL и KV_REST_API_TOKEN добавляются в env vars автоматически
 *   3. Redeploy
 *
 * Без KV (dev/free) — in-memory работает, но rate-limit reset на cold start.
 */

import { kv } from "@vercel/kv";

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

type RateResult = { ok: boolean; remaining: number; resetIn: number };

const memoryStore = new Map<string, { count: number; resetAt: number }>();

/**
 * Проверка лимита по ключу (например, IP). Атомарный INCR в KV — без race condition.
 *
 * @param key уникальный идентификатор (обычно IP)
 * @param limit максимум вызовов в окне
 * @param windowSeconds длина окна в секундах (например 86400 = сутки)
 */
export async function checkLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<RateResult> {
  const now = Math.floor(Date.now() / 1000);
  const windowKey = `rl:${key}:${Math.floor(now / windowSeconds)}`;

  if (KV_AVAILABLE) {
    try {
      const count = await kv.incr(windowKey);
      if (count === 1) {
        // первый вызов в окне — устанавливаем TTL чтобы запись не висела вечно
        await kv.expire(windowKey, windowSeconds);
      }
      const remaining = Math.max(0, limit - count);
      return {
        ok: count <= limit,
        remaining,
        resetIn: windowSeconds - (now % windowSeconds),
      };
    } catch (e) {
      // KV upstream выпал — фолбэкнем на memory чтобы не сломать продукт
      console.error("[rate-limit] KV error, falling back to memory:", e);
    }
  }

  // In-memory fallback (для dev и при KV failure)
  const entry = memoryStore.get(windowKey);
  if (!entry || entry.resetAt < Date.now()) {
    memoryStore.set(windowKey, { count: 1, resetAt: Date.now() + windowSeconds * 1000 });
    return { ok: true, remaining: limit - 1, resetIn: windowSeconds };
  }
  entry.count += 1;
  const remaining = Math.max(0, limit - entry.count);
  return {
    ok: entry.count <= limit,
    remaining,
    resetIn: Math.floor((entry.resetAt - Date.now()) / 1000),
  };
}
