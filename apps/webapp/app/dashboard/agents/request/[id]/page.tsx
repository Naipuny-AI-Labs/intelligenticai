"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { getAgentById, formatPrice } from "@/lib/agents"
import type { Agent } from "@/lib/types"

export default function RequestAgentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [agent, setAgent] = useState<Agent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    useCase: "",
    expectedVolume: "",
    additionalInfo: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const agentData = getAgentById(params.id)
    if (agentData) {
      setAgent(agentData)
    }
    setIsLoading(false)
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)

      // Redirect after showing success message
      setTimeout(() => {
        router.push("/dashboard")
      }, 3000)
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!agent) {
    return (
      <div className="container max-w-4xl py-10">
        <Card>
          <CardHeader>
            <CardTitle>Agent Not Found</CardTitle>
            <CardDescription>The agent you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link href="/dashboard/agents">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Agents
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (showSuccess) {
    return (
      <div className="container max-w-4xl py-10">
        <Card className="border-green-200 bg-green-50 dark:bg-green-900/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-500" />
              <CardTitle>Request Submitted Successfully</CardTitle>
            </div>
            <CardDescription>Your request for {agent.name} has been submitted and is pending approval.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We'll review your request and get back to you shortly. You can check the status of your request in the
              dashboard.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/agents">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Agents
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-2 border-border/40 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge>{agent.category}</Badge>
              {agent.enterprisePricing && (
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  Enterprise
                </Badge>
              )}
            </div>
            <CardTitle>{agent.name}</CardTitle>
            <CardDescription>{agent.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Capabilities</h3>
              <div className="flex flex-wrap gap-1">
                {agent.capabilities.map((capability, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {capability}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Pricing</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Base price</span>
                <span className="font-medium">${formatPrice(agent.price)}/month</span>
              </div>
              {agent.enterprisePricing && (
                <p className="text-xs text-muted-foreground mt-1">
                  Custom enterprise pricing available based on usage and requirements.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 border-border/40 shadow-sm">
          <CardHeader>
            <CardTitle>Request Access</CardTitle>
            <CardDescription>Tell us about your use case to request access to this agent.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="Enter your company name"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="useCase">Use Case</Label>
                <Textarea
                  id="useCase"
                  name="useCase"
                  placeholder="Describe how you plan to use this agent"
                  value={formData.useCase}
                  onChange={handleChange}
                  required
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedVolume">Expected Volume</Label>
                <Input
                  id="expectedVolume"
                  name="expectedVolume"
                  placeholder="e.g., 500 requests per month"
                  value={formData.expectedVolume}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  placeholder="Any other details you'd like to share"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="min-h-[80px]"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
