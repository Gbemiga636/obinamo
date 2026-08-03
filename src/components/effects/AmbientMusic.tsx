"use client";

import { useEffect, useRef } from "react";
import { useSound } from "@/providers/SoundProvider";

/** Seconds before the track end to cut and restart the loop */
const LOOP_EARLY_SECONDS = 5;

/**
 * Ambient track — soft-loops: cuts ~5s before the end, restarts cleanly.
 */
export function AmbientMusic() {
  const { muted } = useSound();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/sounds/ambient.mp3");
    // Custom early-loop (not native loop) so we skip the last ~5 seconds
    audio.loop = false;
    audio.volume = 0.32;
    audio.preload = "auto";
    audioRef.current = audio;

    const onTimeUpdate = () => {
      const duration = audio.duration;
      if (!Number.isFinite(duration) || duration <= LOOP_EARLY_SECONDS + 1) {
        return;
      }
      if (audio.currentTime >= duration - LOOP_EARLY_SECONDS) {
        audio.currentTime = 0;
        if (!audio.paused) {
          void audio.play().catch(() => undefined);
        }
      }
    };

    // Safety: if track somehow ends, restart
    const onEnded = () => {
      audio.currentTime = 0;
      void audio.play().catch(() => undefined);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      audio.pause();
      return;
    }
    void audio.play().catch(() => undefined);
  }, [muted]);

  return null;
}
