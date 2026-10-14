"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  Heart,
  Music2,
  Pause,
  Play,
  RotateCcw,
  Send,
  Volume2,
  VolumeX,
} from "lucide-react";
import { LogoMark } from "@/components/ui/LogoMark";
import { PetalGather } from "@/components/effects/PetalGather";
import { useSound } from "@/providers/SoundProvider";
import { setNavDark } from "@/lib/navTheme";
import { reels, wallTiles, type Reel } from "@/lib/gallery";
import { wedding } from "@/lib/wedding";
import { easeSmooth } from "@/lib/motion";
import { cn } from "@/lib/utils";

const TOTAL = reels.length + 2;
const couple = `${wedding.bride.first} & ${wedding.groom.first}`;

function playSafely(video: HTMLVideoElement, ms = 1500) {
  return Promise.race([
    video.play().then(() => true),
    new Promise<boolean>((resolve) => window.setTimeout(() => resolve(false), ms)),
  ]).catch(() => false);
}

/* ─────────────────────────── Cover wall ─────────────────────────── */

const COLUMNS = [0, 1, 2, 3].map((c) =>
  wallTiles.filter((_, i) => i % 4 === c),
);
const COLUMN_SPEED = [44, 52, 40, 56];

function CoverSlide({
  onStart,
  onPick,
}: {
  onStart: () => void;
  onPick: (reel: number) => void;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#140c06]">
      <div
        className="absolute inset-[-18%] flex gap-3 sm:gap-4"
        style={{
          transform: "perspective(1400px) rotateX(14deg) rotate(-8deg) scale(1.08)",
        }}
      >
        {COLUMNS.map((tiles, c) => (
          <div
            key={c}
            className={cn("flex-1 overflow-hidden", c === 3 && "hidden md:block")}
          >
            <div
              className={c % 2 === 0 ? "marquee-up" : "marquee-down"}
              style={{ animationDuration: `${COLUMN_SPEED[c]}s` }}
            >
              {[...tiles, ...tiles, ...tiles, ...tiles].map((tile, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onPick(tile.reel)}
                  className="group relative mb-3 block aspect-[3/4] w-full overflow-hidden rounded-[2px] sm:mb-4"
                  aria-label="Open this moment"
                  tabIndex={-1}
                >
                  {tile.video && !reduce ? (
                    <video
                      src={tile.video}
                      poster={tile.src}
                      muted
                      autoPlay
                      loop
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={tile.src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 25vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  )}
                  <span className="absolute inset-0 bg-black/25 transition group-hover:bg-black/0" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,rgba(20,12,6,0.86),rgba(20,12,6,0.55)_55%,rgba(20,12,6,0.2)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#140c06] to-transparent" />

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: easeSmooth, delay: 0.2 }}
          className="rounded-full border border-soft-gold/50 bg-paper/90 p-1 shadow-[0_0_40px_rgba(212,175,55,0.35)]"
        >
          <LogoMark size={52} className="h-12 w-12" />
        </motion.div>
        <motion.p
          className="type-eyebrow mt-6 text-champagne"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: easeSmooth }}
        >
          Our Gallery
        </motion.p>
        <motion.h1
          className="type-script mt-2 text-[clamp(3.2rem,13vw,6rem)] text-white"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.65, ease: easeSmooth }}
        >
          Moments of Us
        </motion.h1>
        <motion.p
          className="mt-2 font-display text-[11px] font-bold uppercase tracking-[0.4em] text-soft-gold"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {wedding.hashtag}
        </motion.p>

        <motion.button
          type="button"
          onClick={onStart}
          className="btn-shimmer pointer-events-auto mt-9 inline-flex min-h-[52px] items-center gap-3 rounded-full bg-gradient-to-r from-[#b8892c] via-[#e9cf86] to-[#b8892c] px-8 font-display text-xs font-bold uppercase tracking-[0.24em] text-mocha shadow-[0_14px_40px_rgba(212,175,55,0.35)] transition hover:scale-[1.03]"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: easeSmooth }}
        >
          <Play className="h-4 w-4 fill-current" />
          Start watching
        </motion.button>

        <motion.div
          className="absolute bottom-8 flex flex-col items-center text-ivory/70"
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronUp className="h-5 w-5" />
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em]">
            Swipe up
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Reel slide ─────────────────────────── */

type Burst = { id: number; x: number; y: number };

function ReelSlide({
  reel,
  index,
  active,
  near,
  soundOn,
  liked,
  onLike,
  onToggleSound,
  onBlocked,
  onShare,
}: {
  reel: Reel;
  index: number;
  active: boolean;
  near: boolean;
  soundOn: boolean;
  liked: boolean;
  onLike: (value?: boolean) => void;
  onToggleSound: () => void;
  onBlocked: () => void;
  onShare: () => void;
}) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [paused, setPaused] = useState(false);
  const [flashIcon, setFlashIcon] = useState<"play" | "pause" | null>(null);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const tapTimer = useRef<number | null>(null);
  const lastTap = useRef(0);
  const isVideo = reel.kind === "video";

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!active) {
      v.pause();
      v.currentTime = 0;
      setPaused(false);
      return;
    }
    v.muted = !soundOn;
    void playSafely(v).then((ok) => {
      if (ok || v.muted) return;
      v.muted = true;
      onBlocked();
      void playSafely(v);
    });
    // soundOn is applied by the effect below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !active) return;
    v.muted = !soundOn;
    if (v.paused && !paused) void playSafely(v);
  }, [soundOn, active, paused]);

  useEffect(() => {
    if (!active || !isVideo) return;
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v && barRef.current && v.duration) {
        barRef.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, isVideo]);

  const togglePause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void playSafely(v);
      setPaused(false);
      setFlashIcon("play");
    } else {
      v.pause();
      setPaused(true);
      setFlashIcon("pause");
    }
    window.setTimeout(() => setFlashIcon(null), 650);
  };

  const onTap = (e: ReactMouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (now - lastTap.current < 300) {
      if (tapTimer.current) window.clearTimeout(tapTimer.current);
      tapTimer.current = null;
      lastTap.current = 0;
      const id = now;
      setBursts((b) => [...b, { id, x, y }]);
      window.setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 1100);
      onLike(true);
      return;
    }

    lastTap.current = now;
    tapTimer.current = window.setTimeout(() => {
      tapTimer.current = null;
      if (isVideo) togglePause();
    }, 300);
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-black" onClick={onTap}>
      {reel.kind === "video" ? (
        <video
          ref={videoRef}
          src={reel.src}
          poster={reel.poster}
          loop
          muted
          playsInline
          preload={active || near ? "auto" : "none"}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <div className="absolute inset-0 scale-110">
            <Image
              src={reel.src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover blur-2xl brightness-[0.45]"
            />
          </div>
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={
              active && !reduce ? { scale: [1, 1.09] } : { scale: 1 }
            }
            transition={{ duration: 9, ease: "linear" }}
          >
            <Image
              src={reel.src}
              alt={`${couple} — ${reel.tag}`}
              fill
              sizes="100vw"
              priority={index < 2}
              className="object-cover object-[50%_30%] md:object-contain"
            />
          </motion.div>
        </>
      )}

      {/* cinematic grade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

      {/* double-tap hearts */}
      <AnimatePresence>
        {bursts.map((b) => (
          <motion.span
            key={b.id}
            className="pointer-events-none absolute z-20"
            style={{ left: b.x - 48, top: b.y - 48 }}
            initial={{ scale: 0.2, opacity: 0, rotate: -18 }}
            animate={{ scale: [0.2, 1.25, 1], opacity: [0, 1, 1], rotate: [-18, 8, 0] }}
            exit={{ y: -90, opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.55, ease: easeSmooth }}
          >
            <Heart className="h-24 w-24 fill-[#e9cf86] text-[#e9cf86] drop-shadow-[0_8px_30px_rgba(212,175,55,0.7)]" />
          </motion.span>
        ))}
      </AnimatePresence>

      {/* play / pause flash */}
      <AnimatePresence>
        {flashIcon ? (
          <motion.span
            key={flashIcon}
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-ivory backdrop-blur-sm"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.3, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {flashIcon === "pause" ? (
              <Pause className="h-8 w-8 fill-current" />
            ) : (
              <Play className="h-8 w-8 fill-current" />
            )}
          </motion.span>
        ) : null}
      </AnimatePresence>

      {paused && !flashIcon ? (
        <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-ivory/90">
          <Play className="h-8 w-8 fill-current" />
        </span>
      ) : null}

      {/* caption */}
      <motion.div
        className="absolute bottom-0 left-0 z-10 w-full max-w-[min(78%,520px)] px-4 pb-[calc(1.75rem+env(safe-area-inset-bottom))] sm:px-8 sm:pb-10"
        initial={false}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: active ? 0.2 : 0, ease: easeSmooth }}
      >
        <span className="inline-block border border-soft-gold/60 bg-black/30 px-2.5 py-1 font-display text-[9px] font-bold uppercase tracking-[0.28em] text-champagne backdrop-blur-sm">
          {reel.tag}
        </span>
        <p className="mt-3 flex items-center gap-1.5 font-display text-sm font-bold tracking-wide text-ivory">
          @obinasom
          <BadgeCheck className="h-4 w-4 fill-soft-gold text-black" />
        </p>
        <p className="mt-1.5 font-serif text-[15px] leading-snug text-ivory/90 sm:text-base">
          {reel.caption}{" "}
          <span className="font-semibold text-champagne">{wedding.hashtag}</span>
        </p>
        <div className="mt-3 flex max-w-[240px] items-center gap-2 overflow-hidden text-ivory/80">
          <Music2 className="h-3.5 w-3.5 shrink-0" />
          <div className="relative overflow-hidden whitespace-nowrap [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <div className={cn("inline-block font-serif text-xs", active && "marquee-left")}>
              {[0, 1].map((k) => (
                <span key={k} className="pr-8">
                  {isVideo ? "Original sound" : "Our song"} · {couple} · {wedding.hashtag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* right rail */}
      <div
        className="absolute bottom-[calc(1.75rem+env(safe-area-inset-bottom))] right-3 z-10 flex flex-col items-center gap-5 sm:bottom-10 sm:right-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-1">
          <span className="block rounded-full border-2 border-soft-gold bg-paper p-0.5">
            <LogoMark size={40} className="h-10 w-10" />
          </span>
          <span className="absolute -bottom-2 left-1/2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#e9cf86] to-[#b8892c] text-mocha">
            <Heart className="h-3 w-3 fill-current" />
          </span>
        </div>

        <RailButton label={liked ? "Loved" : "Love"} onClick={() => onLike()}>
          <motion.span
            animate={liked ? { scale: [1, 1.35, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Heart
              className={cn(
                "h-7 w-7 transition-colors",
                liked ? "fill-[#e9cf86] text-[#e9cf86]" : "text-ivory",
              )}
            />
          </motion.span>
        </RailButton>

        <RailButton label="Share" onClick={onShare}>
          <Send className="h-6 w-6 text-ivory" />
        </RailButton>

        {isVideo ? (
          <RailButton label={soundOn ? "Sound" : "Muted"} onClick={onToggleSound}>
            {soundOn ? (
              <Volume2 className="h-6 w-6 text-ivory" />
            ) : (
              <VolumeX className="h-6 w-6 text-ivory" />
            )}
          </RailButton>
        ) : null}

        <motion.span
          className="mt-1 flex h-11 w-11 items-center justify-center rounded-full border-[6px] border-[#1d1410] bg-[conic-gradient(from_0deg,#2a1d12,#4a3320,#2a1d12,#4a3320,#2a1d12)] shadow-[0_0_0_1px_rgba(212,175,55,0.4)]"
          animate={active && !paused && !reduce ? { rotate: 360 } : { rotate: 0 }}
          transition={
            active && !paused ? { duration: 5, repeat: Infinity, ease: "linear" } : { duration: 0.4 }
          }
          aria-hidden
        >
          <LogoMark size={18} className="h-[18px] w-[18px] rounded-full" />
        </motion.span>
      </div>

      {/* progress */}
      {isVideo ? (
        <div className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-ivory/15">
          <span
            ref={barRef}
            className="block h-full origin-left bg-gradient-to-r from-[#b8892c] via-[#e9cf86] to-[#b8892c]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      ) : null}
    </div>
  );
}

function RailButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1 text-ivory transition active:scale-90"
      aria-label={label}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/25 backdrop-blur-sm [filter:drop-shadow(0_2px_8px_rgba(0,0,0,0.5))]">
        {children}
      </span>
      <span className="font-display text-[10px] font-bold tracking-wide [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]">
        {label}
      </span>
    </button>
  );
}

/* ─────────────────────────── End card ─────────────────────────── */

function EndSlide({ onReplay }: { onReplay: () => void }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#140c06]">
      <div className="absolute inset-0 scale-110 opacity-60">
        <Image
          src="/images/gallery/portrait-2.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover blur-2xl brightness-50"
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,12,6,0.4),rgba(20,12,6,0.9))]" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <PetalGather shape="heart" wind="up" seed={77} width={220} height={190}>
          <span className="type-script mt-3 text-[1.9rem] text-ivory">more soon</span>
        </PetalGather>
        <h2 className="type-script mt-2 text-[clamp(2.8rem,11vw,4.6rem)] text-ivory">
          To be continued…
        </h2>
        <p className="mx-auto mt-3 max-w-sm font-serif text-[15px] leading-relaxed text-ivory/80 sm:text-base">
          Our love story is still being written. More memories are coming soon.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onReplay}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ivory/50 px-7 font-display text-xs font-bold uppercase tracking-[0.22em] text-ivory transition hover:bg-ivory hover:text-mocha"
          >
            <RotateCcw className="h-4 w-4" />
            Watch again
          </button>
          <Link
            href="/rsvp"
            className="btn-shimmer inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#b8892c] via-[#e9cf86] to-[#b8892c] px-7 font-display text-xs font-bold uppercase tracking-[0.22em] text-mocha"
          >
            RSVP
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Feed ─────────────────────────── */

export function GalleryReels() {
  const reduce = useReducedMotion();
  const { registerMedia } = useSound();
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [hintSeen, setHintSeen] = useState(false);

  useEffect(() => {
    setNavDark(true);
    const nav = navigator as Navigator & {
      userActivation?: { hasBeenActive: boolean };
    };
    if (nav.userActivation?.hasBeenActive) setSoundOn(true);
    return () => setNavDark(false);
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        });
      },
      { root, threshold: 0.6 },
    );
    slideRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = useCallback((i: number) => {
    const root = containerRef.current;
    if (!root) return;
    const index = Math.max(0, Math.min(TOTAL - 1, i));
    root.scrollTo({
      top: index * root.clientHeight,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [reduce]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goTo(active + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(active - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  const current = active >= 1 && active <= reels.length ? reels[active - 1] : null;
  const filmAudible = soundOn && current?.kind === "video";

  const toggleSound = useCallback(() => {
    setNeedsTap(false);
    setSoundOn((s) => !s);
  }, []);

  useEffect(() => {
    registerMedia({ id: "gallery", muted: !filmAudible, toggle: toggleSound });
  }, [filmAudible, toggleSound, registerMedia]);

  useEffect(() => () => registerMedia(null), [registerMedia]);

  useEffect(() => {
    if (active > 1) setHintSeen(true);
  }, [active]);

  const onBlocked = useCallback(() => {
    setSoundOn(false);
    setNeedsTap(true);
  }, []);

  const share = useCallback(async () => {
    const url = window.location.href;
    const data = { title: `${couple} · ${wedding.hashtag}`, url };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      setToast("Link copied");
    } catch {
      return;
    }
    window.setTimeout(() => setToast(null), 1800);
  }, []);

  const startWatching = () => {
    setSoundOn(true);
    setNeedsTap(false);
    goTo(1);
  };

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-black">
      <div
        ref={containerRef}
        data-lenis-prevent
        className="no-scrollbar h-full snap-y snap-mandatory overflow-y-auto overscroll-contain"
      >
        {Array.from({ length: TOTAL }, (_, i) => (
          <section
            key={i}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            data-index={i}
            className="relative h-[100svh] w-full snap-start snap-always"
          >
            {i === 0 ? (
              <CoverSlide
                onStart={startWatching}
                onPick={(reel) => {
                  setSoundOn(true);
                  goTo(reel + 1);
                }}
              />
            ) : i === TOTAL - 1 ? (
              <EndSlide onReplay={() => goTo(1)} />
            ) : (
              <ReelSlide
                reel={reels[i - 1]}
                index={i - 1}
                active={active === i}
                near={Math.abs(active - i) <= 1}
                soundOn={soundOn}
                liked={!!liked[i]}
                onLike={(value) =>
                  setLiked((l) => ({ ...l, [i]: value ?? !l[i] }))
                }
                onToggleSound={toggleSound}
                onBlocked={onBlocked}
                onShare={() => void share()}
              />
            )}
          </section>
        ))}
      </div>

      {/* counter */}
      <AnimatePresence>
        {active > 0 && active < TOTAL - 1 ? (
          <motion.p
            className="pointer-events-none absolute right-4 top-20 z-20 rounded-full border border-ivory/20 bg-black/30 px-3 py-1 font-display text-[10px] font-bold tracking-[0.24em] text-ivory/90 backdrop-blur-md sm:right-6 sm:top-24"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {String(active).padStart(2, "0")} / {String(reels.length).padStart(2, "0")}
          </motion.p>
        ) : null}
      </AnimatePresence>

      {/* side dots */}
      <div className="pointer-events-none absolute left-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        {Array.from({ length: TOTAL }, (_, i) => (
          <span
            key={i}
            className={cn(
              "w-[3px] rounded-full transition-all duration-500",
              active === i ? "h-6 bg-soft-gold" : "h-2 bg-ivory/35",
            )}
          />
        ))}
      </div>

      {/* desktop arrows */}
      <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 bg-black/30 text-ivory backdrop-blur-md transition hover:border-soft-gold disabled:opacity-30"
          aria-label="Previous"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          disabled={active === TOTAL - 1}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 bg-black/30 text-ivory backdrop-blur-md transition hover:border-soft-gold disabled:opacity-30"
          aria-label="Next"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>

      {/* tap-for-sound chip */}
      <AnimatePresence>
        {needsTap && current?.kind === "video" ? (
          <motion.button
            type="button"
            onClick={() => {
              setSoundOn(true);
              setNeedsTap(false);
            }}
            className="absolute left-1/2 top-20 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ivory px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-mocha shadow-[0_10px_30px_rgba(0,0,0,0.4)] sm:top-24"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <VolumeX className="h-3.5 w-3.5" />
            Tap for sound
          </motion.button>
        ) : null}
      </AnimatePresence>

      {/* first-reel hint */}
      <AnimatePresence>
        {active === 1 && !hintSeen ? (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/45 px-5 py-2.5 text-center backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 1, 1, 0], scale: 1 }}
            transition={{ duration: 3.2, times: [0, 0.15, 0.8, 1], delay: 0.8 }}
            onAnimationComplete={() => setHintSeen(true)}
          >
            <p className="flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-ivory">
              <Heart className="h-3.5 w-3.5 fill-[#e9cf86] text-[#e9cf86]" />
              Double-tap to send love
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {toast ? (
          <motion.p
            className="absolute bottom-24 left-1/2 z-30 -translate-x-1/2 rounded-full bg-ivory px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-mocha"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {toast}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
