"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fitness Coach",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 5,
    quote:
      "SEA Catering transformed my approach to nutrition. The personalized meal plans are incredible, and I've never felt healthier. My clients love the recommendations too!",
    color: "from-pink-400 to-rose-500",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Busy Executive",
    avatar: "https://randomuser.me/api/portraits/men/94.jpg",
    rating: 5,
    quote:
      "As someone with zero time to meal prep, SEA Catering has been a game-changer. Healthy, delicious meals delivered right to my door. Worth every penny!",
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Working Mom",
    avatar: "https://randomuser.me/api/portraits/women/87.jpg",
    rating: 5,
    quote:
      "Finally, a service that understands family nutrition! My kids actually enjoy healthy eating now, and meal planning stress is completely gone.",
    color: "from-emerald-400 to-teal-500",
  },
];

export const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Our{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from real people who have transformed their health
            journey with SEA Catering.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
                <CardBody className="p-12 text-center">
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${testimonials[currentIndex].color} flex items-center justify-center mx-auto mb-8`}
                  >
                    <Quote className="w-10 h-10 text-white" />
                  </div>

                  <blockquote className="text-2xl text-gray-700 mb-8 leading-relaxed font-medium">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>

                  <div className="flex justify-center mb-6">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <Avatar
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      size="lg"
                      className="border-4 border-white shadow-lg"
                    />
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900 text-lg">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-gray-600">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
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
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-purple-500 scale-125"
                    : "bg-purple-200 hover:bg-purple-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
