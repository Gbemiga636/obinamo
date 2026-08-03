"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { wedding } from "@/lib/wedding";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, new Date(wedding.date.iso).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown() {
  const [time, setTime] = useState<TimeLeft | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    setTime(getTimeLeft());
    const id = window.setInterval(() => setTime(getTimeLeft()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const items = [
    { label: "Days", value: time?.days ?? 0 },
    { label: "Hours", value: time?.hours ?? 0 },
    { label: "Mins", value: time?.minutes ?? 0 },
    { label: "Secs", value: time?.seconds ?? 0 },
  ];

  return (
    <motion.div
      className="mx-auto grid max-w-md grid-cols-4 gap-2 sm:gap-3"
      aria-live="polite"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
      }}
    >
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          className="panel px-2 py-4 text-center sm:py-5"
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
              x: i < 2 ? -12 : 12,
            },
            visible: {
              opacity: 1,
              y: 0,
              x: 0,
              transition: { duration: 0.75, ease: easeOutExpo },
            },
          }}
        >
          <div className="relative h-8 overflow-hidden sm:h-9">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={String(item.value)}
                className="absolute inset-0 flex items-center justify-center font-display text-xl font-bold tabular-nums text-ink sm:text-2xl"
                initial={
                  reduce ? false : { y: 14, opacity: 0 }
                }
                animate={{ y: 0, opacity: 1 }}
                exit={reduce ? undefined : { y: -14, opacity: 0 }}
                transition={{ duration: 0.28, ease: easeOutExpo }}
              >
                {String(item.value).padStart(2, "0")}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="type-eyebrow mt-2 text-[9px] text-dusty-blue">
            {item.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
