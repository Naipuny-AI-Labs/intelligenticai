"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Bot, Check, Mail, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function BuildAgentSuccessPage() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />
        </div>

        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 text-sm text-green-500 mb-4">
              <Check className="h-4 w-4" />
              <span>Request Submitted Successfully</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight">Thank You for Your Request!</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your custom AI agent request has been submitted successfully. Our team will review your requirements and
              get back to you soon.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Email Alert */}
      <section className="py-4">
        <div className="container max-w-4xl">
          <Alert className="bg-blue-500/5 border-blue-500/20">
            <Mail className="h-5 w-5 text-blue-500" />
            <AlertTitle className="text-blue-500">Check Your Email</AlertTitle>
            <AlertDescription>
              We've sent a confirmation to the email address you provided. Our team will contact you within 1-2 business
              days to discuss your custom AI agent requirements.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 flex-1">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <div className="bg-background border-2 border-gray-200 dark:border-gray-800 dark:bg-black/50 rounded-xl p-6 md:p-8 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle>What Happens Next</CardTitle>
                  <CardDescription>Here's what you can expect from us</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mt-0.5">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Initial Consultation</h3>
                      <p className="text-sm text-muted-foreground">
                        Our team will reach out to schedule an initial consultation to discuss your requirements in
                        detail
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mt-0.5">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Custom Proposal</h3>
                      <p className="text-sm text-muted-foreground">
                        We'll create a tailored proposal with pricing and timeline for your custom AI agent
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mt-0.5">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Development & Deployment</h3>
                      <p className="text-sm text-muted-foreground">
                        Once approved, our team will build, test, and deploy your custom AI agent
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Our team is committed to delivering high-quality custom AI solutions that meet your specific
                    business needs.
                  </p>
                </CardFooter>
              </Card>

              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle>Explore Our Resources</CardTitle>
                  <CardDescription>While you wait, check out these resources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
                        <span className="font-medium">1</span>
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Browse our case studies</span> to see how others are using custom
                        AI agents
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
                        <span className="font-medium">2</span>
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Read our blog</span> for the latest AI trends and insights
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
                        <span className="font-medium">3</span>
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Try our pre-built agents</span> to experience AI capabilities
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 space-y-4">
                    <Button
                      asChild
                      className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 text-white border-0 w-full"
                    >
                      <Link href="/try-agent">
                        Try Pre-built Agents
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      asChild
                      className="border-2 border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 w-full"
                    >
                      <Link href="/">Return to Home</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Our team is here to help you get the most out of your custom AI agent. If you have any questions or need
                assistance, please don't hesitate to reach out.
              </p>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
