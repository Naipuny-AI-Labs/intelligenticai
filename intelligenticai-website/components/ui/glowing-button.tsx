"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"
import { forwardRef } from "react"

interface GlowingButtonProps extends ButtonProps {
  glowColor?: string
  className?: string
  children: React.ReactNode
}

export const GlowingButton = forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ glowColor = "#61CE70", className, children, variant = "default", ...props }, ref) => {
    return (
      <div className="relative group">
        <div
          className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"
          style={{ background: `linear-gradient(90deg, ${glowColor}, #1085e4)` }}
        />
        <Button
          ref={ref}
          variant={variant}
          className={cn(
            "relative bg-background text-foreground border border-primary/50",
            variant === "default" && "bg-gradient-to-r from-primary to-secondary text-white border-0",
            className,
          )}
          {...props}
        >
          {children}
        </Button>
      </div>
    )
  },
)

GlowingButton.displayName = "GlowingButton"
