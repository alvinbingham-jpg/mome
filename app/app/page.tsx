"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { HomeTab } from "@/components/dashboard/HomeTab";
import { DepositTab } from "@/components/dashboard/DepositTab";
import { ActivityTab } from "@/components/dashboard/ActivityTab";
import { SettingsTab } from "@/components/dashboard/SettingsTab";
import { LoginScreen } from "@/components/dashboard/LoginScreen";
import { EarnSheet } from "@/components/dashboard/EarnSheet";
import { Sheet } from "@/components/dashboard/Sheet";
import { ShowDetailsPanel } from "@/components/dashboard/ShowDetailsPanel";
import { AboutSheet } from "@/components/dashboard/AboutSheet";
import { TransactionDetailSheet } from "@/components/dashboard/TransactionDetailSheet";
import { Toast } from "@/components/ui/Toast";
import type { DemoTransaction } from "@/lib/demo-data";
import { Button } from "@/components/ui/Button";
import type { Tab } from "@/components/dashboard/BottomNav";
import { useMomeApp } from "@/hooks/useMomeApp";
import { MOODS } from "@/lib/moods";

/**
 * Dashboard orchestrator.
 *
 * `useMomeApp` is the single source of truth — it auto-detects whether the
 * environment has live Magic + Particle creds and serves the same shape of
 * data either way (real or demo). Every tab and sheet renders the same
 * regardless of mode; the only behavioural difference is whether
 * `startEarning` actually broadcasts a transaction.
 */
export default function AppPage() {
  const state = useMomeApp();
  const [tab, setTab] = useState<Tab>("home");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [earnOpen, setEarnOpen] = useState(false);
  const [activeTx, setActiveTx] = useState<DemoTransaction | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  /**
   * Open the earn sheet whenever the flow leaves idle, and keep it open until
   * the user dismisses it themselves. Dismissal only closes the sheet — the
   * underlying earning state keeps running.
   */
  const wasIdleRef = useRef(true);
  useEffect(() => {
    const isIdle = state.earn.kind === "idle";
    if (wasIdleRef.current && !isIdle) {
      setEarnOpen(true);
    }
    wasIdleRef.current = isIdle;
  }, [state.earn.kind]);

  const earnAmountUSD = useMemo(
    () => Math.max(0.5, Math.min(state.totalUSD * 0.25, 5)),
    [state.totalUSD]
  );

  const destinationChain = state.mood === "boost" ? "Arbitrum" : "Base";
  const moodMeta = MOODS[state.mood];

  if (!state.ready) {
    return <Splash label="Waking things up…" />;
  }

  if (!state.authenticated) {
    return (
      <AppShell
        quiet={state.quiet}
        setQuiet={state.setQuiet}
        tab={tab}
        setTab={setTab}
        hideNav
      >
        <LoginScreen
          signingIn={state.signingIn}
          demoMode={state.demo}
          onSignIn={() => state.login()}
        />
      </AppShell>
    );
  }

  return (
    <>
      <AppShell
        quiet={state.quiet}
        setQuiet={state.setQuiet}
        tab={tab}
        setTab={setTab}
      >
        {tab === "home" && (
          <HomeTab
            state={state}
            onSeeAllActivity={() => setTab("activity")}
            onOpenDetails={() => setDetailsOpen(true)}
            onTxClick={setActiveTx}
            onAddMoney={() => setTab("deposit")}
            onSend={() => setToast("Send to a friend — coming soon ✦")}
            onScan={() => setToast("Scan to pay — coming soon ✦")}
          />
        )}
        {tab === "deposit" && <DepositTab state={state} />}
        {tab === "activity" && (
          <ActivityTab state={state} onTxClick={setActiveTx} />
        )}
        {tab === "settings" && (
          <SettingsTab
            state={state}
            onOpenDetails={() => setDetailsOpen(true)}
            onOpenAbout={() => setAboutOpen(true)}
            onOpenLogout={() => setLogoutOpen(true)}
          />
        )}
      </AppShell>

      <EarnSheet
        open={earnOpen}
        earn={state.earn}
        mood={state.mood}
        quiet={state.quiet}
        amountUSD={earnAmountUSD}
        destinationChain={destinationChain}
        onClose={() => {
          setEarnOpen(false);
          if (state.earn.kind === "error") state.stopEarning();
        }}
        onRetry={() => state.startEarning()}
      />

      <Sheet
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        title={`Details · ${moodMeta.label}`}
      >
        <ShowDetailsPanel state={state} />
      </Sheet>

      <Sheet
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
        title="About Mome"
      >
        <AboutSheet />
      </Sheet>

      <TransactionDetailSheet
        tx={activeTx}
        open={activeTx !== null}
        quiet={state.quiet}
        demo={state.demo}
        onClose={() => setActiveTx(null)}
      />

      <Toast message={toast} onDismiss={() => setToast(null)} />

      <Sheet
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        title="Sign out?"
      >
        <div className="space-y-4">
          <p className="text-[14px] text-mome-forest/75 leading-snug">
            Your money stays where it is. You&rsquo;ll need to sign back in to
            see your unified balance, mood, and activity.
          </p>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="lg"
              fullWidth
              onClick={() => setLogoutOpen(false)}
            >
              Stay signed in
            </Button>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => {
                setLogoutOpen(false);
                state.logout();
              }}
            >
              Sign out
            </Button>
          </div>
        </div>
      </Sheet>
    </>
  );
}

function Splash({ label }: { label: string }) {
  return (
    <main className="min-h-dvh aurora-bg aurora-bg-animated grid place-items-center px-6">
      <div className="text-center">
        <span className="block size-10 mx-auto rounded-full border-4 border-mome-forest border-t-transparent spin-ring" />
        <p className="mt-4 text-sm text-mome-forest/70 italic">{label}</p>
      </div>
    </main>
  );
}
