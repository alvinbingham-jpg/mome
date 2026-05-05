"use client";

import { cn } from "@/lib/utils";

/**
 * Quiet Mode — Mome's signature interaction.
 *
 * When ON (default), all crypto vocabulary is suppressed across the dashboard:
 * tokens, chains, gas, protocol names. The user sees one balance and one
 * mood, nothing else.
 *
 * Toggling OFF reveals the underlying details (chain, token, protocol,
 * tx hash) without changing what's being displayed semantically. We don't
 * lie about the chains — we just don't make the user do their homework.
 */
export function QuietModeToggle({
  quiet,
  onChange,
}: {
  quiet: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={quiet}
      onClick={() => onChange(!quiet)}
      className={cn(
        "group inline-flex items-center gap-3 rounded-pill px-4 py-2 settle",
        "bg-mome-cream-warm hover:bg-mome-whisper border border-mome-forest/10"
      )}
    >
      <span
        className={cn(
          "relative inline-flex h-6 w-11 rounded-pill settle border",
          quiet
            ? "bg-mome-mint border-mome-mint-deep"
            : "bg-mome-whisper border-mome-forest/15"
        )}
      >
        <span
          className={cn(
            "absolute top-[2px] h-[18px] w-[18px] rounded-full bg-white shadow settle",
            quiet ? "left-[22px]" : "left-[2px]"
          )}
        />
      </span>
      <span className="text-sm font-medium text-mome-forest tracking-tight">
        Quiet Mode {quiet ? "on" : "off"}
      </span>
    </button>
  );
}
