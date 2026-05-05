"use client";

import {
  ActivityIcon,
  DepositIcon,
  HomeIcon,
  SettingsIcon,
} from "@/components/icons/Icons";

export type Tab = "home" | "deposit" | "activity" | "settings";

const TABS: { id: Tab; label: string; quietLabel: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "home", label: "Home", quietLabel: "Home", Icon: HomeIcon },
  { id: "deposit", label: "Deposit", quietLabel: "Add money", Icon: DepositIcon },
  { id: "activity", label: "Activity", quietLabel: "Activity", Icon: ActivityIcon },
  { id: "settings", label: "Settings", quietLabel: "Settings", Icon: SettingsIcon },
];

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
      className="bg-mome-cream/85 backdrop-blur-xl border-t border-mome-forest/10 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <ul className="flex items-stretch justify-around gap-1">
        {TABS.map(({ id, label, quietLabel, Icon }) => {
          const isActive = active === id;
          return (
            <li key={id} className="flex-1">
              <button
                type="button"
                onClick={() => onChange(id)}
                aria-current={isActive ? "page" : undefined}
                className={`group w-full flex flex-col items-center gap-0.5 py-1.5 rounded-2xl settle press ${
                  isActive
                    ? "text-mome-forest"
                    : "text-mome-forest/55 hover:text-mome-forest/80"
                }`}
              >
                <span
                  className={`grid place-items-center w-10 h-10 rounded-2xl settle ${
                    isActive
                      ? "bg-mome-forest text-mome-mint"
                      : "bg-transparent"
                  }`}
                >
                  <Icon className="w-[22px] h-[22px]" />
                </span>
                <span className="text-[10.5px] font-medium tracking-tight">
                  {quiet ? quietLabel : label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
