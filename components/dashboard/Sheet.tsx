"use client";

import { useEffect } from "react";
import { CloseIcon } from "@/components/icons/Icons";

/**
 * Native-feel bottom sheet.
 *
 * Behaviour matches modern iOS sheets:
 *  - Slides up with a spring-eased curve, not a linear one
 *  - Sticky drag handle at the top so the gesture affordance is obvious
 *  - Sticky title bar with a hairline separator that appears on scroll
 *  - Backdrop blurs the content underneath (rather than greying it out)
 *  - Safe-area-aware bottom padding so content never sits under the home bar
 *  - Tap backdrop or press Escape to dismiss
 *
 * On wide viewports (md+) it centres as a card so desktop preview is sane.
 */
export function Sheet({
  open,
  onClose,
  title,
  children,
  dismissible = true,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (dismissible && e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, dismissible]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
      <button
        type="button"
        aria-label="Dismiss"
        onClick={dismissible ? onClose : undefined}
        className="absolute inset-0 bg-black/35 backdrop-blur-md backdrop-in"
        tabIndex={dismissible ? 0 : -1}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full sm:max-w-md sm:m-6 bg-mome-cream rounded-t-[28px] sm:rounded-[28px] shadow-[0_-12px_40px_-12px_rgba(14,17,22,0.35)] sheet-up max-h-[92vh] overflow-y-auto"
      >
        {/* Drag handle */}
        <div className="sticky top-0 z-10 bg-mome-cream/95 backdrop-blur-xl">
          <div className="pt-2 pb-1 grid place-items-center">
            <span
              aria-hidden
              className="block w-9 h-[5px] rounded-full bg-mome-forest/15"
            />
          </div>
          {(title || dismissible) && (
            <div className="px-5 pt-1.5 pb-3 flex items-center justify-between">
              <span className="font-display text-[17px] font-semibold text-mome-forest tracking-tight">
                {title}
              </span>
              {dismissible && (
                <button
                  type="button"
                  aria-label="Close"
                  onClick={onClose}
                  className="rounded-full p-1.5 hover:bg-mome-forest/10 settle text-mome-forest/70 press"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          )}
        </div>
        <div className="px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2">
          {children}
        </div>
      </div>
    </div>
  );
}
