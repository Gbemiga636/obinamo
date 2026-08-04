"use client";

import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

/** Lightweight CSS petals — no Framer infinite loops fighting scroll */
export function FallingPetals({ count = 5 }: { count?: number }) {
  const reduce = useReducedMotion();
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${8 + ((i * 19) % 84)}%`,
        delay: `${(i % 5) * 2.2}s`,
        duration: `${16 + (i % 4) * 3}s`,
        size: 4 + (i % 3),
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
        <span
          key={p.id}
          className="petal-fall absolute top-[-10%] rounded-[40%_60%_55%_45%] bg-blush/35"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 0.65,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
