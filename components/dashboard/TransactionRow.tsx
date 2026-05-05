"use client";

import {
  ArrowRightIcon,
  CheckCircleIcon,
  DepositIcon,
  SparkleIcon,
} from "@/components/icons/Icons";
import { ChainLogo } from "@/components/dashboard/ChainLogo";
import { formatUSD, relativeTime } from "@/lib/utils";
import { useMounted } from "@/hooks/useMounted";
import type { DemoTransaction } from "@/lib/demo-data";

const KIND_META: Record<
  DemoTransaction["kind"],
  { tone: string; iconClass: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  earn: {
    tone: "bg-mome-mint/20",
    iconClass: "text-mome-mint-deep",
    Icon: SparkleIcon,
  },
  deposit: {
    tone: "bg-mome-aurora-2/20",
    iconClass: "text-mome-forest",
    Icon: DepositIcon,
  },
  withdraw: {
    tone: "bg-mome-aurora-3/30",
    iconClass: "text-mome-forest",
    Icon: ArrowRightIcon,
  },
  rebalance: {
    tone: "bg-mome-forest/10",
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

/**
 * Reusable activity row.
 *
 * Tap target opens the parent's transaction detail sheet. Renders icon +
 * title + chain-hop chips + amount. Quiet Mode swaps every chain word for
 * generic copy, but the chain-logo chips stay (they read as colorful dots,
 * not as crypto vocabulary).
 */
export function TransactionRow({
  tx,
  quiet,
  onClick,
}: {
  tx: DemoTransaction;
  quiet: boolean;
  onClick?: (tx: DemoTransaction) => void;
}) {
  const mounted = useMounted();
  const meta = KIND_META[tx.kind];
  const title = quiet ? QUIET_TITLES[tx.kind] : tx.title;
  const when = mounted ? relativeTime(tx.whenISO) : "just now";
  const subtitle = quiet
    ? `${
        tx.chainHops.length === 1
          ? "Quietly"
          : `Across ${tx.chainHops.length} chains`
      } · ${when}`
    : `${tx.detail} · ${when}`;

  return (
    <button
      type="button"
      onClick={() => onClick?.(tx)}
      className="w-full text-left px-4 py-3 flex items-center gap-3 settle press hover:bg-mome-cream-warm/60 cursor-pointer"
    >
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
        <p className="text-[12px] text-mome-forest/60 truncate">{subtitle}</p>
        {!quiet && tx.chainHops.length > 0 && (
          <div className="flex items-center gap-1 mt-1">
            {tx.chainHops.map((c, i) => (
              <span key={`${c}-${i}`} className="flex items-center gap-1">
                <ChainLogo name={c} size={14} />
                {i < tx.chainHops.length - 1 && (
                  <span className="text-mome-forest/30 text-[10px]">→</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="text-right shrink-0">
        <p className="font-display tabular text-[14px] font-semibold text-mome-forest">
          {formatUSD(tx.amountUSD)}
        </p>
      </div>
    </button>
  );
}
