import { NextResponse } from "next/server"
import { agents } from "@/lib/agents"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug

  // Find the agent by slug
  const agent = agents.find((a) => a.slug === slug)

  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 })
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(agent)
}
