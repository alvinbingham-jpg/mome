"use client";

import { AddressBlock } from "@/components/dashboard/AddressBlock";
import { ChainLogo, TokenLogo } from "@/components/dashboard/ChainLogo";
import { MOODS } from "@/lib/moods";
import { formatUSD } from "@/lib/utils";
import type { MomeAppState } from "@/hooks/useMomeApp";

/**
 * Show Details — counterpoint to Quiet Mode.
 *
 * Reveals the real per-chain asset breakdown, the mood's underlying
 * protocols, and any addresses associated with the user's Universal Account.
 * This is what we show to power users and what we'd expose to a regulator.
 *
 * Designed to render inside a Sheet on mobile.
 */
export function ShowDetailsPanel({ state }: { state: MomeAppState }) {
  const moodMeta = MOODS[state.mood];

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] uppercase tracking-[0.14em] text-mome-forest/55 font-semibold">
          Strategy disclosure
        </p>
        <h3 className="mt-1 font-display text-xl tracking-tight text-mome-forest">
          {moodMeta.label}{" "}
          <span className="text-mome-forest/55">· {moodMeta.sublabel}</span>
        </h3>
        <p className="mt-1 text-[13px] text-mome-forest/70 leading-snug">
          {moodMeta.riskNote}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {moodMeta.protocols.map((p) => (
            <li
              key={p}
              className="text-[11px] px-2.5 py-1 rounded-pill bg-mome-cream-warm text-mome-forest/75 font-medium"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.14em] text-mome-forest/55 font-semibold">
          Assets across chains
        </p>
        <div className="mt-2 rounded-2xl bg-mome-cream-warm/70 divide-y divide-mome-forest/5 overflow-hidden">
          {state.assets.length === 0 ? (
            <p className="px-4 py-4 text-[13px] text-mome-forest/55 italic">
              No assets yet. Fund your account to see the unified breakdown.
            </p>
          ) : (
            state.assets.map((a, i) => (
              <div
                key={`${a.chainId}-${a.symbol}-${i}`}
                className="px-4 py-2.5 flex items-center gap-3 text-[13px]"
              >
                <div className="relative shrink-0">
                  <TokenLogo symbol={a.symbol} size={26} />
                  <span className="absolute -bottom-0.5 -right-0.5 ring-2 ring-mome-cream-warm rounded-full">
                    <ChainLogo name={a.chainName} size={12} />
                  </span>
                </div>
                <span className="text-mome-forest/80 flex-1 min-w-0 truncate">
                  <span className="font-semibold text-mome-forest">
                    {a.symbol}
                  </span>{" "}
                  on {a.chainName}
                </span>
                <span className="tabular text-mome-forest font-semibold shrink-0">
                  {formatUSD(a.amountInUSD)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.14em] text-mome-forest/55 font-semibold mb-2">
          Account
        </p>
        <div className="space-y-1.5">
          <AddressBlock label="Owner EOA" value={state.ownerAddress} />
          <AddressBlock label="Universal Account · EVM" value={state.evmUaAddress} />
          {state.solanaUaAddress && (
            <AddressBlock
              label="Universal Account · Solana"
              value={state.solanaUaAddress}
            />
          )}
        </div>
      </div>

      <p className="text-[11px] text-mome-forest/55 italic leading-snug">
        Mome never custodies your funds. Yield originates from third-party
        protocols listed above; smart-contract risk is real and disclosed per
        leg.
      </p>
    </div>
  );
}
