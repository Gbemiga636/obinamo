import { useSyncExternalStore } from "react";

let dark = false;
const listeners = new Set<() => void>();

/** Switch the navbar to light-on-dark while it floats over video. */
export function setNavDark(value: boolean) {
  if (dark === value) return;
  dark = value;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useNavDark() {
  return useSyncExternalStore(
    subscribe,
    () => dark,
    () => false,
  );
}
