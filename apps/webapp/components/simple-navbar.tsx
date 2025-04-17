"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserAccountNav } from "@/components/user-account-nav"
import { Bot } from "lucide-react"

interface SimpleNavbarProps {
  user: any | null
}

export function SimpleNavbar({ user }: SimpleNavbarProps) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">AI Agents Platform</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {!user ? (
            <Button asChild variant="default" size="sm">
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
          ) : (
            <UserAccountNav />
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
