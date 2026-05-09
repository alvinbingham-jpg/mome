"use client";

import { useEffect, useState } from "react";
import { MOODS, type MoodId } from "@/lib/moods";
import { formatUSD, cn } from "@/lib/utils";

/**
 * The balance card is the visual centre of Mome.
 *
 * In Quiet Mode it is one number, one mood, one whispered reassurance.
 * When earning is active, the number ticks up at the mood's APY hint —
 * a smooth simulation that mirrors how on-chain interest compounds in
 * reality. The actual balance comes from UniversalAccount.getPrimaryAssets;
 * the per-second drift is purely a perceptual layer.
 */
export function BalanceCard({
  baseUSD,
  mood,
  earning,
  quiet,
}: {
  baseUSD: number;
  mood: MoodId;
  earning: boolean;
  quiet: boolean;
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

  return (
    <div className="rounded-card bg-mome-forest text-mome-cream p-8 sm:p-10 grain relative overflow-hidden">
      <div className="flex items-center justify-between">
        <p className="text-sm uppercase tracking-wider text-mome-mint">
          {quiet ? "Your balance" : "Unified balance · USD"}
        </p>
        {earning && (
          <span className="inline-flex items-center gap-2 text-xs text-mome-mint">
            <span className="size-1.5 rounded-full bg-mome-mint pulse-dot" />
            {quiet ? "Quietly compounding" : `Earning ~${apy}% APY`}
          </span>
        )}
      </div>

      <p className="font-display font-semibold tracking-[-0.04em] text-mome-cream tabular text-6xl sm:text-7xl lg:text-8xl mt-4">
        {formatUSD(display)}
      </p>

      <p className={cn(
        "mt-3 text-mome-cream/70 italic",
        earning ? "fade-in" : ""
      )}>
        {!earning
          ? "Your money is ready to wake up."
          : quiet
          ? "Quietly compounding."
          : `Routed via ${MOODS[mood].protocols[0]}.`}
      </p>
    </div>
  );
}
