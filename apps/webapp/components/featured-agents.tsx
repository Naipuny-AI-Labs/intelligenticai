"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AgentCard } from "@/components/agent-card"
import { getFeaturedAgents } from "@/lib/agents"

export function FeaturedAgents() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const featuredAgents = getFeaturedAgents()

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -current.clientWidth / 2 : current.clientWidth / 2
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Agents</h2>
            <p className="text-muted-foreground mt-2">Discover our most popular and powerful AI agents</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")} aria-label="Scroll left">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")} aria-label="Scroll right">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/agents" className="flex items-center gap-1">
                View all
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
        >
          {featuredAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              className="min-w-[300px] sm:min-w-[350px] snap-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AgentCard agent={agent} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
