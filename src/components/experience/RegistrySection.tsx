"use client";

import { ExternalLink, Gift } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { wedding } from "@/lib/wedding";

export function RegistrySection() {
  return (
    <SectionShell
      id="registry"
      tone="paper"
      title="Registry"
      subtitle="Your presence is the present — gifts are optional."
    >
      <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
        {wedding.registry.map((item) => (
          <a
            key={item.name}
            href={item.link}
            className="panel group px-6 py-10 text-center transition hover:-translate-y-0.5"
          >
            <Gift
              className="mx-auto h-5 w-5 text-soft-gold transition group-hover:scale-110"
              strokeWidth={1.3}
            />
            <p className="mt-4 font-serif text-xl font-semibold text-ink">{item.name}</p>
            <p className="mt-2 font-serif text-sm text-ink-soft/75">{item.detail}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.22em] text-soft-gold opacity-0 transition group-hover:opacity-100">
              View <ExternalLink className="h-3 w-3" />
            </span>
          </a>
        ))}
      </div>
    </SectionShell>
  );
}
