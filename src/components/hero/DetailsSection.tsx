"use client";

import { SectionShell } from "@/components/layout/SectionShell";
import { Countdown } from "@/components/hero/Countdown";
import { wedding } from "@/lib/wedding";
import { MapPin, Clock, Shirt } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  staggerFast,
  staggerFromLeft,
  staggerFromRight,
  easeOutExpo,
  viewportOnce,
} from "@/lib/motion";
import { Reveal, Float } from "@/components/ui/Reveal";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { GoldHeart } from "@/components/ui/GoldOrnaments";

const details = [
  {
    icon: MapPin,
    label: "Location",
    value: wedding.venue.name,
    note: wedding.venue.detail,
    from: "left" as const,
  },
  {
    icon: Clock,
    label: "Date",
    value: wedding.date.display,
    note: wedding.time,
    from: "up" as const,
  },
  {
    icon: Shirt,
    label: "Dress Code",
    value: wedding.dressCode,
    note: "Celebrate in your finest",
    from: "right" as const,
  },
];

export function DetailsSection() {
  const reduce = useReducedMotion();

  return (
    <SectionShell
      id="details"
      tone="alt"
      title="The Celebration"
      subtitle="Everything you need for a beautiful evening together."
    >
      <Reveal from="scale" className="mx-auto mb-12 max-w-lg">
        <Countdown />
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3">
        {details.map((item, i) => (
          <Reveal key={item.label} from={item.from} delay={0.08 + i * 0.12}>
            <motion.div
              className="panel group h-full px-6 py-10 text-center"
              whileHover={reduce ? undefined : { y: -6, transition: { duration: 0.35 } }}
            >
              <motion.div
                initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={viewportOnce}
                transition={{
                  delay: 0.2 + i * 0.1,
                  duration: 0.6,
                  ease: easeOutExpo,
                }}
              >
                <item.icon
                  className="mx-auto h-5 w-5 text-soft-gold transition duration-500 group-hover:scale-110"
                  strokeWidth={1.3}
                />
              </motion.div>
              <p className="type-eyebrow mt-5 text-[10px] text-dusty-blue">
                {item.label}
              </p>
              <p className="mt-3 font-serif text-xl font-semibold text-ink">
                {item.value}
              </p>
              <p className="mt-2 font-serif text-sm text-ink-soft/70">{item.note}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <Float className="mt-16 flex justify-center" amplitude={6} duration={4.5}>
        <TypewriterText
          text={wedding.hashtag}
          as="p"
          className="type-script text-center text-4xl text-cognac"
          whenInView
          speed={55}
          showCursor
        />
      </Float>

      <motion.div
        className="mt-6 flex justify-center gap-3 opacity-50"
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            variants={i % 2 ? staggerFromRight : staggerFromLeft}
          >
            <GoldHeart size={10} />
          </motion.span>
        ))}
      </motion.div>
    </SectionShell>
  );
}
