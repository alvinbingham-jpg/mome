/**
 * Demo data for Mome.
 *
 * When Magic / Particle credentials aren't configured, the app/app route
 * runs in demo mode. The shape of every value here mirrors what a real
 * `useUniversalAccount` + `useMagicAuth` session would return, so the
 * dashboard renders identically — Quiet Mode, Mood routing, Show Details
 * disclosure, the Earn sheet's 5-stage flow, and tx history all behave
 * exactly the same way.
 *
 * Demo amounts are in USD. The Earn flow simulates the on-chain timing
 * (preparing → signing → broadcasting → earning) without making network
 * calls, which is exactly what we want for a 60-second pitch demo.
 */

export type DemoAsset = {
  chainId: number;
  chainName: string;
  symbol: string;
  amount: number;
  amountInUSD: number;
  tokenAddress: string;
};

export type DemoTransaction = {
  id: string;
  kind: "earn" | "deposit" | "withdraw" | "rebalance";
  title: string;
  detail: string;
  amountUSD: number;
  chainHops: string[];
  whenISO: string;
  status: "completed" | "pending";
  txHash: string;
};

export const DEMO_OWNER = "0x9F4cE6e0aB7D0a4F8e6d0A2c7B3D1e0F8A6b5C4d";
export const DEMO_UA_EVM = "0x4F2A9c0E3a8B1D5e6F7c9d0A2B3E4f5A6B7c8D9e";
export const DEMO_UA_SOL = "5KQwrPbwdL6PhXujxWzNEnpW1gC3i6r3YhwUj9DEMOso";

export const DEMO_ASSETS: DemoAsset[] = [
  {
    chainId: 8453,
    chainName: "Base",
    symbol: "USDC",
    amount: 412.50,
    amountInUSD: 412.50,
    tokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  },
  {
    chainId: 42161,
    chainName: "Arbitrum",
    symbol: "USDC",
    amount: 318.20,
    amountInUSD: 318.20,
    tokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  },
  {
    chainId: 10,
    chainName: "Optimism",
    symbol: "USDT",
    amount: 220.15,
    amountInUSD: 220.18,
    tokenAddress: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
  },
  {
    chainId: 137,
    chainName: "Polygon",
    symbol: "USDC",
    amount: 195.00,
    amountInUSD: 195.00,
    tokenAddress: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
  },
  {
    chainId: 1,
    chainName: "Ethereum",
    symbol: "ETH",
    amount: 0.034,
    amountInUSD: 102.00,
    tokenAddress: "0x0000000000000000000000000000000000000000",
  },
];

export const DEMO_TOTAL_USD = DEMO_ASSETS.reduce(
  (sum, a) => sum + a.amountInUSD,
  0
);

export const DEMO_TRANSACTIONS: DemoTransaction[] = [
  {
    id: "tx-1",
    kind: "rebalance",
    title: "Rebalanced to higher-yield strategy",
    detail: "Aave → Pendle PT-eUSDe",
    amountUSD: 412.50,
    chainHops: ["Base", "Arbitrum"],
    whenISO: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    status: "completed",
    txHash: "0xa3b2f8c9d0e1f2a3b4c5d6e7f8091a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f",
  },
  {
    id: "tx-2",
    kind: "earn",
    title: "Started earning",
    detail: "Routed via Aave v3 on Base",
    amountUSD: 250.00,
    chainHops: ["Optimism", "Base"],
    whenISO: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    status: "completed",
    txHash: "0xb4c3a9b2f8c9d0e1f2a3b4c5d6e7f8091a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
  },
  {
    id: "tx-3",
    kind: "deposit",
    title: "Money came home",
    detail: "From 0x71C7…45c4",
    amountUSD: 500.00,
    chainHops: ["Ethereum"],
    whenISO: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    status: "completed",
    txHash: "0xc5d4b3a9b2f8c9d0e1f2a3b4c5d6e7f8091a2b3c4d5e6f7a8b9c0d1e2f3a4b5c",
  },
  {
    id: "tx-4",
    kind: "earn",
    title: "Started earning",
    detail: "Routed via Compound v3 on Base",
    amountUSD: 300.00,
    chainHops: ["Polygon", "Base"],
    whenISO: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    status: "completed",
    txHash: "0xd6e5c4b3a9b2f8c9d0e1f2a3b4c5d6e7f8091a2b3c4d5e6f7a8b9c0d1e2f3a4b",
  },
  {
    id: "tx-5",
    kind: "deposit",
    title: "Money came home",
    detail: "From 0x4A2f…9c1B",
    amountUSD: 750.00,
    chainHops: ["Arbitrum"],
    whenISO: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    status: "completed",
    txHash: "0xe7f6d5c4b3a9b2f8c9d0e1f2a3b4c5d6e7f8091a2b3c4d5e6f7a8b9c0d1e2f3a",
  },
];
