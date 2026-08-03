"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FloralSide } from "@/components/flowers/FloralSide";
import {
  GoldArch,
  GoldFlourish,
  GoldHeart,
  GoldHeartDivider,
  GoldDiamond,
  GoldRing,
  LoveBurst,
} from "@/components/ui/GoldOrnaments";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { Countdown } from "@/components/hero/Countdown";
import { LogoMark } from "@/components/ui/LogoMark";
import { ComingSoonModal } from "@/components/layout/ComingSoonModal";
import { useInvitation } from "@/providers/InvitationProvider";
import { wedding } from "@/lib/wedding";
import { easeSmooth } from "@/lib/motion";

const FLOATING = [
  { kind: "heart" as const, size: 14, x: "8%", y: "22%", delay: 0.6, dur: 5.2 },
  { kind: "diamond" as const, x: "88%", y: "28%", delay: 0.9, dur: 6 },
  { kind: "ring" as const, x: "12%", y: "58%", delay: 1.1, dur: 5.8 },
  { kind: "heart" as const, size: 11, x: "86%", y: "52%", delay: 0.7, dur: 4.8 },
  { kind: "diamond" as const, x: "18%", y: "38%", delay: 1.3, dur: 6.4 },
  { kind: "heart" as const, size: 9, x: "78%", y: "18%", delay: 1.0, dur: 5.5 },
];

export function HeroSection() {
  const [step, setStep] = useState(0);
  const [soonOpen, setSoonOpen] = useState(false);
  const reduce = useReducedMotion();
  const { unlocked } = useInvitation();

  // Restart the typing sequence when the envelope unlocks
  useEffect(() => {
    if (!unlocked) {
      setStep(0);
      return;
    }
    setStep(reduce ? 4 : 0);
  }, [unlocked, reduce]);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-x-clip">
      <div className="surface-paper absolute inset-0" />
      <div className="surface-grain absolute inset-0" />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 50% 28%, rgba(255,255,255,0.62), transparent 68%)",
        }}
      />
      <div
        className="pointer-events-none absolute -left-24 top-28 z-[1] h-72 w-72 rounded-full opacity-35 blur-3xl"
        style={{ background: "radial-gradient(circle, #E2C2B8, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -right-20 top-36 z-[1] h-80 w-80 rounded-full opacity-28 blur-3xl"
        style={{ background: "radial-gradient(circle, #D4AF37, transparent 70%)" }}
      />

      {/* Soft floating love marks */}
      <div className="pointer-events-none absolute inset-0 z-[12] hidden sm:block" aria-hidden>
        {FLOATING.map((item, i) => (
          <motion.div
            key={i}
            className="absolute opacity-50"
            style={{ left: item.x, top: item.y }}
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            animate={
              reduce
                ? { opacity: 0.45 }
                : {
                    opacity: [0.25, 0.55, 0.25],
                    y: [0, -10, 0],
                    rotate: [0, i % 2 ? 8 : -8, 0],
                  }
            }
            transition={{
              duration: item.dur,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {item.kind === "heart" ? (
              <GoldHeart size={item.size} />
            ) : item.kind === "diamond" ? (
              <GoldDiamond />
            ) : (
              <GoldRing />
            )}
          </motion.div>
        ))}
      </div>

      {/* Center composition — open arch, not a boxed card */}
      <div className="relative z-30 flex flex-1 flex-col items-center justify-center px-3 pb-36 pt-24 sm:px-14 sm:pb-52 sm:pt-28 md:px-24">
        <motion.div
          className="relative mx-auto w-full max-w-[min(100%,440px)] text-center sm:max-w-[480px]"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.35, ease: easeSmooth }}
        >
          {/* Gold arch — wider on mobile so names fit inside */}
          <div className="pointer-events-none absolute -inset-x-1 -top-2 bottom-[-8px] sm:-inset-x-6 sm:-top-6 sm:bottom-0">
            <GoldArch className="h-full w-full max-w-none scale-x-[1.08] opacity-90 sm:scale-x-100" />
          </div>

          <div className="relative px-5 pt-7 sm:px-8 sm:pt-10">
            <motion.div
              className="mx-auto mb-5 flex justify-center"
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.25, delay: 0.12, ease: easeSmooth }}
            >
              <div className="rounded-full border border-soft-gold/45 bg-paper/70 p-1 shadow-[var(--shadow-md)] backdrop-blur-[2px]">
                <LogoMark size={52} className="h-12 w-12 sm:h-14 sm:w-14" priority />
              </div>
            </motion.div>

            <LoveBurst className="mb-4 opacity-80" />

            <div className="min-h-[18px]">
              {reduce ? (
                <p className="type-eyebrow">Welcome to our</p>
              ) : unlocked ? (
                <TypewriterText
                  key="hero-welcome"
                  text="Welcome to our"
                  as="p"
                  className="type-eyebrow"
                  delay={500}
                  speed={40}
                  onDone={() => setStep(1)}
                  showCursor
                  active
                />
              ) : (
                <p className="type-eyebrow opacity-0" aria-hidden>
                  Welcome to our
                </p>
              )}
            </div>

            <div className="mt-2 min-h-[70px] sm:min-h-[88px]">
              {reduce ? (
                <h1 className="type-display gold-foil text-[clamp(1.75rem,7vw,3.35rem)] sm:text-[clamp(2rem,7.5vw,3.35rem)]">
                  Wedding Website
                </h1>
              ) : unlocked && step >= 1 ? (
                <TypewriterText
                  key="hero-headline"
                  text="Wedding Website"
                  as="h1"
                  className="type-display gold-foil text-[clamp(1.75rem,7vw,3.35rem)] sm:text-[clamp(2rem,7.5vw,3.35rem)]"
                  delay={140}
                  speed={36}
                  onDone={() => setStep(2)}
                  showCursor
                  active
                />
              ) : null}
            </div>

            {(step >= 2 || reduce) && (
              <motion.div
                className="mt-5"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                onAnimationComplete={() => setStep(3)}
              >
                <GoldFlourish />
              </motion.div>
            )}

            {(step >= 3 || reduce) && (
              <motion.div
                className="mt-6"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: easeSmooth }}
                onAnimationComplete={() => setStep(4)}
              >
                <p className="font-display text-[11px] font-bold uppercase tracking-[0.32em] text-caramel sm:text-xs">
                  {wedding.bride.first}
                </p>
                <p className="type-script mt-1 text-[clamp(2.15rem,9.5vw,4.4rem)] leading-[0.95] sm:text-[clamp(2.6rem,11vw,4.4rem)]">
                  {wedding.bride.last}
                </p>

                <div className="my-2 flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-gradient-to-r from-transparent to-soft-gold/70" />
                  <motion.span
                    className="font-display text-2xl font-bold text-soft-gold"
                    animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    &amp;
                  </motion.span>
                  <GoldHeart size={12} />
                  <span className="h-px w-8 bg-gradient-to-l from-transparent to-soft-gold/70" />
                </div>

                <p className="font-display text-[11px] font-bold uppercase tracking-[0.32em] text-caramel sm:text-xs">
                  {wedding.groom.first}
                </p>
                <p className="type-script mt-1 text-[clamp(2.15rem,9.5vw,4.4rem)] leading-[0.95] sm:text-[clamp(2.6rem,11vw,4.4rem)]">
                  {wedding.groom.middle} {wedding.groom.last}
                </p>
              </motion.div>
            )}

            {(step >= 4 || reduce) && (
              <motion.div
                className="relative z-40 mt-7 space-y-4"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: easeSmooth }}
              >
                <GoldHeartDivider />

                <p className="type-eyebrow text-[10px] text-cognac sm:text-[11px]">
                  {wedding.date.caps}
                </p>
                <p className="type-eyebrow text-[10px] text-dusty-blue sm:text-[11px]">
                  {wedding.venue.name}
                </p>

                <div className="px-1 pt-1">
                  <Countdown />
                </div>

                <div className="relative z-50 flex flex-col items-center gap-3 pt-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    onClick={() => setSoonOpen(true)}
                    className="btn-primary w-full sm:w-auto"
                  >
                    Save The Date
                  </button>
                  <Link href="#story" className="btn-ghost w-full sm:w-auto">
                    Our Story
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      <FloralSide side="left" introDelay={0.15} tuckBehindBand />
      <FloralSide side="right" introDelay={0.32} tuckBehindBand />

      <motion.div
        id="welcome"
        className="relative z-[40]"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={
          step >= 4 || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
        }
        transition={{ duration: 1, ease: easeSmooth }}
      >
        <div
          className="relative px-6 py-9 text-center sm:py-11"
          style={{
            background:
              "linear-gradient(105deg, #5c3a1f 0%, #B67A3D 42%, #7a4a25 100%)",
          }}
        >
          <div className="mb-3 flex justify-center gap-2 opacity-80" aria-hidden>
            <GoldHeart size={10} />
            <GoldDiamond />
            <GoldHeart size={10} />
          </div>
          <p className="font-display text-lg font-bold tracking-wide text-ivory sm:text-2xl">
            {wedding.tagline}
          </p>
          <div className="mx-auto my-3 h-px w-14 bg-soft-gold/55" />
          <p className="mx-auto max-w-lg font-serif text-sm font-medium text-ivory/85 sm:text-base">
            {wedding.thankYou}
          </p>
        </div>
      </motion.div>

      <ComingSoonModal
        open={soonOpen}
        title="Save The Date"
        onClose={() => setSoonOpen(false)}
      />
    </section>
  );
}
