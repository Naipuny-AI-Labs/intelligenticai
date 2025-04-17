"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { MessageSquare, Clock, Users, BarChart2 } from "lucide-react"
import type { Agent } from "@/lib/types"

interface AgentAnalyticsProps {
  agent: Agent
}

export function AgentAnalytics({ agent }: AgentAnalyticsProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!agent.analytics) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>No analytics data available for this agent</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const { totalMessages, averageResponseTime, userSatisfactionRate, topQueries, usageByDay, usageByHour } =
    agent.analytics

  // Format data for charts
  const pieData = [
    { name: "Satisfied", value: userSatisfactionRate },
    { name: "Unsatisfied", value: 100 - userSatisfactionRate },
  ]

  const COLORS = ["#4f46e5", "#e5e7eb"]

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Performance metrics for {agent.name}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            <BarChart2 className="h-3 w-3 mr-1" />
            Analytics
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="queries">Top Queries</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Messages</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl font-bold">{totalMessages.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Response Time</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl font-bold">{(averageResponseTime / 1000).toFixed(1)}s</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Satisfaction Rate</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl font-bold">{userSatisfactionRate}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium">Usage Over Time</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={usageByDay}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="#4f46e5" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium">User Satisfaction</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium">Usage by Hour</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usageByHour}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium">Daily Usage</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usageByDay}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="queries" className="space-y-4">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium">Top Queries</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ul className="space-y-2">
                  {topQueries.map((query, index) => (
                    <li key={index} className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                      <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      <span>{query}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
