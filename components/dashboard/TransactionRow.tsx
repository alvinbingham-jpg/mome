"use client";

import {
  ArrowRightIcon,
  CheckCircleIcon,
  DepositIcon,
  ExternalIcon,
  SparkleIcon,
} from "@/components/icons/Icons";
import { formatUSD, relativeTime, shortAddress } from "@/lib/utils";
import type { DemoTransaction } from "@/lib/demo-data";

const KIND_META: Record<
  DemoTransaction["kind"],
  { tone: string; iconClass: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  earn: {
    tone: "bg-mome-mint/20 text-mome-forest",
    iconClass: "text-mome-mint-deep",
    Icon: SparkleIcon,
  },
  deposit: {
    tone: "bg-mome-aurora-2/20 text-mome-forest",
    iconClass: "text-mome-forest",
    Icon: DepositIcon,
  },
  withdraw: {
    tone: "bg-mome-aurora-3/30 text-mome-forest",
    iconClass: "text-mome-forest",
    Icon: ArrowRightIcon,
  },
  rebalance: {
    tone: "bg-mome-forest/10 text-mome-forest",
    iconClass: "text-mome-forest",
    Icon: ArrowRightIcon,
  },
};

const QUIET_TITLES: Record<DemoTransaction["kind"], string> = {
  earn: "Started earning",
  deposit: "Money came home",
  withdraw: "Cashed out",
  rebalance: "Moved to a better spot",
};

export function TransactionRow({
  tx,
  quiet,
}: {
  tx: DemoTransaction;
  quiet: boolean;
}) {
  const meta = KIND_META[tx.kind];
  const title = quiet ? QUIET_TITLES[tx.kind] : tx.title;
  const detail = quiet
    ? `${tx.chainHops.length === 1 ? "Quietly" : "Across"} ${
        tx.chainHops.length === 1 ? "" : `${tx.chainHops.length} chains `
      }· ${relativeTime(tx.whenISO)}`
    : `${tx.detail} · ${tx.chainHops.join(" → ")} · ${relativeTime(tx.whenISO)}`;

  return (
    <div className="px-4 py-3 flex items-center gap-3 settle">
      <div
        className={`shrink-0 w-10 h-10 rounded-full grid place-items-center ${meta.tone}`}
        aria-hidden
      >
        <meta.Icon className={`w-[18px] h-[18px] ${meta.iconClass}`} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="text-[14px] font-semibold text-mome-forest tracking-tight truncate">
            {title}
          </p>
          {tx.status === "completed" && (
            <CheckCircleIcon className="w-3.5 h-3.5 text-mome-mint-deep shrink-0" />
          )}
        </div>
        <p className="text-[12px] text-mome-forest/60 truncate">{detail}</p>
        {!quiet && (
          <a
            href={`https://basescan.org/tx/${tx.txHash}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-mono text-mome-forest/55 hover:text-mome-forest settle mt-0.5"
          >
            {shortAddress(tx.txHash, 8, 6)}
            <ExternalIcon className="w-3 h-3" />
          </a>
        )}
      </div>
      <div className="text-right shrink-0">
        <p className="font-display tabular text-[14px] font-semibold text-mome-forest">
          {formatUSD(tx.amountUSD)}
        </p>
      </div>
    </div>
  );
}
