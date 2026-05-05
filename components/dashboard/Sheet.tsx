"use client";

import { useEffect } from "react";
import { CloseIcon } from "@/components/icons/Icons";

/**
 * Bottom sheet primitive.
 *
 * Slides up from the bottom on mobile and renders as a centered card on
 * desktop. Locks page scroll while open. Click the backdrop or press Escape
 * to dismiss.
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
        className="absolute inset-0 bg-mome-ink/40 backdrop-blur-sm fade"
        tabIndex={dismissible ? 0 : -1}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full sm:max-w-md sm:m-6 bg-mome-cream rounded-t-3xl sm:rounded-3xl shadow-2xl sheet-in max-h-[92vh] overflow-y-auto"
      >
        <div className="sticky top-0 z-10 bg-mome-cream px-6 pt-3 pb-2 flex items-center justify-between border-b border-mome-forest/5">
          <span className="font-display text-base text-mome-forest tracking-tight">
            {title}
          </span>
          {dismissible && (
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="rounded-full p-1.5 hover:bg-mome-forest/5 settle text-mome-forest/70"
            >
              <CloseIcon />
            </button>
          )}
        </div>
        <div className="px-6 pb-8 pt-4">{children}</div>
      </div>
    </div>
  );
}
