"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, HelpCircle, X, Users, Zap, CheckCircle2, Sparkles, Shield, Code, StickyNote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function PricingPage() {
  const { toast } = useToast()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("")
  const [showConfirm, setShowConfirm] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
  }, [])

  const handlePlanClick = (planName: string) => {
    if (!isLoggedIn) {
      toast({
        title: "Sign in required",
        description: "Please sign in to subscribe to a plan",
      })
      return
    }

    setSelectedPlan(planName)
    setShowConfirm(true)
  }

  const handleSubscribe = () => {
    toast({
      title: "Subscription successful",
      description: `You are now subscribed to the ${selectedPlan} plan.`,
    })
    setShowConfirm(false)
  }

  const plans = {
    individual: [
      {
        name: "Free",
        description: "Basic access for personal use",
        price: { monthly: 0, annual: 0 },
        features: [
          { name: "Access to 5 free agents", included: true },
          { name: "Limited usage (100 requests/day)", included: true },
          { name: "Basic support", included: true },
          { name: "Community access", included: true },
          { name: "Custom agent building", included: false },
          { name: "API access", included: false },
          { name: "Priority support", included: false },
        ],
        icon: <Users className="h-5 w-5" />,
        cta: "Get Started",
        popular: false,
        color: "bg-gray-100 dark:bg-gray-800",
      },
      {
        name: "Pro",
        description: "For power users and freelancers",
        price: { monthly: 29, annual: 290 },
        features: [
          { name: "Access to all agents", included: true },
          { name: "Unlimited usage", included: true },
          { name: "Priority support", included: true },
          { name: "Community access", included: true },
          { name: "Custom agent building (up to 3)", included: true },
          { name: "Basic API access", included: true },
          { name: "Advanced analytics", included: false },
        ],
        icon: <Zap className="h-5 w-5" />,
        cta: "Subscribe",
        popular: true,
        color: "bg-primary/5",
      },
      {
        name: "Ultimate",
        description: "For professionals with advanced needs",
        price: { monthly: 79, annual: 790 },
        features: [
          { name: "Access to all agents", included: true },
          { name: "Unlimited usage", included: true },
          { name: "Priority support", included: true },
          { name: "Community access", included: true },
          { name: "Unlimited custom agents", included: true },
          { name: "Full API access", included: true },
          { name: "Advanced analytics", included: true },
        ],
        icon: <Sparkles className="h-5 w-5" />,
        cta: "Subscribe",
        popular: false,
        color: "bg-purple-50 dark:bg-purple-900/20",
      },
    ],
    business: [
      {
        name: "Startup",
        description: "For small teams and startups",
        price: { monthly: 99, annual: 990 },
        features: [
          { name: "Up to 5 team members", included: true },
          { name: "Access to all agents", included: true },
          { name: "Unlimited usage", included: true },
          { name: "Priority support", included: true },
          { name: "Custom agent building", included: true },
          { name: "Basic API access", included: true },
          { name: "Team collaboration tools", included: true },
          { name: "Advanced security", included: false },
          { name: "Dedicated account manager", included: false },
        ],
        icon: <Zap className="h-5 w-5" />,
        cta: "Subscribe",
        popular: false,
        color: "bg-blue-50 dark:bg-blue-900/20",
      },
      {
        name: "Business",
        description: "For growing businesses",
        price: { monthly: 249, annual: 2490 },
        features: [
          { name: "Up to 20 team members", included: true },
          { name: "Access to all agents", included: true },
          { name: "Unlimited usage", included: true },
          { name: "Priority support", included: true },
          { name: "Custom agent building", included: true },
          { name: "Full API access", included: true },
          { name: "Team collaboration tools", included: true },
          { name: "Advanced security", included: true },
          { name: "Dedicated account manager", included: false },
        ],
        icon: <CheckCircle2 className="h-5 w-5" />,
        cta: "Subscribe",
        popular: true,
        color: "bg-primary/5",
      },
      {
        name: "Enterprise",
        description: "For large organizations",
        price: { monthly: "Custom", annual: "Custom" },
        features: [
          { name: "Unlimited team members", included: true },
          { name: "Access to all agents", included: true },
          { name: "Unlimited usage", included: true },
          { name: "24/7 support", included: true },
          { name: "Custom agent building", included: true },
          { name: "Full API access", included: true },
          { name: "Team collaboration tools", included: true },
          { name: "Advanced security", included: true },
          { name: "Dedicated account manager", included: true },
          { name: "Custom integrations", included: true },
          { name: "On-premises deployment option", included: true },
        ],
        icon: <Shield className="h-5 w-5" />,
        cta: "Contact Sales",
        popular: false,
        color: "bg-green-50 dark:bg-green-900/20",
      },
    ],
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
            <Badge className="mb-2">Simple Pricing</Badge>
            <h1 className="text-4xl font-bold tracking-tight">Choose the Perfect Plan for Your Needs</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing with no hidden fees. Scale as you grow with our flexible plans.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container">
          <div className="flex flex-col items-center mb-12">
            <Tabs defaultValue="individual" className="w-full max-w-4xl">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2 p-1 bg-muted/50">
                  <TabsTrigger
                    value="individual"
                    className="text-base py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    Individual
                  </TabsTrigger>
                  <TabsTrigger
                    value="business"
                    className="text-base py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    Business
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex items-center justify-center space-x-2 mb-10">
                <Label
                  htmlFor="billing-cycle"
                  className={billingCycle === "monthly" ? "text-foreground font-medium" : "text-muted-foreground"}
                >
                  Monthly
                </Label>
                <Switch
                  id="billing-cycle"
                  checked={billingCycle === "annual"}
                  onCheckedChange={(checked) => setBillingCycle(checked ? "annual" : "monthly")}
                />
                <div className="flex items-center">
                  <Label
                    htmlFor="billing-cycle"
                    className={billingCycle === "annual" ? "text-foreground font-medium" : "text-muted-foreground"}
                  >
                    Annual
                  </Label>
                  <Badge
                    variant="outline"
                    className="ml-2 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                  >
                    Save 20%
                  </Badge>
                </div>
              </div>

              <TabsContent value="individual" className="space-y-8 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {plans.individual.map((plan, index) => (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex"
                    >
                      <Card
                        className={`flex flex-col w-full hover:shadow-lg transition-all ${
                          plan.popular ? "border-primary shadow-md relative" : ""
                        } ${selectedPlan === plan.name ? "ring-2 ring-primary" : ""} ${plan.color}`}
                      >
                        {plan.popular && (
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
                              {plan.icon}
                            </div>
                            <CardTitle>{plan.name}</CardTitle>
                          </div>
                          <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <div className="mb-6">
                            <div className="flex items-baseline">
                              <span className="text-3xl font-bold">
                                {typeof plan.price[billingCycle] === "number"
                                  ? `$${plan.price[billingCycle]}`
                                  : plan.price[billingCycle]}
                              </span>
                              {typeof plan.price[billingCycle] === "number" && plan.price[billingCycle] > 0 && (
                                <span className="text-muted-foreground ml-1">
                                  /{billingCycle === "monthly" ? "mo" : "yr"}
                                </span>
                              )}
                            </div>
                            {plan.price[billingCycle] === 0 && (
                              <div className="text-sm text-muted-foreground mt-1">Free forever</div>
                            )}
                          </div>

                          <ul className="space-y-3">
                            {plan.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start">
                                {feature.included ? (
                                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                ) : (
                                  <X className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0 mt-0.5" />
                                )}
                                <span className={feature.included ? "" : "text-muted-foreground"}>{feature.name}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className="w-full"
                            variant={plan.popular ? "default" : "outline"}
                            onClick={() =>
                              plan.name === "Enterprise"
                                ? (window.location.href = "/contact")
                                : handlePlanClick(plan.name)
                            }
                          >
                            {plan.cta}
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="business" className="space-y-8 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {plans.business.map((plan, index) => (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex"
                    >
                      <Card
                        className={`flex flex-col w-full hover:shadow-lg transition-all ${
                          plan.popular ? "border-primary shadow-md relative" : ""
                        } ${selectedPlan === plan.name ? "ring-2 ring-primary" : ""} ${plan.color}`}
                      >
                        {plan.popular && (
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
                              {plan.icon}
                            </div>
                            <CardTitle>{plan.name}</CardTitle>
                          </div>
                          <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <div className="mb-6">
                            <div className="flex items-baseline">
                              <span className="text-3xl font-bold">
                                {typeof plan.price[billingCycle] === "number"
                                  ? `${plan.price[billingCycle]}`
                                  : plan.price[billingCycle]}
                              </span>
                              {typeof plan.price[billingCycle] === "number" && plan.price[billingCycle] > 0 && (
                                <span className="text-muted-foreground ml-1">
                                  /{billingCycle === "monthly" ? "mo" : "yr"}
                                </span>
                              )}
                            </div>
                            {plan.price[billingCycle] === 0 && (
                              <div className="text-sm text-muted-foreground mt-1">Free forever</div>
                            )}
                          </div>

                          <ul className="space-y-3">
                            {plan.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start">
                                {feature.included ? (
                                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                ) : (
                                  <X className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0 mt-0.5" />
                                )}
                                <span className={feature.included ? "" : "text-muted-foreground"}>{feature.name}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className="w-full"
                            variant={plan.popular ? "default" : "outline"}
                            onClick={() =>
                              plan.name === "Enterprise"
                                ? (window.location.href = "/contact")
                                : handlePlanClick(plan.name)
                            }
                          >
                            {plan.cta}
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Features Comparison */}
          <div className="max-w-6xl mx-auto mt-20 overflow-hidden">
            <h2 className="text-2xl font-bold text-center mb-8">Plan Comparison</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-6 font-medium">Feature</th>
                    <th className="text-center py-4 px-6 font-medium">Free</th>
                    <th className="text-center py-4 px-6 font-medium">Pro</th>
                    <th className="text-center py-4 px-6 font-medium">Ultimate</th>
                    <th className="text-center py-4 px-6 font-medium">Business</th>
                    <th className="text-center py-4 px-6 font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Number of users",
                      free: "1",
                      pro: "1",
                      ultimate: "1",
                      business: "Up to 20",
                      enterprise: "Unlimited",
                    },
                    {
                      feature: "AI agent access",
                      free: "5 agents",
                      pro: "All agents",
                      ultimate: "All agents",
                      business: "All agents",
                      enterprise: "All agents",
                    },
                    {
                      feature: "Usage limits",
                      free: "100/day",
                      pro: "Unlimited",
                      ultimate: "Unlimited",
                      business: "Unlimited",
                      enterprise: "Unlimited",
                    },
                    {
                      feature: "Custom agent building",
                      free: "No",
                      pro: "Up to 3",
                      ultimate: "Unlimited",
                      business: "Unlimited",
                      enterprise: "Unlimited",
                    },
                    {
                      feature: "API access",
                      free: "No",
                      pro: "Basic",
                      ultimate: "Full",
                      business: "Full",
                      enterprise: "Full",
                    },
                    {
                      feature: "Support",
                      free: "Community",
                      pro: "Priority",
                      ultimate: "Priority",
                      business: "Priority",
                      enterprise: "24/7 Dedicated",
                    },
                    {
                      feature: "Team collaboration",
                      free: "No",
                      pro: "No",
                      ultimate: "No",
                      business: "Yes",
                      enterprise: "Advanced",
                    },
                    {
                      feature: "Advanced security",
                      free: "No",
                      pro: "No",
                      ultimate: "Basic",
                      business: "Yes",
                      enterprise: "Enterprise-grade",
                    },
                    {
                      feature: "Custom integrations",
                      free: "No",
                      pro: "No",
                      ultimate: "No",
                      business: "Limited",
                      enterprise: "Unlimited",
                    },
                  ].map((row, index) => (
                    <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-6 font-medium">
                        <div className="flex items-center">
                          {row.feature}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                                  <HelpCircle className="h-3 w-3" />
                                  <span className="sr-only">Info</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">Information about {row.feature.toLowerCase()}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </td>
                      <td className="text-center py-4 px-6">{row.free}</td>
                      <td className="text-center py-4 px-6">{row.pro}</td>
                      <td className="text-center py-4 px-6">{row.ultimate}</td>
                      <td className="text-center py-4 px-6">{row.business}</td>
                      <td className="text-center py-4 px-6">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mt-20">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>

            <div className="space-y-6">
              {[
                {
                  question: "Can I switch plans later?",
                  answer:
                    "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the new pricing will be applied immediately. If you downgrade, the new pricing will be applied at the start of your next billing cycle.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept all major credit cards, PayPal, and bank transfers for annual plans. For Enterprise plans, we also offer invoicing options.",
                },
                {
                  question: "Is there a free trial?",
                  answer:
                    "Yes, all paid plans come with a 14-day free trial. No credit card is required to start your trial.",
                },
                {
                  question: "What happens when I reach my usage limit?",
                  answer:
                    "On the Free plan, once you reach your daily limit, you'll need to wait until the next day to continue using the platform. On paid plans, you have unlimited usage.",
                },
                {
                  question: "Can I cancel my subscription anytime?",
                  answer:
                    "Yes, you can cancel your subscription at any time. If you cancel, you'll still have access to your plan until the end of your current billing cycle.",
                },
                {
                  question: "Do you offer discounts for non-profits or educational institutions?",
                  answer:
                    "Yes, we offer special pricing for non-profits, educational institutions, and open-source projects. Please contact our sales team for more information.",
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
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Badge>Enterprise Solutions</Badge>
              <h2 className="text-3xl font-bold tracking-tight">Need a Custom Solution?</h2>
              <p className="text-lg text-muted-foreground">
                Our Enterprise plan offers customizable solutions for large organizations with specific requirements.
                Get in touch with our sales team to discuss your needs.
              </p>
              <ul className="space-y-3">
                {[
                  "Custom integrations with your existing systems",
                  "Dedicated support and account management",
                  "On-premises deployment options",
                  "Custom SLAs and security requirements",
                  "Volume discounts for large teams",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" asChild>
                <Link href="/enterprise">Contact Sales</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative rounded-lg overflow-hidden shadow-xl"
            >
              <div className="aspect-video bg-gradient-to-br from-background to-primary/5 rounded-lg border p-8 flex items-center justify-center">
                <div className="text-center space-y-4 max-w-md">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Enterprise Solutions</h3>
                  <p className="text-muted-foreground">
                    Tailored AI agent solutions for your organization's specific needs
                  </p>

                  <div className="pt-4 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <StickyNote className="h-4 w-4 text-primary" />
                      <span>Custom Contracts</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>Advanced Security</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Team Management</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Code className="h-4 w-4 text-primary" />
                      <span>Developer Tools</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that's right for you and start exploring the power of AI agents today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href={isLoggedIn ? "/dashboard" : "/auth/sign-up"}>Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/enterprise">Contact Sales</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">No credit card required for free trial. Cancel anytime.</p>
          </div>
        </div>
      </section>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background p-6 rounded-lg max-w-md w-full mx-4"
          >
            <h2 className="text-xl font-bold mb-4">Confirm Subscription</h2>
            <p className="text-muted-foreground mb-6">
              You are about to subscribe to the {selectedPlan} plan with {billingCycle} billing.
              {billingCycle === "annual" && " You'll save 20% with annual billing!"}
            </p>
            <div className="flex gap-3">
              <Button className="flex-1" onClick={handleSubscribe}>
                Confirm
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowConfirm(false)}>
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  )
}
