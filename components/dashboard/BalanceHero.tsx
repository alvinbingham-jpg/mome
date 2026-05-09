"use client";

import { useEffect, useState } from "react";
import { MOODS, type MoodId } from "@/lib/moods";
import { SparkleIcon } from "@/components/icons/Icons";

/**
 * Mobile-first hero balance.
 *
 * Designed to feel like a real banking-app hero:
 *  - Forest card with a soft animated aurora glow behind the corner
 *  - Tabular display number, dollar sign separated from the integer for
 *    weight balance, last two digits dimmed into the cents (so the eye
 *    lands on whole dollars first)
 *  - When earning, the cents tick lights up live, with a pulsing dot
 *  - Quiet/Detail aware copy in the eyebrow + subtitle
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

  // Split into dollars & cents so we can render them at different weights.
  const wholeStr = Math.floor(display).toLocaleString("en-US");
  const centsStr = (Math.round((display - Math.floor(display)) * 100) || 0)
    .toString()
    .padStart(2, "0");

  return (
    <section className="relative overflow-hidden rounded-[28px] bg-mome-forest text-mome-cream px-6 pt-6 pb-7 grain shadow-[0_20px_50px_-20px_rgba(22,67,61,0.55)]">
      {/* corner aurora glow */}
      <div
        aria-hidden
        className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-50 aurora blur-3xl pointer-events-none"
      />
      {/* subtle vertical gradient overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.18) 100%)",
        }}
      />

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

      <p className="font-display font-semibold tabular mt-3 leading-[0.98]">
        <span
          className="text-mome-mint/80 align-top mr-0.5"
          style={{ fontSize: "26px", lineHeight: "1" }}
        >
          $
        </span>
        <span
          className="text-mome-cream tracking-[-0.04em]"
          style={{ fontSize: "56px" }}
        >
          {wholeStr}
        </span>
        <span
          className="text-mome-cream/55 tracking-[-0.04em] ml-0.5"
          style={{ fontSize: "28px" }}
        >
          .{centsStr}
        </span>
      </p>

      <p className="mt-2 text-mome-cream/70 italic text-[13.5px] leading-snug max-w-[28ch] relative">
        {!earning
          ? "Your money is ready to wake up."
          : quiet
          ? "Quietly compounding."
          : `Routed via ${MOODS[mood].protocols[0]}.`}
      </p>

      {!quiet && (
        <div className="mt-4 inline-flex items-center gap-2 text-[11px] text-mome-cream/60 fade-in relative">
          <span>Across {chainCount} chains</span>
          <span aria-hidden>·</span>
          <span>One balance</span>
        </div>
      )}
    </section>
  );
}
