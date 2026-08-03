"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FloralSide } from "@/components/flowers/FloralSide";
import { InvitationCard } from "@/components/save-the-date/InvitationCard";
import { Typewriter } from "@/components/save-the-date/Typewriter";
import { LogoMark } from "@/components/ui/LogoMark";
import { wedding } from "@/lib/wedding";
import { easeOutExpo } from "@/lib/motion";

export function SaveTheDateExperience() {
  const [ready, setReady] = useState(false);
  const [typeOn, setTypeOn] = useState(false);

  useEffect(() => {
    const a = window.setTimeout(() => setReady(true), 160);
    const b = window.setTimeout(() => setTypeOn(true), 1800);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-x-hidden pb-24 pt-28">
      <div className="surface-paper absolute inset-0" />
      <div className="surface-grain absolute inset-0" />

      <FloralSide side="left" introDelay={0.2} className="opacity-85" />
      <FloralSide side="right" introDelay={0.35} className="opacity-85" />

      <div className="relative z-20 mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
        <motion.p
          className="type-eyebrow text-dusty-blue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: easeOutExpo }}
        >
          Please join us
        </motion.p>

        <div className="mt-10 w-full">
          {ready ? (
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.15, ease: easeOutExpo }}
            >
              <InvitationCard />
            </motion.div>
          ) : (
            <div className="mx-auto h-[520px] w-full max-w-[460px] animate-pulse border border-[var(--line)] bg-paper/60" />
          )}
        </div>

        <Typewriter active={typeOn} />

        <div className="mt-10 flex flex-col items-center gap-2">
          <LogoMark size={40} />
        </div>
      </div>
    </section>
  );
}
