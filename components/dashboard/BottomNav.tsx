"use client";

import {
  ActivityIcon,
  DepositIcon,
  HomeIcon,
  SettingsIcon,
} from "@/components/icons/Icons";

export type Tab = "home" | "deposit" | "activity" | "settings";

const TABS: {
  id: Tab;
  label: string;
  quietLabel: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "home", label: "Home", quietLabel: "Home", Icon: HomeIcon },
  { id: "deposit", label: "Deposit", quietLabel: "Add money", Icon: DepositIcon },
  { id: "activity", label: "Activity", quietLabel: "Activity", Icon: ActivityIcon },
  { id: "settings", label: "Settings", quietLabel: "Settings", Icon: SettingsIcon },
];

/**
 * Compact dark pill nav.
 *
 * Inspired by modern banking apps: a small forest-green pill sits centered
 * above the bottom edge. Inactive tabs are just monochrome icons. The
 * active tab is a lifted cream pill containing the icon + label, so it
 * reads like "you are here" without dominating the screen.
 *
 * The pill auto-sizes to its content (active tab + 3 icons), so swapping
 * tabs feels like the cream pill slides between them.
 */
export function BottomNav({
  active,
  onChange,
  quiet,
}: {
  active: Tab;
  onChange: (tab: Tab) => void;
  quiet: boolean;
}) {
  return (
    <nav
      aria-label="Main navigation"
      className="flex justify-center px-3 pb-[max(1rem,env(safe-area-inset-bottom))]"
    >
      <ul
        role="tablist"
        className="inline-flex items-center gap-0.5 rounded-pill bg-mome-forest text-mome-cream/85 shadow-[0_18px_48px_-12px_rgba(22,67,61,0.45)] p-1"
      >
        {TABS.map(({ id, label, quietLabel, Icon }) => {
          const isActive = active === id;
          const labelText = quiet ? quietLabel : label;
          return (
            <li key={id}>
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-current={isActive ? "page" : undefined}
                onClick={() => onChange(id)}
                className={`relative inline-flex items-center justify-center gap-1.5 rounded-pill h-10 settle press ${
                  isActive
                    ? "bg-mome-cream text-mome-forest px-4 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.25)]"
                    : "w-10 text-mome-cream/65 hover:text-mome-cream hover:bg-white/5"
                }`}
              >
                <Icon className="w-[18px] h-[18px] shrink-0" />
                {isActive && (
                  <span className="text-[12.5px] font-semibold tracking-tight whitespace-nowrap fade">
                    {labelText}
                  </span>
                )}
                {!isActive && <span className="sr-only">{labelText}</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
