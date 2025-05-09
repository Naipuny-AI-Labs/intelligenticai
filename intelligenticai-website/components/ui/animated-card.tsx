"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  glareEnabled?: boolean
  rotationIntensity?: number
  borderGlow?: boolean
}

export function AnimatedCard({
  children,
  className,
  containerClassName,
  glareEnabled = true,
  rotationIntensity = 10,
  borderGlow = false,
}: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Calculate rotation based on mouse position
    const rotateY = (mouseX / (rect.width / 2)) * rotationIntensity
    const rotateX = -((mouseY / (rect.height / 2)) * rotationIntensity)

    setRotation({ x: rotateX, y: rotateY })

    // Calculate glare position
    const glareX = ((e.clientX - rect.left) / rect.width) * 100
    const glareY = ((e.clientY - rect.top) / rect.height) * 100
    setGlarePosition({ x: glareX, y: glareY })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <div className={cn("perspective-1000", containerClassName)}>
      <motion.div
        ref={cardRef}
        className={cn(
          "relative transition-transform duration-200 ease-out transform-gpu",
          borderGlow &&
            isHovered &&
            "before:absolute before:inset-0 before:-z-10 before:rounded-xl before:p-1 before:bg-gradient-to-r before:from-primary before:to-purple-600 before:blur-sm",
          className,
        )}
        style={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.5,
        }}
      >
        {children}

        {glareEnabled && isHovered && (
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none" aria-hidden="true">
            <div
              className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
              style={{
                background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, white 0%, transparent 50%)`,
                opacity: 0.15,
              }}
            />
          </div>
        )}
      </motion.div>
    </div>
  )
}
