"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { FloralSide } from "@/components/flowers/FloralSide";
import { PetalGather } from "@/components/effects/PetalGather";
import { HeroFilm } from "@/components/hero/HeroFilm";
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
import { LogoMark } from "@/components/ui/LogoMark";
import { useInvitation } from "@/providers/InvitationProvider";
import { wedding } from "@/lib/wedding";
import { easeSmooth, softSpring } from "@/lib/motion";
import { cn } from "@/lib/utils";

const FLOATING = [
  { kind: "heart" as const, size: 14, x: "8%", y: "22%", delay: 1.2, dur: 7.5 },
  { kind: "diamond" as const, x: "88%", y: "28%", delay: 1.6, dur: 8.2 },
  { kind: "ring" as const, x: "12%", y: "58%", delay: 1.9, dur: 7.8 },
  { kind: "heart" as const, size: 11, x: "86%", y: "52%", delay: 1.4, dur: 8.5 },
];

const softIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.35, ease: easeSmooth },
};

export function HeroSection() {
  const [step, setStep] = useState(0);
  const [cinema, setCinema] = useState(false);
  const archRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const coupleRef = useRef<HTMLDivElement>(null);
  const [coupleFit, setCoupleFit] = useState({ y: 0, scale: 1 });
  const reduce = useReducedMotion();
  const { unlocked } = useInvitation();
  const filmFade = cn(
    "transition-[opacity,filter] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
    cinema && "opacity-0 blur-[6px]",
  );

  useEffect(() => {
    if (!unlocked) {
      setStep(0);
      return;
    }
    setStep(reduce ? 4 : 0);
  }, [unlocked, reduce]);

  // While the film plays, drop the names into the blurred space below the
  // letterboxed frame (phones); laptops have no room there, so nothing moves.
  useEffect(() => {
    if (!cinema) {
      setCoupleFit({ y: 0, scale: 1 });
      return;
    }
    const fit = () => {
      const section = sectionRef.current;
      const couple = coupleRef.current;
      const box = section?.querySelector<HTMLElement>("[data-film-box]");
      const band = document.getElementById("welcome");
      if (!section || !couple || !box || !band) return;
      const video = box.querySelector("video");
      const s = section.getBoundingClientRect();
      const b = box.getBoundingClientRect();
      const ratio = video?.videoWidth ? video.videoHeight / video.videoWidth : 9 / 16;
      const frameH = Math.min(b.height, b.width * ratio);
      const frameBottom = b.top - s.top + (b.height + frameH) / 2;
      const floor = Math.min(band.getBoundingClientRect().top, b.bottom) - s.top - 12;
      const c = couple.getBoundingClientRect();
      const top = c.top - s.top;
      const targetTop = frameBottom + 14;
      const room = floor - targetTop;
      if (targetTop <= top || room < c.height * 0.6) {
        setCoupleFit({ y: 0, scale: 1 });
        return;
      }
      setCoupleFit({ y: targetTop - top, scale: Math.min(1, room / c.height) });
    };
    fit();
    const t = window.setTimeout(fit, 700);
    window.addEventListener("resize", fit);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", fit);
    };
  }, [cinema]);

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] flex-col overflow-x-clip">
      <div className="surface-paper absolute inset-0" />
      <div className="surface-grain absolute inset-0 opacity-40" />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 50% 28%, rgba(255,255,255,0.62), transparent 68%)",
        }}
      />

      <HeroFilm
        start={unlocked && (step >= 4 || !!reduce)}
        anchorRef={archRef}
        onReveal={() => setCinema(true)}
        onEnd={() => setCinema(false)}
      />

      {/* Soft ambient floats — CSS so they don’t fight scroll */}
      {unlocked && !reduce ? (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-[12] hidden sm:block",
            filmFade,
          )}
          aria-hidden
        >
          {FLOATING.map((item, i) => (
            <div
              key={i}
              className="hero-float absolute"
              style={{
                left: item.x,
                top: item.y,
                animationDelay: `${item.delay}s`,
                animationDuration: `${item.dur}s`,
              }}
            >
              {item.kind === "heart" ? (
                <GoldHeart size={item.size} />
              ) : item.kind === "diamond" ? (
                <GoldDiamond />
              ) : (
                <GoldRing />
              )}
            </div>
          ))}
        </div>
      ) : null}

      <div
        className={`hero-copy relative z-30 flex flex-1 flex-col items-center justify-center px-3 pb-36 pt-24 sm:px-14 sm:pb-52 sm:pt-28 md:px-24 ${
          cinema ? "hero-cinema" : ""
        }`}
      >
        <motion.div
          className="relative mx-auto w-full max-w-[min(100%,440px)] text-center sm:max-w-[480px] lg:max-w-[600px] lg:min-h-[min(72vh,700px)] lg:flex lg:flex-col lg:justify-center"
          initial={reduce || !unlocked ? false : { opacity: 0, y: 18 }}
          animate={
            unlocked ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
          }
          transition={{ duration: 1.5, ease: easeSmooth, delay: 0.05 }}
        >
          {/* Mobile/sm unchanged; laptop+ matches sample’s tall, roomy arch */}
          <div
            ref={archRef}
            className={cn(filmFade, "pointer-events-none absolute -inset-x-1 -top-2 bottom-[-8px] sm:-inset-x-6 sm:-top-6 sm:bottom-0 lg:-inset-x-24 lg:-top-14 lg:bottom-[-2.75rem] xl:-inset-x-32 xl:-top-16 xl:bottom-[-3.25rem]")}>
            <GoldArch className="h-full w-full max-w-none scale-x-[1.08] opacity-90 sm:scale-x-100 lg:scale-x-[1.02]" />
          </div>

          <div className="relative px-5 pt-7 sm:px-8 sm:pt-10 lg:px-10 lg:pt-14 lg:pb-6">
            <motion.div
              className="mx-auto mb-5 flex justify-center"
              initial={reduce || !unlocked ? false : { opacity: 0, scale: 0.94 }}
              animate={
                unlocked ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }
              }
              transition={{ ...softSpring, delay: unlocked ? 0.15 : 0 }}
            >
              <div className={cn(filmFade, "rounded-full border border-soft-gold/45 bg-paper/80 p-1 shadow-[var(--shadow-md)]")}>
                <LogoMark
                  size={52}
                  className="h-12 w-12 sm:h-14 sm:w-14"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              initial={reduce || !unlocked ? false : { opacity: 0 }}
              animate={unlocked ? { opacity: 0.85 } : { opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.35, ease: easeSmooth }}
            >
              <div className={filmFade}>
                <LoveBurst className="mb-4" />
              </div>
            </motion.div>

            <div className={cn("min-h-[18px]", filmFade)}>
              {reduce ? (
                <p className="hero-welcome type-eyebrow">Welcome to our</p>
              ) : unlocked ? (
                <TypewriterText
                  key="hero-welcome"
                  text="Welcome to our"
                  as="p"
                  className="hero-welcome type-eyebrow"
                  delay={550}
                  speed={48}
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

            <div className={cn("mt-2 min-h-[70px] sm:min-h-[88px]", filmFade)}>
              {reduce ? (
                <h1 className="hero-headline type-display gold-foil text-[clamp(1.75rem,7vw,3.35rem)] sm:text-[clamp(2rem,7.5vw,3.35rem)]">
                  Wedding Website
                </h1>
              ) : unlocked && step >= 1 ? (
                <TypewriterText
                  key="hero-headline"
                  text="Wedding Website"
                  as="h1"
                  className="hero-headline type-display gold-foil text-[clamp(1.75rem,7vw,3.35rem)] sm:text-[clamp(2rem,7.5vw,3.35rem)]"
                  delay={180}
                  speed={42}
                  onDone={() => setStep(2)}
                  showCursor
                  active
                />
              ) : null}
            </div>

            <AnimatePresence>
              {(step >= 2 || reduce) && (
                <motion.div
                  className="mt-5"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: easeSmooth }}
                  onAnimationComplete={() => {
                    if (step < 3) setStep(3);
                  }}
                >
                  <div className={filmFade}>
                    <GoldFlourish />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={coupleRef}>
            <motion.div
              initial={false}
              animate={{ y: coupleFit.y, scale: coupleFit.scale }}
              transition={{ duration: 1.4, ease: easeSmooth }}
              style={{ transformOrigin: "50% 0%" }}
            >
            <AnimatePresence>
              {(step >= 3 || reduce) && (
                <motion.div
                  className="mt-6"
                  initial={reduce ? false : softIn.initial}
                  animate={softIn.animate}
                  transition={{ duration: 1.45, ease: easeSmooth }}
                  onAnimationComplete={() => {
                    if (step < 4) setStep(4);
                  }}
                >
                  <p className="font-display text-[11px] font-bold uppercase tracking-[0.32em] text-caramel-ink sm:text-xs">
                    {wedding.bride.first}
                  </p>
                  <p className="type-script mt-1 text-[clamp(2.15rem,9.5vw,4.4rem)] leading-[0.95] sm:text-[clamp(2.6rem,11vw,4.4rem)]">
                    {wedding.bride.last}
                  </p>

                  <div className="my-2 flex items-center justify-center gap-3">
                    <span className="h-px w-8 bg-gradient-to-r from-transparent to-soft-gold/70" />
                    <span className="font-display text-2xl font-bold text-gold-ink">
                      &amp;
                    </span>
                    <GoldHeart size={12} />
                    <span className="h-px w-8 bg-gradient-to-l from-transparent to-soft-gold/70" />
                  </div>

                  <p className="font-display text-[11px] font-bold uppercase tracking-[0.32em] text-caramel-ink sm:text-xs">
                    {wedding.groom.first}
                  </p>
                  <p className="type-script mt-1 text-[clamp(2.15rem,9.5vw,4.4rem)] leading-[0.95] sm:text-[clamp(2.6rem,11vw,4.4rem)]">
                    {wedding.groom.middle} {wedding.groom.last}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {(step >= 4 || reduce) && (
                <motion.div
                  className="relative z-40 mt-7"
                  initial={reduce ? false : softIn.initial}
                  animate={softIn.animate}
                  transition={{ duration: 1.4, ease: easeSmooth }}
                >
                  <GoldHeartDivider />
                </motion.div>
              )}
            </AnimatePresence>
            </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <FloralSide
        side="left"
        introDelay={0.35}
        tuckBehindBand
        active={unlocked}
        className={filmFade}
      />
      <FloralSide
        side="right"
        introDelay={0.55}
        tuckBehindBand
        active={unlocked}
        className={filmFade}
      />

      <motion.div
        id="welcome"
        className="relative z-[40]"
        initial={false}
        animate={
          step >= 4 || reduce
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 14 }
        }
        transition={{ duration: 1.35, ease: easeSmooth }}
      >
        <div
          className="relative px-6 py-9 text-center sm:py-11"
          style={{
            background:
              "linear-gradient(105deg, #4f3119 0%, #8f5a2b 42%, #6b4020 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <PetalGather
              shape="ring"
              wind="right"
              width={360}
              height={170}
              petals={20}
              sparkles={10}
              seed={3}
              className="max-sm:scale-[0.82]"
            />
          </div>
          <div className="relative">
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
        </div>
      </motion.div>
    </section>
  );
}
