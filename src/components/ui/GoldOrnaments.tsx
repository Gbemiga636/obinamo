"use client";

import { cn } from "@/lib/utils";

export function GoldArch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("mx-auto w-full max-w-[440px]", className)}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="archGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9a7420" />
          <stop offset="45%" stopColor="#d4af37" />
          <stop offset="55%" stopColor="#f0e0a0" />
          <stop offset="100%" stopColor="#9a7420" />
        </linearGradient>
      </defs>
      {/* Wider inner space so long names sit inside the curve */}
      <path
        d="M14 510 V132 C14 44 78 14 180 14 C282 14 346 44 346 132 V510"
        stroke="url(#archGold)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M30 510 V140 C30 58 92 30 180 30 C268 30 330 58 330 140 V510"
        stroke="url(#archGold)"
        strokeWidth="0.7"
        strokeOpacity="0.65"
        strokeLinecap="round"
      />
      <path
        d="M180 14 V5"
        stroke="url(#archGold)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="180" cy="4" r="2.2" fill="#d4af37" />
      <path
        d="M164 22 C172 12 176 12 180 18 C184 12 188 12 196 22"
        stroke="url(#archGold)"
        strokeWidth="0.75"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function GoldFlourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("mx-auto h-6 w-[210px]", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="flourishGold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9a7420" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#9a7420" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path
        d="M10 20 C32 20 42 10 58 10 C72 10 80 18 110 18 C140 18 148 10 162 10 C178 10 188 20 210 20"
        stroke="url(#flourishGold)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M58 10 C54 3 48 3 46 8"
        stroke="#d4af37"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M162 10 C166 3 172 3 174 8"
        stroke="#d4af37"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M105 18 L110 10 L115 18 L110 26 Z"
        fill="#d4af37"
        opacity="0.85"
      />
    </svg>
  );
}

export function GoldHeartDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3.5", className)}>
      <span className="h-px w-14 bg-gradient-to-r from-transparent via-[#d4af37] to-[#d4af37]/40 sm:w-20" />
      <GoldHeart size={11} />
      <span className="h-px w-14 bg-gradient-to-l from-transparent via-[#d4af37] to-[#d4af37]/40 sm:w-20" />
    </div>
  );
}

export function GoldHeart({
  size = 12,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size * 0.9}
      viewBox="0 0 12 11"
      className={className}
      aria-hidden
    >
      <path
        d="M6 10 C6 10 1 6.5 1 3.5 C1 1.8 2.2 1 3.4 1 C4.4 1 5.3 1.6 6 2.5 C6.7 1.6 7.6 1 8.6 1 C9.8 1 11 1.8 11 3.5 C11 6.5 6 10 6 10 Z"
        fill="#d4af37"
      />
    </svg>
  );
}

export function GoldRing({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      className={cn("h-5 w-5", className)}
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="ringGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0e0a0" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#9a7420" />
        </linearGradient>
      </defs>
      <circle
        cx="14"
        cy="15"
        r="8"
        stroke="url(#ringGold)"
        strokeWidth="1.4"
      />
      <circle
        cx="14"
        cy="15"
        r="5.2"
        stroke="url(#ringGold)"
        strokeWidth="0.6"
        opacity="0.55"
      />
      <path
        d="M11 7.2 L14 4.5 L17 7.2"
        stroke="url(#ringGold)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="4.2" r="1.2" fill="#d4af37" />
    </svg>
  );
}

export function GoldDiamond({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("h-3.5 w-3.5", className)}
      aria-hidden
    >
      <path
        d="M8 1.5 L14 8 L8 14.5 L2 8 Z"
        fill="none"
        stroke="#d4af37"
        strokeWidth="1"
      />
      <path d="M8 4 L11.2 8 L8 12 L4.8 8 Z" fill="#d4af37" opacity="0.35" />
    </svg>
  );
}

export function LoveBurst({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center gap-2.5", className)}
      aria-hidden
    >
      <GoldDiamond />
      <GoldHeart size={10} />
      <GoldRing className="h-4 w-4" />
      <GoldHeart size={10} />
      <GoldDiamond />
    </div>
  );
}
