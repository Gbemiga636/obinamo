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

type SoundContextValue = {
  muted: boolean;
  unlocked: boolean;
  toggleMuted: () => void;
  /** Unmute + mark audio ready (call from user gesture) */
  startExperienceAudio: () => void;
  play: (name: SoundName) => void;
};

export type SoundName = "seal" | "paper" | "sparkle" | "type";

const SoundContext = createContext<SoundContextValue | null>(null);
const STORAGE_KEY = "obinamo-sound-muted";

export function SoundProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(true);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    // Start muted each visit until experience begins
    setMuted(true);
  }, []);

  const toggleMuted = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      if (!next) setUnlocked(true);
      return next;
    });
  }, []);

  const startExperienceAudio = useCallback(() => {
    setMuted(false);
    setUnlocked(true);
    localStorage.setItem(STORAGE_KEY, "0");
  }, []);

  const play = useCallback(
    (name: SoundName) => {
      if (muted || typeof window === "undefined") return;
      setUnlocked(true);

      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const gain = ctx.createGain();
      gain.connect(ctx.destination);

      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      osc.connect(filter);
      filter.connect(gain);

      if (name === "seal") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.25);
        filter.frequency.value = 800;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (name === "paper") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.linearRampToValueAtTime(220, now + 0.5);
        filter.frequency.value = 1200;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.035, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.65);
      } else if (name === "sparkle") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1760, now + 0.2);
        filter.frequency.value = 4000;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.04, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.35);
      } else {
        osc.type = "square";
        osc.frequency.value = 640;
        filter.frequency.value = 1800;
        gain.gain.setValueAtTime(0.012, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.06);
      }

      window.setTimeout(() => void ctx.close(), 800);
    },
    [muted],
  );

  const value = useMemo(
    () => ({ muted, unlocked, toggleMuted, startExperienceAudio, play }),
    [muted, unlocked, toggleMuted, startExperienceAudio, play],
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}
