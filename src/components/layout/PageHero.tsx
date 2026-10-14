"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { LogoMark } from "@/components/ui/LogoMark";
import {
  GoldArch,
  GoldDiamond,
  GoldHeart,
  GoldHeartDivider,
} from "@/components/ui/GoldOrnaments";
import { useInvitation } from "@/providers/InvitationProvider";
import { easeSmooth } from "@/lib/motion";

const FLOATS = [
  { kind: "heart", x: "7%", y: "26%", delay: 0.6, dur: 7.8 },
  { kind: "diamond", x: "90%", y: "22%", delay: 1.1, dur: 8.4 },
  { kind: "diamond", x: "10%", y: "68%", delay: 1.6, dur: 8.1 },
  { kind: "heart", x: "88%", y: "62%", delay: 0.9, dur: 7.4 },
] as const;

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  scrollTarget,
  scrollLabel,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
  scrollTarget: string;
  scrollLabel: string;
}) {
  const reduce = useReducedMotion();
  const { unlocked } = useInvitation();

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: unlocked || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 1.1, ease: easeSmooth, delay },
  });

  return (
    <section className="relative px-4 pb-4 pt-28 sm:pt-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(255,255,255,0.6), transparent 70%)",
        }}
      />

      {unlocked && !reduce ? (
        <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden>
          {FLOATS.map((f, i) => (
            <div
              key={i}
              className="hero-float absolute"
              style={{
                left: f.x,
                top: f.y,
                animationDelay: `${f.delay}s`,
                animationDuration: `${f.dur}s`,
              }}
            >
              {f.kind === "heart" ? <GoldHeart size={13} /> : <GoldDiamond />}
            </div>
          ))}
        </div>
      ) : null}

      <div className="relative mx-auto max-w-[min(100%,440px)] text-center sm:max-w-[480px]">
        <div className="pointer-events-none absolute -inset-x-1 -top-3 bottom-0 sm:-inset-x-8 sm:-top-6">
          <GoldArch className="h-full w-full max-w-none opacity-85" />
        </div>

        <div className="relative px-6 pb-10 pt-9 sm:px-10 sm:pt-12">
          <motion.div className="mb-5 flex justify-center" {...rise(0.1)}>
            <div className="rounded-full border border-soft-gold/45 bg-paper/80 p-1 shadow-[var(--shadow-md)]">
              <LogoMark size={48} className="h-11 w-11 sm:h-12 sm:w-12" />
            </div>
          </motion.div>

          <motion.p className="type-eyebrow" {...rise(0.25)}>
            {eyebrow}
          </motion.p>

          <motion.h1
            className="type-script mt-3 text-[clamp(2.6rem,11vw,4.3rem)] text-ink"
            {...rise(0.4)}
          >
            {title}
          </motion.h1>

          <motion.p
            className="mt-3 font-display text-[11px] font-bold uppercase tracking-[0.34em] text-caramel sm:text-xs"
            {...rise(0.55)}
          >
            {subtitle}
          </motion.p>

          <motion.div className="mt-6" {...rise(0.7)}>
            <GoldHeartDivider />
          </motion.div>

          {children ? (
            <motion.div
              className="mx-auto mt-5 max-w-[30ch] font-serif text-[15px] leading-relaxed text-ink-soft/80 sm:text-base"
              {...rise(0.85)}
            >
              {children}
            </motion.div>
          ) : null}

          <motion.button
            type="button"
            onClick={() =>
              document
                .getElementById(scrollTarget)
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="mx-auto mt-7 flex flex-col items-center gap-1 text-cognac/80 transition hover:text-cognac"
            {...rise(1)}
          >
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.24em]">
              {scrollLabel}
            </span>
            <ChevronDown className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
