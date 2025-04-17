"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Code, Database, Cloud, ExternalLink, Globe, Search, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function NewIntegrationPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const integrations = [
    {
      id: "slack",
      name: "Slack",
      description: "Connect your agents to Slack for messaging and notifications",
      category: "Messaging",
      icon: <ExternalLink className="h-6 w-6 text-blue-500" />,
      popular: true,
    },
    {
      id: "github",
      name: "GitHub",
      description: "Integrate with GitHub for code repositories and issue tracking",
      category: "Development",
      icon: <Code className="h-6 w-6 text-purple-500" />,
      popular: true,
    },
    {
      id: "mongodb",
      name: "MongoDB",
      description: "Connect to MongoDB databases for data storage and retrieval",
      category: "Database",
      icon: <Database className="h-6 w-6 text-green-500" />,
      popular: true,
    },
    {
      id: "aws",
      name: "AWS",
      description: "Integrate with AWS services for cloud computing capabilities",
      category: "Cloud",
      icon: <Cloud className="h-6 w-6 text-orange-500" />,
      popular: false,
    },
    {
      id: "zapier",
      name: "Zapier",
      description: "Connect to thousands of apps via Zapier automations",
      category: "Automation",
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      popular: false,
    },
    {
      id: "salesforce",
      name: "Salesforce",
      description: "Integrate with Salesforce CRM for customer data",
      category: "CRM",
      icon: <Cloud className="h-6 w-6 text-blue-700" />,
      popular: false,
    },
    {
      id: "webhook",
      name: "Webhooks",
      description: "Create custom webhook endpoints for event-driven integrations",
      category: "API",
      icon: <Globe className="h-6 w-6 text-primary" />,
      popular: false,
    },
    {
      id: "api",
      name: "Custom API",
      description: "Set up custom API connections for specialized integrations",
      category: "API",
      icon: <Code className="h-6 w-6 text-primary" />,
      popular: false,
    },
  ]

  const filteredIntegrations = searchQuery
    ? integrations.filter(
        (i) =>
          i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : integrations

  const handleConnect = () => {
    if (!selectedIntegration) return

    setIsConnecting(true)

    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false)

      toast({
        title: "Integration added",
        description: `You've successfully added the ${integrations.find((i) => i.id === selectedIntegration)?.name} integration.`,
      })

      router.push(`/dashboard/integrations/${selectedIntegration}`)
    }, 1500)
  }

  return (
    <div className="container max-w-5xl py-8">
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
          <div>
            <h1 className="text-3xl font-bold">Add New Integration</h1>
            <p className="text-muted-foreground">Connect your AI agents to external tools and services</p>
          </div>
        </div>

        <div className="relative flex-1 mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search integrations..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {selectedIntegration ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">Selected Integration</h2>
              <Button variant="ghost" onClick={() => setSelectedIntegration(null)}>
                Change
              </Button>
            </div>

            {(() => {
              const integration = integrations.find((i) => i.id === selectedIntegration)
              if (!integration) return null

              return (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        {integration.icon}
                      </div>
                      <div>
                        <CardTitle>{integration.name}</CardTitle>
                        <CardDescription>{integration.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center pt-2 pb-4 border-b">
                      <div>
                        <h3 className="font-medium">Connect {integration.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Follow these steps to connect your AI agents with {integration.name}
                        </p>
                      </div>
                      <Badge>{integration.category}</Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium">Get API Credentials</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Obtain your API key or access token from your {integration.name} account
                          </p>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`https://${integration.id}.com`} target="_blank">
                              <ExternalLink className="mr-2 h-3 w-3" />
                              Go to {integration.name}
                            </Link>
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium">Authorize Connection</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Connect {integration.name} to your AI Agents platform account
                          </p>
                          <Button onClick={handleConnect} disabled={isConnecting}>
                            {isConnecting ? (
                              <>Connecting...</>
                            ) : (
                              <>
                                Connect {integration.name}
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-muted text-muted-foreground rounded-full w-6 h-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium">Configure Settings</h4>
                          <p className="text-sm text-muted-foreground">
                            Set up preferences and connect to specific agents
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })()}
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-medium mb-4">Popular Integrations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredIntegrations
                  .filter((i) => i.popular)
                  .map((integration) => (
                    <Card
                      key={integration.id}
                      className="cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => setSelectedIntegration(integration.id)}
                    >
                      <CardHeader className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            {integration.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{integration.name}</CardTitle>
                            <Badge className="mt-1">{integration.category}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-4">All Integrations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredIntegrations
                  .filter((i) => !i.popular)
                  .map((integration) => (
                    <Card
                      key={integration.id}
                      className="cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => setSelectedIntegration(integration.id)}
                    >
                      <CardHeader className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            {integration.icon}
                          </div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-xs text-muted-foreground">{integration.description}</p>
                        <Badge className="mt-2">{integration.category}</Badge>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
