"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, notFound } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Bot, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AgentChat } from "@/components/agent-chat"
import { getAgentById } from "@/lib/agents"
import type { Agent } from "@/lib/types"

interface AgentChatPageProps {
  params: {
    id: string
  }
}

export default function AgentChatPage({ params }: AgentChatPageProps) {
  const { id } = params
  const router = useRouter()
  const [agent, setAgent] = useState<Agent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showLimitAlert, setShowLimitAlert] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/auth/sign-in")
      return
    }

    // Get agent data
    const agentData = getAgentById(id)
    if (agentData) {
      setAgent(agentData)
    }

    setIsLoading(false)
  }, [id, router])

  // Define this function outside of render to prevent recreation on each render
  const handleMessageLimitReached = useCallback(() => {
    setShowLimitAlert(true)

    // Scroll to the alert
    setTimeout(() => {
      const alertElement = document.getElementById("limit-alert")
      if (alertElement) {
        alertElement.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }, []) // Empty dependency array

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
    <div className="container max-w-5xl py-8">
      {/* <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to dashboard
        </Link>
      </div> */}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">{agent.name}</h1>
            <p className="text-muted-foreground">{agent.description}</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/request">
              <Bot className="mr-2 h-4 w-4" />
              Request More Agents
            </Link>
          </Button>
        </div>

        {showLimitAlert && (
          <Alert className="mb-6 bg-primary/5 border-primary/20" id="limit-alert">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Message Limit Reached</AlertTitle>
            <AlertDescription>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span>
                  You've reached the trial message limit for this agent. Request additional agents for more
                  functionality.
                </span>
                <Button size="sm" className="mt-2 md:mt-0" asChild>
                  <Link href="/dashboard/request">Request Agents</Link>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AgentChat
              agent={agent}
              messageLimit={5}
              onMessageLimitReached={handleMessageLimitReached}
              key={agent.id} // Add a key to force remount if agent changes
            />
          </div>

          <div className="space-y-6">
            <div className="bg-muted/30 rounded-lg p-6 border">
              <h3 className="text-lg font-medium mb-4">About this Agent</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
                  <p>{agent.category}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Capabilities</h4>
                  <ul className="list-disc list-inside">
                    {agent.capabilities.map((capability, index) => (
                      <li key={index} className="text-sm">
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Trial Limits</h4>
                  <p className="text-sm">5 messages with this agent</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
              <h3 className="text-lg font-medium mb-2">Request More Agents</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get access to all agents. Custom pricing based on your needs.
              </p>
              <Button className="w-full" asChild>
                <Link href="/dashboard/request">
                  <Bot className="mr-2 h-4 w-4" />
                  Request More Agents
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
