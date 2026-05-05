"use client";

import { TransactionRow } from "@/components/dashboard/TransactionRow";
import { ActivityIcon } from "@/components/icons/Icons";
import type { MomeAppState } from "@/hooks/useMomeApp";

export function ActivityTab({ state }: { state: MomeAppState }) {
  if (state.transactions.length === 0) {
    return (
      <div className="space-y-5">
        <header className="space-y-1">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-mome-forest">
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
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-mome-forest">
          {state.quiet ? "What we did" : "Activity"}
        </h1>
        <p className="text-[13px] text-mome-forest/65">
          {state.quiet
            ? "Every move your money makes."
            : "Every UA operation, on-chain receipt, and rebalance event."}
        </p>
      </header>
      <div className="rounded-[20px] bg-mome-white border border-mome-forest/8 divide-y divide-mome-forest/5 overflow-hidden">
        {state.transactions.map((tx) => (
          <TransactionRow key={tx.id} tx={tx} quiet={state.quiet} />
        ))}
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
