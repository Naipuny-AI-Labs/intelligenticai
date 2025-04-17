"use client"

import { useCallback } from "react"
import { Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useChat } from "@/components/chat-provider"
import type { Agent } from "@/lib/types"

interface ChatButtonProps {
  agent?: Agent
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function ChatButton({ agent, variant = "default", size = "default", className }: ChatButtonProps) {
  const { openChat } = useChat()

  const handleClick = useCallback(() => {
    if (agent) {
      openChat(agent.id)
    } else {
      openChat()
    }
  }, [openChat, agent])

  return (
    <Button variant={variant} size={size} onClick={handleClick} className={className}>
      <Bot className="mr-2 h-4 w-4" />
      {agent ? `Chat with ${agent.name}` : "Chat with Agent"}
    </Button>
  )
}
