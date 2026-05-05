"use client";

import {
  DepositIcon,
  SendIcon,
  SparkleIcon,
  ScanIcon,
} from "@/components/icons/Icons";
import type { ComponentType } from "react";

type Action = {
  id: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
  onPress: () => void;
};

/**
 * Quick actions rail — the row of icon-pill buttons under the balance hero.
 *
 * Modeled after Cash App / Revolut / Monzo: 4 short verbs, each rendered as
 * a circular icon over a small label. Taps are real and dispatch through
 * the parent: Add money jumps to the deposit tab, Send drops a toast (the
 * feature isn't shipped yet but the affordance must exist), Earn opens the
 * earn flow, Scan drops a toast.
 */
export function QuickActions({
  onAddMoney,
  onSend,
  onEarn,
  onScan,
  earning,
}: {
  onAddMoney: () => void;
  onSend: () => void;
  onEarn: () => void;
  onScan: () => void;
  earning: boolean;
}) {
  const actions: Action[] = [
    { id: "add", label: "Add money", Icon: DepositIcon, onPress: onAddMoney },
    { id: "send", label: "Send", Icon: SendIcon, onPress: onSend },
    {
      id: "earn",
      label: earning ? "Pause" : "Earn",
      Icon: SparkleIcon,
      onPress: onEarn,
    },
    { id: "scan", label: "Scan", Icon: ScanIcon, onPress: onScan },
  ];
  return (
    <div className="grid grid-cols-4 gap-2">
      {actions.map((a) => (
        <button
          key={a.id}
          type="button"
          onClick={a.onPress}
          className="flex flex-col items-center gap-1.5 settle press group"
        >
          <span className="w-12 h-12 rounded-full bg-mome-white border border-mome-forest/8 grid place-items-center text-mome-forest group-hover:bg-mome-cream-warm group-active:scale-95 settle shadow-[0_2px_8px_-3px_rgba(14,17,22,0.1)]">
            <a.Icon className="w-[18px] h-[18px]" />
          </span>
          <span className="text-[11px] font-semibold text-mome-forest/75 tracking-tight">
            {a.label}
          </span>
        </button>
      ))}
    </div>
  );
}
