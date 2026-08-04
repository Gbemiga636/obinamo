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

type InvitationContextValue = {
  ready: boolean;
  unlocked: boolean;
  unlocking: boolean;
  beginUnlock: () => void;
  completeUnlock: () => void;
};

const InvitationContext = createContext<InvitationContextValue | null>(null);

export function InvitationProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    // Creative loader on every visit
    setUnlocked(false);
    setReady(true);
  }, []);

  const beginUnlock = useCallback(() => {
    setUnlocking(true);
  }, []);

  const completeUnlock = useCallback(() => {
    setUnlocked(true);
    setUnlocking(false);
  }, []);

  const value = useMemo(
    () => ({ ready, unlocked, unlocking, beginUnlock, completeUnlock }),
    [ready, unlocked, unlocking, beginUnlock, completeUnlock],
  );

  return (
    <InvitationContext.Provider value={value}>
      {children}
    </InvitationContext.Provider>
  );
}

export function useInvitation() {
  const ctx = useContext(InvitationContext);
  if (!ctx) {
    throw new Error("useInvitation must be used within InvitationProvider");
  }
  return ctx;
}
