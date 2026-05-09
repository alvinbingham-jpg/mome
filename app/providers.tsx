"use client";

/**
 * Magic SDK doesn't require a React context provider — the singleton in
 * `lib/magic.ts` is created lazily on the client. This component is kept as
 * a placeholder so future providers (e.g. analytics, theme, Sentry) can be
 * added without restructuring the layout.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
