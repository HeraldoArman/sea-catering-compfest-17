import { MealPlanDisplay } from "@/components/MealPlanDisplay"
import { TestimonialsSection } from "@/components/TestimonialsSection"
import Hero from "@/components/Hero"
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero/>      

      {/* Meal Plan Display Section */}
      <MealPlanDisplay />

      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  )
}
