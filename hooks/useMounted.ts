"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` once the component has mounted on the client.
 *
 * Use this to gate values that depend on the current time so the SSR and
 * first client render produce identical HTML. Otherwise React reports a
 * hydration mismatch warning.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
