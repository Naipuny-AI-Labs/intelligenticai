"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Bot, Search, Filter, MessageSquare, MoreHorizontal, Trash2, Archive, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAgents } from "@/lib/agents"

export default function ConversationsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Sample conversations data
  const conversations = [
    {
      id: "conv-1",
      agentId: "agent-1",
      title: "Customer Support Inquiry",
      lastMessage: "How can I reset my password?",
      timestamp: "2 hours ago",
      status: "active",
      starred: true,
    },
    {
      id: "conv-2",
      agentId: "agent-2",
      title: "Data Analysis Project",
      lastMessage: "Here's the analysis of your quarterly sales data",
      timestamp: "Yesterday",
      status: "completed",
      starred: false,
    },
    {
      id: "conv-3",
      agentId: "agent-3",
      title: "Content Creation",
      lastMessage: "I've drafted a blog post about AI trends",
      timestamp: "3 days ago",
      status: "archived",
      starred: false,
    },
  ]

  // Get agent data
  const agents = getAgents()
  const agentMap = agents.reduce((acc, agent) => {
    acc[agent.id] = agent
    return acc
  }, {})

  // Filter conversations based on search and active tab
  const filteredConversations = conversations.filter((conv) => {
    // Apply search filter
    if (searchQuery && !conv.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Apply tab filter
    if (activeTab === "starred" && !conv.starred) return false
    if (activeTab === "active" && conv.status !== "active") return false
    if (activeTab === "archived" && conv.status !== "archived") return false

    return true
  })

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Bot className="h-8 w-8 animate-pulse text-primary mb-4" />
        <p className="text-muted-foreground">Loading conversations...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Conversations</h1>
            <p className="text-muted-foreground">Manage your conversations with AI agents</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/conversations/new">
              <MessageSquare className="mr-2 h-4 w-4" />
              New Conversation
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" className="h-9 gap-1 shadow-sm">
              <Filter className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <DatePickerWithRange className="w-auto" />
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-background">
              All
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-background">
              Active
            </TabsTrigger>
            <TabsTrigger value="starred" className="data-[state=active]:bg-background">
              Starred
            </TabsTrigger>
            <TabsTrigger value="archived" className="data-[state=active]:bg-background">
              Archived
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conversation, index) => {
                const agent = agentMap[conversation.agentId]
                return (
                  <motion.div
                    key={conversation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={`/placeholder.svg?height=32&width=32&text=${agent?.name?.charAt(0) || "A"}`}
                              />
                              <AvatarFallback>{agent?.name?.charAt(0) || "A"}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base">{conversation.title}</CardTitle>
                              <CardDescription className="text-xs">
                                With {agent?.name || "AI Agent"} • {conversation.timestamp}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {conversation.starred && (
                              <Badge
                                variant="outline"
                                className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                              >
                                <Star className="h-3 w-3 mr-1 fill-yellow-500" />
                                Starred
                              </Badge>
                            )}
                            {conversation.status === "active" && (
                              <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                                Active
                              </Badge>
                            )}
                            {conversation.status === "archived" && (
                              <Badge variant="outline" className="bg-gray-500/10 text-gray-500 hover:bg-gray-500/20">
                                Archived
                              </Badge>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                  <Link href={`/dashboard/conversations/${conversation.id}`}>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    <span>Open</span>
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Star className="mr-2 h-4 w-4" />
                                  <span>{conversation.starred ? "Unstar" : "Star"}</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Archive className="mr-2 h-4 w-4" />
                                  <span>{conversation.status === "archived" ? "Unarchive" : "Archive"}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-1">{conversation.lastMessage}</p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link href={`/dashboard/conversations/${conversation.id}`}>Continue Conversation</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-muted/30 p-4 rounded-full mb-4">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No conversations found</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  {searchQuery
                    ? "No conversations match your search criteria. Try a different search term."
                    : activeTab === "starred"
                      ? "You haven't starred any conversations yet."
                      : activeTab === "archived"
                        ? "You don't have any archived conversations."
                        : "Start a new conversation with an AI agent to get help with your tasks."}
                </p>
                <Button asChild>
                  <Link href="/dashboard/conversations/new">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    New Conversation
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
