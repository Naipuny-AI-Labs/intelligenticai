"use client"

import { useEffect, useState } from "react"
import { notFound, useRouter } from "next/navigation"
import Link from "next/link"
import { Bot, ArrowRight, CheckCircle, Zap, Shield, Code } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAgentBySlug, getRelatedAgents } from "@/lib/agents"
import { AgentAnalytics } from "@/components/agent-analytics"

interface AgentPageProps {
  params: {
    slug: string
  }
}

export default function AgentPage({ params }: AgentPageProps) {
  const { slug } = params

  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const agent = getAgentBySlug(slug)
  const relatedAgents = agent ? getRelatedAgents(agent.category, agent.id) : []

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!agent) {
    notFound()
  }

  if (!mounted) {
    return null
  }

  const handleRequestAccess = () => {
    // Store the agent info in localStorage to use in the onboarding flow
    localStorage.setItem(
      "requestedAgent",
      JSON.stringify({
        id: agent.id,
        name: agent.name,
        slug: agent.slug,
      }),
    )

    // Redirect to onboarding flow
    router.push("/try-agent")
  }

  // Sample use cases based on agent capabilities
  const useCases = [
    {
      title: `${agent.capabilities[0]}`,
      description: `Leverage ${agent.name} to efficiently handle ${agent.capabilities[0].toLowerCase()} tasks with precision and speed.`,
      icon: <Zap className="h-5 w-5 text-primary" />,
    },
    {
      title: `${agent.capabilities[1] || "Advanced Processing"}`,
      description: `Utilize powerful algorithms to ${(agent.capabilities[1] || "").toLowerCase()} with minimal human intervention.`,
      icon: <Shield className="h-5 w-5 text-primary" />,
    },
    {
      title: `${agent.capabilities[2] || "Seamless Integration"}`,
      description: `Easily integrate ${agent.name} with your existing workflows and systems.`,
      icon: <Code className="h-5 w-5 text-primary" />,
    },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative py-12 border-b">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent -z-10" />
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Badge className="mb-2">{agent.category}</Badge>
              <h1 className="text-4xl font-bold tracking-tight">{agent.name}</h1>
              <p className="text-xl text-muted-foreground">{agent.description}</p>

              <div className="flex flex-wrap gap-3">
                {agent.capabilities.slice(0, 4).map((capability, index) => (
                  <Badge key={index} variant="outline" className="bg-background">
                    <CheckCircle className="mr-1 h-3 w-3 text-primary" />
                    {capability}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" onClick={handleRequestAccess} className="group">
                  Request Access
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#features">Explore Features</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden border shadow-xl bg-card/50 backdrop-blur-sm p-1"
            >
              <div className="aspect-video relative rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <div className="relative z-10 text-center p-8">
                  <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Bot className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Powerful AI assistant specialized in {agent.category.toLowerCase()}
                  </p>
                </div>
              </div>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {useCases.map((useCase, index) => (
                    <Card key={index} className="border-primary/10 hover:border-primary/30 transition-colors">
                      <CardHeader>
                        <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                          {useCase.icon}
                        </div>
                        <CardTitle className="text-lg">{useCase.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{useCase.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>

              {/* Analytics */}
              {agent.analytics && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold mb-6">Analytics</h2>
                  <AgentAnalytics agent={agent} />
                </motion.div>
              )}

              {/* Detailed Information Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
                    <TabsTrigger value="documentation">Documentation</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6 space-y-6">
                    <div className="prose max-w-none">
                      <h3 className="text-xl font-semibold mb-4">About {agent.name}</h3>
                      <p>
                        {agent.name} is a specialized AI assistant designed to help with {agent.category.toLowerCase()}{" "}
                        tasks. It can understand complex queries and provide accurate, helpful responses.
                      </p>
                      <p>
                        Whether you're looking for assistance with {agent.capabilities[0].toLowerCase()} or need help
                        with {agent.capabilities[1] ? agent.capabilities[1].toLowerCase() : "other tasks"}, {agent.name}{" "}
                        is equipped with the knowledge and tools to support you.
                      </p>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Benefits</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span>Increased productivity and efficiency in {agent.category.toLowerCase()} tasks</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span>Reduced manual effort and human error</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span>Improved decision-making with data-driven insights</span>
                        </li>
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="capabilities" className="mt-6 space-y-6">
                    <div className="prose max-w-none">
                      <h3 className="text-xl font-semibold mb-4">Key Capabilities</h3>
                      <ul className="space-y-2">
                        {agent.capabilities.map((capability, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                            <span>{capability}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="documentation" className="mt-6 space-y-6">
                    <div className="prose max-w-none">
                      <h3 className="text-xl font-semibold mb-4">Documentation</h3>
                      <p>
                        Comprehensive documentation is available to help you understand how to use {agent.name}{" "}
                        effectively. Please refer to the following resources:
                      </p>
                      <ul className="list-disc pl-5">
                        <li>
                          <Link href="#" className="text-primary hover:underline">
                            API Reference
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-primary hover:underline">
                            User Guides
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-primary hover:underline">
                            FAQ
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="examples" className="mt-6 space-y-6">
                    <div className="prose max-w-none">
                      <h3 className="text-xl font-semibold mb-4">Example Use Cases</h3>
                      <p>Here are a few examples of how you can use {agent.name} to solve real-world problems:</p>
                      <ul className="list-decimal pl-5">
                        <li>
                          {agent.capabilities[0] && (
                            <span>
                              Use {agent.name} to {agent.capabilities[0].toLowerCase()} for improved efficiency.
                            </span>
                          )}
                        </li>
                        <li>
                          {agent.capabilities[1] && (
                            <span>
                              Leverage {agent.name}'s ability to {agent.capabilities[1].toLowerCase()} for better
                              results.
                            </span>
                          )}
                        </li>
                        <li>
                          <span>
                            Explore the various integrations available to connect {agent.name} with your existing tools.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Access Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Access</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Enterprise Plan</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Contact for details</span>
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleRequestAccess}>
                    Request Access
                  </Button>
                </CardContent>
              </Card>

              {/* Related Agents */}
              {relatedAgents.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Related Agents</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedAgents.map((relatedAgent) => (
                      <div key={relatedAgent.id} className="flex items-center justify-between">
                        <Link href={`/agents/${relatedAgent.slug}`} className="text-sm font-medium hover:underline">
                          {relatedAgent.name}
                        </Link>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
