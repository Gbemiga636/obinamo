"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { LogoMark } from "@/components/ui/LogoMark";
import { Countdown } from "@/components/hero/Countdown";
import { GuestDetailsForm } from "@/components/save-the-date/GuestDetailsForm";
import { useSound } from "@/providers/SoundProvider";
import { useSaveDateGate } from "@/providers/SaveDateGate";
import { wedding } from "@/lib/wedding";
import { easeSmooth } from "@/lib/motion";

type Phase = "sealed" | "opening" | "open";

const PANEL =
  "linear-gradient(160deg, #f6eee0 0%, #ead9c2 42%, #dcc4a4 100%)";

/**
 * Four full-page triangles seal the viewport.
 * Seal sits in the center; on tap the panels fly outward and the invite fills the view.
 */
export function SaveTheDateExperience() {
  const reduce = useReducedMotion();
  const { play, startExperienceAudio, pauseAmbient } = useSound();
  const { setEnvelopeOpen } = useSaveDateGate();
  const [phase, setPhase] = useState<Phase>("sealed");

  useEffect(() => {
    pauseAmbient();
  }, [pauseAmbient]);

  useEffect(() => {
    if (phase === "open") setEnvelopeOpen(true);
  }, [phase, setEnvelopeOpen]);

  const open = async () => {
    if (phase !== "sealed") return;
    setPhase("opening");

    await startExperienceAudio();
    play("seal");
    window.setTimeout(() => play("paper"), reduce ? 40 : 320);
    window.setTimeout(() => play("sparkle"), reduce ? 180 : 900);
    window.setTimeout(() => setPhase("open"), reduce ? 350 : 1600);
  };

  const sealed = phase === "sealed";
  const covering = phase === "sealed" || phase === "opening";
  const done = phase === "open";
  const opening = phase === "opening";

  return (
    <section className="relative overflow-x-clip">
      <div className="surface-paper absolute inset-0" />
      <div className="surface-grain absolute inset-0" />

      {/* Invite stage — fills the viewport; peeks a little room for “details below” when open */}
      <div
        className={`relative z-10 flex w-full flex-col items-center justify-center px-3 ${
          done
            ? "min-h-[88svh] pb-3 pt-[4.25rem] sm:min-h-[90svh] sm:pt-20"
            : "min-h-[100svh]"
        }`}
      >
        {/* Invite under the seal (visible as panels open) */}
        <motion.div
          className={`relative z-10 w-full max-w-[min(92vw,440px)] sm:max-w-[500px] ${
            covering ? "pointer-events-none" : "pointer-events-auto"
          }`}
          initial={false}
          animate={
            covering
              ? {
                  opacity: opening ? 1 : 0.35,
                  scale: opening ? 1 : 0.94,
                  filter: opening ? "blur(0px)" : "blur(2px)",
                }
              : { opacity: 1, scale: 1, filter: "blur(0px)" }
          }
          transition={{ duration: 1.1, ease: easeSmooth }}
        >
          <div className="relative aspect-[3/4] w-full max-h-[min(78svh,720px)]">
            <Image
              src="/images/save-the-date.png"
              alt="Save the Date invitation"
              fill
              className="object-contain drop-shadow-[0_28px_48px_rgba(42,29,18,0.3)]"
              sizes="(max-width:640px) 92vw, 500px"
              priority
            />
          </div>
        </motion.div>

        {/* Four full-screen triangles */}
        <AnimatePresence>
          {covering ? (
            <motion.div
              key="tri-cover"
              className="fixed inset-0 z-[55]"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.35 } }}
            >
              {/* Soft title above seal */}
              <motion.div
                className="pointer-events-none absolute inset-x-0 top-[max(5rem,9svh)] z-[70] px-4 text-center"
                animate={{ opacity: opening ? 0 : 1, y: opening ? -12 : 0 }}
                transition={{ duration: 0.55, ease: easeSmooth }}
              >
                <h1 className="font-display text-2xl font-bold text-mocha drop-shadow-sm sm:text-3xl md:text-4xl">
                  Save The Date
                </h1>
                <p className="mt-2 font-serif text-sm text-ink-soft/80 sm:text-base">
                  Tap the seal to open
                </p>
              </motion.div>

              {/* TOP triangle — covers upper half meeting at center */}
              <motion.div
                className="absolute inset-x-0 top-0 z-[56] h-[55%]"
                style={{
                  background: PANEL,
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  boxShadow: "0 18px 40px rgba(42,29,18,0.18)",
                }}
                initial={false}
                animate={
                  opening
                    ? { y: "-105%", opacity: 0.95 }
                    : { y: 0, opacity: 1 }
                }
                transition={{ duration: 1.15, ease: easeSmooth, delay: 0.05 }}
              >
                <div className="absolute inset-0 border-b border-[#d4af37]/25" />
              </motion.div>

              {/* BOTTOM triangle */}
              <motion.div
                className="absolute inset-x-0 bottom-0 z-[56] h-[55%]"
                style={{
                  background: PANEL,
                  clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
                  boxShadow: "0 -18px 40px rgba(42,29,18,0.16)",
                }}
                initial={false}
                animate={
                  opening
                    ? { y: "105%", opacity: 0.95 }
                    : { y: 0, opacity: 1 }
                }
                transition={{ duration: 1.15, ease: easeSmooth, delay: 0.08 }}
              />

              {/* LEFT triangle */}
              <motion.div
                className="absolute inset-y-0 left-0 z-[57] w-[55%]"
                style={{
                  background:
                    "linear-gradient(125deg, #f3e7d6 0%, #e4d0b3 55%, #d6bc98 100%)",
                  clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                  boxShadow: "12px 0 36px rgba(42,29,18,0.14)",
                }}
                initial={false}
                animate={
                  opening
                    ? { x: "-105%", opacity: 0.95 }
                    : { x: 0, opacity: 1 }
                }
                transition={{ duration: 1.15, ease: easeSmooth, delay: 0.02 }}
              />

              {/* RIGHT triangle */}
              <motion.div
                className="absolute inset-y-0 right-0 z-[57] w-[55%]"
                style={{
                  background:
                    "linear-gradient(235deg, #f3e7d6 0%, #e4d0b3 55%, #d6bc98 100%)",
                  clipPath: "polygon(100% 0, 100% 100%, 0 50%)",
                  boxShadow: "-12px 0 36px rgba(42,29,18,0.14)",
                }}
                initial={false}
                animate={
                  opening
                    ? { x: "105%", opacity: 0.95 }
                    : { x: 0, opacity: 1 }
                }
                transition={{ duration: 1.15, ease: easeSmooth, delay: 0.1 }}
              />

              {/* Gold seam lines toward the seal */}
              <div
                className="pointer-events-none absolute inset-0 z-[58] opacity-40"
                aria-hidden
                style={{
                  background:
                    "linear-gradient(90deg, transparent 49.6%, rgba(212,175,55,0.55) 50%, transparent 50.4%), linear-gradient(0deg, transparent 49.6%, rgba(212,175,55,0.45) 50%, transparent 50.4%)",
                }}
              />

              {/* Center seal */}
              <motion.button
                type="button"
                onClick={open}
                disabled={!sealed}
                aria-label="Open invitation and start music"
                className="absolute left-1/2 top-1/2 z-[80] -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none disabled:cursor-default"
                animate={
                  opening
                    ? {
                        scale: [1, 1.12, 0],
                        opacity: [1, 1, 0],
                        rotate: [0, -12, 18],
                      }
                    : reduce
                      ? { scale: 1, opacity: 1 }
                      : { scale: [1, 1.05, 1], opacity: 1 }
                }
                transition={
                  opening
                    ? { duration: 0.85, ease: easeSmooth }
                    : {
                        duration: 2.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
                whileHover={sealed ? { scale: 1.08 } : undefined}
                whileTap={sealed ? { scale: 0.95 } : undefined}
              >
                <span
                  className="flex h-[100px] w-[100px] items-center justify-center rounded-full border border-[#f0d2a0]/45 p-1.5 sm:h-[118px] sm:w-[118px]"
                  style={{
                    background:
                      "radial-gradient(circle at 32% 28%, #d46555 0%, #a3382c 40%, #5c1610 100%)",
                    boxShadow:
                      "0 18px 42px rgba(74,18,14,0.5), inset 0 3px 12px rgba(255,200,180,0.35)",
                  }}
                >
                  <span className="overflow-hidden rounded-full bg-[#1a120c] p-[3px]">
                    <LogoMark
                      size={64}
                      className="h-16 w-16 sm:h-[70px] sm:w-[70px]"
                      priority
                    />
                  </span>
                </span>
              </motion.button>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {done ? (
          <motion.button
            type="button"
            aria-label="Scroll to details"
            onClick={() =>
              document
                .getElementById("save-date-details")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="absolute bottom-2 z-30 flex flex-col items-center gap-0.5 text-cognac/80 sm:bottom-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 4, 0] }}
            transition={{
              opacity: { delay: 0.4, duration: 0.5 },
              y: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em]">
              Details below
            </span>
            <ChevronDown className="h-4 w-4" />
          </motion.button>
        ) : null}
      </div>

      <AnimatePresence>
        {done ? (
          <motion.div
            id="save-date-details"
            className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-4 pb-16 pt-1 text-center sm:pb-20"
            initial={
              reduce ? { opacity: 1 } : { opacity: 0, y: 28, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: easeSmooth }}
          >
            <p className="type-eyebrow text-[10px] text-cognac sm:text-[11px]">
              {wedding.date.caps}
            </p>
            <p className="type-eyebrow mt-2 text-[10px] text-dusty-blue sm:text-[11px]">
              {wedding.venue.name}
            </p>
            <div className="w-full px-1 pt-4">
              <Countdown />
            </div>
            <GuestDetailsForm />
            <p className="mt-6 max-w-sm font-serif text-sm text-ink-soft/55">
              Formal invitation to follow · {wedding.hashtag}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
