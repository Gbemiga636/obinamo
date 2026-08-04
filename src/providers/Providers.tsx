"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  InvitationProvider,
  useInvitation,
} from "@/providers/InvitationProvider";
import { SoundProvider } from "@/providers/SoundProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import {
  SaveDateGateProvider,
  useSaveDateGate,
} from "@/providers/SaveDateGate";
import { ExperienceLoader } from "@/components/invitation/ExperienceLoader";
import { Navbar } from "@/components/layout/Navbar";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { AmbientMusic } from "@/components/effects/AmbientMusic";
import { FallingPetals } from "@/components/effects/FallingPetals";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { easeSmooth } from "@/lib/motion";

function AppShell({ children }: { children: React.ReactNode }) {
  const { ready, unlocked } = useInvitation();
  const pathname = usePathname();
  const { envelopeOpen } = useSaveDateGate();

  const hideFooter =
    pathname === "/" ||
    (pathname.startsWith("/save-the-date") && !envelopeOpen);

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
        {!unlocked ? <ExperienceLoader key="loader" /> : null}
      </AnimatePresence>

      <div
        className={`relative min-h-screen transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          unlocked ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <SmoothScrollProvider>
          <Navbar />
          {unlocked ? <FallingPetals count={5} /> : null}
          <main>{children}</main>
          <AnimatePresence>
            {!hideFooter ? (
              <motion.div
                key="site-footer"
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.05, ease: easeSmooth }}
              >
                <SiteFooter />
              </motion.div>
            ) : null}
          </AnimatePresence>
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
        <SaveDateGateProvider>
          <AppShell>{children}</AppShell>
        </SaveDateGateProvider>
      </InvitationProvider>
    </SoundProvider>
  );
}
