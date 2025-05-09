"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Bot, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TextReveal } from "@/components/ui/text-reveal"
import { Spotlight } from "@/components/ui/spotlight"
import { GlowingButton } from "@/components/ui/glowing-button"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"

export function HeroSection() {
  const words = [
    {
      text: "Build",
    },
    {
      text: "powerful",
    },
    {
      text: "AI",
    },
    {
      text: "workflows",
    },
    {
      text: "with",
    },
    {
      text: "INTELLIGENTIC AI.",
      className: "text-brand-primary dark:text-brand-primary",
    },
  ]

  return (
    <section className="relative bg-white dark:bg-transparent overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/0" />
      </div>

      {/* Background dots pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />
      </div>

      {/* Animated background blobs - more subtle in light mode */}
      <div className="absolute top-1/4 left-1/4 w-36 sm:w-48 md:w-72 h-36 sm:h-48 md:h-72 bg-brand-primary/5 dark:bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/3 right-1/4 w-36 sm:w-48 md:w-72 h-36 sm:h-48 md:h-72 bg-brand-secondary/5 dark:bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-1/4 right-1/3 w-36 sm:w-48 md:w-72 h-36 sm:h-48 md:h-72 bg-brand-primary/5 dark:bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(97, 206, 112, 0.15)" />

      {/* Animated dots */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-brand-primary/20 dark:bg-brand-primary/30"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto pt-8 pb-12 sm:pt-12 sm:pb-16 md:pt-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Subtle outer glow */}
            <motion.div
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 blur-md opacity-50"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.6, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            {/* Glass effect container */}
            <div className="relative px-4 sm:px-5 py-1.5 sm:py-2 bg-transparent backdrop-blur-md rounded-full border border-white/30 dark:border-white/10 shadow-sm group-hover:shadow-md transition-all duration-300">
              {/* Reflective highlight */}
              <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/20 to-transparent rounded-t-full"></div>

              {/* Glass border effect */}
              <div className="absolute inset-0 rounded-full border-2 border-brand-primary/20 group-hover:border-brand-primary/40 transition-colors duration-300"></div>

              {/* Content with animated sparkles */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="mr-2 sm:mr-2.5"
                >
                  <Sparkles className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 text-brand-primary" />
                </motion.div>

                <span className="text-xs sm:text-sm md:text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
                  AI-powered workflow automation
                </span>
              </div>
            </div>

            {/* Subtle particle effects */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white/40 dark:bg-white/30"
                  initial={{
                    x: "50%",
                    y: "50%",
                    opacity: 0,
                  }}
                  animate={{
                    x: `${50 + (Math.random() * 100 - 50)}%`,
                    y: `${50 + (Math.random() * 100 - 50)}%`,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.8,
                    repeatType: "loop",
                  }}
                />
              ))}
            </div>
          </motion.div>

          <div className="space-y-4 sm:space-y-6 md:space-y-8  sm:mt-6 md:mt-8">
            <TextReveal>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 dark:from-foreground dark:via-foreground/90 dark:to-foreground/70">
                Powerful AI Agents for Your Workflow
              </h1>
            </TextReveal>

            {/* <div className="h-12 sm:h-16">
              <TypewriterEffect words={words} className="text-lg sm:text-xl md:text-2xl" />
            </div> */}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto"
            >
              Discover and deploy specialized AI agents that automate tasks, analyze data, and enhance productivity.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GlowingButton glowColor="#61CE70" size="lg" className="w-full sm:w-auto">
              <Link href="/marketplace" className="flex items-center justify-center">
                Try an Agent
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </GlowingButton>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 border-brand-primary/20 hover:border-brand-primary/40 hover:bg-transparent transition-all duration-300"
              asChild
            >
              <Link href="/onboarding/build" className="flex items-center justify-center">
                Build Your Agent
                <Bot className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* 3D Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative w-full max-w-5xl mx-auto mt-8 sm:mt-10 md:mt-12"
          >
            <div className="relative bg-transparent backdrop-blur-sm border-2 border-gray-200 dark:border-primary/20 rounded-xl p-4 sm:p-6 shadow-lg hover:border-brand-primary/30 transition-all duration-300 transform perspective-1200 rotateX-3 group">
              {/* Glow effect */}
              <div className="absolute -inset-px bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {[
                  {
                    title: "Data Processing",
                    description: "Transform raw data into actionable insights",
                    icon: (
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-transparent border border-brand-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-brand-primary" />
                      </div>
                    ),
                    delay: 0.5,
                  },
                  {
                    title: "Workflow Automation",
                    description: "Automate repetitive tasks and processes",
                    icon: (
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-transparent border border-brand-secondary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-brand-secondary" />
                      </div>
                    ),
                    delay: 0.6,
                  },
                  {
                    title: "Content Generation",
                    description: "Create high-quality content at scale",
                    icon: (
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-transparent border border-brand-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-brand-primary" />
                      </div>
                    ),
                    delay: 0.7,
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: item.delay }}
                    className="bg-transparent backdrop-blur-sm border-2 border-gray-200 dark:border-primary/10 p-4 sm:p-6 rounded-lg flex flex-col items-center text-center hover:border-brand-primary/30 transition-all duration-300 group/card"
                  >
                    <div className="mb-3 sm:mb-4 transform group-hover/card:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="font-medium text-base sm:text-lg mb-1 sm:mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-4 sm:mt-6 bg-transparent h-24 sm:h-32 rounded-lg flex items-center justify-center border-2 border-gray-200 dark:border-primary/10 hover:border-brand-primary/30 transition-all duration-300 overflow-hidden relative group/workflow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {/* Animated dots */}
                <div className="absolute inset-0 flex items-center">
                  <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent relative">
                    <div className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-brand-primary transform -translate-y-1/2 animate-workflow-dot-1"></div>
                    <div className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-brand-secondary transform -translate-y-1/2 animate-workflow-dot-2"></div>
                    <div className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-brand-primary transform -translate-y-1/2 animate-workflow-dot-3"></div>
                  </div>
                </div>

                <div className="text-center relative z-10 px-3 sm:px-4 py-4 sm:py-6 bg-transparent backdrop-blur-sm rounded-lg border-2 border-gray-200 dark:border-primary/10 transform group-hover/workflow:scale-105 transition-transform duration-300">
                  <div className="font-medium text-base sm:text-lg mb-1">Workflow Visualization</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-muted-foreground">
                    See how AI agents transform your processes
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Simplified connection lines */}
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-30"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M20,50 C40,30 60,70 80,50"
                stroke="url(#gradient1)"
                strokeWidth="0.5"
                strokeDasharray="1,3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.path
                d="M20,60 C40,80 60,40 80,60"
                stroke="url(#gradient2)"
                strokeWidth="0.5"
                strokeDasharray="1,3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#61CE70" />
                  <stop offset="100%" stopColor="#1085e4" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1085e4" />
                  <stop offset="100%" stopColor="#61CE70" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
