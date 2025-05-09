"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedBackgroundProps {
  className?: string
  variant?: "dots" | "grid" | "waves"
  color?: string
  density?: number
  children?: React.ReactNode
}

export function AnimatedBackground({
  className,
  variant = "dots",
  color = "hsl(var(--primary))",
  density = 30,
  children,
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeObserver = new ResizeObserver(() => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      draw()
    })

    resizeObserver.observe(canvas)

    // Initial setup
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationFrameId: number
    let particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }> = []

    // Create particles
    const createParticles = () => {
      particles = []
      const particleCount = Math.floor((canvas.width * canvas.height) / (10000 / density))

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
    }

    // Draw functions for different variants
    const drawDots = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = color.replace(")", `, ${particle.opacity})`)
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      })

      animationFrameId = requestAnimationFrame(drawDots)
    }

    const drawGrid = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gridSize = 30
      const rows = Math.ceil(canvas.height / gridSize)
      const cols = Math.ceil(canvas.width / gridSize)

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * gridSize
          const y = i * gridSize
          const distance = Math.sqrt(Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2))
          const maxDistance = Math.sqrt(Math.pow(canvas.width / 2, 2) + Math.pow(canvas.height / 2, 2))
          const opacity = 0.1 + 0.2 * (1 - distance / maxDistance)

          ctx.beginPath()
          ctx.arc(x, y, 1, 0, Math.PI * 2)
          ctx.fillStyle = color.replace(")", `, ${opacity})`)
          ctx.fill()
        }
      }

      animationFrameId = requestAnimationFrame(drawGrid)
    }

    const drawWaves = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001
      const waveCount = 3
      const amplitude = 20
      const frequency = 0.02

      for (let wave = 0; wave < waveCount; wave++) {
        ctx.beginPath()
        const waveOpacity = 0.1 - wave * 0.03
        ctx.strokeStyle = color.replace(")", `, ${waveOpacity})`)
        ctx.lineWidth = 2

        for (let x = 0; x < canvas.width; x += 5) {
          const y =
            canvas.height / 2 +
            Math.sin(x * frequency + time + wave) * amplitude +
            Math.sin(x * frequency * 2 + time + wave) * amplitude * 0.5

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(drawWaves)
    }

    // Choose draw function based on variant
    const draw = () => {
      createParticles()

      if (variant === "dots") {
        drawDots()
      } else if (variant === "grid") {
        drawGrid()
      } else if (variant === "waves") {
        drawWaves()
      }
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
    }
  }, [variant, color, density])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />
      {children}
    </div>
  )
}
