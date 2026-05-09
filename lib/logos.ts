/**
 * Chain + token logo registry.
 *
 * Logos live under `public/icons/{chains,tokens}/` so we don't depend on any
 * third-party CDN at runtime (no flash, no privacy leak, no rate limits).
 *
 * - Ethereum / Polygon / BNB / Solana: official-looking SVGs from the
 *   spothq/cryptocurrency-icons set.
 * - Base / Arbitrum / Optimism: official rasterized logos from L2BEAT.
 * - USDC / USDT / ETH: official-looking SVGs from the same icon set.
 */

export type ChainSlug =
  | "ethereum"
  | "base"
  | "arbitrum"
  | "optimism"
  | "polygon"
  | "solana"
  | "bnb";

export type TokenSlug = "usdc" | "usdt" | "eth";

const CHAIN_LOGO: Record<ChainSlug, { src: string; tone: string; label: string }> = {
  ethereum: { src: "/icons/chains/ethereum.svg", tone: "#627EEA", label: "Ethereum" },
  base: { src: "/icons/chains/base.png", tone: "#0052FF", label: "Base" },
  arbitrum: { src: "/icons/chains/arbitrum.png", tone: "#28A0F0", label: "Arbitrum" },
  optimism: { src: "/icons/chains/optimism.png", tone: "#FF0420", label: "Optimism" },
  polygon: { src: "/icons/chains/polygon.svg", tone: "#8247E5", label: "Polygon" },
  solana: { src: "/icons/chains/solana.svg", tone: "#9945FF", label: "Solana" },
  bnb: { src: "/icons/chains/bnb.svg", tone: "#F3BA2F", label: "BNB Chain" },
};

const TOKEN_LOGO: Record<TokenSlug, { src: string; tone: string; label: string }> = {
  usdc: { src: "/icons/tokens/usdc.svg", tone: "#2775CA", label: "USDC" },
  usdt: { src: "/icons/tokens/usdt.svg", tone: "#26A17B", label: "USDT" },
  eth: { src: "/icons/tokens/eth.svg", tone: "#627EEA", label: "Ether" },
};

/** Look up a chain by any common spelling/casing of its name. */
export function getChain(input: string | undefined | null) {
  if (!input) return null;
  const k = input.trim().toLowerCase();
  const map: Record<string, ChainSlug> = {
    ethereum: "ethereum",
    eth: "ethereum",
    mainnet: "ethereum",
    base: "base",
    arbitrum: "arbitrum",
    arb: "arbitrum",
    "arbitrum one": "arbitrum",
    optimism: "optimism",
    op: "optimism",
    "op mainnet": "optimism",
    polygon: "polygon",
    matic: "polygon",
    solana: "solana",
    sol: "solana",
    bnb: "bnb",
    "bnb chain": "bnb",
    bsc: "bnb",
  };
  const slug = map[k];
  return slug ? { slug, ...CHAIN_LOGO[slug] } : null;
}

export function getToken(input: string | undefined | null) {
  if (!input) return null;
  const k = input.trim().toLowerCase();
  const map: Record<string, TokenSlug> = {
    usdc: "usdc",
    "usd-coin": "usdc",
    usdt: "usdt",
    tether: "usdt",
    eth: "eth",
    ether: "eth",
    ethereum: "eth",
  };
  const slug = map[k];
  return slug ? { slug, ...TOKEN_LOGO[slug] } : null;
}

export const ALL_CHAINS: ChainSlug[] = [
  "ethereum",
  "base",
  "arbitrum",
  "optimism",
  "polygon",
  "solana",
  "bnb",
];
