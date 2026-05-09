# Mome

> **Chains disappear. Yield appears.**
>
> The savings app where DeFi got out of the way. One balance. One mood. Yield, quietly.

Mome is a consumer-grade savings UX built on top of [Particle Network's Universal Accounts](https://developers.particle.network/universal-accounts/cha/overview) in EIP-7702 mode, using [Magic](https://magic.link) for the embedded wallet. Users sign in once, see one number, and tap "Start Earning". Under the hood, Universal Accounts route stablecoins across chains; Magic's native EIP-7702 signer handles authorization so the user never sees a chain selector, gas prompt, or token approval modal.

Built for the [UXmaxx Hackathon](https://particle.network) by Particle Network.

## What's inside

| Surface | What it does |
| --- | --- |
| **Landing page** (`/`) | Hero with the locked tagline, three-step "How it works", footer with self-custody disclosure. |
| **Quiet Mode toggle** | Hides every crypto vocabulary token (chain, protocol, address) by default. Toggle off to reveal everything. |
| **Mood selector** | Chill *(Stable)* / Balanced *(Smart Blend)* / Boost *(Higher Yield)* — risk vibes with regulator-friendly sublabels. |
| **Balance card** | Unified USD balance from `UniversalAccount.getPrimaryAssets()`, with a per-second compounding simulation while earning. |
| **Start Earning** | Builds a `createTransferTransaction` via the UA SDK, handles EIP-7702 authorization on first use per chain, signs once, broadcasts cross-chain. |
| **Show Details** | Reveals the per-chain asset breakdown, mood protocol disclosure, EOA + UA addresses, and last tx hash. |

## Tech stack

- **Next.js 16** + React 19 (App Router, client components for Magic / UA flows)
- **Tailwind CSS v4** with brand tokens in `app/globals.css`
- **`@particle-network/universal-account-sdk`** in EIP-7702 mode
- **`magic-sdk`** for embedded wallet + native `wallet.sign7702Authorization`
- **`viem`** + **`ethers` v6** for signature handling and provider plumbing

## Getting started

```bash
# install
npm install

# configure
cp .env.local.example .env.local
# then fill in your Particle + Privy keys

# run
npm run dev
```

Required environment variables (see `.env.local.example`):

| Var | Source |
| --- | --- |
| `NEXT_PUBLIC_PARTICLE_PROJECT_ID` | Particle Dashboard |
| `NEXT_PUBLIC_PARTICLE_CLIENT_KEY` | Particle Dashboard |
| `NEXT_PUBLIC_PARTICLE_APP_ID` | Particle Dashboard |
| `NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY` | Magic Dashboard |

If credentials are missing, the `/app` route renders a "Configure credentials" panel so the build still passes.

## How EIP-7702 mode works here

```
1. Magic provisions an embedded EOA on first sign-in (email / social, no seed)
2. UniversalAccount is instantiated against that EOA in EIP-7702 mode
3. createTransferTransaction returns userOps
4. For first-use-per-chain ops, Magic's wallet.sign7702Authorization signs
   the delegation; the signature is normalized + serialized via ethers.Signature
5. The user signs the rootHash once; UA broadcasts the bundle cross-chain
```

The `lib/eip7702.ts` helper handles step 4 for you, including nonce caching so we never prompt the same authorization twice. The signer interface is wallet-provider-agnostic, so swapping Magic for Privy / Openfort / a viem walletClient is a one-line change in `hooks/useMagicAuth.ts`.

## Brand

| Token | Value | Use |
| --- | --- | --- |
| `mome-forest` | `#16433D` | Primary text, deep surfaces, trust |
| `mome-mint` | `#88E3A2` | Action accents, success |
| `mome-cream` | `#F6FFF8` | Background warmth — distinguishes Mome from generic mint-green fintech |
| `mome-aurora` | `mint → lilac → coral` gradient | Hero CTA + magic-moment surfaces only |

Display: **Bricolage Grotesque** (free Google Font, replaces paid Poly Sans).
Body: **Inter**. All `$` figures use tabular nums.

The full brand strategy lives in `mome-brand/MOME_BRAND_KIT_v9.md` (separate from this repo).

## License

MIT — `lib/eip7702.ts` is adapted from [Particle Network's reference implementation](https://github.com/Particle-Network/universal-accounts-7702) under the same license.
