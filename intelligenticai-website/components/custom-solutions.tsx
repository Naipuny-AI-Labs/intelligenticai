"use client"

import { motion } from "framer-motion"
import { Bot, Code, Sparkles, Zap, Settings, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SpotlightCard } from "@/components/ui/spotlight-card"

export function CustomSolutions() {
  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-white dark:bg-transparent">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-small-white/[0.2] -z-10" />
      <div className="absolute h-full w-full bg-gradient-to-b from-background/80 via-background/95 to-background pointer-events-none -z-10" />

      <div className="container px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm bg-brand-primary/10 text-brand-primary border border-brand-primary/20 mb-3 sm:mb-4">
              <Sparkles className="mr-1 sm:mr-2 h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>Custom Solutions</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2 sm:mb-4">
              Tailored AI Agents for Your Unique Needs
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-muted-foreground mb-4 sm:mb-6">
              We understand that every business has unique challenges. Our platform allows you to customize AI agents or
              build entirely new ones to address your specific requirements.
            </p>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-brand-primary/10 flex items-center justify-center mt-0.5 sm:mt-1">
                  <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-medium">No-Code Customization</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-muted-foreground">
                    Easily customize existing agents without writing a single line of code
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3">
                <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-brand-primary/10 flex items-center justify-center mt-0.5 sm:mt-1">
                  <Code className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-medium">Developer API</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-muted-foreground">
                    Full access to our API for developers who want complete control
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3">
                <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-brand-primary/10 flex items-center justify-center mt-0.5 sm:mt-1">
                  <Settings className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-medium">Enterprise Integration</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-muted-foreground">
                    Seamlessly integrate with your existing enterprise systems
                  </p>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="text-xs sm:text-sm py-1.5 sm:py-2 border-2 border-gray-200 dark:border-primary/20 hover:border-brand-primary/40"
              asChild
            >
              <a href="/custom-solutions" className="flex items-center gap-1.5 sm:gap-2">
                Learn More About Custom Solutions
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            <SpotlightCard className="col-span-1 row-span-1 p-4 sm:p-6 bg-white dark:bg-secondary/50 backdrop-blur-sm border-2 border-gray-200 dark:border-primary/10 rounded-xl hover:border-brand-primary/30 transition-all duration-300 shadow-sm">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-50 dark:bg-background flex items-center justify-center mb-3 sm:mb-4">
                <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-brand-primary" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-medium mb-1 sm:mb-2">Custom Chatbots</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-muted-foreground">
                Build conversational agents trained on your specific knowledge base and brand voice
              </p>
            </SpotlightCard>

            <SpotlightCard className="col-span-1 row-span-1 p-4 sm:p-6 bg-white dark:bg-secondary/50 backdrop-blur-sm border-2 border-gray-200 dark:border-primary/10 rounded-xl hover:border-brand-primary/30 transition-all duration-300 shadow-sm">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-50 dark:bg-background flex items-center justify-center mb-3 sm:mb-4">
                <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-medium mb-1 sm:mb-2">Data Analysis</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-muted-foreground">
                Create agents that analyze your specific data formats and generate insights
              </p>
            </SpotlightCard>

            <SpotlightCard className="col-span-1 row-span-1 p-4 sm:p-6 bg-white dark:bg-secondary/50 backdrop-blur-sm border-2 border-gray-200 dark:border-primary/10 rounded-xl hover:border-brand-primary/30 transition-all duration-300 shadow-sm">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-50 dark:bg-background flex items-center justify-center mb-3 sm:mb-4">
                <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-medium mb-1 sm:mb-2">Process Automation</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-muted-foreground">
                Automate your unique business processes with custom workflow agents
              </p>
            </SpotlightCard>

            <SpotlightCard className="col-span-1 row-span-1 p-4 sm:p-6 bg-white dark:bg-secondary/50 backdrop-blur-sm border-2 border-gray-200 dark:border-primary/10 rounded-xl hover:border-brand-primary/30 transition-all duration-300 shadow-sm">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-50 dark:bg-background flex items-center justify-center mb-3 sm:mb-4">
                <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-medium mb-1 sm:mb-2">Content Creation</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-muted-foreground">
                Design agents that generate content aligned with your brand guidelines
              </p>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
