"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

export function useMouseParallax(strength = 20) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength]);

  return offset;
}

/** Scroll Y synced with Lenis for smooth nav / UI (falls back to window) */
export function useScrollY() {
  const [y, setY] = useState(0);

  useLenis((lenis) => {
    setY((prev) => {
      const next = lenis.scroll;
      if (Math.abs(next - prev) < 1.5) return prev;
      return next;
    });
  });

  useEffect(() => {
    setY(window.scrollY || 0);
  }, []);

  return y;
}
