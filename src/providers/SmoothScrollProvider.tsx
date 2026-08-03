"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Buttery site-wide scrolling via Lenis.
 * Higher lerp = snappier; lower = silkier glide.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // Silkier continuous interpolation
        lerp: 0.065,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.25,
        syncTouch: true,
        syncTouchLerp: 0.075,
        // Soften overshoot feel
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        // Prevent jumpy nested sync
        autoRaf: true,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
