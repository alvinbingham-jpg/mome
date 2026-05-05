"use client";

import { getChain, getToken } from "@/lib/logos";

/**
 * Renders a chain's official logo (or a tinted initial fallback).
 *
 * Pure <img> + width/height to keep SSR static and avoid the next/image
 * remote-pattern config dance. Files are local to the public/ folder.
 */
export function ChainLogo({
  name,
  size = 18,
  className = "",
}: {
  name: string | undefined | null;
  size?: number;
  className?: string;
}) {
  const chain = getChain(name);
  if (!chain) return <FallbackInitial label={name ?? "?"} size={size} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={chain.src}
      alt={chain.label}
      width={size}
      height={size}
      className={`rounded-full shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

export function TokenLogo({
  symbol,
  size = 18,
  className = "",
}: {
  symbol: string | undefined | null;
  size?: number;
  className?: string;
}) {
  const t = getToken(symbol);
  if (!t) return <FallbackInitial label={symbol ?? "?"} size={size} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={t.src}
      alt={t.label}
      width={size}
      height={size}
      className={`rounded-full shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

function FallbackInitial({ label, size }: { label: string; size: number }) {
  return (
    <span
      className="rounded-full bg-mome-forest/10 text-mome-forest grid place-items-center font-semibold uppercase shrink-0"
      style={{ width: size, height: size, fontSize: Math.max(8, size * 0.42) }}
    >
      {label.slice(0, 1)}
    </span>
  );
}
