"use client"

import { useState } from "react"
import { Card, CardBody } from "@heroui/card"
import { Button } from "@heroui/button"
import { Avatar } from "@heroui/avatar"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  avatar: string
  rating: number
  quote: string
  date: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    quote:
      "SEA Catering has completely transformed my relationship with healthy eating. The meal plans are not only nutritious but incredibly delicious. I've lost 15 pounds and feel more energetic than ever!",
    date: "2 weeks ago",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Busy Executive",
    company: "Tech Solutions Inc.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    quote:
      "As someone with a hectic schedule, SEA Catering has been a lifesaver. The convenience of having healthy, pre-planned meals delivered is unmatched. The variety keeps me excited about eating healthy.",
    date: "1 month ago",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Working Mom",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    quote:
      "Feeding my family healthy meals was always a challenge until I found SEA Catering. My kids actually ask for seconds now! The family meal plans have made dinner time stress-free and enjoyable.",
    date: "3 weeks ago",
  },
  {
    id: "4",
    name: "David Thompson",
    role: "Personal Trainer",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    quote:
      "I recommend SEA Catering to all my clients. The macro-balanced meals perfectly complement their fitness goals. The quality and taste are consistently outstanding.",
    date: "1 week ago",
  },
  {
    id: "5",
    name: "Lisa Park",
    role: "Nutritionist",
    company: "Wellness Center",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    quote:
      "From a professional standpoint, SEA Catering's meal plans are nutritionally sound and well-balanced. The ingredient quality is exceptional, and the portion sizes are perfect.",
    date: "2 months ago",
  },
  {
    id: "6",
    name: "James Wilson",
    role: "College Student",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4,
    quote:
      "Being a student on a budget, I was skeptical at first. But the value is incredible when you consider the time saved and the quality of ingredients. Plus, it's actually affordable!",
    date: "1 month ago",
  },
]

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what real customers have to say about their SEA Catering experience.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Display */}
          <div className="relative h-96 overflow-hidden rounded-2xl">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm shadow-xl">
                  <CardBody className="p-8 flex flex-col justify-center items-center text-center">
                    <Quote className="w-12 h-12 text-purple-400 mb-6" />

                    <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed max-w-2xl">
                      "{testimonials[currentIndex].quote}"
                    </blockquote>

                    <div className="flex items-center mb-4">{renderStars(testimonials[currentIndex].rating)}</div>

                    <div className="flex items-center gap-4">
                      <Avatar
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].name}
                        size="lg"
                        className="border-2 border-purple-200"
                      />
                      <div className="text-left">
                        <h4 className="font-semibold text-gray-900">{testimonials[currentIndex].name}</h4>
                        <p className="text-sm text-gray-600">
                          {testimonials[currentIndex].role}
                          {testimonials[currentIndex].company && <span> at {testimonials[currentIndex].company}</span>}
                        </p>
                        <p className="text-xs text-gray-400">{testimonials[currentIndex].date}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <Button
            isIconOnly
            variant="solid"
            color="primary"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 shadow-lg"
            onPress={prevTestimonial}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            isIconOnly
            variant="solid"
            color="primary"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 shadow-lg"
            onPress={nextTestimonial}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-purple-500 scale-125" : "bg-purple-200 hover:bg-purple-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Grid Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              isPressable
              onPress={() => goToTestimonial(index)}
            >
              <CardBody className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar src={testimonial.avatar} alt={testimonial.name} size="md" className="mr-3" />
                  <div>
                    <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">{renderStars(testimonial.rating)}</div>
                <p className="text-sm text-gray-700 line-clamp-3">"{testimonial.quote}"</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
