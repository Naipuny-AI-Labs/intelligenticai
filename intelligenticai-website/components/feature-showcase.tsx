"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Zap, BarChart, MessageSquare, FileText, Code } from "lucide-react"
import { cn } from "@/lib/utils"

export function FeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      title: "Natural Language Processing",
      description:
        "Our AI agents understand and respond to natural language, making interaction intuitive and efficient.",
      icon: <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />,
      color: "text-brand-primary",
      bgColor: "bg-brand-primary/10",
      showcase: (
        <div className="bg-white dark:bg-background/80 backdrop-blur-sm border-2 border-gray-200 dark:border-primary/20 rounded-lg p-3 sm:p-4 h-full shadow-sm">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex gap-2 sm:gap-3">
              <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gray-100 dark:bg-secondary/10 flex items-center justify-center shrink-0">
                <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-brand-secondary" />
              </div>
              <div className="bg-gray-50 dark:bg-muted/50 rounded-lg p-2 sm:p-3 text-xs sm:text-sm">
                How can I analyze the customer feedback data from last quarter?
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3 justify-end">
              <div className="bg-brand-primary/10 rounded-lg p-2 sm:p-3 text-xs sm:text-sm">
                I'll analyze your customer feedback data. I can identify common themes, sentiment trends, and highlight
                key areas for improvement.
              </div>
              <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-brand-primary" />
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gray-100 dark:bg-secondary/10 flex items-center justify-center shrink-0">
                <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-brand-secondary" />
              </div>
              <div className="bg-gray-50 dark:bg-muted/50 rounded-lg p-2 sm:p-3 text-xs sm:text-sm">
                Great, can you also compare it to the previous quarter?
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Data Analysis & Visualization",
      description: "Transform raw data into actionable insights with powerful analysis and visualization capabilities.",
      icon: <BarChart className="h-5 w-5 sm:h-6 sm:w-6" />,
      color: "text-brand-secondary",
      bgColor: "bg-brand-secondary/10",
      showcase: (
        <div className="bg-white dark:bg-background/80 backdrop-blur-sm border-2 border-gray-200 dark:border-primary/20 rounded-lg p-3 sm:p-4 h-full shadow-sm">
          <div className="space-y-3 sm:space-y-4">
            <div className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">Customer Satisfaction Trends</div>
            <div className="h-24 sm:h-32 flex items-end gap-1 sm:gap-2">
              {[65, 70, 62, 80, 75, 90].map((value, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5 sm:gap-1">
                  <div
                    className="w-full bg-gradient-to-t from-brand-primary/50 to-brand-secondary/50 rounded-t"
                    style={{ height: `${value}%` }}
                  ></div>
                  <div className="text-[10px] sm:text-xs text-gray-500 dark:text-muted-foreground">Q{i + 1}</div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 dark:bg-muted/30 rounded-lg p-2 sm:p-3 text-xs sm:text-sm">
              <div className="font-medium mb-1">Key Insights:</div>
              <ul className="list-disc list-inside text-[10px] sm:text-xs space-y-0.5 sm:space-y-1 text-gray-500 dark:text-muted-foreground">
                <li>90% satisfaction in Q6 (15% increase from Q5)</li>
                <li>Consistent upward trend since Q4</li>
                <li>Lowest point in Q3 correlated with product changes</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Content Generation",
      description: "Create high-quality content for various purposes, from marketing copy to technical documentation.",
      icon: <FileText className="h-5 w-5 sm:h-6 sm:w-6" />,
      color: "text-brand-primary",
      bgColor: "bg-brand-primary/10",
      showcase: (
        <div className="bg-white dark:bg-background/80 backdrop-blur-sm border-2 border-gray-200 dark:border-primary/20 rounded-lg p-3 sm:p-4 h-full shadow-sm">
          <div className="space-y-3 sm:space-y-4">
            <div className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">Generated Product Description</div>
            <div className="bg-gray-50 dark:bg-muted/30 rounded-lg p-2 sm:p-3 text-xs sm:text-sm">
              <p className="text-gray-600 dark:text-muted-foreground">
                <span className="font-medium text-gray-900 dark:text-foreground">IntelligenticAI Platform</span> -
                Transform your business operations with our cutting-edge AI solution. Designed for enterprise
                scalability, our platform seamlessly integrates with your existing workflows to automate repetitive
                tasks, analyze complex data, and generate actionable insights.
              </p>
              <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2">
                <div className="text-[10px] sm:text-xs bg-brand-primary/10 text-brand-primary px-1.5 sm:px-2 py-0.5 rounded-full">
                  Professional
                </div>
                <div className="text-[10px] sm:text-xs bg-brand-secondary/10 text-brand-secondary px-1.5 sm:px-2 py-0.5 rounded-full">
                  Concise
                </div>
                <div className="text-[10px] sm:text-xs bg-brand-primary/10 text-brand-primary px-1.5 sm:px-2 py-0.5 rounded-full">
                  Benefit-focused
                </div>
              </div>
            </div>
            <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 dark:text-muted-foreground">
              <div>Word count: 48</div>
              <div>Reading time: ~15 seconds</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Code Generation & Optimization",
      description: "Generate, debug, and optimize code across multiple programming languages and frameworks.",
      icon: <Code className="h-5 w-5 sm:h-6 sm:w-6" />,
      color: "text-brand-secondary",
      bgColor: "bg-brand-secondary/10",
      showcase: (
        <div className="bg-white dark:bg-background/80 backdrop-blur-sm border-2 border-gray-200 dark:border-primary/20 rounded-lg p-3 sm:p-4 h-full shadow-sm">
          <div className="space-y-3 sm:space-y-4">
            <div className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">Generated React Component</div>
            <div className="bg-gray-50 dark:bg-muted/30 rounded-lg p-2 sm:p-3 text-[10px] sm:text-xs font-mono overflow-hidden">
              <div className="text-blue-400">import</div> React, &#123; useState &#125;{" "}
              <div className="text-blue-400">from</div> <span className="text-green-400">"react"</span>;
              <br />
              <br />
              <div className="text-blue-400">const</div> <span className="text-yellow-400">DataVisualizer</span> =
              (&#123; data &#125;) =&gt; &#123;
              <br />
              &nbsp;&nbsp;<div className="text-blue-400">const</div> [filter, setFilter] = useState(
              <span className="text-green-400">"all"</span>);
              <br />
              <br />
              &nbsp;&nbsp;<div className="text-blue-400">return</div> (
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-400">div</span> className=
              <span className="text-green-400">"data-container"</span>&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;{" "}
              <span className="text-purple-400">/* Visualization code */</span> &#125;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-yellow-400">div</span>&gt;
              <br />
              &nbsp;&nbsp;);
              <br />
              &#125;;
            </div>
            <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 dark:text-muted-foreground">
              <div>Lines: 15</div>
              <div>Optimized for performance</div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-gray-50 dark:bg-transparent">
      <div className="absolute inset-0 bg-grid-small-white/[0.2] -z-10" />
      <div className="absolute h-full w-full bg-gradient-to-b from-background/0 via-background/80 to-background pointer-events-none -z-10" />

      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm bg-brand-primary/10 text-brand-primary border border-brand-primary/20 mb-3 sm:mb-4"
          >
            <Zap className="mr-1 sm:mr-2 h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>Powerful Features</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2 sm:mb-4"
          >
            Advanced AI Capabilities
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-muted-foreground"
          >
            Our AI agents leverage cutting-edge technology to deliver powerful features that transform your workflow
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "bg-white dark:bg-secondary/5 backdrop-blur-sm border-2 rounded-xl p-3 sm:p-5 cursor-pointer transition-all duration-300 shadow-sm",
                  activeFeature === index
                    ? "border-brand-primary/30 shadow-md"
                    : "border-gray-200 dark:border-primary/10 hover:border-brand-primary/20",
                )}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={cn(
                      "h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center shrink-0",
                      feature.bgColor,
                    )}
                  >
                    <div className={feature.color}>{feature.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg font-medium mb-0.5 sm:mb-1">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-3 bg-white dark:bg-secondary/5 backdrop-blur-sm border-2 border-gray-200 dark:border-primary/10 rounded-xl p-3 sm:p-6 overflow-hidden shadow-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {features[activeFeature].showcase}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
