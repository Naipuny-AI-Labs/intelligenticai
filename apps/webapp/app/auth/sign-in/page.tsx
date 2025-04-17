"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Bot, EyeIcon, EyeOffIcon, Loader2, Crown, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAppDispatch } from "@/lib/redux/hooks"
import { setUser } from "@/lib/redux/slices/userSlice"
import { fetchWorkspaceDetails } from "@/lib/redux/slices/workspaceSlice"
import { fetchUserAgents, fetchPendingRequests, fetchTrialAgent } from "@/lib/redux/slices/agentsSlice"

export default function SignInPage() {
  const { toast } = useToast()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check credentials
      let subscription = "trial"
      let userName = "Trial User"
      let userId = "trialUser"

      // Premium user credentials
      if (email === "premium@example.com" && password === "premium123") {
        subscription = "pro"
        userName = "Premium User"
        userId = "premiumUser"
      }
      // Trial user credentials
      else if (email === "trial@example.com" && password === "trial123") {
        subscription = "trial"
        userName = "Trial User"
        userId = "trialUser"
      }
      // For demo purposes, allow any email/password
      else {
        subscription = "trial"
        userName = email.split("@")[0] || "Trial User"
        userId = "demoUser"
      }

      // Create user object
      const user = {
        id: userId,
        name: userName,
        email: email,
        avatar: "/placeholder.svg?height=32&width=32&text=U",
        subscription: subscription,
      }

      // Dispatch user to Redux store
      dispatch(setUser(user))

      // Fetch workspace details
      await dispatch(fetchWorkspaceDetails()).unwrap()

      // Fetch appropriate data based on subscription
      if (subscription === "pro" || subscription === "enterprise") {
        // Pro users get approved agents
        await dispatch(fetchUserAgents()).unwrap()
        await dispatch(fetchPendingRequests()).unwrap()
      } else {
        // Trial users get a trial agent
        await dispatch(fetchTrialAgent()).unwrap()
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const setDemoCredentials = (type: "trial" | "premium") => {
    if (type === "trial") {
      setEmail("trial@example.com")
      setPassword("trial123")
    } else {
      setEmail("premium@example.com")
      setPassword("premium123")
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="h-10 w-10 text-primary" />
            <span className="text-2xl font-bold">AI Agents</span>
          </Link>
        </div>

        {/* <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Demo Credentials</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <p>Use these credentials to test different user types:</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDemoCredentials("trial")}
                className="flex items-center gap-2"
              >
                Trial User
                <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded">trial@example.com</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDemoCredentials("premium")}
                className="flex items-center gap-2"
              >
                <Crown className="h-3 w-3 text-primary" />
                Premium User
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">premium@example.com</span>
              </Button>
            </div>
          </AlertDescription>
        </Alert> */}

        <Card className="border-none shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
