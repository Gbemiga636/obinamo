"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type MutableRefObject,
} from "react";

type SoundContextValue = {
  muted: boolean;
  unlocked: boolean;
  /** True after a user gesture primed the audio element */
  primed: boolean;
  toggleMuted: () => void;
  /** Soft-prime from any loader interaction (gesture) */
  primeAudio: () => Promise<void>;
  /** Pause ambient immediately (e.g. entering Save The Date) */
  pauseAmbient: () => void;
  /**
   * Unmute + try to play ambient.
   * Returns true if playback started (or was primed successfully).
   */
  startExperienceAudio: () => Promise<boolean>;
  play: (name: SoundName) => void;
};

export type SoundName = "seal" | "paper" | "sparkle" | "type";

const SoundContext = createContext<SoundContextValue | null>(null);
const STORAGE_KEY = "obinasom-sound-muted";

export function SoundProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [primed, setPrimed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const mutedRef = useRef(true);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    setMuted(true);
    mutedRef.current = true;
    const audio = new Audio("/sounds/ambient.mp3");
    audio.preload = "auto";
    audio.loop = false;
    audio.volume = 0.32;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const ensureCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    if (!ctxRef.current) ctxRef.current = new AC();
    return ctxRef.current;
  }, []);

  const primeAudio = useCallback(async () => {
    const ctx = ensureCtx();
    if (ctx?.state === "suspended") {
      try {
        await ctx.resume();
      } catch {
        /* ignore */
      }
    }
    const audio = audioRef.current;
    if (!audio) return;
    try {
      // Silent play/pause unlocks media autoplay on many browsers
      const prev = audio.volume;
      audio.volume = 0.001;
      await audio.play();
      audio.pause();
      audio.currentTime = 0;
      audio.volume = prev || 0.32;
      setPrimed(true);
    } catch {
      /* still blocked until a clearer gesture */
    }
  }, [ensureCtx]);

  const pauseAmbient = useCallback(() => {
    mutedRef.current = true;
    setMuted(true);
    localStorage.setItem(STORAGE_KEY, "1");
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  const toggleMuted = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      mutedRef.current = next;
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      if (!next) setUnlocked(true);
      return next;
    });
  }, []);

  const startExperienceAudio = useCallback(async () => {
    await primeAudio();
    mutedRef.current = false;
    setMuted(false);
    setUnlocked(true);
    localStorage.setItem(STORAGE_KEY, "0");

    const audio = audioRef.current;
    if (!audio) return primed;

    try {
      audio.volume = 0.32;
      await audio.play();
      setPrimed(true);
      return true;
    } catch {
      return false;
    }
  }, [primeAudio, primed]);

  const play = useCallback(
    (name: SoundName) => {
      if (mutedRef.current || typeof window === "undefined") return;
      setUnlocked(true);

      const ctx = ensureCtx();
      if (!ctx) return;
      void ctx.resume();

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
    },
    [ensureCtx],
  );

  const value = useMemo(
    () => ({
      muted,
      unlocked,
      primed,
      toggleMuted,
      primeAudio,
      pauseAmbient,
      startExperienceAudio,
      play,
    }),
    [
      muted,
      unlocked,
      primed,
      toggleMuted,
      primeAudio,
      pauseAmbient,
      startExperienceAudio,
      play,
    ],
  );

  return (
    <SoundContext.Provider value={value}>
      <AmbientAudioBridge audioRef={audioRef} muted={muted} />
      {children}
    </SoundContext.Provider>
  );
}

/** Keeps early-loop behavior on the shared ambient element */
function AmbientAudioBridge({
  audioRef,
  muted,
}: {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  muted: boolean;
}) {
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const LOOP_EARLY = 5;
    const onTimeUpdate = () => {
      const duration = audio.duration;
      if (!Number.isFinite(duration) || duration <= LOOP_EARLY + 1) return;
      if (audio.currentTime >= duration - LOOP_EARLY) {
        audio.currentTime = 0;
        if (!audio.paused) void audio.play().catch(() => undefined);
      }
    };
    const onEnded = () => {
      audio.currentTime = 0;
      void audio.play().catch(() => undefined);
    };
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [audioRef]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      audio.pause();
      return;
    }
    void audio.play().catch(() => undefined);
  }, [muted, audioRef]);

  return null;
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}
