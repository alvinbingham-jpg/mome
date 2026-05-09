import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "aurora";
type Size = "sm" | "md" | "lg";

const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    "bg-mome-forest text-mome-cream hover:bg-mome-forest-soft active:bg-mome-forest",
  secondary:
    "bg-mome-mint text-mome-forest hover:bg-mome-mint-deep active:bg-mome-mint-deep",
  ghost:
    "bg-transparent text-mome-forest hover:bg-mome-forest/5 active:bg-mome-forest/10",
  aurora:
    "aurora text-mome-forest font-semibold shadow-[0_8px_30px_rgba(136,227,162,0.45)] hover:brightness-105 active:brightness-95",
};

const SIZE_STYLES: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-14 px-7 text-base",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = "primary", size = "md", fullWidth, ...rest },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-pill font-medium tracking-tight settle disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mome-forest/30 focus-visible:ring-offset-2 focus-visible:ring-offset-mome-cream",
          VARIANT_STYLES[variant],
          SIZE_STYLES[size],
          fullWidth && "w-full",
          className
        )}
        {...rest}
      />
    );
  }
);
