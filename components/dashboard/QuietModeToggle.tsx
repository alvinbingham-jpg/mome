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
  setQuiet,
  compact,
}: {
  quiet: boolean;
  setQuiet: (next: boolean) => void;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={quiet}
        aria-label={`Quiet Mode ${quiet ? "on" : "off"}`}
        onClick={() => setQuiet(!quiet)}
        className={cn(
          "inline-flex items-center gap-2 rounded-pill px-2.5 py-1.5 settle press border",
          quiet
            ? "bg-mome-forest text-mome-mint border-mome-forest"
            : "bg-mome-cream-warm text-mome-forest/70 border-mome-forest/10 hover:bg-mome-whisper"
        )}
      >
        <span
          className={cn(
            "relative inline-flex h-4 w-7 rounded-pill settle border",
            quiet
              ? "bg-mome-mint border-mome-mint-deep"
              : "bg-mome-whisper border-mome-forest/15"
          )}
        >
          <span
            className={cn(
              "absolute top-[1px] h-[14px] w-[14px] rounded-full bg-white shadow settle",
              quiet ? "left-[12px]" : "left-[1px]"
            )}
          />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wide">
          {quiet ? "Quiet" : "Detail"}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={quiet}
      onClick={() => setQuiet(!quiet)}
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
