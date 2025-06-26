import { Hero } from "@/components/landing-page/Hero";
import { FeaturesSection } from "@/components/landing-page/FeaturesSection";
import { StatsSection } from "@/components/landing-page/StatsSection";
import { MealPlanShowcase } from "@/components/landing-page/MealPlanShowcase";
import { CTASection } from "@/components/landing-page/CTASection";
import { TestimonialsCarousel } from "@/components/landing-page/TestimonialsCarousel";

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
