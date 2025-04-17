"use client"

import { motion } from "framer-motion"
import { AgentCard } from "@/components/agent-card"
import type { Agent } from "@/lib/types"

interface RelatedAgentsProps {
  agents: Agent[]
}

export function RelatedAgents({ agents }: RelatedAgentsProps) {
  if (!agents.length) return null

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold mb-2">Related Agents</h2>
          <p className="text-muted-foreground">Discover similar AI agents that might interest you</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AgentCard key={agent.id} agent={agent} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
