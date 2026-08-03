"use client";

import { SectionShell } from "@/components/layout/SectionShell";
import { wedding } from "@/lib/wedding";
import { motion, useReducedMotion } from "framer-motion";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";
import { TypewriterText } from "@/components/ui/TypewriterText";

export function DressCodeSection() {
  const reduce = useReducedMotion();

  return (
    <SectionShell
      id="dress"
      tone="paper"
      title="Dress Code"
      subtitle={wedding.dressNote}
      narrow
    >
      <Reveal from="up" className="mb-10 text-center">
        {reduce ? (
          <p className="type-display text-lg text-ink">{wedding.dressCode}</p>
        ) : (
          <TypewriterText
            text={wedding.dressCode}
            as="p"
            className="type-display min-h-[1.2em] text-lg text-ink"
            whenInView
            delay={160}
            speed={50}
          />
        )}
      </Reveal>

      <motion.div
        className="flex flex-wrap items-center justify-center gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
        }}
      >
        {wedding.dressPalette.map((c, i) => (
          <motion.div
            key={c.name}
            className="flex flex-col items-center gap-3"
            variants={{
              hidden: {
                opacity: 0,
                y: 24,
                x: i % 2 === 0 ? -18 : 18,
                scale: 0.85,
              },
              visible: {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                transition: { duration: 0.8, ease: easeOutExpo },
              },
            }}
            whileHover={
              reduce
                ? undefined
                : { y: -8, scale: 1.06, transition: { duration: 0.3 } }
            }
          >
            <motion.span
              className="h-14 w-14 rounded-full border border-white/70 shadow-[var(--shadow-md)]"
              style={{ background: c.hex }}
              title={c.name}
              animate={
                reduce
                  ? undefined
                  : {
                      boxShadow: [
                        "0 8px 24px rgba(42,29,18,0.08)",
                        "0 12px 28px rgba(212,175,55,0.22)",
                        "0 8px 24px rgba(42,29,18,0.08)",
                      ],
                    }
              }
              transition={{
                duration: 3.5 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="type-eyebrow text-[9px] text-dusty-blue">{c.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  );
}
