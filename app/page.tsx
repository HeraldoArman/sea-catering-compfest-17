import { Hero } from "@/components/Hero";
import { FeaturesSection } from "@/components/FeaturesSection";
import { StatsSection } from "@/components/StatsSection";
import { MealPlanShowcase } from "@/components/MealPlanShowcase";
import { CTASection } from "@/components/CTASection";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      {/* Features Section */}
      <FeaturesSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Meal Plan Showcase */}
      <MealPlanShowcase />

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* Call to Action Section */}
      <CTASection />
    </div>
  );
}
