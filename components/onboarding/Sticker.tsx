"use client";

import type { CSSProperties, ReactNode } from "react";

/**
 * Sticker — base primitive for the onboarding hero.
 *
 * Wraps any visual in a tilted, shadowed, gently-drifting container so the
 * collage feels like real cut-out paper stickers stuck on a phone screen.
 * The drift uses CSS keyframes with a delay seed so multiple stickers don't
 * all move in lockstep.
 */
export function Sticker({
  children,
  className = "",
  rotate = 0,
  driftSeed = 0,
  driftAmplitude = 6,
  shadow = true,
  style,
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
  driftSeed?: number;
  driftAmplitude?: number;
  shadow?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`absolute will-change-transform ${className}`}
      style={
        {
          transform: `rotate(${rotate}deg)`,
          animation: `sticker-drift 7s cubic-bezier(0.45, 0, 0.55, 1) infinite`,
          animationDelay: `${driftSeed * 0.6}s`,
          ["--drift" as string]: `${driftAmplitude}px`,
          ["--rot" as string]: `${rotate}deg`,
          filter: shadow
            ? "drop-shadow(0 14px 22px rgba(14, 17, 22, 0.18)) drop-shadow(0 2px 4px rgba(14, 17, 22, 0.12))"
            : undefined,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
