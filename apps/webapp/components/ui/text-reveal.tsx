"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { useRef, useState, useEffect } from "react"

interface TextRevealProps {
  text: string
  className?: string
  revealClassName?: string
  revealColor?: string
  children?: React.ReactNode
}

export function TextReveal({
  text,
  className,
  revealClassName,
  revealColor = "hsl(var(--primary))",
  children,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.5 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsRevealed(true)
      }, 500)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [isInView])

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)} aria-label={text}>
      {children || (
        <span
          className={cn(
            "inline-block transition-transform duration-1000",
            isRevealed ? "translate-y-0" : "translate-y-full",
            revealClassName,
          )}
        >
          {text}
        </span>
      )}
      <span
        className="absolute inset-0 inline-block"
        style={{
          background: revealColor,
          transform: isRevealed ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 1s ease",
        }}
      />
    </div>
  )
}
