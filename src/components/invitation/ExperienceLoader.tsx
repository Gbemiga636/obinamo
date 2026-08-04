"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInvitation } from "@/providers/InvitationProvider";
import { useSound } from "@/providers/SoundProvider";
import { LogoMark } from "@/components/ui/LogoMark";
import { easeSmooth } from "@/lib/motion";

const PARTICLE_COUNT = 36;

/**
 * Creative loader — visual only. Music autoplays; if blocked,
 * SoundProvider starts it on the next scroll / tap / wheel.
 */
export function ExperienceLoader() {
  const { beginUnlock, completeUnlock } = useInvitation();
  const { startExperienceAudio, primeAudio, awaitGesturePlayback } = useSound();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"assemble" | "fill" | "bloom" | "done">(
    "assemble",
  );
  const [progress, setProgress] = useState(0);

  const startAudioRef = useRef(startExperienceAudio);
  const completeRef = useRef(completeUnlock);
  const awaitGestureRef = useRef(awaitGesturePlayback);
  startAudioRef.current = startExperienceAudio;
  completeRef.current = completeUnlock;
  awaitGestureRef.current = awaitGesturePlayback;

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
        const radius = 110 + (i % 5) * 18;
        return {
          id: i,
          fromX: Math.cos(angle) * (180 + (i % 7) * 24),
          fromY: Math.sin(angle) * (160 + (i % 6) * 22),
          toX: Math.cos(angle) * (radius * 0.35),
          toY: Math.sin(angle) * (radius * 0.28),
          delay: (i % 12) * 0.04,
          size: 2 + (i % 3),
        };
      }),
    [],
  );

  useEffect(() => {
    const onPrime = () => {
      void primeAudio();
    };
    window.addEventListener("pointerdown", onPrime, { once: true });
    window.addEventListener("touchstart", onPrime, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", onPrime, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onPrime);
      window.removeEventListener("touchstart", onPrime);
      window.removeEventListener("keydown", onPrime);
    };
  }, [primeAudio]);

  useEffect(() => {
    if (reduce === null) return;

    beginUnlock();
    let cancelled = false;
    const timers: number[] = [];

    setPhase("assemble");
    setProgress(0);

    const finish = async () => {
      if (cancelled) return;
      setPhase("done");

      let ok = false;
      try {
        ok = await Promise.race([
          startAudioRef.current().catch(() => false),
          new Promise<boolean>((resolve) => {
            timers.push(window.setTimeout(() => resolve(false), 1200));
          }),
        ]);
      } catch {
        ok = false;
      }

      if (cancelled) return;
      if (!ok) awaitGestureRef.current();

      timers.push(
        window.setTimeout(() => {
          if (!cancelled) completeRef.current();
        }, 400),
      );
    };

    // Hard unlock failsafe
    timers.push(
      window.setTimeout(() => {
        if (!cancelled) {
          awaitGestureRef.current();
          completeRef.current();
        }
      }, 8000),
    );

    if (reduce) {
      setProgress(1);
      setPhase("bloom");
      timers.push(window.setTimeout(() => void finish(), 280));
    } else {
      timers.push(window.setTimeout(() => setPhase("fill"), 1100));
      timers.push(window.setTimeout(() => setPhase("bloom"), 2400));

      timers.push(
        window.setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            if (cancelled) return;
            const p = Math.min(1, (now - start) / 1300);
            setProgress(p);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }, 1100),
      );

      timers.push(window.setTimeout(() => void finish(), 3600));
    }

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [reduce, beginUnlock]);

  const showMark = phase === "bloom" || phase === "done";

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 1.2, ease: easeSmooth },
      }}
    >
      <div className="surface-paper absolute inset-0" />
      <div className="surface-grain absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(212,175,55,0.18), transparent 65%)",
        }}
      />

      <div className="relative z-10 flex h-[280px] w-[280px] items-center justify-center sm:h-[320px] sm:w-[320px]">
        <motion.div
          className="absolute inset-[18%] rounded-full border border-soft-gold/35"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-[28%] rounded-full border border-blush/40"
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />

        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute left-1/2 top-1/2 rounded-full bg-soft-gold"
            style={{
              width: p.size,
              height: p.size,
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
            }}
            initial={{ x: p.fromX, y: p.fromY, opacity: 0, scale: 0 }}
            animate={{
              x: phase === "assemble" ? [p.fromX, p.toX] : p.toX * 0.2,
              y: phase === "assemble" ? [p.fromY, p.toY] : p.toY * 0.2,
              opacity: showMark ? 0 : [0, 1, 0.85],
              scale: phase === "assemble" ? [0, 1] : 0.6,
            }}
            transition={{
              duration: 1.15,
              delay: p.delay,
              ease: easeSmooth,
            }}
          />
        ))}

        <motion.div
          className="relative z-[2]"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: phase === "assemble" ? 0 : 1,
            scale: phase === "assemble" ? 0.7 : 1,
          }}
          transition={{ duration: 0.9, ease: easeSmooth }}
        >
          <HeartFill progress={progress} />
        </motion.div>

        <motion.div
          className="absolute z-[3] rounded-full border border-soft-gold/50 bg-paper/90 p-1.5 shadow-[0_12px_40px_rgba(42,29,18,0.18)]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: showMark ? 1 : 0,
            scale: showMark ? 1 : 0.5,
          }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        >
          <LogoMark
            size={72}
            className="h-16 w-16 sm:h-[72px] sm:w-[72px]"
            priority
          />
        </motion.div>
      </div>

      <motion.p
        className="relative z-10 mt-10 font-script text-4xl text-cognac sm:text-5xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: showMark ? 1 : 0,
          y: showMark ? 0 : 10,
        }}
        transition={{ duration: 1, ease: easeSmooth }}
      >
        Obinasom
      </motion.p>
    </motion.div>
  );
}

function HeartFill({ progress }: { progress: number }) {
  const clip = Math.max(0, Math.min(100, (1 - progress) * 100));
  return (
    <svg width="120" height="110" viewBox="0 0 24 22" aria-hidden>
      <defs>
        <linearGradient id="heartGoldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0e0a0" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#9a7420" />
        </linearGradient>
        <clipPath id="heartFillClip">
          <rect x="0" y={`${clip}%`} width="100%" height={`${100 - clip}%`} />
        </clipPath>
      </defs>
      <path
        d="M12 20 C12 20 2 13 2 7.2 C2 4.2 4.2 2.5 6.5 2.5 C8.4 2.5 10 3.7 12 5.6 C14 3.7 15.6 2.5 17.5 2.5 C19.8 2.5 22 4.2 22 7.2 C22 13 12 20 12 20 Z"
        fill="none"
        stroke="url(#heartGoldGrad)"
        strokeWidth="0.7"
        opacity="0.7"
      />
      <path
        d="M12 20 C12 20 2 13 2 7.2 C2 4.2 4.2 2.5 6.5 2.5 C8.4 2.5 10 3.7 12 5.6 C14 3.7 15.6 2.5 17.5 2.5 C19.8 2.5 22 4.2 22 7.2 C22 13 12 20 12 20 Z"
        fill="url(#heartGoldGrad)"
        clipPath="url(#heartFillClip)"
        opacity="0.92"
      />
    </svg>
  );
}
