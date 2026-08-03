import type { Variants, Transition } from "framer-motion";

/** Soft luxury ease — less snappy than expo */
export const easeSmooth = [0.22, 1, 0.36, 1] as const;
/** Alias kept for existing imports */
export const easeOutExpo = easeSmooth;
export const easeInOut = [0.45, 0, 0.55, 1] as const;

/** Default reveal transition — long & silky */
export const smoothTransition: Transition = {
  duration: 1.25,
  ease: easeSmooth,
};

export const softSpring: Transition = {
  type: "spring",
  stiffness: 55,
  damping: 22,
  mass: 0.85,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: easeSmooth },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: easeSmooth },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.25, ease: easeSmooth },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.25, ease: easeSmooth },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: easeSmooth },
  },
};

export const popIn = {
  hidden: { opacity: 0, scale: 0.92, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.1, ease: easeSmooth },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.12 },
  },
};

export const staggerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.15, ease: easeSmooth },
  },
};

export const staggerFromLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: easeSmooth },
  },
};

export const staggerFromRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: easeSmooth },
  },
};

export const staggerAltSides: Variants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 2 === 0 ? -22 : 22,
    y: 14,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 1.25, ease: easeSmooth },
  },
};

/** Start revealing a bit earlier so motion feels continuous while scrolling */
export const viewportOnce = { once: true, margin: "-12% 0px -8% 0px" as const };
