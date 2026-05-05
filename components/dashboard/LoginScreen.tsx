"use client";

import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/brand/Wordmark";
import {
  ArrowRightIcon,
  FingerprintIcon,
  GoogleIcon,
  MailIcon,
  ShieldIcon,
} from "@/components/icons/Icons";

const VALUE_PROPS = [
  {
    icon: ShieldIcon,
    title: "Self-custody, by design",
    body: "EIP-7702 lets your account act as a smart account without giving up the keys.",
  },
  {
    icon: FingerprintIcon,
    title: "No seed phrase",
    body: "Magic embedded wallet uses biometric or email auth. No words to memorize.",
  },
];

/**
 * Pre-auth landing inside the phone frame.
 *
 * Renders when no session is live. The aurora-gradient CTA opens Magic's
 * hosted login UI — the same primitive that handles social, email, and
 * biometric auth.
 */
export function LoginScreen({
  signingIn,
  onSignIn,
  onContinueDemo,
  demoOnly,
}: {
  signingIn: boolean;
  onSignIn: () => void;
  onContinueDemo?: () => void;
  demoOnly: boolean;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-[28px] aurora p-[1px] shadow-[0_24px_60px_-12px_rgba(136,227,162,0.4)]">
        <div className="rounded-[27px] bg-mome-cream p-6 grain relative overflow-hidden">
          <div className="absolute -top-12 -right-10 w-40 h-40 rounded-full opacity-30 aurora blur-3xl pointer-events-none" />
          <Wordmark size="lg" />
          <h1 className="font-display text-[32px] leading-[1.05] font-semibold tracking-[-0.025em] text-mome-forest mt-4 max-w-[18ch]">
            Chains disappear.{" "}
            <span className="aurora-text">Yield appears.</span>
          </h1>
          <p className="text-[13px] text-mome-forest/65 mt-2 leading-snug max-w-[28ch]">
            One balance. One mood. We hide the chains, never your money.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Button
          variant="aurora"
          size="lg"
          fullWidth
          onClick={onSignIn}
          disabled={signingIn || demoOnly}
          className="!rounded-pill h-14"
        >
          <FingerprintIcon className="w-4 h-4" />
          {signingIn ? "Opening Magic…" : "Continue with biometrics"}
          <ArrowRightIcon className="w-4 h-4" />
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={onSignIn}
            disabled={signingIn || demoOnly}
            className="!rounded-pill !bg-mome-cream-warm hover:!bg-mome-whisper text-mome-forest"
          >
            <GoogleIcon /> Google
          </Button>
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={onSignIn}
            disabled={signingIn || demoOnly}
            className="!rounded-pill !bg-mome-cream-warm hover:!bg-mome-whisper text-mome-forest"
          >
            <MailIcon className="w-4 h-4" /> Email
          </Button>
        </div>

        {demoOnly && onContinueDemo && (
          <button
            type="button"
            onClick={onContinueDemo}
            className="w-full mt-2 text-[12px] text-mome-forest/65 hover:text-mome-forest settle py-2"
          >
            Magic isn&rsquo;t configured · continue in demo mode
          </button>
        )}
      </div>

      <ul className="space-y-2.5">
        {VALUE_PROPS.map(({ icon: Icon, title, body }) => (
          <li
            key={title}
            className="flex items-start gap-3 rounded-[20px] bg-mome-white border border-mome-forest/8 px-4 py-3"
          >
            <span className="shrink-0 w-8 h-8 rounded-full bg-mome-forest text-mome-mint grid place-items-center">
              <Icon className="w-4 h-4" />
            </span>
            <div>
              <p className="text-[13px] font-semibold text-mome-forest">
                {title}
              </p>
              <p className="text-[12px] text-mome-forest/60 leading-snug">
                {body}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <p className="text-[10.5px] text-mome-forest/50 text-center pt-1 pb-4 tracking-wide">
        Built on Particle Universal Accounts · EIP-7702 · Magic embedded wallet
      </p>
    </div>
  );
}
