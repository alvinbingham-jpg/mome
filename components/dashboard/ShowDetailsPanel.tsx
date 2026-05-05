"use client";

import { MOODS, type MoodId } from "@/lib/moods";
import { shortAddress, cn, formatUSD } from "@/lib/utils";
import type { IAssetsResponse } from "@particle-network/universal-account-sdk";

/**
 * Show Details — counterpoint to Quiet Mode.
 *
 * Reveals the real per-chain asset breakdown, the mood's underlying
 * protocols, and any addresses associated with the user's Universal Account.
 * This is what we show to power users and what we'd expose to a regulator.
 */
export function ShowDetailsPanel({
  open,
  mood,
  balance,
  ownerAddress,
  evmUaAddress,
  solanaUaAddress,
  lastTxHash,
}: {
  open: boolean;
  mood: MoodId;
  balance: IAssetsResponse | null;
  ownerAddress?: string;
  evmUaAddress?: string;
  solanaUaAddress?: string;
  lastTxHash?: string | null;
}) {
  if (!open) return null;
  const moodMeta = MOODS[mood];
  const assets = balance?.assets ?? [];

  return (
    <div className="fade-in mt-6 rounded-card border border-mome-forest/10 bg-mome-white p-6 sm:p-8 space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wider text-mome-forest/55">
          Strategy disclosure
        </p>
        <h3 className="mt-1 font-display text-2xl tracking-tight text-mome-forest">
          {moodMeta.label} <span className="text-mome-forest/55">· {moodMeta.sublabel}</span>
        </h3>
        <p className="mt-2 text-sm text-mome-forest/70 leading-relaxed">
          {moodMeta.riskNote}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {moodMeta.protocols.map((p) => (
            <li
              key={p}
              className="text-xs px-2.5 py-1 rounded-pill bg-mome-cream-warm text-mome-forest/75"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider text-mome-forest/55">
          Assets across chains
        </p>
        <div className="mt-3 divide-y divide-mome-forest/8">
          {assets.length === 0 ? (
            <p className="text-sm text-mome-forest/55 italic">
              No assets yet. Fund your account to see the unified breakdown.
            </p>
          ) : (
            assets.slice(0, 6).map((asset, i) => (
              <Row
                key={`${asset.tokenType}-${i}`}
                left={asset.tokenType ?? "Asset"}
                right={formatUSD(Number(asset.amountInUSD ?? 0))}
              />
            ))
          )}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider text-mome-forest/55">
          Account
        </p>
        <div className="mt-3 grid sm:grid-cols-2 gap-3 text-sm">
          <KV label="Owner EOA" value={shortAddress(ownerAddress)} />
          <KV label="UA · EVM" value={shortAddress(evmUaAddress)} />
          <KV label="UA · Solana" value={shortAddress(solanaUaAddress)} />
          <KV
            label="Last Tx"
            value={lastTxHash ? shortAddress(lastTxHash) : "—"}
            link={
              lastTxHash
                ? `https://basescan.org/tx/${lastTxHash}`
                : undefined
            }
          />
        </div>
      </div>

      <p className="text-xs text-mome-forest/55 italic">
        Mome never custodies your funds. Yield originates from third-party
        protocols listed above; smart-contract risk is real.
      </p>
    </div>
  );
}

function Row({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex items-center justify-between py-2 text-sm">
      <span className="text-mome-forest/80">{left}</span>
      <span className="tabular text-mome-forest font-medium">{right}</span>
    </div>
  );
}

function KV({
  label,
  value,
  link,
}: {
  label: string;
  value: string;
  link?: string;
}) {
  const inner = (
    <span className={cn("tabular", link ? "underline" : "")}>{value || "—"}</span>
  );
  return (
    <div className="rounded-[12px] bg-mome-cream-warm/70 px-3 py-2.5">
      <p className="text-[11px] uppercase tracking-wide text-mome-forest/55">
        {label}
      </p>
      <p className="text-sm text-mome-forest mt-0.5">
        {link ? (
          <a href={link} target="_blank" rel="noreferrer noopener">
            {inner}
          </a>
        ) : (
          inner
        )}
      </p>
    </div>
  );
}
