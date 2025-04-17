"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    quote:
      "These AI agents have completely transformed our customer service operations. We're now able to provide 24/7 support with minimal human intervention.",
    author: "Sarah Johnson",
    role: "Customer Success Manager",
    company: "TechCorp",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    quote:
      "The data analysis agent helped us identify patterns we would have missed. It's like having a data scientist on call at all times.",
    author: "Michael Chen",
    role: "Data Analyst",
    company: "Analytics Pro",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    quote:
      "I was skeptical at first, but the creative writing agent has become an essential part of our content creation process.",
    author: "Emily Rodriguez",
    role: "Content Director",
    company: "MediaHub",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function TestimonialSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how AI agents are transforming businesses and personal workflows
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full flex flex-col">
                <CardContent className="pt-6 flex-grow">
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 inline-block text-yellow-400 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-lg italic">"{testimonial.quote}"</blockquote>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                      <AvatarFallback>
                        {testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
