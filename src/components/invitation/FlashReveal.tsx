"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding";
import { easeSmooth } from "@/lib/motion";

const PHOTO = "/images/gallery/portrait-1.jpg";

/**
 * Camera-flash opening: white burst, then the portrait "develops" from
 * overexposed white into full colour. Mounted from the start so the photo
 * is already decoded when the flash fires.
 */
export function FlashReveal({ active }: { active: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden bg-[#120b06]"
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.05 }}
      aria-hidden
    >
      <div className="absolute inset-0 scale-110">
        <Image
          src={PHOTO}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover blur-2xl brightness-[0.55] saturate-[1.2]"
        />
      </div>

      <motion.div
        className="absolute inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:h-[86svh] md:aspect-[683/1024] md:-translate-x-1/2 md:-translate-y-1/2"
        initial={false}
        animate={
          active
            ? {
                scale: [1.12, 1],
                filter: [
                  "brightness(2.8) contrast(0.6) saturate(0)",
                  "brightness(1) contrast(1) saturate(1)",
                ],
              }
            : { scale: 1.12 }
        }
        transition={{
          scale: { duration: 3.4, ease: easeSmooth },
          filter: { duration: 1.9, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        <div className="relative h-full w-full md:border md:border-soft-gold/45 md:p-2 md:shadow-[0_40px_90px_rgba(0,0,0,0.55)]">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={PHOTO}
              alt={`${wedding.bride.first} and ${wedding.groom.first}`}
              fill
              priority
              sizes="(min-width: 768px) 60vh, 100vw"
              className="object-cover object-[50%_35%]"
            />
          </div>
        </div>
      </motion.div>

      {/* warm light leak sweeping across after the burst */}
      <motion.div
        className="absolute inset-y-0 w-[70%] mix-blend-screen"
        style={{
          background:
            "linear-gradient(100deg, transparent 0%, rgba(255,196,120,0.0) 20%, rgba(255,190,110,0.55) 50%, rgba(255,230,190,0.0) 80%, transparent 100%)",
        }}
        initial={false}
        animate={active ? { x: ["-80%", "170%"], opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 1.8, delay: 0.25, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-x-0 bottom-[9%] text-center md:bottom-[4%]"
        initial={false}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 1.2, delay: active ? 1.1 : 0, ease: easeSmooth }}
      >
        <p className="type-script text-[clamp(2.2rem,8vw,3.4rem)] text-ivory [text-shadow:0_4px_24px_rgba(0,0,0,0.6)]">
          {wedding.bride.first} &amp; {wedding.groom.first}
        </p>
        <p className="mt-1 font-display text-[10px] font-bold uppercase tracking-[0.4em] text-champagne/90 [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">
          {wedding.hashtag}
        </p>
      </motion.div>

      {/* the flash itself */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={false}
        animate={active ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 1.35, times: [0, 0.05, 0.16, 1], ease: "easeOut" }}
      />
    </motion.div>
  );
}
