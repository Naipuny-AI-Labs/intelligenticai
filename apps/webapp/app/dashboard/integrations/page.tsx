"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bot, Link2, Database, ExternalLink, Plus, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IntegrationsPanel } from "@/components/integrations-panel"
import { useAppSelector } from "@/lib/redux/hooks"

export default function IntegrationsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("tools")
  const { subscription } = useAppSelector((state) => state.workspace)
  const { approvedAgents } = useAppSelector((state) => state.agents)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Link2 className="h-8 w-8 animate-pulse text-primary" />
      </div>
    )
  }

  // Sample connected integrations for the demo
  const connectedIntegrations = [
    {
      id: "slack",
      name: "Slack",
      type: "Messaging",
      agents: 2,
      status: "Active",
      icon: <ExternalLink className="h-5 w-5 text-blue-500" />,
    },
    {
      id: "github",
      name: "GitHub",
      type: "Development",
      agents: 1,
      status: "Active",
      icon: <Code className="h-5 w-5 text-purple-500" />,
    },
    {
      id: "mongodb",
      name: "MongoDB",
      type: "Database",
      agents: 3,
      status: "Active",
      icon: <Database className="h-5 w-5 text-green-500" />,
    },
  ]

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6 p-6 pt-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
            <p className="text-muted-foreground">Connect your AI agents to external tools and services</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/integrations/new">
              <Plus className="mr-2 h-4 w-4" />
              New Integration
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="tools" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="tools" className="data-[state=active]:bg-background">
              Connected Tools
            </TabsTrigger>
            <TabsTrigger value="agents" className="data-[state=active]:bg-background">
              Agent Integrations
            </TabsTrigger>
            <TabsTrigger value="new" className="data-[state=active]:bg-background">
              Add Integrations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {connectedIntegrations.map((integration) => (
                <Card key={integration.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <Badge className="bg-green-600 hover:bg-green-700">{integration.type}</Badge>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        {integration.status}
                      </Badge>
                    </div>
                    <CardTitle className="flex items-center gap-2 mt-2">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        {integration.icon}
                      </div>
                      {integration.name}
                    </CardTitle>
                    <CardDescription>
                      Connected to {integration.agents} agent{integration.agents !== 1 ? "s" : ""}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {approvedAgents.slice(0, integration.agents).map((agent) => (
                        <Badge key={agent.id} variant="secondary" className="text-xs">
                          {agent.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/integrations/${integration.id}`}>Settings</Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      Reconnect
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              <Card className="overflow-hidden border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-full py-12">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-center mb-2">Connect New Tool</CardTitle>
                  <CardDescription className="text-center mb-4">
                    Add a new integration to connect with your agents
                  </CardDescription>
                  <Button asChild>
                    <Link href="/dashboard/integrations/new">Add Integration</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {approvedAgents.map((agent) => (
                <Card key={agent.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <Badge>{agent.category}</Badge>
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {Math.floor(Math.random() * 3) + 1} integrations
                      </Badge>
                    </div>
                    <CardTitle className="flex items-center gap-2 mt-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      {agent.name}
                    </CardTitle>
                    <CardDescription>{agent.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {connectedIntegrations.slice(0, Math.floor(Math.random() * 3) + 1).map((integration) => (
                        <div
                          key={integration.id}
                          className="flex items-center gap-1 text-xs text-muted-foreground border rounded-full px-2 py-0.5"
                        >
                          {integration.icon}
                          <span>{integration.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/agents/${agent.id}/integrations`}>Manage</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/agents/chat/${agent.id}`}>
                        <Bot className="mr-2 h-4 w-4" />
                        Chat
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <IntegrationsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
