"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarPlus,
  Clock,
  Hourglass,
  MapPin,
  Martini,
  Music,
  Shirt,
  Wine,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PetalGather } from "@/components/effects/PetalGather";
import { LogoMark } from "@/components/ui/LogoMark";
import { GoldDiamond, GoldHeart } from "@/components/ui/GoldOrnaments";
import { wedding } from "@/lib/wedding";
import { downloadIcs, googleCalendarUrl, type CalendarEvent } from "@/lib/calendar";
import { easeSmooth } from "@/lib/motion";

const { venue, schedule, hotel } = wedding;

const ICONS = {
  "iba-nkwu": Wine,
  "cocktail-hour": Martini,
  reception: Music,
} as const;

const NOTES: Partial<Record<keyof typeof ICONS, string>> = {
  "iba-nkwu": "Traditional attire preferred · formal attire welcome",
};

const couple = `${wedding.bride.first} & ${wedding.groom.first}`;

const toCalendarEvent = (item: (typeof schedule)[number]): CalendarEvent => ({
  title: `${item.title} · ${couple}`,
  startIso: item.startIso,
  endIso: item.endIso,
  details: `${item.detail} ${wedding.hashtag}`,
  location: venue.address,
});

const WHOLE_EVENING: CalendarEvent = {
  title: `${couple}'s Wedding ${wedding.hashtag}`,
  startIso: schedule[0].startIso,
  endIso: schedule[schedule.length - 1].endIso,
  details: schedule.map((s) => `${s.timeRange}: ${s.title}`).join("\n"),
  location: venue.address,
};

const GOOD_TO_KNOW = [
  {
    icon: Clock,
    title: "Begins promptly at 4 PM",
    detail: "Come a little early so you don't miss a single moment.",
  },
  {
    icon: Shirt,
    title: "Dress the part",
    detail: wedding.dressNote,
  },
  {
    icon: Hourglass,
    title: `Book by ${hotel.bookBy.short}`,
    detail: "Our hotel room block closes soon. Secure your stay today.",
    href: "/travel",
  },
] as const;

export function ScheduleExperience() {
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
        eyebrow="Schedule"
        title="The Celebration"
        subtitle="Friday · November 20 · 2026"
        scrollTarget="the-evening"
        scrollLabel="The evening"
      >
        <p>
          One unforgettable evening of culture, love and celebration. Here&apos;s
          how it all unfolds.
        </p>
      </PageHero>

      {/* ── Venue card ── */}
      <section
        id="the-evening"
        className="relative scroll-mt-24 px-4 pb-14 pt-8 sm:pb-16 sm:pt-12"
      >
        <motion.div
          className="relative mx-auto max-w-3xl border border-soft-gold/45 bg-paper px-6 py-10 text-center shadow-[0_30px_70px_rgba(42,29,18,0.14)] sm:px-12 sm:py-12"
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: easeSmooth }}
        >
          <div className="pointer-events-none absolute inset-2 border border-soft-gold/25 sm:inset-3" />

          <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-10 sm:text-left">
            <div className="w-[104px] shrink-0 overflow-hidden border border-soft-gold/50 bg-paper text-center shadow-[var(--shadow-md)]">
              <p className="bg-cognac py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.3em] text-ivory">
                Nov
              </p>
              <p className="py-2 font-display text-[3rem] font-bold leading-none text-mocha">
                20
              </p>
              <p className="border-t border-soft-gold/30 py-1 font-display text-[9px] font-bold uppercase tracking-[0.28em] text-caramel">
                Friday
              </p>
            </div>

            <div className="flex-1">
              <p className="type-eyebrow text-[10px]">The venue</p>
              <h2 className="mt-3 font-display text-[clamp(1.5rem,4.5vw,2.2rem)] font-extrabold uppercase leading-[1.08] tracking-[0.03em] text-mocha">
                {venue.name}
              </h2>
              <p className="mt-3 flex items-start justify-center gap-2 font-serif text-[15px] leading-relaxed text-ink-soft sm:justify-start sm:text-base">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-soft-gold" />
                <span>
                  {venue.street}
                  <br />
                  {venue.cityLine}
                </span>
              </p>
            </div>
          </div>

          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-shimmer"
            >
              <MapPin className="h-4 w-4" />
              Get directions
            </a>
            <button
              type="button"
              onClick={() => downloadIcs([WHOLE_EVENING], "Obinasom-wedding.ics")}
              className="btn-ghost gap-2"
            >
              <CalendarPlus className="h-4 w-4" />
              Save the evening
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── Timeline ── */}
      <section className="surface-alt relative px-4 py-16 sm:py-20">
        <motion.div className="text-center" {...inView()}>
          <p className="type-eyebrow">Order of the evening</p>
          <h2 className="type-script mt-2 text-[clamp(2.4rem,9vw,3.6rem)]">
            Moments to Treasure
          </h2>
        </motion.div>

        <ol className="relative mx-auto mt-14 max-w-4xl">
          <span
            className="pointer-events-none absolute bottom-10 left-[27px] top-10 w-px bg-gradient-to-b from-soft-gold/10 via-soft-gold/70 to-soft-gold/10 md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />

          {schedule.map((item, i) => {
            const Icon = ICONS[item.id];
            const note = NOTES[item.id];
            const right = i % 2 === 1;
            return (
              <li
                key={item.id}
                className="relative mb-12 grid grid-cols-[56px_1fr] gap-5 last:mb-0 md:grid-cols-[1fr_72px_1fr] md:gap-8"
              >
                <motion.div
                  className="relative z-[1] flex justify-center md:col-start-2 md:row-start-1"
                  initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, ease: easeSmooth }}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-soft-gold/60 bg-paper text-cognac shadow-[0_0_0_6px_rgba(232,213,163,0.25),var(--shadow-sm)] md:h-[72px] md:w-[72px]">
                    <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
                  </span>
                </motion.div>

                <motion.article
                  className={`panel relative px-6 py-7 sm:px-8 md:row-start-1 ${
                    right ? "md:col-start-3" : "md:col-start-1 md:text-right"
                  }`}
                  initial={
                    reduce ? false : { opacity: 0, x: right ? 36 : -36, y: 16 }
                  }
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1.1, ease: easeSmooth, delay: 0.1 }}
                >
                  <p className="font-display text-[11px] font-bold uppercase tracking-[0.26em] text-dusty-blue">
                    {item.timeRange}
                  </p>
                  <h3 className="type-script mt-2 text-[clamp(2rem,6vw,2.6rem)] text-cognac">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-serif text-[15px] leading-relaxed text-ink-soft/80 sm:text-base">
                    {item.detail}
                  </p>
                  {note ? (
                    <p className="mt-3 font-serif text-sm italic text-caramel">
                      {note}
                    </p>
                  ) : null}
                  <p
                    className={`mt-4 flex items-center gap-1.5 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft/60 ${
                      right ? "" : "md:justify-end"
                    }`}
                  >
                    <MapPin className="h-3 w-3 text-soft-gold" />
                    {venue.name}
                  </p>

                  <div
                    className={`mt-5 flex flex-wrap gap-2 ${right ? "" : "md:justify-end"}`}
                  >
                    <a
                      href={venue.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-1.5 border border-soft-gold/45 px-4 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-cognac transition hover:border-cognac hover:bg-cognac hover:text-ivory"
                    >
                      Map
                    </a>
                    <a
                      href={googleCalendarUrl(toCalendarEvent(item))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-1.5 bg-cognac px-4 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-ivory transition hover:bg-mocha"
                    >
                      <CalendarPlus className="h-3.5 w-3.5" />
                      Add to calendar
                    </a>
                  </div>
                </motion.article>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ── Good to know ── */}
      <section className="relative px-4 py-16 sm:py-20">
        <div className="mb-6 flex justify-center">
          <PetalGather
            shape="bloom"
            wind="up"
            seed={23}
            petals={14}
            sparkles={10}
            width={200}
            height={200}
          >
            <span className="rounded-full border border-soft-gold/45 bg-paper p-1 shadow-[var(--shadow-md)]">
              <LogoMark size={40} className="h-10 w-10" />
            </span>
          </PetalGather>
        </div>
        <motion.div className="text-center" {...inView()}>
          <p className="type-eyebrow">Before you arrive</p>
          <h2 className="type-script mt-2 text-[clamp(2.4rem,9vw,3.6rem)]">
            Good to Know
          </h2>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {GOOD_TO_KNOW.map((card, i) => {
            const Icon = card.icon;
            const inner = (
              <>
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cognac/10 text-cognac">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <p className="mt-4 font-display text-sm font-bold uppercase tracking-[0.12em] text-mocha">
                  {card.title}
                </p>
                <p className="mx-auto mt-2 max-w-[30ch] font-serif text-[15px] leading-relaxed text-ink-soft/75">
                  {card.detail}
                </p>
                {"href" in card ? (
                  <span className="mt-3 inline-flex items-center gap-1 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-cognac">
                    Travel & hotels
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                ) : null}
              </>
            );
            return (
              <motion.div key={card.title} className="h-full" {...inView(0.1 * i)}>
                {"href" in card ? (
                  <Link
                    href={card.href}
                    className="panel block h-full px-6 py-8 text-center hover:-translate-y-0.5"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="panel h-full px-6 py-8 text-center">{inner}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Closing band ── */}
      <section
        className="relative px-6 py-12 text-center sm:py-14"
        style={{
          background:
            "linear-gradient(105deg, #5c3a1f 0%, #B67A3D 42%, #7a4a25 100%)",
        }}
      >
        <motion.div {...inView()}>
          <div className="mb-3 flex justify-center gap-2 opacity-80" aria-hidden>
            <GoldHeart size={10} />
            <GoldDiamond />
            <GoldHeart size={10} />
          </div>
          <p className="type-script text-[clamp(2.4rem,8vw,3.4rem)] text-ivory">
            {wedding.hashtag}
          </p>
          <div className="mx-auto my-3 h-px w-14 bg-soft-gold/55" />
          <p className="mx-auto max-w-md font-serif text-sm text-ivory/85 sm:text-base">
            We can&apos;t wait to celebrate with you. Share your favourite
            moments with our hashtag!
          </p>
          <Link
            href="/faqs"
            className="btn-shimmer mt-7 inline-flex min-h-[48px] items-center justify-center gap-2 border border-ivory/55 px-8 font-display text-xs font-bold uppercase tracking-[0.22em] text-ivory transition hover:bg-ivory hover:text-cognac"
          >
            Things to do & FAQs
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
