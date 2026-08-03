"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type Particle = {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
};

/** Soft ambient dust — very subtle, low count, no big travel. */
export function FloatingParticles({ count = 12 }: { count?: number }) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${8 + ((i * 17) % 84)}%`,
        top: `${10 + ((i * 23) % 75)}%`,
        size: 1.5 + (i % 3),
        delay: (i % 6) * 0.6,
        duration: 8 + (i % 5),
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-warm-gold/35"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{ opacity: [0.15, 0.55, 0.15], y: [0, -10, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
