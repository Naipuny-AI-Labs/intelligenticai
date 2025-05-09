"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Bot,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Code,
  FileText,
  BookOpen,
  MessageSquare,
  Star,
  Clock,
  Users,
  Play,
  ExternalLink,
  Server,
  Database,
  Globe,
  Laptop,
  Monitor,
  Loader2,
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getAgent, getRelatedAgents } from "@/lib/agent-service"
import { GlowingButton } from "@/components/ui/glowing-button"
import type { Agent } from "@/lib/types"

interface AgentPageProps {
  params: {
    slug: string
  }
}

// Helper function to get icon component by name
const getIconByName = (iconName: string, className = "h-5 w-5 text-primary") => {
  const icons: Record<string, React.ReactNode> = {
    Zap: <Zap className={className} />,
    Shield: <Shield className={className} />,
    Code: <Code className={className} />,
    FileText: <FileText className={className} />,
    Users: <Users className={className} />,
    Clock: <Clock className={className} />,
    Server: <Server className={className} />,
    Database: <Database className={className} />,
    Globe: <Globe className={className} />,
    Laptop: <Laptop className={className} />,
    Monitor: <Monitor className={className} />,
  }

  return icons[iconName] || <Bot className={className} />
}

export default function AgentPage({ params }: AgentPageProps) {
  const { slug } = params

  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [agent, setAgent] = useState<Agent | null>(null)
  const [relatedAgents, setRelatedAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)

    const fetchAgentData = async () => {
      try {
        setLoading(true)
        const agentData = await getAgent(slug)

        if (!agentData) {
          setError("Agent not found")
          setLoading(false)
          return
        }

        setAgent(agentData)

        // Fetch related agents
        const related = await getRelatedAgents(agentData.category, agentData.id)
        setRelatedAgents(related)

        setLoading(false)
      } catch (err) {
        console.error("Error fetching agent data:", err)
        setError("Failed to load agent data. Please try again later.")
        setLoading(false)
      }
    }

    fetchAgentData()
  }, [slug])

  if (!mounted) {
    return null
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-xl font-medium">Loading agent details...</h2>
        </div>
      </div>
    )
  }

  if (error || !agent) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/10 dark:border-red-800/30">
          <h2 className="text-xl font-medium text-red-700 dark:text-red-400 mb-2">{error || "Agent not found"}</h2>
          <p className="text-red-600 dark:text-red-300 mb-4">
            We couldn't find the agent you're looking for. It may have been removed or the URL might be incorrect.
          </p>
          <Button asChild>
            <Link href="/agents">Browse All Agents</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleTryAgent = () => {
    // Redirect to onboarding flow with the agent slug
    router.push(`/onboarding/${agent.slug}`)
  }

  // Use the agent's useCases if available, otherwise generate from capabilities
  const useCases = agent.useCases || [
    {
      title: `${agent.capabilities[0]}`,
      description: `Leverage ${agent.name} to efficiently handle ${agent.capabilities[0].toLowerCase()} tasks with precision and speed.`,
      icon: "Zap",
    },
    {
      title: `${agent.capabilities[1] || "Advanced Processing"}`,
      description: `Utilize powerful algorithms to ${(agent.capabilities[1] || "").toLowerCase()} with minimal human intervention.`,
      icon: "Shield",
    },
    {
      title: `${agent.capabilities[2] || "Seamless Integration"}`,
      description: `Easily integrate ${agent.name} with your existing workflows and systems.`,
      icon: "Code",
    },
  ]

  // Generate technical specs from agent data
  const technicalSpecs = agent.technicalSpecs || {
    responseTime: "Average 0.5-2 seconds",
    concurrentUsers: "Unlimited",
    security: "End-to-end encryption",
    apiAccess: "REST API with documentation",
  }

  // Generate documentation items
  const documentationItems = agent.documentation || {
    gettingStarted: {
      title: "Getting Started Guide",
      description: `Learn how to set up and start using ${agent.name} in your projects.`,
      url: "#",
    },
    apiReference: {
      title: "API Reference",
      description: "Detailed API documentation for developers.",
      url: "#",
    },
    tutorials: {
      title: "Tutorials",
      description: "Step-by-step tutorials for common use cases.",
      url: "#",
    },
  }

  // Generate examples from capabilities if not provided
  const examples =
    agent.examples ||
    ([
      {
        title: `Example 1: ${agent.capabilities[0]}`,
        description: `This example demonstrates how ${agent.name} can ${agent.capabilities[0].toLowerCase()} efficiently.`,
        userQuery: `Can you help me with ${agent.capabilities[0].toLowerCase()}?`,
        agentResponse: `I'd be happy to help with ${agent.capabilities[0].toLowerCase()}. Let me walk you through the process...`,
      },
      agent.capabilities[1] && {
        title: `Example 2: ${agent.capabilities[1]}`,
        description: `This example shows how ${agent.name} handles ${agent.capabilities[1].toLowerCase()}.`,
        userQuery: `I need assistance with ${agent.capabilities[1].toLowerCase()}.`,
        agentResponse: `I can definitely help with ${agent.capabilities[1].toLowerCase()}. Here's what we need to do...`,
      },
    ].filter(Boolean) as any[])

  // Generate testimonials if not provided
  const testimonials = agent.testimonials || [
    {
      quote: `${agent.name} has completely transformed how we handle ${agent.category.toLowerCase()} tasks. It's intuitive, accurate, and saves us hours every week.`,
      author: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      rating: 5,
    },
    {
      quote: `I was skeptical at first, but ${agent.name} exceeded my expectations. The capabilities around ${agent.capabilities[0].toLowerCase()} are particularly impressive.`,
      author: "Michael Chen",
      role: "Senior Developer",
      company: "InnovateTech",
      rating: 4,
    },
  ]

  // Get rating and review count from metadata or fallback to agent properties
  const rating = agent.metadata?.rating  || 4.8
  const reviewCount = agent.metadata?.reviewCount || 42

  // Get price from pricing or fallback to agent price
  const price = agent.pricing?.amount  || 49.99
  const currency = agent.pricing?.currency || "USD"
  const interval = agent.pricing?.interval || "month"

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative py-12 border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent -z-10" />
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Badge variant="outline" className="mb-2 bg-transparent">
                {agent.category}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight">{agent.name}</h1>
              <p className="text-xl text-foreground/90">{agent.shortDescription || agent.description}</p>

              <div className="flex flex-wrap gap-3">
                {agent.capabilities.slice(0, 4).map((capability, index) => (
                  <Badge key={index} variant="outline" className="bg-transparent">
                    <CheckCircle className="mr-1 h-3 w-3 text-primary" />
                    {capability}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <GlowingButton onClick={handleTryAgent} className="group">
                  Try This Agent
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </GlowingButton>
                <Button variant="outline" asChild className="bg-transparent">
                  <Link href="#features">Explore Features</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50 shadow-sm bg-transparent backdrop-blur-sm p-1"
            >
              {agent.media?.banner ? (
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src={agent.media.banner || "/placeholder.svg"}
                    alt={agent.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent mix-blend-overlay" />
                </div>
              ) : (
                <div className="aspect-video relative rounded-lg overflow-hidden bg-transparent flex items-center justify-center border border-gray-200/30 dark:border-gray-800/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                  <div className="relative z-10 text-center p-8">
                    <div className="h-20 w-20 rounded-full bg-transparent border border-primary/30 flex items-center justify-center mx-auto mb-4">
                      <Bot className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
                    <p className="text-foreground/90 max-w-md mx-auto">
                      Powerful AI assistant specialized in {agent.category.toLowerCase()}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16" id="features">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-12">
              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {useCases.map((useCase, index) => (
                    <Card
                      key={index}
                      className="border border-gray-200/50 dark:border-gray-800/50 hover:border-primary/50 transition-colors bg-transparent backdrop-blur-sm"
                    >
                      <CardHeader>
                        <div className="bg-transparent w-10 h-10 rounded-full flex items-center justify-center mb-3 border border-primary/30">
                          {getIconByName(useCase.icon)}
                        </div>
                        <CardTitle className="text-lg">{useCase.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-foreground/80">{useCase.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>

              {/* Detailed Information Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-4 w-full bg-transparent border border-gray-200/50 dark:border-gray-800/50 rounded-lg overflow-hidden">
                    <TabsTrigger
                      value="overview"
                      className="text-foreground font-medium data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="capabilities"
                      className="text-foreground font-medium data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                    >
                      Capabilities
                    </TabsTrigger>
                    <TabsTrigger
                      value="documentation"
                      className="text-foreground font-medium data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                    >
                      Documentation
                    </TabsTrigger>
                    <TabsTrigger
                      value="examples"
                      className="text-foreground font-medium data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                    >
                      Examples
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6 space-y-6">
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h3 className="text-xl font-semibold mb-4 text-foreground">About {agent.name}</h3>
                      <p className="text-foreground/90">{agent.description}</p>

                      <h4 className="text-lg font-semibold mt-6 mb-3 text-foreground">Benefits</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/90">
                            Increased productivity and efficiency in {agent.category.toLowerCase()} tasks
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/90">Reduced manual effort and human error</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/90">24/7 availability for consistent support</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/90">Seamless integration with existing workflows</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-transparent rounded-lg p-6 border border-gray-200/50 dark:border-gray-800/50 mt-8">
                      <h4 className="text-lg font-semibold mb-4 text-foreground">Technical Specifications</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(technicalSpecs).map(([key, value], index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-transparent border border-primary/30 flex items-center justify-center flex-shrink-0">
                              {key === "responseTime" ? (
                                <Clock className="h-5 w-5 text-primary" />
                              ) : key === "concurrentUsers" ? (
                                <Users className="h-5 w-5 text-primary" />
                              ) : key === "security" ? (
                                <Shield className="h-5 w-5 text-primary" />
                              ) : key === "apiAccess" ? (
                                <Code className="h-5 w-5 text-primary" />
                              ) : key === "techStackSupport" ? (
                                <Server className="h-5 w-5 text-primary" />
                              ) : key === "workflowAutomation" ? (
                                <Zap className="h-5 w-5 text-primary" />
                              ) : key === "documentationFormat" ? (
                                <FileText className="h-5 w-5 text-primary" />
                              ) : key === "iterativeFeedback" ? (
                                <MessageSquare className="h-5 w-5 text-primary" />
                              ) : (
                                <Bot className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <div>
                              <h5 className="font-medium text-foreground">
                                {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                              </h5>
                              <p className="text-sm text-foreground/80">{value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Requirements Section (if available) */}
                    {agent.requirements && (
                      <div className="bg-transparent rounded-lg p-6 border border-gray-200/50 dark:border-gray-800/50 mt-8">
                        <h4 className="text-lg font-semibold mb-4 text-foreground">Requirements</h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-transparent border border-primary/30 flex items-center justify-center flex-shrink-0">
                              <Code className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h5 className="font-medium text-foreground">Supported Data Formats</h5>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {agent.requirements.dataFormats.map((format, i) => (
                                  <Badge key={i} variant="outline" className="bg-transparent">
                                    {format}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-transparent border border-primary/30 flex items-center justify-center flex-shrink-0">
                              <Database className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h5 className="font-medium text-foreground">Data Size</h5>
                              <p className="text-sm text-foreground/80">
                                Min: {agent.requirements.minDataSize} / Max: {agent.requirements.maxDataSize}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-transparent border border-primary/30 flex items-center justify-center flex-shrink-0">
                              <Monitor className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h5 className="font-medium text-foreground">Supported Platforms</h5>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {agent.requirements.supportedPlatforms.map((platform, i) => (
                                  <Badge key={i} variant="outline" className="bg-transparent">
                                    {platform}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Integration Section (if available) */}
                    {agent.integration && (
                      <div className="bg-transparent rounded-lg p-6 border border-gray-200/50 dark:border-gray-800/50 mt-8">
                        <h4 className="text-lg font-semibold mb-4 text-foreground">Integration</h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-transparent border border-primary/30 flex items-center justify-center flex-shrink-0">
                              <Globe className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h5 className="font-medium text-foreground">API Endpoint</h5>
                              <p className="text-sm font-mono bg-transparent border border-gray-200/30 dark:border-gray-800/30 rounded p-2 mt-1">
                                {agent.integration.apiEndpoint}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-transparent border border-primary/30 flex items-center justify-center flex-shrink-0">
                              <Code className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h5 className="font-medium text-foreground">SDK Support</h5>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {agent.integration.sdkSupport.map((sdk, i) => (
                                  <Badge key={i} variant="outline" className="bg-transparent">
                                    {sdk}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                              <div className="h-10 w-10 rounded-full bg-transparent border border-primary/30 flex items-center justify-center flex-shrink-0">
                                <MessageSquare className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h5 className="font-medium text-foreground">Webhooks</h5>
                                <p className="text-sm text-foreground/80">
                                  {agent.integration.webhooks ? "Supported" : "Not supported"}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <div className="h-10 w-10 rounded-full bg-transparent border border-primary/30 flex items-center justify-center flex-shrink-0">
                                <Shield className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h5 className="font-medium text-foreground">OAuth</h5>
                                <p className="text-sm text-foreground/80">
                                  {agent.integration.oauth ? "Supported" : "Not supported"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="capabilities" className="mt-6">
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h3 className="text-xl font-semibold mb-4 text-foreground">What {agent.name} Can Do</h3>
                      <p className="text-foreground/90 mb-6">
                        {agent.name} is equipped with a wide range of capabilities to assist with various{" "}
                        {agent.category.toLowerCase()} tasks.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {agent.capabilities.map((capability, index) => (
                          <Card
                            key={index}
                            className="border border-gray-200/50 dark:border-gray-800/50 bg-transparent"
                          >
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base flex items-center text-foreground">
                                <div className="h-6 w-6 rounded-full bg-transparent border border-primary/30 flex items-center justify-center mr-2">
                                  <CheckCircle className="h-3 w-3 text-primary" />
                                </div>
                                {capability}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-foreground/80">
                                {agent.name} can {capability.toLowerCase()} with high accuracy and efficiency, saving
                                you time and effort.
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="documentation" className="mt-6">
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h3 className="text-xl font-semibold mb-4 text-foreground">Documentation</h3>
                      <p className="text-foreground/90 mb-6">
                        Comprehensive documentation to help you get the most out of {agent.name}.
                      </p>

                      <div className="space-y-6">
                        {Object.entries(documentationItems).map(([key, item]: [string, any], index) => (
                          <div
                            key={index}
                            className="bg-transparent rounded-lg p-6 border border-gray-200/50 dark:border-gray-800/50"
                          >
                            <div className="flex items-start gap-3">
                              <div className="h-10 w-10 rounded-full bg-transparent border border-primary/30 flex items-center justify-center flex-shrink-0">
                                {key === "gettingStarted" ? (
                                  <FileText className="h-5 w-5 text-primary" />
                                ) : key === "apiReference" ? (
                                  <Code className="h-5 w-5 text-primary" />
                                ) : key === "tutorials" ? (
                                  <BookOpen className="h-5 w-5 text-primary" />
                                ) : (
                                  <MessageSquare className="h-5 w-5 text-primary" />
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium text-foreground">{item.title}</h4>
                                <p className="text-sm text-foreground/80 mb-2">{item.description}</p>
                                <Button variant="outline" className="p-0 h-auto text-primary bg-transparent" asChild>
                                  <Link href={item.url}>
                                    View {item.title}
                                    <ExternalLink className="ml-1 h-3 w-3" />
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="examples" className="mt-6">
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h3 className="text-xl font-semibold mb-4 text-foreground">Example Use Cases</h3>
                      <p className="text-foreground/90 mb-6">
                        See how {agent.name} can be used in real-world scenarios.
                      </p>

                      <div className="space-y-6">
                        {examples.map((example, index) => (
                          <div
                            key={index}
                            className="bg-transparent rounded-lg p-6 border border-gray-200/50 dark:border-gray-800/50"
                          >
                            <h4 className="font-medium mb-2 text-foreground">{example.title}</h4>
                            <p className="text-sm text-foreground/80 mb-4">{example.description}</p>
                            <div className="bg-transparent p-4 rounded-md text-sm font-mono border border-gray-200/50 dark:border-gray-800/50">
                              <p className="text-foreground">User: "{example.userQuery}"</p>
                              <p className="text-primary mt-2">
                                {agent.name}: "{example.agentResponse}"
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>

              {/* Media Section (if available) */}
              {agent.media?.screenshots && agent.media.screenshots.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="mt-12"
                >
                  <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {agent.media.screenshots.map((screenshot, index) => (
                      <div
                        key={index}
                        className="border border-gray-200/50 dark:border-gray-800/50 rounded-lg overflow-hidden bg-transparent"
                      >
                        <div className="aspect-video relative">
                          <Image
                            src={screenshot.url || "/placeholder.svg"}
                            alt={screenshot.alt}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {screenshot.caption && (
                          <div className="p-4 text-sm text-foreground/80">{screenshot.caption}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Video Section (if available) */}
              {agent.media?.video && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="mt-12"
                >
                  <h2 className="text-2xl font-bold mb-6">Demo Video</h2>
                  <div className="border border-gray-200/50 dark:border-gray-800/50 rounded-lg overflow-hidden bg-transparent">
                    <div className="aspect-video relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {agent.media.video.url.includes('youtube.com') || agent.media.video.url.includes('youtu.be') ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${agent.media.video.url.split('v=')[1]?.split('&')[0]}`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <>
                            <video
                              src={agent.media.video.url}
                              poster={agent.media.video.thumbnail || "/placeholder.svg"}
                              className="object-cover w-full h-full"
                              controls
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <Button
                                variant="outline"
                                className="rounded-full h-16 w-16 bg-transparent border-2 border-white hover:bg-white/20"
                              >
                                <Play className="h-8 w-8 text-white" />
                                <span className="sr-only">Play video</span>
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div className="text-sm text-foreground/80">{agent.name} Demo</div>
                      <div className="text-sm text-foreground/80">
                        {Math.floor(agent.media.video.duration / 60)}:
                        {(agent.media.video.duration % 60).toString().padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Testimonials */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6">What Users Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="border border-gray-200/50 dark:border-gray-800/50 bg-transparent">
                      <CardContent className="pt-6">
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm italic mb-4 text-foreground/90">"{testimonial.quote}"</p>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-transparent border border-primary/30 flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">{testimonial.author.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{testimonial.author}</p>
                            <p className="text-xs text-foreground/80">
                              {testimonial.role}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Try Agent Card */}
                <Card className="border border-gray-200/50 dark:border-gray-800/50 shadow-sm bg-transparent">
                  <CardHeader>
                    <CardTitle className="text-foreground">Get Started with {agent.name}</CardTitle>
                    <CardDescription className="text-foreground/80">
                      Try this agent in your projects today.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground/80">Category</span>
                        <Badge variant="outline" className="font-medium text-foreground bg-transparent">
                          {agent.category}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground/80">Rating</span>
                        <span className="font-medium flex items-center text-foreground">
                          {rating}
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 ml-1" />
                          <span className="text-xs text-foreground/60 ml-1">({reviewCount})</span>
                        </span>
                      </div>
                      <Separator className="my-2 bg-gray-200/50 dark:bg-gray-800/50" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground/80">Price</span>
                        <span className="font-medium text-foreground">
                          ${price}/{interval}
                        </span>
                      </div>
                    </div>

                    {agent.pricing?.features && (
                      <div className="space-y-2 pt-2">
                        <h4 className="text-sm font-medium">Includes:</h4>
                        <ul className="space-y-1">
                          {agent.pricing.features.map((feature, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-foreground/80">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="space-y-3 pt-2">
                      <GlowingButton onClick={handleTryAgent} className="w-full">
                        Try This Agent
                      </GlowingButton>
                    </div>
                  </CardContent>
                </Card>

                {/* Documentation Links */}
                <Card className="border border-gray-200/50 dark:border-gray-800/50 bg-transparent">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Link
                      href="#"
                      className="flex items-center gap-2 p-2 rounded-md border border-gray-200/30 dark:border-gray-800/30 hover:border-primary/50 transition-colors"
                    >
                      <div className="h-8 w-8 rounded-full bg-transparent border border-primary/30 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">Documentation</span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-2 p-2 rounded-md border border-gray-200/30 dark:border-gray-800/30 hover:border-primary/50 transition-colors"
                    >
                      <div className="h-8 w-8 rounded-full bg-transparent border border-primary/30 flex items-center justify-center">
                        <Code className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">API Reference</span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-2 p-2 rounded-md border border-gray-200/30 dark:border-gray-800/30 hover:border-primary/50 transition-colors"
                    >
                      <div className="h-8 w-8 rounded-full bg-transparent border border-primary/30 flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">Tutorials</span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-2 p-2 rounded-md border border-gray-200/30 dark:border-gray-800/30 hover:border-primary/50 transition-colors"
                    >
                      <div className="h-8 w-8 rounded-full bg-transparent border border-primary/30 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">Community Forum</span>
                    </Link>
                  </CardContent>
                </Card>

                {/* Related Agents */}
                {relatedAgents.length > 0 && (
                  <Card className="border border-gray-200/50 dark:border-gray-800/50 bg-transparent">
                    <CardHeader>
                      <CardTitle className="text-lg text-foreground">Related Agents</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {relatedAgents.map((relatedAgent) => (
                        <Link
                          key={relatedAgent.id}
                          href={`/agents/${relatedAgent.slug}`}
                          className="flex items-start gap-3 group p-2 rounded-md border border-gray-200/30 dark:border-gray-800/30 hover:border-primary/50 transition-colors"
                        >
                          <div className="h-8 w-8 rounded-full bg-transparent border border-primary/30 flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium group-hover:text-primary transition-colors text-foreground">
                              {relatedAgent.name}
                            </p>
                            <p className="text-xs text-foreground/80 line-clamp-2">{relatedAgent.description}</p>
                          </div>
                        </Link>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-transparent border-t border-gray-200/50 dark:border-gray-800/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Ready to Get Started?</h2>
            <p className="text-lg text-foreground/90">
              Try {agent.name} today and transform your {agent.category.toLowerCase()} workflows.
            </p>
            <GlowingButton onClick={handleTryAgent} className="group">
              Try This Agent
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </GlowingButton>
          </div>
        </div>
      </section>
    </main>
  )
}
