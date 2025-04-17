"use client"

import { CardFooter } from "@/components/ui/card"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Check,
  ExternalLink,
  Database,
  Code,
  Cloud,
  AlertCircle,
  Loader2,
  RefreshCw,
  Trash2,
  Settings,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { agentService } from "@/lib/agent-service"
import type { Agent, AgentIntegration, IntegrationType, IntegrationConfig } from "@/lib/types"
import { useAppSelector } from "@/lib/redux/hooks"
import { cn } from "@/lib/utils"

interface EnhancedIntegrationsPanelProps {
  agent?: Agent
  className?: string
  onIntegrationAdded?: (integration: AgentIntegration) => void
  onIntegrationRemoved?: (integrationId: string) => void
  onIntegrationUpdated?: (integration: AgentIntegration) => void
}

export function EnhancedIntegrationsPanel({
  agent,
  className,
  onIntegrationAdded,
  onIntegrationRemoved,
  onIntegrationUpdated,
}: EnhancedIntegrationsPanelProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<IntegrationType>("database")
  const [isLoading, setIsLoading] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const [integrations, setIntegrations] = useState<AgentIntegration[]>([])
  const [integrationEnabled, setIntegrationEnabled] = useState(true)
  const [selectedIntegration, setSelectedIntegration] = useState<AgentIntegration | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Get user subscription from Redux store
  const { subscription } = useAppSelector((state) => state.workspace)
  const isPremium = subscription === "pro" || subscription === "enterprise"

  // Fetch integrations when agent changes
  useEffect(() => {
    if (agent?.id) {
      fetchIntegrations()
    }
  }, [agent?.id])

  // Fetch integrations
  const fetchIntegrations = useCallback(async () => {
    if (!agent?.id) return

    setIsLoading(true)
    try {
      const data = await agentService.getAgentIntegrations(agent.id)
      setIntegrations(data)
    } catch (error) {
      console.error("Error fetching integrations:", error)
      toast({
        title: "Error fetching integrations",
        description: "Failed to load integrations. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [agent?.id, toast])

  // Handle form input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))

      // Clear error for this field if it exists
      if (formErrors[name]) {
        setFormErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
    },
    [formErrors],
  )

  // Handle select change
  const handleSelectChange = useCallback(
    (name: string, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }))

      // Clear error for this field if it exists
      if (formErrors[name]) {
        setFormErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
    },
    [formErrors],
  )

  // Validate form
  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {}
    const requiredFields = getRequiredFieldsForIntegrationType(activeTab)

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        errors[field] = "This field is required"
      }
    })

    // Validate URL fields
    const urlFields = ["endpoint", "webhook_url", "api_url"]
    urlFields.forEach((field) => {
      if (formData[field] && !isValidUrl(formData[field])) {
        errors[field] = "Please enter a valid URL"
      }
    })

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }, [activeTab, formData])

  // Check if URL is valid
  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  // Get required fields for integration type
  const getRequiredFieldsForIntegrationType = (type: IntegrationType): string[] => {
    switch (type) {
      case "database":
        return ["connection_string", "database_name"]
      case "api":
        return ["api_key", "endpoint"]
      case "webhook":
        return ["webhook_url", "secret_key"]
      case "cloud_storage":
        return ["access_key", "secret_key", "bucket_name"]
      case "messaging":
        return ["api_key", "channel_id"]
      case "crm":
        return ["api_key", "instance_url"]
      case "custom":
        return ["name", "config_json"]
      default:
        return []
    }
  }

  // Test integration connection
  const testIntegration = useCallback(async () => {
    if (!agent?.id || !validateForm()) return

    setIsTesting(true)
    try {
      const config: IntegrationConfig = {
        type: activeTab,
        name: formData.name || `${activeTab} Integration`,
        credentials: { ...formData },
        settings: {},
      }

      const result = await agentService.testIntegration(type, config)

      if (result.success) {
        toast({
          title: "Connection successful",
          description: "The integration connection was tested successfully.",
        })
      } else {
        toast({
          title: "Connection failed",
          description: result.message || "Failed to connect to the integration. Please check your credentials.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error testing integration:", error)
      toast({
        title: "Error testing integration",
        description: "An unexpected error occurred while testing the integration.",
        variant: "destructive",
      })
    } finally {
      setIsTesting(false)
    }
  }, [agent?.id, activeTab, formData, toast, validateForm])

  // Add integration
  const addIntegration = useCallback(async () => {
    if (!agent?.id || !validateForm()) return

    setIsAdding(true)
    try {
      const config: IntegrationConfig = {
        type: activeTab,
        name: formData.name || `${activeTab} Integration`,
        credentials: { ...formData },
        settings: {},
      }

      const success = await agentService.addIntegration(agent.id, type, name, config)

      if (success) {
        toast({
          title: "Integration added",
          description: "The integration was added successfully.",
        })

        // Refresh integrations
        await fetchIntegrations()

        // Reset form
        setFormData({})

        // Notify parent
        if (onIntegrationAdded) {
          const newIntegration = integrations.find((i) => i.type === activeTab) || {
            id: `temp-${Date.now()}`,
            agentId: agent.id,
            type: activeTab,
            name: config.name,
            config,
            status: "active",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
          onIntegrationAdded(newIntegration)
        }
      } else {
        toast({
          title: "Failed to add integration",
          description: "There was an error adding the integration. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error adding integration:", error)
      toast({
        title: "Error adding integration",
        description: "An unexpected error occurred while adding the integration.",
        variant: "destructive",
      })
    } finally {
      setIsAdding(false)
    }
  }, [agent?.id, activeTab, formData, toast, validateForm, fetchIntegrations, onIntegrationAdded, integrations])

  // Remove integration
  const removeIntegration = useCallback(
    async (integrationId: string) => {
      if (!agent?.id) return

      setIsRemoving(true)
      try {
        const success = await agentService.deleteIntegration(integrationId, agent.id)

        if (success) {
          toast({
            title: "Integration removed",
            description: "The integration was removed successfully.",
          })

          // Refresh integrations
          await fetchIntegrations()

          // Notify parent
          if (onIntegrationRemoved) {
            onIntegrationRemoved(integrationId)
          }
        } else {
          toast({
            title: "Failed to remove integration",
            description: "There was an error removing the integration. Please try again.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error removing integration:", error)
        toast({
          title: "Error removing integration",
          description: "An unexpected error occurred while removing the integration.",
          variant: "destructive",
        })
      } finally {
        setIsRemoving(false)
      }
    },
    [agent?.id, toast, fetchIntegrations, onIntegrationRemoved],
  )

  // Integration types with icons and descriptions
  const integrationTypes = [
    {
      id: "database" as IntegrationType,
      name: "Database",
      description: "Connect to your database",
      icon: <Database className="h-5 w-5 text-green-500" />,
      fields: [
        { name: "connection_string", label: "Connection String", type: "password" },
        { name: "database_name", label: "Database Name", type: "text" },
        { name: "username", label: "Username (Optional)", type: "text" },
        { name: "password", label: "Password (Optional)", type: "password" },
      ],
    },
    {
      id: "api" as IntegrationType,
      name: "API Integration",
      description: "Connect via REST API endpoints",
      icon: <Code className="h-5 w-5 text-primary" />,
      fields: [
        { name: "api_key", label: "API Key", type: "password" },
        { name: "endpoint", label: "Endpoint URL", type: "text" },
        {
          name: "auth_type",
          label: "Authentication Type",
          type: "select",
          options: ["Bearer Token", "API Key", "Basic Auth", "None"],
        },
      ],
    },
    {
      id: "webhook" as IntegrationType,
      name: "Webhooks",
      description: "Receive event notifications via webhooks",
      icon: <ExternalLink className="h-5 w-5 text-blue-500" />,
      fields: [
        { name: "webhook_url", label: "Webhook URL", type: "text" },
        { name: "secret_key", label: "Secret Key", type: "password" },
        {
          name: "events",
          label: "Events to Subscribe",
          type: "text",
          placeholder: "e.g., message.created,user.updated",
        },
      ],
    },
    {
      id: "cloud_storage" as IntegrationType,
      name: "Cloud Storage",
      description: "Connect to cloud storage services",
      icon: <Cloud className="h-5 w-5 text-purple-500" />,
      fields: [
        {
          name: "provider",
          label: "Provider",
          type: "select",
          options: ["AWS S3", "Google Cloud Storage", "Azure Blob Storage"],
        },
        { name: "access_key", label: "Access Key", type: "password" },
        { name: "secret_key", label: "Secret Key", type: "password" },
        { name: "bucket_name", label: "Bucket Name", type: "text" },
        { name: "region", label: "Region", type: "text" },
      ],
    },
    {
      id: "messaging" as IntegrationType,
      name: "Messaging",
      description: "Connect to messaging platforms",
      icon: <ExternalLink className="h-5 w-5 text-yellow-500" />,
      fields: [
        {
          name: "platform",
          label: "Platform",
          type: "select",
          options: ["Slack", "Discord", "Microsoft Teams", "Telegram"],
        },
        { name: "api_key", label: "API Key/Token", type: "password" },
        { name: "channel_id", label: "Channel ID", type: "text" },
      ],
    },
    {
      id: "crm" as IntegrationType,
      name: "CRM",
      description: "Connect to CRM systems",
      icon: <Database className="h-5 w-5 text-orange-500" />,
      fields: [
        { name: "platform", label: "Platform", type: "select", options: ["Salesforce", "HubSpot", "Zoho", "Other"] },
        { name: "api_key", label: "API Key", type: "password" },
        { name: "instance_url", label: "Instance URL", type: "text" },
      ],
    },
    {
      id: "custom" as IntegrationType,
      name: "Custom",
      description: "Create a custom integration",
      icon: <Settings className="h-5 w-5 text-gray-500" />,
      fields: [
        { name: "name", label: "Integration Name", type: "text" },
        { name: "config_json", label: "Configuration JSON", type: "textarea" },
      ],
    },
  ]

  // Get current integration type
  const currentIntegrationType = integrationTypes.find((type) => type.id === activeTab)

  // Check if integration exists for current type
  const hasIntegrationForType = integrations.some((integration) => integration.type === activeTab)

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
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Switch
                    id="integration-enabled"
                    checked={integrationEnabled}
                    onCheckedChange={setIntegrationEnabled}
                    disabled={!isPremium}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  {integrationEnabled ? "Disable all integrations" : "Enable integrations"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {!isPremium && (
          <Alert className="mb-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertTitle className="text-amber-800 dark:text-amber-300">Premium Feature</AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-400">
              Integrations are only available on the Pro and Enterprise plans.
            </AlertDescription>
          </Alert>
        )}
        {!integrationEnabled && (
          <Alert className="mb-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertTitle className="text-amber-800 dark:text-amber-300">Integrations Disabled</AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-400">
              All integrations are currently disabled. Enable them to allow the agent to connect to external services.
            </AlertDescription>
          </Alert>
        )}

        <Tabs
          defaultValue="database"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as IntegrationType)}
        >
          <TabsList className={cn("grid grid-cols-4 mb-4", !isPremium && "opacity-50 pointer-events-none")}>
            {integrationTypes.slice(0, 4).map((type) => (
              <TabsTrigger key={type.id} value={type.id} className="flex flex-col py-2 h-auto gap-1">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mx-auto">
                  {type.icon}
                </div>
                <span className="text-xs">{type.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex justify-between mb-4">
            <TabsList>
              {integrationTypes.slice(4).map((type) => (
                <TabsTrigger key={type.id} value={type.id}>
                  {type.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {hasIntegrationForType && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Manage {currentIntegrationType?.name} Integration</DialogTitle>
                    <DialogDescription>
                      Configure your {currentIntegrationType?.name.toLowerCase()} integration settings
                    </DialogDescription>
                  </DialogHeader>

                  {integrations
                    .filter((integration) => integration.type === activeTab)
                    .map((integration) => (
                      <div key={integration.id} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {currentIntegrationType?.icon}
                            <div>
                              <h3 className="font-medium">{integration.name}</h3>
                              <p className="text-xs text-muted-foreground">
                                {integration.status === "active"
                                  ? "Active"
                                  : integration.status === "error"
                                    ? "Error"
                                    : "Inactive"}
                              </p>
                            </div>
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
                            {integration.status === "active"
                              ? "Active"
                              : integration.status === "error"
                                ? "Error"
                                : "Inactive"}
                          </Badge>
                        </div>

                        {integration.status === "error" && integration.error && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{integration.error}</AlertDescription>
                          </Alert>
                        )}

                        <div className="space-y-2">
                          <Label>Last Synced</Label>
                          <div className="text-sm">
                            {integration.lastSynced ? new Date(integration.lastSynced).toLocaleString() : "Never"}
                          </div>
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={() => router.push(`/dashboard/agents/${agent?.id}/integrations/${integration.id}`)}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Configure
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => removeIntegration(integration.id)}
                            disabled={isRemoving}
                          >
                            {isRemoving ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                              <Trash2 className="h-4 w-4 mr-2" />
                            )}
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                </DialogContent>
              </Dialog>
            )}
          </div>

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

                  {hasIntegrationForType ? (
                    <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900 p-4">
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                        <Check className="h-5 w-5" />
                        <span className="font-medium">Connected Successfully</span>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                        This integration is active and working properly.
                      </p>
                      <div className="mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const integration = integrations.find((i) => i.type === type.id)
                            if (integration && agent?.id) {
                              router.push(`/dashboard/agents/${agent.id}/integrations/${integration.id}`)
                            }
                          }}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {type.fields.map((field) => (
                        <div key={field.name} className="space-y-1">
                          <Label htmlFor={field.name}>
                            {field.label}
                            {getRequiredFieldsForIntegrationType(type.id).includes(field.name) && (
                              <span className="text-destructive ml-1">*</span>
                            )}
                          </Label>
                          {field.type === "select" ? (
                            <Select
                              value={formData[field.name] || ""}
                              onValueChange={(value) => handleSelectChange(field.name, value)}
                            >
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
                            <Textarea
                              id={field.name}
                              name={field.name}
                              placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                              value={formData[field.name] || ""}
                              onChange={handleInputChange}
                              className={formErrors[field.name] ? "border-destructive" : ""}
                            />
                          ) : (
                            <Input
                              id={field.name}
                              name={field.name}
                              type={field.type}
                              placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                              value={formData[field.name] || ""}
                              onChange={handleInputChange}
                              className={formErrors[field.name] ? "border-destructive" : ""}
                            />
                          )}
                          {formErrors[field.name] && (
                            <p className="text-xs text-destructive">{formErrors[field.name]}</p>
                          )}
                        </div>
                      ))}
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" onClick={testIntegration} disabled={isTesting || isAdding}>
                          {isTesting ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <RefreshCw className="h-4 w-4 mr-2" />
                          )}
                          Test Connection
                        </Button>
                        <Button onClick={addIntegration} disabled={isTesting || isAdding}>
                          {isAdding ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <Plus className="h-4 w-4 mr-2" />
                          )}
                          Add Integration
                        </Button>
                      </div>
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
                      <span>Valid credentials with appropriate permissions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>Correctly formatted connection details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>Network access to the external service</span>
                    </li>
                  </ul>

                  <h4 className="font-medium mt-4 mb-2">Security</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    All credentials are encrypted and stored securely. Your data is never shared with third parties.
                  </p>

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
          {integrations.length > 0 ? (
            <span>
              {integrations.length} integration{integrations.length > 1 ? "s" : ""} active
            </span>
          ) : (
            <span>No active integrations</span>
          )}
        </div>

        <div className="flex gap-2">
          {integrations.map((integration) => {
            const integrationType = integrationTypes.find((t) => t.id === integration.type)
            return (
              <Badge key={integration.id} variant="outline" className="bg-muted">
                {integrationType?.icon && <span className="mr-1">{integrationType.icon}</span>}
                {integrationType?.name || integration.type}
              </Badge>
            )
          })}
        </div>
      </CardFooter>
    </Card>
  )
}
