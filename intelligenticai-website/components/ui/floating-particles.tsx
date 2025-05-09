"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingParticlesProps {
  className?: string
  quantity?: number
  minSize?: number
  maxSize?: number
  speed?: number
  colors?: string[]
  minOpacity?: number
  maxOpacity?: number
}

export function FloatingParticles({
  className,
  quantity = 10,
  minSize = 2,
  maxSize = 4,
  speed = 0.5,
  colors = ["#61CE70", "#1085e4"],
  minOpacity = 0.3,
  maxOpacity = 0.7,
}: FloatingParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      color: string
      opacity: number
      delay: number
    }>
  >([])

  useEffect(() => {
    if (!containerRef.current) return

    // Generate random particles
    const newParticles = Array.from({ length: quantity }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * (maxSize - minSize) + minSize,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
      delay: Math.random() * 2, // random delay for animation
    }))

    setParticles(newParticles)

    // This effect should only run once on mount and when quantity changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity])

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -10, 0, 10, 0],
            x: [0, 5, 0, -5, 0],
            opacity: [particle.opacity, particle.opacity * 0.6, particle.opacity],
          }}
          transition={{
            duration: 3 / speed,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}
