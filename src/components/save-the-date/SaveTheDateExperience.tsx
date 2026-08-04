"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { LogoMark } from "@/components/ui/LogoMark";
import { Countdown } from "@/components/hero/Countdown";
import { useSound } from "@/providers/SoundProvider";
import { useSaveDateGate } from "@/providers/SaveDateGate";
import { wedding } from "@/lib/wedding";
import { easeSmooth } from "@/lib/motion";

const PAPER =
  "linear-gradient(145deg, #f7eee0 0%, #efe2d0 28%, #e6d5be 62%, #d9c4a5 100%)";
const PAPER_FLAP =
  "linear-gradient(180deg, #f3e8d6 0%, #e8d7c0 40%, #dcc7ab 100%)";

type Phase = "sealed" | "opening" | "reveal" | "open";

/**
 * Save The Date — seal click opens + starts music;
 * invite spins out, envelope drifts away.
 */
export function SaveTheDateExperience() {
  const reduce = useReducedMotion();
  const { play, startExperienceAudio, pauseAmbient } = useSound();
  const { setEnvelopeOpen } = useSaveDateGate();
  const [phase, setPhase] = useState<Phase>("sealed");

  // Stop site music the moment this page opens — it only resumes on seal tap
  useEffect(() => {
    pauseAmbient();
  }, [pauseAmbient]);

  useEffect(() => {
    if (phase === "open") setEnvelopeOpen(true);
  }, [phase, setEnvelopeOpen]);

  const open = async () => {
    if (phase !== "sealed") return;
    setPhase("opening");

    // Gesture unlocks ambient music on this page
    await startExperienceAudio();
    play("seal");

    window.setTimeout(() => play("paper"), reduce ? 60 : 480);
    window.setTimeout(() => setPhase("reveal"), reduce ? 180 : 850);
    window.setTimeout(() => play("sparkle"), reduce ? 260 : 1700);
    window.setTimeout(() => setPhase("open"), reduce ? 450 : 3100);
  };

  const opening = phase !== "sealed";
  const done = phase === "open";
  const cardInteractive = phase === "reveal" || phase === "open";

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center overflow-x-clip px-4 pb-28 pt-28">
      <div className="surface-paper absolute inset-0" />
      <div className="surface-grain absolute inset-0" />

      <motion.div
        className="relative z-10 mb-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easeSmooth }}
      >
        <h1 className="font-display text-2xl font-bold text-mocha sm:text-3xl">
          Save The Date
        </h1>
        {phase !== "open" ? (
          <p className="mt-2 font-serif text-sm text-ink-soft/65">
            {phase === "sealed" ? "Tap the seal to open" : "Opening…"}
          </p>
        ) : null}
      </motion.div>

      <div
        className="relative z-10 mx-auto w-full max-w-[400px] sm:max-w-[460px]"
        style={{
          minHeight: done ? 560 : 440,
          perspective: 1600,
        }}
      >
        {/* Card — pointer-events off until it has emerged */}
        <motion.div
          className={`absolute left-1/2 z-40 w-[82%] max-w-[310px] sm:max-w-[340px] ${
            cardInteractive ? "pointer-events-auto" : "pointer-events-none"
          }`}
          style={{
            top: done ? 8 : "14%",
            transformStyle: "preserve-3d",
          }}
          initial={false}
          animate={
            reduce && done
              ? { x: "-50%", y: 0, opacity: 1, rotateY: 0, scale: 1 }
              : phase === "sealed" || phase === "opening"
                ? {
                    x: "-50%",
                    y: phase === "opening" ? 90 : 130,
                    opacity: phase === "opening" ? 0.15 : 0,
                    rotateY: 0,
                    scale: 0.9,
                  }
                : phase === "reveal"
                  ? {
                      x: "-50%",
                      y: -36,
                      opacity: 1,
                      rotateY: 360,
                      scale: 1,
                    }
                  : {
                      x: "-50%",
                      y: 0,
                      opacity: 1,
                      rotateY: 360,
                      scale: 1.03,
                    }
          }
          transition={
            phase === "reveal"
              ? { duration: 2.25, ease: easeSmooth }
              : { duration: 1.15, ease: easeSmooth }
          }
          aria-hidden={!cardInteractive}
        >
          <div
            className="relative aspect-[3/4] w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                filter: "drop-shadow(0 24px 40px rgba(42,29,18,0.26))",
              }}
            >
              <Image
                src="/images/save-the-date.png"
                alt="Save the Date invitation"
                fill
                className="object-contain"
                sizes="(max-width:640px) 82vw, 340px"
                priority
              />
            </div>
            <div
              className="absolute inset-0"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                filter: "drop-shadow(0 24px 40px rgba(42,29,18,0.26))",
              }}
            >
              <Image
                src="/images/save-the-date.png"
                alt=""
                fill
                className="object-contain"
                sizes="(max-width:640px) 82vw, 340px"
                aria-hidden
              />
            </div>
          </div>
        </motion.div>

        {/* Envelope */}
        <motion.div
          className="absolute inset-x-0 top-[6%] z-20 h-[360px] sm:h-[400px]"
          animate={
            done
              ? { y: 260, opacity: 0, scale: 0.94 }
              : opening
                ? { y: 10, opacity: 1, scale: 1 }
                : { y: [0, -6, 0], opacity: 1, scale: 1 }
          }
          transition={
            done
              ? { duration: 1.4, ease: easeSmooth, delay: 0.1 }
              : opening
                ? { duration: 0.75, ease: easeSmooth }
                : { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <div className="relative h-full w-full">
            <div className="absolute -bottom-3 left-[12%] right-[12%] h-9 rounded-[100%] bg-mocha/20 blur-xl" />

            <div
              className="absolute inset-x-0 bottom-0 top-[16%] overflow-hidden rounded-b-[12px]"
              style={{
                background: PAPER,
                boxShadow:
                  "0 26px 55px rgba(42,29,18,0.24), inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              <div className="absolute inset-[5px] border border-[#d4af37]/30" />
              <div
                className="absolute inset-x-0 bottom-0 z-[2] h-[46%]"
                style={{
                  background: PAPER,
                  clipPath:
                    "polygon(0 38%, 50% 0, 100% 38%, 100% 100%, 0 100%)",
                  boxShadow: "inset 0 14px 22px rgba(42,29,18,0.1)",
                }}
              />
            </div>

            <motion.div
              className="pointer-events-none absolute left-0 right-0 top-[16%] z-20 origin-top"
              style={{ height: "48%", transformStyle: "preserve-3d" }}
              animate={{ rotateX: opening ? -165 : 0 }}
              transition={{ duration: 1.55, ease: easeSmooth, delay: 0.08 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background: PAPER_FLAP,
                  boxShadow: "0 10px 28px rgba(42,29,18,0.14)",
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-[3px]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(122,74,37,0.22), rgba(255,255,255,0.35))",
                  }}
                />
              </div>
            </motion.div>

            {/* Seal — the actual click target */}
            <motion.button
              type="button"
              onClick={open}
              disabled={phase !== "sealed"}
              aria-label="Open invitation and start music"
              className="absolute left-1/2 z-50 -translate-x-1/2 focus-visible:outline-none disabled:cursor-default"
              style={{ top: "48%" }}
              animate={
                opening
                  ? {
                      scale: [1, 1.06, 0],
                      opacity: [1, 1, 0],
                      y: [0, -6, 24],
                      rotate: [0, -8, 14],
                    }
                  : { scale: 1, opacity: 1, y: 0 }
              }
              transition={{ duration: 1.05, ease: easeSmooth }}
              whileHover={
                phase === "sealed" ? { scale: 1.06 } : undefined
              }
              whileTap={phase === "sealed" ? { scale: 0.96 } : undefined}
            >
              <span
                className="flex h-[78px] w-[78px] items-center justify-center rounded-full border border-[#f0d2a0]/35 p-1 sm:h-[88px] sm:w-[88px]"
                style={{
                  background:
                    "radial-gradient(circle at 32% 28%, #d46555 0%, #a3382c 40%, #5c1610 100%)",
                  boxShadow:
                    "0 12px 28px rgba(74,18,14,0.4), inset 0 3px 8px rgba(255,200,180,0.3)",
                }}
              >
                <span className="overflow-hidden rounded-full bg-[#1a120c] p-[2px]">
                  <LogoMark size={48} priority />
                </span>
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {done ? (
          <motion.div
            className="relative z-10 mt-8 flex w-full max-w-md flex-col items-center px-2 text-center sm:mt-10"
            initial={
              reduce
                ? { opacity: 1 }
                : { opacity: 0, y: 80, scale: 0.92 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.15, delay: 0.15, ease: easeSmooth }}
          >
            <p className="type-eyebrow text-[10px] text-cognac sm:text-[11px]">
              {wedding.date.caps}
            </p>
            <p className="type-eyebrow mt-2 text-[10px] text-dusty-blue sm:text-[11px]">
              {wedding.venue.name}
            </p>
            <div className="w-full px-1 pt-5">
              <Countdown />
            </div>
            <p className="mt-8 max-w-sm font-serif text-sm text-ink-soft/55">
              Formal invitation to follow · {wedding.hashtag}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
