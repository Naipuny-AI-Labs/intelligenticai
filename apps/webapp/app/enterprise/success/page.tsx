"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EnterpriseSuccessPage() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-primary/10 rounded-xl shadow-lg text-center p-8 md:p-12"
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
            </div>

            <h1 className="text-3xl font-bold mb-4">Request Submitted Successfully!</h1>

            <div className="mb-8 space-y-4 text-muted-foreground">
              <p>
                Thank you for your interest in our enterprise AI agent solutions. Our team will review your request and
                get back to you within 24 hours to discuss your specific requirements.
              </p>
              <p>Meanwhile, you'll receive a confirmation email with a summary of your request.</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 mb-8 max-w-xl mx-auto">
              <h3 className="font-medium mb-3">What happens next?</h3>
              <ol className="text-left space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-medium">1</span>
                  </div>
                  <div>
                    <span className="font-medium">Initial Consultation</span> - A solutions expert will contact you to
                    discuss your needs and explore how our AI agents can help.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-medium">2</span>
                  </div>
                  <div>
                    <span className="font-medium">Solution Design</span> - We'll work with you to design a custom
                    solution tailored to your organization's needs.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-medium">3</span>
                  </div>
                  <div>
                    <span className="font-medium">Implementation & Integration</span> - Our team will implement and
                    integrate the solution with your existing systems.
                  </div>
                </li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/">
                  Back to Home <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/categories">Explore AI Agents</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
