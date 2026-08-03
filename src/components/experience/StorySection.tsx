"use client";

import { SectionShell } from "@/components/layout/SectionShell";
import { wedding } from "@/lib/wedding";
import { motion, useReducedMotion } from "framer-motion";
import { staggerAltSides, easeSmooth, viewportOnce } from "@/lib/motion";
import { TypewriterText } from "@/components/ui/TypewriterText";

export function StorySection() {
  const reduce = useReducedMotion();

  return (
    <SectionShell
      id="story"
      tone="paper"
      eyebrow="A love written slowly"
      title="Our Story"
      subtitle="Four chapters on the way to forever."
      narrow
    >
      <motion.div
        className="space-y-0"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.18, delayChildren: 0.12 } },
        }}
      >
        {wedding.story.map((chapter, i) => (
          <motion.article
            key={chapter.title}
            custom={i}
            variants={staggerAltSides}
            className="relative border-l border-[var(--line-strong)] py-8 pl-8 text-left sm:pl-10"
          >
            <motion.span
              className="absolute -left-[5px] top-10 h-2.5 w-2.5 rounded-full bg-soft-gold shadow-[0_0_0_4px_rgba(212,175,55,0.15)]"
              initial={reduce ? false : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.85, ease: easeSmooth }}
            />

            <motion.p
              className="type-eyebrow text-[10px] text-soft-gold"
              initial={reduce ? false : { opacity: 0, x: i % 2 ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.15 + i * 0.12, duration: 1.05, ease: easeSmooth }}
            >
              {chapter.year}
            </motion.p>

            <h3 className="mt-2 min-h-[1.2em] font-serif text-2xl font-semibold text-ink">
              {reduce ? (
                chapter.title
              ) : (
                <TypewriterText
                  text={chapter.title}
                  as="span"
                  className="font-serif text-2xl font-semibold text-ink"
                  whenInView
                  delay={200 + i * 80}
                  speed={40}
                  showCursor
                />
              )}
            </h3>

            <motion.p
              className="type-body mt-3 max-w-xl"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.35 + i * 0.1, duration: 1.15, ease: easeSmooth }}
            >
              {chapter.body}
            </motion.p>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  );
}
