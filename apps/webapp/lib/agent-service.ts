import type { Agent, AgentIntegration, IntegrationType, IntegrationConfig } from "./types"

class AgentService {
  private static instance: AgentService
  private cache: Map<string, any> = new Map()
  private cacheExpiry: Map<string, number> = new Map()
  private cacheTTL = 5 * 60 * 1000 // 5 minutes

  private constructor() {}

  public static getInstance(): AgentService {
    if (!AgentService.instance) {
      AgentService.instance = new AgentService()
    }
    return AgentService.instance
  }

  private isCacheValid(key: string): boolean {
    const expiry = this.cacheExpiry.get(key)
    return expiry !== undefined && expiry > Date.now()
  }

  private setCacheItem(key: string, value: any): void {
    this.cache.set(key, value)
    this.cacheExpiry.set(key, Date.now() + this.cacheTTL)
  }

  private clearCache(): void {
    this.cache.clear()
    this.cacheExpiry.clear()
  }

  private clearCacheForAgent(agentId: string): void {
    // Clear all cache entries related to this agent
    for (const key of this.cache.keys()) {
      if (key.includes(agentId)) {
        this.cache.delete(key)
        this.cacheExpiry.delete(key)
      }
    }
  }

  // Get all agents for a user based on subscription
  public async getAgentsForUser(userId: string, subscription: "trial" | "pro" | "enterprise"): Promise<Agent[]> {
    const cacheKey = `agents_${userId}_${subscription}`

    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate it
      await new Promise((resolve) => setTimeout(resolve, 500))

      let agents: Agent[]

      if (subscription === "trial") {
        // Trial users get only one agent
        agents = [
          {
            id: "1",
            slug: "customer-support-agent",
            name: "Customer Support Agent",
            description: "AI assistant that helps with customer inquiries and support tickets.",
            category: "Support",
            capabilities: ["Answer FAQs", "Troubleshoot issues", "Escalate to human"],
          },
        ]
      } else {
        // Premium users get all agents
        agents = [
          {
            id: "1",
            slug: "customer-support-agent",
            name: "Customer Support Agent",
            description: "AI assistant that helps with customer inquiries and support tickets.",
            category: "Support",
            capabilities: ["Answer FAQs", "Troubleshoot issues", "Escalate to human"],
          },
          {
            id: "2",
            slug: "content-writer",
            name: "Content Writer",
            description: "AI that generates blog posts, social media content, and marketing copy.",
            category: "Content",
            capabilities: ["Blog writing", "Social media posts", "Email newsletters"],
          },
          {
            id: "3",
            slug: "data-analyst",
            name: "Data Analyst",
            description: "AI that analyzes data and provides insights and visualizations.",
            category: "Analytics",
            capabilities: ["Data analysis", "Chart generation", "Trend identification"],
          },
        ]
      }

      this.setCacheItem(cacheKey, agents)
      return agents
    } catch (error) {
      console.error("Error fetching agents:", error)
      throw new Error("Failed to fetch agents")
    }
  }

  // Get agent by ID
  public async getAgent(agentId: string): Promise<Agent> {
    const cacheKey = `agent_${agentId}`

    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate it
      await new Promise((resolve) => setTimeout(resolve, 300))

      const agent: Agent = {
        id: agentId,
        slug: agentId === "1" ? "customer-support-agent" : agentId === "2" ? "content-writer" : "data-analyst",
        name: agentId === "1" ? "Customer Support Agent" : agentId === "2" ? "Content Writer" : "Data Analyst",
        description:
          agentId === "1"
            ? "AI assistant that helps with customer inquiries and support tickets."
            : agentId === "2"
              ? "AI that generates blog posts, social media content, and marketing copy."
              : "AI that analyzes data and provides insights and visualizations.",
        category: agentId === "1" ? "Support" : agentId === "2" ? "Content" : "Analytics",
        capabilities:
          agentId === "1"
            ? ["Answer FAQs", "Troubleshoot issues", "Escalate to human"]
            : agentId === "2"
              ? ["Blog writing", "Social media posts", "Email newsletters"]
              : ["Data analysis", "Chart generation", "Trend identification"],
      }

      this.setCacheItem(cacheKey, agent)
      return agent
    } catch (error) {
      console.error(`Error fetching agent ${agentId}:`, error)
      throw new Error(`Failed to fetch agent ${agentId}`)
    }
  }

  // Get integrations for an agent
  public async getAgentIntegrations(agentId: string): Promise<AgentIntegration[]> {
    const cacheKey = `integrations_${agentId}`

    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate it
      await new Promise((resolve) => setTimeout(resolve, 400))

      // Simulate some integrations
      const integrations: AgentIntegration[] = []

      // Only add integrations for certain agents
      if (agentId === "1") {
        integrations.push({
          id: "int_1",
          agentId,
          type: "database",
          name: "Customer Database",
          config: {
            type: "database",
            name: "Customer Database",
            credentials: {
              connectionString: "***********",
            },
            settings: {
              tableName: "customers",
              refreshInterval: 3600,
            },
          },
          status: "active",
          lastSynced: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      }

      if (agentId === "2") {
        integrations.push({
          id: "int_2",
          agentId,
          type: "api",
          name: "Content API",
          config: {
            type: "api",
            name: "Content API",
            credentials: {
              apiKey: "***********",
            },
            settings: {
              endpoint: "https://api.example.com/content",
              headers: {
                "Content-Type": "application/json",
              },
            },
          },
          status: "error",
          error: "API key expired",
          lastSynced: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      }

      this.setCacheItem(cacheKey, integrations)
      return integrations
    } catch (error) {
      console.error(`Error fetching integrations for agent ${agentId}:`, error)
      throw new Error(`Failed to fetch integrations for agent ${agentId}`)
    }
  }

  // Add integration to an agent
  public async addIntegration(agentId: string, config: IntegrationConfig): Promise<boolean> {
    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate it
      await new Promise((resolve) => setTimeout(resolve, 600))

      // Clear cache for this agent
      this.clearCacheForAgent(agentId)

      return true
    } catch (error) {
      console.error(`Error adding integration to agent ${agentId}:`, error)
      throw new Error(`Failed to add integration to agent ${agentId}`)
    }
  }

  // Update integration
  public async updateIntegration(integrationId: string, updates: Partial<AgentIntegration>): Promise<AgentIntegration> {
    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate it
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Simulate getting the current integration
      const currentIntegration: AgentIntegration = {
        id: integrationId,
        agentId: updates.agentId || "1",
        type: updates.type || "database",
        name: updates.name || "Integration",
        config: updates.config || {
          type: "database",
          name: "Database",
          credentials: {},
          settings: {},
        },
        status: updates.status || "active",
        lastSynced: updates.lastSynced || new Date().toISOString(),
        createdAt: updates.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Clear cache for this agent
      if (currentIntegration.agentId) {
        this.clearCacheForAgent(currentIntegration.agentId)
      }

      return currentIntegration
    } catch (error) {
      console.error(`Error updating integration ${integrationId}:`, error)
      throw new Error(`Failed to update integration ${integrationId}`)
    }
  }

  // Delete integration
  public async removeIntegration(integrationId: string, agentId: string): Promise<boolean> {
    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate it
      await new Promise((resolve) => setTimeout(resolve, 400))

      // Clear cache for this agent
      this.clearCacheForAgent(agentId)

      return true
    } catch (error) {
      console.error(`Error deleting integration ${integrationId}:`, error)
      throw new Error(`Failed to delete integration ${integrationId}`)
    }
  }

  // Test integration connection
  public async testIntegration(
    type: IntegrationType,
    config: IntegrationConfig,
  ): Promise<{ success: boolean; message: string }> {
    try {
      // In a real implementation, this would test the actual connection
      // For now, we'll simulate it
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Randomly succeed or fail for demo purposes
      const success = Math.random() > 0.3

      return {
        success,
        message: success ? "Connection successful" : "Failed to connect. Please check your credentials.",
      }
    } catch (error) {
      console.error(`Error testing integration:`, error)
      return {
        success: false,
        message: "An error occurred while testing the connection.",
      }
    }
  }
}

export const agentService = AgentService.getInstance()
