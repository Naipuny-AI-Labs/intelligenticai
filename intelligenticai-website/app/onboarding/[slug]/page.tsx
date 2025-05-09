"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Bot, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { getAgentBySlug } from "@/lib/agent-service"
import type { Agent, OnboardingFormData } from "@/lib/types"
import axios from "axios"
import apiClient from "@/lib/api-client"

interface OnboardingPageProps {
  params: {
    slug: string
  }
}

export default function OnboardingPage({ params }: OnboardingPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const requestType = searchParams.get("requestType") || "try"

  const [agent, setAgent] = useState<Agent | null>(null)
  const [formData, setFormData] = useState<Omit<OnboardingFormData, "id" | "status" | "createdDate" | "updatedDate">>({
    usecase: "",
    companysize: "",
    industry: "",
    companyname: "",
    name: "",
    email: "",
    designation: "",
    phone: "",
    requirements: "",
    dataprivacy: false,
    marketingconsent: false,
    requestType: requestType,
    agentids: [],
  })

  useEffect(() => {
    const fetchAgent = async () => {
      const agentData = await getAgentBySlug(params.slug)
      setAgent(agentData)
      if (agentData) {
        setFormData(prev => ({
          ...prev,
          agentids: [agentData.id]
        }))
      }
    }

    fetchAgent()
  }, [params.slug])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate form
    if (!formData.usecase || !formData.companyname || !formData.name || !formData.email || !formData.dataprivacy) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and accept the data privacy policy.",
        variant: "destructive",
      })
      return
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await apiClient.post("/onboarduser",formData)

  

      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Request submitted successfully!",
          description: "We'll be in touch with you shortly.",
        })
        router.push(`/onboarding/${params.slug}/success`)
      } else {
        throw new Error(response.statusText || "Failed to submit form")
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "An error occurred while submitting the form",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!agent) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md border border-gray-200 dark:border-gray-800 bg-transparent">
          <CardHeader>
            <CardTitle>Agent Not Found</CardTitle>
            <CardDescription>The agent you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/marketplace">Browse Agents</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col pt-20">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />
        </div>

        <div className="container">
          <Link
            href={`/agents/${params.slug}`}
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to agent details
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space极客时间-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm text-primary mb-4">
              <Bot className="h-4 w-4" />
              <span>{requestType === "trial" ? "Start Free Trial" : "Try Agent"}</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight">{agent.name}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {requestType === "trial"
                ? "Start your free trial by filling out the form below. Our team will set up your account and provide access instructions."
                : "Fill out the form below to try this agent. Our team will reach out to you with next steps."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Onboarding Form */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-4xl">
          <Card className="border border-gray-200 dark:border-gray-800 bg-transparent">
            <CardContent className="p-6 md:p-8">
              {isSubmitting && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                  <div className="bg-white dark:bg-gray-900 p-8 rounded-lg flex flex-col items-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p className="text-lg">Submitting your request...</p>
                  </div>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Use Case Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="usecase" className="block text-sm font-medium">
                        Use Case <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="usecase"
                        name="usecase"
                        value={formData.usecase}
                        onChange={handleChange}
                        className="w-full bg-background border border-gray-200 dark:border-gray-800 rounded-md px-3 py-2"
                        required
                      >
                        <option value="">Select Use Case</option>
                        <option value="customer-support">Customer Support</option>
                        <option value="sales-automation">Sales Automation</option>
                        <option value="data-analysis">Data Analysis</option>
                        <option value="content-creation">Content Creation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="industry" className="block text-sm font-medium">
                        Industry
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full bg-background border border-gray-200 dark:border-gray-800 rounded-md px-3 py-2"
                      >
                        <option value="">Select Industry</option>
                        <option value="technology">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="retail">Retail</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Company Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="companyname" className="block text-sm font-medium">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyname"
                        name="companyname"
                        value={formData.companyname}
                        onChange={handleChange}
                        className="w-full bg-background border border-gray-200 dark:border-gray-800 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="companysize" className="block text-sm font-medium">
                        Company Size
                      </label>
                      <select
                        id="companysize"
                        name="companysize"
                        value={formData.companysize}
                        onChange={handleChange}
                        className="w-full bg-background border border-gray-200 dark:border-gray-800 rounded-md px-3 py-2"
                      >
                        <option value="">Select Company Size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501-1000">501-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-background border border-gray-200 dark:border-gray-800 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-background border border-gray-200 dark:border-gray-800 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="designation" className="block text-sm font-medium">
                        Job Title
                      </label>
                      <input
                        type="text"
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="w-full bg-background border border-gray-200 dark:border-gray-800 rounded-md px-3 py-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-background border border-gray-200 dark:border-gray-800 rounded-md px-3 py-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Additional Information</h2>
                  <div className="space-y-2">
                    <label htmlFor="requirements" className="block text-sm font-medium">
                      Specific Requirements or Questions
                    </label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-background border border-gray-200 dark:border-gray-800 rounded-md px-3 py-2"
                    ></textarea>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="dataprivacy"
                      checked={formData.dataprivacy || false}
                      onCheckedChange={(checked) => handleCheckboxChange("dataprivacy", checked as boolean)}
                      className="mt-1"
                    />
                    <label htmlFor="dataprivacy" className="text-sm">
                      I agree to the processing of my data as outlined in the{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                      . <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="marketingconsent"
                      checked={formData.marketingconsent || false}
                      onCheckedChange={(checked) => handleCheckboxChange("marketingconsent", checked as boolean)}
                      className="mt-1"
                    />
                    <label htmlFor="marketingconsent" className="text-sm">
                      I would like to receive marketing communications about products and services.
                    </label>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-10">Why Try {agent.name}?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Powerful Capabilities",
                description: "Access advanced AI features designed specifically for your business needs.",
                icon: <Bot className="h-5 w-5 text-primary" />,
              },
              {
                title: "Easy Integration",
                description: "Seamlessly integrate with your existing systems and workflows.",
                icon: <Check className="h-5 w-5 text-primary" />,
              },
              {
                title: "Dedicated Support",
                description: "Get expert assistance to maximize the value of your AI implementation.",
                icon: <Bot className="h-5 w-5 text-primary" />,
              },
            ].map((feature, index) => (
              <Card key={index} className="border border-primary/10 bg-transparent">
                <CardHeader>
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
