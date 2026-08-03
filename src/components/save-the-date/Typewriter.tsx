"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/providers/SoundProvider";
import { wedding } from "@/lib/wedding";

export function Typewriter({
  lines = wedding.typewriterLines,
  active,
}: {
  lines?: readonly string[];
  active: boolean;
}) {
  const { play, muted } = useSound();
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    let charTimer: number | undefined;
    let pauseTimer: number | undefined;

    const typeLine = (index: number) => {
      if (cancelled) return;
      if (index >= lines.length) {
        setDone(true);
        return;
      }
      const line = lines[index];
      setLineIndex(index);
      setText("");
      let char = 0;

      const tick = () => {
        if (cancelled) return;
        char += 1;
        setText(line.slice(0, char));
        if (!muted && char % 3 === 0) play("type");
        if (char < line.length) {
          charTimer = window.setTimeout(tick, 55);
        } else {
          pauseTimer = window.setTimeout(() => typeLine(index + 1), 1000);
        }
      };
      charTimer = window.setTimeout(tick, 250);
    };

    const start = window.setTimeout(() => typeLine(0), 300);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
      if (charTimer) window.clearTimeout(charTimer);
      if (pauseTimer) window.clearTimeout(pauseTimer);
    };
  }, [active, lines, muted, play]);

  if (!active) return null;

  return (
    <div className="mx-auto mt-12 min-h-[5.5rem] max-w-md px-4">
      <AnimatePresence mode="wait">
        <motion.p
          key={lineIndex}
          className="font-serif text-xl italic tracking-wide text-mocha/85 sm:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {text}
          {!done ? (
            <span className="cursor-blink ml-0.5 inline-block text-warm-gold">
              |
            </span>
          ) : null}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
