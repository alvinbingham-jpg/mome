"use client";

import { BalanceHero } from "@/components/dashboard/BalanceHero";
import { MoodSelector } from "@/components/dashboard/MoodSelector";
import { StartEarningButton } from "@/components/dashboard/StartEarningButton";
import { TransactionRow } from "@/components/dashboard/TransactionRow";
import { ChevronRightIcon } from "@/components/icons/Icons";
import { MOODS } from "@/lib/moods";
import type { MomeAppState } from "@/hooks/useMomeApp";

export function HomeTab({
  state,
  onSeeAllActivity,
  onOpenDetails,
}: {
  state: MomeAppState;
  onSeeAllActivity: () => void;
  onOpenDetails: () => void;
}) {
  const earning = state.earn.kind === "earning";
  const busy =
    state.earn.kind === "preparing" ||
    state.earn.kind === "authorizing" ||
    state.earn.kind === "signing" ||
    state.earn.kind === "broadcasting";

  const recent = state.transactions.slice(0, 3);
  const chainCount = new Set(state.assets.map((a) => a.chainId)).size || 1;
  const mood = MOODS[state.mood];

  return (
    <div className="space-y-5">
      <BalanceHero
        baseUSD={state.totalUSD}
        mood={state.mood}
        earning={earning}
        quiet={state.quiet}
        chainCount={chainCount}
      />

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[17px] font-semibold tracking-tight text-mome-forest">
            {state.quiet ? "Your mood" : "Yield mood"}
          </h2>
          {!state.quiet && (
            <span className="text-[11px] text-mome-forest/55 fade-in">
              {mood.sublabel} · {mood.yieldRange}
            </span>
          )}
        </div>
        <MoodSelector
          value={state.mood}
          onChange={state.setMood}
          showSublabel={!state.quiet}
        />
        {!state.quiet && (
          <p className="text-[12px] text-mome-forest/65 leading-snug px-1 fade-in">
            {mood.blurb}
          </p>
        )}
      </section>

      <section className="space-y-2">
        <StartEarningButton
          earning={earning}
          busy={busy}
          disabled={state.totalUSD < 0.5}
          onStart={state.startEarning}
          onStop={state.stopEarning}
          hint={
            state.totalUSD < 0.5
              ? "Add money first to start earning"
              : earning
              ? `Earning ~${mood.apyHint}% APY · tap to pause`
              : state.quiet
              ? "One tap. We handle the chains."
              : `~${mood.apyHint}% APY · routed cross-chain via UA`
          }
        />

        {state.earn.kind === "error" && (
          <div className="rounded-2xl bg-red-500/5 border border-red-500/20 px-4 py-3 text-[13px] text-red-700 fade-in">
            {state.earn.message}
          </div>
        )}
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[17px] font-semibold tracking-tight text-mome-forest">
            {state.quiet ? "What we did" : "Recent activity"}
          </h2>
          <button
            type="button"
            onClick={onSeeAllActivity}
            className="text-[12px] text-mome-forest/60 hover:text-mome-forest settle inline-flex items-center gap-0.5"
          >
            See all <ChevronRightIcon className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="rounded-[20px] bg-mome-white border border-mome-forest/8 divide-y divide-mome-forest/5 overflow-hidden">
          {recent.length === 0 && (
            <div className="px-4 py-6 text-[13px] text-mome-forest/55">
              {state.quiet
                ? "No activity yet."
                : "No transactions yet — your activity will appear here."}
            </div>
          )}
          {recent.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} quiet={state.quiet} />
          ))}
        </div>
      </section>

      {!state.quiet && (
        <button
          type="button"
          onClick={onOpenDetails}
          className="w-full text-left rounded-[20px] bg-mome-white border border-mome-forest/8 px-4 py-3 settle press hover:bg-mome-cream-warm flex items-center justify-between fade-in"
        >
          <span>
            <span className="block text-[13px] font-semibold text-mome-forest">
              Show details
            </span>
            <span className="block text-[12px] text-mome-forest/60">
              Strategy, protocols, addresses, tx hashes
            </span>
          </span>
          <ChevronRightIcon className="w-5 h-5 text-mome-forest/40" />
        </button>
      )}
    </div>
  );
}
