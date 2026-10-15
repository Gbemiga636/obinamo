"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Bone,
  Compass,
  CupSoda,
  FerrisWheel,
  Fish,
  Flower2,
  Landmark,
  MapPin,
  MessageCircleHeart,
  Plus,
  Trees,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PetalGather } from "@/components/effects/PetalGather";
import { GoldDiamond } from "@/components/ui/GoldOrnaments";
import { wedding, type Faq } from "@/lib/wedding";
import { easeSmooth } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ICONS = {
  fish: Fish,
  flower: Flower2,
  trees: Trees,
  soda: CupSoda,
  wheel: FerrisWheel,
  landmark: Landmark,
  bone: Bone,
} as const;

const TABS = [
  { id: "things-to-do", label: "Things to Do", icon: Compass },
  { id: "faqs", label: "FAQs", icon: MessageCircleHeart },
] as const;

type TabId = (typeof TABS)[number]["id"];

const GROUPS = (["The Big Day", "Guests & RSVP", "Travel & Stay"] as const)
  .map((group) => ({
    group,
    items: wedding.faqs
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.group === group),
  }));

const mapsFor = (name: string, address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${address}`)}`;

function FaqItem({
  item,
  index,
  open,
  onToggle,
}: {
  item: Faq;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const external = item.link && !item.link.href.startsWith("/");

  return (
    <div
      className={cn(
        "border-b border-[var(--line)] transition-colors",
        open && "bg-paper/60",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-start gap-4 px-2 py-5 text-left sm:px-4"
      >
        <span className="mt-0.5 font-display text-[11px] font-bold tracking-[0.2em] text-gold-ink">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 font-display text-[15px] font-bold leading-snug tracking-[0.02em] text-mocha transition group-hover:text-cognac sm:text-base">
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.4, ease: easeSmooth }}
          className={cn(
            "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors",
            open
              ? "border-cognac bg-cognac text-ivory"
              : "border-soft-gold/50 text-cognac",
          )}
        >
          <Plus className="h-3.5 w-3.5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="answer"
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: easeSmooth }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-[42px] pr-4 sm:pl-[52px] sm:pr-12">
              <p className="font-serif text-[15px] leading-relaxed text-ink-soft/85 sm:text-base">
                {item.a}
              </p>
              {item.link ? (
                external ? (
                  <a
                    href={item.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-cognac hover:text-mocha"
                  >
                    {item.link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <Link
                    href={item.link.href}
                    className="mt-4 inline-flex items-center gap-1.5 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-cognac hover:text-mocha"
                  >
                    {item.link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                )
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function ThingsAndFaqsExperience() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<TabId>("things-to-do");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (window.location.hash === "#faqs") setTab("faqs");
  }, []);

  const selectTab = (id: TabId) => {
    setTab(id);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${id === "faqs" ? "#faqs" : ""}`,
    );
    document
      .getElementById("guide")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
        eyebrow="Things to Do & FAQs"
        title="Explore with Us"
        subtitle="Atlanta · Norcross"
        scrollTarget="guide"
        scrollLabel="Your guide"
      >
        <p>
          A few of our favourite Atlanta adventures, plus answers to
          everything you&apos;ve been wondering.
        </p>
      </PageHero>

      <section id="guide" className="relative scroll-mt-20 px-4 pb-20 pt-6">
        {/* Tabs */}
        <div className="sticky top-16 z-20 mx-auto flex w-fit max-w-full justify-center py-3">
          <div className="relative flex border border-soft-gold/45 bg-paper/90 p-1 shadow-[var(--shadow-md)] backdrop-blur-md">
            {TABS.map(({ id, label, icon: Icon }) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => selectTab(id)}
                  className={cn(
                    "relative flex min-h-11 items-center gap-2 px-5 font-display text-[11px] font-bold uppercase tracking-[0.2em] transition-colors sm:px-7",
                    active ? "text-ivory" : "text-cognac hover:text-mocha",
                  )}
                  aria-pressed={active}
                >
                  {active ? (
                    <motion.span
                      layoutId="guide-tab"
                      className="absolute inset-0 bg-cognac"
                      transition={{ duration: 0.5, ease: easeSmooth }}
                    />
                  ) : null}
                  <Icon className="relative h-3.5 w-3.5" strokeWidth={1.8} />
                  <span className="relative">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {tab === "things-to-do" ? (
            <motion.div
              key="things"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: easeSmooth }}
            >
              <div className="mt-10 text-center">
                <p className="type-eyebrow">While you&apos;re in town</p>
                <h2 className="type-script mt-2 text-[clamp(2.4rem,9vw,3.6rem)]">
                  Things to Do
                </h2>
                <p className="mx-auto mt-3 max-w-md font-serif text-[15px] leading-relaxed text-ink-soft/75 sm:text-base">
                  Make a weekend of it! Most of these favourites are a 25–40
                  minute drive from Norcross, depending on traffic.
                </p>
              </div>

              <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {wedding.thingsToDo.map((place, i) => {
                  const Icon = ICONS[place.icon];
                  return (
                    <motion.article
                      key={place.name}
                      className="panel group relative flex flex-col items-center overflow-hidden px-6 pb-7 pt-9 text-center hover:-translate-y-1"
                      initial={reduce ? false : { opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.9,
                        ease: easeSmooth,
                        delay: (i % 3) * 0.1,
                      }}
                    >
                      <span className="pointer-events-none absolute right-4 top-3 font-display text-[2.6rem] font-extrabold leading-none text-soft-gold/[0.16]">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div className="relative">
                        <span
                          className="absolute -inset-2 rounded-full border border-dashed border-soft-gold/50 transition-transform duration-[1.6s] ease-out group-hover:rotate-90"
                          aria-hidden
                        />
                        <span
                          className="relative flex h-24 w-24 items-center justify-center rounded-full text-ivory shadow-[var(--shadow-md)]"
                          style={{
                            background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), transparent 55%), linear-gradient(145deg, ${place.tone}, #2a1d12)`,
                          }}
                        >
                          <Icon className="h-9 w-9" strokeWidth={1.3} />
                        </span>
                      </div>

                      <h3 className="mt-6 font-display text-base font-bold uppercase leading-snug tracking-[0.08em] text-mocha">
                        {place.name}
                      </h3>
                      <p className="mt-2 flex items-start justify-center gap-1.5 font-serif text-xs text-ink-soft">
                        <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-soft-gold" />
                        {place.address}
                      </p>
                      <p className="mt-3 flex-1 font-serif text-[15px] leading-relaxed text-ink-soft/80">
                        {place.blurb}
                      </p>

                      <div className="mt-6 flex gap-2">
                        <a
                          href={place.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-10 items-center gap-1.5 bg-cognac px-5 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-ivory transition hover:bg-mocha"
                        >
                          View
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                        <a
                          href={mapsFor(place.name, place.address)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-10 items-center gap-1.5 border border-soft-gold/45 px-5 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-cognac transition hover:border-cognac"
                        >
                          Map
                        </a>
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              <div className="mt-12 text-center">
                <button
                  type="button"
                  onClick={() => selectTab("faqs")}
                  className="btn-ghost gap-2"
                >
                  <MessageCircleHeart className="h-4 w-4" />
                  Read our FAQs
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="faqs"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: easeSmooth }}
            >
              <div className="mt-10 text-center">
                <p className="type-eyebrow">Ask away</p>
                <h2 className="type-script mt-2 text-[clamp(2.4rem,9vw,3.6rem)]">
                  Questions & Answers
                </h2>
              </div>

              <div className="mx-auto mt-10 max-w-3xl space-y-10">
                {GROUPS.map(({ group, items }) => (
                  <div key={group}>
                    <div className="mb-2 flex items-center gap-3">
                      <GoldDiamond />
                      <p className="type-eyebrow text-[10px]">{group}</p>
                      <span className="h-px flex-1 bg-gradient-to-r from-soft-gold/50 to-transparent" />
                    </div>
                    <div className="border-t border-[var(--line)]">
                      {items.map(({ item, index }) => (
                        <FaqItem
                          key={item.q}
                          item={item}
                          index={index}
                          open={openFaq === index}
                          onToggle={() =>
                            setOpenFaq((cur) => (cur === index ? null : index))
                          }
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Closing ── */}
      <section
        className="relative overflow-hidden px-6 py-12 text-center sm:py-14"
        style={{
          background:
            "linear-gradient(105deg, #4f3119 0%, #8f5a2b 42%, #6b4020 100%)",
        }}
      >
        <div className="flex justify-center">
          <PetalGather shape="heart" wind="left" seed={41} width={220} height={190}>
            <span className="type-script mt-3 text-[2rem] text-ivory">
              with love
            </span>
          </PetalGather>
        </div>
        <motion.div className="mt-2" {...inView()}>
          <p className="font-display text-lg font-bold tracking-wide text-ivory sm:text-2xl">
            {wedding.bride.first} &amp; {wedding.groom.first}
          </p>
          <div className="mx-auto my-3 h-px w-14 bg-soft-gold/55" />
          <p className="mx-auto max-w-md font-serif text-sm text-ivory/85 sm:text-base">
            We can&apos;t wait to celebrate with you. {wedding.hashtag}
          </p>
          <Link
            href="/rsvp"
            className="btn-shimmer mt-7 inline-flex min-h-[48px] items-center justify-center gap-2 border border-ivory/55 px-8 font-display text-xs font-bold uppercase tracking-[0.22em] text-ivory transition hover:bg-ivory hover:text-cognac"
          >
            RSVP now
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
