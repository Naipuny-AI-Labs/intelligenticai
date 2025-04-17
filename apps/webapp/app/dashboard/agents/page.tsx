"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Bot, Plus, Search, MoreHorizontal, Settings, CheckCircle, PlusCircle, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getAgents } from "@/lib/agents"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardAgentCard } from "@/components/dashboard-agent-card"
import { useAppSelector } from "@/lib/redux/hooks"
import type { Agent } from "@/lib/types"

export default function AgentsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name-asc")
  const [activeTab, setActiveTab] = useState<string>("approved")

  // Get all agents
  const allAgents = getAgents()

  // Get unique categories for filter
  const categories = Array.from(new Set(allAgents.map((agent) => agent.category.toLowerCase())))

  // Get approved agents from Redux store
  const { approvedAgents } = useAppSelector((state) => state.agents)

  // Apply filters and sorting to approved agents
  const filteredAgents = approvedAgents
    .filter((agent) => {
      // Apply search filter
      if (
        searchQuery &&
        !agent.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !agent.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Apply category filter
      if (categoryFilter !== "all" && agent.category.toLowerCase() !== categoryFilter) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === "name-asc") return a.name.localeCompare(b.name)
      if (sortBy === "name-desc") return b.name.localeCompare(a.name)
      if (sortBy === "category") return a.category.localeCompare(b.category)
      return 0
    })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Bot className="h-8 w-8 animate-pulse text-primary mb-4" />
        <p className="text-muted-foreground">Loading agents...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My AI Agents</h1>
            <p className="text-muted-foreground">Manage and use your AI agents</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/request">
              <Plus className="mr-2 h-4 w-4" />
              Request New Agent
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="approved" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="approved">
              My Agents
              <Badge className="ml-2 bg-green-500/10 text-green-500">{approvedAgents.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="approved" className="space-y-4">
            {filteredAgents.length > 0 ? (
              <>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap 2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[300px]">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search agents..."
                        className="pl-8 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                        <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                        <SelectItem value="category">Category</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex items-center rounded-md border bg-muted">
                      <Button
                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setViewMode("grid")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-grid-2x2"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                          <path d="M3 12h18" />
                          <path d="M12 3v18" />
                        </svg>
                        <span className="sr-only">Grid view</span>
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "secondary" : "ghost"}
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setViewMode("list")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-list"
                        >
                          <line x1="8" x2="21" y1="6" y2="6" />
                          <line x1="8" x2="21" y1="12" y2="12" />
                          <line x1="8" x2="21" y1="18" y2="18" />
                          <line x1="3" x2="3.01" y1="6" y2="6" />
                          <line x1="3" x2="3.01" y1="12" y2="12" />
                          <line x1="3" x2="3.01" y1="18" y2="18" />
                        </svg>
                        <span className="sr-only">List view</span>
                      </Button>
                    </div>
                  </div>
                </div>

                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAgents.map((agent, index) => (
                      <motion.div
                        key={agent.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <DashboardAgentCard agent={agent} variant="compact" />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[300px]">Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAgents.map((agent) => (
                          <TableRow key={agent.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Bot className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <div>{agent.name}</div>
                                  <div className="text-xs text-muted-foreground truncate max-w-[250px]">
                                    {agent.description}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{agent.category}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="secondary"
                                className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                              >
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Active
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              {/* The following line is commented out because the Agent type does not have a price property. */}
                              {/* ${(agent.price / 100).toFixed(2)}/mo */}
                            </TableCell>
                            <TableCell>
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
                                    <Link href={`/dashboard/agents/chat/${agent.id}`}>
                                      <Bot className="mr-2 h-4 w-4" />
                                      <span>Chat</span>
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/agents/${agent.id}/integrations`}>
                                      <Link2 className="mr-2 h-4 w-4" />
                                      <span>Integrations</span>
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/agents/${agent.id}/settings`}>
                                      <Settings className="mr-2 h-4 w-4" />
                                      <span>Settings</span>
                                    </Link>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-muted/30 p-4 rounded-full mb-4">
                  <Bot className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Agents Found</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  You don't have any agents yet. Request access to agents to get started.
                </p>
                <Button asChild>
                  <Link href="/dashboard/request">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Request Agents
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
