"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

type SaveDateGateValue = {
  envelopeOpen: boolean;
  setEnvelopeOpen: (open: boolean) => void;
};

const SaveDateGateContext = createContext<SaveDateGateValue | null>(null);

/** Tracks whether the Save The Date envelope has been opened (for footer reveal). */
export function SaveDateGateProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [envelopeOpen, setEnvelopeOpenState] = useState(false);

  useEffect(() => {
    setEnvelopeOpenState(false);
  }, [pathname]);

  const setEnvelopeOpen = useCallback((open: boolean) => {
    setEnvelopeOpenState(open);
  }, []);

  const value = useMemo(
    () => ({ envelopeOpen, setEnvelopeOpen }),
    [envelopeOpen, setEnvelopeOpen],
  );

  return (
    <SaveDateGateContext.Provider value={value}>
      {children}
    </SaveDateGateContext.Provider>
  );
}

export function useSaveDateGate() {
  const ctx = useContext(SaveDateGateContext);
  if (!ctx) {
    throw new Error("useSaveDateGate must be used within SaveDateGateProvider");
  }
  return ctx;
}
