"use client"

import { useState, useEffect } from "react"
import { getAgentById } from "@/lib/agents"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AgentChat } from "@/components/agent-chat"

interface GlobalAgentChatProps {
  isOpen: boolean
  onClose: () => void
  agentId?: string
}

export function GlobalAgentChat({ isOpen, onClose, agentId = "1" }: GlobalAgentChatProps) {
  const [agent, setAgent] = useState<any>(null)

  // Get agent data when component mounts or agentId changes
  useEffect(() => {
    if (isOpen && agentId) {
      const agentData = getAgentById(agentId)
      if (agentData) {
        setAgent(agentData)
      }
    }
  }, [isOpen, agentId])

  if (!isOpen || !agent) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-3xl">
        <Button
          variant="secondary"
          size="icon"
          className="absolute -right-2 -top-2 z-50 h-8 w-8 rounded-full bg-background shadow-md"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        <AgentChat agent={agent} fullWidth={true} />
      </div>
    </div>
  )
}
