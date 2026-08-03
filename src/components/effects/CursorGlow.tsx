"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-multiply md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(212,175,55,0.18), transparent 65%)",
      }}
      animate={{
        x: pos.x,
        y: pos.y,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 28, mass: 0.4 }}
    />
  );
}
