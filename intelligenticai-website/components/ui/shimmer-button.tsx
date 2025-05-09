"use client"

import { cn } from "@/lib/utils"
import React from "react"

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: React.ReactNode
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "white",
      shimmerSize = "0.1em",
      shimmerDuration = "2s",
      borderRadius = "9999px",
      background = "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-foreground)))",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex h-12 overflow-hidden px-6 py-2 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
          className,
        )}
        style={{
          borderRadius,
          background,
        }}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center">{children}</span>
        <span className="absolute inset-0 overflow-hidden rounded-full" style={{ borderRadius }}>
          <span
            className="absolute inset-0 z-0 scale-x-[2.0] blur-md"
            style={{
              background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
              animation: `shimmer ${shimmerDuration} infinite`,
              backgroundSize: "200% 100%",
            }}
          />
        </span>
      </button>
    )
  },
)

ShimmerButton.displayName = "ShimmerButton"
