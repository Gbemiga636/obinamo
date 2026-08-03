"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Very sparse ambient petals — tasteful, not flashy */
export function FallingPetals({ count = 8 }: { count?: number }) {
  const reduce = useReducedMotion();
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${6 + ((i * 23) % 88)}%`,
        delay: (i % 7) * 1.1,
        duration: 18 + (i % 5) * 3,
        size: 5 + (i % 3),
      })),
    [count],
  );

  if (reduce) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[4] overflow-hidden"
      aria-hidden
    >
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-[-8%] rounded-[40%_60%_55%_45%] bg-blush/40"
          style={{ left: p.left, width: p.size, height: p.size * 0.65 }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, 12, -8, 4],
            rotate: [0, 30, -15, 45],
            opacity: [0, 0.55, 0.55, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
