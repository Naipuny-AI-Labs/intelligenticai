import {
  getAgentFromAPI,
  getAllAgentsFromAPI,
  getFeaturedAgentsFromAPI,
  getAgentsByCategoryFromAPI,
  getChatflowFromAPI,
  getAllChatflowsFromAPI,
  getFeaturedChatflowsFromAPI,
  getChatflowsByCategoryFromAPI,
} from "./api-client"
import type { Agent } from "./types"

// Agent functions
export async function getAgent(slug: string): Promise<Agent | null> {
  try {
    const agent = await getAgentFromAPI(slug)
    return agent
  } catch (error) {
    console.error(`Error fetching agent ${slug}:`, error)
    return null
  }
}

export async function getAllAgents(params?: Record<string, string>): Promise<Agent[]> {
  try {
    const apiAgents = await getAllAgentsFromAPI(params)
    return apiAgents
  } catch (error) {
    console.error("Error fetching all agents:", error)
    return []
  }
}

export async function getFeaturedAgents(): Promise<Agent[]> {
  try {
    const featuredAgents = await getFeaturedAgentsFromAPI()
    return featuredAgents
  } catch (error) {
    console.error("Error fetching featured agents:", error)
    return []
  }
}

export async function getAgentsByCategory(category: string): Promise<Agent[]> {
  try {
    const categoryAgents = await getAgentsByCategoryFromAPI(category)
    return categoryAgents
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

export async function getRelatedAgents(category: string, excludeId: string): Promise<Agent[]> {
  try {
    const categoryAgents = await getAgentsByCategory(category)
    return categoryAgents.filter((agent) => agent.id !== excludeId).slice(0, 3)
  } catch (error) {
    console.error("Error fetching related agents:", error)
    return []
  }
}

// Chatflow functions
export async function getChatflow(slug: string): Promise<Agent | null> {
  try {
    const chatflow = await getChatflowFromAPI(slug)
    return chatflow
  } catch (error) {
    console.error(`Error fetching chatflow ${slug}:`, error)
    return null
  }
}

export async function getAllChatflows(params?: Record<string, string>): Promise<Agent[]> {
  try {
    const apiChatflows = await getAllChatflowsFromAPI(params)
    return apiChatflows
  } catch (error) {
    console.error("Error fetching all chatflows:", error)
    return []
  }
}

export async function getFeaturedChatflows(): Promise<Agent[]> {
  try {
    const featuredChatflows = await getFeaturedChatflowsFromAPI()
    return featuredChatflows
  } catch (error) {
    console.error("Error fetching featured chatflows:", error)
    return []
  }
}

export async function getChatflowsByCategory(category: string): Promise<Agent[]> {
  try {
    const categoryChatflows = await getChatflowsByCategoryFromAPI(category)
    return categoryChatflows
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

export async function getRelatedChatflows(category: string, excludeId: string): Promise<Agent[]> {
  try {
    const categoryChatflows = await getChatflowsByCategory(category)
    return categoryChatflows.filter((chatflow) => chatflow.id !== excludeId).slice(0, 3)
  } catch (error) {
    console.error("Error fetching related chatflows:", error)
    return []
  }
}

// Shared functions
export async function getCategories(): Promise<string[]> {
  try {
    const allAgents = await getAllAgents()
    const allChatflows = await getAllChatflows()
    const categories = new Set([
      ...allAgents.map((agent) => agent.category),
      ...allChatflows.map((chatflow) => chatflow.category)
    ])
    return Array.from(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}
