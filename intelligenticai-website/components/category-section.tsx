"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Bot, Code, FileText, BarChart, MessageSquare, Briefcase, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CategorySection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 relative bg-transparent">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 -z-10" />

      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full px-3 py-1 text-xs sm:text-sm bg-transparent text-primary border border-primary/20 mb-3 sm:mb-4"
          >
            <Bot className="mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>AI Categories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2 sm:mb-4"
          >
            Browse by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-muted-foreground"
          >
            Explore our diverse collection of AI agents categorized by their specialized capabilities and use cases
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              title: "Data Analysis",
              description: "Transform raw data into actionable insights with AI-powered analysis tools",
              icon: <BarChart className="h-4 w-4 sm:h-5 sm:w-5" />,
              color: "text-blue-500",
              iconBg: "bg-transparent",
              delay: 0.2,
              agents: ["Data Visualizer", "Trend Analyzer", "Anomaly Detector", "Forecasting Agent"],
            },
            {
              title: "Content Creation",
              description: "Generate high-quality content for various platforms and purposes",
              icon: <FileText className="h-4 w-4 sm:h-5 sm:w-5" />,
              color: "text-purple-500",
              iconBg: "bg-transparent",
              delay: 0.3,
              agents: ["Blog Writer", "Social Media Creator", "Email Composer", "Product Description Generator"],
            },
            {
              title: "Development",
              description: "Accelerate your development workflow with code generation and debugging",
              icon: <Code className="h-4 w-4 sm:h-5 sm:w-5" />,
              color: "text-green-500",
              iconBg: "bg-transparent",
              delay: 0.4,
              agents: ["Code Assistant", "Bug Finder", "API Generator", "Documentation Writer"],
            },
            {
              title: "Customer Support",
              description: "Enhance customer experience with intelligent support automation",
              icon: <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />,
              color: "text-yellow-500",
              iconBg: "bg-transparent",
              delay: 0.5,
              agents: ["Support Bot", "FAQ Assistant", "Ticket Classifier", "Sentiment Analyzer"],
            },
            {
              title: "Business Operations",
              description: "Streamline your business processes and increase operational efficiency",
              icon: <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />,
              color: "text-red-500",
              iconBg: "bg-transparent",
              delay: 0.6,
              agents: ["Meeting Summarizer", "Task Scheduler", "Process Automator", "Resource Allocator"],
            },
            {
              title: "Research & Innovation",
              description: "Accelerate research and generate innovative ideas with AI assistance",
              icon: <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5" />,
              color: "text-primary",
              iconBg: "bg-transparent",
              delay: 0.7,
              agents: ["Research Assistant", "Idea Generator", "Patent Analyzer", "Literature Reviewer"],
            },
          ].map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: category.delay }}
              viewport={{ once: true }}
              className="group backdrop-blur-sm bg-transparent border border-gray-200/50 dark:border-primary/10 rounded-xl p-4 sm:p-6 
                transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-primary/20"
            >
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div
                  className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full ${category.iconBg} border border-gray-200/70 dark:border-gray-700/70 flex items-center justify-center`}
                >
                  <div className={category.color}>{category.icon}</div>
                </div>
                <h3 className="text-lg sm:text-xl font-medium">{category.title}</h3>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 dark:text-muted-foreground mb-4 sm:mb-5">
                {category.description}
              </p>

              <div className="mb-4 sm:mb-5">
                <h4 className="text-xs sm:text-sm font-medium mb-2 flex items-center">
                  <Bot className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5 text-primary" />
                  Popular Agents:
                </h4>
                <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {category.agents.map((agent, i) => (
                    <li key={i} className="flex items-center text-xs sm:text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-600 mr-1.5"></div>
                      <span className="text-gray-600 dark:text-gray-400">{agent}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs sm:text-sm py-1.5 sm:py-2 border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 bg-transparent"
                asChild
              >
                <Link
                  href={`/marketplace?category=${category.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center justify-center"
                >
                  View All
                  <ArrowRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
