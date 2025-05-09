"use client"

import { motion } from "framer-motion"

export function TrustedBy() {
  // Sample company logos (replace with actual logos)
  const companies = [
    { name: "TechCorp", logo: "TC" },
    { name: "InnovateLabs", logo: "IL" },
    { name: "FutureWorks", logo: "FW" },
    { name: "DataSphere", logo: "DS" },
    { name: "CloudNine", logo: "CN" },
    { name: "QuantumTech", logo: "QT" },
  ]

  return (
    <section className="py-8 sm:py-10 md:py-12 border-t border-gray-200 dark:border-primary/10 bg-white dark:bg-transparent">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <p className="text-sm sm:text-base text-gray-600 dark:text-muted-foreground">
            Trusted by innovative companies worldwide
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {companies.map((company, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-10 w-16 sm:h-12 sm:w-24 bg-gray-50 dark:bg-secondary/5 backdrop-blur-sm border-2 border-gray-200 dark:border-primary/10 rounded-lg flex items-center justify-center text-gray-600 dark:text-muted-foreground group-hover:border-brand-primary/30 transition-all duration-300 shadow-sm">
                <span className="font-medium text-base sm:text-lg">{company.logo}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
