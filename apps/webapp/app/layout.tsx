import type React from "react"
import { Inter } from "next/font/google"
import { Providers } from "@/components/providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AI Agents Platform",
  description: "A platform for AI agents",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <main className="min-h-[calc(100vh-3.5rem)]">{children}</main>
        </Providers>
      </body>
    </html>
  )
}


import './globals.css'