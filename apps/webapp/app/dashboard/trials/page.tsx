"use client"

import { CardFooter } from "@/components/ui/card"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Bot, AlertCircle, PlusCircle, Zap, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAgentById, getAgents } from "@/lib/agents"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import type { Agent } from "@/lib/types"
import { ChatButton } from "@/components/chat-button"

export default function TrialsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [trialAgent, setTrialAgent] = useState<Agent | null>(null)
  const [messagesUsed, setMessagesUsed] = useState(0)
  const [messageLimitReached, setMessageLimitReached] = useState(false)
  const messageLimit = 5

  useEffect(() => {
    // Get trial agent
    const storedTrialAgentId = localStorage.getItem("trialAgentId")
    if (storedTrialAgentId) {
      const agent = getAgentById(storedTrialAgentId)
      if (agent) {
        setTrialAgent(agent)
      } else {
        // Fallback to first agent if stored ID not found
        const allAgents = getAgents()
        if (allAgents.length > 0) {
          setTrialAgent(allAgents[0])
          localStorage.setItem("trialAgentId", allAgents[0].id)
        }
      }
    } else {
      // No trial agent set, use the first one
      const allAgents = getAgents()
      if (allAgents.length > 0) {
        setTrialAgent(allAgents[0])
        localStorage.setItem("trialAgentId", allAgents[0].id)
      }
    }

    // Get message count
    if (storedTrialAgentId) {
      const storedMessageCount = localStorage.getItem(`messageCount_${storedTrialAgentId}`)
      if (storedMessageCount) {
        const count = Number.parseInt(storedMessageCount, 10)
        setMessagesUsed(count)
        setMessageLimitReached(count >= messageLimit)
      }
    }

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Trial</h1>
          <p className="text-muted-foreground">Manage your trial agent and usage.</p>
        </div>

        <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertTitle className="text-amber-800 dark:text-amber-300">Trial Account</AlertTitle>
          <AlertDescription className="text-amber-700 dark:text-amber-400">
            Your trial includes access to one AI agent with a limit of 5 messages.
            <Button variant="link" className="text-amber-800 dark:text-amber-300 p-0 h-auto" asChild>
              <Link href="/dashboard/request"> Request More Agents</Link>
            </Button>{" "}
            for unlimited access to all agents.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            {trialAgent && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Your Trial Agent</CardTitle>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                      Trial
                    </Badge>
                  </div>
                  <CardDescription>You have access to this AI agent during your trial period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3 flex justify-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-foreground flex items-center justify-center">
                        <Bot className="h-16 w-16 text-white" />
                      </div>
                    </div>
                    <div className="w-full md:w-2/3">
                      <h2 className="text-2xl font-bold mb-2">{trialAgent.name}</h2>
                      <p className="text-muted-foreground mb-4">{trialAgent.description}</p>

                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2">Capabilities</h3>
                        <div className="flex flex-wrap gap-2">
                          {trialAgent.capabilities.map((capability, index) => (
                            <Badge key={index} variant="secondary">
                              {capability}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2">Message Usage</h3>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">
                            {messagesUsed} / {messageLimit} messages used
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {Math.round((messagesUsed / messageLimit) * 100)}%
                          </span>
                        </div>
                        <Progress value={(messagesUsed / messageLimit) * 100} className="h-2" />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        {messageLimitReached ? (
                          <>
                            <Button variant="destructive" className="sm:flex-1" asChild>
                              <Link href="/dashboard/request">
                                <AlertCircle className="mr-2 h-4 w-4" />
                                Message Limit Reached
                              </Link>
                            </Button>
                            <Button variant="outline" className="sm:flex-1" asChild>
                              <Link href="/dashboard/request">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Request More Agents
                              </Link>
                            </Button>
                          </>
                        ) : (
                          <>
                            <ChatButton agent={trialAgent} className="sm:flex-1" />
                            <Button variant="outline" className="sm:flex-1" asChild>
                              <Link href={`/dashboard/agents/chat/${trialAgent.id}`}>
                                <Bot className="mr-2 h-4 w-4" />
                                Open Full Chat
                              </Link>
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trial Details</CardTitle>
              <CardDescription>Information about your trial</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Agent</span>
                  <span className="font-medium">{trialAgent?.name || "AI Agent"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Messages Used</span>
                  <span className="font-medium">
                    {messagesUsed} / {messageLimit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Full Access</span>
                  <span className="font-medium">Contact for pricing</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/dashboard/request">
                  <Bot className="mr-2 h-4 w-4" />
                  Request More Agents
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="border-primary/10 bg-gradient-to-r from-primary/5 to-background">
          <CardHeader>
            <CardTitle>Request More Agents</CardTitle>
            <CardDescription>Get access to additional AI agents for your specific needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">All Agents</h3>
                  <p className="text-sm text-muted-foreground">Access our full library of specialized AI agents</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Unlimited Messages</h3>
                  <p className="text-sm text-muted-foreground">No restrictions on the number of messages</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Priority Support</h3>
                  <p className="text-sm text-muted-foreground">Get faster responses from our support team</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full" asChild>
              <Link href="/dashboard/request">
                <Bot className="mr-2 h-4 w-4" />
                Request More Agents
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Locked Agents</CardTitle>
            <CardDescription>Request access to these agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getAgents()
                .slice(0, 4)
                .filter((agent) => agent.id !== trialAgent?.id)
                .map((agent, index) => (
                  <div key={agent.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <Bot className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-muted-foreground">{agent.name}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">{agent.description}</p>
                      <Badge variant="outline" className="mt-2 text-xs opacity-70">
                        Locked
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/dashboard/request">
                <Bot className="mr-2 h-4 w-4" />
                Request More Agents
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
