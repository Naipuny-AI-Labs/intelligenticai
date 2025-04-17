import type { Agent, AgentRequest, Notification } from "./types"

// Define the ChatTemplate type
interface ChatTemplate {
  id: string
  title: string
  content: string
  category: string
  agentId?: string // Optional agent ID
}

// Sample agent data
const agents: Agent[] = [
  {
    id: "1",
    slug: "customer-support-agent",
    name: "Customer Support Agent",
    description: "AI assistant that helps with customer inquiries and support tickets.",
    category: "Support",
    capabilities: ["Answer FAQs", "Troubleshoot issues", "Escalate to human"],
    analytics: {
      totalMessages: 12458,
      averageResponseTime: 1200, // 1.2 seconds
      userSatisfactionRate: 92,
      topQueries: [
        "How do I reset my password?",
        "Where is my order?",
        "How do I return an item?",
        "Cancel subscription",
      ],
      usageByDay: [
        { date: "2023-11-01", count: 423 },
        { date: "2023-11-02", count: 385 },
        { date: "2023-11-03", count: 501 },
        { date: "2023-11-04", count: 392 },
        { date: "2023-11-05", count: 287 },
        { date: "2023-11-06", count: 489 },
        { date: "2023-11-07", count: 521 },
      ],
      usageByHour: [
        { hour: 0, count: 120 },
        { hour: 4, count: 80 },
        { hour: 8, count: 320 },
        { hour: 12, count: 480 },
        { hour: 16, count: 520 },
        { hour: 20, count: 280 },
      ],
    },
  },
  {
    id: "2",
    slug: "content-writer",
    name: "Content Writer",
    description: "AI that generates blog posts, social media content, and marketing copy.",
    category: "Content",
    capabilities: ["Blog writing", "Social media posts", "Email newsletters"],
    analytics: {
      totalMessages: 8932,
      averageResponseTime: 2100, // 2.1 seconds
      userSatisfactionRate: 88,
      topQueries: [
        "Write a blog post about AI",
        "Create social media content",
        "Draft an email newsletter",
        "Product description",
      ],
      usageByDay: [
        { date: "2023-11-01", count: 323 },
        { date: "2023-11-02", count: 285 },
        { date: "2023-11-03", count: 401 },
        { date: "2023-11-04", count: 292 },
        { date: "2023-11-05", count: 187 },
        { date: "2023-11-06", count: 389 },
        { date: "2023-11-07", count: 421 },
      ],
      usageByHour: [
        { hour: 0, count: 80 },
        { hour: 4, count: 40 },
        { hour: 8, count: 220 },
        { hour: 12, count: 380 },
        { hour: 16, count: 420 },
        { hour: 20, count: 180 },
      ],
    },
  },
]

// Sample agent requests
const agentRequests: AgentRequest[] = [
  {
    id: "req1",
    userId: "user1",
    agentId: "1",
    companyName: "Acme Corp",
    useCase: "We need help with our customer support team to handle routine inquiries.",
    expectedVolume: "500-1000 inquiries per month",
    status: "approved",
    createdAt: new Date("2023-10-15").toISOString(),
    updatedAt: new Date("2023-10-18").toISOString(),
  },
  {
    id: "req2",
    userId: "user1",
    agentId: "3",
    companyName: "Acme Corp",
    useCase: "We need to analyze our sales data and generate insights.",
    expectedVolume: "Weekly reports for executive team",
    status: "pending",
    createdAt: new Date("2023-11-05").toISOString(),
    updatedAt: new Date("2023-11-05").toISOString(),
  },
  {
    id: "req3",
    userId: "user2",
    agentId: "2",
    companyName: "Beta Corp",
    useCase: "We need help generating marketing content for our new product launch.",
    expectedVolume: "10 blog posts and 50 social media posts per month",
    status: "pending",
    createdAt: new Date("2023-11-10").toISOString(),
    updatedAt: new Date("2023-11-10").toISOString(),
  },
]

// Sample notifications
const notifications: Notification[] = [
  {
    id: "notif1",
    userId: "user1",
    title: "Request Received",
    message: "Your request for Data Analyst has been received and is being reviewed.",
    type: "info",
    read: false,
    createdAt: new Date().toISOString(),
    actionUrl: "/dashboard/requests",
    relatedId: "req2",
  },
  {
    id: "notif2",
    userId: "user1",
    title: "Agent Approved",
    message: "Your request for Customer Support Agent has been approved.",
    type: "success",
    read: true,
    createdAt: new Date("2023-10-18").toISOString(),
    actionUrl: "/dashboard/agents/1",
    relatedId: "req1",
  },
  {
    id: "notif3",
    userId: "user2",
    title: "New Feature Available",
    message: "Check out the new features available in your AI agents.",
    type: "info",
    read: false,
    createdAt: new Date("2023-11-12").toISOString(),
    actionUrl: "/dashboard",
    relatedId: "",
  },
]

// Sample chat templates
const chatTemplates: ChatTemplate[] = [
  {
    id: "template1",
    title: "Introduction",
    content: "Hello, I'm looking for assistance with...",
    category: "General",
  },
  {
    id: "template2",
    title: "Technical Issue",
    content: "I'm experiencing a technical issue with... The error message says...",
    category: "Support",
  },
  {
    id: "template3",
    title: "Data Analysis Request",
    content: "I need to analyze the following data set: [Insert data description]. I'm looking to understand...",
    category: "Analytics",
    agentId: "3",
  },
  {
    id: "template4",
    title: "Content Request",
    content:
      "I need content for [platform] about [topic]. The target audience is [audience] and the tone should be [tone].",
    category: "Content",
    agentId: "2",
  },
]

/**
 * Get all agents
 */
export function getAllAgents(): Agent[] {
  return agents
}

/**
 * Get all agents (alias for getAllAgents for backward compatibility)
 */
export function getAgents(): Agent[] {
  return getAllAgents()
}

/**
 * Get featured agents (for homepage)
 */
export function getFeaturedAgents(): Agent[] {
  // Return a subset of agents for the featured section
  return agents.slice(0, 4)
}

/**
 * Get agent by ID
 */
export function getAgentById(id: string): Agent | undefined {
  return agents.find((agent) => agent.id === id)
}

/**
 * Get agent by slug
 */
export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((agent) => agent.slug === slug)
}

/**
 * Get agents by category
 */
export function getAgentsByCategory(category: string): Agent[] {
  return agents.filter((agent) => agent.category.toLowerCase() === category.toLowerCase())
}

/**
 * Get related agents (same category, excluding the current agent)
 */
export function getRelatedAgents(category: string, excludeId: string): Agent[] {
  return agents.filter((agent) => agent.category === category && agent.id !== excludeId).slice(0, 3)
}

/**
 * Get agent requests by user ID
 */
export function getAgentRequestsByUserId(userId: string): AgentRequest[] {
  return agentRequests.filter((request) => request.userId === userId)
}

/**
 * Get agent request by ID
 */
export function getAgentRequestById(requestId: string): AgentRequest | undefined {
  return agentRequests.find((request) => request.id === requestId)
}

/**
 * Get approved agents for a user
 * For Pro users, always include all agents
 */
export function getApprovedAgentsForUser(userId: string): Agent[] {
  // Get user subscription from localStorage if available
  let isPro = false
  if (typeof window !== "undefined") {
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}")
      isPro = userData.subscription === "pro" || userData.subscription === "enterprise"
    } catch (e) {
      console.error("Failed to parse user data", e)
    }
  }

  // For Pro users, return all agents
  if (isPro) {
    return agents
  }

  // Get approved agents from requests
  const approvedRequestAgentIds = agentRequests
    .filter((request) => request.userId === userId && request.status === "approved")
    .map((request) => request.agentId)

  return agents.filter((agent) => approvedRequestAgentIds.includes(agent.id))
}

/**
 * Get pending agent requests for a user
 */
export function getPendingAgentRequestsForUser(userId: string): AgentRequest[] {
  return agentRequests.filter((request) => request.userId === userId && request.status === "pending")
}

/**
 * Get quoted agent requests for a user
 */
export function getQuotedAgentRequestsForUser(userId: string): AgentRequest[] {
  return agentRequests.filter((request) => request.userId === userId && request.quote !== undefined)
}

/**
 * Get notifications for a user
 */
export function getNotificationsForUser(userId: string): Notification[] {
  return notifications.filter((notification) => notification.userId === userId)
}

/**
 * Get unread notifications count for a user
 */
export function getUnreadNotificationsCount(userId: string): number {
  return notifications.filter((notification) => notification.userId === userId && !notification.read).length
}

/**
 * Get chat templates
 */
export function getChatTemplates(agentId?: string): ChatTemplate[] {
  if (agentId) {
    return chatTemplates.filter((template) => template.agentId === undefined || template.agentId === agentId)
  }
  return chatTemplates
}

// Ensure formatPrice is exported
export function formatPrice(price: number | null): string {
  if (price === null) return "Custom"
  return (price / 100).toFixed(2)
}
