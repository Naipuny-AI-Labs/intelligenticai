"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Building2, Bot, Shield, Server, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function EnterprisePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    name: "",
    email: "",
    phone: "",
    requirements: "",
    useCase: "",
    deploymentPreference: "cloud",
    budget: "",
    timeframe: "",
    additionalInfo: "",
    dataPrivacy: false,
    marketingConsent: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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

  const handleSubmit = () => {
    // Validate form
    if (!formData.companyName || !formData.name || !formData.email || !formData.requirements) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields before submitting.",
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

    if (!formData.dataPrivacy) {
      toast({
        title: "Data privacy agreement required",
        description: "You must agree to our data privacy policy to proceed.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Request submitted successfully!",
        description: "Our team will review your request and get back to you shortly.",
      })

      // Navigate to success page
      router.push("/enterprise/success")
    }, 2000)
  }

  return (
    <main className="flex min-h-screen flex-col">
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
              <Building2 className="h-4 w-4" />
              <span>Enterprise Solutions</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight">Custom AI Agents for Enterprise</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tell us about your organization's needs, and our team will work with you to create custom AI agent
              solutions tailored to your specific requirements and workflows.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: <Shield className="h-6 w-6 text-blue-500" />,
                title: "Enterprise-Grade Security",
                description: "Custom data handling, encryption, and compliance with your industry regulations.",
              },
              {
                icon: <Server className="h-6 w-6 text-purple-500" />,
                title: "On-Premise or Cloud",
                description: "Flexible deployment options to match your organization's infrastructure requirements.",
              },
              {
                icon: <Bot className="h-6 w-6 text-primary" />,
                title: "Custom Training & Tuning",
                description: "AI agents trained on your data and optimized for your specific use cases.",
              },
            ].map((benefit, index) => (
              <Card key={index} className="border-primary/10 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="bg-primary/5 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle>{benefit.title}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-4xl">
          <Card className="border-primary/10 shadow-lg">
            <CardHeader>
              <CardTitle>Tell us about your enterprise needs</CardTitle>
              <CardDescription>
                Complete the form below and our team will get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Organization Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">
                        Company name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Enter company name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">
                        Industry <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.industry}
                        onValueChange={(value) => handleSelectChange("industry", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "Technology",
                            "Finance & Banking",
                            "Healthcare",
                            "Insurance",
                            "Retail & E-commerce",
                            "Manufacturing",
                            "Telecommunications",
                            "Education",
                            "Government",
                            "Transportation & Logistics",
                            "Energy & Utilities",
                            "Media & Entertainment",
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

                    <div className="space-y-2">
                      <Label htmlFor="companySize">Company size</Label>
                      <Select
                        value={formData.companySize}
                        onValueChange={(value) => handleSelectChange("companySize", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "1-50 employees",
                            "51-200 employees",
                            "201-500 employees",
                            "501-1000 employees",
                            "1001-5000 employees",
                            "5001-10000 employees",
                            "10000+ employees",
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
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Your name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Project Requirements</h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="useCase">What's your primary use case for AI agents?</Label>
                      <RadioGroup
                        value={formData.useCase}
                        onValueChange={(value) => handleRadioChange("useCase", value)}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[
                            { value: "customer-service", label: "Customer Service & Support" },
                            { value: "data-analysis", label: "Data Analysis & Insights" },
                            { value: "content-generation", label: "Content Generation" },
                            { value: "process-automation", label: "Process Automation" },
                            { value: "decision-support", label: "Decision Support Systems" },
                            { value: "personalization", label: "User Personalization" },
                            { value: "security", label: "Security & Threat Detection" },
                            { value: "other", label: "Other (please specify in requirements)" },
                          ].map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.value} id={option.value} />
                              <Label htmlFor={option.value} className="font-normal">
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deploymentPreference">Deployment preference</Label>
                      <RadioGroup
                        value={formData.deploymentPreference}
                        onValueChange={(value) => handleRadioChange("deploymentPreference", value)}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {[
                            { value: "cloud", label: "Cloud-based" },
                            { value: "on-premise", label: "On-premise" },
                            { value: "hybrid", label: "Hybrid approach" },
                          ].map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.value} id={`deploy-${option.value}`} />
                              <Label htmlFor={`deploy-${option.value}`} className="font-normal">
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="budget">Estimated budget range</Label>
                        <Select value={formData.budget} onValueChange={(value) => handleSelectChange("budget", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Less than $10,000",
                              "$10,000 - $50,000",
                              "$50,000 - $100,000",
                              "$100,000 - $250,000",
                              "$250,000 - $500,000",
                              "$500,000+",
                              "Not specified",
                            ].map((range) => (
                              <SelectItem
                                key={range.toLowerCase().replace(/\s+/g, "-")}
                                value={range.toLowerCase().replace(/\s+/g, "-")}
                              >
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeframe">Expected timeframe</Label>
                        <Select
                          value={formData.timeframe}
                          onValueChange={(value) => handleSelectChange("timeframe", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeframe" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Less than 1 month",
                              "1-3 months",
                              "3-6 months",
                              "6-12 months",
                              "More than 12 months",
                              "Not specified",
                            ].map((time) => (
                              <SelectItem
                                key={time.toLowerCase().replace(/\s+/g, "-")}
                                value={time.toLowerCase().replace(/\s+/g, "-")}
                              >
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requirements">
                        Project requirements <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="requirements"
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        placeholder="Please describe your requirements, challenges, and what you hope to achieve with our AI agents"
                        rows={5}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo">Additional information</Label>
                      <Textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        placeholder="Any other details that would help us understand your needs better"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
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
                        I agree to receive occasional updates about AI agents, products and services
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" asChild>
                <Link href="/">Cancel</Link>
              </Button>

              <Button onClick={handleSubmit} disabled={isSubmitting} className="min-w-[120px]">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Request
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  )
}
