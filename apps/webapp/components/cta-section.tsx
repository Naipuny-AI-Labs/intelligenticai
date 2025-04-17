"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5" />

          <div className="relative z-10 px-6 py-16 sm:px-12 md:py-20 lg:px-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to transform your workflow?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of businesses and individuals who are already using our AI agents to automate tasks,
              generate content, and provide 24/7 customer service.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
