"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Bot, Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserAccountNav } from "@/components/user-account-nav"

export function Navbar() {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
  }, [])

  const routes = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Categories" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
  ]

  const userRoutes = isLoggedIn ? [...routes, { href: "/dashboard", label: "Dashboard" }] : routes

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="h-6 w-6" />
            <span className="font-bold text-xl hidden sm:inline-block">AI Agents</span>
          </Link>

          <nav className="hidden md:flex gap-6">
            {userRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === route.href ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="relative hidden md:flex items-center">
              <Input type="search" placeholder="Search agents..." className="w-[200px] lg:w-[300px] pl-8" autoFocus />
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Button variant="ghost" size="icon" className="absolute right-0" onClick={() => setIsSearchOpen(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <ThemeToggle />

          {isClient && <UserAccountNav />}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-6 py-6">
                <Link href="/" className="flex items-center space-x-2">
                  <Bot className="h-6 w-6" />
                  <span className="font-bold text-xl">AI Agents</span>
                </Link>
                <div className="grid gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search agents..." className="pl-8" />
                  </div>
                  <nav className="grid gap-3">
                    {userRoutes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        className={`text-sm font-medium transition-colors hover:text-primary ${
                          pathname === route.href ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {route.label}
                      </Link>
                    ))}
                  </nav>
                  {!isLoggedIn && (
                    <Button size="sm" asChild>
                      <Link href="/auth/sign-in">Sign In</Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
