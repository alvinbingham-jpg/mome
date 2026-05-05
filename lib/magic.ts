"use client";

import { Magic } from "magic-sdk";
import { MAGIC_CONFIG, isMagicConfigured } from "@/lib/ua-config";

/**
 * Browser-only Magic singleton.
 *
 * The Magic SDK uses an iframe and `window` APIs, so it must never be
 * instantiated during SSR. We lazy-initialize on first call from a client
 * component and cache the instance on the module.
 */
let _magic: Magic | null = null;

export function getMagic(): Magic | null {
  if (typeof window === "undefined") return null;
  if (!isMagicConfigured()) return null;
  if (!_magic) {
    _magic = new Magic(MAGIC_CONFIG.publishableKey, {
      network: {
        rpcUrl: MAGIC_CONFIG.rpcUrl,
        chainId: MAGIC_CONFIG.chainId,
      },
    });
  }
  return _magic;
}

export type Magic7702Authorization = {
  contractAddress: string;
  chainId: number;
  nonce: number;
  v: number;
  r: string;
  s: string;
};
