"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Bot, BrainCircuit, Briefcase, Code, HeartPulse, LineChart, MessageSquare, Palette } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const categories = [
  {
    name: "Productivity",
    description: "Automate tasks and boost your efficiency",
    icon: <Briefcase className="h-6 w-6" />,
    href: "/categories/productivity",
    color: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    name: "Creative",
    description: "Generate content and creative assets",
    icon: <Palette className="h-6 w-6" />,
    href: "/categories/creative",
    color: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    name: "Data Analysis",
    description: "Process and visualize complex data",
    icon: <LineChart className="h-6 w-6" />,
    href: "/categories/data-analysis",
    color: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    name: "Customer Service",
    description: "Engage with customers 24/7",
    icon: <MessageSquare className="h-6 w-6" />,
    href: "/categories/customer-service",
    color: "bg-yellow-500/10",
    iconColor: "text-yellow-500",
  },
  {
    name: "Development",
    description: "Code assistance and debugging",
    icon: <Code className="h-6 w-6" />,
    href: "/categories/development",
    color: "bg-red-500/10",
    iconColor: "text-red-500",
  },
  {
    name: "Healthcare",
    description: "Medical assistance and health tracking",
    icon: <HeartPulse className="h-6 w-6" />,
    href: "/categories/healthcare",
    color: "bg-pink-500/10",
    iconColor: "text-pink-500",
  },
  {
    name: "Research",
    description: "Analyze papers and research data",
    icon: <BrainCircuit className="h-6 w-6" />,
    href: "/categories/research",
    color: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
  },
  {
    name: "Custom",
    description: "Build your own specialized agent",
    icon: <Bot className="h-6 w-6" />,
    href: "/categories/custom",
    color: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
]

export function CategorySection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Browse by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of AI agents categorized by their specialized capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={category.href} className="block h-full">
                <Card className="h-full border-2 hover:border-primary/50 transition-all duration-200 hover:shadow-md">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 ${category.color}`}>
                      <div className={category.iconColor}>{category.icon}</div>
                    </div>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      <span className="text-primary font-medium">Explore</span> {category.name.toLowerCase()} agents
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
