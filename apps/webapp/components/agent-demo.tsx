"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Agent, Message } from "@/lib/types"
import { chatApi } from "@/lib/api-client"

interface AgentDemoProps {
  agent: Agent
}

export function AgentDemo({ agent }: AgentDemoProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi there! I'm ${agent.name}. How can I help you today?`,
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    }

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Call the API
      const response = await chatApi.sendMessage(userMessage.content, agent)

      // Add assistant message
      const assistantMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: response.response || "I'm sorry, I couldn't process that request.",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error getting response:", error)

      // Add error message
      const errorMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        role: "system",
        content: "Sorry, there was an error processing your request. Please try again.",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="flex flex-col h-[500px] md:h-[600px] w-full">
      <CardHeader className="px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`/placeholder-icon.png?height=32&width=32&text=${agent.name.charAt(0)}`} />
            <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base">{agent.name}</CardTitle>
            <div className="text-xs text-muted-foreground">{agent.category}</div>
          </div>
        </div>
      </CardHeader>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role !== "user" && (
                <Avatar className="h-8 w-8 mt-0.5">
                  {message.role === "assistant" ? (
                    <>
                      <AvatarImage src={`/placeholder-icon.png?height=32&width=32&text=${agent.name.charAt(0)}`} />
                      <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="/placeholder.svg?height=32&width=32&text=S" />
                      <AvatarFallback>S</AvatarFallback>
                    </>
                  )}
                </Avatar>
              )}
              <div className="group relative">
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : message.role === "assistant"
                        ? "bg-muted"
                        : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8 mt-0.5">
                  <AvatarImage src="/placeholder.svg?height=32&width=32&text=U" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8 mt-0.5">
                <AvatarImage src={`/placeholder-icon.png?height=32&width=32&text=${agent.name.charAt(0)}`} />
                <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg px-4 py-2 flex items-center">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <CardFooter className="p-4 border-t">
        <div className="flex items-center w-full gap-2">
          <Input
            ref={inputRef}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading} size="icon">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
