"use client"

import { useEffect, useState, use } from "react"
import { notFound } from "next/navigation"
import { Bot, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AgentChat } from "@/components/agent-chat"
import { EnhancedIntegrationsPanel } from "@/components/enhanced-integrations-panel"
import { getAgentById } from "@/lib/agents"
import type { Agent } from "@/lib/types"

interface AgentPageProps {
  params: {
    id: string
  }
}
export default function AgentPage({ params }: AgentPageProps) {


  const [agent, setAgent] = useState<Agent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAgent = async () => {
      setIsLoading(true)
      try {
        const agentData = getAgentById(params.id)
        if (!agentData) {
          notFound()
        }
        setAgent(agentData)
      } catch (error) {
        console.error("Error fetching agent:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAgent()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Bot className="h-8 w-8 animate-pulse text-primary mb-4" />
        <p className="text-muted-foreground">Loading agent...</p>
      </div>
    )
  }

  if (!agent) {
    notFound()
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <Link
          href="/dashboard/agents"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Agents
        </Link>
      </div>

      <div className="flex flex-col gap-8">
      <AgentChat agent={agent} fullWidth />

        <EnhancedIntegrationsPanel agent={agent} />
      </div>
    </div>
  )
}
