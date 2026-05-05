"use client";

import { useEffect, useState } from "react";
import { MOODS, type MoodId } from "@/lib/moods";
import { formatUSD } from "@/lib/utils";
import { SparkleIcon } from "@/components/icons/Icons";

/**
 * Mobile-first hero balance.
 *
 * Big tabular number on cream, mood pill below, live "compounding" indicator
 * when earning. Per-second drift is purely perceptual — the underlying
 * balance still comes from the UA SDK.
 */
export function BalanceHero({
  baseUSD,
  mood,
  earning,
  quiet,
  chainCount,
}: {
  baseUSD: number;
  mood: MoodId;
  earning: boolean;
  quiet: boolean;
  chainCount: number;
}) {
  const apy = MOODS[mood].apyHint;
  const [drift, setDrift] = useState(0);

  useEffect(() => {
    if (!earning) return;
    const start = Date.now();
    const id = setInterval(() => {
      const elapsedSec = (Date.now() - start) / 1000;
      const yearly = baseUSD * (apy / 100);
      setDrift((yearly / (365 * 24 * 60 * 60)) * elapsedSec);
    }, 60);
    return () => clearInterval(id);
  }, [earning, baseUSD, apy]);

  const display = earning ? baseUSD + drift : baseUSD;

  // Show fewer decimals when not earning so the eye lands on the dollar value;
  // when earning, the cents tick gives the magic.
  const formatted = earning
    ? formatUSD(display)
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(display);

  return (
    <section className="relative overflow-hidden rounded-[28px] bg-mome-forest text-mome-cream p-6 pb-7 grain">
      <div className="absolute -top-16 -right-12 w-48 h-48 rounded-full opacity-50 aurora blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between relative">
        <p className="text-[11px] uppercase tracking-[0.16em] text-mome-mint/90 font-semibold">
          {quiet ? "Your money" : "Unified balance · USD"}
        </p>
        {earning ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] text-mome-mint font-semibold">
            <span className="size-1.5 rounded-full bg-mome-mint pulse-dot" />
            {quiet ? "Earning" : `~${apy}% APY`}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] text-mome-cream/60 font-medium">
            <SparkleIcon className="w-3.5 h-3.5" /> Ready
          </span>
        )}
      </div>

      <p className="font-display font-semibold tracking-[-0.04em] tabular text-[56px] leading-[1.02] mt-3 break-all">
        {formatted}
      </p>

      <p className="mt-2 text-mome-cream/70 italic text-sm leading-snug max-w-[28ch]">
        {!earning
          ? "Your money is ready to wake up."
          : quiet
          ? "Quietly compounding."
          : `Routed via ${MOODS[mood].protocols[0]}.`}
      </p>

      {!quiet && (
        <div className="mt-4 inline-flex items-center gap-2 text-[11px] text-mome-cream/60 fade-in">
          <span>Across {chainCount} chains</span>
          <span aria-hidden>·</span>
          <span>One balance</span>
        </div>
      )}
    </section>
  );
}
