"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Bot, BarChart2, Settings, Crown, PlusCircle, Link2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardAgentCard } from "@/components/dashboard-agent-card"
import { useAppSelector } from "@/lib/redux/hooks"
import { agentService } from "@/lib/agent-service"
import type { AgentIntegration } from "@/lib/types"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("agents")
  const [integrations, setIntegrations] = useState<AgentIntegration[]>([])
  const [hasIntegrationErrors, setHasIntegrationErrors] = useState(false)

  // Get user and workspace data from Redux store
  const { currentUser } = useAppSelector((state) => state.user)
  const { subscription, messagesUsed, messageLimit } = useAppSelector((state) => state.workspace)
  const { approvedAgents } = useAppSelector((state) => state.agents)

  const isPremium = subscription === "pro" || subscription === "enterprise"

  // Ensure at least one approved agent for trial users
  useEffect(() => {
    if (!isPremium && approvedAgents.length === 0) {
      // Dispatch action to set a default trial agent
      // This would typically be handled by your Redux setup
      console.log("Trial user should have at least one agent")
    }
  }, [isPremium, approvedAgents])

  // Fetch integrations for all agents
  useEffect(() => {
    const fetchAllIntegrations = async () => {
      if (!approvedAgents.length) return

      try {
        const allIntegrations: AgentIntegration[] = []

        for (const agent of approvedAgents) {
          const agentIntegrations = await agentService.getAgentIntegrations(agent.id)
          allIntegrations.push(...agentIntegrations)
        }

        setIntegrations(allIntegrations)

        // Check if any integrations have errors
        setHasIntegrationErrors(allIntegrations.some((i) => i.status === "error"))
      } catch (error) {
        console.error("Error fetching integrations:", error)
      }
    }

    fetchAllIntegrations()
  }, [approvedAgents])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BarChart2 className="h-8 w-8 animate-pulse text-primary" />
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6 pt-8 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {currentUser?.name}</p>
        </div>

        {!isPremium ? (
          <Button className="bg-gradient-to-r from-primary to-purple-600 shadow-lg" asChild>
            <Link href="/dashboard/subscription">
              <Crown className="mr-2 h-4 w-4" />
              Upgrade to Premium
            </Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/dashboard/request">
              <PlusCircle className="mr-2 h-4 w-4" />
              Request New Agent
            </Link>
          </Button>
        )}
      </div>

      {/* {hasIntegrationErrors && isPremium && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Integration Issues Detected</AlertTitle>
          <AlertDescription>
            One or more of your agent integrations are reporting errors.
            <Button variant="link" className="p-0 h-auto" asChild>
              <Link href="/dashboard/integrations"> View integrations</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )} */}

      {!isPremium && (
        <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
              <Crown className="h-5 w-5 text-amber-500" />
              Trial Account
            </CardTitle>
            <CardDescription className="text-amber-700 dark:text-amber-400">
              You're currently on a trial account with limited features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span className="text-amber-700 dark:text-amber-400">Messages Used</span>
                  <span className="font-medium text-amber-800 dark:text-amber-300">
                    {messagesUsed} / {messageLimit}
                  </span>
                </div>
                <Progress value={(messagesUsed / messageLimit) * 100} className="h-2 bg-amber-200 dark:bg-amber-900">
                  <div className="h-full bg-amber-500" />
                </Progress>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 rounded-lg border border-amber-200 dark:border-amber-800 p-4 bg-white/50 dark:bg-black/10">
                  <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-1">Trial Limitations</h3>
                  <ul className="text-sm space-y-1 text-amber-700 dark:text-amber-400">
                    <li>• Limited to {messageLimit} messages</li>
                    <li>• Access to only 1 AI agent</li>
                    <li>• Basic integrations only</li>
                  </ul>
                </div>

                <div className="flex-1 rounded-lg border border-amber-200 dark:border-amber-800 p-4 bg-white/50 dark:bg-black/10">
                  <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-1">Premium Benefits</h3>
                  <ul className="text-sm space-y-1 text-amber-700 dark:text-amber-400">
                    <li>• Unlimited messages</li>
                    <li>• Access to all AI agents</li>
                    <li>• Advanced integrations</li>
                    <li>• Priority support</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white" asChild>
              <Link href="/dashboard/subscription">
                <Crown className="mr-2 h-4 w-4" />
                Upgrade to Premium
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}

      <Tabs defaultValue="agents" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="agents" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            My Agents
          </TabsTrigger>
          {isPremium && (
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Link2 className="h-4 w-4" />
              Integrations
              {hasIntegrationErrors && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                  !
                </Badge>
              )}
            </TabsTrigger>
          )}
          {isPremium && (
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          )}
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <DashboardAgentCard agent={agent} />
              </motion.div>
            ))}

            {approvedAgents.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="col-span-full"
              >
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-primary/10 p-4 mb-4">
                      <Bot className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No Agents Yet</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      {!isPremium
                        ? "You're on a trial account. Upgrade to Premium to access all agents."
                        : "You haven't requested any agents yet. Request your first agent to get started."}
                    </p>
                    <Button asChild>
                      {!isPremium ? (
                        <Link href="/dashboard/subscription">
                          <Crown className="mr-2 h-4 w-4" />
                          Upgrade to Premium
                        </Link>
                      ) : (
                        <Link href="/dashboard/request">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Request Agent
                        </Link>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Premium users can request more agents */}
            {isPremium && approvedAgents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: approvedAgents.length * 0.1 }}
              >
                <Card className="border-dashed h-full flex flex-col justify-center items-center p-6">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <PlusCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Request More Agents</h3>
                  <p className="text-muted-foreground mb-6 text-center">
                    Need more specialized AI agents? Request access to additional agents.
                  </p>
                  <Button asChild>
                    <Link href="/dashboard/request">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Request Agent
                    </Link>
                  </Button>
                </Card>
              </motion.div>
            )}
          </div>
        </TabsContent>

        {isPremium && (
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Integrations</CardTitle>
                <CardDescription>Manage connections between your AI agents and external services</CardDescription>
              </CardHeader>
              <CardContent>
                {integrations.length > 0 ? (
                  <div className="space-y-4">
                    {hasIntegrationErrors && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Integration Issues</AlertTitle>
                        <AlertDescription>
                          Some integrations are reporting errors. Please check and fix them.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {integrations.map((integration) => (
                        <div
                          key={integration.id}
                          className={`border rounded-lg p-4 ${
                            integration.status === "error"
                              ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/10"
                              : "border-border"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Link2
                                className={`h-5 w-5 ${integration.status === "error" ? "text-red-500" : "text-primary"}`}
                              />
                              <h3 className="font-medium">{integration.name}</h3>
                            </div>
                            <Badge
                              variant={
                                integration.status === "active"
                                  ? "default"
                                  : integration.status === "error"
                                    ? "destructive"
                                    : "outline"
                              }
                            >
                              {integration.status}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground mb-2">
                            Type: {integration.type.charAt(0).toUpperCase() + integration.type.slice(1)}
                          </p>

                          {integration.status === "error" && integration.error && (
                            <p className="text-sm text-red-500 mb-2">{integration.error}</p>
                          )}

                          <div className="flex justify-end">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/agents/${integration.agentId}/integrations`}>
                                {integration.status === "error" ? "Fix" : "Manage"}
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}

                      <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center">
                        <Link2 className="h-8 w-8 text-muted-foreground mb-2" />
                        <h3 className="font-medium mb-1">Add Integration</h3>
                        <p className="text-sm text-muted-foreground mb-4">Connect your agents to external services</p>
                        <Button asChild>
                          <Link href="/dashboard/integrations/new">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            New Integration
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="rounded-full bg-muted p-4 mb-4">
                      <Link2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No Integrations Yet</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Connect your AI agents to external services to enhance their capabilities.
                    </p>
                    <Button asChild>
                      <Link href="/dashboard/integrations/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Integration
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {isPremium && (
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>View usage statistics and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-muted p-4 mb-4">
                    <BarChart2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Analytics Coming Soon</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    We're working on building comprehensive analytics for your AI agents.
                  </p>
                  <Button asChild>
                    <Link href="/dashboard/analytics">
                      <BarChart2 className="mr-2 h-4 w-4" />
                      View Preview
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Settings className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">Account Settings</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Configure your account settings, notification preferences, and more.
                </p>
                <Button asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Manage Settings
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
