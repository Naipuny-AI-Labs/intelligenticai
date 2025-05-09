"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Bot, Check, Mail, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SuccessPage() {
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

            <h1 className="text-4xl font-bold tracking-tight">Thank You for Your Interest!</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your trial request has been submitted successfully. We're excited to have you try our AI agent.
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
              We've sent your login credentials to the email address you provided. Please check your inbox (and spam
              folder) to access your trial agent.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 flex-1">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle>What's Included in Your Trial</CardTitle>
                <CardDescription>Your 14-day free trial includes:</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mt-0.5">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Access to Your Selected Agent</h3>
                    <p className="text-sm text-muted-foreground">
                      Full access to the AI agent you selected during the trial request process
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mt-0.5">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">5 Free Messages</h3>
                    <p className="text-sm text-muted-foreground">
                      Your trial includes 5 free messages with your selected agent
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mt-0.5">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Access to our support team via email during your trial period
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Your trial will expire in 14 days. You can upgrade to a Pro plan at any time to continue using the
                  service without interruption.
                </p>
              </CardFooter>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
                <CardDescription>Here's what you can do now:</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
                      <span className="font-medium">1</span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Check your email</span> for login credentials
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
                      <span className="font-medium">2</span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Log in to your account</span> using the provided credentials
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
                      <span className="font-medium">3</span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Start using your trial agent</span> to experience its capabilities
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
                      <span className="font-medium">4</span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Explore other agents</span> to find the perfect fit for your needs
                    </p>
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <Button asChild className="w-full">
                    <Link href="/categories">
                      Explore More Agents
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <Button variant="outline" asChild className="w-full">
                    <Link href="/">Return to Home</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Our team is here to help you get the most out of your trial. If you have any questions or need assistance,
              please don't hesitate to reach out.
            </p>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
