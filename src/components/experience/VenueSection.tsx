"use client";

import { ExternalLink, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionShell } from "@/components/layout/SectionShell";
import { wedding } from "@/lib/wedding";
import { Reveal, Float } from "@/components/ui/Reveal";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

export function VenueSection() {
  const reduce = useReducedMotion();

  return (
    <SectionShell
      id="venue"
      tone="alt"
      title="Venue"
      subtitle={wedding.venue.detail}
    >
      <Reveal from="down" className="mb-8 text-center">
        {reduce ? (
          <p className="font-serif text-2xl font-semibold text-ink">
            {wedding.venue.name}
          </p>
        ) : (
          <TypewriterText
            text={wedding.venue.name}
            as="p"
            className="min-h-[1.2em] font-serif text-2xl font-semibold text-ink"
            whenInView
            delay={120}
            speed={45}
          />
        )}
      </Reveal>

      <Reveal from="scale" delay={0.15}>
        <motion.div
          className="overflow-hidden border border-[var(--line)] bg-paper shadow-[var(--shadow-md)]"
          initial={reduce ? false : { clipPath: "inset(8% 8% 8% 8%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={viewportOnce}
          transition={{ duration: 1.15, ease: easeOutExpo }}
        >
          <iframe
            title="Venue map — Norcross, Georgia"
            src={wedding.venue.mapsEmbed}
            className="h-[280px] w-full border-0 sm:h-[380px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </Reveal>

      <Float className="mt-8 flex justify-center" amplitude={5} duration={4.2}>
        <Reveal from="up" delay={0.25}>
          <a
            href={wedding.venue.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost inline-flex gap-2"
          >
            <MapPin className="h-3.5 w-3.5" />
            Open in Maps
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        </Reveal>
      </Float>
    </SectionShell>
  );
}
