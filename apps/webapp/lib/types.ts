export interface Agent {
  id: string
  slug: string
  name: string
  description: string
  category: string
  capabilities: string[]
  status?: "requested" | "approved" | "denied" // Status of user's request for this agent
  requestDate?: string
  approvalDate?: string
  analytics?: AgentAnalytics
  integrations?: AgentIntegration[]
}

export interface AgentAnalytics {
  totalMessages: number
  averageResponseTime: number // in milliseconds
  userSatisfactionRate: number // 0-100
  topQueries: string[]
  usageByDay: { date: string; count: number }[]
  usageByHour: { hour: number; count: number }[]
}

export interface User {
  id: string
  name: string
  email: string
  company: string
  role: string
  image?: string
  requestedAgents?: string[] // IDs of agents the user has requested
  approvedAgents?: string[] // IDs of agents the user has been approved for
  subscription?: "trial" | "pro" | "enterprise"
}

export interface AgentRequest {
  id: string
  userId: string
  agentId: string
  companyName: string
  useCase: string
  expectedVolume: string
  status: "pending" | "approved" | "denied"
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: string
  attachments?: Attachment[]
  reactions?: Reaction[]
  read?: boolean
}

export interface Attachment {
  id: string
  type: "image" | "file" | "audio" | "video"
  url: string
  name: string
  size: number
  thumbnailUrl?: string
}

export interface Reaction {
  emoji: string
  userId: string
  timestamp: string
}

export interface Conversation {
  id: string
  agentId: string
  userId: string
  messages: Message[]
  createdAt: string
  updatedAt: string
  title?: string
  summary?: string
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error" | "request"
  read: boolean
  createdAt: string
  actionUrl?: string
  relatedId?: string // ID of related entity
}

export interface ChatTemplate {
  id: string
  title: string
  content: string
  category: string
  agentId?: string // If specific to an agent
}

// New integration types
export interface AgentIntegration {
  id: string
  agentId: string
  type: IntegrationType
  name: string
  config: IntegrationConfig
  status: "active" | "inactive" | "error"
  lastSynced?: string
  createdAt: string
  updatedAt: string
  error?: string
}

export type IntegrationType = "database" | "api" | "webhook" | "cloud_storage" | "messaging" | "crm" | "custom"

export interface IntegrationConfig {
  type: IntegrationType
  name: string
  credentials: Record<string, string>
  settings: Record<string, any>
  metadata?: Record<string, any>
}

export interface IntegrationTemplate {
  id: string
  type: IntegrationType
  name: string
  description: string
  icon: string
  requiredCredentials: string[]
  optionalCredentials: string[]
  defaultSettings: Record<string, any>
  documentation: string
}
