"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function GoldOrnament({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn("flex items-center justify-center gap-3", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, delay }}
    >
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-warm-gold sm:w-14" />
      <span className="h-1.5 w-1.5 rotate-45 bg-warm-gold" />
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-warm-gold sm:w-14" />
    </motion.div>
  );
}
