"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  InvitationProvider,
  useInvitation,
} from "@/providers/InvitationProvider";
import { SoundProvider } from "@/providers/SoundProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { InvitationGate } from "@/components/invitation/InvitationGate";
import { Navbar } from "@/components/layout/Navbar";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { AmbientMusic } from "@/components/effects/AmbientMusic";
import { FallingPetals } from "@/components/effects/FallingPetals";
import { SiteFooter } from "@/components/layout/SiteFooter";

function AppShell({ children }: { children: React.ReactNode }) {
  const { ready, unlocked } = useInvitation();

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", !unlocked);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [unlocked]);

  if (!ready) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f9f4ec]">
        <div className="h-8 w-8 animate-spin rounded-full border border-soft-gold/30 border-t-soft-gold" />
      </div>
    );
  }

  return (
    <>
      <AmbientMusic />
      <AnimatePresence mode="wait">
        {!unlocked ? <InvitationGate key="gate" /> : null}
      </AnimatePresence>

      <div
        className={`relative min-h-screen transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          unlocked ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <SmoothScrollProvider>
          <Navbar />
          {unlocked ? <FallingPetals count={10} /> : null}
          <main>{children}</main>
          <SiteFooter />
          <MusicToggle />
        </SmoothScrollProvider>
      </div>
    </>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SoundProvider>
      <InvitationProvider>
        <AppShell>{children}</AppShell>
      </InvitationProvider>
    </SoundProvider>
  );
}
