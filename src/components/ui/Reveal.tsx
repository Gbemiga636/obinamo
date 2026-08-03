"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { easeSmooth, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type From = "left" | "right" | "up" | "down" | "scale" | "fade";

const offsets: Record<
  From,
  { x?: number; y?: number; scale?: number; opacity?: number }
> = {
  left: { x: -28, opacity: 0 },
  right: { x: 28, opacity: 0 },
  up: { y: 22, opacity: 0 },
  down: { y: -18, opacity: 0 },
  scale: { scale: 0.94, opacity: 0 },
  fade: { opacity: 0 },
};

type Props = {
  children: ReactNode;
  from?: From;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
} & Omit<
  HTMLMotionProps<"div">,
  "children" | "initial" | "animate" | "whileInView"
>;

/** Scroll-triggered reveal — soft travel, long glide */
export function Reveal({
  children,
  from = "up",
  delay = 0,
  duration = 1.25,
  className,
  once = true,
  ...rest
}: Props) {
  const reduce = useReducedMotion();
  const hidden = offsets[from];

  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? false : hidden}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={once ? viewportOnce : { once: false, margin: "-10%" }}
      transition={{ duration, delay, ease: easeSmooth }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Soft perpetual float — vertical only, no wobbly rotate */
export function Float({
  children,
  className,
  amplitude = 6,
  duration = 6.5,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [0, -amplitude, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
