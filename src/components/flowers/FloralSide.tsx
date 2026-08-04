"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Side = "left" | "right";

/**
 * 🌸 MOBILE FLOWER KNOBS — edit these until it looks perfect on your phone.
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
 * Florals — soft spring entrance only.
 * Scroll parallax removed — it fought Lenis and made scrolling feel sticky.
 */
export function FloralSide({
  side,
  className,
  introDelay = 0.25,
  tuckBehindBand = false,
  active = true,
}: {
  side: Side;
  className?: string;
  introDelay?: number;
  tuckBehindBand?: boolean;
  active?: boolean;
}) {
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const endScale = isMobile ? MOBILE_FLOWERS.finalScale : 1.08;

  const src =
    side === "left"
      ? "/images/flowers/bloom-right.png"
      : "/images/flowers/bloom-left.png";

  const tiltOut = side === "left" ? -10 : 10;
  const tiltIn = side === "left" ? -3 : 3;

  const mobileVars = {
    "--fm-bottom": `${MOBILE_FLOWERS.bottomPercent}%`,
    "--fm-height": `${MOBILE_FLOWERS.heightVh}vh`,
    "--fm-width": `${MOBILE_FLOWERS.widthVw}vw`,
    "--fm-max-w": `${MOBILE_FLOWERS.maxWidthPx}px`,
    "--fm-side": `${MOBILE_FLOWERS.sideNudge}%`,
  } as CSSProperties;

  const ready = active && !reduce;

  return (
    <div
      className={cn(
        "pointer-events-none absolute select-none",
        tuckBehindBand ? "z-[10] md:z-[30]" : "z-[10] md:z-[45]",
        "max-sm:bottom-[var(--fm-bottom)] max-sm:h-[var(--fm-height)] max-sm:w-[var(--fm-width)] max-sm:max-w-[var(--fm-max-w)]",
        side === "left"
          ? "max-sm:left-[var(--fm-side)]"
          : "max-sm:right-[var(--fm-side)]",
        "sm:bottom-[14%] sm:h-[62vh] sm:w-[46vw] sm:max-w-[300px]",
        tuckBehindBand
          ? "md:bottom-[-28px] md:h-[min(88vh,820px)] md:w-[min(56vw,580px)] md:max-w-none md:translate-y-0 lg:-translate-y-6"
          : "md:bottom-[-8px] md:h-[min(88vh,820px)] md:w-[min(56vw,580px)] md:max-w-none",
        side === "left"
          ? "sm:left-[-6%] md:left-[-2%]"
          : "sm:right-[-6%] md:right-[-2%]",
        className,
      )}
      style={mobileVars}
      aria-hidden
    >
      <motion.div
        className="relative h-full w-full origin-bottom will-change-transform"
        style={{
          transformOrigin: side === "left" ? "left bottom" : "right bottom",
        }}
        initial={
          reduce
            ? false
            : {
                opacity: 0,
                scale: 0.78,
                x: side === "left" ? -36 : 36,
                y: 24,
                rotate: tiltOut,
              }
        }
        animate={
          ready || reduce
            ? {
                opacity: 1,
                scale: endScale,
                x: 0,
                y: 0,
                rotate: tiltIn,
              }
            : {
                opacity: 0,
                scale: 0.78,
                x: side === "left" ? -36 : 36,
                y: 24,
                rotate: tiltOut,
              }
        }
        transition={
          reduce
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: 42,
                damping: 28,
                mass: 1.05,
                delay: introDelay,
              }
        }
      >
        <div
          className={cn(
            "absolute bottom-[8%] h-[48%] w-[78%] rounded-full bg-[radial-gradient(circle,rgba(226,194,184,0.28),transparent_70%)] blur-2xl",
            side === "left" ? "left-0" : "right-0",
          )}
        />
        <div className="absolute inset-0 drop-shadow-[0_16px_32px_rgba(42,29,18,0.18)]">
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
    </div>
  );
}
