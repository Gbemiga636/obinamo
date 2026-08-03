"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-gold/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        gold:
          "bg-[#7A4A25] text-[#F7F1E8] hover:bg-[#3B2A1A] shadow-[0_10px_28px_rgba(122,74,37,0.22)]",
        ghost:
          "border border-[#D4AF37]/50 bg-transparent text-[#7A4A25] hover:border-[#D4AF37] hover:bg-[#faf6f0]/60",
        outline:
          "border border-mocha/15 bg-transparent text-mocha hover:border-warm-gold",
      },
      size: {
        default: "h-11 px-7",
        sm: "h-9 px-5 text-xs tracking-wider uppercase",
        lg: "h-12 px-9 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
