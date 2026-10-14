"use client";

import { Clapperboard, Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/providers/SoundProvider";

/** Fixed music control — no perpetual motion (keeps scroll smooth) */
export function MusicToggle() {
  const { muted, toggleMuted, media } = useSound();

  const isMuted = media ? media.muted : muted;
  const onClick = media ? media.toggle : toggleMuted;
  const label = media
    ? isMuted
      ? "Film sound off"
      : "Film sound on"
    : isMuted
      ? "Music off"
      : "Music on";

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={!isMuted}
      onClick={onClick}
      className="fixed bottom-5 right-5 z-[80] flex items-center gap-2 rounded-full border border-soft-gold/40 bg-paper/90 px-3.5 py-2.5 text-ink shadow-[0_10px_28px_rgba(42,29,18,0.18)] backdrop-blur-md transition hover:border-soft-gold hover:shadow-[0_14px_32px_rgba(42,29,18,0.22)] sm:bottom-6 sm:right-6"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cognac/10 text-cognac">
        {isMuted ? (
          <VolumeX className="h-4 w-4" />
        ) : media ? (
          <Clapperboard className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </span>
      <span className="pr-1 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">
        {label}
      </span>
    </button>
  );
}
