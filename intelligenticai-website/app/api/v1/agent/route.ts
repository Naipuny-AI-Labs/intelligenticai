import { NextResponse } from "next/server"
import { agents } from "@/lib/agents"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Parse query parameters
  const featured = searchParams.get("featured")
  const category = searchParams.get("category")
  const popular = searchParams.get("popular")
  const isNew = searchParams.get("new")

  // Filter agents based on query parameters
  let filteredAgents = [...agents]

  if (featured === "true") {
    filteredAgents = filteredAgents.filter((agent) => agent.featured || agent.metadata?.featured)
  }

  if (category) {
    filteredAgents = filteredAgents.filter((agent) => agent.category === category)
  }

  if (popular === "true") {
    filteredAgents = filteredAgents.filter((agent) => agent.popular || agent.metadata?.popular)
  }

  if (isNew === "true") {
    filteredAgents = filteredAgents.filter((agent) => agent.new || agent.metadata?.new)
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(filteredAgents)
}
