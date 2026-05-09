"use client";

import { useCallback, useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import type { Eip1193Provider } from "ethers";
import { getMagic } from "@/lib/magic";

/**
 * Surfaces Magic's auth state and signing primitives in one hook.
 *
 * The hook exposes:
 *   - `address`           — the connected EOA, or undefined when signed out.
 *   - `login()`           — opens Magic's hosted login UI.
 *   - `logout()`          — clears the Magic session.
 *   - `signMessage(msg)`  — signs an arbitrary message via the EOA.
 *   - `sign7702()`        — wraps Magic's native EIP-7702 authorization signer.
 *
 * Returned signing functions remain wallet-agnostic at the call site so the
 * Universal Account flow can be wired against any provider that satisfies
 * the same interface.
 */
export function useMagicAuth() {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [address, setAddress] = useState<string | undefined>();

  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      const magic = getMagic();
      if (!magic) {
        setReady(true);
        return;
      }
      try {
        const isLoggedIn = await magic.user.isLoggedIn();
        if (cancelled) return;
        setAuthenticated(isLoggedIn);
        if (isLoggedIn) {
          const accounts = (await magic.rpcProvider.request({
            method: "eth_accounts",
          })) as string[] | undefined;
          if (cancelled) return;
          setAddress(accounts?.[0]);
        }
      } catch (err) {
        console.error("[Mome] Magic init failed", err);
      } finally {
        if (!cancelled) setReady(true);
      }
    };
    init();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async () => {
    const magic = getMagic();
    if (!magic) return;
    try {
      const accounts = (await magic.wallet.connectWithUI()) as string[] | null;
      const next = accounts?.[0];
      setAddress(next);
      setAuthenticated(Boolean(next));
    } catch (err) {
      console.error("[Mome] Magic login cancelled", err);
    }
  }, []);

  const logout = useCallback(async () => {
    const magic = getMagic();
    if (!magic) return;
    try {
      await magic.user.logout();
    } finally {
      setAuthenticated(false);
      setAddress(undefined);
    }
  }, []);

  const signMessage = useCallback(async (message: string) => {
    const magic = getMagic();
    if (!magic) throw new Error("Magic SDK not initialized");
    const provider = new BrowserProvider(magic.rpcProvider as Eip1193Provider);
    const signer = await provider.getSigner();
    return signer.signMessage(message);
  }, []);

  const sign7702 = useCallback(
    async (params: {
      contractAddress: `0x${string}`;
      chainId: number;
      nonce: number;
    }) => {
      const magic = getMagic();
      if (!magic) throw new Error("Magic SDK not initialized");
      const auth = await magic.wallet.sign7702Authorization({
        contractAddress: params.contractAddress,
        chainId: params.chainId,
        nonce: params.nonce,
      });
      return {
        r: auth.r,
        s: auth.s,
        v: auth.v,
      };
    },
    []
  );

  return {
    ready,
    authenticated,
    address,
    login,
    logout,
    signMessage,
    sign7702,
  };
}
