"use client";

import { useEffect } from "react";

/**
 * Lightweight toast — a forest-green pill that floats above the bottom nav
 * for 2.4 seconds, then auto-dismisses. We keep it simple: one slot, one
 * message, no queue. Components that need stacking should manage their own
 * state.
 *
 * Animation uses the same spring-eased curve as the sheet so motion feels
 * consistent across the app.
 */
export function Toast({
  message,
  onDismiss,
  durationMs = 2400,
}: {
  message: string | null;
  onDismiss: () => void;
  durationMs?: number;
}) {
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(onDismiss, durationMs);
    return () => clearTimeout(id);
  }, [message, durationMs, onDismiss]);

  if (!message) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-40 flex justify-center px-5 sm:bottom-28">
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-auto rounded-pill bg-mome-forest text-mome-cream text-[13px] font-semibold px-5 py-3 shadow-[0_12px_30px_-10px_rgba(14,17,22,0.4)] sheet-up tracking-tight"
      >
        {message}
      </div>
    </div>
  );
}
