"use client";

import { Button, type ButtonProps } from "@/components/ui/Button";

export function StartEarningButton({
  earning,
  loading,
  onStart,
  onStop,
  disabled,
}: {
  earning: boolean;
  loading: boolean;
  onStart: () => void;
  onStop: () => void;
  disabled?: boolean;
}) {
  if (earning) {
    return (
      <Button variant="ghost" size="lg" fullWidth onClick={onStop}>
        Pause Earning
      </Button>
    );
  }
  const label = loading ? "Sending your money to work…" : "Start Earning →";
  const variant: ButtonProps["variant"] = "aurora";
  return (
    <Button
      variant={variant}
      size="lg"
      fullWidth
      onClick={onStart}
      disabled={disabled || loading}
    >
      {label}
    </Button>
  );
}
