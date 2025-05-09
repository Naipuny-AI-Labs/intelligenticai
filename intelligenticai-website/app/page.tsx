import { HeroSection } from "@/components/hero-section"
import { FeaturedAgents } from "@/components/featured-agents"
import { CategorySection } from "@/components/category-section"
import { WorkflowAutomation } from "@/components/workflow-automation"
import { CustomSolutions } from "@/components/custom-solutions"
import { TestimonialSection } from "@/components/testimonial-section"
import { CTASection } from "@/components/cta-section"
import { StatisticsSection } from "@/components/statistics-section"
import { FeatureShowcase } from "@/components/feature-showcase"
import { TrustedBy } from "@/components/trusted-by"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustedBy />
      <StatisticsSection />
      <FeaturedAgents />
      <FeatureShowcase />
      <CategorySection />
      <WorkflowAutomation />
      <CustomSolutions />
      <TestimonialSection />
      <CTASection />
    </main>
  )
}
