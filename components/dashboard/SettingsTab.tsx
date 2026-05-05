"use client";

import { Wordmark } from "@/components/brand/Wordmark";
import { QuietModeToggle } from "@/components/dashboard/QuietModeToggle";
import { AddressBlock } from "@/components/dashboard/AddressBlock";
import { ChevronRightIcon, ShieldIcon } from "@/components/icons/Icons";
import type { MomeAppState } from "@/hooks/useMomeApp";

export function SettingsTab({
  state,
  onOpenDetails,
  onOpenAbout,
  onOpenLogout,
}: {
  state: MomeAppState;
  onOpenDetails: () => void;
  onOpenAbout: () => void;
  onOpenLogout: () => void;
}) {
  return (
    <div className="space-y-5 pt-2">
      <header className="space-y-1">
        <h1 className="large-title">Settings</h1>
        <p className="text-[13px] text-mome-forest/65">
          {state.quiet
            ? "Quiet defaults. Everything else hidden until you ask."
            : "Power-user surfaces, custody info, and account."}
        </p>
      </header>

      <section className="rounded-[20px] bg-mome-white border border-mome-forest/8 p-4 space-y-3">
        <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-mome-forest/55">
          Display
        </p>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-mome-forest">
              Quiet Mode
            </p>
            <p className="text-[12px] text-mome-forest/60 leading-snug">
              Hide chains, tokens, and protocol names. The default Mome
              experience.
            </p>
          </div>
          <QuietModeToggle quiet={state.quiet} setQuiet={state.setQuiet} />
        </div>
      </section>

      <section className="rounded-[20px] bg-mome-white border border-mome-forest/8 divide-y divide-mome-forest/5 overflow-hidden">
        <p className="px-4 pt-4 pb-2 text-[11px] uppercase tracking-[0.14em] font-semibold text-mome-forest/55">
          Account
        </p>
        <button
          type="button"
          onClick={onOpenDetails}
          className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 settle press hover:bg-mome-cream-warm"
        >
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-mome-forest">
              Show details
            </p>
            <p className="text-[12px] text-mome-forest/55">
              Strategy, protocols, addresses, fees
            </p>
          </div>
          <ChevronRightIcon className="w-5 h-5 text-mome-forest/40" />
        </button>
        <button
          type="button"
          onClick={onOpenAbout}
          className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 settle press hover:bg-mome-cream-warm"
        >
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-mome-forest">About Mome</p>
            <p className="text-[12px] text-mome-forest/55">
              Stack, principles, and what makes it click
            </p>
          </div>
          <ChevronRightIcon className="w-5 h-5 text-mome-forest/40" />
        </button>
      </section>

      <section className="rounded-[20px] bg-mome-white border border-mome-forest/8 p-4 space-y-2">
        <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-mome-forest/55">
          Custody
        </p>
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-9 h-9 rounded-full bg-mome-forest text-mome-mint grid place-items-center">
            <ShieldIcon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-mome-forest">
              Self-custody by design
            </p>
            <p className="text-[12px] text-mome-forest/65 leading-snug">
              Your keys live in a Magic embedded wallet. Mome never holds your
              funds. EIP-7702 lets your account act as a smart account without
              giving up ownership.
            </p>
          </div>
        </div>
        <div className="space-y-1.5 mt-2">
          <AddressBlock label="Owner EOA" value={state.ownerAddress} />
          <AddressBlock label="Universal Account · EVM" value={state.evmUaAddress} />
          {state.solanaUaAddress && (
            <AddressBlock label="Universal Account · Solana" value={state.solanaUaAddress} />
          )}
        </div>
      </section>

      <button
        type="button"
        onClick={onOpenLogout}
        className="w-full rounded-pill h-12 bg-mome-cream-warm border border-mome-forest/10 text-mome-forest text-[14px] font-semibold settle press hover:bg-mome-whisper"
      >
        Sign out
      </button>

      <div className="text-center pt-2 pb-4">
        <Wordmark size="sm" />
        <p className="text-[10.5px] text-mome-forest/50 mt-1 tracking-wide">
          Mome /moʊm/ — rhymes with home
          {state.demo && " · Demo mode"}
        </p>
      </div>
    </div>
  );
}
