"use client";

import Link from "next/link";
import {
  CalendarHeart,
  Heart,
  Hash,
  MapPin,
  Sparkles,
} from "lucide-react";
import { LogoMark } from "@/components/ui/LogoMark";
import { GoldHeart, GoldHeartDivider } from "@/components/ui/GoldOrnaments";
import { wedding, navItems } from "@/lib/wedding";

const quickLinks = navItems.filter((item) => item.live);

const details = [
  {
    icon: CalendarHeart,
    label: "The Day",
    value: wedding.date.display,
  },
  {
    icon: MapPin,
    label: "The Place",
    value: wedding.venue.name,
  },
  {
    icon: Hash,
    label: "Celebrate With Us",
    value: wedding.hashtag,
  },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Warm layered backdrop — mocha → cognac, not flat black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, #3b2a1a 0%, #2a1d12 42%, #1a120c 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(182,122,61,0.35), transparent 55%), radial-gradient(ellipse at 15% 80%, rgba(108,125,143,0.18), transparent 40%), radial-gradient(ellipse at 85% 70%, rgba(226,194,184,0.12), transparent 35%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Top gold hairline */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-soft-gold/55 to-transparent" />

      <div className="relative mx-auto max-w-5xl px-6 pb-10 pt-14 sm:px-8 sm:pt-16">
        {/* Brand */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-5 rounded-full border border-soft-gold/40 bg-[#1a120c]/60 p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.35)]">
            <LogoMark size={56} className="h-14 w-14" />
          </div>

          <p className="font-script text-[2.75rem] leading-none text-champagne sm:text-5xl">
            Obinasom
          </p>

          <div className="mt-4 flex items-center gap-2.5 text-blush/80">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.28em]">
              {wedding.bride.first}
            </span>
            <GoldHeart size={12} />
            <span className="font-display text-xs font-semibold uppercase tracking-[0.28em]">
              {wedding.groom.first}
            </span>
          </div>

          <p className="mt-3 max-w-md font-serif text-sm text-ivory/55">
            {wedding.bride.display} &amp; {wedding.groom.display}
          </p>

          <div className="mt-6 w-full max-w-sm">
            <GoldHeartDivider />
          </div>
        </div>

        {/* Icon details */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {details.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-sm border border-soft-gold/15 bg-gradient-to-b from-caramel/10 to-transparent px-4 py-5 text-center backdrop-blur-[2px]"
            >
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-soft-gold/35 bg-cognac/30 text-soft-gold">
                <Icon className="h-4 w-4" strokeWidth={1.6} />
              </span>
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-blush/55">
                {label}
              </p>
              <p className="mt-2 font-serif text-sm text-ivory/85">{value}</p>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <nav
          aria-label="Footer"
          className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3"
        >
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-champagne/55 transition hover:text-soft-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Hashtag CTA */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-soft-gold/30 bg-soft-gold/10 px-5 py-2.5 text-soft-gold">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.6} />
            <span className="font-display text-xs font-bold tracking-[0.18em]">
              {wedding.hashtag}
            </span>
            <Heart className="h-3.5 w-3.5 fill-soft-gold/40" strokeWidth={1.6} />
          </div>
          <p className="font-serif text-xs text-ivory/40">
            Share your joy with our hashtag
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-soft-gold/15 pt-6 sm:flex-row sm:justify-between">
          <p className="font-serif text-[11px] text-ivory/35">
            With love · {year} · Made for forever
          </p>
          <p className="flex items-center gap-1.5 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-blush/40">
            <Heart className="h-3 w-3 text-soft-gold/50" strokeWidth={1.5} />
            {wedding.monogram} · Obinasom
          </p>
        </div>
      </div>
    </footer>
  );
}
