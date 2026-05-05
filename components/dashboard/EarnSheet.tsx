"use client";

import { useEffect, useMemo } from "react";
import { Sheet } from "@/components/dashboard/Sheet";
import { Button } from "@/components/ui/Button";
import {
  AlertIcon,
  CheckCircleIcon,
  ExternalIcon,
  FingerprintIcon,
  ShieldIcon,
  SparkleIcon,
} from "@/components/icons/Icons";
import { MOODS, type MoodId } from "@/lib/moods";
import { shortAddress } from "@/lib/utils";
import type { EarnState } from "@/hooks/useMomeApp";

type StageKey = "preparing" | "authorizing" | "signing" | "broadcasting" | "earning" | "error";

const STAGE_LABELS: Record<StageKey, { title: string; quietTitle: string; sub: string }> = {
  preparing: {
    title: "Choosing the best strategy",
    quietTitle: "Getting things ready",
    sub: "Pricing routes across chains via UA SDK",
  },
  authorizing: {
    title: "Authorizing your account (EIP-7702)",
    quietTitle: "Waking your account up",
    sub: "One-time signature delegates the EOA to the UA contract",
  },
  signing: {
    title: "Signing the cross-chain bundle",
    quietTitle: "Confirming with you",
    sub: "Magic embedded wallet · biometric or email confirmation",
  },
  broadcasting: {
    title: "Broadcasting through Universal Accounts",
    quietTitle: "Sending your money to work",
    sub: "Bundling and submitting to the destination chain",
  },
  earning: {
    title: "Quietly compounding",
    quietTitle: "Earning. Quietly.",
    sub: "Your money is at work — you can close this sheet.",
  },
  error: {
    title: "Something went wrong",
    quietTitle: "Hmm — try again",
    sub: "Nothing was sent. You can retry safely.",
  },
};

const ORDER: StageKey[] = ["preparing", "authorizing", "signing", "broadcasting", "earning"];

export function EarnSheet({
  open,
  earn,
  mood,
  quiet,
  amountUSD,
  destinationChain,
  onClose,
  onRetry,
}: {
  open: boolean;
  earn: EarnState;
  mood: MoodId;
  quiet: boolean;
  amountUSD: number;
  destinationChain: string;
  onClose: () => void;
  onRetry: () => void;
}) {
  const moodMeta = MOODS[mood];
  const currentStage: StageKey =
    earn.kind === "idle" ? "preparing" : (earn.kind as StageKey);
  const isError = earn.kind === "error";
  const isDone = earn.kind === "earning";

  const stage = STAGE_LABELS[currentStage];

  /** Auto-dismiss the success view after a few seconds so the user lands back on Home. */
  useEffect(() => {
    if (!isDone || !open) return;
    const id = setTimeout(onClose, 5000);
    return () => clearTimeout(id);
  }, [isDone, open, onClose]);

  const txHash = useMemo(() => {
    return earn.kind === "earning" ? earn.txHash : "";
  }, [earn]);

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={isDone ? "Done" : isError ? "Try again" : "Sending your money to work"}
      dismissible={isDone || isError}
    >
      <div className="space-y-5">
        <div className="rounded-2xl bg-mome-forest text-mome-cream p-4 grain relative overflow-hidden">
          <div className="absolute -bottom-16 -right-12 w-44 h-44 rounded-full opacity-40 aurora blur-3xl pointer-events-none" />
          <p className="text-[11px] uppercase tracking-[0.14em] text-mome-mint/90 font-semibold">
            {quiet ? stage.quietTitle : stage.title}
          </p>
          <p className="font-display text-2xl tracking-tight mt-1.5">
            ${amountUSD.toFixed(2)}{" "}
            <span className="text-mome-cream/60 text-base">→ {destinationChain}</span>
          </p>
          <p className="text-[12px] text-mome-cream/70 mt-1 leading-snug">
            {stage.sub}
          </p>
        </div>

        <ol className="space-y-2">
          {ORDER.map((stageKey, i) => {
            const status = stageStatus(currentStage, isError, stageKey);
            return (
              <li
                key={stageKey}
                className="flex items-center gap-3 rounded-2xl border border-mome-forest/8 bg-mome-white px-3 py-2.5 settle"
              >
                <StageIcon status={status} index={i + 1} stageKey={stageKey} />
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-[13px] font-semibold tracking-tight ${
                      status === "active"
                        ? "text-mome-forest"
                        : status === "done"
                        ? "text-mome-forest/80"
                        : "text-mome-forest/45"
                    }`}
                  >
                    {quiet
                      ? STAGE_LABELS[stageKey].quietTitle
                      : STAGE_LABELS[stageKey].title}
                  </p>
                  {status === "active" && (
                    <p className="text-[11px] text-mome-forest/55 fade-in">
                      {STAGE_LABELS[stageKey].sub}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {isError && earn.kind === "error" && (
          <div className="rounded-2xl bg-red-500/5 border border-red-500/20 px-4 py-3 fade-in">
            <div className="flex items-start gap-2">
              <AlertIcon className="w-4 h-4 text-red-700 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-[13px] text-red-800 font-semibold">
                  Nothing was sent
                </p>
                <p className="text-[12px] text-red-700/80 break-words leading-snug mt-0.5">
                  {earn.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {isDone && txHash && !quiet && (
          <a
            href={`https://basescan.org/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            className="block text-center text-[12px] text-mome-forest/65 hover:text-mome-forest settle font-mono fade-in"
          >
            <span className="inline-flex items-center gap-1">
              View on explorer · {shortAddress(txHash, 8, 6)}
              <ExternalIcon className="w-3 h-3" />
            </span>
          </a>
        )}

        {isDone && (
          <Button
            variant="aurora"
            size="lg"
            fullWidth
            onClick={onClose}
            className="!rounded-pill"
          >
            <SparkleIcon className="w-4 h-4" />
            {quiet ? "Done" : `Earning ~${moodMeta.apyHint}% APY · close`}
          </Button>
        )}
        {isError && (
          <div className="flex gap-2">
            <Button variant="ghost" size="lg" fullWidth onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="lg" fullWidth onClick={onRetry}>
              Try again
            </Button>
          </div>
        )}
      </div>
    </Sheet>
  );
}

function stageStatus(
  current: StageKey,
  isError: boolean,
  stage: StageKey
): "done" | "active" | "todo" {
  const i = ORDER.indexOf(stage);
  const ci = ORDER.indexOf(current);
  if (isError) return i < ci ? "done" : i === ci ? "active" : "todo";
  if (i < ci) return "done";
  if (i === ci) return "active";
  return "todo";
}

function StageIcon({
  status,
  index,
  stageKey,
}: {
  status: "done" | "active" | "todo";
  index: number;
  stageKey: StageKey;
}) {
  if (status === "done") {
    return (
      <span className="shrink-0 w-7 h-7 rounded-full bg-mome-mint/20 text-mome-mint-deep grid place-items-center">
        <CheckCircleIcon className="w-4 h-4" />
      </span>
    );
  }
  if (status === "active") {
    if (stageKey === "authorizing") {
      return (
        <span className="shrink-0 w-7 h-7 rounded-full bg-mome-forest text-mome-mint grid place-items-center">
          <ShieldIcon className="w-3.5 h-3.5" />
        </span>
      );
    }
    if (stageKey === "signing") {
      return (
        <span className="shrink-0 w-7 h-7 rounded-full bg-mome-forest text-mome-mint grid place-items-center">
          <FingerprintIcon className="w-3.5 h-3.5" />
        </span>
      );
    }
    return (
      <span className="shrink-0 w-7 h-7 rounded-full bg-mome-forest grid place-items-center">
        <span className="size-3.5 rounded-full border-2 border-mome-mint border-t-transparent spin-ring" />
      </span>
    );
  }
  return (
    <span className="shrink-0 w-7 h-7 rounded-full bg-mome-cream-warm text-mome-forest/45 grid place-items-center text-[11px] font-semibold tabular">
      {index}
    </span>
  );
}
