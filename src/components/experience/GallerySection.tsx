"use client";

import Image from "next/image";
import { SectionShell } from "@/components/layout/SectionShell";
import { wedding } from "@/lib/wedding";
import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

export function GallerySection() {
  return (
    <SectionShell
      id="gallery"
      tone="paper"
      title="Gallery"
      subtitle="Moments, florals, and the mood of our day."
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {wedding.gallery.map((shot, i) => (
          <motion.figure
            key={shot.src}
            className={`group relative overflow-hidden border border-[var(--line)] bg-paper ${
              i === 0
                ? "col-span-2 row-span-2 min-h-[280px] md:min-h-[420px]"
                : "min-h-[160px] md:min-h-[200px]"
            }`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: i * 0.06, ease: easeOutExpo }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: easeOutExpo }}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </motion.div>
            {/* cinematic wipe overlay */}
            <motion.div
              className="absolute inset-0 bg-cream origin-left"
              initial={{ scaleX: 1 }}
              whileInView={{ scaleX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.1 + i * 0.05, ease: easeOutExpo }}
            />
          </motion.figure>
        ))}
      </div>
    </SectionShell>
  );
}
