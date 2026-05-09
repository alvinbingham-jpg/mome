import { cn } from "@/lib/utils";

/**
 * Mome wordmark — primary visual identifier.
 * The "o" carries the aurora gradient as the brand's single magic-moment
 * surface; everything else stays calm Brunswick green on cream.
 */
export function Wordmark({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizeClass =
    size === "sm"
      ? "text-2xl"
      : size === "md"
      ? "text-3xl"
      : size === "lg"
      ? "text-5xl"
      : "text-7xl";

  return (
    <span
      className={cn(
        "font-display font-semibold tracking-[-0.04em] inline-flex items-baseline text-mome-forest",
        sizeClass,
        className
      )}
      aria-label="Mome"
    >
      <span>m</span>
      <span className="aurora-text">o</span>
      <span>me</span>
    </span>
  );
}
