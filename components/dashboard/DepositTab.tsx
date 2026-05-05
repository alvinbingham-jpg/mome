"use client";

import { QRCodeSVG } from "qrcode.react";
import { AddressBlock } from "@/components/dashboard/AddressBlock";
import { formatUSD } from "@/lib/utils";
import { ShieldIcon } from "@/components/icons/Icons";
import type { MomeAppState } from "@/hooks/useMomeApp";

const SUPPORTED_CHAINS = [
  { name: "Ethereum", color: "#627EEA" },
  { name: "Base", color: "#0052FF" },
  { name: "Arbitrum", color: "#28A0F0" },
  { name: "Optimism", color: "#FF0420" },
  { name: "Polygon", color: "#8247E5" },
  { name: "Solana", color: "#14F195" },
  { name: "BNB Chain", color: "#F0B90B" },
];

export function DepositTab({ state }: { state: MomeAppState }) {
  const evmAddr = state.evmUaAddress ?? state.ownerAddress ?? "";
  const solAddr = state.solanaUaAddress ?? "";

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-mome-forest">
          {state.quiet ? "Add money" : "Deposit"}
        </h1>
        <p className="text-[13px] text-mome-forest/65">
          {state.quiet
            ? "Send any USD-pegged asset from any account. We bring it home."
            : "Send USDC, USDT, ETH, or SOL from any chain. Universal Accounts unify the balance automatically."}
        </p>
      </header>

      <section className="rounded-[24px] bg-mome-white border border-mome-forest/8 p-5 grain">
        <div className="flex flex-col items-center text-center">
          <div className="bg-mome-cream rounded-2xl p-3 border border-mome-forest/10">
            <QRCodeSVG
              value={evmAddr || "0x"}
              size={148}
              bgColor="transparent"
              fgColor="#16433D"
              level="M"
              marginSize={0}
            />
          </div>
          <p className="mt-3 text-[11px] uppercase tracking-[0.16em] font-semibold text-mome-forest/60">
            {state.quiet ? "Your address" : "Universal Account · EVM"}
          </p>
        </div>

        <div className="mt-3 space-y-2">
          <AddressBlock
            label={state.quiet ? "Receive on any chain" : "EVM address"}
            value={evmAddr}
          />
          {solAddr && !state.quiet && (
            <AddressBlock label="Solana address" value={solAddr} />
          )}
        </div>
      </section>

      <section className="rounded-[20px] bg-mome-cream-warm/70 border border-mome-forest/8 p-4">
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-9 h-9 rounded-full bg-mome-forest text-mome-mint grid place-items-center">
            <ShieldIcon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-mome-forest">
              Send from any chain
            </p>
            <p className="text-[12px] text-mome-forest/65 leading-snug mt-0.5">
              {state.quiet
                ? "We figure out the route. You don't pick a chain."
                : "Universal Accounts route on first arrival. No bridging required from your side."}
            </p>
          </div>
        </div>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {SUPPORTED_CHAINS.map((c) => (
            <li
              key={c.name}
              className="inline-flex items-center gap-1.5 rounded-pill bg-mome-white border border-mome-forest/10 px-2.5 py-1 text-[11px] text-mome-forest font-medium"
            >
              <span
                className="size-2 rounded-full"
                style={{ background: c.color }}
                aria-hidden
              />
              {c.name}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-[15px] font-semibold tracking-tight text-mome-forest">
          {state.quiet ? "What's already here" : "Per-chain balance"}
        </h2>
        <div className="rounded-[20px] bg-mome-white border border-mome-forest/8 divide-y divide-mome-forest/5 overflow-hidden">
          {state.assets.length === 0 && (
            <div className="px-4 py-6 text-[13px] text-mome-forest/55">
              No funds yet — send any token to the address above.
            </div>
          )}
          {state.assets.map((a) => (
            <div
              key={`${a.chainId}-${a.symbol}-${a.tokenAddress}`}
              className="px-4 py-3 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-mome-forest tracking-tight">
                  {state.quiet ? "USD-pegged" : `${a.amount.toLocaleString(undefined, {
                    maximumFractionDigits: 4,
                  })} ${a.symbol}`}
                </p>
                <p className="text-[12px] text-mome-forest/55">
                  {state.quiet ? "Held safely" : `on ${a.chainName}`}
                </p>
              </div>
              <p className="font-display tabular text-[14px] font-semibold text-mome-forest shrink-0">
                {formatUSD(a.amountInUSD)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
