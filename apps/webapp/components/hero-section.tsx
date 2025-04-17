"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Bot, Search, Sparkles, ArrowRight, Building2, Layers, Rocket, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <section className="relative py-[5rem]  overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Discover and Deploy Powerful AI Agents
            </h1>
            <p className="text-xl text-muted-foreground">
              Find the perfect AI assistant for your business or personal needs from our curated marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search for AI agents..." className="pl-9 h-12" />
              </div>
              <Button size="lg">Explore Agents</Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-[5rem] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background" />

        {/* Animated blobs */}
        <div
          className="absolute top-1/4 right-1/4 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-[8rem] opacity-70"
          style={{ animation: "pulse 8s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-[35rem] h-[35rem] bg-blue-500/5 rounded-full blur-[10rem] opacity-70"
          style={{ animation: "pulse 12s ease-in-out infinite 2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25rem] h-[25rem] bg-purple-500/5 rounded-full blur-[7rem] opacity-70"
          style={{ animation: "pulse 10s ease-in-out infinite 1s" }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Text and CTA */}
          <motion.div
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-primary/10 text-sm text-foreground mx-auto lg:mx-0">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>AI-powered agent marketplace</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Discover and Deploy <span className="text-gradient">Powerful AI Agents</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Find the perfect AI assistant for your business or personal needs from our curated marketplace.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="group relative overflow-hidden h-14 px-8" asChild>
                <Link href="/try-agent">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                  <div className="relative flex items-center">
                    <span>Try an Agent</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 border-primary/20 hover:border-primary/40"
                asChild
              >
                <Link href="/build-agent">Build an Agent</Link>
              </Button>
            </div>

            {/* Enterprise option */}
            <div className="pt-6 border-t border-border/30">
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-5 w-5 text-primary/60" />
                  <span>Need an enterprise solution?</span>
                </div>
                <Button variant="link" className="text-primary" asChild>
                  <Link href="/enterprise">
                    Contact our team <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Content - 3D Illustration */}
          <motion.div
            className="relative mx-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className="relative rounded-2xl overflow-hidden border border-primary/10 shadow-2xl bg-card/30 backdrop-blur-sm"
              style={{
                transform: "perspective(1200px) rotateY(-5deg) rotateX(5deg)",
                transformStyle: "preserve-3d",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px 5px rgba(79, 70, 229, 0.05)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />

              <div className="p-2">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="AI Agents Dashboard"
                  width={800}
                  height={600}
                  className="w-full rounded-xl"
                />
              </div>

              {/* Floating elements */}
              <div
                className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg border border-primary/10 p-3"
                style={{
                  transform: "translateZ(20px)",
                  animation: "float 6s ease-in-out infinite",
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium">24/7 Availability</span>
                </div>
              </div>

              <div
                className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg border border-primary/10 p-3"
                style={{
                  transform: "translateZ(40px)",
                  animation: "float 6s ease-in-out infinite 1s",
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-blue-500 rounded-full" />
                  <span className="text-sm font-medium">Smart Automation</span>
                </div>
              </div>

              <div
                className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg border border-primary/10 p-3"
                style={{
                  transform: "translateZ(30px) translateX(-50%)",
                  animation: "float 6s ease-in-out infinite 0.5s",
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">AI Integration</div>
                    <div className="text-xs text-muted-foreground">Seamless workflow</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3D icons floating around */}
            <div
              className="absolute -top-8 left-1/4 transform -translate-x-1/2 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                animation: "float 8s ease-in-out infinite",
                boxShadow: "0 0 20px 5px rgba(79, 70, 229, 0.1)",
              }}
            >
              <Bot className="h-8 w-8 text-primary" />
            </div>

            <div
              className="absolute -bottom-5 right-1/4 transform translate-x-1/2 bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                animation: "float 7s ease-in-out infinite 1s",
                boxShadow: "0 0 20px 5px rgba(59, 130, 246, 0.1)",
              }}
            >
              <Rocket className="h-8 w-8 text-blue-500" />
            </div>

            <div
              className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-purple-500/10 w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                animation: "float 6s ease-in-out infinite 2s",
                boxShadow: "0 0 20px 5px rgba(139, 92, 246, 0.1)",
              }}
            >
              <Layers className="h-7 w-7 text-purple-500" />
            </div>
          </motion.div>
        </div>

        {/* Bottom features row */}
        <motion.div
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {[
            {
              icon: <Bot className="h-6 w-6 text-primary" />,
              title: "100+ AI Agents",
              description: "Access a growing library of specialized AI agents for every use case.",
            },
            {
              icon: <Sparkles className="h-6 w-6 text-blue-500" />,
              title: "Custom Solutions",
              description: "Build your own agents or let our team create custom solutions for you.",
            },
            {
              icon: <Layers className="h-6 w-6 text-purple-500" />,
              title: "Seamless Integration",
              description: "Easily integrate with your existing workflows and applications.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-card/30 backdrop-blur-sm border border-primary/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="bg-background/80 rounded-lg p-3 border border-primary/10">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Global CSS needed for animation and styling */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        .text-gradient {
          background: linear-gradient(90deg, hsl(var(--primary)), #8b5cf6, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
      `}</style>
    </section>
  )
}
