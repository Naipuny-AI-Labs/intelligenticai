"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Phone, MessageSquare, Bot, Users, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Message sent",
        description: "Thank you for your interest. Our team will contact you shortly.",
      })
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl font-bold tracking-tight">Contact Us for Enterprise Solutions</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get in touch with our team to discuss custom AI agent solutions for your business needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and our team will get back to you to discuss your AI agent needs and provide
                information about our enterprise solutions.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium">
                      Company
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your needs and requirements"
                      rows={5}
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise Solutions</CardTitle>
                  <CardDescription>Custom AI agents for your business needs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Custom AI Agents</h3>
                      <p className="text-sm text-muted-foreground">
                        Tailored AI solutions designed specifically for your business requirements
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Team Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Provide access to your entire team with centralized management
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Enterprise Security</h3>
                      <p className="text-sm text-muted-foreground">
                        Advanced security features and compliance for enterprise requirements
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Priority Support</h3>
                      <p className="text-sm text-muted-foreground">
                        Dedicated account manager and priority technical support
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Reach out to us directly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href="mailto:enterprise@aiagents.com" className="text-sm hover:underline">
                      enterprise@aiagents.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <a href="tel:+1-800-AI-AGENT" className="text-sm hover:underline">
                      +1-800-AI-AGENT
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <span className="text-sm">Live chat available during business hours</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/enterprise">Learn More About Enterprise</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "What types of AI agents do you offer?",
                answer:
                  "We offer a wide range of AI agents for different use cases including customer support, content creation, data analysis, research assistance, and more. We can also build custom agents tailored to your specific needs.",
              },
              {
                question: "How does the enterprise solution differ from standard access?",
                answer:
                  "Our enterprise solutions include custom AI agent development, team access management, advanced security features, dedicated support, and integration with your existing systems and workflows.",
              },
              {
                question: "Can I integrate AI agents with our existing systems?",
                answer:
                  "Yes, our enterprise solutions include custom integrations with your existing systems, including CRMs, knowledge bases, and internal tools through our API.",
              },
              {
                question: "How long does implementation take?",
                answer:
                  "Implementation timelines vary based on your specific requirements. Simple deployments can be completed in a few days, while more complex integrations may take several weeks. We'll provide a detailed timeline during our consultation.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className="border p-6 rounded-lg hover:border-primary/50 hover:bg-muted/20 transition-colors"
              >
                <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground">
              Contact our team today to discuss your AI agent needs and get a custom solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="#top">Contact Us</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/enterprise">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
