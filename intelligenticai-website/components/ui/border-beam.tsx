"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface BorderBeamProps extends React.HTMLAttributes<HTMLDivElement> {
  borderWidth?: number
  duration?: number
  colorFrom?: string
  colorTo?: string
  colorMode?: "gradient" | "solid"
  size?: number
  delay?: number
  className?: string
  containerClassName?: string
  as?: React.ElementType
  children?: React.ReactNode
}

export const BorderBeam = ({
  borderWidth = 1,
  duration = 2.5,
  colorFrom = "var(--color-border-beam-from, hsl(var(--primary)))",
  colorTo = "var(--color-border-beam-to, hsl(var(--primary)))",
  colorMode = "gradient",
  size = 100,
  delay = 0,
  className,
  containerClassName,
  as: Component = "div",
  children,
  ...props
}: BorderBeamProps) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    const div = divRef.current
    if (!div) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return
      const rect = div.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
    }

    div.addEventListener("mousemove", handleMouseMove)
    div.addEventListener("mouseenter", handleMouseEnter)
    div.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      div.removeEventListener("mousemove", handleMouseMove)
      div.removeEventListener("mouseenter", handleMouseEnter)
      div.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isHovered])

  return (
    <Component ref={divRef} className={cn("relative rounded-lg", containerClassName)} {...props}>
      <div
        className={cn(
          "absolute inset-0 rounded-lg",
          "before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:opacity-0 before:transition-opacity",
          "before:bg-[radial-gradient(circle_at_var(--x)_var(--y),var(--color-from),var(--color-to))]",
          "before:animate-border-beam",
          isHovered && "before:opacity-100",
          className,
        )}
        style={
          {
            "--x": mousePosition.x ? `${mousePosition.x}px` : "50%",
            "--y": mousePosition.y ? `${mousePosition.y}px` : "50%",
            "--size": `${size}%`,
            "--color-from": colorMode === "gradient" ? colorFrom : colorTo,
            "--color-to": colorTo,
            "--duration": `${duration}s`,
            "--delay": `${delay}s`,
            "--border-width": `${borderWidth}px`,
          } as React.CSSProperties
        }
      />
      {children}
    </Component>
  )
}
