import {
  getAllAgentsFromAPI,
  getFeaturedAgentsFromAPI,
  getAgentsByCategoryFromAPI,
  getAgentFromAPI,
  getAllChatflowsFromAPI,
  getFeaturedChatflowsFromAPI,
  getChatflowsByCategoryFromAPI,
  getChatflowFromAPI
} from "./api-client"
import type { Agent } from "./types"

// Agent functions
export async function getAllAgents(): Promise<Agent[]> {
  try {
    const agents = await getAllAgentsFromAPI()
    return agents
  } catch (error) {
    console.error("Error fetching all agents:", error)
    return []
  }
}

export async function getFeaturedAgents(): Promise<Agent[]> {
  try {
    return await getFeaturedAgentsFromAPI()
  } catch (error) {
    console.error("Error fetching featured agents:", error)
    return []
  }
}

export async function getPopularAgents(): Promise<Agent[]> {
  try {
    const agents = await getAllAgentsFromAPI()
    return agents.filter((agent: Agent) => agent.metadata.popular)
  } catch (error) {
    console.error("Error fetching popular agents:", error)
    return []
  }
}

export async function getNewAgents(): Promise<Agent[]> {
  try {
    const agents = await getAllAgentsFromAPI()
    return agents.filter((agent: Agent) => agent.metadata.new)
  } catch (error) {
    console.error("Error fetching new agents:", error)
    return []
  }
}

export async function getAgentsByCategory(category: string): Promise<Agent[]> {
  try {
    return await getAgentsByCategoryFromAPI(category)
  } catch (error) {
    console.error(`Error fetching agents by category ${category}:`, error)
    return []
  }
}

export async function getAgentBySlug(slug: string): Promise<Agent | null> {
  try {
    return await getAgentFromAPI(slug)
  } catch (error) {
    console.error(`Error fetching agent with slug ${slug}:`, error)
    return null
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const agents = await getAllAgentsFromAPI()
    const categories = new Set(agents.map((agent: Agent) => agent.category))
    return Array.from(categories) as string[]
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getRelatedAgents(category: string, excludeId: string): Promise<Agent[]> {
  try {
    const agents = await getAgentsByCategoryFromAPI(category)
    return agents.filter((agent: Agent) => agent.id !== excludeId).slice(0, 3)
  } catch (error) {
    console.error(`Error fetching related agents for category ${category}:`, error)
    return []
  }
}

// Chatflow functions
export async function getAllChatflows(): Promise<Agent[]> {
  try {
    const chatflows = await getAllChatflowsFromAPI()
    return chatflows
  } catch (error) {
    console.error("Error fetching all chatflows:", error)
    return []
  }
}

export async function getFeaturedChatflows(): Promise<Agent[]> {
  try {
    return await getFeaturedChatflowsFromAPI()
  } catch (error) {
    console.error("Error fetching featured chatflows:", error)
    return []
  }
}

export async function getPopularChatflows(): Promise<Agent[]> {
  try {
    const chatflows = await getAllChatflowsFromAPI()
    return chatflows.filter((chatflow: Agent) => chatflow.metadata.popular)
  } catch (error) {
    console.error("Error fetching popular chatflows:", error)
    return []
  }
}

export async function getNewChatflows(): Promise<Agent[]> {
  try {
    const chatflows = await getAllChatflowsFromAPI()
    return chatflows.filter((chatflow: Agent) => chatflow.metadata.new)
  } catch (error) {
    console.error("Error fetching new chatflows:", error)
    return []
  }
}

export async function getChatflowsByCategory(category: string): Promise<Agent[]> {
  try {
    return await getChatflowsByCategoryFromAPI(category)
  } catch (error) {
    console.error(`Error fetching chatflows by category ${category}:`, error)
    return []
  }
}

export async function getChatflowBySlug(slug: string): Promise<Agent | null> {
  try {
    return await getChatflowFromAPI(slug)
  } catch (error) {
    console.error(`Error fetching chatflow with slug ${slug}:`, error)
    return null
  }
}

export async function getChatflowCategories(): Promise<string[]> {
  try {
    const chatflows = await getAllChatflowsFromAPI()
    const categories = new Set(chatflows.map((chatflow: Agent) => chatflow.category))
    return Array.from(categories) as string[]
  } catch (error) {
    console.error("Error fetching chatflow categories:", error)
    return []
  }
}

export async function getRelatedChatflows(category: string, excludeId: string): Promise<Agent[]> {
  try {
    const chatflows = await getChatflowsByCategoryFromAPI(category)
    return chatflows.filter((chatflow: Agent) => chatflow.id !== excludeId).slice(0, 3)
  } catch (error) {
    console.error(`Error fetching related chatflows for category ${category}:`, error)
    return []
  }
}
