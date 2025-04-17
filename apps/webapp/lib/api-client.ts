// API client for making requests to the backend
import { generateFallbackResponse } from "./chat-utils"
import type { Agent } from "./types"

/**
 * Base API client for making requests
 */
export const apiClient = {
  async get(url: string, options = {}) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  },

  async post(url: string, data: any, options = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  },
}

/**
 * Chat API client for interacting with the AI agents
 */
export const chatApi = {
  /**
   * Send a message to the AI agent and get a response
   * @param question The user's message
   * @param agent Optional agent object for fallback responses
   * @returns The AI's response
   */
  async sendMessage(question: string, agent?: Agent) {
    try {
      const response = await fetch("http://localhost:3000/api/v1/prediction/85466257-62d6-4e63-a4ef-f91a75bed0b7", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error sending message to API:", error)

      // If agent is provided, generate a fallback response
      if (agent) {
        return {
          response: generateFallbackResponse(agent, question),
        }
      }

      throw error
    }
  },
}
