"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Bot, BarChart2, Settings, LogOut, User, Search, Menu, Crown, PlusCircle, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { NotificationsMenu } from "@/components/notifications"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { clearUser } from "@/lib/redux/slices/userSlice"
import AgentsPage from "@/app/dashboard/agents/page"
import type { Agent } from "@/lib/types"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [approvedAgentsData, setApprovedAgentsData] = useState<Agent[]>([])

  // Get user and workspace data from Redux store
  const user = useAppSelector((state) => state.user.currentUser)
  const { subscription } = useAppSelector((state) => state.workspace)
  const { approvedAgents, pendingRequests } = useAppSelector((state) => state.agents)

  const isPremium = subscription === "pro" || subscription === "enterprise"

  useEffect(() => {
    // If no user is in Redux store, redirect to login
    if (!user) {
      router.push("/auth/sign-in")
      return
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [user, router])

  useEffect(() => {
    // Set approved agents data
    setApprovedAgentsData(approvedAgents)
  }, [approvedAgents])

  const handleLogout = () => {
    dispatch(clearUser())
    router.push("/auth/sign-in")
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 opacity-75 blur rounded-full"></div>
          <Bot className="h-12 w-12 relative text-primary bg-background rounded-full p-2" />
        </div>
        <p className="text-muted-foreground mt-4">Loading your dashboard...</p>
      </div>
    )
  }

  // Different navigation items based on subscription type
  const trialNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      title: "My Trial",
      href: "/dashboard/trials",
      icon: <Bot className="h-5 w-5" />,
    },
    {
      title: "Request Agents",
      href: "/dashboard/request",
      icon: <PlusCircle className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const proNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      title: "My Agents",
      href: "/dashboard/agents",
      icon: <Bot className="h-5 w-5" />,
    },
    {
      title: "Integrations",
      href: "/dashboard/integrations",
      icon: <Link2 className="h-5 w-5" />,
    },
    {
      title: "Request New Agent",
      href: "/dashboard/request",
      icon: <PlusCircle className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const navItems = subscription === "trial" ? trialNavItems : proNavItems

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    <span>AI Agents</span>
                    {subscription === "trial" ? (
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                        Trial
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        <Crown className="mr-1 h-3 w-3" />
                        Pro
                      </Badge>
                    )}
                  </SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-10rem)]">
                  <div className="p-4 pb-0">
                    <div className="flex items-center gap-3 mb-6 p-2 bg-muted/50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || ""} />
                        <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col overflow-hidden">
                        <span className="font-medium">{user?.name}</span>
                        <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {navItems.map((item) => (
                        <SheetClose asChild key={item.href}>
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            {item.icon}
                            {item.title}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>

                  {subscription === "pro" && approvedAgents.length > 0 && (
                    <div className="mt-6 px-4">
                      <h3 className="mb-2 px-3 text-sm font-medium">Your Agents</h3>
                      <div className="space-y-1">
                        {approvedAgents.map((agent) => (
                          <SheetClose asChild key={agent.id}>
                            <Link
                              href={`/dashboard/agents/chat/${agent.id}`}
                              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <Bot className="h-4 w-4 text-primary" />
                              <span className="truncate">{agent.name}</span>
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </div>
                  )}
                </ScrollArea>
                <div className="p-4 border-t mt-auto">
                  <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 opacity-25 blur rounded-full"></div>
                <Bot className="h-6 w-6 relative" />
              </div>
              <span className="text-lg font-bold hidden sm:inline">AI Agents</span>
            </Link>
            {subscription === "trial" && (
              <Badge variant="outline" className="hidden md:flex bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
                Trial
              </Badge>
            )}
            {subscription === "pro" && (
              <Badge variant="outline" className="hidden md:flex bg-primary/10 text-primary hover:bg-primary/20">
                <Crown className="mr-1 h-3 w-3" />
                Pro
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:flex">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-64 rounded-full bg-muted pl-8 md:w-80 lg:w-96"
              />
            </div>

            {/* Notifications Menu */}
            <NotificationsMenu />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || ""} />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.name}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                    {subscription === "pro" ? (
                      <Badge className="mt-1 w-fit bg-primary/10 text-primary">
                        <Crown className="mr-1 h-3 w-3" />
                        Pro
                      </Badge>
                    ) : (
                      <Badge className="mt-1 w-fit bg-amber-500/10 text-amber-500">Trial</Badge>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                {subscription === "trial" && (
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/request">
                      <Bot className="mr-2 h-4 w-4" />
                      Request Agents
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar Navigation (desktop) */}
        <aside className="hidden w-64 flex-col border-r bg-background md:flex">
          <nav className="flex-1 overflow-auto p-4">
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </div>

            {subscription === "trial" && (
              <div className="mt-6 rounded-lg border bg-card p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gradient-to-r from-primary to-purple-600 p-2">
                    <Crown className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Request Agents</h4>
                    <p className="text-xs text-muted-foreground">Get access to requested agents</p>
                  </div>
                </div>
                <Button className="mt-4 w-full" size="sm" asChild>
                  <Link href="/dashboard/request">Request</Link>
                </Button>
              </div>
            )}

            {subscription === "pro" && approvedAgents.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-2 px-4 text-sm font-medium">Your Agents</h3>
                <div className="space-y-1">
                  {approvedAgents.map((agent) => (
                    <Link
                      key={agent.id}
                      href={`/dashboard/agents/chat/${agent.id}`}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Bot className="h-4 w-4 text-primary" />
                      <span className="truncate">{agent.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>
          <div className="border-t p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || ""} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium">{user?.name}</span>
                <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === AgentsPage) {
              return React.cloneElement(child, { approvedAgents: approvedAgentsData })
            }
            return child
          })}
        </main>
      </div>
    </div>
  )
}
