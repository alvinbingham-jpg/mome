/**
 * Mome Mood system — three risk tiers with dual-label UX.
 *
 * The vibe label (Chill / Balanced / Boost) is the default UI surface;
 * the sublabel (Stable / Smart Blend / Higher Yield) anchors regulatory
 * disclosure for sophisticated users via the Show Details panel.
 */

export type MoodId = "chill" | "balanced" | "boost";

export type Mood = {
  id: MoodId;
  emoji: string;
  label: string;
  sublabel: string;
  yieldRange: string;
  apyHint: number;
  blurb: string;
  protocols: string[];
  riskNote: string;
};

export const MOODS: Record<MoodId, Mood> = {
  chill: {
    id: "chill",
    emoji: "🌿",
    label: "Chill",
    sublabel: "Stable",
    yieldRange: "4–6% APY",
    apyHint: 5.2,
    blurb: "Blue-chip protocols only. Quiet, predictable growth.",
    protocols: ["Aave v3 (Base)", "Compound v3 (Base)"],
    riskNote:
      "Funds routed only to audited, multi-billion-TVL lending markets. No bridging to unverified chains.",
  },
  balanced: {
    id: "balanced",
    emoji: "⚖️",
    label: "Balanced",
    sublabel: "Smart Blend",
    yieldRange: "7–10% APY",
    apyHint: 8.4,
    blurb: "A curated mix of lending and liquid staking. Smart, not loud.",
    protocols: ["Aave v3", "Lido wstETH", "Compound v3"],
    riskNote:
      "Diversified between lending and liquid-staking derivatives. Smart-contract risk disclosed per leg.",
  },
  boost: {
    id: "boost",
    emoji: "🚀",
    label: "Boost",
    sublabel: "Higher Yield",
    yieldRange: "12%+ APY",
    apyHint: 13.1,
    blurb: "Curated higher-yield strategies. Higher reward, higher variance.",
    protocols: ["Pendle", "Curated DEX LPs", "Aave v3"],
    riskNote:
      "Strategies may include LP exposure and yield tokens. Returns variable. Show Details for per-strategy breakdown.",
  },
};

export const MOOD_ORDER: MoodId[] = ["chill", "balanced", "boost"];
