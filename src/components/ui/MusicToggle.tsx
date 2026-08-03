"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/providers/SoundProvider";

/** Floating music control — bottom right */
export function MusicToggle() {
  const { muted, toggleMuted } = useSound();

  return (
    <motion.button
      type="button"
      aria-label={muted ? "Turn music on" : "Turn music off"}
      aria-pressed={!muted}
      onClick={toggleMuted}
      className="fixed bottom-5 right-5 z-[80] flex items-center gap-2 rounded-full border border-soft-gold/40 bg-paper/90 px-3.5 py-2.5 text-ink shadow-[0_10px_28px_rgba(42,29,18,0.18)] backdrop-blur-md transition hover:border-soft-gold hover:shadow-[0_14px_32px_rgba(42,29,18,0.22)] sm:bottom-6 sm:right-6"
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={{
        opacity: 1,
        y: [0, -5, 0],
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.5, delay: 0.4 },
        scale: { duration: 0.5, delay: 0.4 },
        y: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
      }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cognac/10 text-cognac">
        {muted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </span>
      <span className="pr-1 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">
        {muted ? "Music off" : "Music on"}
      </span>
    </motion.button>
  );
}
