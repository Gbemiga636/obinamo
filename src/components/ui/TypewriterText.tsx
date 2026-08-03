"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  showCursor?: boolean;
  as?: "p" | "h1" | "h2" | "h3" | "span";
  onDone?: () => void;
  active?: boolean;
  /** Start typing only when scrolled into view */
  whenInView?: boolean;
};

export function TypewriterText({
  text,
  className,
  delay = 0,
  speed = 42,
  showCursor = true,
  as: Tag = "p",
  onDone,
  active = true,
  whenInView = false,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px", amount: 0.2 });
  const shouldRun = active && (!whenInView || inView);

  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!shouldRun) {
      setOut("");
      setDone(false);
      return;
    }

    let cancelled = false;
    let timer: number | undefined;
    setOut("");
    setDone(false);

    const finish = () => {
      if (cancelled) return;
      setOut(text);
      setDone(true);
      onDoneRef.current?.();
    };

    // Instant for reduced-motion / speed 0
    if (speed <= 0) {
      const start = window.setTimeout(finish, delay);
      return () => {
        cancelled = true;
        window.clearTimeout(start);
      };
    }

    const start = window.setTimeout(() => {
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        i += 1;
        setOut(text.slice(0, i));
        if (i < text.length) {
          timer = window.setTimeout(tick, speed);
        } else {
          setDone(true);
          onDoneRef.current?.();
        }
      };
      tick();
    }, delay);

    return () => {
      cancelled = true;
      window.clearTimeout(start);
      if (timer) window.clearTimeout(timer);
    };
  }, [text, delay, speed, shouldRun]);

  return (
    <Tag
      ref={ref as never}
      className={cn(className)}
      aria-label={done ? text : undefined}
    >
      {out || (whenInView && !inView ? "\u00A0" : out)}
      {showCursor && shouldRun && !done ? (
        <span
          className="cursor-blink ml-0.5 inline-block text-soft-gold"
          aria-hidden
        >
          |
        </span>
      ) : null}
    </Tag>
  );
}
