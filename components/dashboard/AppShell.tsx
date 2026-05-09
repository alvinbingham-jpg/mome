"use client";

import { Wordmark } from "@/components/brand/Wordmark";
import { QuietModeToggle } from "@/components/dashboard/QuietModeToggle";
import { BottomNav, type Tab } from "@/components/dashboard/BottomNav";
import { IosStatusBar } from "@/components/onboarding/IosStatusBar";

/**
 * Phone-frame app shell.
 *
 * On mobile: full-bleed, edge-to-edge.
 * On desktop: 440px-wide phone frame centred on an aurora background.
 *
 * Includes:
 *  - Mock iOS status bar (9:41 → live time)
 *  - Brand chrome (wordmark + Quiet Mode toggle)
 *  - Scrollable content
 *  - Floating bottom nav (when not hidden)
 */
export function AppShell({
  quiet,
  setQuiet,
  tab,
  setTab,
  hideNav,
  children,
}: {
  quiet: boolean;
  setQuiet: (q: boolean) => void;
  tab: Tab;
  setTab: (t: Tab) => void;
  hideNav?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh aurora-bg aurora-bg-animated grain">
      <div className="relative mx-auto md:py-10 md:max-w-[440px] md:min-h-dvh">
        <div className="md:phone-frame md:bg-mome-cream md:min-h-[820px] flex flex-col min-h-dvh md:min-h-0 relative">
          <div className="sticky top-0 z-30 bg-mome-cream/85 backdrop-blur-xl border-b border-mome-forest/5">
            <IosStatusBar tone="dark" />
            <header className="px-5 pt-1 pb-2.5 flex items-center justify-between gap-3">
              <Wordmark size="md" />
              <QuietModeToggle quiet={quiet} setQuiet={setQuiet} compact />
            </header>
          </div>

          <main
            className={`flex-1 overflow-y-auto px-5 pt-3 fade ${
              hideNav ? "pb-6" : "pb-32"
            }`}
          >
            {children}
          </main>

          {!hideNav && (
            <div className="sticky bottom-0 z-20 pointer-events-none">
              <div className="pointer-events-auto">
                <BottomNav active={tab} onChange={setTab} quiet={quiet} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
