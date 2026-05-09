"use client";

import { useSyncExternalStore } from "react";

/**
 * Returns `true` once the component has mounted on the client, `false`
 * during SSR / first render.
 *
 * Use this to gate values that depend on the current time so the SSR HTML
 * and the first client render produce identical markup. Otherwise React
 * reports a hydration mismatch warning.
 *
 * Implemented with `useSyncExternalStore` so the snapshot diverges between
 * server (false) and client (true) without ever calling `setState` inside
 * an effect.
 */
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function useMounted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
