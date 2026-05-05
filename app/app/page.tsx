"use client";

import { useCallback, useState } from "react";
import { useMagicAuth } from "@/hooks/useMagicAuth";
import { useUniversalAccount } from "@/hooks/useUniversalAccount";
import { handleEIP7702Authorizations } from "@/lib/eip7702";
import { createEarnTransaction } from "@/lib/earn";
import { isMagicConfigured, isParticleConfigured } from "@/lib/ua-config";
import type { MoodId } from "@/lib/moods";
import { MOODS } from "@/lib/moods";
import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/Button";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { MoodSelector } from "@/components/dashboard/MoodSelector";
import { QuietModeToggle } from "@/components/dashboard/QuietModeToggle";
import { ShowDetailsPanel } from "@/components/dashboard/ShowDetailsPanel";
import { StartEarningButton } from "@/components/dashboard/StartEarningButton";

type EarnState =
  | { kind: "idle" }
  | { kind: "preparing" }
  | { kind: "signing" }
  | { kind: "broadcasting" }
  | { kind: "earning"; txHash: string }
  | { kind: "error"; message: string };

export default function AppPage() {
  if (!isMagicConfigured() || !isParticleConfigured()) {
    return <ConfigureCredentials />;
  }
  return <Dashboard />;
}

function Dashboard() {
  const auth = useMagicAuth();
  const ua = useUniversalAccount(auth.address);

  const [mood, setMood] = useState<MoodId>("chill");
  const [quiet, setQuiet] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [earn, setEarn] = useState<EarnState>({ kind: "idle" });

  const earningActive = earn.kind === "earning";

  const handleStartEarning = useCallback(async () => {
    if (!ua.ua || !auth.address) return;
    try {
      setEarn({ kind: "preparing" });

      const amount = Math.max(0.5, Math.min(ua.totalUSD * 0.25, 5));
      const { transaction } = await createEarnTransaction({
        ua: ua.ua,
        mood,
        amountInUSD: amount.toFixed(2),
      });

      setEarn({ kind: "signing" });

      const authorizations = await handleEIP7702Authorizations(
        transaction.userOps,
        auth.sign7702
      );

      const signature = await auth.signMessage(transaction.rootHash);

      setEarn({ kind: "broadcasting" });

      const result = await ua.ua.sendTransaction(
        transaction,
        signature,
        authorizations
      );

      const txHash =
        (result as { transactionId?: string; txHash?: string })?.txHash ??
        (result as { transactionId?: string })?.transactionId ??
        "";

      setEarn({ kind: "earning", txHash });
      ua.refreshBalance();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      console.error("[Mome] Start Earning failed", err);
      setEarn({ kind: "error", message });
    }
  }, [ua, mood, auth]);

  if (!auth.ready) {
    return <SplashLoader label="Waking things up…" />;
  }

  if (!auth.authenticated || !auth.address) {
    return <SignedOut onLogin={auth.login} />;
  }

  if (!ua.ua) {
    return <SplashLoader label="Bringing your money home…" />;
  }

  const lastTxHash = earn.kind === "earning" ? earn.txHash : null;
  const errorMessage = earn.kind === "error" ? earn.message : null;
  const loading =
    earn.kind === "preparing" ||
    earn.kind === "signing" ||
    earn.kind === "broadcasting";

  return (
    <main className="min-h-screen pb-24">
      <header className="mx-auto max-w-3xl px-6 pt-8 flex items-center justify-between">
        <Wordmark size="md" />
        <div className="flex items-center gap-2">
          <QuietModeToggle quiet={quiet} onChange={setQuiet} />
          <Button variant="ghost" size="sm" onClick={() => auth.logout()}>
            Sign out
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 mt-10 space-y-6">
        <BalanceCard
          baseUSD={ua.totalUSD}
          mood={mood}
          earning={earningActive}
          quiet={quiet}
        />

        <div className="rounded-card border border-mome-forest/8 bg-mome-white p-6 space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-wider text-mome-forest/55">
              Mood
            </p>
            {!quiet && (
              <p className="text-xs text-mome-forest/55 fade-in">
                {MOODS[mood].blurb}
              </p>
            )}
          </div>
          <MoodSelector
            value={mood}
            onChange={setMood}
            showSublabel={!quiet}
          />

          <p className="text-mome-forest/70 italic text-sm pt-1">
            {earn.kind === "idle" && "Your money is ready to wake up."}
            {earn.kind === "preparing" && "Preparing your strategy…"}
            {earn.kind === "signing" &&
              "Confirm in your wallet — one signature, that's it."}
            {earn.kind === "broadcasting" && "Sending your money to work…"}
            {earn.kind === "earning" && "Quietly compounding."}
            {earn.kind === "error" && "That didn't go through."}
          </p>

          <StartEarningButton
            earning={earningActive}
            loading={loading}
            onStart={handleStartEarning}
            onStop={() => setEarn({ kind: "idle" })}
            disabled={ua.totalUSD < 0.5}
          />

          {errorMessage && (
            <p className="text-sm text-red-700/80 fade-in">{errorMessage}</p>
          )}

          <button
            type="button"
            onClick={() => setShowDetails((v) => !v)}
            className="text-xs uppercase tracking-wider text-mome-forest/55 hover:text-mome-forest settle"
          >
            {showDetails ? "Hide details" : "Show details"}
          </button>
        </div>

        <ShowDetailsPanel
          open={showDetails}
          mood={mood}
          balance={ua.balance}
          ownerAddress={ua.ownerAddress}
          evmUaAddress={ua.evmUaAddress}
          solanaUaAddress={ua.solanaUaAddress}
          lastTxHash={lastTxHash}
        />

        {ua.totalUSD < 0.5 && (
          <p className="text-sm text-mome-forest/55 italic text-center">
            Send any USDC, USDT, or ETH to your Universal Account address to
            start. {!showDetails && "Tap Show details for the address."}
          </p>
        )}
      </section>
    </main>
  );
}

function SplashLoader({ label }: { label: string }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <Wordmark size="lg" />
      <p className="text-mome-forest/65 italic">{label}</p>
    </main>
  );
}

function SignedOut({ onLogin }: { onLogin: () => void }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <Wordmark size="xl" />
      <p className="mt-8 max-w-sm text-center text-mome-forest/70 text-lg">
        Sign in once. No seed phrase, no extension. Your money, finally home.
      </p>
      <div className="mt-8 w-full max-w-xs">
        <Button variant="aurora" size="lg" fullWidth onClick={onLogin}>
          Sign in →
        </Button>
      </div>
      <p className="mt-6 text-xs text-mome-forest/45 italic">
        Self-custody by default · powered by Magic + Particle UA + EIP-7702
      </p>
    </main>
  );
}

function ConfigureCredentials() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <Wordmark size="lg" />
      <div className="mt-8 max-w-md rounded-card border border-mome-forest/10 bg-mome-white p-6">
        <p className="text-sm uppercase tracking-wider text-mome-forest/55">
          Configure credentials
        </p>
        <p className="mt-2 text-mome-forest/80 leading-relaxed text-sm">
          Copy <code className="text-mome-forest font-mono">.env.local.example</code>
          {" "}to <code className="text-mome-forest font-mono">.env.local</code> and
          fill in your Particle (UA) and Magic (auth) project keys, then
          restart the dev server.
        </p>
        <ul className="mt-4 text-xs space-y-1 text-mome-forest/65">
          <li>· Particle Dashboard → https://dashboard.particle.network</li>
          <li>· Magic Dashboard → https://dashboard.magic.link</li>
        </ul>
      </div>
    </main>
  );
}
