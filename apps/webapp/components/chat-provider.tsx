"use client"

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react"
import { GlobalAgentChat } from "@/components/global-agent-chat"

interface ChatContextType {
  openChat: (agentId?: string) => void
  closeChat: () => void
  isOpen: boolean
  currentAgentId?: string
}

const ChatContext = createContext<ChatContextType>({
  openChat: () => {},
  closeChat: () => {},
  isOpen: false,
})

export const useChat = () => useContext(ChatContext)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentAgentId, setCurrentAgentId] = useState<string>()

  const openChat = useCallback((agentId?: string) => {
    setCurrentAgentId(agentId || "1") // Default to first agent if none specified
    setIsOpen(true)
  }, [])

  const closeChat = useCallback(() => {
    setIsOpen(false)
  }, [])

  const contextValue = useMemo(
    () => ({
      openChat,
      closeChat,
      isOpen,
      currentAgentId,
    }),
    [openChat, closeChat, isOpen, currentAgentId],
  )

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
      <GlobalAgentChat isOpen={isOpen} onClose={closeChat} agentId={currentAgentId} />
    </ChatContext.Provider>
  )
}
