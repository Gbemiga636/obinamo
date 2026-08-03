"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

type Side = "left" | "right";

/**
 * 🌸 MOBILE FLOWER KNOBS — edit these until it looks perfect on your phone.
 * Save the file → page hot-reloads. Only affects screens under 640px.
 *
 *   bottomPercent → lift UP/DOWN from bottom     (try 12 → 28)  ↑ higher number = higher
 *   heightVh      → how tall                     (try 38 → 52)
 *   widthVw       → how wide                     (try 36 → 48)
 *   maxWidthPx    → width cap in pixels          (try 150 → 200)
 *   sideNudge     → push off screen edge         (try -6 → -14; more negative = further out)
 *   finalScale    → ending bloom size            (try 0.95 → 1.15)
 */
export const MOBILE_FLOWERS = {
  bottomPercent: 11,
  heightVh: 46,
  widthVw: 44,
  maxWidthPx: 175,
  sideNudge: -9,
  finalScale: 1.05,
};

/**
 * Sample-style florals: tilt in from each side, then bloom.
 * Mobile uses MOBILE_FLOWERS above; desktop stays large.
 */
export function FloralSide({
  side,
  className,
  introDelay = 0.2,
  tuckBehindBand = false,
}: {
  side: Side;
  className?: string;
  introDelay?: number;
  tuckBehindBand?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const endScale = isMobile ? MOBILE_FLOWERS.finalScale : 1.14;

  const driftY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : side === "left" ? [10, -22] : [6, -18],
  );

  const src =
    side === "left"
      ? "/images/flowers/bloom-right.png"
      : "/images/flowers/bloom-left.png";

  const tiltOut = side === "left" ? -26 : 26;
  const tiltIn = side === "left" ? -7 : 7;

  const mobileVars = {
    "--fm-bottom": `${MOBILE_FLOWERS.bottomPercent}%`,
    "--fm-height": `${MOBILE_FLOWERS.heightVh}vh`,
    "--fm-width": `${MOBILE_FLOWERS.widthVw}vw`,
    "--fm-max-w": `${MOBILE_FLOWERS.maxWidthPx}px`,
    "--fm-side": `${MOBILE_FLOWERS.sideNudge}%`,
  } as CSSProperties;

  return (
    <motion.div
      ref={ref}
      className={cn(
        "pointer-events-none absolute select-none",
        tuckBehindBand ? "z-[10] md:z-[30]" : "z-[10] md:z-[45]",

        /* ── Mobile knobs (via CSS vars from MOBILE_FLOWERS) ── */
        "max-sm:bottom-[var(--fm-bottom)] max-sm:h-[var(--fm-height)] max-sm:w-[var(--fm-width)] max-sm:max-w-[var(--fm-max-w)]",
        side === "left"
          ? "max-sm:left-[var(--fm-side)]"
          : "max-sm:right-[var(--fm-side)]",

        /* ── Tablet+ ── */
        "sm:bottom-[14%] sm:h-[62vh] sm:w-[46vw] sm:max-w-[300px]",
        tuckBehindBand
          ? "md:bottom-[-28px] md:h-[min(88vh,820px)] md:w-[min(56vw,580px)] md:max-w-none md:translate-y-0 lg:-translate-y-6"
          : "md:bottom-[-8px] md:h-[min(88vh,820px)] md:w-[min(56vw,580px)] md:max-w-none",
        side === "left"
          ? "sm:left-[-6%] md:left-[-2%]"
          : "sm:right-[-6%] md:right-[-2%]",
        className,
      )}
      style={{ ...mobileVars, y: driftY }}
      aria-hidden
    >
      <motion.div
        className="relative h-full w-full origin-bottom"
        style={{
          transformOrigin: side === "left" ? "left bottom" : "right bottom",
        }}
        initial={
          reduce
            ? false
            : {
                opacity: 0,
                scale: 0.42,
                x: side === "left" ? -110 : 110,
                y: 60,
                rotate: tiltOut,
              }
        }
        animate={{
          opacity: 1,
          scale: reduce ? 1 : [0.42, 0.75, endScale],
          x: 0,
          y: 0,
          rotate: reduce ? tiltIn : [tiltOut, tiltOut * 0.45, tiltIn],
        }}
        transition={{
          duration: 1.85,
          delay: introDelay,
          ease: easeOutExpo,
          times: reduce ? undefined : [0, 0.45, 1],
        }}
      >
        <div
          className={cn(
            "absolute bottom-[8%] h-[48%] w-[78%] rounded-full bg-[radial-gradient(circle,rgba(226,194,184,0.45),transparent_70%)] blur-2xl",
            side === "left" ? "left-0" : "right-0",
          )}
        />
        <div className="absolute inset-0 opacity-35 blur-md sm:blur-xl">
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width:640px) 44vw, 560px"
            className={cn(
              "object-contain",
              side === "left" ? "object-left-bottom" : "object-right-bottom",
            )}
          />
        </div>
        <div className="absolute inset-0 drop-shadow-[0_22px_44px_rgba(42,29,18,0.3)]">
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width:640px) 44vw, 560px"
            className={cn(
              "object-contain",
              side === "left" ? "object-left-bottom" : "object-right-bottom",
            )}
            priority
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
