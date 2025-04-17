"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { Agent } from "@/lib/types"

interface AgentPricingProps {
  agent: Agent
}

export function AgentPricing({ agent }: AgentPricingProps) {
  const [selectedPlan, setSelectedPlan] = useState("basic")

  // This would typically come from an API or database
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: agent.price,
      description: "Essential features for individuals",
      features: ["Basic functionality", "5 requests per minute", "Standard response time", "Email support"],
    },
    {
      id: "pro",
      name: "Professional",
      price: agent.price * 2.5,
      description: "Advanced features for professionals",
      features: [
        "All Basic features",
        "20 requests per minute",
        "Priority response time",
        "Custom integrations",
        "24/7 support",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: null,
      description: "Custom solutions for large organizations",
      features: [
        "All Professional features",
        "Unlimited requests",
        "Dedicated infrastructure",
        "Custom development",
        "SLA guarantees",
        "Dedicated account manager",
      ],
    },
  ]

  const selectedPlanData = plans.find((plan) => plan.id === selectedPlan)

  return (
    <div className="space-y-6">
      <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-lg border p-4 transition-all duration-200 ${
              selectedPlan === plan.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
            }`}
          >
            <div className="flex items-start space-x-3">
              <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
              <div className="grid gap-1.5 w-full">
                <div className="flex justify-between items-baseline">
                  <Label htmlFor={plan.id} className="font-medium text-lg">
                    {plan.name}
                  </Label>
                  {plan.price !== null ? (
                    <div className="font-medium text-xl">
                      ${plan.price.toFixed(2)}
                      <span className="text-sm text-muted-foreground">/mo</span>
                    </div>
                  ) : (
                    <div className="font-medium">Contact Sales</div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>

      <Button className="w-full">Deploy Agent</Button>

      <p className="text-xs text-center text-muted-foreground">
        All plans include a 14-day free trial. No credit card required.
      </p>
    </div>
  )
}
