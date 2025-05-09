"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Bot, ArrowRight, Zap, Star, Shield } from "lucide-react"
import { GlowingButton } from "@/components/ui/glowing-button"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-transparent">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/90 -z-10" />

      {/* Subtle glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] sm:w-[30rem] md:w-[40rem] h-[10rem] sm:h-[15rem] md:h-[20rem] bg-primary/5 dark:bg-primary/10 rounded-full blur-[8rem] opacity-50 -z-10" />

      <div className="container px-4 sm:px-6">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background for the card */}
          <div className="absolute inset-0 bg-transparent backdrop-blur-[2px] -z-10" />

          <div className="backdrop-blur-sm bg-transparent border border-gray-200/50 dark:border-primary/20 rounded-xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2 sm:mb-3 md:mb-4">
                  Ready to Transform Your Workflow with AI?
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-muted-foreground mb-4 sm:mb-5 md:mb-6">
                  Start using our AI agents today and experience the power of intelligent automation for your business.
                </p>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 md:mb-8">
                  {[
                    {
                      icon: <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
                      title: "Boost Productivity",
                      description: "Automate repetitive tasks and focus on what matters most",
                    },
                    {
                      icon: <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />,
                      title: "Enhance Quality",
                      description: "Improve accuracy and consistency across all your workflows",
                    },
                    {
                      icon: <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />,
                      title: "Enterprise Security",
                      description: "Your data is protected with enterprise-grade security",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 sm:gap-3">
                      <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-transparent border border-gray-200 dark:border-gray-700 flex items-center justify-center mt-0.5 sm:mt-1">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-medium">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <GlowingButton className="w-full sm:w-auto text-xs sm:text-sm py-1.5 sm:py-2">
                    <Link href="/try-agent" className="flex items-center justify-center">
                      Try an Agent
                      <ArrowRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Link>
                  </GlowingButton>

                  <GlowingButton variant="secondary" className="w-full sm:w-auto text-xs sm:text-sm py-1.5 sm:py-2">
                    <Link href="/build-agent" className="flex items-center justify-center">
                      Build Your Agent
                      <Bot className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Link>
                  </GlowingButton>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="backdrop-blur-sm bg-transparent border border-gray-200/50 dark:border-primary/20 rounded-xl p-4 sm:p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 shadow-md">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-transparent border border-primary/30 flex items-center justify-center">
                        <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-medium">Start with an Agent Now</h3>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-muted-foreground">
                          No credit card required
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      {["Access to one agent", "5 prompts", "Basic automation", "Email support"].map((feature, i) => (
                        <div key={i} className="flex items-center gap-1.5 sm:gap-2">
                          <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-transparent border border-green-500/30 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-500"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <span className="text-xs sm:text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-primary/10">
                      <p className="text-xs text-gray-500 dark:text-muted-foreground">
                        Start your journey with our AI agents today. No commitment required.
                      </p>
                    </div>

                    <Button className="w-full text-xs sm:text-sm bg-transparent" asChild>
                      <Link href="/onboarding/try-agent">
                        Get Started Free
                        <ArrowRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 h-6 w-6 sm:h-8 sm:w-8 bg-primary/30 rounded-full blur-md" />
                <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 h-6 w-6 sm:h-8 sm:w-8 bg-purple-500/30 rounded-full blur-md" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
