"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline" | "gradient"
  size?: "default" | "sm" | "lg"
  asChild?: boolean
}

export function MagneticButton({
  children,
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    // Limit the movement to a reasonable amount
    const maxDistance = 10
    const moveX = (distanceX / rect.width) * maxDistance
    const moveY = (distanceY / rect.height) * maxDistance

    setPosition({ x: moveX, y: moveY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  // Reset position when component unmounts
  useEffect(() => {
    return () => {
      setPosition({ x: 0, y: 0 })
    }
  }, [])

  const buttonVariant =
    variant === "gradient"
      ? "bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white border-0"
      : variant

  return (
    <motion.div
      style={{ position: "relative" }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className={cn(
          variant === "gradient" && "bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white border-0",
          isHovered && "scale-105",
          "transition-transform duration-200",
          className,
        )}
        variant={variant === "gradient" ? "default" : buttonVariant}
        size={size}
        asChild={asChild}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  )
}
