"use client";

import { ChainLogo } from "@/components/dashboard/ChainLogo";

/**
 * Chain cluster sticker — overlapping chain logos in a cream pill.
 * Visualizes "your money, every chain" without saying the word "chain".
 */
export function ChainClusterSticker() {
  const chains = ["ethereum", "base", "arbitrum", "optimism", "polygon"];
  return (
    <div className="bg-mome-cream rounded-pill border-[3px] border-[#0e1116] px-3 py-2 inline-flex items-center gap-2">
      <div className="flex -space-x-2">
        {chains.map((c) => (
          <span
            key={c}
            className="ring-[2px] ring-mome-cream rounded-full grid place-items-center bg-white"
            style={{ width: 24, height: 24 }}
          >
            <ChainLogo name={c} size={20} />
          </span>
        ))}
      </div>
      <span className="text-[10px] font-black tracking-[0.08em] text-[#0e1116]">
        ANY CHAIN
      </span>
    </div>
  );
}
