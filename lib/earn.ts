import type { UniversalAccount } from "@particle-network/universal-account-sdk";
import { YIELD_TARGETS } from "@/lib/ua-config";
import type { MoodId } from "@/lib/moods";

/**
 * Build the "Start Earning" transaction for a given mood.
 *
 * For the hackathon scaffold we rely on UA's native `createTransferTransaction`
 * to move a small amount of unified USDC to the destination chain. Production
 * Mome would wrap this with an Aave `supply()` calldata batch — that step is
 * straightforward to add once the cross-chain leg is verified end-to-end.
 *
 * The returned transaction has `userOps` that may carry an EIP-7702 auth
 * requirement on first use per chain; the caller is responsible for handling
 * that via `handleEIP7702Authorizations` and forwarding the result to
 * `ua.sendTransaction(transaction, signature, authorizations)`.
 */
export async function createEarnTransaction({
  ua,
  mood,
  amountInUSD,
}: {
  ua: UniversalAccount;
  mood: MoodId;
  amountInUSD: string;
}) {
  // Mood routing: Chill stays on Base (lowest-fee blue-chip lending).
  // Boost goes to Arbitrum where Pendle / advanced strategies live.
  const target = mood === "boost" ? YIELD_TARGETS.arbitrum : YIELD_TARGETS.base;

  const transaction = await ua.createTransferTransaction({
    token: {
      chainId: target.chainId,
      address: target.usdc,
    },
    amount: amountInUSD,
    receiver: target.aavePool,
  });

  return {
    transaction,
    description: `Move $${amountInUSD} USDC → ${target.name} yield strategy`,
    target,
  };
}
