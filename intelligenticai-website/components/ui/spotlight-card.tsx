"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightSize?: string
  spotlightOpacity?: number
  backgroundColor?: string
  spotlightColor?: string
}

export function SpotlightCard({
  children,
  className,
  spotlightSize = "250px",
  spotlightOpacity = 0.15,
  backgroundColor = "transparent",
  spotlightColor = "white",
}: SpotlightCardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setPosition({ x, y })
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={cardRef}
      className={cn("relative overflow-hidden group", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ background: backgroundColor }}
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(${spotlightSize} circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent)`,
          mixBlendMode: "soft-light",
        }}
      />

      {/* Card content */}
      {children}
    </div>
  )
}
