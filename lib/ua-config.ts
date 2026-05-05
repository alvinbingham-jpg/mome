/**
 * Configuration for Mome's auth + UA stack.
 *
 * - Particle Universal Accounts SDK (EIP-7702 mode) handles unified balance
 *   and cross-chain bundling.
 * - Magic SDK provides the embedded wallet, social/email login, and a native
 *   `wallet.sign7702Authorization` method (≥33.4.0) for the delegation
 *   signature required on first use per chain.
 */
export const PARTICLE_CONFIG = {
  projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID ?? "",
  clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY ?? "",
  appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID ?? "",
};

export const MAGIC_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY ?? "",
  /**
   * RPC endpoint Magic uses for the embedded wallet's default network. Mome
   * primarily reads via the UA SDK, but Magic still needs a usable RPC for
   * `eth_chainId`, `eth_accounts`, and 7702 nonce lookups. Defaults to a
   * public Base RPC when the env var is unset.
   */
  rpcUrl:
    process.env.NEXT_PUBLIC_MAGIC_RPC_URL ?? "https://mainnet.base.org",
  chainId: Number(process.env.NEXT_PUBLIC_MAGIC_CHAIN_ID ?? 8453),
};

export function isParticleConfigured() {
  return Boolean(
    PARTICLE_CONFIG.projectId &&
      PARTICLE_CONFIG.clientKey &&
      PARTICLE_CONFIG.appId
  );
}

export function isMagicConfigured() {
  return Boolean(MAGIC_CONFIG.publishableKey);
}

/**
 * Yield-routing destinations.
 *
 * Mome's "Start Earning" CTA bridges the user's unified USDC balance to the
 * vault address on the chosen yield chain. The vault address is left as a
 * configurable constant so deployments can point at Aave v3, Compound, or a
 * router contract without code changes.
 */
export const YIELD_TARGETS = {
  base: {
    chainId: 8453,
    name: "Base",
    usdc: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    aavePool: "0xA238Dd80C259a72e81d7e4664a9801593F98d1c5",
  },
  arbitrum: {
    chainId: 42161,
    name: "Arbitrum",
    usdc: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    aavePool: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
  },
} as const;
