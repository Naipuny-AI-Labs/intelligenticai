"use client"

import Link from "next/link"
import { Bot, Star, Crown, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Agent } from "@/lib/types"
import { useState, useEffect } from "react"

interface DashboardAgentCardProps {
  agent: Agent
  variant?: "default" | "compact"
}

export function DashboardAgentCard({ agent, variant = "default" }: DashboardAgentCardProps) {
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    // Check if user has premium subscription
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          const subscription = userData.subscription || "trial"
          setIsPremium(subscription === "pro" || subscription === "enterprise")
        } catch (e) {
          console.error("Failed to parse user data", e)
        }
      }
    }
  }, [])

  if (variant === "compact") {
    return (
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge className="bg-primary text-primary-foreground">{agent.category}</Badge>
            <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
              <CheckCircle className="mr-1 h-3 w-3" />
              Approved
            </Badge>
          </div>
          <CardTitle className="text-2xl mt-4">{agent.name}</CardTitle>
          <CardDescription className="text-base">{agent.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2 mt-2">
            {agent.capabilities.map((capability, index) => (
              <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                {capability}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t p-4 flex flex-col gap-3">
          <Button className="w-full" asChild>
            <Link href={`/dashboard/agents/${agent.id}`}>View Agent</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge className="mb-2">{agent.category}</Badge>
          {isPremium && (
            <Badge variant="outline" className="bg-primary/10 text-primary">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl">{agent.name}</CardTitle>
        <CardDescription className="line-clamp-2">{agent.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-1 mt-2">
          {agent.capabilities.slice(0, 3).map((capability, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {capability}
            </Badge>
          ))}
          {agent.capabilities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{agent.capabilities.length - 3} more
            </Badge>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">4.8</span>
            <span className="text-xs text-muted-foreground">(120)</span>
          </div>
          {agent.analytics && (
            <div className="text-xs text-muted-foreground">
              {agent.analytics.totalMessages.toLocaleString()} messages
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/10 p-4">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/dashboard/agents/${agent.id}`}>
            <Bot className="mr-2 h-4 w-4" />
            View Agent
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
