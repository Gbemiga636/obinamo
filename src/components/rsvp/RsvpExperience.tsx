"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CalendarHeart, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PetalGather } from "@/components/effects/PetalGather";
import { GuestDetailsForm } from "@/components/save-the-date/GuestDetailsForm";
import { wedding } from "@/lib/wedding";
import { easeSmooth } from "@/lib/motion";

export function RsvpExperience() {
  const reduce = useReducedMotion();

  const inView = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 1, ease: easeSmooth, delay },
  });

  return (
    <div className="relative overflow-x-clip">
      <div className="surface-paper absolute inset-0" />
      <div className="surface-grain absolute inset-0 opacity-50" />

      <PageHero
        eyebrow="RSVP"
        title="Kindly Reply"
        subtitle="Friday · November 20 · 2026"
        scrollTarget="rsvp-form"
        scrollLabel="Send your reply"
      >
        <p>
          Your presence would mean the world to us. Let us know you&apos;re
          coming so we can celebrate together.
        </p>
      </PageHero>

      <section
        id="rsvp-form"
        className="relative flex scroll-mt-24 flex-col items-center px-4 pb-20 pt-6"
      >
        <PetalGather
          shape="ring"
          wind="left"
          seed={57}
          width={190}
          height={190}
          petals={18}
          sparkles={10}
        >
          <span
            className="flex h-[92px] w-[92px] items-center justify-center rounded-full font-display text-sm font-bold tracking-[0.24em] text-ivory shadow-[0_10px_24px_rgba(92,58,31,0.35),inset_0_2px_6px_rgba(255,255,255,0.25)]"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #c8894d, #7a4a25 70%, #5c3a1f)",
            }}
          >
            RSVP
          </span>
        </PetalGather>

        <GuestDetailsForm
          className="mt-4"
          heading="Will you celebrate with us?"
          description="Share your details below to RSVP. We can't wait to see you!"
          submitLabel="Send my RSVP"
          successTitle="Thank you!"
          successMessage="We've received your RSVP and can't wait to celebrate with you."
        />

        <motion.div
          className="mt-10 grid w-full max-w-md gap-3 sm:grid-cols-2"
          {...inView()}
        >
          <Link
            href="/schedule"
            className="panel group flex items-center gap-3 px-4 py-4 hover:-translate-y-0.5"
          >
            <CalendarHeart className="h-5 w-5 shrink-0 text-cognac" strokeWidth={1.6} />
            <span className="flex-1">
              <span className="block font-display text-xs font-bold uppercase tracking-[0.14em] text-mocha">
                The schedule
              </span>
              <span className="block font-serif text-xs text-ink-soft/70">
                From 4:00 PM
              </span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-soft-gold" />
          </Link>
          <a
            href={wedding.venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="panel group flex items-center gap-3 px-4 py-4 hover:-translate-y-0.5"
          >
            <MapPin className="h-5 w-5 shrink-0 text-cognac" strokeWidth={1.6} />
            <span className="flex-1">
              <span className="block font-display text-xs font-bold uppercase tracking-[0.14em] text-mocha">
                The venue
              </span>
              <span className="block font-serif text-xs text-ink-soft/70">
                {wedding.venue.name}
              </span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-soft-gold" />
          </a>
        </motion.div>
      </section>
    </div>
  );
}
