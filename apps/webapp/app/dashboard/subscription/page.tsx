"use client"

import Link from "next/link"
import { Check, Bot, Mail, Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SubscriptionPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6 p-6 pt-8 md:p-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscription</h1>
          <p className="text-muted-foreground">Manage your subscription</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>You are currently on the Free trial plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Bot className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h3 className="font-medium">Free Trial</h3>
                <p className="text-sm text-muted-foreground">Basic access with limited features</p>
              </div>
              <Badge className="ml-auto">Active</Badge>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="font-medium">Plan Features:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Access to 5 free agents</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Limited usage (100 requests/day)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Basic support</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Community access</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/dashboard/request">Request Agents</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us Directly</CardTitle>
            <CardDescription>Reach out to our team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <a href="mailto:support@aiagents.com" className="text-sm hover:underline">
                support@aiagents.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <a href="tel:+1-800-AI-AGENT" className="text-sm hover:underline">
                +1-800-AI-AGENT
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span className="text-sm">Live chat available during business hours</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/request">Browse Available Agents</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
