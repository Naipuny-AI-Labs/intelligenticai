"use client"

import { cn } from "@/lib/utils"
import { useRef, useState, useEffect } from "react"

interface SpotlightProps {
  className?: string
  fill?: string
}

export function Spotlight({ className, fill = "white" }: SpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: MouseEvent) => {
    if (!divRef.current) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  useEffect(() => {
    setOpacity(1)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={divRef}
      className={cn("pointer-events-none absolute inset-0 z-0 transition duration-300 opacity-0", className)}
      style={{ opacity }}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${fill}10, transparent 40%)`,
        }}
      />
    </div>
  )
}
