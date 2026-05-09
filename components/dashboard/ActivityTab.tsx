"use client";

import { useMemo } from "react";
import { TransactionRow } from "@/components/dashboard/TransactionRow";
import { ActivityIcon } from "@/components/icons/Icons";
import { dayBucketLabel, formatUSD, groupByDay } from "@/lib/utils";
import { useMounted } from "@/hooks/useMounted";
import type { MomeAppState } from "@/hooks/useMomeApp";
import type { DemoTransaction } from "@/lib/demo-data";

/**
 * Activity tab — transactions grouped by day (Monzo-style).
 *
 * Each day-bucket gets a header with the friendly label ("Today",
 * "Yesterday", a weekday name, or an absolute date) and a daily summary
 * line showing how much money moved that day. Inside the bucket, rows
 * keep the same TransactionRow visual so taps still open the detail
 * sheet.
 *
 * Date formatting is gated behind useMounted() to avoid hydration drift.
 */
export function ActivityTab({
  state,
  onTxClick,
}: {
  state: MomeAppState;
  onTxClick: (tx: DemoTransaction) => void;
}) {
  const mounted = useMounted();
  const groups = useMemo(
    () => groupByDay(state.transactions, (t) => t.whenISO),
    [state.transactions]
  );

  if (state.transactions.length === 0) {
    return (
      <div className="space-y-5 pt-2">
        <header className="space-y-1">
          <h1 className="large-title">
            {state.quiet ? "What we did" : "Activity"}
          </h1>
          <p className="text-[13px] text-mome-forest/65">
            {state.quiet
              ? "Every move your money makes shows up here."
              : "Every UA operation, on-chain receipt, and rebalance event."}
          </p>
        </header>
        <div className="rounded-[24px] bg-mome-white border border-mome-forest/8 px-6 py-12 text-center grain">
          <div className="mx-auto w-12 h-12 rounded-full bg-mome-cream-warm grid place-items-center text-mome-forest/60">
            <ActivityIcon className="w-6 h-6" />
          </div>
          <p className="mt-3 font-display text-[16px] text-mome-forest font-medium">
            Nothing here yet
          </p>
          <p className="mt-1 text-[12px] text-mome-forest/55 max-w-[28ch] mx-auto">
            Add money and tap Start earning. Your first move shows up here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 pt-2">
      <header className="space-y-1">
        <h1 className="large-title">
          {state.quiet ? "What we did" : "Activity"}
        </h1>
        <p className="text-[13px] text-mome-forest/65">
          {state.quiet
            ? "Every move your money makes."
            : "Every UA operation, on-chain receipt, and rebalance event."}
        </p>
      </header>

      <div className="space-y-4">
        {groups.map(({ key, items }) => {
          const total = items.reduce((sum, t) => {
            // earn / deposit / rebalance count as inflows here for the daily
            // summary; withdraws are subtracted. Demo data only has positive
            // movements so this is safe either way.
            return t.kind === "withdraw" ? sum - t.amountUSD : sum + t.amountUSD;
          }, 0);
          const label = mounted ? dayBucketLabel(key) : "Today";
          return (
            <section key={key} className="space-y-2 fade-in">
              <div className="flex items-baseline justify-between px-1">
                <h2 className="text-[12px] font-bold uppercase tracking-[0.12em] text-mome-forest/55">
                  {label}
                </h2>
                {!state.quiet && (
                  <span className="text-[11px] text-mome-forest/55 tabular">
                    {total > 0 ? "+" : ""}
                    {formatUSD(total)}
                  </span>
                )}
              </div>
              <div className="rounded-[20px] bg-mome-white border border-mome-forest/8 divide-y divide-mome-forest/5 overflow-hidden">
                {items.map((tx) => (
                  <TransactionRow
                    key={tx.id}
                    tx={tx}
                    quiet={state.quiet}
                    onClick={onTxClick}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {!state.quiet && (
        <p className="text-[11px] text-mome-forest/50 text-center fade-in px-3">
          All movements are signed by your embedded wallet and broadcast through
          Particle Universal Accounts. We never custody your funds.
        </p>
      )}
    </div>
  );
}
