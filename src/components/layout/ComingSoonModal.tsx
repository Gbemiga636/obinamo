"use client";

import { motion, AnimatePresence } from "framer-motion";

export function ComingSoonModal({
  open,
  title,
  onClose,
}: {
  open: boolean;
  title?: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-mocha/40 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-md border border-soft-gold/30 bg-paper px-9 py-12 text-center shadow-[0_28px_80px_rgba(59,42,26,0.2)]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {title ? (
              <p className="eyebrow mb-4 text-dusty-blue">{title}</p>
            ) : null}
            <h2 className="font-serif text-2xl leading-snug text-mocha sm:text-3xl">
              Stay tuned
            </h2>
            <p className="mx-auto mt-4 max-w-sm font-serif text-base tracking-wide text-cognac/75">
              This chapter of our story is still being written. We&apos;ll unveil
              this page very soon.
            </p>
            <div className="mx-auto my-8 h-px w-14 bg-soft-gold/50" />
            <button
              type="button"
              onClick={onClose}
              className="border border-soft-gold/50 px-8 py-3 text-[0.62rem] uppercase tracking-[0.28em] text-cognac transition hover:border-soft-gold"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Return
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
