"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BedDouble,
  Globe,
  Heart,
  Hourglass,
  Luggage,
  MapPin,
  Plane,
  PlaneLanding,
} from "lucide-react";
import { LogoMark } from "@/components/ui/LogoMark";
import { PageHero } from "@/components/layout/PageHero";
import { PetalGather } from "@/components/effects/PetalGather";
import { GoldDiamond, GoldHeart } from "@/components/ui/GoldOrnaments";
import { wedding } from "@/lib/wedding";
import { easeSmooth } from "@/lib/motion";

const { hotel, venue, airports } = wedding;

const JOURNEY = [
  {
    icon: Plane,
    when: "Arrive",
    title: "Fly into ATL",
    detail: `${hotel.airport}, ${hotel.airportDistance}.`,
  },
  {
    icon: BedDouble,
    when: `${hotel.checkIn.weekday.slice(0, 3)} · ${hotel.checkIn.month} ${hotel.checkIn.day}`,
    title: "Check in",
    detail: "Settle in, unwind, and rest up before the big day.",
  },
  {
    icon: Heart,
    when: "Fri · Nov 20",
    title: "Celebrate",
    detail: `Our traditional wedding at ${venue.name}, just minutes from the hotel.`,
  },
  {
    icon: Luggage,
    when: `${hotel.checkOut.weekday.slice(0, 3)} · ${hotel.checkOut.month} ${hotel.checkOut.day}`,
    title: "Check out",
    detail: "Travel home safely, full of memories.",
  },
] as const;

function useDaysLeft(iso: string) {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const ms = new Date(iso).getTime() - Date.now();
    setDays(ms < 0 ? -1 : Math.floor(ms / 86_400_000));
  }, [iso]);
  return days;
}

function DateTile({
  label,
  weekday,
  day,
  month,
}: {
  label: string;
  weekday: string;
  day: string;
  month: string;
}) {
  return (
    <div className="text-center">
      <p className="type-eyebrow text-[9px] tracking-[0.26em] text-dusty-blue">
        {label}
      </p>
      <div className="mx-auto mt-2.5 w-[78px] overflow-hidden border border-soft-gold/50 bg-paper shadow-[var(--shadow-sm)] sm:w-[88px]">
        <p className="bg-cognac py-1 font-display text-[10px] font-bold uppercase tracking-[0.26em] text-ivory">
          {month}
        </p>
        <p className="py-2 font-display text-[2.1rem] font-bold leading-none text-mocha sm:text-[2.4rem]">
          {day}
        </p>
      </div>
      <p className="mt-2 font-serif text-sm text-ink-soft/75">{weekday}</p>
    </div>
  );
}

export function TravelExperience() {
  const reduce = useReducedMotion();
  const daysLeft = useDaysLeft(hotel.bookBy.iso);

  const inView = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 1, ease: easeSmooth, delay },
  });

  const daysLabel =
    daysLeft === null || daysLeft < 0
      ? null
      : daysLeft === 0
        ? "Last day to book!"
        : `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`;

  return (
    <div className="relative overflow-x-clip">
      <div className="surface-paper absolute inset-0" />
      <div className="surface-grain absolute inset-0 opacity-50" />

      <PageHero
        eyebrow="Travel & Stay"
        title="Stay Close to Us"
        subtitle="Norcross · Georgia"
        scrollTarget="wedding-hotel"
        scrollLabel="Our wedding hotel"
      >
        <p>
          We&apos;ve chosen a beautiful home base for our guests: rest,
          refresh, and celebrate the weekend with us.
        </p>
      </PageHero>

      {/* ── Hotel ticket ── */}
      <section
        id="wedding-hotel"
        className="relative scroll-mt-24 px-4 pb-16 pt-8 sm:pb-20 sm:pt-12"
      >
        <motion.article
          className="relative mx-auto max-w-4xl"
          style={{ perspective: 1400 }}
          initial={reduce ? false : { opacity: 0, y: 44, rotateX: 7 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.25, ease: easeSmooth }}
        >
          <div className="relative grid overflow-hidden border border-soft-gold/45 bg-paper shadow-[0_30px_70px_rgba(42,29,18,0.16)] md:grid-cols-[1.4fr_1fr]">
            <div className="pointer-events-none absolute inset-2 z-[1] border border-soft-gold/25 sm:inset-3" />

            {/* Hotel details */}
            <div className="relative px-6 py-10 sm:px-10 sm:py-12">
              <div className="pointer-events-none absolute -bottom-8 -right-6 opacity-[0.07]">
                <LogoMark size={190} className="h-44 w-44 sm:h-52 sm:w-52" />
              </div>

              <p className="type-eyebrow text-[10px]">Our wedding hotel</p>

              <h2 className="mt-4 font-display text-[clamp(1.7rem,5vw,2.5rem)] font-extrabold uppercase leading-[1.05] tracking-[0.03em] text-mocha">
                {hotel.brand}
              </h2>
              <p className="type-script mt-1 text-[clamp(1.9rem,6vw,2.6rem)] text-cognac">
                {hotel.location}
              </p>

              <div className="my-6 h-px w-16 bg-gradient-to-r from-soft-gold to-transparent" />

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-soft-gold" />
                <p className="font-serif text-[15px] leading-relaxed text-ink-soft sm:text-base">
                  {hotel.street}
                  <br />
                  {hotel.cityLine}
                </p>
              </div>

              <p className="mt-5 max-w-md font-serif text-[15px] leading-relaxed text-ink-soft/75">
                Book through our wedding link so your stay lines up perfectly
                with the celebration weekend.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  `${hotel.nights} nights`,
                  "Norcross, GA",
                  `Book by ${hotel.bookBy.short}`,
                ].map((chip) => (
                  <span
                    key={chip}
                    className="border border-soft-gold/35 bg-ivory/70 px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-caramel-ink"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Stub */}
            <div className="relative border-t-2 border-dashed border-soft-gold/45 bg-[linear-gradient(160deg,#f4eadb_0%,#ead9c0_100%)] px-6 py-10 sm:px-9 md:border-l-2 md:border-t-0 md:py-12">
              <span className="ticket-notch left-[-11px] top-[-11px] z-[2]" aria-hidden />
              <span
                className="ticket-notch right-[-11px] top-[-11px] z-[2] md:bottom-[-11px] md:left-[-11px] md:right-auto md:top-auto"
                aria-hidden
              />

              <p className="type-eyebrow text-center text-[10px]">Your stay</p>

              <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
                <DateTile
                  label="Check-in"
                  weekday={hotel.checkIn.weekday}
                  day={hotel.checkIn.day}
                  month={hotel.checkIn.month}
                />
                <div className="flex flex-col items-center gap-1.5 px-1">
                  <span className="h-px w-8 bg-soft-gold/60 sm:w-10" />
                  <GoldDiamond />
                  <span className="font-display text-[9px] font-bold uppercase tracking-[0.2em] text-caramel-ink">
                    {hotel.nights} nights
                  </span>
                  <span className="h-px w-8 bg-soft-gold/60 sm:w-10" />
                </div>
                <DateTile
                  label="Check-out"
                  weekday={hotel.checkOut.weekday}
                  day={hotel.checkOut.day}
                  month={hotel.checkOut.month}
                />
              </div>

              <div className="mt-8 border border-cognac/25 bg-paper/70 px-4 py-3.5 text-center">
                <p className="flex items-center justify-center gap-2 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-cognac">
                  <Hourglass className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Reservations close
                </p>
                <p className="mt-1.5 font-serif text-[15px] font-semibold text-mocha">
                  {hotel.bookBy.long}
                </p>
                {daysLabel ? (
                  <motion.p
                    className="mx-auto mt-2 inline-block bg-cognac px-3 py-1 font-display text-[9px] font-bold uppercase tracking-[0.22em] text-ivory"
                    animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {daysLabel}
                  </motion.p>
                ) : null}
              </div>

              <a
                href={hotel.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-shimmer mt-6 w-full"
              >
                Book your room
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.article>
      </section>

      {/* ── Arriving by air ── */}
      <section className="relative px-4 pb-16 sm:pb-20">
        <div className="mb-8 flex justify-center">
          <PetalGather shape="heart" wind="right" seed={11} width={210} height={180}>
            <span className="type-script mt-2 text-[1.7rem] text-cognac">
              see you soon
            </span>
          </PetalGather>
        </div>
        <motion.div className="text-center" {...inView()}>
          <p className="type-eyebrow">Flying in</p>
          <h2 className="type-script mt-2 text-[clamp(2.4rem,9vw,3.6rem)]">
            Arriving by Air
          </h2>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
          {airports.map((a, i) => {
            const Icon = i === 0 ? PlaneLanding : Globe;
            return (
              <motion.div
                key={a.name}
                className="panel relative overflow-hidden px-6 py-8 text-center sm:px-8"
                {...inView(0.12 * i)}
              >
                <span className="pointer-events-none absolute -right-3 -top-4 font-display text-[4.5rem] font-extrabold leading-none tracking-tight text-soft-gold/[0.12]">
                  ATL
                </span>
                <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-soft-gold/50 bg-paper text-cognac shadow-[var(--shadow-sm)]">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <p className="type-eyebrow relative mt-5 text-[9px] tracking-[0.26em] text-dusty-blue">
                  {a.tag}
                </p>
                <p className="relative mt-2 font-display text-lg font-bold uppercase leading-snug tracking-[0.06em] text-mocha">
                  {a.name}
                </p>
                <p className="relative mt-1 font-display text-[10px] font-bold uppercase tracking-[0.3em] text-caramel-ink">
                  {a.code}
                </p>
                <p className="relative mx-auto mt-4 max-w-[36ch] font-serif text-[15px] leading-relaxed text-ink-soft/75">
                  {a.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Journey ── */}
      <section className="surface-alt relative px-4 py-16 sm:py-20">
        <motion.div className="text-center" {...inView()}>
          <p className="type-eyebrow">Your weekend</p>
          <h2 className="type-script mt-2 text-[clamp(2.4rem,9vw,3.6rem)]">
            The Journey
          </h2>
        </motion.div>

        <ol className="relative mx-auto mt-12 grid max-w-4xl gap-9 md:grid-cols-4 md:gap-5">
          <span
            className="pointer-events-none absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-soft-gold/10 via-soft-gold/60 to-soft-gold/10 md:hidden"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute left-[12%] right-[12%] top-[27px] hidden h-px bg-gradient-to-r from-soft-gold/10 via-soft-gold/60 to-soft-gold/10 md:block"
            aria-hidden
          />

          {JOURNEY.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.title}
                className="relative flex gap-5 md:flex-col md:items-center md:gap-4 md:text-center"
                {...inView(0.12 * i)}
              >
                <span className="relative z-[1] flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-soft-gold/50 bg-paper text-cognac shadow-[var(--shadow-sm)]">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div className="pt-1 md:pt-0">
                  <p className="type-eyebrow text-[9px] tracking-[0.24em] text-dusty-blue">
                    {step.when}
                  </p>
                  <p className="mt-1.5 font-display text-base font-bold uppercase tracking-[0.08em] text-mocha">
                    {step.title}
                  </p>
                  <p className="mt-1.5 font-serif text-[15px] leading-relaxed text-ink-soft/75 md:mx-auto md:max-w-[22ch]">
                    {step.detail}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </section>

      {/* ── Getting there ── */}
      <section className="relative px-4 py-14 sm:py-16">
        <motion.div
          className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3"
          {...inView()}
        >
          {[
            {
              href: hotel.mapsUrl,
              icon: MapPin,
              title: "Find the hotel",
              detail: "Directions in Google Maps",
            },
            {
              href: hotel.detailsUrl,
              icon: BedDouble,
              title: "Hotel details",
              detail: "Rooms, amenities & contact",
            },
            {
              href: venue.mapsUrl,
              icon: Heart,
              title: "The venue",
              detail: venue.name,
            },
          ].map(({ href, icon: Icon, title, detail }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="panel group flex items-center gap-4 px-5 py-5 hover:-translate-y-0.5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cognac/10 text-cognac">
                <Icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <span className="flex-1">
                <span className="block font-display text-sm font-bold uppercase tracking-[0.12em] text-mocha">
                  {title}
                </span>
                <span className="mt-0.5 block font-serif text-sm text-ink-soft/70">
                  {detail}
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-soft-gold transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </motion.div>
      </section>

      {/* ── Closing band ── */}
      <section
        className="relative px-6 py-12 text-center sm:py-14"
        style={{
          background:
            "linear-gradient(105deg, #4f3119 0%, #8f5a2b 42%, #6b4020 100%)",
        }}
      >
        <motion.div {...inView()}>
          <div className="mb-3 flex justify-center gap-2 opacity-80" aria-hidden>
            <GoldHeart size={10} />
            <GoldDiamond />
            <GoldHeart size={10} />
          </div>
          <p className="font-display text-lg font-bold tracking-wide text-ivory sm:text-2xl">
            Your room is waiting
          </p>
          <div className="mx-auto my-3 h-px w-14 bg-soft-gold/55" />
          <p className="mx-auto max-w-md font-serif text-sm text-ivory/85 sm:text-base">
            Hotel reservations close on {hotel.bookBy.long}. Book early so
            you&apos;re settled in and ready to celebrate with us.
          </p>
          <a
            href={hotel.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer mt-7 inline-flex min-h-[48px] items-center justify-center gap-2 border border-ivory/55 px-8 font-display text-xs font-bold uppercase tracking-[0.22em] text-ivory transition hover:bg-ivory hover:text-cognac"
          >
            Book your room
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </section>
    </div>
  );
}
