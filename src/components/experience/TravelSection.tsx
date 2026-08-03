"use client";

import { ExternalLink } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { wedding } from "@/lib/wedding";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function TravelSection() {
  return (
    <SectionShell
      id="travel"
      tone="alt"
      title="Travel & Stay"
      subtitle="For guests journeying to Georgia."
      narrow
    >
      <motion.div
        className="space-y-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {wedding.hotels.map((hotel) => (
          <motion.a
            key={hotel.name}
            href={hotel.link}
            target="_blank"
            rel="noreferrer"
            variants={staggerItem}
            className="panel flex items-start justify-between gap-4 px-6 py-7 text-left transition hover:-translate-y-0.5"
          >
            <div>
              <p className="font-serif text-xl font-semibold text-ink">{hotel.name}</p>
              <p className="mt-1 font-serif text-sm text-ink-soft/75">{hotel.detail}</p>
            </div>
            <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-soft-gold" />
          </motion.a>
        ))}
      </motion.div>
    </SectionShell>
  );
}
