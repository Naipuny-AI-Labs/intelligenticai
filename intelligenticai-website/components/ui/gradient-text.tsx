"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  from?: string
  via?: string
  to?: string
  animate?: boolean
  duration?: number
}

export function GradientText({
  children,
  className,
  from = "hsl(var(--primary))",
  via = "purple",
  to = "blue",
  animate = true,
  duration = 10,
}: GradientTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animate || !textRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current) return

      const rect = textRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      textRef.current.style.setProperty("--x", `${x}%`)
      textRef.current.style.setProperty("--y", `${y}%`)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [animate])

  return (
    <div
      ref={textRef}
      className={cn(
        "bg-clip-text text-transparent relative",
        animate
          ? "bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),var(--from),var(--via),var(--to))]"
          : "bg-gradient-to-r from-[var(--from)] via-[var(--via)] to-[var(--to)]",
        className,
      )}
      style={
        {
          "--from": from,
          "--via": via,
          "--to": to,
          "--duration": `${duration}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}
