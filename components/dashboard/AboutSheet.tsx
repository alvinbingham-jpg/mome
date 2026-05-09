"use client";

import { Wordmark } from "@/components/brand/Wordmark";
import {
  ExternalIcon,
  ShieldIcon,
  SparkleIcon,
  FingerprintIcon,
} from "@/components/icons/Icons";

const STACK = [
  {
    name: "Particle Universal Accounts",
    role: "One account, many chains. Routes value automatically across EVM + Solana.",
    href: "https://particle.network/",
  },
  {
    name: "EIP-7702",
    role: "Lets a regular EOA act as a smart account. No upgrade, no separate contract.",
    href: "https://eips.ethereum.org/EIPS/eip-7702",
  },
  {
    name: "Magic embedded wallet",
    role: "Biometric / email / social auth. No seed phrase, no extension required.",
    href: "https://magic.link/",
  },
  {
    name: "ZeroDev paymaster",
    role: "Sponsors gas so the user never sees a wallet pop-up asking for ETH.",
    href: "https://zerodev.app/",
  },
];

const PRINCIPLES = [
  {
    icon: SparkleIcon,
    title: "Chains disappear, yield appears",
    body: "Quiet Mode hides every chain, protocol, and token name. One balance, one mood.",
  },
  {
    icon: ShieldIcon,
    title: "Self-custody by default",
    body: "Mome never holds your funds. Your keys live in a Magic embedded wallet.",
  },
  {
    icon: FingerprintIcon,
    title: "One signature per chain, ever",
    body: "EIP-7702 delegation is a one-time, revocable signature \u2014 not an approval.",
  },
];

/** "About Mome" sheet content — explains the philosophy + tech stack inline. */
export function AboutSheet() {
  return (
    <div className="space-y-6">
      <div className="rounded-[24px] aurora p-[1px]">
        <div className="rounded-[23px] bg-mome-cream p-5 grain relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-30 aurora blur-3xl pointer-events-none" />
          <Wordmark size="md" />
          <p className="font-display text-[22px] font-semibold tracking-tight text-mome-forest mt-2 leading-tight">
            Chains disappear.{" "}
            <span className="aurora-text">Yield appears.</span>
          </p>
          <p className="text-[12.5px] text-mome-forest/65 mt-2 leading-snug">
            Built for the UXmaxx hackathon to prove a single thesis: the
            crypto infrastructure is finally ready to be invisible to the
            people using it.
          </p>
        </div>
      </div>

      <section>
        <h3 className="text-[11px] uppercase tracking-[0.14em] font-semibold text-mome-forest/55 mb-2 px-1">
          Principles
        </h3>
        <ul className="space-y-2">
          {PRINCIPLES.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="flex items-start gap-3 rounded-[18px] bg-mome-white border border-mome-forest/8 px-4 py-3"
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-mome-forest text-mome-mint grid place-items-center">
                <Icon className="w-4 h-4" />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-mome-forest leading-tight">
                  {title}
                </p>
                <p className="text-[12px] text-mome-forest/60 leading-snug mt-0.5">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-[11px] uppercase tracking-[0.14em] font-semibold text-mome-forest/55 mb-2 px-1">
          Built on
        </h3>
        <ul className="space-y-1.5">
          {STACK.map(({ name, role, href }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="block rounded-[16px] bg-mome-white border border-mome-forest/8 px-4 py-3 hover:border-mome-forest/20 settle"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-semibold text-mome-forest">
                    {name}
                  </p>
                  <ExternalIcon className="w-3.5 h-3.5 text-mome-forest/40" />
                </div>
                <p className="text-[12px] text-mome-forest/60 leading-snug mt-0.5">
                  {role}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-[10.5px] text-mome-forest/45 text-center pb-4 tracking-wide">
        Mome /mo&#650;m/ &mdash; rhymes with home.
      </p>
    </div>
  );
}
