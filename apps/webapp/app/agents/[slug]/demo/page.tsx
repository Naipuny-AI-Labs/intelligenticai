"use client"

import { useEffect, useState } from "react"
import { notFound, useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Bot, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAgentBySlug } from "@/lib/agents"
import { AgentDemo } from "@/components/agent-demo"

interface AgentDemoPageProps {
  params: {
    slug: string
  }
}

export default function AgentDemoPage({ params }: AgentDemoPageProps) {
  const { slug } = params

  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isFromDashboard, setIsFromDashboard] = useState(false)
  const agent = getAgentBySlug(slug)

  useEffect(() => {
    setMounted(true)
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    // Check if user is coming from dashboard
    const referrer = document.referrer
    const isDashboardReferrer = referrer.includes("/dashboard")
    const hasValidSession = sessionStorage.getItem("dashboardAccess") === "true"
    setIsFromDashboard(isDashboardReferrer || hasValidSession)

    // If not logged in, redirect to login
    if (!loggedIn) {
      // Store the intended destination for after login
      sessionStorage.setItem("redirectAfterLogin", pathname)
      router.push("/auth/sign-in")
    }
    // If logged in but not from dashboard, redirect to dashboard
    else if (loggedIn && !isDashboardReferrer && !hasValidSession) {
      router.push("/dashboard")
    }
  }, [pathname, router])

  if (!agent) {
    notFound()
  }

  if (!mounted) {
    return null
  }

  // This should no longer be needed as we redirect in useEffect, but keeping as a fallback
  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen flex-col">
        <div className="container py-4 md:py-8">
          <Link
            href={`/agents/${slug}`}
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-4 md:mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to agent details
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto text-center py-12"
          >
            <div className="bg-card border rounded-lg p-8 shadow-md">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Lock className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Login Required</h2>
              <p className="text-muted-foreground mb-6">You need to be logged in to try the {agent.name} demo.</p>
              <div className="space-y-4">
                <Button className="w-full" asChild>
                  <Link href="/auth/sign-in">Sign In</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/auth/sign-up">Create Account</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container py-4 md:py-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-4 md:mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to dashboard
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">{agent.name} Demo</h1>
              <p className="text-sm text-muted-foreground">Experience the agent in action</p>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-2 md:p-6 shadow-sm">
            <AgentDemo agent={agent} />
          </div>

          <div className="mt-6 md:mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">Ready to use this agent in your projects?</p>
            <Button asChild>
              <Link href={`/agents/${slug}`}>Deploy This Agent</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
