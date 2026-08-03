"use client";

import { CalendarPlus, Share2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { wedding } from "@/lib/wedding";
import { Reveal, Float } from "@/components/ui/Reveal";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { GoldHeart, GoldDiamond } from "@/components/ui/GoldOrnaments";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

function buildIcs() {
  const start = wedding.date.iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const endDate = new Date(wedding.date.iso);
  endDate.setHours(endDate.getHours() + 6);
  const end = endDate.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Obinasom//Wedding//EN",
    "BEGIN:VEVENT",
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${wedding.bride.first} & ${wedding.groom.first} Wedding`,
    `LOCATION:${wedding.venue.address}`,
    `DESCRIPTION:Traditional wedding celebration. ${wedding.hashtag}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function ShareActions() {
  const reduce = useReducedMotion();

  const addToCalendar = () => {
    const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Obinasom-wedding.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.origin : "";
    const text = `You're invited to ${wedding.bride.display} & ${wedding.groom.display}'s wedding — ${wedding.date.display}, ${wedding.venue.name}`;
    if (navigator.share) {
      await navigator.share({ title: "Obinasom Wedding", text, url });
      return;
    }
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
      "_blank",
    );
  };

  return (
    <section id="share" className="relative overflow-hidden">
      <div className="bg-mocha px-6 py-16 text-center sm:py-20">
        <motion.div
          className="mb-4 flex justify-center gap-3 text-soft-gold/70"
          initial={reduce ? false : { opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOutExpo }}
        >
          <GoldDiamond />
          <GoldHeart size={12} />
          <GoldDiamond />
        </motion.div>

        <Float amplitude={7} duration={5}>
          {reduce ? (
            <p className="type-script text-5xl text-champagne">Save & Share</p>
          ) : (
            <TypewriterText
              text="Save & Share"
              as="p"
              className="type-script min-h-[1.1em] text-5xl text-champagne"
              whenInView
              delay={100}
              speed={60}
            />
          )}
        </Float>

        <Reveal from="up" delay={0.2}>
          <p className="mx-auto mt-4 max-w-md font-serif text-base text-blush/70">
            Keep the date close and invite the ones you love.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Reveal from="left" delay={0.25}>
            <motion.button
              type="button"
              onClick={addToCalendar}
              className="inline-flex min-h-12 items-center gap-2 border border-soft-gold/40 px-8 font-display text-xs font-bold uppercase tracking-[0.22em] text-champagne transition hover:border-soft-gold hover:bg-white/5"
              whileHover={reduce ? undefined : { y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CalendarPlus className="h-3.5 w-3.5" />
              Add to Calendar
            </motion.button>
          </Reveal>
          <Reveal from="right" delay={0.35}>
            <motion.button
              type="button"
              onClick={() => void share()}
              className="inline-flex min-h-12 items-center gap-2 bg-soft-gold px-8 font-display text-xs font-bold uppercase tracking-[0.22em] text-mocha transition hover:bg-champagne"
              whileHover={reduce ? undefined : { y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Share2 className="h-3.5 w-3.5" />
              Share Invite
            </motion.button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
