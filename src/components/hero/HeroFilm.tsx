"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSound } from "@/providers/SoundProvider";
import { setNavDark } from "@/lib/navTheme";

const FILM = "/media/film.mp4";
const POSTER = "/media/stills/film-poster.jpg";

type Phase = "idle" | "drop" | "reveal" | "film";

/** iOS can leave play() pending forever — never await it bare. */
function playSafely(video: HTMLVideoElement, ms = 1500) {
  return Promise.race([
    video.play().then(() => true),
    new Promise<boolean>((resolve) => window.setTimeout(() => resolve(false), ms)),
  ]).catch(() => false);
}

/**
 * A drop of liquid gold falls onto the arch's finial; its ripple opens a
 * window onto the pre-wedding film, which then fills the hero.
 */
export function HeroFilm({
  start,
  anchorRef,
  onReveal,
}: {
  start: boolean;
  anchorRef: RefObject<HTMLElement | null>;
  onReveal: () => void;
}) {
  const reduce = useReducedMotion();
  const { registerMedia, play } = useSound();
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const backdropRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [origin, setOrigin] = useState({ x: 0, y: 0, r: 0, band: 0 });
  const impacted = useRef(false);
  const [soundOn, setSoundOn] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const firstPass = useRef(true);
  const onRevealRef = useRef(onReveal);
  onRevealRef.current = onReveal;

  const measure = useCallback(() => {
    const root = rootRef.current;
    const anchor = anchorRef.current;
    if (!root) return { x: 0, y: 0, r: 0, band: 0 };
    const box = root.getBoundingClientRect();
    const a = anchor?.getBoundingClientRect();
    const x = a ? a.left + a.width / 2 - box.left : box.width / 2;
    const y = a ? Math.max(24, a.top - box.top + 6) : box.height * 0.3;
    const r = Math.hypot(Math.max(x, box.width - x), Math.max(y, box.height - y)) + 40;
    const band = document.getElementById("welcome")?.offsetHeight ?? 0;
    return { x, y, r, band };
  }, [anchorRef]);

  const startFilm = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    v.volume = 1;
    if (await playSafely(v)) {
      setSoundOn(true);
      return;
    }
    v.muted = true;
    setSoundOn(false);
    setNeedsTap(firstPass.current);
    void playSafely(v);
  }, []);

  // Sequence: wait → drop → ripple reveal → film
  useEffect(() => {
    if (!start || phase !== "idle") return;
    const timers: number[] = [];

    if (reduce) {
      setOrigin(measure());
      setPhase("film");
      onRevealRef.current();
      void startFilm();
      return;
    }

    timers.push(
      window.setTimeout(() => {
        setOrigin(measure());
        setPhase("drop");
      }, 900),
    );
    return () => timers.forEach(clearTimeout);
  }, [start, phase, reduce, measure, startFilm]);

  const onImpact = () => {
    if (impacted.current) return;
    impacted.current = true;
    setPhase("reveal");
    play("sparkle");
    onRevealRef.current();
    void startFilm();
    window.setTimeout(() => setPhase("film"), 2300);
  };

  // First tap anywhere unmutes the film if autoplay-with-sound was blocked
  useEffect(() => {
    if (!needsTap) return;
    const unlock = () => {
      const v = videoRef.current;
      if (!v || !firstPass.current) return;
      v.muted = false;
      void playSafely(v);
      setSoundOn(true);
      setNeedsTap(false);
    };
    const opts: AddEventListenerOptions = { capture: true, once: true };
    window.addEventListener("pointerdown", unlock, opts);
    window.addEventListener("keydown", unlock, opts);
    return () => {
      window.removeEventListener("pointerdown", unlock, opts);
      window.removeEventListener("keydown", unlock, opts);
    };
  }, [needsTap]);

  const toggleSound = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setNeedsTap(false);
    if (!v.muted) {
      v.muted = true;
      setSoundOn(false);
      return;
    }
    v.muted = false;
    if (v.paused) void playSafely(v);
    setSoundOn(true);
  }, []);

  const active = phase === "reveal" || phase === "film";

  // Film soundtrack takes over from ambient music while audible
  useEffect(() => {
    if (!active) return;
    registerMedia({ id: "hero-film", muted: !soundOn, toggle: toggleSound });
  }, [active, soundOn, toggleSound, registerMedia]);

  useEffect(() => () => registerMedia(null), [registerMedia]);

  useEffect(() => {
    if (!active) return;
    setNavDark(true);
    return () => setNavDark(false);
  }, [active]);

  useEffect(() => {
    if (phase === "idle") return;
    const onResize = () => setOrigin(measure());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [phase, measure]);

  // Pause when the tab is hidden
  useEffect(() => {
    if (!active) return;
    const onVis = () => {
      const v = videoRef.current;
      if (!v) return;
      if (document.hidden) v.pause();
      else void playSafely(v);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [active]);

  const onEnded = () => {
    const v = videoRef.current;
    if (!v) return;
    // Play once with sound, then loop silently and hand music back
    firstPass.current = false;
    v.muted = true;
    v.loop = true;
    setSoundOn(false);
    setNeedsTap(false);
    v.currentTime = 0;
    void playSafely(v);
  };

  const { x, y, r, band } = origin;

  return (
    <>
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-[5]">
      {/* Film window */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={false}
        animate={
          phase === "idle" || phase === "drop"
            ? { clipPath: `circle(0px at ${x}px ${y}px)` }
            : { clipPath: `circle(${r}px at ${x}px ${y}px)` }
        }
        transition={
          phase === "reveal"
            ? { duration: 2.2, ease: [0.65, 0, 0.25, 1] }
            : { duration: reduce ? 0.8 : 0 }
        }
        style={{ visibility: phase === "idle" ? "hidden" : "visible" }}
      >
        {/* Blurred copy fills the space around the full frame */}
        <video
          ref={backdropRef}
          src={FILM}
          poster={POSTER}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-[0.45] saturate-[1.2]"
        />
        <div
          className="absolute inset-x-0 top-0"
          style={{ height: `min(100svh, calc(100% - ${band}px))` }}
        >
          <motion.video
            ref={videoRef}
            src={FILM}
            poster={POSTER}
            muted
            playsInline
            preload="auto"
            onEnded={onEnded}
            onPlay={() => void backdropRef.current?.play().catch(() => {})}
            onPause={() => backdropRef.current?.pause()}
            onSeeked={(e) => {
              if (backdropRef.current) backdropRef.current.currentTime = e.currentTarget.currentTime;
            }}
            className="absolute inset-0 h-full w-full object-contain"
            initial={false}
            animate={{ scale: active ? 1 : 1.18 }}
            transition={{ duration: 3.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        {/* readability + candlelit vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_58%_at_50%_42%,rgba(18,10,4,0.4),rgba(18,10,4,0.22)_62%,rgba(18,10,4,0.55)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 to-transparent" />
        <div
          className="absolute inset-x-0 h-[18%] bg-gradient-to-b from-transparent to-[#3d2614]/80"
          style={{ bottom: band }}
        />
        <div className="surface-grain absolute inset-0 opacity-30 mix-blend-overlay" />
      </motion.div>
    </div>

    <div className="pointer-events-none absolute inset-0 z-[35] overflow-hidden">
      {/* Liquid-gold edge riding the reveal */}
      {phase === "reveal" ? (
        <motion.span
          className="absolute rounded-full border-2 border-[#f0d58a]"
          style={{
            left: x - r,
            top: y - r,
            width: r * 2,
            height: r * 2,
            boxShadow:
              "0 0 30px 6px rgba(212,175,55,0.55), inset 0 0 30px 6px rgba(212,175,55,0.4)",
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1, opacity: [1, 1, 0] }}
          transition={{ duration: 2.2, ease: [0.65, 0, 0.25, 1] }}
        />
      ) : null}

      {/* Ripples */}
      {phase === "reveal"
        ? [0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute rounded-full border border-soft-gold/80"
              style={{ left: x - 60, top: y - 22, width: 120, height: 44 }}
              initial={{ scale: 0.1, opacity: 0.95 }}
              animate={{ scale: 4.5 + i * 1.6, opacity: 0 }}
              transition={{ duration: 1.6, delay: i * 0.16, ease: "easeOut" }}
            />
          ))
        : null}

      {/* The falling drop */}
      <AnimatePresence>
        {phase === "drop" ? (
          <motion.div
            key="drop"
            className="absolute z-[50] h-[30px] w-[22px]"
            style={{ left: x - 11, top: y - 30 }}
            initial={{ y: -(y + 120), scaleY: 1.5, scaleX: 0.8, opacity: 1 }}
            animate={{ y: 0, scaleY: 1, scaleX: 1 }}
            exit={{
              scaleX: 2.2,
              scaleY: 0.2,
              opacity: 0,
              transition: { duration: 0.22, ease: "easeOut" },
            }}
            transition={{ duration: 1.05, ease: [0.55, 0, 1, 0.45] }}
            onAnimationComplete={onImpact}
          >
            <span className="absolute bottom-[26px] left-1/2 h-24 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent to-[#f0d58a]/80 blur-[0.5px]" />
            <svg width="22" height="30" viewBox="0 0 22 30" className="drop-shadow-[0_0_12px_rgba(212,175,55,0.9)]">
              <defs>
                <radialGradient id="dropGold" cx="35%" cy="60%" r="70%">
                  <stop offset="0%" stopColor="#fff6d6" />
                  <stop offset="35%" stopColor="#f0d58a" />
                  <stop offset="75%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#8a6418" />
                </radialGradient>
              </defs>
              <path d="M11 0C11 0 21 13 21 19.5A10 10 0 0 1 1 19.5C1 13 11 0 11 0Z" fill="url(#dropGold)" />
              <ellipse cx="7.5" cy="18" rx="2" ry="3.4" fill="white" opacity="0.7" />
            </svg>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>

    </>
  );
}
