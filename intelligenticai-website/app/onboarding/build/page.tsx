"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Bot, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import type { Agent, OnboardingFormData } from "@/lib/types"
import apiClient from "@/lib/api-client"
import { getAllAgents } from "@/lib/agents"
import { RadioGroupItem } from "@/components/ui/radio-group"

export default function BuildAgentOnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoadingAgents, setIsLoadingAgents] = useState(true)

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
    requestType: "build", // Set requestType to "build" for this form
    agentids: [""], // Will be populated when user selects an agent
  })

  // Fetch agents from the marketplace
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        // This would typically be an API call to fetch agents
        const response = await getAllAgents()
        console.log(response)
        setAgents(response || []);
      } catch (error) {
        console.error("Error fetching agents:", error);
        // Provide some fallback agents if the API fails
        setAgents([])
      } finally {
        setIsLoadingAgents(false)
      }
    }

    fetchAgents()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleAgentSelection = (agentId: string) => {
    setFormData((prev) => ({ ...prev, agentids: [agentId], usecase: agentId }))
  }

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.companyname || !formData.industry) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields before proceeding.",
          variant: "destructive",
        })
        return
      }
    } else if (currentStep === 2) {
      if (!formData.name || !formData.email) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields before proceeding.",
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
    } else if (currentStep === 3) {
      if (!formData.agentids[0]) {
        toast({
          title: "Missing agent selection",
          description: "Please select a base agent to customize.",
          variant: "destructive",
        })
        return
      }
    }

    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = async () => {
    // Validate form
    if (!formData.requirements) {
      toast({
        title: "Missing information",
        description: "Please provide details about your custom agent requirements.",
        variant: "destructive",
      })
      return
    }

    if (!formData.dataprivacy) {
      toast({
        title: "Data privacy agreement required",
        description: "You must agree to our data privacy policy to proceed.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Submit the form data in the same format as the try agent form
      const response = await apiClient.post("/onboarduser", formData)

      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Request submitted successfully!",
          description: "We'll start building your custom agent right away.",
        })
        router.push("/build-agent/success")
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
            href="/"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              <span>Custom Agent Builder</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight">Build Your Custom AI Agent</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete the form below to request a custom AI agent tailored to your specific needs and use cases.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Onboarding Form */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Card className="border-2 border-gray-200 dark:border-gray-800 dark:bg-black/50 bg-transparent rounded-xl shadow-md">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center justify-center space-x-2 mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-3 w-3 rounded-full border ${
                      currentStep >= step
                        ? "bg-primary border-primary"
                        : "bg-gray-100 border-gray-300 dark:bg-gray-600 dark:border-gray-500"
                    }`}
                  />
                ))}
              </div>

              {currentStep === 1 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-4">Step 1: Company Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="companyname"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyname"
                        name="companyname"
                        value={formData.companyname}
                        onChange={handleChange}
                        className="w-full bg-background border-2 border-gray-200 dark:border-gray-700 dark:bg-black/50 rounded-lg px-4 py-2 text-foreground"
                        placeholder="Enter company name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="industry"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Industry <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full bg-background border-2 border-gray-200 dark:border-gray-700 dark:bg-black/50 rounded-lg px-4 py-2 text-foreground"
                        required
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
                    <div>
                      <label
                        htmlFor="companysize"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Company Size
                      </label>
                      <select
                        id="companysize"
                        name="companysize"
                        value={formData.companysize}
                        onChange={handleChange}
                        className="w-full bg-background border-2 border-gray-200 dark:border-gray-700 dark:bg-black/50 rounded-lg px-4 py-2 text-foreground"
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
              )}

              {currentStep === 2 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-4">Step 2: Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-background border-2 border-gray-200 dark:border-gray-700 dark:bg-black/50 rounded-lg px-4 py-2 text-foreground"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-background border-2 border-gray-200 dark:border-gray-700 dark:bg-black/50 rounded-lg px-4 py-2 text-foreground"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="designation"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Job Title
                      </label>
                      <input
                        type="text"
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="w-full bg-background border-2 border-gray-200 dark:border-gray-700 dark:bg-black/50 rounded-lg px-4 py-2 text-foreground"
                        placeholder="Enter your job title"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-background border-2 border-gray-200 dark:border-gray-700 dark:bg-black/50 rounded-lg px-4 py-2 text-foreground"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-4">Step 3: Select Base Agent</h2>
                  {isLoadingAgents ? (
                    <div className="flex justify-center items-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="ml-2">Loading agents...</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {agents.map((agent) => (
                        <div key={agent.id} className="relative">
                          <label
                            htmlFor={`agent-${agent.slug}`}
                            className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              formData.agentids[0] === agent.id
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-black/30 dark:hover:border-gray-600"
                            }`}
                          >
                            <RadioGroupItem
                              value={agent.slug}
                              id={`agent-${agent.slug}`}
                              checked={formData.agentids[0] === agent.slug}
                              onClick={() => handleAgentSelection(agent.slug)}
                              className="absolute opacity-0 w-0 h-0"
                            />
                            <h3 className="text-lg font-semibold mb-2">{agent.slug}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{agent.description}</p>
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {currentStep === 4 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-4">Step 4: Agent Requirements</h2>
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="requirements"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Agent Requirements <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="requirements"
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        rows={6}
                        className="w-full bg-background border-2 border-gray-200 dark:border-gray-700 dark:bg-black/50 rounded-lg px-4 py-2 text-foreground"
                        placeholder="Describe what you want your agent to do, any specific features, integrations, or capabilities you need."
                        required
                      ></textarea>
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
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    className="border-2 border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 text-white border-0"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 text-white border-0"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-10">Why Build a Custom Agent?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Tailored to Your Needs",
                description:
                  "Get an AI agent specifically designed for your unique business requirements and workflows.",
                icon: <Bot className="h-5 w-5 text-primary" />,
              },
              {
                title: "Seamless Integration",
                description: "Custom agents integrate smoothly with your existing systems and data sources.",
                icon: <Sparkles className="h-5 w-5 text-primary" />,
              },
              {
                title: "Ongoing Support",
                description: "Receive dedicated support and continuous improvements to your custom agent.",
                icon: <Bot className="h-5 w-5 text-primary" />,
              },
            ].map((feature, index) => (
              <Card key={index} className="border-primary/10 bg-transparent">
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
