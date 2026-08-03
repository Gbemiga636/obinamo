"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export function LogoMark({
  size = 40,
  className,
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/images/logo.png"
      alt="PV — Obinasom"
      width={size}
      height={size}
      priority={priority}
      className={cn("rounded-full object-cover", className)}
    />
  );
}
