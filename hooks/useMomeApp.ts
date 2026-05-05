"use client";

import { useCallback, useMemo, useState } from "react";
import { useMagicAuth } from "@/hooks/useMagicAuth";
import { useUniversalAccount } from "@/hooks/useUniversalAccount";
import { handleEIP7702Authorizations } from "@/lib/eip7702";
import { createEarnTransaction } from "@/lib/earn";
import { isMagicConfigured, isParticleConfigured } from "@/lib/ua-config";
import {
  DEMO_ASSETS,
  DEMO_OWNER,
  DEMO_TOTAL_USD,
  DEMO_TRANSACTIONS,
  DEMO_UA_EVM,
  DEMO_UA_SOL,
  type DemoAsset,
  type DemoTransaction,
} from "@/lib/demo-data";
import type { MoodId } from "@/lib/moods";

export type EarnState =
  | { kind: "idle" }
  | { kind: "preparing" }
  | { kind: "authorizing" }
  | { kind: "signing" }
  | { kind: "broadcasting" }
  | { kind: "earning"; txHash: string }
  | { kind: "error"; message: string };

export type MomeAppState = {
  /** True when Magic + Particle creds are absent → app runs on synthetic data. */
  demo: boolean;
  ready: boolean;
  authenticated: boolean;
  signingIn: boolean;

  ownerAddress: string | undefined;
  evmUaAddress: string | undefined;
  solanaUaAddress: string | undefined;

  totalUSD: number;
  assets: DemoAsset[];
  transactions: DemoTransaction[];

  mood: MoodId;
  setMood: (m: MoodId) => void;

  quiet: boolean;
  setQuiet: (q: boolean) => void;

  earn: EarnState;
  startEarning: () => Promise<void>;
  stopEarning: () => void;
  earningSinceMs: number | null;

  login: () => Promise<void> | void;
  logout: () => Promise<void> | void;
};

/**
 * Single source of truth for Mome's app shell.
 *
 * The hook auto-detects mode:
 *  - **Live mode** when Magic + Particle keys are present → uses the real
 *    `useMagicAuth` + `useUniversalAccount` hooks and signs transactions
 *    via the SDK.
 *  - **Demo mode** otherwise → returns synthetic-but-realistic data so the
 *    full UX is visible without credentials. The Earn flow simulates the
 *    same 5-stage timing the real flow goes through.
 *
 * `live` is a build-time constant (env vars are baked into the bundle), so
 * the hook ordering is stable for the lifetime of a render tree — the
 * conditional dispatch is safe.
 */
export function useMomeApp(): MomeAppState {
  const live = isMagicConfigured() && isParticleConfigured();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return live ? useLiveMomeApp() : useDemoMomeApp();
}

function useDemoMomeApp(): MomeAppState {
  const [authenticated, setAuthenticated] = useState(true);
  const [mood, setMood] = useState<MoodId>("balanced");
  const [quiet, setQuiet] = useState(true);
  const [earn, setEarn] = useState<EarnState>({ kind: "idle" });
  const [earningSinceMs, setEarningSinceMs] = useState<number | null>(null);

  const startEarning = useCallback(async () => {
    setEarn({ kind: "preparing" });
    await wait(700);
    setEarn({ kind: "authorizing" });
    await wait(900);
    setEarn({ kind: "signing" });
    await wait(800);
    setEarn({ kind: "broadcasting" });
    await wait(1100);
    const fakeHash =
      "0x" +
      Math.floor(Math.random() * 1e16).toString(16).padStart(16, "0") +
      Math.floor(Math.random() * 1e16).toString(16).padStart(16, "0") +
      Math.floor(Math.random() * 1e16).toString(16).padStart(16, "0") +
      Math.floor(Math.random() * 1e16).toString(16).padStart(16, "0");
    setEarn({ kind: "earning", txHash: fakeHash });
    setEarningSinceMs(Date.now());
  }, []);

  const stopEarning = useCallback(() => {
    setEarn({ kind: "idle" });
    setEarningSinceMs(null);
  }, []);

  return {
    demo: true,
    ready: true,
    authenticated,
    signingIn: false,

    ownerAddress: DEMO_OWNER,
    evmUaAddress: DEMO_UA_EVM,
    solanaUaAddress: DEMO_UA_SOL,

    totalUSD: DEMO_TOTAL_USD,
    assets: DEMO_ASSETS,
    transactions: DEMO_TRANSACTIONS,

    mood,
    setMood,

    quiet,
    setQuiet,

    earn,
    startEarning,
    stopEarning,
    earningSinceMs,

    login: () => setAuthenticated(true),
    logout: () => setAuthenticated(false),
  };
}

function useLiveMomeApp(): MomeAppState {
  const auth = useMagicAuth();
  const ua = useUniversalAccount(auth.address);

  const [mood, setMood] = useState<MoodId>("balanced");
  const [quiet, setQuiet] = useState(true);
  const [earn, setEarn] = useState<EarnState>({ kind: "idle" });
  const [earningSinceMs, setEarningSinceMs] = useState<number | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  /** Translate UA's IAsset[] into the same DemoAsset shape the UI consumes. */
  const assets = useMemo<DemoAsset[]>(() => {
    if (!ua.balance) return [];
    return ua.balance.assets.map((a, i) => ({
      chainId: 0,
      chainName: a.tokenType?.toString().toUpperCase() ?? "ASSET",
      symbol: a.tokenType?.toString().toUpperCase() ?? "ASSET",
      amount: a.amount ?? 0,
      amountInUSD: a.amountInUSD ?? 0,
      tokenAddress: `0x${i.toString(16).padStart(40, "0")}`,
    }));
  }, [ua.balance]);

  const startEarning = useCallback(async () => {
    if (!ua.ua || !auth.address) return;
    try {
      setEarn({ kind: "preparing" });

      const amount = Math.max(0.5, Math.min(ua.totalUSD * 0.25, 5));
      const { transaction } = await createEarnTransaction({
        ua: ua.ua,
        mood,
        amountInUSD: amount.toFixed(2),
      });

      setEarn({ kind: "authorizing" });
      const authorizations = await handleEIP7702Authorizations(
        transaction.userOps,
        auth.sign7702
      );

      setEarn({ kind: "signing" });
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
      setEarningSinceMs(Date.now());
      ua.refreshBalance();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      console.error("[Mome] Start Earning failed", err);
      setEarn({ kind: "error", message });
    }
  }, [ua, mood, auth]);

  const stopEarning = useCallback(() => {
    setEarn({ kind: "idle" });
    setEarningSinceMs(null);
  }, []);

  const login = useCallback(async () => {
    setSigningIn(true);
    try {
      await auth.login();
    } finally {
      setSigningIn(false);
    }
  }, [auth]);

  const logout = useCallback(async () => {
    setEarn({ kind: "idle" });
    setEarningSinceMs(null);
    await auth.logout();
  }, [auth]);

  return {
    demo: false,
    ready: auth.ready,
    authenticated: auth.authenticated,
    signingIn,

    ownerAddress: ua.ownerAddress,
    evmUaAddress: ua.evmUaAddress,
    solanaUaAddress: ua.solanaUaAddress,

    totalUSD: ua.totalUSD,
    assets,
    transactions: [],

    mood,
    setMood,

    quiet,
    setQuiet,

    earn,
    startEarning,
    stopEarning,
    earningSinceMs,

    login,
    logout,
  };
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
