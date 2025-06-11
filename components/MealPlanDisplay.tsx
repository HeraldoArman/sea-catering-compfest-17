"use client"

import { useState } from "react"
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Button } from "@heroui/button"
import { Chip } from "@heroui/chip"
import { Tabs, Tab } from "@heroui/tabs"
import { ChevronDown, ChevronUp, Clock, Users, Flame } from "lucide-react"
import Image from "next/image"

interface Meal {
  id: string
  name: string
  description: string
  calories: number
  prepTime: string
  servings: number
  image: string
  ingredients: string[]
  category: "breakfast" | "lunch" | "dinner" | "snack"
}

interface DayPlan {
  day: string
  date: string
  meals: Meal[]
}

const sampleMealPlans: DayPlan[] = [
  {
    day: "Monday",
    date: "Dec 11",
    meals: [
      {
        id: "1",
        name: "Avocado Toast with Poached Egg",
        description:
          "Whole grain bread topped with fresh avocado, perfectly poached egg, and a sprinkle of everything seasoning",
        calories: 320,
        prepTime: "15 min",
        servings: 1,
        image: "/placeholder.svg?height=200&width=300",
        ingredients: ["Whole grain bread", "Avocado", "Egg", "Everything seasoning", "Olive oil"],
        category: "breakfast",
      },
      {
        id: "2",
        name: "Mediterranean Quinoa Bowl",
        description: "Protein-packed quinoa with fresh vegetables, feta cheese, and tahini dressing",
        calories: 450,
        prepTime: "25 min",
        servings: 1,
        image: "/placeholder.svg?height=200&width=300",
        ingredients: ["Quinoa", "Cucumber", "Tomatoes", "Feta cheese", "Olives", "Tahini"],
        category: "lunch",
      },
      {
        id: "3",
        name: "Grilled Salmon with Roasted Vegetables",
        description: "Fresh Atlantic salmon with seasonal roasted vegetables and lemon herb seasoning",
        calories: 520,
        prepTime: "30 min",
        servings: 1,
        image: "/placeholder.svg?height=200&width=300",
        ingredients: ["Salmon fillet", "Broccoli", "Bell peppers", "Zucchini", "Lemon", "Herbs"],
        category: "dinner",
      },
    ],
  },
  {
    day: "Tuesday",
    date: "Dec 12",
    meals: [
      {
        id: "4",
        name: "Greek Yogurt Parfait",
        description: "Creamy Greek yogurt layered with fresh berries and homemade granola",
        calories: 280,
        prepTime: "10 min",
        servings: 1,
        image: "/placeholder.svg?height=200&width=300",
        ingredients: ["Greek yogurt", "Mixed berries", "Granola", "Honey", "Chia seeds"],
        category: "breakfast",
      },
      {
        id: "5",
        name: "Asian Chicken Lettuce Wraps",
        description: "Lean ground chicken with Asian flavors wrapped in crisp butter lettuce",
        calories: 380,
        prepTime: "20 min",
        servings: 1,
        image: "/placeholder.svg?height=200&width=300",
        ingredients: ["Ground chicken", "Lettuce", "Ginger", "Soy sauce", "Sesame oil", "Green onions"],
        category: "lunch",
      },
      {
        id: "6",
        name: "Vegetarian Stuffed Bell Peppers",
        description: "Colorful bell peppers stuffed with quinoa, black beans, and vegetables",
        calories: 420,
        prepTime: "45 min",
        servings: 1,
        image: "/placeholder.svg?height=200&width=300",
        ingredients: ["Bell peppers", "Quinoa", "Black beans", "Corn", "Onions", "Cheese"],
        category: "dinner",
      },
    ],
  },
]

export const MealPlanDisplay = () => {
  const [selectedView, setSelectedView] = useState<"daily" | "weekly">("daily")
  const [expandedMeals, setExpandedMeals] = useState<Set<string>>(new Set())
  const [selectedDay, setSelectedDay] = useState(0)

  const toggleMealExpansion = (mealId: string) => {
    const newExpanded = new Set(expandedMeals)
    if (newExpanded.has(mealId)) {
      newExpanded.delete(mealId)
    } else {
      newExpanded.add(mealId)
    }
    setExpandedMeals(newExpanded)
  }

  const getCategoryColor = (category: Meal["category"]) => {
    switch (category) {
      case "breakfast":
        return "warning"
      case "lunch":
        return "primary"
      case "dinner":
        return "secondary"
      case "snack":
        return "success"
      default:
        return "default"
    }
  }

  const renderMealCard = (meal: Meal) => {
    const isExpanded = expandedMeals.has(meal.id)

    return (
      <Card key={meal.id} className="mb-4 hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start w-full">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Chip color={getCategoryColor(meal.category)} size="sm" variant="flat">
                  {meal.category.charAt(0).toUpperCase() + meal.category.slice(1)}
                </Chip>
                <div className="flex items-center gap-4 text-sm text-default-500">
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4" />
                    {meal.calories} cal
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {meal.prepTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {meal.servings} serving{meal.servings > 1 ? "s" : ""}
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold">{meal.name}</h3>
              <p className="text-default-600 text-sm mt-1">{meal.description}</p>
            </div>
            <Button isIconOnly variant="light" onPress={() => toggleMealExpansion(meal.id)} className="ml-2">
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </CardHeader>
        {isExpanded && (
          <CardBody className="pt-0">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/3">
                <Image
                  src={meal.image || "/placeholder.svg"}
                  alt={meal.name}
                  width={300}
                  height={200}
                  className="rounded-lg object-cover w-full h-48"
                />
              </div>
              <div className="md:w-2/3">
                <h4 className="font-semibold mb-2">Ingredients:</h4>
                <div className="flex flex-wrap gap-2">
                  {meal.ingredients.map((ingredient, index) => (
                    <Chip key={index} size="sm" variant="bordered">
                      {ingredient}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        )}
      </Card>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Personalized Meal Plan</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover delicious, nutritious meals planned just for you. Each meal is carefully crafted to meet your
            dietary needs and taste preferences.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <Tabs
            selectedKey={selectedView}
            onSelectionChange={(key) => setSelectedView(key as "daily" | "weekly")}
            className="w-full max-w-md"
          >
            <Tab key="daily" title="Daily View" />
            <Tab key="weekly" title="Weekly View" />
          </Tabs>
        </div>

        {selectedView === "daily" ? (
          <div>
            <div className="flex justify-center mb-8">
              <div className="flex gap-2 flex-wrap justify-center">
                {sampleMealPlans.map((dayPlan, index) => (
                  <Button
                    key={index}
                    variant={selectedDay === index ? "solid" : "bordered"}
                    color={selectedDay === index ? "primary" : "default"}
                    onPress={() => setSelectedDay(index)}
                    className="min-w-24"
                  >
                    <div className="text-center">
                      <div className="font-semibold">{dayPlan.day}</div>
                      <div className="text-xs opacity-70">{dayPlan.date}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-8">
                {sampleMealPlans[selectedDay].day}, {sampleMealPlans[selectedDay].date}
              </h3>
              {sampleMealPlans[selectedDay].meals.map(renderMealCard)}
            </div>
          </div>
        ) : (
          <div className="grid gap-8">
            {sampleMealPlans.map((dayPlan, dayIndex) => (
              <Card key={dayIndex} className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  {dayPlan.day}, {dayPlan.date}
                </h3>
                <div className="grid gap-4">{dayPlan.meals.map(renderMealCard)}</div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
