import axios from "axios"
import { Agent } from "./types"

// You might want to get this from an environment variable in a real app
const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://api.aimarketplace.com"

export const apiClient = axios.create({
  baseURL: `${baseURL}/api/v1`,
  headers: {
    "Content-type": "application/json",
    "x-request-from": "internal",
  },
})

// Agent API functions
export const getAgentFromAPI = async (slug: string) => {
  try {
    const response = await apiClient.get(`/agent/${slug}`)
    return response.data
  } catch (error) {
    console.error("Error fetching agent:", error)
    return null
  }
}

export const getAllAgentsFromAPI = async (params?: Record<string, string>) => {
  try {
    const response = await apiClient.get("/agent", { params })
    return response.data
  } catch (error) {
    console.error("Error fetching agents:", error)
    return []
  }
}

export const getFeaturedAgentsFromAPI = async () => {
  try {
    const response = await apiClient.get("/agent", { params: { featured: "true" } })
    return response.data
  } catch (error) {
    console.error("Error fetching featured agents:", error)
    return []
  }
}

export const getAgentsByCategoryFromAPI = async (category: string) => {
  try {
    const response = await apiClient.get("/agent", { params: { category } })
    return response.data
  } catch (error) {
    console.error(`Error fetching agents by category ${category}:`, error)
    return []
  }
}

// Chatflow API functions
export const getChatflowFromAPI = async (slug: string) => {
  try {
    const response = await apiClient.get(`/chatflow/${slug}`)
    return response.data
  } catch (error) {
    console.error("Error fetching chatflow:", error)
    return null
  }
}

export const getAllChatflowsFromAPI = async (params?: Record<string, string>) => {
  try {
    const response = await apiClient.get("/chatflow", { params })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching chatflows:", error)
    return []
  }
}

export const getFeaturedChatflowsFromAPI = async () => {
  try {
    const response = await apiClient.get("/chatflow", { params: { featured: "true" } })
    return response.data
  } catch (error) {
    console.error("Error fetching featured chatflows:", error)
    return []
  }
}

export const getChatflowsByCategoryFromAPI = async (category: string) => {
  try {
    const response = await apiClient.get("/chatflow", { params: { category } })
    return response.data
  } catch (error) {
    console.error(`Error fetching chatflows by category ${category}:`, error)
    return []
  }
}

export default apiClient
