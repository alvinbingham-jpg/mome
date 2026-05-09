"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  UniversalAccount,
  UNIVERSAL_ACCOUNT_VERSION,
  type IAssetsResponse,
} from "@particle-network/universal-account-sdk";
import { PARTICLE_CONFIG, isParticleConfigured } from "@/lib/ua-config";

export type UAState = {
  ua: UniversalAccount | null;
  ownerAddress: string | undefined;
  evmUaAddress: string | undefined;
  solanaUaAddress: string | undefined;
  balance: IAssetsResponse | null;
  totalUSD: number;
  isLoadingBalance: boolean;
  refreshBalance: () => Promise<void>;
};

const EMPTY_BALANCE: IAssetsResponse = {
  assets: [],
  totalAmountInUSD: 0,
};

/**
 * Universal Account lifecycle for a known EOA.
 *
 * Pass in the EOA address obtained from any embedded-wallet provider (Magic
 * in Mome's case) and this hook will:
 *  1. Instantiate `UniversalAccount` in EIP-7702 mode against that EOA.
 *  2. Resolve the UA's EVM + Solana smart-account addresses.
 *  3. Fetch the unified primary-asset balance and expose a refresh fn.
 */
export function useUniversalAccount(ownerAddress?: string): UAState {
  const [evmUaAddress, setEvmUaAddress] = useState<string | undefined>();
  const [solanaUaAddress, setSolanaUaAddress] = useState<string | undefined>();
  const [balance, setBalance] = useState<IAssetsResponse | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  /**
   * UA instance is derived from the EOA. `useMemo` keeps the same instance
   * across renders for a given owner — recreating it on every render would
   * tear down internal SDK state and re-fetch endpoints unnecessarily.
   */
  const ua = useMemo(() => {
    if (!ownerAddress) return null;
    if (!isParticleConfigured()) return null;
    return new UniversalAccount({
      projectId: PARTICLE_CONFIG.projectId,
      projectClientKey: PARTICLE_CONFIG.clientKey,
      projectAppUuid: PARTICLE_CONFIG.appId,
      smartAccountOptions: {
        useEIP7702: true,
        name: "UNIVERSAL",
        version: UNIVERSAL_ACCOUNT_VERSION,
        ownerAddress,
      },
      tradeConfig: { slippageBps: 100, universalGas: true },
    });
  }, [ownerAddress]);

  const refreshBalance = useCallback(async () => {
    if (!ua) return;
    try {
      setIsLoadingBalance(true);
      const res = await ua.getPrimaryAssets();
      setBalance(res || EMPTY_BALANCE);
    } catch (err) {
      console.error("[Mome] getPrimaryAssets failed", err);
      setBalance(EMPTY_BALANCE);
    } finally {
      setIsLoadingBalance(false);
    }
  }, [ua]);

  /**
   * Resolve UA addresses + load the unified balance whenever the UA instance
   * changes. All setState calls happen after at least one `await`, satisfying
   * React 19's set-state-in-effect rule.
   */
  useEffect(() => {
    if (!ua) {
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const opts = await ua.getSmartAccountOptions();
        if (cancelled) return;
        setEvmUaAddress(opts?.smartAccountAddress);
        setSolanaUaAddress(opts?.solanaSmartAccountAddress);
      } catch (err) {
        console.error("[Mome] getSmartAccountOptions failed", err);
      }
    })();
    (async () => {
      try {
        const res = await ua.getPrimaryAssets();
        if (cancelled) return;
        setBalance(res || EMPTY_BALANCE);
      } catch (err) {
        console.error("[Mome] getPrimaryAssets failed", err);
        if (!cancelled) setBalance(EMPTY_BALANCE);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ua]);

  return {
    ua,
    ownerAddress,
    evmUaAddress,
    solanaUaAddress,
    balance,
    totalUSD: balance?.totalAmountInUSD ?? 0,
    isLoadingBalance,
    refreshBalance,
  };
}
