"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { CheckCircle } from "lucide-react"

export default function OnboardingSuccessPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background py-12">
      <AnimatedBackground className="opacity-30" />
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <Card className="w-full bg-background/80 backdrop-blur-sm border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary/20">
              <CheckCircle className="h-10 w-10 text-brand-primary" />
            </div>
            <CardTitle className="text-2xl md:text-3xl">Onboarding Request Submitted!</CardTitle>
            <CardDescription className="text-lg">Thank you for your interest in our AI solutions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p>
              Your onboarding request has been successfully submitted. Our team will review your requirements and reach
              out to you via email shortly.
            </p>
            <div className="rounded-lg bg-muted p-4 text-left">
              <h3 className="mb-2 font-medium">What happens next?</h3>
              <ul className="ml-5 list-disc space-y-1 text-sm">
                <li>Our team will review your requirements within 1-2 business days</li>
                <li>You'll receive an email with login credentials to access your portal</li>
                <li>You can use these credentials to log in and track the status of your request</li>
                <li>A dedicated solution specialist will contact you to discuss your needs in detail</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-center sm:space-x-2 sm:space-y-0">
            <Button
              asChild
              className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 text-white border-0 w-full sm:w-auto"
            >
              <Link href="/">Return to Home</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 w-full sm:w-auto"
            >
              <Link href="/marketplace">Explore Marketplace</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
