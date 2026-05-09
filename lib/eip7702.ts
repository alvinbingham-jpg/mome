import { Signature } from "ethers";

/**
 * EIP-7702 authorization helper.
 *
 * On the first transaction per chain, Universal Accounts SDK returns userOps
 * that need a 7702 authorization signature from the user's EOA. This helper
 * iterates the userOps, signs once per nonce, and returns the array of
 * authorizations for `ua.sendTransaction(transaction, signature, authorizations)`.
 *
 * `signAuthorizationFn` is wallet-provider-agnostic: in Mome we wire it to
 * Magic's `wallet.sign7702Authorization`, but the same shape works for any
 * provider that exposes a 7702 signer (Privy, viem walletClient, etc).
 *
 * Adapted from Particle Network's reference implementation (MIT license).
 */
export type EIP7702Authorization = {
  userOpHash: string;
  signature: string;
};

export type UserOp = {
  userOpHash: string;
  eip7702Auth?: {
    address: string;
    chainId: number;
    nonce: number;
  };
  eip7702Delegated?: boolean;
};

export type SignAuthorizationFn = (params: {
  contractAddress: `0x${string}`;
  chainId: number;
  nonce: number;
}) => Promise<{
  r: string;
  s: string;
  v?: bigint | number;
  yParity?: 0 | 1 | number;
}>;

export async function handleEIP7702Authorizations(
  userOps: UserOp[],
  signAuthorization: SignAuthorizationFn
): Promise<EIP7702Authorization[]> {
  const authorizations: EIP7702Authorization[] = [];
  const nonceMap = new Map<number, string>();

  for (const userOp of userOps) {
    if (!userOp.eip7702Auth || userOp.eip7702Delegated) continue;

    let signatureSerialized = nonceMap.get(userOp.eip7702Auth.nonce);

    if (!signatureSerialized) {
      const auth = await signAuthorization({
        contractAddress: userOp.eip7702Auth.address as `0x${string}`,
        chainId: Number(userOp.eip7702Auth.chainId),
        nonce: userOp.eip7702Auth.nonce,
      });

      // Magic returns v ∈ {27, 28}; viem/Privy return yParity ∈ {0, 1}.
      // Normalize to a yParity the ethers Signature constructor accepts.
      const yParity =
        auth.yParity !== undefined
          ? (Number(auth.yParity) as 0 | 1)
          : auth.v !== undefined
          ? ((Number(auth.v) - 27) as 0 | 1)
          : 0;

      const sig = Signature.from({
        r: auth.r,
        s: auth.s,
        v: auth.v !== undefined ? BigInt(auth.v) : BigInt(yParity + 27),
        yParity,
      });
      signatureSerialized = sig.serialized;
      nonceMap.set(userOp.eip7702Auth.nonce, signatureSerialized);
    }

    authorizations.push({
      userOpHash: userOp.userOpHash,
      signature: signatureSerialized,
    });
  }

  return authorizations;
}
