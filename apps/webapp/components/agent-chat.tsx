"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Send,
  Bot,
  Loader2,
  X,
  Maximize2,
  Minimize2,
  Search,
  Download,
  Share2,
  Bookmark,
  MoreHorizontal,
  Crown,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { chatApi } from "@/lib/api-client"
import { loadConversation, saveConversation, getUserMessageCount } from "@/lib/chat-utils"
import { getChatTemplates } from "@/lib/agents"
import type { Agent, Message, Attachment, ChatTemplate } from "@/lib/types"
import { useAppSelector } from "@/lib/redux/hooks"

interface AgentChatProps {
  agent: Agent
  initialMessages?: Message[]
  messageLimit?: number
  onMessageLimitReached?: () => void
  fullWidth?: boolean
}

export function AgentChat({
  agent,
  initialMessages = [],
  messageLimit = 5,
  onMessageLimitReached,
  fullWidth = false,
}: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messagesUsed, setMessagesUsed] = useState(0)
  const [isLimitReached, setIsLimitReached] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [typingIndex, setTypingIndex] = useState(0)
  const [currentResponse, setCurrentResponse] = useState("")
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Message[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<ChatTemplate | null>(null)
  const [templates, setTemplates] = useState<ChatTemplate[]>([])

  // Get user subscription from Redux store
  const { currentUser } = useAppSelector((state) => state.user)
  const isPremium = currentUser?.subscription === "pro" || currentUser?.subscription === "enterprise"

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const initialLoadRef = useRef(false)

  // Load conversation from localStorage only once on mount
  useEffect(() => {
    if (initialLoadRef.current) return
    initialLoadRef.current = true

    // Load existing conversation
    const storedMessages = loadConversation(agent.id)
    if (storedMessages.length > 0) {
      setMessages(storedMessages)

      // Count user messages
      const userMessageCount = getUserMessageCount(storedMessages)
      setMessagesUsed(userMessageCount)

      // Only set limit reached for non-premium users
      if (!isPremium) {
        setIsLimitReached(userMessageCount >= messageLimit)
      }
    } else if (initialMessages.length > 0) {
      // If no stored conversation but we have initial messages
      setMessages(initialMessages)

      // Save initial messages to localStorage
      saveConversation(agent.id, initialMessages)

      // Count user messages in initial messages
      const userMessageCount = getUserMessageCount(initialMessages)
      setMessagesUsed(userMessageCount)

      // Only set limit reached for non-premium users
      if (!isPremium) {
        setIsLimitReached(userMessageCount >= messageLimit)
      }
    }

    // Load chat templates
    setTemplates(getChatTemplates(agent.id))
  }, [agent.id, initialMessages, messageLimit, isPremium])

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

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return

    // Check if message limit reached for non-premium users
    if (!isPremium && messagesUsed >= messageLimit) {
      setIsLimitReached(true)
      if (onMessageLimitReached) {
        onMessageLimitReached()
      }
      return
    }

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    }

    // Add user message to chat using functional update
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")
    setIsLoading(true)

    // Save conversation to localStorage - use a local copy of messages
    const updatedMessages = [...messages, userMessage]
    saveConversation(agent.id, updatedMessages)

    // Increment message count
    const newCount = messagesUsed + 1
    setMessagesUsed(newCount)

    // Check if this message reaches the limit for non-premium users
    if (!isPremium && newCount >= messageLimit) {
      setIsLimitReached(true)
    }

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

      // Use functional update to avoid dependency on messages
      setMessages((prevMessages) => [...prevMessages, assistantMessage])

      // Save updated conversation to localStorage
      saveConversation(agent.id, [...updatedMessages, assistantMessage])

      // If this was the last message, trigger the limit reached callback for non-premium users
      if (!isPremium && newCount >= messageLimit && onMessageLimitReached) {
        onMessageLimitReached()
      }
    } catch (error) {
      console.error("Error getting response:", error)

      // Add error message
      const errorMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        role: "system",
        content: "Sorry, there was an error processing your request. Please try again.",
        timestamp: new Date().toISOString(),
      }

      // Use functional update
      setMessages((prevMessages) => [...prevMessages, errorMessage])

      // Save updated conversation to localStorage
      saveConversation(agent.id, [...updatedMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, isPremium, messagesUsed, messageLimit, messages, agent, onMessageLimitReached])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      }
    },
    [handleSendMessage],
  )

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newAttachments: Attachment[] = []

    Array.from(files).forEach((file) => {
      const fileType = file.type.startsWith("image/")
        ? "image"
        : file.type.startsWith("audio/")
          ? "audio"
          : file.type.startsWith("video/")
            ? "video"
            : "file"

      const attachment: Attachment = {
        id: `attachment-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        type: fileType,
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        thumbnailUrl: fileType === "image" ? URL.createObjectURL(file) : undefined,
      }

      newAttachments.push(attachment)
    })

    setAttachments((prev) => [...prev, ...newAttachments])

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [])

  const handleRemoveAttachment = useCallback((id: string) => {
    setAttachments((prev) => prev.filter((attachment) => attachment.id !== id))
  }, [])

  const handleReaction = useCallback((messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === messageId) {
          const existingReactions = message.reactions || []
          const userReaction = existingReactions.find((r) => r.userId === "user1")

          if (userReaction) {
            // Update existing reaction
            return {
              ...message,
              reactions: existingReactions.map((r) => (r.userId === "user1" ? { ...r, emoji } : r)),
            }
          } else {
            // Add new reaction
            return {
              ...message,
              reactions: [
                ...existingReactions,
                {
                  emoji,
                  userId: "user1",
                  timestamp: new Date().toISOString(),
                },
              ],
            }
          }
        }
        return message
      }),
    )
  }, [])

  const handleCopyMessage = useCallback((content: string) => {
    navigator.clipboard.writeText(content)
    // Show toast or notification
  }, [])

  const handleExportChat = useCallback(() => {
    const chatData = {
      agent: agent.name,
      messages: messages.map(({ id, role, content, timestamp }) => ({
        role,
        content,
        timestamp,
      })),
    }

    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `chat-with-${agent.name.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [agent.name, messages])

  const handleUseTemplate = useCallback((template: ChatTemplate) => {
    setInput(template.content)
    setSelectedTemplate(null)
    inputRef.current?.focus()
  }, [])

  const clearSearch = useCallback(() => {
    setSearchQuery("")
    setIsSearching(false)
  }, [])

  const markAsRead = useCallback((messageId: string) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === messageId) {
          return { ...message, read: true }
        }
        return message
      }),
    )
  }, [])

  const remainingMessages = messageLimit - messagesUsed

  return (
    <Card
      className={`flex flex-col ${
        isExpanded
          ? "fixed inset-4 z-50 h-[calc(100vh-2rem)]"
          : fullWidth
            ? "h-[600px] w-full"
            : "h-[600px] w-full md:w-[600px]"
      } transition-all duration-300`}
    >
      <CardHeader className="px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={agent.name || `/placeholder-icon.png?key=ujdrf&key=wafa4&height=32&width=32&text=${agent.name.charAt(0)}`} />
              <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{agent.name}</CardTitle>
              <div className="text-xs text-muted-foreground">{agent.category}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isPremium && (
              <Badge variant="outline" className="bg-primary/10 text-primary">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsSearching(true)}>
                    <Search className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Search conversation</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>More options</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExportChat}>
                  <Download className="h-4 w-4 mr-2" />
                  Export chat
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share conversation
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save conversation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleExpand}>
                    {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isExpanded ? "Minimize" : "Maximize"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {isSearching && (
          <div className="mt-2 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-8 pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-9 w-9"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={clearSearch}>
              Cancel
            </Button>
          </div>
        )}
      </CardHeader>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {/* Welcome message */}
          {messages.length === 0 && (
            <div className="flex justify-center my-8">
              <div className="bg-muted p-6 rounded-lg max-w-md text-center space-y-3">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Welcome to {agent.name}</h3>
                <p className="text-sm text-muted-foreground">
                  This agent specializes in {agent.capabilities.join(", ").toLowerCase()}.
                </p>
                {!isPremium && (
                  <div className="bg-background p-3 rounded-lg border">
                    <p className="text-xs text-muted-foreground">
                      You have {remainingMessages} messages remaining in your trial.
                    </p>
                    <Button size="sm" className="mt-2 w-full" asChild>
                      <Link href="/dashboard/subscription">
                        <Crown className="mr-2 h-4 w-4" />
                        Upgrade for Unlimited
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Message history */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role !== "user" && (
                <Avatar className="h-8 w-8 mt-0.5">
                  {message.role === "assistant" ? (
                    <>
                      <AvatarImage
                        src={`/placeholder-icon.png?key=u1q3m&key=f7j65&height=32&width=32&text=${agent.name.charAt(0)}`}
                      />
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
                <AvatarImage src={`/placeholder-icon.png?key=8sbo3&height=32&width=32&text=${agent.name.charAt(0)}`} />
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

          {/* Message limit reached alert - only for non-premium users */}
          {!isPremium && isLimitReached && (
            <Alert className="bg-primary/5 border-primary/20 mt-4">
              <AlertTitle className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Message Limit Reached
              </AlertTitle>
              <AlertDescription>
                <p className="mb-2">
                  You've reached the trial message limit for this agent. Upgrade to our Premium plan for unlimited
                  access.
                </p>
                <Button size="sm" className="mt-1" asChild>
                  <Link href="/dashboard/subscription">
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade Now
                  </Link>
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </ScrollArea>

      <CardFooter className="p-4 border-t">
        <div className="w-full space-y-2">
          <div className="flex items-center w-full gap-2">
            <Input
              ref={inputRef}
              placeholder={
                !isPremium && isLimitReached ? "Message limit reached. Upgrade for more." : "Type your message..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading || (!isPremium && isLimitReached)}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading || (!isPremium && isLimitReached)}
              size="icon"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>

          {/* Only show message counter for non-premium users */}
          {!isPremium && (
            <div className="w-full">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Messages used</span>
                <span>
                  {messagesUsed} / {messageLimit}
                </span>
              </div>
              <Progress value={(messagesUsed / messageLimit) * 100} className="h-1.5" />
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
