"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { LogoMark } from "@/components/ui/LogoMark";
import { GoldHeartDivider } from "@/components/ui/GoldOrnaments";
import { wedding } from "@/lib/wedding";

/** Full-page “stay tuned” for locked routes */
export function StayTunedPage({ title }: { title?: string }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-28">
      <div className="surface-paper absolute inset-0" />
      <div className="surface-grain absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(255,255,255,0.55), transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-md border border-soft-gold/30 bg-paper/80 px-8 py-12 text-center shadow-[var(--shadow-lg)] backdrop-blur-[2px]">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-soft-gold/40 bg-paper p-1">
          <LogoMark size={48} className="h-full w-full" />
        </div>

        {title ? (
          <p className="type-eyebrow mb-3 text-dusty-blue">{title}</p>
        ) : null}

        <div className="mb-5 flex justify-center text-soft-gold">
          <Sparkles className="h-5 w-5" strokeWidth={1.5} />
        </div>

        <h1 className="font-display text-2xl font-bold leading-snug text-mocha sm:text-3xl">
          Stay tuned
        </h1>
        <p className="mx-auto mt-4 max-w-sm font-serif text-base text-ink-soft/70">
          This chapter of our story is still being written. We&apos;ll unveil
          this page very soon.
        </p>

        <div className="mx-auto my-8 max-w-xs">
          <GoldHeartDivider />
        </div>

        <p className="type-eyebrow text-[10px] text-caramel">
          {wedding.date.display} · {wedding.venue.name}
        </p>

        <Link href="/" className="btn-primary mt-8 inline-flex min-w-[180px]">
          Back Home
        </Link>
      </div>
    </section>
  );
}
