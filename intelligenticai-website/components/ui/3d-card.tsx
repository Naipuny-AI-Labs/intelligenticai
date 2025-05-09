"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface Card3dProps {
  children: ReactNode
  className?: string
  containerClassName?: string
}

export function Card3d({ children, className, containerClassName }: Card3dProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)

  // Motion values for tracking mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth out the mouse tracking with springs
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    const x = offsetX / width - 0.5 // -0.5 to 0.5
    const y = offsetY / height - 0.5 // -0.5 to 0.5

    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <div
      ref={ref}
      className={cn("perspective-1000", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false)
        mouseX.set(0)
        mouseY.set(0)
      }}
    >
      <motion.div
        className={cn("relative transition-all duration-200 ease-out", className)}
        style={{
          rotateX: hovering ? rotateX : 0,
          rotateY: hovering ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function Card3dShine() {
  return (
    <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15), transparent 40%)",
        }}
      />
    </div>
  )
}
