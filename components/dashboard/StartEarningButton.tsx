"use client";

import { ArrowRightIcon, PauseIcon } from "@/components/icons/Icons";
import { cn } from "@/lib/utils";

/**
 * Primary call-to-action — pinned just above the bottom nav on mobile.
 * Aurora gradient when earning is idle (the magic-moment surface).
 * Forest-green when already earning (calm, secondary).
 */
export function StartEarningButton({
  earning,
  busy,
  disabled,
  onStart,
  onStop,
  hint,
}: {
  earning: boolean;
  busy: boolean;
  disabled?: boolean;
  onStart: () => void;
  onStop: () => void;
  hint?: string;
}) {
  if (earning) {
    return (
      <button
        type="button"
        onClick={onStop}
        disabled={busy}
        className="w-full h-14 rounded-pill bg-mome-forest text-mome-cream font-semibold tracking-tight settle press inline-flex items-center justify-center gap-2 hover:bg-mome-forest-soft disabled:opacity-50"
      >
        <PauseIcon className="w-4 h-4" />
        Pause earning
      </button>
    );
  }

  return (
    <div className="space-y-1.5">
      <button
        type="button"
        onClick={onStart}
        disabled={disabled || busy}
        aria-busy={busy}
        className={cn(
          "w-full h-14 rounded-pill aurora text-mome-forest font-semibold tracking-tight settle press shadow-[0_12px_36px_-8px_rgba(136,227,162,0.55)] inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {busy ? (
          <>
            <span className="size-4 rounded-full border-2 border-mome-forest border-t-transparent spin-ring" />
            Sending your money to work…
          </>
        ) : (
          <>
            Start earning
            <ArrowRightIcon className="w-4 h-4" />
          </>
        )}
      </button>
      {hint && (
        <p className="text-[11px] text-mome-forest/55 text-center tabular">
          {hint}
        </p>
      )}
    </div>
  );
}
