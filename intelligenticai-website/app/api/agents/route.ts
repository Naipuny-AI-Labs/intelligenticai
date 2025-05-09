import { NextResponse } from "next/server"

export async function GET() {
  // This would typically fetch from a database or external API
  // For now, we'll return mock data
  const agents = [
    {
      id: "customer-support",
      name: "Customer Support AI",
      slug: "customer-support",
      description: "AI agent for customer support automation with knowledge base integration and ticket management",
      category: "Support",
      capabilities: ["Knowledge Base Integration", "Ticket Management", "Multi-language Support"],
      chatflowId: "cs-flow-1",
      apiHost: "api.intelligentic.ai",
      price: 99,
    },
    {
      id: "sales-assistant",
      name: "Sales Assistant",
      slug: "sales-assistant",
      description:
        "AI agent for sales automation with lead qualification, product recommendations, and follow-up scheduling",
      category: "Sales",
      capabilities: ["Lead Qualification", "Product Recommendations", "Follow-up Scheduling"],
      chatflowId: "sa-flow-1",
      apiHost: "api.intelligentic.ai",
      price: 149,
    },
    {
      id: "data-analyst",
      name: "Data Analyst",
      slug: "data-analyst",
      description:
        "AI agent for data analysis with visualization capabilities, trend identification, and report generation",
      category: "Analytics",
      capabilities: ["Data Visualization", "Trend Identification", "Report Generation"],
      chatflowId: "da-flow-1",
      apiHost: "api.intelligentic.ai",
      price: 199,
    },
    {
      id: "content-creator",
      name: "Content Creator",
      slug: "content-creator",
      description:
        "AI agent for content creation with blog writing, social media post generation, and SEO optimization",
      category: "Marketing",
      capabilities: ["Blog Writing", "Social Media Content", "SEO Optimization"],
      chatflowId: "cc-flow-1",
      apiHost: "api.intelligentic.ai",
      price: 129,
    },
    {
      id: "hr-assistant",
      name: "HR Assistant",
      slug: "hr-assistant",
      description:
        "AI agent for HR processes with candidate screening, interview scheduling, and onboarding automation",
      category: "Human Resources",
      capabilities: ["Candidate Screening", "Interview Scheduling", "Onboarding Automation"],
      chatflowId: "hr-flow-1",
      apiHost: "api.intelligentic.ai",
      price: 179,
    },
  ]

  return NextResponse.json({ agents })
}
