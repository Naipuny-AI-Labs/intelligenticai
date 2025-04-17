"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  User,
  Building,
  Calendar,
  LogOut,
  Smartphone,
  Globe,
  Crown,
  Bot,
  MessageSquare,
  BarChart2,
  Link2,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { useAppSelector } from "@/lib/redux/hooks"

export default function ProfilePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Get user data from Redux store
  const user = useAppSelector((state) => state.user.currentUser)
  const { messagesUsed, messageLimit } = useAppSelector((state) => state.workspace)
  const { approvedAgents } = useAppSelector((state) => state.agents)

  const isPremium = user?.subscription === "pro" || user?.subscription === "enterprise"

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    company: "",
    avatar: "",
    subscription: "trial",
    joinDate: "",
  })

  useEffect(() => {
    // Set user data from Redux store
    if (user) {
      setUserData({
        name: user.name || "User",
        email: user.email || "user@example.com",
        company: user.company || "Company",
        avatar: user.avatar || "/placeholder.svg?height=128&width=128",
        subscription: user.subscription || "trial",
        joinDate: user.joinDate || "2023-01-01",
      })
    }

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [user])

  const handleSaveProfile = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
    }, 1000)
  }

  const handleChangePassword = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      })
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <User className="h-8 w-8 animate-pulse text-primary" />
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile sidebar */}
          <div className="w-full md:w-1/3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Your personal information and subscription details</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{userData.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">{userData.email}</p>
                <Badge
                  variant="outline"
                  className={isPremium ? "bg-primary/10 text-primary" : "bg-amber-500/10 text-amber-500"}
                >
                  {isPremium ? (
                    <>
                      <Crown className="h-3 w-3 mr-1" /> Premium
                    </>
                  ) : (
                    "Trial"
                  )}
                </Badge>

                <div className="w-full mt-6 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>Company</span>
                    </div>
                    <span className="font-medium">{userData.company}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Joined</span>
                    </div>
                    <span className="font-medium">{new Date(userData.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span>Language</span>
                    </div>
                    <span className="font-medium">English</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {!isPremium && (
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/subscription">
                      <Crown className="mr-2 h-4 w-4" />
                      Upgrade to Premium
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>

            {/* Subscription Status Card */}
            <Card
              className={
                isPremium
                  ? "border-primary/20 bg-primary/5"
                  : "border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10"
              }
            >
              <CardHeader>
                <CardTitle className={isPremium ? "text-primary" : "text-amber-800 dark:text-amber-300"}>
                  {isPremium ? (
                    <div className="flex items-center">
                      <Crown className="h-5 w-5 mr-2" />
                      Premium Account
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Bot className="h-5 w-5 mr-2 text-amber-500" />
                      Trial Account
                    </div>
                  )}
                </CardTitle>
                <CardDescription className={isPremium ? "text-primary/80" : "text-amber-700 dark:text-amber-400"}>
                  {isPremium
                    ? "You have full access to all premium features"
                    : "You're currently on a trial with limited features"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isPremium ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Subscription</span>
                      <Badge className="bg-primary text-primary-foreground">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Billing Cycle</span>
                      <span className="text-sm font-medium">Monthly</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Next Billing Date</span>
                      <span className="text-sm font-medium">June 15, 2023</span>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Premium Benefits</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center gap-2">
                          <Bot className="h-3.5 w-3.5 text-primary" />
                          <span>Access to all AI agents ({approvedAgents.length} agents)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <MessageSquare className="h-3.5 w-3.5 text-primary" />
                          <span>Unlimited messages</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Link2 className="h-3.5 w-3.5 text-primary" />
                          <span>Advanced integrations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <BarChart2 className="h-3.5 w-3.5 text-primary" />
                          <span>Detailed analytics</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1 text-sm">
                        <span className="text-amber-700 dark:text-amber-400">Messages Used</span>
                        <span className="font-medium text-amber-800 dark:text-amber-300">
                          {messagesUsed} / {messageLimit}
                        </span>
                      </div>
                      <Progress
                        value={(messagesUsed / messageLimit) * 100}
                        className="h-2 bg-amber-200 dark:bg-amber-900"
                      >
                        <div className="h-full bg-amber-500" />
                      </Progress>
                    </div>
                    <Separator className="bg-amber-200 dark:bg-amber-800" />
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">Trial Limitations</h4>
                      <ul className="text-sm space-y-1 text-amber-700 dark:text-amber-400">
                        <li className="flex items-center gap-2">
                          <Bot className="h-3.5 w-3.5" />
                          <span>Limited to 1 AI agent</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>Maximum {messageLimit} messages</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Link2 className="h-3.5 w-3.5" />
                          <span>Basic integrations only</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {isPremium ? (
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/subscription">Manage Subscription</Link>
                  </Button>
                ) : (
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white" asChild>
                    <Link href="/dashboard/subscription">
                      <Crown className="mr-2 h-4 w-4" />
                      Upgrade to Premium
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <Tabs defaultValue="personal">
              <TabsList className="w-full grid grid-cols-2 h-auto p-1 bg-muted/50 rounded-lg">
                <TabsTrigger
                  value="personal"
                  className="rounded-md py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  <User className="h-4 w-4 mr-2" />
                  Personal Info
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="rounded-md py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={userData.email} disabled />
                      <p className="text-xs text-muted-foreground">
                        Your email address is used for login and cannot be changed.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={userData.company}
                        onChange={(e) => setUserData({ ...userData, company: e.target.value })}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Manage your notification preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about your account via email.
                        </p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing-emails">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about new features, products, and services.
                        </p>
                      </div>
                      <Switch id="marketing-emails" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password to keep your account secure</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleChangePassword} disabled={isSaving}>
                      {isSaving ? "Updating..." : "Update Password"}
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Protect your account with an additional security layer.
                        </p>
                      </div>
                      <Switch id="2fa" />
                    </div>
                    <div className="pt-4">
                      <Button variant="outline" className="w-full" disabled>
                        <Smartphone className="mr-2 h-4 w-4" />
                        Set Up Authenticator App
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Active Sessions</CardTitle>
                    <CardDescription>Manage your active sessions across devices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Globe className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Current Session</h3>
                            <p className="text-xs text-muted-foreground">
                              Chrome on Windows • {new Date().toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out of All Devices
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
