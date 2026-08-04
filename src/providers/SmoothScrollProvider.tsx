"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import "lenis/dist/lenis.css";

/**
 * Site-wide smooth scrolling — silkier glide, lighter on the GPU.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.048,
        smoothWheel: true,
        wheelMultiplier: 0.68,
        touchMultiplier: 1.05,
        // Native touch feel is usually smoother than syncTouch on phones
        syncTouch: false,
        autoRaf: true,
        anchors: true,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      }}
    >
      {children}
    </ReactLenis>
  );
}
