"use client";

import { Wordmark } from "@/components/brand/Wordmark";
import { QuietModeToggle } from "@/components/dashboard/QuietModeToggle";
import { BottomNav, type Tab } from "@/components/dashboard/BottomNav";

/**
 * Phone-frame app shell.
 *
 * On mobile: full-bleed, edge-to-edge.
 * On desktop: 420px-wide phone frame centered on an aurora background.
 *
 * The shell renders the brand bar + Quiet Mode toggle, the active tab's
 * content, and the bottom nav. It deliberately does NOT manage tab content
 * rendering — that's the parent page's job.
 */
export function AppShell({
  quiet,
  setQuiet,
  tab,
  setTab,
  children,
}: {
  quiet: boolean;
  setQuiet: (q: boolean) => void;
  tab: Tab;
  setTab: (t: Tab) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh aurora-bg aurora-bg-animated grain">
      <div className="relative mx-auto md:py-10 md:max-w-[440px] md:min-h-dvh">
        <div className="md:phone-frame md:bg-mome-cream md:min-h-[820px] flex flex-col min-h-dvh md:min-h-0">
          <header className="px-5 pt-4 pb-3 flex items-center justify-between gap-3 bg-mome-cream/85 backdrop-blur-xl sticky top-0 z-30 border-b border-mome-forest/5">
            <Wordmark size="md" />
            <QuietModeToggle quiet={quiet} setQuiet={setQuiet} compact />
          </header>

          <main className="flex-1 overflow-y-auto px-5 pt-2 pb-6 fade">
            {children}
          </main>

          <div className="sticky bottom-0 z-20">
            <BottomNav active={tab} onChange={setTab} quiet={quiet} />
          </div>
        </div>
      </div>
    </div>
  );
}
