"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Bot, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllAgents, getCategories, getAllChatflows } from "@/lib/agents"
import { Agent } from "@/lib/types"

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [allAgents, setAllAgents] = useState<Agent[]>([])
  const [allChatflows, setAllChatflows] = useState<Agent[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("agents")

  useEffect(() => {
    async function fetchData() {
      try {
        const [agents, chatflows, categories] = await Promise.all([
          getAllAgents(),
          getAllChatflows(),
          getCategories()
        ])
        setAllAgents(agents)
        setAllChatflows(chatflows)
        setCategories(['all', ...categories])
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredItems = (activeTab === "agents" ? allAgents : allChatflows).filter((item: Agent) => {
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (activeCategory !== "all" && item.category !== activeCategory) {
      return false
    }
    return true
  })

  return (
    <main className="flex min-h-screen flex-col">
      <section className="py-8">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-64">
              <div className="sticky top-24 space-y-6">
                <Tabs defaultValue="agents" onValueChange={setActiveTab}>
                  <TabsList className="w-full">
                    <TabsTrigger value="agents" className="w-full">AI Agents</TabsTrigger>
                    <TabsTrigger value="chatflows" className="w-full">AI Chatflows</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div>
                  <h3 className="text-sm font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`flex items-center justify-between w-full text-sm px-3 py-1.5 rounded-md transition-colors
                          ${
                            activeCategory === category
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-muted-foreground hover:bg-muted/50'
                          }`}
                      >
                        <span>{category === 'all' ? 'All Categories' : category}</span>
                        {activeCategory === category && (
                          <X className="h-4 w-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={`Search ${activeTab}...`}
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {activeCategory !== 'all' && (
                <div className="mb-6 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Filtering by:</span>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80 transition-colors"
                    onClick={() => setActiveCategory('all')}
                  >
                    {activeCategory}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{filteredItems.length}</span> results
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden h-full border-primary/10 hover:border-primary/30 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          {item.metadata.rating && (
                            <div className="flex items-center">
                              <svg
                                className="h-4 w-4 text-yellow-500 fill-yellow-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                              <span className="text-sm font-medium ml-1">{item.metadata.rating}</span>
                            </div>
                          )}
                        </div>
                        <Badge variant="secondary" className="mb-3">{item.category}</Badge>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{item.shortDescription}</p>
                        <div className="space-y-1 mb-4">
                          {item.capabilities.slice(0, 3).map((capability, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <svg
                                className="h-4 w-4 text-green-500 mr-2 flex-shrink-0"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span>{capability}</span>
                            </div>
                          ))}
                          {item.capabilities.length > 3 && (
                            <div className="text-sm text-primary hover:underline cursor-pointer">
                              +{item.capabilities.length - 3} more capabilities
                            </div>
                          )}
                        </div>
                        <div className="pt-4 border-t border-border flex flex-col sm:flex-row gap-2">
                          <Button asChild className="w-full">
                            <Link href={`/onboarding/${item.slug}`}>Try Demo</Link>
                          </Button>
                          <Button variant="outline" asChild className="w-full sm: w-auto">
                            <Link href={`/${activeTab}/${item.slug}`}>View Details</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <Bot className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No {activeTab} found</h3>
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
