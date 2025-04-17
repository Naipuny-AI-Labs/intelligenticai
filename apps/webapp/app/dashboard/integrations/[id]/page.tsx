"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Bot, Settings, Trash2, Code, ExternalLink, Database, Server, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { useAppSelector } from "@/lib/redux/hooks"

export default function IntegrationDetailsPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("settings")
  const { approvedAgents } = useAppSelector((state) => state.agents)

  // Sample integration data
  const [integration, setIntegration] = useState<any>({
    id: params.id,
    name: params.id.charAt(0).toUpperCase() + params.id.slice(1),
    type: params.id === "slack" ? "Messaging" : params.id === "github" ? "Development" : "Database",
    status: "Active",
    lastSync: "2 hours ago",
    agentIds: approvedAgents.slice(0, 2).map((a) => a.id),
    apiKey: "••••••••••••••••",
    endpoint: "https://api.example.com/v1",
    options: {
      autoSync: true,
      notifications: true,
      dataSharing: false,
    },
  })

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  const getIntegrationIcon = () => {
    switch (params.id) {
      case "slack":
        return <ExternalLink className="h-6 w-6 text-blue-500" />
      case "github":
        return <Code className="h-6 w-6 text-purple-500" />
      case "mongodb":
        return <Database className="h-6 w-6 text-green-500" />
      default:
        return <Server className="h-6 w-6 text-primary" />
    }
  }

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your integration settings have been updated.",
    })
  }

  const handleReconnect = () => {
    toast({
      title: "Reconnection successful",
      description: "The integration has been reconnected successfully.",
    })
  }

  const handleToggle = (option: string, checked: boolean) => {
    setIntegration((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        [option]: checked,
      },
    }))
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        <p className="text-muted-foreground mt-4">Loading integration...</p>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6">
        <Link
          href="/dashboard/integrations"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to integrations
        </Link>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              {getIntegrationIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">{integration.name}</h1>
                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                  {integration.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge>{integration.type}</Badge>
                <span className="text-sm text-muted-foreground">Last sync: {integration.lastSync}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={handleReconnect}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reconnect
            </Button>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </div>
        </div>

        <Tabs defaultValue="settings" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="settings" className="data-[state=active]:bg-background">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="agents" className="data-[state=active]:bg-background">
              <Bot className="h-4 w-4 mr-2" />
              Connected Agents
            </TabsTrigger>
            <TabsTrigger value="logs" className="data-[state=active]:bg-background">
              <Code className="h-4 w-4 mr-2" />
              Activity Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Integration Settings</CardTitle>
                <CardDescription>Configure your {integration.name} integration settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="apiKey">API Key</Label>
                  <div className="flex gap-2">
                    <Input id="apiKey" value={integration.apiKey} readOnly className="font-mono" />
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="endpoint">Endpoint URL</Label>
                  <Input id="endpoint" value={integration.endpoint} className="font-mono" />
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <h3 className="font-medium">Options</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoSync">Automatic Synchronization</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically sync data between the integration and your agents
                      </p>
                    </div>
                    <Switch
                      id="autoSync"
                      checked={integration.options.autoSync}
                      onCheckedChange={(checked) => handleToggle("autoSync", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about integration activities
                      </p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={integration.options.notifications}
                      onCheckedChange={(checked) => handleToggle("notifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dataSharing">Data Sharing</Label>
                      <p className="text-sm text-muted-foreground">
                        Share anonymized data to improve integration quality
                      </p>
                    </div>
                    <Switch
                      id="dataSharing"
                      checked={integration.options.dataSharing}
                      onCheckedChange={(checked) => handleToggle("dataSharing", checked)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-4">
                <Button onClick={handleSaveSettings}>Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connected Agents</CardTitle>
                <CardDescription>Manage the agents connected to this integration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvedAgents.slice(0, 3).map((agent, index) => (
                    <div
                      key={agent.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${index < 2 ? "bg-muted/50" : "border border-dashed"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bot className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{agent.name}</div>
                          <div className="text-xs text-muted-foreground">{agent.category}</div>
                        </div>
                      </div>

                      {index < 2 ? (
                        <Button variant="outline" size="sm">
                          Disconnect
                        </Button>
                      ) : (
                        <Button size="sm">Connect</Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Logs</CardTitle>
                <CardDescription>View recent activities for this integration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="text-sm border-b pb-2 last:border-0">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">
                          {i === 0
                            ? "Connection established"
                            : i === 1
                              ? "Data sync completed"
                              : i === 2
                                ? "Agent connected"
                                : i === 3
                                  ? "Settings updated"
                                  : "API key regenerated"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {i === 0
                            ? "10 minutes ago"
                            : i === 1
                              ? "1 hour ago"
                              : i === 2
                                ? "3 hours ago"
                                : i === 3
                                  ? "Yesterday"
                                  : "3 days ago"}
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        {i === 0
                          ? "Successfully established connection to the integration."
                          : i === 1
                            ? "Synchronized data between the platform and the integration."
                            : i === 2
                              ? `Connected the "${approvedAgents[0]?.name}" agent to this integration.`
                              : i === 3
                                ? "Updated integration settings."
                                : "Regenerated API key for security purposes."}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <Button variant="outline">View All Logs</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
