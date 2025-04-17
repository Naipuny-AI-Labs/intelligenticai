import type { Agent } from "./types"

/**
 * Generate a fallback response based on the agent's capabilities
 * @param agent The agent to generate a response for
 * @param question The user's question
 * @returns A fallback response
 */
export function generateFallbackResponse(agent: Agent, question: string): string {
  // Extract some keywords from the question
  const keywords = extractKeywords(question)

  // Get a random capability from the agent
  const capability = agent.capabilities[Math.floor(Math.random() * agent.capabilities.length)]

  // Generate responses based on the agent's capabilities and the question
  const responses = [
    `I can help you with ${capability.toLowerCase()}. What specific assistance do you need?`,
    `As an expert in ${capability.toLowerCase()}, I can provide guidance on this topic.`,
    `I'm analyzing your request related to ${capability.toLowerCase()}. Let me provide some insights.`,
    `Based on my capabilities in ${capability.toLowerCase()}, here's what I can suggest...`,
    `I'm designed to assist with ${capability.toLowerCase()}. Could you provide more details about your needs?`,
  ]

  // Return a random response
  return responses[Math.floor(Math.random() * responses.length)]
}

/**
 * Extract keywords from a question
 * @param question The question to extract keywords from
 * @returns An array of keywords
 */
function extractKeywords(question: string): string[] {
  // Simple keyword extraction - remove common words and punctuation
  const commonWords = [
    "a",
    "an",
    "the",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "to",
    "of",
    "and",
    "in",
    "that",
    "have",
    "it",
    "for",
    "not",
    "on",
    "with",
    "he",
    "she",
    "as",
    "you",
    "do",
    "at",
    "this",
    "but",
    "by",
    "from",
  ]

  return question
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .filter((word) => word.length > 2 && !commonWords.includes(word))
}

/**
 * Load conversation for an agent from localStorage
 * @param agentId The agent ID to load the conversation for
 * @returns The conversation messages
 */
export function loadConversation(agentId: string) {
  if (typeof window === "undefined") return []

  const storedConversation = localStorage.getItem(`conversation_${agentId}`)
  if (storedConversation) {
    try {
      return JSON.parse(storedConversation)
    } catch (e) {
      console.error("Failed to parse stored conversation:", e)
      return []
    }
  }
  return []
}

/**
 * Save conversation for an agent to localStorage
 * @param agentId The agent ID to save the conversation for
 * @param messages The conversation messages to save
 */
export function saveConversation(agentId: string, messages: any[]) {
  if (typeof window === "undefined") return

  localStorage.setItem(`conversation_${agentId}`, JSON.stringify(messages))
}

/**
 * Get the number of user messages in a conversation
 * @param messages The conversation messages
 * @returns The number of user messages
 */
export function getUserMessageCount(messages: any[]) {
  return messages.filter((m) => m.role === "user").length
}
