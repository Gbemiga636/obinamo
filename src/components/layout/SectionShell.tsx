"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { GoldFlourish, GoldHeart, GoldDiamond } from "@/components/ui/GoldOrnaments";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { Float } from "@/components/ui/Reveal";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "paper" | "alt" | "none";
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  narrow?: boolean;
  /** Type out the title when scrolled into view */
  typewriterTitle?: boolean;
};

/**
 * Consistent section frame with elegant scroll reveals + optional typewriter title.
 */
export function SectionShell({
  id,
  children,
  className,
  tone = "paper",
  eyebrow,
  title,
  subtitle,
  narrow = false,
  typewriterTitle = true,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-[72px] overflow-hidden py-16 sm:py-20 md:py-24",
        className,
      )}
    >
      {tone === "paper" ? <div className="surface-paper absolute inset-0" /> : null}
      {tone === "alt" ? <div className="surface-alt absolute inset-0" /> : null}
      {tone !== "none" ? <div className="surface-grain absolute inset-0" /> : null}

      {/* Soft floating ornaments */}
      {!reduce ? (
        <>
          <Float
            className="pointer-events-none absolute left-[6%] top-[18%] hidden opacity-40 sm:block"
            amplitude={10}
            duration={6}
            delay={0.2}
          >
            <GoldHeart size={14} />
          </Float>
          <Float
            className="pointer-events-none absolute right-[8%] top-[28%] hidden opacity-35 sm:block"
            amplitude={12}
            duration={7}
            delay={0.8}
          >
            <GoldDiamond />
          </Float>
          <Float
            className="pointer-events-none absolute bottom-[16%] left-[10%] hidden opacity-30 md:block"
            amplitude={9}
            duration={5.5}
            delay={0.4}
          >
            <GoldDiamond />
          </Float>
        </>
      ) : null}

      {/* Side wash accents sliding in */}
      <motion.div
        className="pointer-events-none absolute -left-24 top-1/3 h-48 w-48 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #E2C2B8, transparent 70%)" }}
        initial={reduce ? false : { opacity: 0, x: -40 }}
        whileInView={{ opacity: 0.35, x: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 1.2, ease: easeOutExpo }}
      />
      <motion.div
        className="pointer-events-none absolute -right-24 bottom-1/4 h-52 w-52 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #D4AF37, transparent 70%)" }}
        initial={reduce ? false : { opacity: 0, x: 40 }}
        whileInView={{ opacity: 0.28, x: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 1.2, delay: 0.15, ease: easeOutExpo }}
      />

      <div
        className={cn(
          "relative z-10 mx-auto px-6 sm:px-8",
          narrow ? "max-w-2xl" : "max-w-5xl",
        )}
      >
        {(eyebrow || title || subtitle) && (
          <header className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: easeOutExpo }}
            >
              <GoldFlourish />
            </motion.div>

            {eyebrow ? (
              <motion.p
                className="type-eyebrow mt-6 text-dusty-blue"
                initial={reduce ? false : { opacity: 0, y: -16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.7, delay: 0.1, ease: easeOutExpo }}
              >
                {eyebrow}
              </motion.p>
            ) : null}

            {title ? (
              reduce || !typewriterTitle ? (
                <motion.h2
                  className="type-display mt-4 text-[clamp(1.75rem,4vw,2.75rem)]"
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.9, delay: 0.15, ease: easeOutExpo }}
                >
                  {title}
                </motion.h2>
              ) : (
                <TypewriterText
                  text={title}
                  as="h2"
                  className="type-display mt-4 min-h-[1.2em] text-[clamp(1.75rem,4vw,2.75rem)]"
                  whenInView
                  delay={180}
                  speed={48}
                  showCursor
                />
              )
            ) : null}

            {subtitle ? (
              <motion.p
                className="type-body mx-auto mt-4 max-w-lg text-balance"
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.9, delay: 0.35, ease: easeOutExpo }}
              >
                {subtitle}
              </motion.p>
            ) : null}

            <motion.div
              className="divider-gold mt-8"
              initial={reduce ? false : { scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: 0.45, ease: easeOutExpo }}
              style={{ transformOrigin: "center" }}
            />
          </header>
        )}

        {children}
      </div>
    </section>
  );
}
