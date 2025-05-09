"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasScrolledPast, setHasScrolledPast] = useState(false)
  const { theme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past the navbar height (64px)
      const scrolledPastNavbar = window.scrollY > 100
      setIsScrolled(window.scrollY > 10)
      setHasScrolledPast(scrolledPastNavbar)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false)
  }, [pathname])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "About", href: "/about" },
  ]

  return (
    <>
      {/* Placeholder div to prevent layout shift when navbar becomes fixed */}
      {hasScrolledPast && <div className="h-16" />}

      <header
        className={cn(
          "w-full z-50 transition-all duration-300",
          hasScrolledPast ? "fixed top-0 animate-slideDown" : "relative",
          isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent",
        )}
      >
        <div className="container px-2 xs:px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/images/intelligentic-logo.png"
                  alt="INTELLIGENTIC.AI Logo"
                  width={40}
                  height={40}
                  className="h-8 w-auto sm:h-9 md:h-10"
                />
                <span className="xs:hidden font-bold text-xs tracking-wide ml-1">IA</span>
                <span className="hidden xs:inline-block font-bold text-sm sm:text-base md:text-lg lg:text-xl tracking-wide ml-1 sm:ml-2">
                  INTELLIGENTIC.AI
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />

              <Button asChild className="hidden sm:flex bg-brand-gradient hover:opacity-90">
                <a href="https://workspace.intelligentic.ai" target="_blank" rel="noopener noreferrer">
                  Sign In
                </a>
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t">
            <div className="container px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary py-2",
                      pathname === item.href ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button asChild className="mt-2 w-full sm:hidden bg-brand-gradient hover:opacity-90">
                  <a href="https://workspace.intelligentic.ai" target="_blank" rel="noopener noreferrer">
                    Sign In
                  </a>
                </Button>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
