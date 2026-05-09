"use client";

import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { IosStatusBar } from "@/components/onboarding/IosStatusBar";
import { Sticker } from "@/components/onboarding/Sticker";
import { MomeCardSticker } from "@/components/onboarding/stickers/MomeCardSticker";
import { StablecoinTagSticker } from "@/components/onboarding/stickers/StablecoinTagSticker";
import { QuietModeSticker } from "@/components/onboarding/stickers/QuietModeSticker";
import { ApySticker } from "@/components/onboarding/stickers/ApySticker";
import { StarSticker } from "@/components/onboarding/stickers/StarSticker";
import { ChainClusterSticker } from "@/components/onboarding/stickers/ChainClusterSticker";
import { UsdcCoinSticker } from "@/components/onboarding/stickers/UsdcCoinSticker";
import { NoChainsSticker } from "@/components/onboarding/stickers/NoChainsSticker";

/**
 * Onboarding hero.
 *
 * Inspired by playful native fintech onboarding screens (UglyCash, Cash App's
 * marketing): a chaotic-but-balanced sticker collage with a bold display
 * headline in the middle and a sticky high-contrast CTA at the bottom.
 *
 * Two layers:
 *  1. Background canvas with positioned stickers, drifting gently
 *  2. Headline + CTA glued to the foreground
 *
 * The whole thing renders inside the same phone-frame chrome as the rest
 * of the app so visual continuity is preserved.
 */
export function OnboardingHero() {
  return (
    <div className="min-h-dvh w-full bg-[#EFF4FF] grain relative overflow-hidden">
      {/* Soft gradient sky behind everything */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 12%, rgba(199, 218, 255, 0.85) 0%, rgba(239, 244, 255, 0) 70%)," +
            "radial-gradient(80% 60% at 50% 95%, rgba(255, 220, 215, 0.55) 0%, rgba(239, 244, 255, 0) 70%)",
        }}
      />

      <div className="relative mx-auto md:py-10 md:max-w-[440px] md:min-h-dvh">
        <div className="md:phone-frame md:bg-[#EFF4FF] md:min-h-[820px] flex flex-col min-h-dvh md:min-h-0 relative overflow-hidden">
          <IosStatusBar tone="dark" />

          <header className="px-5 pt-1 pb-2 flex items-center justify-between relative z-20">
            <Wordmark size="md" />
            <Link
              href="/app"
              className="text-[12px] font-semibold text-mome-forest/65 hover:text-mome-forest settle px-3 py-1.5 rounded-pill"
            >
              Skip
            </Link>
          </header>

          {/* Sticker canvas */}
          <div className="relative flex-1 px-4 pt-2 pb-44">
            {/* Stickers — positions are tuned for a 440px phone frame and scale fluidly on small screens */}
            <Sticker
              className="top-[2%] left-[4%]"
              rotate={-14}
              driftSeed={0}
              driftAmplitude={5}
            >
              <MomeCardSticker width={150} />
            </Sticker>

            <Sticker
              className="top-[1%] right-[3%]"
              rotate={11}
              driftSeed={1.2}
              driftAmplitude={6}
            >
              <StablecoinTagSticker width={120} />
            </Sticker>

            <Sticker
              className="top-[19%] left-[6%]"
              rotate={-7}
              driftSeed={0.6}
              driftAmplitude={4}
            >
              <ApySticker apy={12} label="BOOST APY" tone="#C7F560" width={140} />
            </Sticker>

            <Sticker
              className="top-[18%] right-[5%]"
              rotate={9}
              driftSeed={1.8}
              driftAmplitude={5}
            >
              <UsdcCoinSticker width={84} />
            </Sticker>

            <Sticker
              className="bottom-[44%] left-[3%]"
              rotate={-12}
              driftSeed={2.2}
              driftAmplitude={5}
            >
              <ChainClusterSticker />
            </Sticker>

            <Sticker
              className="bottom-[40%] right-[2%]"
              rotate={6}
              driftSeed={2.8}
              driftAmplitude={6}
            >
              <QuietModeSticker width={120} />
            </Sticker>

            <Sticker
              className="bottom-[24%] left-[12%]"
              rotate={-8}
              driftSeed={3.4}
              driftAmplitude={4}
            >
              <StarSticker width={120} />
            </Sticker>

            <Sticker
              className="bottom-[22%] right-[6%]"
              rotate={7}
              driftSeed={4.0}
              driftAmplitude={5}
            >
              <NoChainsSticker width={150} />
            </Sticker>
          </div>

          {/* Headline — sits on top of the sticker canvas */}
          <div className="absolute inset-x-0 top-[40%] -translate-y-1/2 px-7 z-10 pointer-events-none">
            <h1
              className="font-display text-mome-ink leading-[0.92] tracking-[-0.04em] text-center font-bold"
              style={{ fontSize: "clamp(40px, 11vw, 56px)" }}
            >
              YOUR BANK
              <br />
              WON&apos;T
              <br />
              <span className="text-mome-forest">DO THIS.</span>
            </h1>
          </div>

          {/* Sticky CTA */}
          <div className="absolute inset-x-0 bottom-0 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-6 z-30">
            {/* fade gradient under the button so stickers don't fight it */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-44 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(239,244,255,1) 28%, rgba(239,244,255,0.85) 65%, rgba(239,244,255,0) 100%)",
              }}
            />
            <div className="relative space-y-3">
              <Link
                href="/app"
                className="group block w-full rounded-pill bg-mome-ink text-mome-cream py-4 text-center font-semibold tracking-tight settle press hover:bg-[#1a2030]"
                style={{ fontSize: "16px" }}
              >
                <span className="inline-flex items-center gap-2">
                  Get Started
                  <span className="inline-block transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
              <p className="text-center text-[12px] text-mome-forest/65">
                <span className="font-medium">Mome /moʊm/ — rhymes with home.</span>{" "}
                Self-custody. No seed phrase. No gas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
