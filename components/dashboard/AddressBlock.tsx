"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons/Icons";
import { shortAddress } from "@/lib/utils";

/**
 * Tappable address row with copy-to-clipboard feedback.
 */
export function AddressBlock({
  label,
  value,
  showFull = false,
}: {
  label: string;
  value?: string;
  showFull?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(id);
  }, [copied]);

  if (!value) {
    return (
      <div className="rounded-2xl border border-mome-forest/10 px-4 py-3 bg-mome-white/60">
        <div className="text-[11px] uppercase tracking-wide text-mome-forest/60 mb-1">
          {label}
        </div>
        <div className="h-4 w-40 shimmer rounded" />
      </div>
    );
  }

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      /* clipboard may be unavailable in some preview contexts; ignore. */
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="w-full text-left rounded-2xl border border-mome-forest/10 px-4 py-3 bg-mome-white/60 hover:bg-mome-white settle press flex items-center justify-between gap-3"
    >
      <span className="min-w-0">
        <span className="block text-[11px] uppercase tracking-wide text-mome-forest/60">
          {label}
        </span>
        <span className="block font-mono text-[13px] tabular text-mome-forest mt-0.5 truncate">
          {showFull ? value : shortAddress(value, 6, 4)}
        </span>
      </span>
      <span
        className={`flex items-center gap-1 text-xs settle ${
          copied ? "text-mome-mint-deep" : "text-mome-forest/60"
        }`}
        aria-live="polite"
      >
        {copied ? (
          <>
            <CheckIcon className="w-4 h-4" /> Copied
          </>
        ) : (
          <>
            <CopyIcon className="w-4 h-4" /> Copy
          </>
        )}
      </span>
    </button>
  );
}
