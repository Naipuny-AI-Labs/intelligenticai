"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { useRef, useState, useEffect } from "react"

interface SpotlightProps {
  className?: string
  fill?: string
  children?: React.ReactNode
}

export function Spotlight({ className, fill = "white", children }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const mouse = useRef({ x: 0, y: 0 })
  const containerSize = useRef({ w: 0, h: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const onMouseEnter = () => {
    setIsHovering(true)
  }

  const onMouseLeave = () => {
    setIsHovering(false)
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const { w, h } = containerSize.current
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mousePosition.current = { x, y }
  }

  useEffect(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    containerSize.current = { w: rect.width, h: rect.height }

    const updateMouse = () => {
      if (!isHovering) {
        mouse.current.x = containerSize.current.w / 2
        mouse.current.y = containerSize.current.h / 2
      } else {
        mouse.current.x += (mousePosition.current.x - mouse.current.x) * 0.1
        mouse.current.y += (mousePosition.current.y - mouse.current.y) * 0.1
      }

      if (containerRef.current) {
        const spotlight = containerRef.current.querySelector("#spotlight") as SVGElement
        if (spotlight) {
          spotlight.setAttribute("cx", mouse.current.x.toString())
          spotlight.setAttribute("cy", mouse.current.y.toString())
        }
      }

      requestAnimationFrame(updateMouse)
    }

    const animationId = requestAnimationFrame(updateMouse)
    return () => cancelAnimationFrame(animationId)
  }, [isHovering])

  return (
    <div
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      className={cn("relative overflow-hidden", className)}
    >
      {children}

      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        <defs>
          <radialGradient
            id="radial-gradient"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform={`translate(${containerSize.current.w / 2} ${
              containerSize.current.h / 2
            }) scale(${Math.max(containerSize.current.w, containerSize.current.h) * 0.75})`}
          >
            <stop offset="0%" stopColor={fill} stopOpacity="0.1" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle
          id="spotlight"
          cx={containerSize.current.w / 2}
          cy={containerSize.current.h / 2}
          r={Math.max(containerSize.current.w, containerSize.current.h) * 0.75}
          fill="url(#radial-gradient)"
        />
      </svg>
    </div>
  )
}
