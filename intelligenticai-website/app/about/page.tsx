"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Globe, HeartHandshake, Lightbulb, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background" />
          <motion.div
            className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 3, delay: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">About AI Agents Marketplace</h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-xl text-muted-foreground">
                We're on a mission to democratize access to AI technology and empower businesses and individuals with
                intelligent automation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
              <p className="text-lg text-muted-foreground">
                Founded in 2023, AI Agents Marketplace was born from a simple observation: while AI technology was
                advancing rapidly, it remained inaccessible to many businesses and individuals who could benefit from it
                the most.
              </p>
              <p className="text-lg text-muted-foreground">
                Our founders, a team of AI researchers and software engineers, set out to create a platform that would
                make powerful AI agents accessible to everyone, regardless of technical expertise or resources.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, we're proud to host a diverse marketplace of AI agents that serve thousands of customers
                worldwide, from small businesses to large enterprises, helping them automate tasks, generate content,
                analyze data, and much more.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative rounded-lg overflow-hidden shadow-xl"
            >
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Our team working"
                width={800}
                height={600}
                className="w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Our Mission & Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're guided by a set of core principles that inform everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Globe className="h-10 w-10" />,
                title: "Accessibility",
                description: "Making AI technology accessible to everyone, regardless of technical expertise.",
              },
              {
                icon: <Shield className="h-10 w-10" />,
                title: "Responsibility",
                description: "Ensuring our AI agents are developed and used ethically and responsibly.",
              },
              {
                icon: <Lightbulb className="h-10 w-10" />,
                title: "Innovation",
                description: "Continuously pushing the boundaries of what AI agents can do.",
              },
              {
                icon: <HeartHandshake className="h-10 w-10" />,
                title: "Community",
                description: "Building a supportive community of developers, users, and partners.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-none shadow-md">
                  <CardHeader>
                    <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-primary">{value.icon}</div>
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind AI Agents Marketplace
            </p>
          </div>

          <Tabs defaultValue="leadership" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="leadership">Leadership</TabsTrigger>
                <TabsTrigger value="engineering">Engineering</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="operations">Operations</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="leadership" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Alex Chen",
                    role: "CEO & Co-Founder",
                    bio: "Former AI researcher at Stanford with a passion for making AI accessible to everyone.",
                    image: "/placeholder.svg?height=300&width=300",
                  },
                  {
                    name: "Sarah Johnson",
                    role: "CTO & Co-Founder",
                    bio: "Ex-Google engineer with expertise in machine learning and distributed systems.",
                    image: "/placeholder.svg?height=300&width=300",
                  },
                  {
                    name: "Michael Rodriguez",
                    role: "COO",
                    bio: "Experienced operations executive with a background in scaling technology startups.",
                    image: "/placeholder.svg?height=300&width=300",
                  },
                ].map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden border-none shadow-md">
                      <div className="relative h-64 w-full">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{member.bio}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="engineering" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "David Kim",
                    role: "Lead Engineer",
                    image: "/placeholder.svg?height=200&width=200",
                  },
                  {
                    name: "Emma Wilson",
                    role: "ML Engineer",
                    image: "/placeholder.svg?height=200&width=200",
                  },
                  {
                    name: "James Taylor",
                    role: "Backend Developer",
                    image: "/placeholder.svg?height=200&width=200",
                  },
                  {
                    name: "Olivia Martinez",
                    role: "Frontend Developer",
                    image: "/placeholder.svg?height=200&width=200",
                  },
                ].map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden border-none shadow-md">
                      <div className="relative h-48 w-full">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="design" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "Sophie Lee",
                    role: "Design Lead",
                    image: "/placeholder.svg?height=200&width=200",
                  },
                  {
                    name: "Ryan Garcia",
                    role: "UI/UX Designer",
                    image: "/placeholder.svg?height=200&width=200",
                  },
                ].map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden border-none shadow-md">
                      <div className="relative h-48 w-full">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="operations" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "Daniel Brown",
                    role: "Operations Manager",
                    image: "/placeholder.svg?height=200&width=200",
                  },
                  {
                    name: "Jennifer Patel",
                    role: "Customer Success",
                    image: "/placeholder.svg?height=200&width=200",
                  },
                  {
                    name: "Thomas Wright",
                    role: "Finance Manager",
                    image: "/placeholder.svg?height=200&width=200",
                  },
                ].map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden border-none shadow-md">
                      <div className="relative h-48 w-full">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">From idea to leading AI marketplace</p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />

            {[
              {
                year: "2023",
                title: "Foundation",
                description: "AI Agents Marketplace was founded with a mission to democratize access to AI technology.",
              },
              {
                year: "2023",
                title: "First Agents",
                description: "Launched our first set of AI agents focused on productivity and data analysis.",
              },
              {
                year: "2024",
                title: "Rapid Growth",
                description:
                  "Expanded our marketplace to include over 100 specialized AI agents across multiple categories.",
              },
              {
                year: "2024",
                title: "Custom Agent Builder",
                description: "Introduced our revolutionary drag-and-drop interface for building custom AI agents.",
              },
              {
                year: "2025",
                title: "Global Expansion",
                description: "Expanded operations to serve customers worldwide with localized AI agents.",
              },
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`relative mb-12 ${index % 2 === 0 ? "ml-auto pl-10" : "mr-auto pr-10"}`}
                style={{ width: "calc(50% - 20px)" }}
              >
                <div
                  className={`absolute top-0 ${index % 2 === 0 ? "left-0" : "right-0"} w-10 h-full flex items-start justify-center`}
                >
                  <div className="w-4 h-4 rounded-full bg-primary mt-1.5" />
                </div>
                <div className="bg-card rounded-lg p-6 shadow-md">
                  <div className="text-sm text-muted-foreground mb-2">{event.year}</div>
                  <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "AI Agents" },
              { value: "10,000+", label: "Active Users" },
              { value: "50+", label: "Countries" },
              { value: "1M+", label: "Tasks Automated" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Join Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              Whether you're looking to use AI agents to transform your business or you're a developer interested in
              building and selling your own agents, we'd love to have you join our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/try-agent">Try an Agent</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/build-agent">Build an Agent</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
