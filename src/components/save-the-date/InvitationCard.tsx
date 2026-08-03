"use client";

import Image from "next/image";
import { wedding } from "@/lib/wedding";
import { GoldFlourish, GoldHeartDivider } from "@/components/ui/GoldOrnaments";

export function InvitationCard({ className = "" }: { className?: string }) {
  return (
    <article
      className={`relative mx-auto w-full max-w-[460px] overflow-hidden bg-paper shadow-[var(--shadow-xl)] ${className}`}
      style={{
        clipPath:
          "polygon(0% 2%, 2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%)",
      }}
    >
      <div className="pointer-events-none absolute inset-3 border border-[var(--line-strong)]" />
      <div className="pointer-events-none absolute inset-[14px] border border-[var(--line)]" />

      <div className="pointer-events-none absolute -left-10 top-4 h-[70%] w-48 opacity-95">
        <Image
          src="/images/flowers/bloom-card-right.png"
          alt=""
          fill
          className="object-contain object-left"
          sizes="192px"
          priority
        />
      </div>

      <div className="relative z-10 px-10 py-14 text-center sm:px-14 sm:py-16">
        <GoldFlourish />
        <p className="type-eyebrow mt-6 text-[10px] text-soft-gold">
          We are celebrating our
        </p>
        <p className="type-display mt-2 text-lg text-cognac sm:text-xl">
          {wedding.ceremonyLabel}
        </p>

        <div className="mt-7">
          <GoldHeartDivider />
        </div>

        <div className="mt-8">
          <p className="type-eyebrow text-[10px] text-caramel">{wedding.bride.first}</p>
          <p className="type-script mt-1 text-[3.25rem] sm:text-[3.75rem]">
            {wedding.bride.last}
          </p>
          <p className="my-1.5 font-display text-xl font-bold text-soft-gold">
            &amp;
          </p>
          <p className="type-eyebrow text-[10px] text-caramel">{wedding.groom.first}</p>
          <p className="type-script mt-1 text-[3.25rem] sm:text-[3.75rem]">
            {wedding.groom.middle} {wedding.groom.last}
          </p>
        </div>

        <div className="mt-8">
          <GoldHeartDivider />
        </div>

        <p className="type-eyebrow mt-7 text-[11px] text-cognac">Save the Date</p>
        <p className="type-eyebrow mt-3 text-[11px] text-cognac">{wedding.date.caps}</p>
        <p className="type-eyebrow mt-2 text-[11px] text-dusty-blue">
          {wedding.venue.name}
        </p>

        <div className="mt-9">
          <GoldFlourish className="rotate-180" />
        </div>

        <p className="type-eyebrow mt-6 text-[10px] text-caramel/90">
          Formal invitation to follow
        </p>
      </div>
    </article>
  );
}
