"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrollY } from "@/hooks/useMouseParallax";
import { LogoMark } from "@/components/ui/LogoMark";
import { ComingSoonModal } from "@/components/layout/ComingSoonModal";
import { navItems, wedding } from "@/lib/wedding";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

export function Navbar() {
  const pathname = usePathname();
  const scrollY = useScrollY();
  const compact = scrollY > 20;
  const [open, setOpen] = useState(false);
  const [soonTitle, setSoonTitle] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const onNavClick = (
    e: React.MouseEvent,
    item: (typeof navItems)[number],
  ) => {
    if (item.live) return;
    e.preventDefault();
    setOpen(false);
    setSoonTitle(item.label);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          compact || open
            ? "h-16 border-b border-[var(--line)] bg-ivory/90 shadow-[var(--shadow-sm)] backdrop-blur-xl"
            : "h-16 bg-transparent md:h-[72px]",
        )}
      >
        <nav className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 md:px-8">
          <Link href="/" className="shrink-0" aria-label="Obinasom home">
            <Image
              src="/images/logo.png"
              alt="Obinasom"
              width={34}
              height={34}
              className="rounded-full object-cover"
            />
          </Link>

          <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex lg:gap-2">
            {navItems.map((item) => {
              const isRoute = !item.href.includes("#");
              const active = isRoute && pathname === item.href;
              return (
                <li key={item.label}>
                  <Link
                    href={item.live ? item.href : "#"}
                    onClick={(e) => onNavClick(e, item)}
                    className={cn(
                      "relative block whitespace-nowrap px-2.5 py-2 font-display text-xs font-bold uppercase tracking-[0.18em] transition-colors",
                      active
                        ? "text-soft-gold"
                        : "text-ink-soft/80 hover:text-cognac",
                      !item.live && "opacity-70",
                    )}
                  >
                    {item.label}
                    {active ? (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-2 -bottom-0.5 h-px bg-soft-gold"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="hidden md:block lg:hidden">
            <LogoMark size={36} />
          </p>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center border border-[var(--line)] bg-paper/70 text-ink transition hover:border-soft-gold lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="hidden w-[34px] lg:block" aria-hidden />
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-mocha/35 backdrop-blur-md"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="absolute inset-y-0 right-0 flex w-[min(100%,360px)] flex-col bg-ivory shadow-[var(--shadow-xl)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: easeOutExpo }}
            >
              <div className="flex h-16 items-center justify-between border-b border-[var(--line)] px-5">
                <LogoMark size={36} />
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center text-ink"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-8">
                <ul className="space-y-1">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, ease: easeOutExpo }}
                    >
                      <Link
                        href={item.live ? item.href : "#"}
                        onClick={(e) => onNavClick(e, item)}
                        className="flex items-center justify-between border-b border-[var(--line)] py-4 font-display text-sm font-bold uppercase tracking-[0.22em] text-cognac transition hover:text-soft-gold"
                      >
                        <span>{item.label}</span>
                        {!item.live ? (
                          <span className="font-serif text-[10px] font-normal normal-case tracking-normal text-dusty-blue/70">
                            Soon
                          </span>
                        ) : null}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-[var(--line)] px-6 py-6 text-center">
                <p className="type-eyebrow text-[10px] text-dusty-blue">
                  {wedding.date.display}
                </p>
                <p className="mt-1 font-serif text-sm text-ink-soft">
                  {wedding.venue.name}
                </p>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <ComingSoonModal
        open={!!soonTitle}
        title={soonTitle ?? undefined}
        onClose={() => setSoonTitle(null)}
      />
    </>
  );
}
