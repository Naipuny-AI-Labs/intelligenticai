"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface TextRevealProps {
  children: React.ReactNode
  width?: "full" | "auto"
  text?: string
}

export const TextReveal: React.FC<TextRevealProps> = ({ children, width = "auto", text }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <div ref={ref} className={width === "full" ? "w-full" : "w-auto"}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {text ? (
          <div className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{text}</div>
        ) : (
          children
        )}
      </motion.div>
    </div>
  )
}
