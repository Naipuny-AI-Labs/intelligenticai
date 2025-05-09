"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight, Bot, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card3d, Card3dShine } from "@/components/ui/3d-card"
import { Badge } from "@/components/ui/badge"

export function FeaturedAgents() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Sample featured agents data
  const featuredAgents = [
    {
      id: "data-analyzer",
      name: "Data Analyzer",
      category: "Data Analysis",
      description:
        "Transform raw data into actionable insights with advanced analytics and visualization capabilities.",
      capabilities: [
        "Pattern recognition",
        "Anomaly detection",
        "Trend analysis",
        "Data visualization",
        "Predictive analytics",
      ],
    },
    {
      id: "content-creator",
      name: "Content Creator",
      category: "Content Generation",
      description:
        "Generate high-quality content for blogs, social media, and marketing materials tailored to your brand voice.",
      capabilities: [
        "Blog writing",
        "Social media posts",
        "Email newsletters",
        "Product descriptions",
        "SEO optimization",
      ],
    },
    {
      id: "customer-support",
      name: "Customer Support",
      category: "Customer Service",
      description: "Provide 24/7 customer support with intelligent responses and seamless human handoff when needed.",
      capabilities: [
        "FAQ answering",
        "Ticket classification",
        "Sentiment analysis",
        "Multi-language support",
        "Human handoff",
      ],
    },
    {
      id: "code-assistant",
      name: "Code Assistant",
      category: "Development",
      description: "Accelerate development with code generation, debugging assistance, and documentation creation.",
      capabilities: ["Code generation", "Bug detection", "Code optimization", "Documentation", "API integration"],
    },
    {
      id: "research-assistant",
      name: "Research Assistant",
      category: "Research",
      description:
        "Conduct comprehensive research, summarize findings, and identify key insights across various sources.",
      capabilities: [
        "Literature review",
        "Data collection",
        "Source verification",
        "Summary generation",
        "Citation management",
      ],
    },
    {
      id: "workflow-automator",
      name: "Workflow Automator",
      category: "Automation",
      description: "Streamline business processes by automating repetitive tasks and creating efficient workflows.",
      capabilities: [
        "Process mapping",
        "Task automation",
        "Integration",
        "Performance tracking",
        "Bottleneck identification",
      ],
    },
  ]

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -current.clientWidth / 2 : current.clientWidth / 2
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-muted/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-small-white/[0.2] -z-10" />
      <div className="absolute h-full w-full bg-gradient-to-b from-background/0 via-background/0 to-background/80 pointer-events-none -z-10" />

      <div className="container px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 md:mb-10 gap-3 sm:gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-foreground dark:to-foreground/70">
              Featured Agents
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-muted-foreground mt-1 sm:mt-2">
              Discover our most popular and powerful AI agents
            </p>
          </motion.div>
          <div className="flex items-center gap-2 mt-3 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-gray-200 hover:border-brand-primary hover:bg-brand-primary/10 hover:text-brand-primary transition-colors"
            >
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-gray-200 hover:border-brand-primary hover:bg-brand-primary/10 hover:text-brand-primary transition-colors"
            >
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button variant="ghost" asChild className="group text-xs sm:text-sm">
              <Link href="/agents" className="flex items-center gap-1">
                View all
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
        >
          {featuredAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              className="min-w-[250px] xs:min-w-[280px] sm:min-w-[320px] md:min-w-[350px] snap-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card3d containerClassName="h-full">
                <div className="bg-white dark:bg-background border-2 border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden h-full p-4 sm:p-6 relative">
                  <Card3dShine />

                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 300 }}>
                      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                        <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                    </motion.div>
                    <h3 className="font-semibold text-base sm:text-lg">{agent.name}</h3>
                  </div>

                  <div className="mb-3 sm:mb-4 flex flex-wrap gap-1.5 sm:gap-2">
                    <Badge
                      variant="secondary"
                      className="text-xs px-2 py-0.5 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 hover:bg-brand-primary/20"
                    >
                      {agent.category}
                    </Badge>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-muted-foreground line-clamp-3 mb-3 sm:mb-4">
                    {agent.description}
                  </p>

                  <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                    {agent.capabilities.slice(0, 3).map((capability, index) => (
                      <div key={index} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                        <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-brand-primary"></div>
                        <span className="text-gray-600 dark:text-muted-foreground">{capability}</span>
                      </div>
                    ))}
                    {agent.capabilities.length > 3 && (
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-muted-foreground">
                        +{agent.capabilities.length - 3} more capabilities
                      </div>
                    )}
                  </div>

                  <Button
                    className="w-full mt-auto text-xs sm:text-sm py-1.5 sm:py-2 bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 text-white shadow-sm group-hover:shadow-md transition-all"
                    asChild
                  >
                    <Link href={`/agents/${agent.id}`}>
                      <Sparkles className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Try This Agent
                    </Link>
                  </Button>
                </div>
              </Card3d>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
