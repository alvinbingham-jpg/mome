"use client";

import { MOODS, MOOD_ORDER, type MoodId } from "@/lib/moods";
import { cn } from "@/lib/utils";

export function MoodSelector({
  value,
  onChange,
  showSublabel,
}: {
  value: MoodId;
  onChange: (id: MoodId) => void;
  showSublabel: boolean;
}) {
  return (
    <div className="grid grid-cols-3 gap-2 p-1 rounded-card bg-mome-cream-warm border border-mome-forest/8">
      {MOOD_ORDER.map((id) => {
        const mood = MOODS[id];
        const active = id === value;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={active}
            className={cn(
              "flex flex-col items-center gap-1 py-3 px-2 rounded-[14px] settle",
              active
                ? "bg-mome-forest text-mome-cream shadow-[0_4px_20px_rgba(22,67,61,0.15)]"
                : "text-mome-forest/70 hover:text-mome-forest hover:bg-white/60"
            )}
          >
            <span className="text-xl leading-none" aria-hidden>
              {mood.emoji}
            </span>
            <span className="font-display text-base font-medium tracking-tight">
              {mood.label}
            </span>
            {showSublabel && (
              <span
                className={cn(
                  "text-[11px] uppercase tracking-wide tabular fade-in",
                  active ? "text-mome-mint" : "text-mome-forest/50"
                )}
              >
                {mood.sublabel} · {mood.yieldRange}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
