"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, useAnimation, useInView } from "framer-motion"
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Loader2,
  Bot,
  Sparkles,
  Cpu,
  Rocket,
  HardDrive,
  Zap,
  Globe,
  X,
  Info,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getAllAgents } from "@/lib/agents"
import { checkExistingTrial } from "@/lib/auth"
import { apiClient } from "@/lib/api-client"
import type { Agent } from "@/lib/types"

export default function TryAgentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [existingTrialAlert, setExistingTrialAlert] = useState<{ show: boolean; email: string }>({
    show: false,
    email: "",
  })
  const [formData, setFormData] = useState({
    useCase: "",
    industry: "",
    companySize: "",
    companyName: "",
    name: "",
    email: "",
    designation: "",
    phone: "",
    requirements: "",
    dataPrivacy: false,
    marketingConsent: false,
    selectedAgent: null as Agent | null,
  })
  const [availableAgents, setAvailableAgents] = useState<Agent[]>([])

  // Animation controls
  const controls = useAnimation()
  const formRef = useRef(null)
  const isInView = useInView(formRef, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } })
    }
  }, [isInView, controls])

  useEffect(() => {
    // Load all agents
    setAvailableAgents(getAllAgents())
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // If changing email, check for existing trial
    if (name === "email" && value) {
      checkForExistingTrial(value)
    }
  }

  const checkForExistingTrial = (email: string) => {
    // Only check if email looks valid
    if (email.includes("@") && email.includes(".")) {
      const { hasTrial, user } = checkExistingTrial(email)

      if (hasTrial) {
        setExistingTrialAlert({ show: true, email })
      } else {
        setExistingTrialAlert({ show: false, email: "" })
      }
    }
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAgentSelection = (agent: Agent) => {
    setFormData((prev) => {
      // Check if this agent is already selected
      if (prev.selectedAgent?.id === agent.id) {
        // Deselect the agent
        return { ...prev, selectedAgent: null }
      } else {
        // Select the new agent
        return { ...prev, selectedAgent: agent }
      }
    })
  }

  const validateEmail = (email: string) => {
    // Basic company email validation - checks for @ followed by a domain with at least one dot
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return false

    // Check if it's a free email provider (this is a simple check, not comprehensive)
    const freeEmailProviders = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "aol.com",
      "icloud.com",
      "mail.com",
    ]
    const domain = email.split("@")[1].toLowerCase()
    return !freeEmailProviders.includes(domain)
  }

  const handleNext = () => {
    if (step === 1) {
      if (!formData.useCase || !formData.industry || !formData.companySize) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields before proceeding.",
          variant: "destructive",
        })
        return
      }
    }

    if (step === 2) {
      if (!formData.companyName || !formData.name || !formData.email || !formData.designation) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields before proceeding.",
          variant: "destructive",
        })
        return
      }

      if (!validateEmail(formData.email)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid company email address. Personal email providers are not accepted.",
          variant: "destructive",
        })
        return
      }

      // Check for existing trial one more time
      checkForExistingTrial(formData.email)
      if (existingTrialAlert.show) {
        // If there's an existing trial, don't proceed
        toast({
          title: "Existing trial detected",
          description: "You already have an active trial. Please sign in to access your dashboard.",
          variant: "destructive",
        })
        return
      }
    }

    if (step === 3) {
      if (!formData.requirements) {
        toast({
          title: "Missing information",
          description: "Please describe your requirements before proceeding.",
          variant: "destructive",
        })
        return
      }
    }

    if (step === 4) {
      if (!formData.selectedAgent) {
        toast({
          title: "No agent selected",
          description: "Please select an agent for your trial.",
          variant: "destructive",
        })
        return
      }

      if (!formData.dataPrivacy) {
        toast({
          title: "Data privacy agreement required",
          description: "You must agree to our data privacy policy to proceed.",
          variant: "destructive",
        })
        return
      }

      handleSubmit()
      return
    }

    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Format the request object according to the API requirements
      const requestData = {
        usecase: formData.useCase,
        industry: formData.industry,
        companysize: formData.companySize,
        companyname: formData.companyName,
        name: formData.name,
        email: formData.email,
        designation: formData.designation,
        phone: formData.phone || "",
        requirements: formData.requirements,
        dataprivacy: formData.dataPrivacy,
        marketingconsent: formData.marketingConsent,
        // Include the selected agent ID
        selectedAgentId: formData.selectedAgent?.id || "",
      }

      // Make the API call to store onboarding data
      await apiClient.post("/onboarduser", requestData)

      // Store selected agent ID in localStorage for demo purposes
      // In a real app, this would be stored in your database
      if (formData.selectedAgent) {
        localStorage.setItem("trialAgentId", formData.selectedAgent.id)
        localStorage.setItem("userSubscription", "trial")
      }

      // Set user as logged in for demo purposes
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: formData.name,
          email: formData.email,
          subscription: "trial",
        }),
      )

      toast({
        title: "Trial request submitted successfully!",
        description: "Check your email for login credentials to access your trial agent.",
      })

      // Navigate to success page
      router.push("/try-agent/success")
    } catch (error) {
      console.error("Error submitting onboarding data:", error)
      toast({
        title: "Error submitting request",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoToDashboard = () => {
    // For demo purposes, we'll just redirect to the dashboard
    // In a real app, you would authenticate the user first
    router.push("/dashboard")
  }

  // Icons for steps
  const stepIcons = [
    <Cpu key={0} className="h-6 w-6 text-primary" />,
    <HardDrive key={1} className="h-6 w-6 text-primary" />,
    <Zap key={2} className="h-6 w-6 text-primary" />,
    <Bot key={3} className="h-6 w-6 text-primary" />,
  ]

  // Filter agents based on use case if selected
  const filteredAgents = formData.useCase
    ? availableAgents.filter((agent) => {
        const useCase = formData.useCase.replace(/-/g, " ")
        return (
          agent.category.toLowerCase().includes(useCase) ||
          agent.capabilities.some((cap) => cap.toLowerCase().includes(useCase))
        )
      })
    : availableAgents

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background" />

          {/* Animated gradient blobs */}
          <div
            className="absolute top-1/4 right-1/4 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-[8rem] opacity-50"
            style={{
              animation: "pulse 8s infinite",
            }}
          />
          <div
            className="absolute bottom-1/3 left-1/3 w-[25rem] h-[25rem] bg-blue-500/5 rounded-full blur-[6rem] opacity-50"
            style={{
              animation: "pulse 10s infinite 2s",
            }}
          />

          {/* Grid pattern */}
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
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm text-primary mb-4">
              <Bot className="h-4 w-4" />
              <span>Find Your Ideal AI Agent</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight">Try an AI Agent</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tell us about your needs and we'll help you find the perfect AI agent solution
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3D Elements Section */}
      <section className="py-10">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Bot className="h-8 w-8 text-primary" />,
                title: "Intelligent Assistants",
                description: "AI agents that understand context and learn from interactions",
              },
              {
                icon: <Rocket className="h-8 w-8 text-blue-500" />,
                title: "Rapid Deployment",
                description: "Get up and running in minutes, not weeks or months",
              },
              {
                icon: <Globe className="h-8 w-8 text-purple-500" />,
                title: "Seamless Integration",
                description: "Connects with your existing tools and workflows",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="relative group"
                style={{
                  perspective: "1000px",
                }}
              >
                <div
                  className="relative bg-card border border-primary/10 rounded-xl p-6 h-full shadow-md transition-all duration-500 ease-out"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "rotateX(5deg) rotateY(-5deg)",
                    boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div
                    className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: "translateZ(-10px)",
                    }}
                  />

                  <div
                    className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: "translateZ(20px)",
                    }}
                  >
                    {feature.icon}
                  </div>

                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: "translateZ(15px)",
                    }}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="text-muted-foreground"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: "translateZ(10px)",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section ref={formRef} className="py-12 flex-1">
        <motion.div className="container max-w-4xl" initial={{ opacity: 0, y: 50 }} animate={controls}>
          {/* Progress Steps */}
          <div className="mb-10">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      step === i
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                        : step > i
                          ? "bg-primary/80 text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    } transition-all duration-300`}
                  >
                    {step > i ? <Check className="h-6 w-6" /> : stepIcons[i - 1]}
                  </div>
                  <span className={`text-sm mt-2 ${step === i ? "font-medium text-primary" : "text-muted-foreground"}`}>
                    {i === 1 ? "Use Case" : i === 2 ? "Company Info" : i === 3 ? "Requirements" : "Select Agent"}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative max-w-md mx-auto mt-3">
              <div className="absolute top-0 left-[10%] right-[10%] h-1 bg-muted">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${(step - 1) * 33.33}%` }}
                />
              </div>
            </div>
          </div>

          {existingTrialAlert.show && (
            <Alert variant="warning" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Existing Trial Detected</AlertTitle>
              <AlertDescription>
                It looks like you already have an active trial with this email address ({existingTrialAlert.email}).
                <div className="mt-2">
                  <Button variant="outline" size="sm" onClick={handleGoToDashboard}>
                    Go to your dashboard
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <Card className="border-primary/10 shadow-xl">
            <CardHeader>
              <CardTitle>
                {step === 1
                  ? "Tell us about your use case"
                  : step === 2
                    ? "Company information"
                    : step === 3
                      ? "Specific requirements"
                      : "Select an agent for trial"}
              </CardTitle>
              <CardDescription>
                {step === 1
                  ? "Help us understand how you plan to use AI agents"
                  : step === 2
                    ? "Tell us about your company"
                    : step === 3
                      ? "Provide details about your specific needs"
                      : "Choose one agent for your free 14-day trial"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <Label htmlFor="useCase">
                      What's your primary use case for AI agents? <span className="text-destructive">*</span>
                    </Label>
                    <RadioGroup value={formData.useCase} onValueChange={(value) => handleRadioChange("useCase", value)}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {[
                          {
                            value: "customer-service",
                            label: "Customer Service Automation",
                            icon: <Bot className="h-4 w-4" />,
                          },
                          {
                            value: "content-creation",
                            label: "Content Creation & Marketing",
                            icon: <Sparkles className="h-4 w-4" />,
                          },
                          {
                            value: "data-analysis",
                            label: "Data Analysis & Insights",
                            icon: <Cpu className="h-4 w-4" />,
                          },
                          {
                            value: "productivity",
                            label: "Internal Productivity & Automation",
                            icon: <Zap className="h-4 w-4" />,
                          },
                          {
                            value: "development",
                            label: "Software Development Assistance",
                            icon: <Rocket className="h-4 w-4" />,
                          },
                          { value: "other", label: "Other", icon: <Globe className="h-4 w-4" /> },
                        ].map((option) => (
                          <div
                            key={option.value}
                            className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                              formData.useCase === option.value
                                ? "border-primary bg-primary/5"
                                : "border-muted-foreground/20 hover:border-muted-foreground/40"
                            }`}
                            onClick={() => handleRadioChange("useCase", option.value)}
                          >
                            <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  formData.useCase === option.value
                                    ? "bg-primary/20 text-primary"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {option.icon}
                              </div>
                              <Label htmlFor={option.value} className="font-medium cursor-pointer">
                                {option.label}
                              </Label>
                            </div>
                            {formData.useCase === option.value && <Check className="h-4 w-4 text-primary ml-auto" />}
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="industry">
                      Industry <span className="text-destructive">*</span>
                    </Label>
                    <Select value={formData.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Technology",
                          "Finance",
                          "Healthcare",
                          "Education",
                          "Retail",
                          "Manufacturing",
                          "Media & Entertainment",
                          "Professional Services",
                          "Government",
                          "Non-profit",
                          "Other",
                        ].map((industry) => (
                          <SelectItem
                            key={industry.toLowerCase().replace(/\s+/g, "-")}
                            value={industry.toLowerCase().replace(/\s+/g, "-")}
                          >
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="companySize">
                      Company size <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.companySize}
                      onValueChange={(value) => handleSelectChange("companySize", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "1-10 employees",
                          "11-50 employees",
                          "51-200 employees",
                          "201-500 employees",
                          "501-1000 employees",
                          "1000+ employees",
                        ].map((size) => (
                          <SelectItem
                            key={size.toLowerCase().replace(/\s+/g, "-")}
                            value={size.toLowerCase().replace(/\s+/g, "-")}
                          >
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <Label htmlFor="companyName">
                      Company name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter your company name"
                      className="border-primary/20 focus:border-primary/40"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="name">
                      Your name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="border-primary/20 focus:border-primary/40"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="designation">
                      Your designation <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="Enter your job title"
                      className="border-primary/20 focus:border-primary/40"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="email">
                      Company email address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your company email address"
                      className="border-primary/20 focus:border-primary/40"
                    />
                    <p className="text-xs text-muted-foreground">
                      Please use your company email. Personal email addresses (Gmail, Yahoo, etc.) are not accepted.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number (optional)"
                      className="border-primary/20 focus:border-primary/40"
                    />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="requirements">
                        Describe your specific requirements <span className="text-destructive">*</span>
                      </Label>
                      <Badge variant="outline" className="text-xs">
                        Selected use case: {formData.useCase.replace(/-/g, " ")}
                      </Badge>
                    </div>
                    <Textarea
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      placeholder="Please provide details about your specific needs, challenges, and what you hope to achieve with AI agents"
                      rows={6}
                      className="border-primary/20 focus:border-primary/40"
                    />
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium">Select one agent for trial</h3>
                      <p className="text-sm text-muted-foreground">
                        Based on your requirements, we've selected agents that might be a good fit
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={formData.selectedAgent ? "success" : "outline"} className="bg-primary/5">
                        {formData.selectedAgent ? "1 agent selected" : "No agent selected"}
                      </Badge>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Info className="h-4 w-4" />
                              <span className="sr-only">Info</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              You can select one agent for a free 14-day trial. To access more agents, you'll need to
                              upgrade to a paid plan.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <Alert className="mb-4">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Free Trial Limitation</AlertTitle>
                    <AlertDescription>
                      Your free trial includes access to one agent with 5 free messages. To use multiple agents, please
                      subscribe to our Pro plan.
                    </AlertDescription>
                  </Alert>

                  <ScrollArea className="h-[400px] rounded-md border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                      {filteredAgents.map((agent) => {
                        const isSelected = formData.selectedAgent?.id === agent.id
                        return (
                          <div
                            key={agent.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                : "border-muted-foreground/20 hover:border-muted-foreground/40"
                            }`}
                            onClick={() => handleAgentSelection(agent)}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-3">
                                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                                  <Bot className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <h3 className="font-medium">{agent.name}</h3>
                                  <p className="text-xs text-muted-foreground">{agent.category}</p>
                                </div>
                              </div>
                              <div>
                                {isSelected ? (
                                  <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center">
                                    <Check className="h-3 w-3" />
                                  </div>
                                ) : (
                                  <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/30"></div>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{agent.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {agent.capabilities.slice(0, 2).map((capability, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {capability}
                                </Badge>
                              ))}
                              {agent.capabilities.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{agent.capabilities.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>

                  <div className="space-y-4 mt-6">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="dataPrivacy"
                        checked={formData.dataPrivacy}
                        onCheckedChange={(checked) => handleCheckboxChange("dataPrivacy", checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="dataPrivacy" className="text-sm font-normal">
                          I agree to the{" "}
                          <Link href="/privacy" className="text-primary hover:underline">
                            data privacy policy
                          </Link>{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="marketingConsent"
                        checked={formData.marketingConsent}
                        onCheckedChange={(checked) => handleCheckboxChange("marketingConsent", checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="marketingConsent" className="text-sm font-normal">
                          I agree to receive marketing communications about products and services
                        </Label>
                      </div>
                    </div>
                  </div>

                  {formData.selectedAgent && (
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">Selected Agent</h4>
                      <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                        <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                          <Bot className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{formData.selectedAgent.name}</h3>
                          <p className="text-xs text-muted-foreground">{formData.selectedAgent.category}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-muted"
                          onClick={() => setFormData((prev) => ({ ...prev, selectedAgent: null }))}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              {step > 1 ? (
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
              ) : (
                <Button variant="outline" asChild>
                  <Link href="/">Cancel</Link>
                </Button>
              )}

              <Button onClick={handleNext} disabled={isSubmitting} className="relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                <div className="relative flex items-center">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : step === 4 ? (
                    "Submit Request"
                  ) : (
                    <>
                      Next
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </div>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </section>

      {/* Global CSS needed for animation and styling */}
      <style jsx global>{`
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 0.8; }
      }
    `}</style>
    </main>
  )
}
