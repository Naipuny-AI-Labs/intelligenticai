"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Bot, Users, Zap, BarChart } from "lucide-react"

export function StatisticsSection() {
  return (
    <section className="py-10 sm:py-12 md:py-16 relative overflow-hidden bg-gray-50 dark:bg-transparent">
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/80 to-background pointer-events-none -z-10" />

      <div className="container px-4 sm:px-6">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <StatCard
            icon={<Bot className="h-5 w-5 sm:h-6 sm:w-6 text-brand-primary" />}
            value={150}
            label="AI Agents"
            description="Specialized agents ready to use"
            delay={0}
          />
          <StatCard
            icon={<Users className="h-5 w-5 sm:h-6 sm:w-6 text-brand-secondary" />}
            value={25000}
            label="Users"
            description="Across various industries"
            delay={0.1}
          />
          <StatCard
            icon={<Zap className="h-5 w-5 sm:h-6 sm:w-6 text-brand-primary" />}
            value={99.9}
            label="Uptime"
            suffix="%"
            description="Enterprise-grade reliability"
            delay={0.2}
          />
          <StatCard
            icon={<BarChart className="h-5 w-5 sm:h-6 sm:w-6 text-brand-secondary" />}
            value={10}
            suffix="x"
            label="Productivity"
            description="Average productivity boost"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  )
}

function StatCard({
  icon,
  value,
  label,
  description,
  suffix = "",
  delay = 0,
}: {
  icon: React.ReactNode
  value: number
  label: string
  description: string
  suffix?: string
  delay?: number
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      const duration = 2000 // animation duration in ms
      const startTime = Date.now()

      const animateValue = () => {
        const now = Date.now()
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing function for smoother animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)

        setDisplayValue(Math.floor(easeOutQuart * value))

        if (progress < 1) {
          requestAnimationFrame(animateValue)
        } else {
          setDisplayValue(value)
        }
      }

      requestAnimationFrame(animateValue)
    }
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="bg-white dark:bg-secondary/5 backdrop-blur-sm border-2 border-gray-200 dark:border-primary/10 rounded-xl p-4 sm:p-6 hover:border-brand-primary/30 transition-all duration-300 group shadow-sm"
    >
      <div className="flex flex-col items-center text-center">
        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-50 dark:bg-background flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>

        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 flex items-baseline">
          <span className="tabular-nums">{displayValue.toLocaleString()}</span>
          <span className="text-brand-primary">{suffix}</span>
        </div>

        <div className="font-medium text-base sm:text-lg mb-1 sm:mb-2">{label}</div>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  )
}
