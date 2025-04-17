"use client"

import { useState } from "react"
import { Check, ExternalLink, Database, Code, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import type { Agent } from "@/lib/types"
import { Switch } from "@/components/ui/switch"

interface IntegrationsPanelProps {
  agent?: Agent
  className?: string
}

export function IntegrationsPanel({ agent, className }: IntegrationsPanelProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("api")
  const [isConnecting, setIsConnecting] = useState(false)
  const [activeIntegrations, setActiveIntegrations] = useState<string[]>([])
  const [integrationEnabled, setIntegrationEnabled] = useState(true) // New state

  const handleConnect = (integrationType: string) => {
    setIsConnecting(true)

    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false)
      if (!activeIntegrations.includes(integrationType)) {
        setActiveIntegrations([...activeIntegrations, integrationType])
      }

      toast({
        title: "Integration successful",
        description: `You've successfully connected the ${integrationType} integration.`,
      })
    }, 1500)
  }

  const integrationTypes = [
    {
      id: "api",
      name: "API Integration",
      description: "Connect via REST API endpoints",
      icon: <Code className="h-5 w-5 text-primary" />,
      fields: [
        { name: "api_key", label: "API Key", type: "password" },
        { name: "endpoint", label: "Endpoint URL", type: "text" },
      ],
    },
    {
      id: "webhook",
      name: "Webhooks",
      description: "Receive event notifications via webhooks",
      icon: <ExternalLink className="h-5 w-5 text-blue-500" />,
      fields: [
        { name: "webhook_url", label: "Webhook URL", type: "text" },
        { name: "secret_key", label: "Secret Key", type: "password" },
      ],
    },
    {
      id: "database",
      name: "Database",
      description: "Connect to your database",
      icon: <Database className="h-5 w-5 text-green-500" />,
      fields: [
        { name: "connection_string", label: "Connection String", type: "password" },
        { name: "database_name", label: "Database Name", type: "text" },
      ],
    },
    {
      id: "cloud",
      name: "Cloud Provider",
      description: "Integrate with cloud services",
      icon: <Cloud className="h-5 w-5 text-purple-500" />,
      fields: [
        { name: "cloud_key", label: "API Key/Token", type: "password" },
        { name: "region", label: "Region", type: "text" },
        { name: "service", label: "Service", type: "select", options: ["AWS", "Google Cloud", "Azure", "Other"] },
      ],
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>
              Connect {agent ? agent.name : "your AI agents"} to external tools and services
            </CardDescription>
          </div>
          <Switch id="integration-enabled" checked={integrationEnabled} onCheckedChange={setIntegrationEnabled} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <Tabs defaultValue="api" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            {integrationTypes.map((type) => (
              <TabsTrigger key={type.id} value={type.id} className="flex flex-col py-2 h-auto gap-1">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mx-auto">
                  {type.icon}
                </div>
                <span className="text-xs">{type.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {integrationTypes.map((type) => (
            <TabsContent key={type.id} value={type.id} className="space-y-4 mt-2">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="w-full md:w-2/3 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">{type.icon}</div>
                    <div>
                      <h3 className="font-medium text-lg">{type.name}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </div>

                  {activeIntegrations.includes(type.id) ? (
                    <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900 p-4">
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                        <Check className="h-5 w-5" />
                        <span className="font-medium">Connected Successfully</span>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                        This integration is active and working properly.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {type.fields.map((field) => (
                        <div key={field.name} className="space-y-1">
                          <Label htmlFor={field.name}>{field.label}</Label>
                          {field.type === "select" ? (
                            <Select>
                              <SelectTrigger id={field.name}>
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options?.map((option) => (
                                  <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, "-")}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : field.type === "textarea" ? (
                            <Textarea id={field.name} placeholder={`Enter ${field.label.toLowerCase()}`} />
                          ) : (
                            <Input
                              id={field.name}
                              type={field.type}
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                            />
                          )}
                        </div>
                      ))}
                      <Button className="mt-2" onClick={() => handleConnect(type.id)} disabled={isConnecting}>
                        {isConnecting ? "Connecting..." : "Connect"}
                      </Button>
                    </div>
                  )}
                </div>

                <div className="w-full md:w-1/3 bg-muted/30 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Requirements</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>API key with appropriate permissions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>Correctly formatted endpoint URLs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>Network access to the external service</span>
                    </li>
                  </ul>

                  <h4 className="font-medium mt-4 mb-2">Documentation</h4>
                  <div className="text-sm">
                    <a href="#" className="text-primary hover:underline flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      View integration guide
                    </a>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">
          {activeIntegrations.length > 0 ? (
            <span>
              {activeIntegrations.length} integration{activeIntegrations.length > 1 ? "s" : ""} active
            </span>
          ) : (
            <span>No active integrations</span>
          )}
        </div>

        <div className="flex gap-2">
          {activeIntegrations.map((integration) => {
            const integrationType = integrationTypes.find((t) => t.id === integration)
            return (
              <Badge key={integration} variant="outline" className="bg-muted">
                {integrationType?.icon && <span className="mr-1">{integrationType.icon}</span>}
                {integrationType?.name || integration}
              </Badge>
            )
          })}
        </div>
      </CardFooter>
    </Card>
  )
}
