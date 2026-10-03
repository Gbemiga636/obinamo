"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BedDouble,
  ChevronDown,
  Heart,
  Luggage,
  MapPin,
  Plane,
} from "lucide-react";
import { LogoMark } from "@/components/ui/LogoMark";
import {
  GoldArch,
  GoldDiamond,
  GoldHeart,
  GoldHeartDivider,
} from "@/components/ui/GoldOrnaments";
import { useInvitation } from "@/providers/InvitationProvider";
import { wedding } from "@/lib/wedding";
import { easeSmooth } from "@/lib/motion";

const { hotel } = wedding;

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
    detail: "Settle in, unwind, and rest before the big day.",
  },
  {
    icon: Heart,
    when: "Fri · Nov 20",
    title: "Celebrate",
    detail: "Our traditional wedding — we can't wait to see you.",
  },
  {
    icon: Luggage,
    when: `${hotel.checkOut.weekday.slice(0, 3)} · ${hotel.checkOut.month} ${hotel.checkOut.day}`,
    title: "Check out",
    detail: "Travel home safely, full of memories.",
  },
] as const;

const FLOATS = [
  { kind: "heart", x: "7%", y: "26%", delay: 0.6, dur: 7.8 },
  { kind: "diamond", x: "90%", y: "22%", delay: 1.1, dur: 8.4 },
  { kind: "diamond", x: "10%", y: "68%", delay: 1.6, dur: 8.1 },
  { kind: "heart", x: "88%", y: "62%", delay: 0.9, dur: 7.4 },
] as const;

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
  const { unlocked } = useInvitation();

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: unlocked || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 1.1, ease: easeSmooth, delay },
  });

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

      {/* ── Hero ── */}
      <section className="relative px-4 pb-4 pt-28 sm:pt-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(255,255,255,0.6), transparent 70%)",
          }}
        />

        {unlocked && !reduce ? (
          <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden>
            {FLOATS.map((f, i) => (
              <div
                key={i}
                className="hero-float absolute"
                style={{
                  left: f.x,
                  top: f.y,
                  animationDelay: `${f.delay}s`,
                  animationDuration: `${f.dur}s`,
                }}
              >
                {f.kind === "heart" ? <GoldHeart size={13} /> : <GoldDiamond />}
              </div>
            ))}
          </div>
        ) : null}

        <div className="relative mx-auto max-w-[min(100%,440px)] text-center sm:max-w-[480px]">
          <div className="pointer-events-none absolute -inset-x-1 -top-3 bottom-0 sm:-inset-x-8 sm:-top-6">
            <GoldArch className="h-full w-full max-w-none opacity-85" />
          </div>

          <div className="relative px-6 pb-10 pt-9 sm:px-10 sm:pt-12">
            <motion.div className="mb-5 flex justify-center" {...rise(0.1)}>
              <div className="rounded-full border border-soft-gold/45 bg-paper/80 p-1 shadow-[var(--shadow-md)]">
                <LogoMark size={48} className="h-11 w-11 sm:h-12 sm:w-12" />
              </div>
            </motion.div>

            <motion.p className="type-eyebrow" {...rise(0.25)}>
              Travel &amp; Stay
            </motion.p>

            <motion.h1
              className="type-script mt-3 text-[clamp(2.6rem,11vw,4.3rem)] text-ink"
              {...rise(0.4)}
            >
              Stay Close to Us
            </motion.h1>

            <motion.p
              className="mt-3 font-display text-[11px] font-bold uppercase tracking-[0.34em] text-caramel sm:text-xs"
              {...rise(0.55)}
            >
              Norcross · Georgia
            </motion.p>

            <motion.div className="mt-6" {...rise(0.7)}>
              <GoldHeartDivider />
            </motion.div>

            <motion.p
              className="mx-auto mt-5 max-w-[30ch] font-serif text-[15px] leading-relaxed text-ink-soft/80 sm:text-base"
              {...rise(0.85)}
            >
              We&apos;ve chosen a beautiful home base for our guests — rest,
              refresh, and celebrate the weekend with us.
            </motion.p>

            <motion.button
              type="button"
              onClick={() =>
                document
                  .getElementById("wedding-hotel")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="mx-auto mt-7 flex flex-col items-center gap-1 text-cognac/80 transition hover:text-cognac"
              {...rise(1)}
            >
              <span className="font-display text-[10px] font-bold uppercase tracking-[0.24em]">
                Our wedding hotel
              </span>
              <ChevronDown className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </section>

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
                {[`${hotel.nights} nights`, "Norcross, GA", "Book early"].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="border border-soft-gold/35 bg-ivory/70 px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-caramel"
                    >
                      {chip}
                    </span>
                  ),
                )}
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
                  <span className="font-display text-[9px] font-bold uppercase tracking-[0.2em] text-caramel">
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

              <a
                href={hotel.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-shimmer mt-9 w-full"
              >
                Book your room
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.article>
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
          className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2"
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
            "linear-gradient(105deg, #5c3a1f 0%, #B67A3D 42%, #7a4a25 100%)",
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
            Book early so you&apos;re settled in and ready to celebrate with us.
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
