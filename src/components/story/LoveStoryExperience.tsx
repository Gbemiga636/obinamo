"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, CalendarHeart } from "lucide-react";
import { PetalGather } from "@/components/effects/PetalGather";
import { GoldDiamond, GoldHeart, GoldHeartDivider } from "@/components/ui/GoldOrnaments";
import {
  closingLines,
  filmStrip,
  storyIntro,
  voices,
  type Look,
  type Voice,
} from "@/lib/story";
import { setNavDark } from "@/lib/navTheme";
import { wedding } from "@/lib/wedding";
import { easeSmooth } from "@/lib/motion";
import { cn } from "@/lib/utils";

function lookStyle(look: Look) {
  return {
    filter: look.filter,
    objectPosition: look.focus,
    transform: `scale(${look.zoom})`,
    transformOrigin: look.focus,
  };
}

/** Short lines land as beats, set apart from the prose */
const isBeat = (text: string) => text.length <= 32;

/* ─────────────────────────── Opening ─────────────────────────── */

function Opening() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.3]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setNavDark(entry.intersectionRatio > 0.15), {
      threshold: [0, 0.15, 0.3],
    });
    io.observe(el);
    return () => {
      io.disconnect();
      setNavDark(false);
    };
  }, []);

  const title = "Our Love Story";

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden bg-[#120b06]">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { scale }}>
        <Image
          src="/images/gallery/portrait-2.jpg"
          alt=""
          fill
          sizes="100vw"
          className="hidden scale-110 object-cover blur-2xl brightness-[0.4] md:block"
        />
        <Image
          src="/images/gallery/portrait-2.jpg"
          alt="Princess and Victor"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[46%_38%] md:object-contain"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#120b06] via-[#120b06]/60 to-[#120b06]/25" />
      <div className="surface-grain absolute inset-0 opacity-25 mix-blend-overlay" />

      <motion.div
        className="relative flex h-full flex-col items-center justify-end px-6 pb-[15svh] text-center"
        style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <motion.p
          className="font-display text-[11px] font-bold uppercase tracking-[0.5em] text-[#f0d58a] [text-shadow:0_1px_10px_rgba(0,0,0,0.8)]"
          initial={reduce ? false : { opacity: 0, letterSpacing: "0.9em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1.6, ease: easeSmooth }}
        >
          {storyIntro.title}
        </motion.p>

        <h1 className="type-script mt-3 text-[clamp(3.4rem,15vw,8rem)] leading-[0.9] text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.6),0_8px_50px_rgba(0,0,0,0.6)]">
          {title.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={reduce ? false : { opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 0.4 + i * 0.06, ease: easeSmooth }}
            >
              {ch === " " ? "\u00a0" : ch}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-4 font-display text-sm font-bold uppercase tracking-[0.3em] text-ivory [text-shadow:0_1px_10px_rgba(0,0,0,0.8)] sm:text-base"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4, ease: easeSmooth }}
        >
          {storyIntro.names}
        </motion.p>

        <motion.div
          className="mt-4 flex items-center gap-3"
          initial={reduce ? false : { opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.6, ease: easeSmooth }}
        >
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#f0d58a]" />
          <GoldHeart size={12} />
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#f0d58a]" />
        </motion.div>

        <motion.p
          className="mt-4 max-w-md font-serif text-lg italic text-ivory [text-shadow:0_1px_10px_rgba(0,0,0,0.8)] sm:text-xl"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.9, ease: easeSmooth }}
        >
          {storyIntro.subtitle}
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-5 flex flex-col items-center gap-2 text-ivory/90"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
      >
        <span className="relative h-9 w-[1px] overflow-hidden bg-ivory/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-[#f0d58a]"
            animate={reduce ? undefined : { y: [-16, 36] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────── Voices ─────────────────────────── */

function Paragraph({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const beat = isBeat(text);
  return (
    <motion.p
      className={cn(
        beat
          ? "font-serif text-[1.45rem] italic leading-snug text-cognac sm:text-[1.7rem]"
          : "font-serif text-[17px] leading-[1.8] text-ink-soft sm:text-lg",
      )}
      initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: easeSmooth }}
    >
      {text}
    </motion.p>
  );
}

function VoiceBlock({ voice, index }: { voice: Voice; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const flip = index % 2 === 1;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const initialY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <article
      ref={ref}
      id={voice.id}
      className="relative grid gap-12 py-16 pl-10 sm:pl-14 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-14 md:py-24 lg:gap-20"
    >
      {/* node on the thread */}
      <motion.span
        className="absolute left-[11px] top-20 z-10 -translate-x-1/2 md:top-28"
        initial={reduce ? false : { scale: 0, rotate: -90 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-soft-gold/60 bg-[#f9f4ec] shadow-[0_0_20px_rgba(212,175,55,0.45)]">
          <GoldDiamond />
        </span>
      </motion.span>

      {/* portrait, pinned while the voice speaks */}
      <div className={cn("md:sticky md:top-28 md:self-start", flip && "md:order-2")}>
        <motion.div
          className="relative mx-auto w-full max-w-[360px]"
          initial={reduce ? false : { opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.3, ease: easeSmooth }}
        >
          <span className="absolute -inset-3 rounded-t-[999px] border border-soft-gold/50 sm:-inset-4" />
          <span className="absolute -inset-6 rounded-t-[999px] border border-soft-gold/20 sm:-inset-8" />
          <motion.div
            className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] shadow-[0_30px_60px_rgba(59,42,26,0.25)]"
            initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              className="absolute -inset-y-[10%] inset-x-0"
              style={reduce ? undefined : { y: imageY }}
            >
              <Image
                src={voice.src}
                alt={voice.alt}
                fill
                sizes="(min-width: 768px) 360px, 90vw"
                className="object-cover"
                style={lookStyle(voice)}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#3b2a1a]/40 via-transparent to-transparent" />
          </motion.div>
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-soft-gold/50 bg-[#f9f4ec] px-4 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.3em] text-cognac shadow-[var(--shadow-sm)]">
            {voice.label}
          </span>
        </motion.div>
      </div>

      {/* the voice */}
      <div className={cn("relative", flip && "md:order-1")}>
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -top-20 right-0 select-none font-display text-[10rem] font-bold leading-none text-transparent sm:text-[13rem]"
          style={{
            WebkitTextStroke: "1px rgba(212,175,55,0.3)",
            ...(reduce ? {} : { y: initialY }),
          }}
        >
          {voice.initial}
        </motion.span>

        <motion.h2
          className="type-script relative text-[clamp(2.6rem,8vw,4rem)] leading-[1] text-mocha"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.1, ease: easeSmooth }}
        >
          {voice.label}
        </motion.h2>
        <div className="my-6 h-px w-20 bg-gradient-to-r from-soft-gold to-transparent" />

        <div className="relative max-w-xl space-y-5">
          {voice.paragraphs.map((text, i) => (
            <Paragraph key={i} text={text} />
          ))}
        </div>
      </div>
    </article>
  );
}

function SectionBreak() {
  return (
    <div className="flex items-center justify-center gap-4 py-4 pl-10 sm:pl-14" aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-soft-gold/60" />
      <GoldDiamond />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-soft-gold/60" />
    </div>
  );
}

function Voices({ items, offset }: { items: Voice[]; offset: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <section ref={ref} className="relative mx-auto max-w-6xl px-6 py-10 sm:px-10">
      {/* the golden thread */}
      <svg
        className="pointer-events-none absolute bottom-10 left-[19px] top-10 h-[calc(100%-5rem)] w-8 overflow-visible sm:left-[35px]"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id={`thread-gold-${offset}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0d58a" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#b8892c" />
          </linearGradient>
        </defs>
        <path
          d="M50 0 C 90 90, 10 160, 50 250 S 90 420, 50 500 S 10 660, 50 750 S 90 920, 50 1000"
          fill="none"
          stroke="rgba(212,175,55,0.15)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M50 0 C 90 90, 10 160, 50 250 S 90 420, 50 500 S 10 660, 50 750 S 90 920, 50 1000"
          fill="none"
          stroke={`url(#thread-gold-${offset})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: reduce ? 1 : draw, filter: "drop-shadow(0 0 6px rgba(212,175,55,0.6))" }}
        />
      </svg>

      {items.map((voice, i) => (
        <div key={voice.id}>
          {i > 0 ? <SectionBreak /> : null}
          <VoiceBlock voice={voice} index={offset + i} />
        </div>
      ))}
    </section>
  );
}

/* ─────────────────────────── Film strip ─────────────────────────── */

function FilmStrip() {
  const ref = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  useEffect(() => {
    const measure = () => {
      const row = rowRef.current;
      if (row) setTravel(Math.max(0, row.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const sprockets = {
    backgroundImage:
      "repeating-linear-gradient(90deg, transparent 0 10px, rgba(249,244,236,0.85) 10px 22px, transparent 22px 34px)",
  };

  return (
    <section ref={ref} className="relative h-[300vh] bg-[#140c06]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="surface-grain pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay" />
        <div className="relative px-6 sm:px-12">
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.4em] text-[#f0d58a]">
            {storyIntro.title}
          </p>
          <h2 className="type-script mt-1 text-[clamp(2.6rem,9vw,4.5rem)] leading-none text-[#fffaf2]">
            {storyIntro.names}
          </h2>
        </div>

        <motion.div ref={rowRef} className="relative mt-10 flex w-max" style={{ x }}>
          <div className="w-6 shrink-0 sm:w-12" />
          {filmStrip.map((frame, i) => (
            <figure
              key={i}
              className="relative shrink-0 bg-[#0b0704] px-3 py-7 sm:px-4 sm:py-9"
              style={{ transform: `rotate(${i % 2 ? 1.2 : -1.2}deg)` }}
            >
              <span className="absolute inset-x-0 top-2 h-3 opacity-80 sm:top-3" style={sprockets} />
              <span className="absolute inset-x-0 bottom-2 h-3 opacity-80 sm:bottom-3" style={sprockets} />
              <div className="relative aspect-[3/4] h-[44svh] overflow-hidden sm:h-[50svh]">
                <Image
                  src={frame.src}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 30vw, 60vw"
                  className="object-cover"
                  style={lookStyle(frame)}
                />
              </div>
              <figcaption className="type-script absolute -bottom-9 left-4 text-2xl text-[#f0d58a]/90">
                {frame.caption}
              </figcaption>
            </figure>
          ))}
          <div className="w-6 shrink-0 sm:w-12" />
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Closing lines ─────────────────────────── */

function ClosingLine({
  text,
  index,
  total,
  progress,
}: {
  text: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const opacity = useTransform(progress, [start, start + 0.8 / total], [0.25, 1]);
  const y = useTransform(progress, [start, start + 0.8 / total], [24, 0]);
  const blur = useTransform(progress, [start, start + 0.8 / total], [4, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const hero = text.startsWith("Obinasom.");
  const tag = text.startsWith("#");

  return (
    <motion.p
      style={{ opacity, y, filter }}
      className={cn(
        hero
          ? "type-script py-4 text-[clamp(2.8rem,10vw,5.5rem)] leading-tight text-[#f0d58a] [text-shadow:0_0_40px_rgba(212,175,55,0.35)]"
          : tag
            ? "pt-6 font-display text-sm font-bold uppercase tracking-[0.5em] text-soft-gold"
            : index === 0
              ? "font-display text-[clamp(1.8rem,6vw,3rem)] font-bold text-[#fffaf2]"
              : "font-serif text-[clamp(1.15rem,3.6vw,1.6rem)] italic leading-relaxed text-ivory",
      )}
    >
      {text}
    </motion.p>
  );
}

function Closing() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 65%"] });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#140c06] px-6 py-32 text-center sm:py-40"
    >
      <div className="surface-grain pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.16),transparent_65%)]" />
      <div className="relative mx-auto max-w-3xl space-y-5">
        {closingLines.map((line, i) => (
          <ClosingLine
            key={i}
            text={line}
            index={i}
            total={closingLines.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────── Finale ─────────────────────────── */

function useCountdown(iso: string) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const target = new Date(iso).getTime();
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [iso]);
  return left;
}

function Finale() {
  const reduce = useReducedMotion();
  const left = useCountdown(wedding.date.iso);
  const units =
    left === null
      ? []
      : [
          { label: "Days", value: Math.floor(left / 86_400_000) },
          { label: "Hours", value: Math.floor(left / 3_600_000) % 24 },
          { label: "Minutes", value: Math.floor(left / 60_000) % 60 },
          { label: "Seconds", value: Math.floor(left / 1000) % 60 },
        ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f9f4ec] via-[#f3e9da] to-[#ead9c3] px-6 pb-28 pt-16 text-center">
      <PetalGather shape="heart" wind="up" seed={21} width={260} height={220} className="mx-auto">
        <span className="type-script text-[2.2rem] text-cognac">11 · 20 · 26</span>
      </PetalGather>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1.2, ease: easeSmooth }}
      >
        <p className="mx-auto mt-5 max-w-lg font-serif text-lg leading-relaxed text-ink-soft">
          {wedding.date.long} · {wedding.venue.name}, {wedding.venue.cityLine}
        </p>

        <div className="mx-auto mt-10 grid max-w-xl grid-cols-4 gap-2 sm:gap-4">
          {units.map((u) => (
            <div
              key={u.label}
              className="rounded-t-[999px] border border-soft-gold/40 bg-[#fffaf2]/80 px-1 pb-4 pt-6 shadow-[var(--shadow-sm)] backdrop-blur-sm"
            >
              <p className="font-display text-[clamp(1.6rem,6vw,2.6rem)] font-bold leading-none text-mocha tabular-nums">
                {String(u.value).padStart(2, "0")}
              </p>
              <p className="mt-2 font-display text-[9px] font-bold uppercase tracking-[0.25em] text-cognac sm:text-[10px]">
                {u.label}
              </p>
            </div>
          ))}
        </div>

        <GoldHeartDivider className="mx-auto mt-12" />

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/rsvp"
            className="btn-shimmer inline-flex min-h-[52px] items-center gap-3 rounded-full bg-gradient-to-r from-[#b8892c] via-[#e9cf86] to-[#b8892c] px-8 font-display text-xs font-bold uppercase tracking-[0.26em] text-mocha shadow-[0_14px_40px_rgba(212,175,55,0.3)] transition hover:scale-[1.03]"
          >
            RSVP
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/schedule"
            className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-cognac/40 px-8 font-display text-xs font-bold uppercase tracking-[0.26em] text-cognac transition hover:bg-cognac hover:text-ivory"
          >
            <CalendarHeart className="h-4 w-4" />
            The schedule
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export function LoveStoryExperience() {
  return (
    <div className="bg-[#f9f4ec]">
      <Opening />
      <Voices items={voices.slice(0, 3)} offset={0} />
      <FilmStrip />
      <Voices items={voices.slice(3)} offset={3} />
      <Closing />
      <Finale />
    </div>
  );
}
