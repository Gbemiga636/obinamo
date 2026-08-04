"use client";

import { useEffect, useState } from "react";

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

/**
 * Scroll position for nav chrome.
 * Uses window scroll (Lenis root updates it) — avoids useLenis callback loops.
 */
export function useScrollY() {
  const [y, setY] = useState(0);

  useEffect(() => {
    let raf = 0;
    let last = -1;

    const read = () => {
      const next = window.scrollY || 0;
      if (Math.abs(next - last) < 1) return;
      last = next;
      setY(next);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return y;
}
