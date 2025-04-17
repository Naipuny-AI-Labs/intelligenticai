"use client"

import { useEffect, useState, useCallback } from "react"
import { notFound, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Bot, Settings, Zap, Link2, AlertCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { EnhancedIntegrationsPanel } from "@/components/enhanced-integrations-panel"
import { useToast } from "@/hooks/use-toast"
import type { Agent, AgentIntegration } from "@/lib/types"

interface AgentIntegrationsPageProps {
  params: {
    id: string
  }
}

export default function AgentIntegrationsPage({ params }: AgentIntegrationsPageProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [agent, setAgent] = useState<Agent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("integrations")
  const [integrations, setIntegrations] = useState<AgentIntegration[]>([])

  // Fetch agent data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const agentData = getAgentById(params.id)
        if (!agentData) {
          notFound()
          return
        }
        setAgent(agentData)
      } catch (error) {
        console.error("Error fetching agent data:", error)
        toast({
          title: "Error loading agent",
          description: "Failed to load agent data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id, toast])

  // Handle integration added
  const handleIntegrationAdded = useCallback(
    (integration: AgentIntegration) => {
      setIntegrations((prev) => [...prev, integration])
      toast({
        title: "Integration added",
        description: `${integration.name} integration has been added successfully.`,
      })
    },
    [toast],
  )

  // Handle integration removed
  const handleIntegrationRemoved = useCallback(
    (integrationId: string) => {
      setIntegrations((prev) => prev.filter((i) => i.id !== integrationId))
      toast({
        title: "Integration removed",
        description: "The integration has been removed successfully.",
      })
    },
    [toast],
  )

  // Handle integration updated
  const handleIntegrationUpdated = useCallback(
    (integration: AgentIntegration) => {
      setIntegrations((prev) => prev.map((i) => (i.id === integration.id ? integration : i)))
      toast({
        title: "Integration updated",
        description: `${integration.name} integration has been updated successfully.`,
      })
    },
    [toast],
  )

  // Check if there are any integrations with errors
  const hasIntegrationErrors = integrations.some((i) => i.status === "error")

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Bot className="h-8 w-8 animate-pulse text-primary mb-4" />
        <p className="text-muted-foreground">Loading agent...</p>
      </div>
    )
  }

  if (!agent) {
    notFound()
  }

  return (
    <div className="container max-w-5xl py-8">
      <div className="mb-6">
        <Link
          href="/dashboard/agents"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to agents
        </Link>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">{agent.name}</h1>
            <p className="text-muted-foreground">{agent.description}</p>
          </div>
        </div>

        {hasIntegrationErrors && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Integration Issues Detected</AlertTitle>
            <AlertDescription>
              One or more of your agent integrations are reporting errors. Please check the integration settings.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="integrations" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="integrations" className="data-[state=active]:bg-background">
                <Link2 className="h-4 w-4 mr-2" />
                Integrations
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-background">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="automation" className="data-[state=active]:bg-background">
                <Zap className="h-4 w-4 mr-2" />
                Automation
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="integrations" className="space-y-6">
            <EnhancedIntegrationsPanel
              agent={agent}
              onIntegrationAdded={handleIntegrationAdded}
              onIntegrationRemoved={handleIntegrationRemoved}
              onIntegrationUpdated={handleIntegrationUpdated}
            />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Settings</CardTitle>
                <CardDescription>Configure your agent settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings panel coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Automation Rules</CardTitle>
                <CardDescription>Set up automation rules and triggers for this agent</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Automation panel coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
