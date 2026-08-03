"use client";

import { SectionShell } from "@/components/layout/SectionShell";
import { wedding } from "@/lib/wedding";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function ScheduleSection() {
  return (
    <SectionShell
      id="schedule"
      tone="alt"
      title="The Schedule"
      subtitle="Wedding day, moment by moment."
      narrow
    >
      <motion.div
        className="space-y-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {wedding.schedule.map((item) => (
          <motion.div
            key={item.title}
            variants={staggerItem}
            className="panel flex flex-col items-center gap-2 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left"
          >
            <p className="type-eyebrow shrink-0 text-[10px] text-soft-gold">
              {item.time}
            </p>
            <div className="sm:flex-1 sm:px-6">
              <p className="font-serif text-xl font-semibold text-ink">{item.title}</p>
              <p className="mt-1 font-serif text-sm text-ink-soft/75">{item.detail}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  );
}
