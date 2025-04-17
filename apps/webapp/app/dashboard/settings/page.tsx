"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Bell, User, Lock, Globe, Zap, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("account")
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    company: "",
    avatar: "",
  })
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    marketingEmails: false,
    activitySummary: true,
    newFeatures: true,
  })
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "system",
    language: "en",
    timezone: "UTC",
  })

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUserData({
          name: parsedUser.name || "",
          email: parsedUser.email || "",
          company: parsedUser.company || "",
          avatar: parsedUser.avatar || "",
        })
      } catch (e) {
        console.error("Failed to parse user data", e)
      }
    }

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  const handleSaveProfile = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      // Update localStorage
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          const updatedUser = {
            ...parsedUser,
            name: userData.name,
            company: userData.company,
          }
          localStorage.setItem("user", JSON.stringify(updatedUser))
        } catch (e) {
          console.error("Failed to update user data", e)
        }
      }

      setIsSaving(false)
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
    }, 1000)
  }

  const handleSaveNotifications = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Notification preferences updated",
        description: "Your notification preferences have been updated successfully.",
      })
    }, 1000)
  }

  const handleSaveAppearance = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Appearance settings updated",
        description: "Your appearance settings have been updated successfully.",
      })
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="account" className="data-[state=active]:bg-background">
              <User className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-background">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-background">
              <Globe className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
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
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline">
                  <Lock className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about your account via email.
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing-emails">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about new features, products, and services.
                        </p>
                      </div>
                      <Switch
                        id="marketing-emails"
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, marketingEmails: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Activity Notifications</h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="activity-summary">Activity Summary</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive a weekly summary of your activity with AI agents.
                        </p>
                      </div>
                      <Switch
                        id="activity-summary"
                        checked={notificationSettings.activitySummary}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, activitySummary: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="new-features">New Features</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when new features or agents are available.
                        </p>
                      </div>
                      <Switch
                        id="new-features"
                        checked={notificationSettings.newFeatures}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, newFeatures: checked })
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveNotifications} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Preferences
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize how the application looks and feels.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select
                      value={appearanceSettings.theme}
                      onValueChange={(value) => setAppearanceSettings({ ...appearanceSettings, theme: value })}
                    >
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Choose between light, dark, or system theme preference.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={appearanceSettings.language}
                      onValueChange={(value) => setAppearanceSettings({ ...appearanceSettings, language: value })}
                    >
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={appearanceSettings.timezone}
                      onValueChange={(value) => setAppearanceSettings({ ...appearanceSettings, timezone: value })}
                    >
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                        <SelectItem value="CST">Central Time (CST)</SelectItem>
                        <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                        <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                        <SelectItem value="GMT">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="CET">Central European Time (CET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveAppearance} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Settings
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
                <CardDescription>Optimize the application performance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations">Animations</Label>
                    <p className="text-sm text-muted-foreground">Enable or disable UI animations.</p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reduce-motion">Reduce Motion</Label>
                    <p className="text-sm text-muted-foreground">Minimize animations for accessibility.</p>
                  </div>
                  <Switch id="reduce-motion" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline">
                  <Zap className="mr-2 h-4 w-4" />
                  Apply Performance Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
