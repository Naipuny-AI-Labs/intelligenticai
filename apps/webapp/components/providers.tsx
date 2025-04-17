"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { ChatProvider } from "@/components/chat-provider"
import { Provider } from "react-redux"
import { store } from "@/lib/redux/store"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <ChatProvider>{children}</ChatProvider>
      </ThemeProvider>
    </Provider>
  )
}
