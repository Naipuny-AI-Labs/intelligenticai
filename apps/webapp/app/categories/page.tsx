"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Bot,
  BrainCircuit,
  Briefcase,
  Code,
  Filter,
  HeartPulse,
  LineChart,
  MessageSquare,
  Palette,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { AgentCard } from "@/components/agent-card"
import { getAllAgents } from "@/lib/agents"

const categories = [
  {
    id: "productivity",
    name: "Productivity",
    description: "Automate tasks and boost your efficiency",
    icon: <Briefcase className="h-6 w-6" />,
    color: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Generate content and creative assets",
    icon: <Palette className="h-6 w-6" />,
    color: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    description: "Process and visualize complex data",
    icon: <LineChart className="h-6 w-6" />,
    color: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    id: "customer-service",
    name: "Customer Service",
    description: "Engage with customers 24/7",
    icon: <MessageSquare className="h-6 w-6" />,
    color: "bg-yellow-500/10",
    iconColor: "text-yellow-500",
  },
  {
    id: "development",
    name: "Development",
    description: "Code assistance and debugging",
    icon: <Code className="h-6 w-6" />,
    color: "bg-red-500/10",
    iconColor: "text-red-500",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Medical assistance and health tracking",
    icon: <HeartPulse className="h-6 w-6" />,
    color: "bg-pink-500/10",
    iconColor: "text-pink-500",
  },
  {
    id: "research",
    name: "Research",
    description: "Analyze papers and research data",
    icon: <BrainCircuit className="h-6 w-6" />,
    color: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
  },
  {
    id: "custom",
    name: "Custom",
    description: "Build your own specialized agent",
    icon: <Bot className="h-6 w-6" />,
    color: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
]

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const allAgents = getAllAgents()

  const filteredAgents = allAgents.filter((agent) => {
    // Filter by category
    if (activeCategory !== "all" && agent.category.toLowerCase() !== activeCategory) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !agent.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  return (
    <main className="flex min-h-screen flex-col">
      <section className="bg-muted/30 py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h1 className="text-3xl font-bold tracking-tight">Browse AI Agents</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the perfect AI agent for your specific needs
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar with filters */}
            <div className="w-full lg:w-56 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setShowFilters(!showFilters)}>
                    <Filter className="h-4 w-4 mr-2" />
                    {showFilters ? "Hide" : "Show"}
                  </Button>
                </div>

                <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
                  <div>
                    <h3 className="text-sm font-medium mb-3">Categories</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="all"
                          checked={activeCategory === "all"}
                          onCheckedChange={() => setActiveCategory("all")}
                        />
                        <Label htmlFor="all" className="text-sm">
                          All Categories
                        </Label>
                      </div>
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={category.id}
                            checked={activeCategory === category.id}
                            onCheckedChange={() => setActiveCategory(category.id)}
                          />
                          <Label htmlFor={category.id} className="text-sm">
                            {category.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setActiveCategory("all")
                      setSearchQuery("")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search agents..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Tabs defaultValue="grid" className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{filteredAgents.length}</span> results
                  </div>
                  <TabsList>
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                    <TabsTrigger value="list">List</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="grid" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAgents.map((agent, index) => (
                      <motion.div
                        key={agent.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <AgentCard agent={agent} />
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="list" className="mt-6">
                  <div className="space-y-4">
                    {filteredAgents.map((agent, index) => (
                      <motion.div
                        key={agent.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-card border rounded-lg overflow-hidden"
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="relative w-full md:w-48 h-40">
                            <Image
                              src={`/placeholder.svg?height=200&width=200`}
                              alt={agent.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium text-lg">{agent.name}</h3>
                              <Badge variant="outline">{agent.category}</Badge>
                            </div>
                            <p className="text-muted-foreground mb-4">{agent.description}</p>
                            <div className="flex flex-wrap gap-1 mb-4">
                              {agent.capabilities.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <Button asChild size="sm">
                              <Link href={`/agents/${agent.slug}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              {filteredAgents.length === 0 && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <Bot className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No agents found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                  <Button
                    onClick={() => {
                      setActiveCategory("all")
                      setSearchQuery("")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
