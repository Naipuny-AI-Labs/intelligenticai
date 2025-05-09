"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAgentBySlug } from "@/lib/agents"
import { AgentDemo } from "@/components/agent-demo"

interface AgentDemoPageProps {
  params: {
    slug: string
  }
}

export default function AgentDemoPage({ params }: AgentDemoPageProps) {
  const { slug } = params
  const [mounted, setMounted] = useState(false)
  const agent = getAgentBySlug(slug)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!agent) {
    notFound()
  }

  if (!mounted) {
    return null
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container py-4 md:py-8">
        <Link
          href={`/agents/${slug}`}
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-4 md:mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to agent details
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">{agent.name} Demo</h1>
              <p className="text-sm text-muted-foreground">Experience the agent in action</p>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-2 md:p-6 shadow-sm">
            <AgentDemo agent={agent} />
          </div>

          <div className="mt-6 md:mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">Ready to use this agent in your projects?</p>
            <Button asChild>
              <Link href={`/agents/${slug}`}>Learn More About This Agent</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
