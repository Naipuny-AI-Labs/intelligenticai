"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Bot, ArrowRight, Zap, RefreshCw, Workflow } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FloatingParticles } from "@/components/ui/floating-particles"

export function WorkflowAutomation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const workflowSteps = [
    {
      title: "Data Collection",
      description: "Automatically gather data from multiple sources",
      icon: <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />,
      iconColor: "text-blue-500",
      delay: 0.2,
    },
    {
      title: "Processing",
      description: "Apply AI algorithms to analyze and transform data",
      icon: <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />,
      iconColor: "text-purple-500",
      delay: 0.4,
    },
    {
      title: "Automation",
      description: "Execute tasks based on predefined rules and triggers",
      icon: <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />,
      iconColor: "text-blue-500",
      delay: 0.6,
    },
    {
      title: "Integration",
      description: "Connect with your existing tools and workflows",
      icon: <Workflow className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />,
      iconColor: "text-green-500",
      delay: 0.8,
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-transparent" ref={containerRef}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-small-white/[0.2] -z-10" />
      <div className="absolute h-full w-full bg-gradient-to-b from-background/0 via-background/80 to-background pointer-events-none -z-10" />

      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm bg-transparent text-primary border border-primary/20 mb-3 sm:mb-4"
          >
            <Workflow className="mr-1 sm:mr-2 h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>Workflow Automation</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2 sm:mb-4"
          >
            Streamline Your Business Processes
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-muted-foreground"
          >
            Our AI agents work together to automate complex workflows, reducing manual effort and increasing efficiency
            across your organization.
          </motion.p>
        </div>

        <div className="relative">
          {/* Workflow visualization */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: step.delay }}
                className="backdrop-blur-sm bg-transparent border border-gray-200/50 dark:border-primary/10 rounded-xl p-4 sm:p-6 
                  hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              >
                {/* Connection lines between cards */}
                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full -translate-y-1/2 -translate-x-1/2 z-20 w-12 h-px">
                    <motion.div
                      className="h-0.5 bg-gray-200 dark:bg-gray-700 w-full"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.8, delay: step.delay + 0.3 }}
                    />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  </div>
                )}

                <div className="relative">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-transparent border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-3 sm:mb-4 relative z-10">
                    <div className={step.iconColor}>{step.icon}</div>
                  </div>
                  <FloatingParticles
                    className="absolute top-0 left-0 h-10 w-10 sm:h-12 sm:w-12"
                    quantity={6}
                    size={3}
                    speed={0.3}
                    color={index === 0 ? "#0ea5e9" : index === 1 ? "#8b5cf6" : index === 2 ? "#10b981" : "#f59e0b"}
                  />
                </div>

                <h3 className="text-base sm:text-lg md:text-xl font-medium mb-1 sm:mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-muted-foreground">{step.description}</p>

                {/* Step number indicator */}
                <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-transparent border border-gray-200 dark:border-gray-700 flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            viewport={{ once: true }}
            className="mt-6 sm:mt-8 md:mt-12 text-center"
          >
            <Button
              variant="outline"
              size="lg"
              className="text-xs sm:text-sm py-1.5 sm:py-2 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-transparent"
              asChild
            >
              <a href="/workflow-examples" className="flex items-center gap-1.5 sm:gap-2">
                View Workflow Examples
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
