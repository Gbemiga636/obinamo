"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useInvitation } from "@/providers/InvitationProvider";
import { useSound } from "@/providers/SoundProvider";
import { wedding } from "@/lib/wedding";
import { LogoMark } from "@/components/ui/LogoMark";
import { easeOutExpo } from "@/lib/motion";

const PAPER =
  "linear-gradient(145deg, #f7eee0 0%, #efe2d0 28%, #e6d5be 62%, #d9c4a5 100%)";
const PAPER_FLAP =
  "linear-gradient(180deg, #f3e8d6 0%, #e8d7c0 40%, #dcc7ab 100%)";
const LINER =
  "linear-gradient(135deg, #6C7D8F 0%, #7a4a25 45%, #B67A3D 100%)";

/**
 * Photoreal-leaning invitation envelope entrance.
 */
export function InvitationGate() {
  const { beginUnlock, completeUnlock } = useInvitation();
  const { startExperienceAudio, play } = useSound();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"sealed" | "opening" | "revealing">(
    "sealed",
  );

  const start = () => {
    if (phase !== "sealed") return;
    beginUnlock();
    startExperienceAudio();
    play("seal");
    setPhase("opening");

    window.setTimeout(() => play("paper"), reduce ? 80 : 600);
    window.setTimeout(() => play("sparkle"), reduce ? 160 : 1400);
    window.setTimeout(() => setPhase("revealing"), reduce ? 280 : 2300);
    window.setTimeout(() => completeUnlock(), reduce ? 450 : 3200);
  };

  const opening = phase !== "sealed";

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden px-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.15, ease: easeOutExpo } }}
    >
      <div className="surface-paper absolute inset-0" />
      <div className="surface-grain absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(255,255,255,0.55), transparent 70%), radial-gradient(ellipse at 50% 100%, rgba(122,74,37,0.12), transparent 45%)",
        }}
      />

      <motion.div
        className="relative z-10 mb-10 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: phase === "sealed" ? 1 : 0 }}
        transition={{ duration: 0.9, delay: 0.15 }}
      >
        <p className="type-eyebrow text-dusty-blue">Hand-delivered for you</p>
        <p className="mt-3 font-serif text-lg text-ink-soft/70">
          {wedding.bride.first} &amp; {wedding.groom.first}
        </p>
      </motion.div>

      <button
        type="button"
        onClick={start}
        disabled={phase !== "sealed"}
        className="relative z-10 focus-visible:outline-none"
        aria-label="Start experience — open invitation envelope"
      >
        <LuxuryEnvelope phase={phase} opening={opening} />
      </button>

      <AnimatePresence>
        {phase === "sealed" ? (
          <motion.div
            className="relative z-10 mt-12 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ delay: 0.45, duration: 0.85 }}
          >
            <button type="button" onClick={start} className="btn-primary min-w-[240px]">
              Start Experience
            </button>
            <p className="font-serif text-sm text-ink-soft/55">
              Open gently — music begins with you
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

function LuxuryEnvelope({
  phase,
  opening,
}: {
  phase: "sealed" | "opening" | "revealing";
  opening: boolean;
}) {
  /* Body + flap share the same hinge line (top of body) so nothing floats apart */
  const hinge = "18%";

  return (
    <div
      className="relative mx-auto h-[290px] w-[340px] sm:h-[340px] sm:w-[410px]"
      style={{ perspective: 1400 }}
    >
      <motion.div
        className="absolute -bottom-5 left-[10%] right-[10%] h-9 rounded-[100%] bg-mocha/25 blur-xl"
        animate={{
          opacity: opening ? 0.3 : [0.32, 0.48, 0.32],
          scaleX: opening ? 1.04 : [1, 1.03, 1],
        }}
        transition={
          opening
            ? { duration: 0.8 }
            : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <motion.div
        className="absolute inset-[-20%] -z-10 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.26), transparent 62%)",
        }}
        animate={{ opacity: opening ? 0.85 : [0.38, 0.62, 0.38] }}
        transition={
          opening
            ? { duration: 1 }
            : { duration: 3.8, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={
          opening
            ? { y: 4 }
            : { y: [0, -8, 0] }
        }
        transition={
          opening
            ? { duration: 0.8 }
            : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
        }
        whileHover={phase === "sealed" ? { y: -12, scale: 1.012 } : undefined}
      >
        {/* Body — hinge at top edge */}
        <div
          className="absolute inset-x-0 bottom-0 overflow-hidden rounded-b-[12px]"
          style={{
            top: hinge,
            background: PAPER,
            boxShadow:
              "0 26px 55px rgba(42,29,18,0.26), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -2px 8px rgba(122,74,37,0.08)",
          }}
        >
          <PaperFiber />
          <div className="absolute inset-[5px] border border-[#d4af37]/30" />
          <div className="absolute inset-[9px] border border-[#d4af37]/12" />

          {/* Side fold shading flush on the body */}
          <div
            className="absolute inset-y-0 left-0 w-[32%] opacity-45"
            style={{
              background:
                "linear-gradient(90deg, rgba(122,74,37,0.2), transparent)",
              clipPath: "polygon(0 0, 100% 48%, 0 100%)",
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-[32%] opacity-45"
            style={{
              background:
                "linear-gradient(270deg, rgba(122,74,37,0.2), transparent)",
              clipPath: "polygon(100% 0, 0 48%, 100% 100%)",
            }}
          />

          {/* Card rises from inside */}
          <motion.div
            className="absolute inset-x-[11%] bottom-[8%] z-[5] flex h-[88%] flex-col items-center justify-start overflow-hidden rounded-[2px] border border-[#d4af37]/25 px-4 pt-7 text-center"
            style={{
              background: "linear-gradient(180deg, #fbf7f1 0%, #f4ebe0 100%)",
              boxShadow:
                "0 8px 22px rgba(42,29,18,0.14), inset 0 0 0 1px rgba(255,255,255,0.55)",
            }}
            initial={{ y: 70, opacity: 0 }}
            animate={
              opening
                ? {
                    y: phase === "revealing" ? -120 : -48,
                    opacity: 1,
                  }
                : { y: 80, opacity: 0 }
            }
            transition={{ duration: 1.6, ease: easeOutExpo, delay: 0.32 }}
          >
            <div className="absolute inset-[5px] border border-[#d4af37]/18" />
            <LogoMark size={40} priority />
            <p className="relative mt-3 font-display text-[9px] font-bold uppercase tracking-[0.32em] text-dusty-blue">
              Save the Date
            </p>
            <p className="relative mt-2 font-script text-[1.7rem] leading-none text-cognac">
              {wedding.bride.first}
            </p>
            <p className="relative my-0.5 font-display text-sm font-bold text-soft-gold">
              &amp;
            </p>
            <p className="relative font-script text-[1.7rem] leading-none text-cognac">
              {wedding.groom.first}
            </p>
            <div className="relative mx-auto my-2.5 h-px w-10 bg-gradient-to-r from-transparent via-soft-gold to-transparent" />
            <p className="relative font-display text-[8px] font-bold uppercase tracking-[0.2em] text-ink-soft">
              {wedding.date.display}
            </p>
          </motion.div>

          {/* Front pocket — same paper, V cut meeting the flap tip */}
          <div
            className="absolute inset-x-0 bottom-0 z-[6] h-[48%]"
            style={{
              background: PAPER,
              clipPath: "polygon(0 38%, 50% 0, 100% 38%, 100% 100%, 0 100%)",
              boxShadow: "inset 0 14px 22px rgba(42,29,18,0.1)",
            }}
          >
            <PaperFiber />
            <div
              className="absolute inset-x-[20%] top-0 h-[2px] opacity-75"
              style={{ background: LINER }}
            />
          </div>
        </div>

        {/* Top flap — hinged on the exact same line as body top */}
        <motion.div
          className="absolute left-0 right-0 z-20 origin-top"
          style={{
            top: hinge,
            height: "52%",
            transformStyle: "preserve-3d",
          }}
          animate={{ rotateX: opening ? -165 : 0 }}
          transition={{ duration: 1.65, ease: easeOutExpo, delay: 0.15 }}
        >
          <div
            className="absolute inset-0"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: PAPER_FLAP,
              boxShadow:
                "0 10px 28px rgba(42,29,18,0.16), inset 0 1px 0 rgba(255,255,255,0.55)",
            }}
          >
            <PaperFiber />
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <polyline
                points="1,1 50,98 99,1"
                fill="none"
                stroke="#d4af37"
                strokeWidth="0.55"
                opacity="0.5"
              />
            </svg>
            {/* Hinge crease strip — physically connects flap to body */}
            <div
              className="absolute inset-x-0 top-0 h-[3px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(122,74,37,0.22), rgba(255,255,255,0.35))",
              }}
            />
          </div>
        </motion.div>

        {/* Wax seal sits on the closed flap tip */}
        <motion.div
          className="absolute left-1/2 z-30 -translate-x-1/2"
          style={{ top: "56%" }}
          animate={
            opening
              ? {
                  scale: [1, 1.1, 0.88, 0],
                  rotate: [0, -12, 18, 30],
                  opacity: [1, 1, 0.5, 0],
                  y: [0, -4, 16, 36],
                }
              : { scale: 1, opacity: 1, y: 0 }
          }
          transition={{ duration: 1.2, ease: "easeInOut" }}
          whileHover={
            phase === "sealed"
              ? {
                  filter:
                    "brightness(1.1) drop-shadow(0 0 14px rgba(212,175,55,0.65))",
                }
              : undefined
          }
        >
          <WaxSeal />
        </motion.div>

        <AnimatePresence>
          {opening
            ? Array.from({ length: 18 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-[55%] rounded-full"
                  style={{
                    width: 2 + (i % 3),
                    height: 2 + (i % 3),
                    background:
                      i % 3 === 0
                        ? "#D4AF37"
                        : i % 3 === 1
                          ? "#F7F1E8"
                          : "#E2C2B8",
                    boxShadow: "0 0 6px rgba(212,175,55,0.45)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.15, 0.2],
                    x: ((i % 8) - 3.5) * 36,
                    y: -18 - (i % 6) * 24,
                  }}
                  transition={{ duration: 1.5, delay: 0.48 + i * 0.025 }}
                />
              ))
            : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function PaperFiber() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.45), transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(122,74,37,0.08), transparent 45%)",
        }}
      />
    </>
  );
}

function WaxSeal() {
  return (
    <div className="relative">
      {/* Wax drips / irregular rim via layered circles */}
      <div
        className="absolute -inset-1 rounded-full opacity-80"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, #a33a2e, #5c1610 70%)",
          filter: "blur(0.5px)",
          transform: "scale(1.05, 1.02) rotate(-8deg)",
        }}
      />
      <div
        className="relative flex h-[78px] w-[78px] items-center justify-center rounded-full sm:h-[88px] sm:w-[88px]"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, #d46555 0%, #a3382c 38%, #7a2218 68%, #4a120e 100%)",
          boxShadow:
            "0 12px 28px rgba(74,18,14,0.45), inset 0 3px 8px rgba(255,200,180,0.35), inset 0 -4px 10px rgba(40,8,6,0.45)",
        }}
      >
        {/* Emboss ring */}
        <div className="absolute inset-[7px] rounded-full border border-[#f0d2a0]/35" />
        <div className="absolute inset-[11px] rounded-full border border-[#5c1610]/40" />

        {/* Logo plate */}
        <div className="relative z-[1] overflow-hidden rounded-full bg-[#1a120c] p-[3px] shadow-inner">
          <LogoMark size={52} className="sm:h-[58px] sm:w-[58px]" priority />
        </div>

        {/* Specular highlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 28% 22%, rgba(255,255,255,0.4), transparent 38%)",
          }}
        />
      </div>
    </div>
  );
}
