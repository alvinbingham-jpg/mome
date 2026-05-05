"use client";

import { Sheet } from "@/components/dashboard/Sheet";
import { ChainLogo } from "@/components/dashboard/ChainLogo";
import { AddressBlock } from "@/components/dashboard/AddressBlock";
import { Button } from "@/components/ui/Button";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CopyIcon,
  DepositIcon,
  ExternalIcon,
  ShieldIcon,
  SparkleIcon,
} from "@/components/icons/Icons";
import { formatUSD } from "@/lib/utils";
import { useMounted } from "@/hooks/useMounted";
import type { DemoTransaction } from "@/lib/demo-data";
import { useState } from "react";

const KIND_META: Record<
  DemoTransaction["kind"],
  {
    quietTitle: string;
    detailTitle: string;
    quietBlurb: string;
    detailBlurb: string;
    Icon: React.ComponentType<{ className?: string }>;
    tone: string;
  }
> = {
  earn: {
    quietTitle: "Started earning",
    detailTitle: "Began earning yield",
    quietBlurb: "Your money started working. Quietly.",
    detailBlurb: "USDC was routed to a yield protocol and is now earning.",
    Icon: SparkleIcon,
    tone: "bg-mome-mint/20 text-mome-mint-deep",
  },
  deposit: {
    quietTitle: "Money came home",
    detailTitle: "Deposit received",
    quietBlurb: "Funds arrived and were unified into your one balance.",
    detailBlurb:
      "An incoming transfer was unified by the Universal Account. No bridging required.",
    Icon: DepositIcon,
    tone: "bg-mome-aurora-2/30 text-mome-forest",
  },
  withdraw: {
    quietTitle: "Cashed out",
    detailTitle: "Withdrawal sent",
    quietBlurb: "We sent your funds to the destination you chose.",
    detailBlurb:
      "Funds were withdrawn from the active strategy and sent to the destination address.",
    Icon: ArrowRightIcon,
    tone: "bg-mome-aurora-3/40 text-mome-forest",
  },
  rebalance: {
    quietTitle: "Moved to a better spot",
    detailTitle: "Rebalanced strategy",
    quietBlurb: "Mome shifted your money to keep yield healthy.",
    detailBlurb:
      "The active strategy was rebalanced to a higher-yield pool while keeping the mood profile intact.",
    Icon: ArrowRightIcon,
    tone: "bg-mome-forest/10 text-mome-forest",
  },
};

function formatAbsoluteTime(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

/**
 * Bottom-sheet detail view for a single transaction.
 *
 * - Quiet/Detail aware copy (everything still readable in Quiet Mode).
 * - Chain-hop journey row uses real chain logos.
 * - Full tx hash with copy + explorer link.
 * - Demo mode marks the tx hash so it's clear no on-chain entity will resolve.
 */
export function TransactionDetailSheet({
  tx,
  open,
  quiet,
  demo,
  onClose,
}: {
  tx: DemoTransaction | null;
  open: boolean;
  quiet: boolean;
  demo: boolean;
  onClose: () => void;
}) {
  const mounted = useMounted();
  const [copied, setCopied] = useState(false);

  const meta = tx ? KIND_META[tx.kind] : null;
  const title = !meta ? "" : quiet ? meta.quietTitle : meta.detailTitle;
  const blurb = !meta ? "" : quiet ? meta.quietBlurb : meta.detailBlurb;

  async function handleCopy() {
    if (!tx) return;
    try {
      await navigator.clipboard.writeText(tx.txHash);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  if (!tx || !meta) {
    return (
      <Sheet open={open} onClose={onClose} title="">
        <div />
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onClose={onClose} title={title}>
      <div className="space-y-5">
        {/* Hero amount */}
        <section
          className={`rounded-[20px] p-5 grain relative overflow-hidden ${
            tx.kind === "earn" || tx.kind === "deposit"
              ? "bg-mome-forest text-mome-cream"
              : "bg-mome-cream-warm text-mome-forest border border-mome-forest/10"
          }`}
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-25 aurora blur-3xl pointer-events-none" />
          <div className="flex items-center gap-2">
            <span
              className={`shrink-0 w-9 h-9 rounded-full grid place-items-center ${meta.tone}`}
            >
              <meta.Icon className="w-[18px] h-[18px]" />
            </span>
            <p className="text-[11px] uppercase tracking-[0.16em] font-semibold opacity-70">
              {tx.kind === "earn" && "Earning"}
              {tx.kind === "deposit" && "Inbound"}
              {tx.kind === "withdraw" && "Outbound"}
              {tx.kind === "rebalance" && "Optimised"}
            </p>
          </div>
          <p className="font-display tabular text-[36px] leading-none font-semibold mt-3 tracking-tight">
            {formatUSD(tx.amountUSD)}
          </p>
          <p
            className={`text-[12.5px] mt-1.5 leading-snug ${
              tx.kind === "earn" || tx.kind === "deposit"
                ? "text-mome-cream/75"
                : "text-mome-forest/65"
            }`}
          >
            {blurb}
          </p>
        </section>

        {/* Chain journey */}
        <section className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-mome-forest/55">
            {quiet ? "Where it traveled" : "Chain route"}
          </p>
          <div className="rounded-[18px] bg-mome-white border border-mome-forest/8 p-4">
            {tx.chainHops.length <= 1 ? (
              <div className="flex items-center gap-3">
                <ChainLogo name={tx.chainHops[0]} size={32} />
                <div>
                  <p className="text-[13px] font-semibold text-mome-forest">
                    {quiet ? "Settled in one place" : tx.chainHops[0]}
                  </p>
                  <p className="text-[11.5px] text-mome-forest/55">
                    {quiet
                      ? "No bridging needed."
                      : "Native settlement. No bridging needed."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2">
                {tx.chainHops.map((hop, i) => (
                  <div
                    key={`${hop}-${i}`}
                    className="flex items-center gap-1.5 flex-1"
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <ChainLogo name={hop} size={28} />
                      <span className="text-[10.5px] font-semibold text-mome-forest tracking-tight whitespace-nowrap">
                        {quiet ? `Stop ${i + 1}` : hop}
                      </span>
                    </div>
                    {i < tx.chainHops.length - 1 && (
                      <ArrowRightIcon className="w-4 h-4 text-mome-forest/30 mb-4" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Status + when */}
        <section className="grid grid-cols-2 gap-2">
          <div className="rounded-[16px] bg-mome-white border border-mome-forest/8 px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-mome-forest/50">
              Status
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              {tx.status === "completed" ? (
                <>
                  <CheckCircleIcon className="w-4 h-4 text-mome-mint-deep" />
                  <span className="text-[13px] font-semibold text-mome-forest">
                    Confirmed
                  </span>
                </>
              ) : (
                <>
                  <span className="size-2 rounded-full bg-mome-aurora-3 pulse-dot" />
                  <span className="text-[13px] font-semibold text-mome-forest">
                    Pending
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="rounded-[16px] bg-mome-white border border-mome-forest/8 px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-mome-forest/50">
              When
            </p>
            <p className="text-[13px] font-semibold text-mome-forest mt-1">
              {mounted ? formatAbsoluteTime(tx.whenISO) : "—"}
            </p>
          </div>
        </section>

        {/* Tx hash */}
        {!quiet && (
          <section className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-mome-forest/55">
              Transaction
            </p>
            <div className="rounded-[16px] bg-mome-white border border-mome-forest/8 px-3.5 py-3 space-y-1.5">
              <p className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-mome-forest/50">
                Hash
              </p>
              <p className="font-mono text-[11.5px] text-mome-forest break-all leading-snug">
                {tx.txHash}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-pill bg-mome-cream-warm hover:bg-mome-whisper border border-mome-forest/10 px-3 py-1.5 text-[12px] font-semibold text-mome-forest settle press"
                >
                  <CopyIcon className="w-3.5 h-3.5" />
                  {copied ? "Copied" : "Copy hash"}
                </button>
                {!demo && (
                  <a
                    href={`https://basescan.org/tx/${tx.txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-pill bg-mome-cream-warm hover:bg-mome-whisper border border-mome-forest/10 px-3 py-1.5 text-[12px] font-semibold text-mome-forest settle press"
                  >
                    <ExternalIcon className="w-3.5 h-3.5" />
                    Open in explorer
                  </a>
                )}
              </div>
              {demo && (
                <p className="text-[10.5px] text-mome-forest/50 pt-1 leading-snug">
                  Demo transaction — this hash isn&rsquo;t indexable on a real
                  explorer.
                </p>
              )}
            </div>
          </section>
        )}

        {/* Custody footer */}
        <section className="rounded-[16px] bg-mome-cream-warm/70 border border-mome-forest/8 px-4 py-3 flex items-start gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-mome-forest text-mome-mint grid place-items-center">
            <ShieldIcon className="w-3.5 h-3.5" />
          </span>
          <p className="text-[11.5px] text-mome-forest/65 leading-snug">
            {quiet
              ? "Your keys never left your phone. Mome cannot move money on your behalf without you."
              : "Signed via your Magic embedded wallet. EIP-7702 delegation made it gasless. Mome holds zero custody."}
          </p>
        </section>

        {!quiet && (
          <AddressBlock
            label="Counterparty (this build, demo)"
            value="0x4F2A5b3c8e0a4f1d92c5e6f8b0d4e3c1a0b9d8e9"
          />
        )}

        <Button variant="primary" size="lg" fullWidth onClick={onClose}>
          Close
        </Button>
      </div>
    </Sheet>
  );
}
