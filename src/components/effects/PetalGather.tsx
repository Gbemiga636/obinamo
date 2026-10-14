"use client";

import { useId, useMemo, useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Shape = "heart" | "ring" | "bloom";
type Wind = "left" | "right" | "up";

const PETAL_COLORS = [
  ["#f3dcd4", "#d9a9a0"],
  ["#f6ead0", "#e2c38a"],
  ["#fbefe9", "#e2c2b8"],
  ["#f1d7c9", "#c98f78"],
] as const;

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function targetFor(shape: Shape, t: number, w: number, h: number) {
  if (shape === "heart") {
    const a = t * Math.PI * 2;
    const x = 16 * Math.sin(a) ** 3;
    const y =
      13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a);
    return { x: (x / 17) * (w / 2), y: (-y / 17) * (h / 2) + h * 0.04, r: 0 };
  }
  const a = t * Math.PI * 2 - Math.PI / 2;
  if (shape === "ring") {
    return { x: Math.cos(a) * (w / 2), y: Math.sin(a) * (h / 2), r: (a * 180) / Math.PI + 90 };
  }
  const radius = Math.min(w, h) * 0.25;
  return {
    x: Math.cos(a) * radius,
    y: Math.sin(a) * radius,
    r: (a * 180) / Math.PI + 90,
  };
}

/**
 * Petals and gold sparkles drift in, gather into a shape, then a breeze
 * carries them away — on a gentle loop while in view.
 */
export function PetalGather({
  shape = "heart",
  wind = "right",
  petals = 18,
  sparkles = 8,
  width = 220,
  height = 190,
  seed = 7,
  cycle = 9,
  className,
  children,
}: {
  children?: ReactNode;
  shape?: Shape;
  wind?: Wind;
  petals?: number;
  sparkles?: number;
  width?: number;
  height?: number;
  seed?: number;
  cycle?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const reduce = useReducedMotion();
  const gradientId = useId().replace(/:/g, "");

  const items = useMemo(() => {
    const rand = seeded(seed * 9973);
    const total = petals + sparkles;
    const windX = wind === "left" ? -1 : wind === "right" ? 1 : 0;

    return Array.from({ length: total }, (_, i) => {
      const isPetal = i < petals;
      const t = isPetal ? i / petals : (i - petals + 0.5) / sparkles;
      const target = targetFor(shape, t, width, height);
      const scatter = Math.max(width, height) * (1.1 + rand() * 0.8);
      const angle = rand() * Math.PI * 2;
      const inward = isPetal ? 1 : 0.55;

      return {
        id: i,
        isPetal,
        color: PETAL_COLORS[i % PETAL_COLORS.length],
        size: isPetal ? 11 + rand() * 9 : 3 + rand() * 3,
        tx: target.x * inward,
        ty: target.y * inward,
        tr: shape === "heart" ? rand() * 70 - 35 : target.r,
        sx: Math.cos(angle) * scatter,
        sy: Math.sin(angle) * scatter - height * 0.3,
        sz: -160 + rand() * 120,
        sr: rand() * 360,
        srx: rand() * 180 - 90,
        sry: rand() * 180 - 90,
        ex:
          target.x +
          (windX !== 0 ? windX * (width * 1.6 + rand() * width) : rand() * 160 - 80),
        ey: target.y - (wind === "up" ? height * 1.5 + rand() * height : rand() * 160 + 20),
        ez: 60 + rand() * 180,
        er: rand() * 540 - 270,
        erx: rand() * 360 - 180,
        ery: rand() * 360 - 180,
        delay: rand() * 0.6,
      };
    });
  }, [shape, wind, petals, sparkles, width, height, seed]);

  return (
    <div
      ref={ref}
      className={cn("pointer-events-none relative", className)}
      style={{ width, height, perspective: 900 }}
      aria-hidden
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          {PETAL_COLORS.map(([from, to], i) => (
            <radialGradient
              key={i}
              id={`${gradientId}-${i}`}
              cx="35%"
              cy="25%"
              r="85%"
            >
              <stop offset="0%" stopColor={from} />
              <stop offset="100%" stopColor={to} />
            </radialGradient>
          ))}
        </defs>
      </svg>

      <motion.span
        className="absolute left-1/2 top-1/2 -ml-16 -mt-16 h-32 w-32 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(232,213,163,0.45), rgba(232,213,163,0) 70%)",
        }}
        animate={
          inView && !reduce
            ? { opacity: [0, 0, 0.9, 0], scale: [0.6, 0.6, 1.15, 1.4] }
            : { opacity: reduce ? 0.6 : 0 }
        }
        transition={
          inView && !reduce
            ? {
                duration: cycle,
                times: [0, 0.3, 0.55, 0.8],
                repeat: Infinity,
                repeatDelay: 1.4,
              }
            : { duration: 0.4 }
        }
      />

      {children ? (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      ) : null}

      <div className="absolute left-1/2 top-1/2" style={{ transformStyle: "preserve-3d" }}>
        {items.map((p) => {
          const gathered = {
            x: p.tx,
            y: p.ty,
            z: 0,
            rotateZ: p.tr,
            rotateX: 0,
            rotateY: 0,
            opacity: 1,
            scale: 1,
          };

          const animate = reduce
            ? gathered
            : inView
              ? {
                  x: [p.sx, p.tx, p.tx, p.ex],
                  y: [p.sy, p.ty, p.ty + 3, p.ey],
                  z: [p.sz, 0, 0, p.ez],
                  rotateZ: [p.sr, p.tr, p.tr + 6, p.er],
                  rotateX: [p.srx, 0, 8, p.erx],
                  rotateY: [p.sry, 0, -8, p.ery],
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1, 1, 0.7],
                }
              : { opacity: 0 };

          return (
            <motion.span
              key={p.id}
              className="absolute block"
              style={{
                width: p.size,
                height: p.isPetal ? p.size * 1.3 : p.size,
                marginLeft: -p.size / 2,
                marginTop: p.isPetal ? -(p.size * 1.3) / 2 : -p.size / 2,
                transformStyle: "preserve-3d",
              }}
              initial={false}
              animate={animate}
              transition={
                reduce || !inView
                  ? { duration: reduce ? 0 : 0.4 }
                  : {
                      duration: cycle,
                      times: [0, 0.36, 0.6, 1],
                      ease: ["easeOut", "easeInOut", "easeIn"],
                      repeat: Infinity,
                      repeatDelay: 1.4,
                      delay: p.delay,
                    }
              }
            >
              {p.isPetal ? (
                <svg viewBox="0 0 24 31" className="h-full w-full drop-shadow-[0_2px_3px_rgba(92,58,31,0.18)]">
                  <path
                    d="M12 0.5C19.5 6 22.5 17 12 30.5C1.5 17 4.5 6 12 0.5Z"
                    fill={`url(#${gradientId}-${p.id % PETAL_COLORS.length})`}
                  />
                  <path
                    d="M12 3.5C12.6 12 12.4 20 12 27"
                    stroke="rgba(255,255,255,0.45)"
                    strokeWidth="0.8"
                    fill="none"
                  />
                </svg>
              ) : (
                <span className="block h-full w-full rounded-full bg-[#e8d5a3] shadow-[0_0_8px_2px_rgba(232,213,163,0.85)]" />
              )}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
