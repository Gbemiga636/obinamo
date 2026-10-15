"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { LogoMark } from "@/components/ui/LogoMark";
import { wedding } from "@/lib/wedding";
import { easeSmooth } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Status = "idle" | "checking" | "denied" | "granted";

const DOOR_BG =
  "radial-gradient(ellipse 90% 70% at 50% 45%, #3d2817 0%, #24170d 55%, #120b06 100%)";

const DUST = Array.from({ length: 26 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53 + 11) % 100}%`,
  size: 1.5 + ((i * 7) % 3),
  delay: (i * 0.7) % 6,
  dur: 6 + ((i * 3) % 6),
}));

const SPARKS = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const dist = 120 + (i % 3) * 40;
  return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, rot: i * 40 };
});

const DENIED_LINES = [
  "Hmm, that's not quite it.",
  "Not yet, try once more.",
  "So close. Check your invitation.",
];

function KeyholeSeal({ status }: { status: Status }) {
  const reduce = useReducedMotion();
  const granted = status === "granted";

  return (
    <div className="relative mx-auto h-[150px] w-[150px] sm:h-[168px] sm:w-[168px]">
      {/* revolving motto */}
      <motion.svg
        viewBox="0 0 160 160"
        className="absolute inset-0 h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{
          duration: status === "checking" ? 4 : 32,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <defs>
          <path id="gate-ring" d="M80,80 m-64,0 a64,64 0 1,1 128,0 a64,64 0 1,1 -128,0" />
        </defs>
        <text
          className="fill-[#e9cf86]"
          style={{ fontSize: 9.5, letterSpacing: 2.2, fontWeight: 700 }}
        >
          <textPath href="#gate-ring" textLength={400} lengthAdjust="spacing">
            {granted
              ? "WELCOME · WELCOME · WELCOME · WELCOME · "
              : "IF YOU KNOW · YOU KNOW · IF YOU KNOW · YOU KNOW · "}
          </textPath>
        </text>
      </motion.svg>

      {/* medallion */}
      <motion.div
        className={cn(
          "absolute inset-[26px] flex items-center justify-center rounded-full border sm:inset-[30px]",
          status === "denied" ? "border-[#d27a6e]" : "border-[#d4af37]",
        )}
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #f6e3a6 0%, #d4af37 38%, #8a6418 100%)",
          boxShadow: granted
            ? "0 0 60px 18px rgba(240,213,138,0.55), inset 0 2px 6px rgba(255,255,255,0.6)"
            : "0 10px 30px rgba(0,0,0,0.5), inset 0 2px 6px rgba(255,255,255,0.5)",
        }}
        animate={
          status === "denied"
            ? { rotate: [0, -14, 12, -9, 6, 0] }
            : granted
              ? { scale: [1, 1.12, 1] }
              : { rotate: 0, scale: 1 }
        }
        transition={{ duration: status === "denied" ? 0.6 : 0.9, ease: "easeInOut" }}
      >
        {/* keyhole turns when the right word is spoken */}
        <motion.svg
          viewBox="0 0 24 34"
          className="h-10 w-7 sm:h-11 sm:w-8"
          animate={{ rotate: granted ? 90 : 0 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: granted ? 0.15 : 0 }}
        >
          <circle cx="12" cy="10" r="7.5" fill="#2a1a0c" />
          <path d="M8 14 L5 32 L19 32 L16 14 Z" fill="#2a1a0c" />
          <circle cx="10" cy="8" r="2" fill="#f6e3a6" opacity={granted ? 0.9 : 0.25} />
        </motion.svg>
      </motion.div>

      {/* burst of light on success */}
      <AnimatePresence>
        {granted ? (
          <>
            <motion.span
              key="burst"
              className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,246,214,0.95),rgba(240,213,138,0.5)_40%,transparent_70%)]"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 9, opacity: 0 }}
              transition={{ duration: 1.6, ease: "easeOut", delay: 0.6 }}
            />
            {[0, 1].map((i) => (
              <motion.span
                key={`ring-${i}`}
                className="pointer-events-none absolute inset-6 rounded-full border border-[#f0d58a]"
                initial={{ scale: 1, opacity: 0.9 }}
                animate={{ scale: 3.2 + i, opacity: 0 }}
                transition={{ duration: 1.4, delay: 0.55 + i * 0.2, ease: "easeOut" }}
              />
            ))}
            {SPARKS.map((s, i) => (
              <motion.span
                key={`spark-${i}`}
                className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#f0d58a] shadow-[0_0_10px_rgba(240,213,138,0.9)]"
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                animate={{ x: s.x, y: s.y, opacity: [0, 1, 0], scale: [0.4, 1, 0.6], rotate: s.rot }}
                transition={{ duration: 1.3, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function PasswordGate({ onEnter }: { onEnter: () => void }) {
  const reduce = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [attempts, setAttempts] = useState(0);
  const onEnterRef = useRef(onEnter);
  onEnterRef.current = onEnter;

  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 1200);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (status !== "granted") return;
    const t = window.setTimeout(() => onEnterRef.current(), reduce ? 900 : 2600);
    return () => window.clearTimeout(t);
  }, [status, reduce]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim() || status === "checking" || status === "granted") return;
    setStatus("checking");
    const ok = await fetch("/api/obinasom/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: value }),
    })
      .then((r) => r.ok)
      .catch(() => false);

    if (ok) {
      inputRef.current?.blur();
      setStatus("granted");
      return;
    }
    setAttempts((n) => n + 1);
    setStatus("denied");
    window.setTimeout(() => {
      setValue("");
      inputRef.current?.focus();
    }, 650);
  };

  const granted = status === "granted";
  const denied = status === "denied";

  return (
    <motion.div
      className="fixed inset-0 z-[200] overflow-hidden"
      exit={{ pointerEvents: "none" }}
      transition={{ duration: 1.6 }}
      role="dialog"
      aria-modal="true"
      aria-label="Enter the password to view the wedding website"
    >
      {/* the two doors */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 border-r border-[#d4af37]/60 shadow-[8px_0_40px_rgba(212,175,55,0.15)]"
        style={{ background: DOOR_BG, backgroundSize: "200% 100%", backgroundPosition: "0% 50%" }}
        exit={{ x: "-102%" }}
        transition={{ duration: reduce ? 0.5 : 1.6, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 border-l border-[#d4af37]/60 shadow-[-8px_0_40px_rgba(212,175,55,0.15)]"
        style={{ background: DOOR_BG, backgroundSize: "200% 100%", backgroundPosition: "100% 50%" }}
        exit={{ x: "102%" }}
        transition={{ duration: reduce ? 0.5 : 1.6, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* light pouring through the seam once unlocked */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-[#fff6d6]"
        initial={{ opacity: 0 }}
        animate={granted ? { opacity: [0, 1, 1], boxShadow: "0 0 80px 30px rgba(240,213,138,0.55)" } : { opacity: 0 }}
        exit={{ opacity: 0, scaleX: 40 }}
        transition={{ duration: granted ? 1.2 : 0.8, delay: granted ? 1.2 : 0 }}
      />

      <motion.div
        className="surface-grain pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* drifting gold dust */}
      {!reduce ? (
        <motion.div className="pointer-events-none absolute inset-0" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
          {DUST.map((d, i) => (
            <span
              key={i}
              className="hero-float absolute rounded-full bg-[#f0d58a]"
              style={{
                left: d.left,
                top: d.top,
                width: d.size,
                height: d.size,
                opacity: 0.55,
                boxShadow: "0 0 8px rgba(240,213,138,0.8)",
                animationDelay: `${d.delay}s`,
                animationDuration: `${d.dur}s`,
              }}
            />
          ))}
        </motion.div>
      ) : null}

      {/* content */}
      <motion.div
        className="relative flex h-full flex-col items-center justify-center overflow-y-auto px-6 py-10 text-center"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.08, filter: "blur(6px)" }}
        transition={{ duration: 1, ease: easeSmooth }}
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: easeSmooth }}
          className="rounded-full border border-[#d4af37]/60 bg-paper/95 p-1 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
        >
          <LogoMark size={44} className="h-11 w-11" priority />
        </motion.div>

        <AnimatePresence mode="wait">
          {granted ? (
            <motion.div
              key="granted-copy"
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: easeSmooth }}
              className="mt-5"
            >
              <p className="font-display text-[11px] font-bold uppercase tracking-[0.42em] text-[#f0d58a]">
                Access Granted
              </p>
              <p className="type-script mt-1 text-[clamp(2.6rem,11vw,4rem)] leading-tight text-[#fffaf2]">
                Welcome, beloved
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="locked-copy"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.8, delay: 0.35, ease: easeSmooth }}
              className="mt-5"
            >
              <p className="font-display text-[11px] font-bold uppercase tracking-[0.42em] text-[#e9cf86]/85">
                A Private Celebration
              </p>
              <p className="type-script mt-1 bg-gradient-to-r from-[#c9a24a] via-[#f6e3a6] to-[#c9a24a] bg-clip-text text-[clamp(2.6rem,11vw,4rem)] leading-tight text-transparent [filter:drop-shadow(0_2px_14px_rgba(212,175,55,0.35))]">
                {wedding.bride.first} &amp; {wedding.groom.first}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5">
          <KeyholeSeal status={status} />
        </div>

        <AnimatePresence mode="wait">
          {granted ? (
            <motion.p
              key="granted-note"
              className="mt-7 max-w-xs font-serif text-base italic text-ivory/85"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              You know. Come on in, we&apos;ve been waiting for you.
            </motion.p>
          ) : (
            <motion.form
              key="form"
              onSubmit={submit}
              className="mt-7 w-full max-w-[340px]"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.8, delay: 0.55, ease: easeSmooth }}
            >
              <p className="font-serif text-base italic text-ivory sm:text-lg">
                If you know, you know.
              </p>
              <p className="mt-1 font-serif text-sm text-ivory/85">
                Enter the password from your invitation to step inside.
              </p>

              <motion.div
                className={cn(
                  "relative mt-5 flex items-center border-b-2 transition-colors duration-300",
                  denied
                    ? "border-[#d27a6e]"
                    : "border-[#d4af37]/60 focus-within:border-[#f0d58a]",
                )}
                animate={denied ? { x: [0, -12, 11, -8, 6, -3, 0] } : { x: 0 }}
                transition={{ duration: 0.55 }}
              >
                <input
                  ref={inputRef}
                  type={show ? "text" : "password"}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value.toUpperCase());
                    if (denied) setStatus("idle");
                  }}
                  placeholder="PASSWORD"
                  autoComplete="off"
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck={false}
                  aria-label="Password"
                  aria-invalid={denied}
                  className="h-14 w-full bg-transparent pl-10 pr-10 text-center font-display text-xl font-bold tracking-[0.5em] text-[#fff6d6] caret-[#f0d58a] outline-none placeholder:text-sm placeholder:tracking-[0.4em] placeholder:text-ivory/55"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-0 flex h-10 w-10 items-center justify-center text-ivory/80 transition hover:text-[#f0d58a]"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </motion.div>

              <div className="h-7 pt-2">
                <AnimatePresence mode="wait">
                  {denied ? (
                    <motion.p
                      key={`denied-${attempts}`}
                      className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-[#e8a091]"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      Access Denied · {DENIED_LINES[(attempts - 1) % DENIED_LINES.length]}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>

              <button
                type="submit"
                disabled={!value.trim() || status === "checking"}
                className="btn-shimmer mt-3 inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#b8892c] via-[#e9cf86] to-[#b8892c] px-8 font-display text-xs font-bold uppercase tracking-[0.3em] text-mocha shadow-[0_14px_40px_rgba(212,175,55,0.3)] transition enabled:hover:scale-[1.02] disabled:opacity-75"
              >
                {status === "checking" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Unlocking
                  </>
                ) : (
                  <>
                    Unlock
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="mt-8 font-display text-[10px] font-bold uppercase tracking-[0.4em] text-[#e9cf86]">
          {wedding.hashtag} · {wedding.date.short}
        </p>
      </motion.div>
    </motion.div>
  );
}
