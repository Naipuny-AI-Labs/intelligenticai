import Link from "next/link"
import { Bot, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Agent } from "@/lib/agents"

interface AgentCardProps {
  agent: Agent
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="bg-background border-2 border-gray-200 dark:border-gray-800 dark:bg-black/50 rounded-lg overflow-hidden hover:border-gray-300 dark:hover:border-gray-700 transition-all group shadow-sm">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-semibold text-lg">{agent.name}</h3>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 hover:bg-brand-primary/20"
          >
            {agent.category}
          </Badge>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4">{agent.description}</p>

        <div className="space-y-2 mb-4">
          {agent.capabilities.slice(0, 3).map((capability, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-brand-primary"></div>
              <span className="text-gray-500 dark:text-gray-400">{capability}</span>
            </div>
          ))}
          {agent.capabilities.length > 3 && (
            <div className="text-sm text-gray-500">+{agent.capabilities.length - 3} more capabilities</div>
          )}
        </div>

        <Button
          asChild
          className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 text-white"
        >
          <Link href={`/agents/${agent.id}`}>
            <Sparkles className="mr-2 h-4 w-4" />
            Try This Agent
          </Link>
        </Button>
      </div>
    </div>
  )
}
