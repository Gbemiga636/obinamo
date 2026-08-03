"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { wedding } from "@/lib/wedding";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionShell
      id="faqs"
      tone="alt"
      title="FAQs"
      subtitle="Answers for our cherished guests."
      narrow
    >
      <div className="space-y-2 text-left">
        {wedding.faqs.map((item, i) => {
          const active = open === i;
          return (
            <div key={item.q} className="panel overflow-hidden">
              <button
                type="button"
                aria-expanded={active}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-paper/40"
                onClick={() => setOpen(active ? null : i)}
              >
                <span className="font-serif text-lg font-semibold text-ink">
                  {item.q}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-soft-gold transition duration-300 ${
                    active ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {active ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="type-body px-5 pb-5">{item.a}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
