import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUSD(value: number, opts?: { compact?: boolean }) {
  if (opts?.compact && value >= 1000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(value);
}

export function shortAddress(
  address?: string | null,
  prefix: number = 6,
  suffix: number = 4
) {
  if (!address) return "";
  return `${address.slice(0, prefix)}…${address.slice(-suffix)}`;
}

export function relativeTime(iso: string) {
  const then = new Date(iso).getTime();
  const diff = Math.max(0, Date.now() - then);
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  const wk = Math.floor(day / 7);
  if (wk < 4) return `${wk}w ago`;
  const mo = Math.floor(day / 30);
  return `${mo}mo ago`;
}

/**
 * Monzo-style day bucket label for transaction lists.
 *
 * Returns "Today" / "Yesterday" / weekday name (this week) /
 * absolute date (older). The bucket key (YYYY-MM-DD in local time) is
 * the input.
 */
export function dayBucketLabel(bucketKey: string, now = new Date()) {
  const [y, m, d] = bucketKey.split("-").map(Number);
  const target = new Date(y, (m ?? 1) - 1, d ?? 1);

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const oneDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.round((startOfToday.getTime() - target.getTime()) / oneDay);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays > 1 && diffDays < 7) {
    return target.toLocaleDateString("en-US", { weekday: "long" });
  }
  if (target.getFullYear() === now.getFullYear()) {
    return target.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });
  }
  return target.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Group an iterable of items by their local-date bucket. Returns an
 * ordered array of [bucketKey, items[]] tuples, newest first.
 */
export function groupByDay<T>(
  items: T[],
  getDate: (t: T) => string
): Array<{ key: string; items: T[] }> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const d = new Date(getDate(item));
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const arr = map.get(key);
    if (arr) arr.push(item);
    else map.set(key, [item]);
  }
  return Array.from(map.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([key, items]) => ({ key, items }));
}
