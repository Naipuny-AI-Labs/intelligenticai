"use client"

import { useState, useEffect } from "react"
import { Bot, BarChart2, ArrowUpRight, ArrowDownRight, MessageSquare, Clock, Download, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
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
  Legend,
} from "recharts"
import { useAppSelector } from "@/lib/redux/hooks"

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedAgent, setSelectedAgent] = useState("all")

  // Get user data from Redux store
  const { approvedAgents } = useAppSelector((state) => state.agents)
  const { subscription } = useAppSelector((state) => state.workspace)

  useEffect(() => {
    // If user is on trial, redirect to dashboard
    if (subscription === "trial") {
      window.location.href = "/dashboard"
      return
    }

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [subscription])

  // Sample data for charts - in a real app, this would come from the API
  const usageData = [
    { date: "Mon", messages: 120, queries: 45 },
    { date: "Tue", messages: 180, queries: 62 },
    { date: "Wed", messages: 150, queries: 55 },
    { date: "Thu", messages: 220, queries: 78 },
    { date: "Fri", messages: 250, queries: 90 },
    { date: "Sat", messages: 180, queries: 62 },
    { date: "Sun", messages: 140, queries: 48 },
  ]

  const hourlyUsageData = [
    { hour: "12am", messages: 20 },
    { hour: "3am", messages: 10 },
    { hour: "6am", messages: 15 },
    { hour: "9am", messages: 45 },
    { hour: "12pm", messages: 85 },
    { hour: "3pm", messages: 110 },
    { hour: "6pm", messages: 80 },
    { hour: "9pm", messages: 50 },
  ]

  const agentUsageData = approvedAgents
    .map((agent) => ({
      name: agent.name,
      messages: agent.analytics?.totalMessages || Math.floor(Math.random() * 1000),
      responseTime: agent.analytics?.averageResponseTime || Math.floor(Math.random() * 2000),
    }))
    .sort((a, b) => b.messages - a.messages)

  const queryTypeData = [
    { name: "Information Requests", value: 45 },
    { name: "Task Automation", value: 25 },
    { name: "Data Analysis", value: 20 },
    { name: "Other", value: 10 },
  ]

  const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BarChart2 className="h-8 w-8 animate-pulse text-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6 p-6 pt-8 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Analytics</h1>
            <p className="text-muted-foreground">Track your AI agents' performance and usage</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                {approvedAgents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            {timeRange === "custom" && <DatePickerWithRange className="w-auto" />}
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border/40 shadow-sm hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,248</div>
                  <div className="text-xs text-green-500 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>12% from last period</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/40 shadow-sm hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-blue-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{approvedAgents.length}</div>
                  <div className="text-xs text-green-500 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>2 new this period</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/40 shadow-sm hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-yellow-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1.8s</div>
                  <div className="text-xs text-green-500 flex items-center mt-1">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    <span>0.3s improvement</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/40 shadow-sm hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-green-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">94%</div>
                  <div className="text-xs text-green-500 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>2% from last period</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border/40 shadow-sm">
                <CardHeader>
                  <CardTitle>Message Volume</CardTitle>
                  <CardDescription>Total messages over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={usageData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="messages" stroke="#4f46e5" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="queries" stroke="#10b981" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/40 shadow-sm">
                <CardHeader>
                  <CardTitle>Query Types</CardTitle>
                  <CardDescription>Distribution of query categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={queryTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {queryTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/40 shadow-sm">
              <CardHeader>
                <CardTitle>Agent Performance</CardTitle>
                <CardDescription>Usage and response times by agent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={agentUsageData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={150} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="messages" name="Messages" fill="#4f46e5" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6 mt-6">
            <Card className="border-border/40 shadow-sm">
              <CardHeader>
                <CardTitle>Usage by Time of Day</CardTitle>
                <CardDescription>When your agents are most active</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourlyUsageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="messages" name="Messages" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 shadow-sm">
              <CardHeader>
                <CardTitle>Daily Usage</CardTitle>
                <CardDescription>Message volume by day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="messages" stroke="#4f46e5" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6 mt-6">
            <Card className="border-border/40 shadow-sm">
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
                <CardDescription>Average response time by agent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={agentUsageData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={150} />
                      <Tooltip />
                      <Bar dataKey="responseTime" name="Response Time (ms)" fill="#10b981" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 shadow-sm">
              <CardHeader>
                <CardTitle>Success Rates</CardTitle>
                <CardDescription>Percentage of successful queries by agent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {approvedAgents.slice(0, 5).map((agent, index) => (
                    <div key={agent.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bot className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{agent.name}</h3>
                            <Badge variant="outline">{agent.category}</Badge>
                          </div>
                        </div>
                        <div className="text-2xl font-bold">{Math.floor(Math.random() * 10) + 90}%</div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${Math.floor(Math.random() * 10) + 90}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
