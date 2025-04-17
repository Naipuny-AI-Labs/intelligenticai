"use client"

import { DialogFooter } from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, Loader2, Search, Info, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { getAllAgents } from "@/lib/agents"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function RequestAgentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [agents, setAgents] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [sortBy, setSortBy] = useState("name-asc")
  const [requestLoading, setRequestLoading] = useState<Record<string, boolean>>({})
  const [requestStatus, setRequestStatus] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [open, setOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState<"all" | "pending">("all")
  const [formData, setFormData] = useState({
    useCase: "",
  })

  const categories = ["All", "Support", "Content", "Analytics", "Sales", "Marketing", "Other"]

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const allAgents = getAllAgents()
        if (allAgents.length === 0) {
          console.warn("No agents found")
        }
        setAgents(allAgents)
      } catch (error) {
        console.error("Error fetching agents:", error)
        toast({
          title: "Error",
          description: "Failed to load agents. Please try again later.",
          variant: "destructive",
        })
      }
    }
    fetchAgents()
  }, [toast])

  const filteredAgents = agents
    .filter((agent) => {
      if (selectedTab === "pending" && requestStatus[agent.id] !== "pending") return false
      if (
        searchQuery &&
        !agent.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !agent.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }
      if (categoryFilter !== "All" && agent.category !== categoryFilter) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name)
      return b.name.localeCompare(a.name)
    })

  const handleRequestAccess = async (agent: any) => {
    setRequestLoading((prev) => ({ ...prev, [agent.id]: true }))
    setSelectedAgent(agent)
    setOpen(true)
  }

  const handleSubmit = async () => {
    if (!selectedAgent) return

    localStorage.setItem(
      "requestedAgent",
      JSON.stringify({
        id: selectedAgent.id,
        name: selectedAgent.name,
        slug: selectedAgent.slug,
        category: selectedAgent.category,
      }),
    )

    setTimeout(() => {
      setRequestLoading((prev) => ({ ...prev, [selectedAgent.id]: false }))
      setRequestStatus((prev) => ({ ...prev, [selectedAgent.id]: "pending" }))
      setSuccess(true)
      setOpen(false)
      toast({
        title: "Request submitted",
        description: `Your request for ${selectedAgent.name} has been submitted successfully.`,
      })
    }, 1500)
  }

  return (
    <div className="container py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div className="flex gap-4">
          <Button
            className={`bg-gradient-to-r ${
              selectedTab === "all" 
                ? "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600" 
                : "bg-transparent border"
            } text-white`}
            onClick={() => setSelectedTab("all")}
          >
            All Agents
          </Button>
          <Button
            className={`bg-gradient-to-r ${
              selectedTab === "pending" 
                ? "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600" 
                : "bg-transparent border"
            } text-white`}
            onClick={() => setSelectedTab("pending")}
          >
            Pending Agents
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredAgents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{agent.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/agent/${agent.id}`)}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                  <Badge>{agent.category}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{agent.description}</p>
                  <Link
                    href={`/agent/${agent.id}`}
                    className="mt-2 inline-block text-sm text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                    onClick={() => handleRequestAccess(agent)}
                    disabled={requestLoading[agent.id] || requestStatus[agent.id] === "pending"}
                  >
                    {requestLoading[agent.id] ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Requesting...
                      </>
                    ) : requestStatus[agent.id] === "pending" ? (
                      "Pending Approval"
                    ) : (
                      "Request Access"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No agents found matching your criteria</p>
          </div>
        )}

        {success && (
          <Card className="border-green-200 bg-green-50 dark:bg-green-900/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-500" />
                <CardTitle>Request Submitted Successfully</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We'll review your request and get back to you shortly. You can check the status of your request in the
                dashboard.
              </p>
            </CardContent>
          </Card>
        )}
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Access</DialogTitle>
            <DialogDescription>
              Describe how you plan to use this agent to help us understand your needs better.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="useCase" className="text-right">
                Use Case
              </Label>
              <Textarea
                id="useCase"
                placeholder="Describe your use case"
                className="col-span-3"
                value={formData.useCase}
                onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}