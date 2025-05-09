"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, User, Paperclip, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Agent } from "@/lib/types"

interface AgentDemoProps {
  agent: Agent
}

interface Message {
  id: string
  role: "user" | "agent"
  content: string
  timestamp: Date
}

export function AgentDemo({ agent }: AgentDemoProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "agent",
      content: `Hello! I'm ${agent.name}, your AI assistant for ${agent.category.toLowerCase()} tasks. How can I help you today?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample responses based on agent category
  const getSampleResponse = (query: string) => {
    const responses: Record<string, string[]> = {
      "Data Analysis": [
        "I've analyzed the data you provided. Here are the key insights: 1) Revenue has increased by 15% compared to last quarter, 2) Customer acquisition cost has decreased by 8%, 3) The highest performing segment is in the enterprise sector.",
        "Based on the trends in your dataset, I predict a 12% growth in the next quarter if current conditions persist. Would you like me to generate a detailed forecast report?",
        "I've identified several anomalies in your data that might require attention. The most significant one is in the customer retention metrics for the West region.",
      ],
      "Content Generation": [
        "I've drafted a blog post about the topic you requested. Here's the introduction: \"In today's rapidly evolving digital landscape, businesses must adapt to new technologies or risk falling behind. Artificial intelligence, in particular, has emerged as a game-changing force across industries.\"",
        'Here\'s a social media post tailored for your LinkedIn audience: "Excited to announce our latest product feature! Our AI-powered analytics dashboard now offers predictive insights to help you stay ahead of market trends. #ProductLaunch #AIInnovation"',
        'I\'ve generated three email subject lines for your campaign: 1) "Transform Your Business with Our New Solution", 2) "Limited Time Offer: 30% Off Premium Features", 3) "Join Our Exclusive Webinar: Future of [Industry]".',
      ],
      "Customer Service": [
        "I understand you're having an issue with your recent order. I've checked your order #12345 and see that it was shipped on Monday. According to the tracking information, it should be delivered by tomorrow. Would you like me to send you the tracking details?",
        "I'm sorry to hear about your experience. I've documented your feedback and escalated it to our product team. In the meantime, let me help you find a workaround for this issue.",
        "Based on your account history, you're eligible for our loyalty program which includes priority support and exclusive discounts. Would you like me to enroll you in this program?",
      ],
      Development: [
        "Here's a code snippet to solve your problem:\n```javascript\nfunction optimizePerformance(data) {\n  return data.filter(item => item.value > threshold)\n    .map(item => transformItem(item))\n    .reduce((acc, item) => acc + item.score, 0);\n}\n```",
        "I've analyzed your codebase and identified a potential memory leak in the user authentication module. The issue appears to be in how session tokens are being stored and cleared.",
        "To implement this feature, you'll need to modify your API endpoints and add a new middleware for request validation. Would you like me to outline the specific changes needed?",
      ],
      Research: [
        "Based on my analysis of recent publications, there are three key trends emerging in your field: 1) Increased focus on sustainable practices, 2) Integration of AI in traditional processes, 3) Shift toward decentralized organizational structures.",
        "I've compiled a literature review on your topic. The most cited paper is by Johnson et al. (2022), which introduces a novel framework for evaluating performance metrics in dynamic environments.",
        "The data suggests a strong correlation (r=0.78) between the variables you're studying. However, it's important to note that correlation doesn't imply causation. Would you like me to suggest experimental designs to test for causality?",
      ],
      Automation: [
        "I've designed a workflow automation that can reduce your processing time by approximately 65%. The automation connects your CRM, email marketing platform, and billing system to create a seamless customer onboarding process.",
        "Based on your current processes, I've identified 5 tasks that are prime candidates for automation, potentially saving your team about 20 hours per week.",
        "I've created a trigger-based automation that will monitor your inventory levels and automatically generate purchase orders when stock falls below your defined thresholds.",
      ],
    }

    // Default responses if category-specific ones aren't available
    const defaultResponses = [
      "I've processed your request and have some insights to share. Would you like me to elaborate on any specific aspect?",
      "Based on your input, I've generated several recommendations that might help address your needs. Let me know if you'd like more details.",
      "I've analyzed your query and have prepared a comprehensive response. Is there a particular area you'd like me to focus on?",
    ]

    const categoryResponses = responses[agent.category] || defaultResponses
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)]
  }

  const handleSend = () => {
    if (input.trim() === "") return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        content: getSampleResponse(input),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, agentMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col h-[600px]">
      <Tabs defaultValue="chat" className="flex-1 flex flex-col">
        <div className="border-b px-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt={agent.name} />
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm">{agent.name}</div>
                <div className="text-xs text-muted-foreground">AI Assistant</div>
              </div>
            </div>
            <TabsList>
              <TabsTrigger value="chat" className="text-xs">
                Chat
              </TabsTrigger>
              <TabsTrigger value="info" className="text-xs">
                Info
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="chat" className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-8 w-8 mt-0.5">
                    {message.role === "agent" ? (
                      <>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt={agent.name} />
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src="/abstract-user.png" alt="User" />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div>
                    <div
                      className={`rounded-lg p-3 text-sm ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {message.content}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <Avatar className="h-8 w-8 mt-0.5">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={agent.name} />
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="rounded-lg p-3 text-sm bg-muted">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce delay-75"></div>
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                <Paperclip className="h-4 w-4" />
              </Button>
              <div className="relative flex-1">
                <Input
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pr-10"
                  disabled={isLoading}
                />
                {input && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setInput("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Button
                size="icon"
                className="rounded-full h-8 w-8"
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-center text-muted-foreground mt-2">
              This is a demo. Responses are simulated for demonstration purposes.
            </div>
          </div>
        </TabsContent>

        <TabsContent value="info" className="p-4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Agent Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <div className="text-sm font-medium">Name</div>
                <div className="text-sm text-muted-foreground">{agent.name}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Category</div>
                <div className="text-sm text-muted-foreground">{agent.category}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Description</div>
                <div className="text-sm text-muted-foreground">{agent.description}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {agent.capabilities.map((capability, index) => (
                  <Badge key={index} variant="outline">
                    {capability}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Usage Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                This is a demo version of {agent.name}. You can interact with the agent by typing messages in the chat
                interface.
              </p>
              <p className="text-sm text-muted-foreground">
                Try asking questions related to {agent.category.toLowerCase()} to see how the agent responds.
              </p>
              <p className="text-sm text-muted-foreground">
                Note: This demo has limited functionality compared to the full version.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
