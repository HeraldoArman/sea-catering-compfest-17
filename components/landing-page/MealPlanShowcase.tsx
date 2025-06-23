"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Clock, Users, Flame, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const mealPlans = [
  {
    id: 1,
    name: "Mediterranean Delight",
    description:
      "Fresh ingredients from the Mediterranean coast, rich in healthy fats and antioxidants.",
    image:
      "https://thebigmansworld.com/wp-content/uploads/2024/01/mediterranean-bowl-recipe.jpg",
    calories: 450,
    prepTime: "25 min",
    servings: 2,
    category: "Lunch",
    ingredients: ["Quinoa", "Olives", "Feta", "Tomatoes", "Cucumber"],
    color: "from-emerald-400 to-teal-500",
  },
  {
    id: 2,
    name: "Protein Power Bowl",
    description:
      "High-protein meal perfect for post-workout recovery and muscle building.",
    image:
      "https://healthclub.methodgym.com/wp-content/uploads/2025/01/meal-prep-containers-filled-with-food-scaled.jpeg",
    calories: 520,
    prepTime: "20 min",
    servings: 1,
    category: "Dinner",
    ingredients: ["Grilled Chicken", "Sweet Potato", "Broccoli", "Avocado"],
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 3,
    name: "Fresh Garden Salad",
    description:
      "Crisp vegetables and leafy greens with a zesty lemon vinaigrette.",
    image:
      "https://www.tasteofhome.com/wp-content/uploads/2025/02/Favorite-Mediterranean-Salad_EXPS_TOHcom25_41556_MD_P2_02_05_1b.jpg",
    calories: 280,
    prepTime: "15 min",
    servings: 1,
    category: "Lunch",
    ingredients: ["Mixed Greens", "Cherry Tomatoes", "Carrots", "Lemon"],
    color: "from-green-400 to-emerald-500",
  },
];

export const MealPlanShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextMeal = () => {
    setCurrentIndex((prev) => (prev + 1) % mealPlans.length);
  };

  const prevMeal = () => {
    setCurrentIndex((prev) => (prev - 1 + mealPlans.length) % mealPlans.length);
  };

  const currentMeal = mealPlans[currentIndex];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Discover Your Perfect{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Meal Plan
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Each meal is carefully crafted by our nutrition experts to provide
            the perfect balance of taste, health, and convenience.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Card className="overflow-hidden shadow-2xl border-0">
                <CardBody className="p-0">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-96 lg:h-full">
                      <Image
                        src={currentMeal.image || "/placeholder.svg"}
                        alt={currentMeal.name}
                        fill
                        className="object-cover"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${currentMeal.color} opacity-20`}
                      />
                      <div className="absolute top-6 left-6">
                        <Chip
                          color="primary"
                          variant="solid"
                          className="text-white font-semibold"
                        >
                          {currentMeal.category}
                        </Chip>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-12 flex flex-col justify-center">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                      >
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                          {currentMeal.name}
                        </h3>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                          {currentMeal.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-6 mb-8">
                          <div className="flex items-center gap-2">
                            <Flame className="w-5 h-5 text-orange-500" />
                            <span className="font-semibold text-gray-900">
                              {currentMeal.calories} cal
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-500" />
                            <span className="font-semibold text-gray-900">
                              {currentMeal.prepTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-green-500" />
                            <span className="font-semibold text-gray-900">
                              {currentMeal.servings} serving
                              {currentMeal.servings > 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>

                        {/* Ingredients */}
                        <div className="mb-8">
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Key Ingredients:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {currentMeal.ingredients.map(
                              (ingredient, index) => (
                                <Chip
                                  key={index}
                                  variant="bordered"
                                  className="border-gray-300"
                                >
                                  {ingredient}
                                </Chip>
                              )
                            )}
                          </div>
                        </div>

                        <Button
                          size="lg"
                          className={`bg-gradient-to-r ${currentMeal.color} text-white font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                        >
                          Add to Meal Plan
                        </Button>
                      </motion.div>
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
            onPress={prevMeal}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            isIconOnly
            variant="solid"
            color="primary"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 shadow-lg"
            onPress={nextMeal}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {mealPlans.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-500 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
