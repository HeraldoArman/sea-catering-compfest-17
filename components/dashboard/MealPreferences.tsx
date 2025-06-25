"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Button } from "@heroui/button"
import { Chip } from "@heroui/chip"
import { CheckboxGroup, Checkbox } from "@heroui/checkbox"
import { Textarea } from "@heroui/input"
import { Slider } from "@heroui/slider"
import { Divider } from "@heroui/divider"
import { Switch } from "@heroui/switch"
import { Heart, Utensils, AlertTriangle, Flame, Leaf, Fish } from "lucide-react"
import { addToast } from "@heroui/toast"

interface MealPreferencesProps {
  userId: string
}

export function MealPreferences({ userId }: MealPreferencesProps) {
  const [preferences, setPreferences] = useState({
    dietaryRestrictions: [] as string[],
    allergies: "",
    spiceLevel: 2,
    portionSize: "medium",
    cuisinePreferences: [] as string[],
    nutritionGoals: [] as string[],
    avoidIngredients: "",
    preferOrganic: false,
    lowSodium: false,
    glutenFree: false,
    dairyFree: false,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const dietaryOptions = [
    { key: "vegetarian", label: "Vegetarian", icon: Leaf },
    { key: "vegan", label: "Vegan", icon: Leaf },
    { key: "pescatarian", label: "Pescatarian", icon: Fish },
    { key: "keto", label: "Keto", icon: Flame },
    { key: "paleo", label: "Paleo", icon: Heart },
    { key: "mediterranean", label: "Mediterranean", icon: Heart },
  ]

  const cuisineOptions = [
    "Indonesian",
    "Asian",
    "Mediterranean",
    "American",
    "Mexican",
    "Italian",
    "Japanese",
    "Thai",
    "Indian",
    "Middle Eastern",
  ]

  const nutritionGoals = [
    "Weight Loss",
    "Muscle Gain",
    "Heart Health",
    "Energy Boost",
    "Better Digestion",
    "Immune Support",
    "Anti-Inflammatory",
  ]

  useEffect(() => {
    fetchPreferences()
  }, [userId])

  const fetchPreferences = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data - replace with actual API call
      const mockPreferences = {
        dietaryRestrictions: ["vegetarian"],
        allergies: "Nuts, Shellfish",
        spiceLevel: 3,
        portionSize: "large",
        cuisinePreferences: ["Asian", "Mediterranean"],
        nutritionGoals: ["Weight Loss", "Heart Health"],
        avoidIngredients: "Processed foods, artificial sweeteners",
        preferOrganic: true,
        lowSodium: false,
        glutenFree: false,
        dairyFree: true,
      }

      setPreferences(mockPreferences)
    } catch (error) {
      console.error("Failed to fetch preferences:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSavePreferences = async () => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Preferences saved:", preferences)

      addToast({
        title: "Preferences Saved",
        description: "Your meal preferences have been updated successfully.",
        promise: new Promise((resolve) => setTimeout(resolve, 3000)),
        color: "success",
      })
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        promise: new Promise((resolve) => setTimeout(resolve, 3000)),
        color: "danger",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="shadow-lg border-0">
            <CardBody className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Meal Preferences</h2>
        <Button color="primary" onPress={handleSavePreferences} isLoading={saving}>
          Save Preferences
        </Button>
      </div>

      {/* Dietary Restrictions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="shadow-lg border-0">
          <CardHeader>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              Dietary Restrictions
            </h3>
          </CardHeader>
          <CardBody>
            <CheckboxGroup
              value={preferences.dietaryRestrictions}
              onValueChange={(value) => setPreferences((prev) => ({ ...prev, dietaryRestrictions: value }))}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dietaryOptions.map((option) => (
                  <Card key={option.key} className="p-4 hover:shadow-md transition-shadow">
                    <Checkbox value={option.key} className="w-full">
                      <div className="flex items-center gap-3">
                        <option.icon className="w-5 h-5 text-green-600" />
                        <span className="font-medium">{option.label}</span>
                      </div>
                    </Checkbox>
                  </Card>
                ))}
              </div>
            </CheckboxGroup>
          </CardBody>
        </Card>
      </motion.div>

      {/* Allergies & Restrictions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="shadow-lg border-0">
          <CardHeader>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Allergies & Food Restrictions
            </h3>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Food Allergies</label>
              <Textarea
                placeholder="List any food allergies (e.g., nuts, dairy, shellfish)"
                value={preferences.allergies}
                onValueChange={(value) => setPreferences((prev) => ({ ...prev, allergies: value }))}
                minRows={2}
                variant="bordered"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Ingredients to Avoid</label>
              <Textarea
                placeholder="List ingredients you prefer to avoid"
                value={preferences.avoidIngredients}
                onValueChange={(value) => setPreferences((prev) => ({ ...prev, avoidIngredients: value }))}
                minRows={2}
                variant="bordered"
              />
            </div>

            <Divider />

            {/* Quick Toggles */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">Gluten-Free</h4>
                  <p className="text-sm text-gray-600">Avoid gluten-containing ingredients</p>
                </div>
                <Switch
                  isSelected={preferences.glutenFree}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, glutenFree: value }))}
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">Dairy-Free</h4>
                  <p className="text-sm text-gray-600">Avoid dairy products</p>
                </div>
                <Switch
                  isSelected={preferences.dairyFree}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, dairyFree: value }))}
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">Low Sodium</h4>
                  <p className="text-sm text-gray-600">Prefer low-sodium options</p>
                </div>
                <Switch
                  isSelected={preferences.lowSodium}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, lowSodium: value }))}
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">Prefer Organic</h4>
                  <p className="text-sm text-gray-600">Choose organic ingredients when possible</p>
                </div>
                <Switch
                  isSelected={preferences.preferOrganic}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, preferOrganic: value }))}
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Taste Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="shadow-lg border-0">
          <CardHeader>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-blue-600" />
              Taste Preferences
            </h3>
          </CardHeader>
          <CardBody className="space-y-6">
            {/* Spice Level */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-gray-700">Spice Level</label>
                <Chip color="primary" variant="flat">
                  {preferences.spiceLevel === 1
                    ? "Mild"
                    : preferences.spiceLevel === 2
                      ? "Medium"
                      : preferences.spiceLevel === 3
                        ? "Spicy"
                        : "Very Spicy"}
                </Chip>
              </div>
              <Slider
                size="lg"
                step={1}
                minValue={1}
                maxValue={4}
                value={preferences.spiceLevel}
                onChange={(value) => setPreferences((prev) => ({ ...prev, spiceLevel: value as number }))}
                marks={[
                  { value: 1, label: "Mild" },
                  { value: 2, label: "Medium" },
                  { value: 3, label: "Spicy" },
                  { value: 4, label: "Very Spicy" },
                ]}
                className="max-w-md"
              />
            </div>

            <Divider />

            {/* Cuisine Preferences */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">Preferred Cuisines</label>
              <CheckboxGroup
                value={preferences.cuisinePreferences}
                onValueChange={(value) => setPreferences((prev) => ({ ...prev, cuisinePreferences: value }))}
              >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {cuisineOptions.map((cuisine) => (
                    <Checkbox key={cuisine} value={cuisine}>
                      {cuisine}
                    </Checkbox>
                  ))}
                </div>
              </CheckboxGroup>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Nutrition Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="shadow-lg border-0">
          <CardHeader>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600" />
              Nutrition Goals
            </h3>
          </CardHeader>
          <CardBody>
            <CheckboxGroup
              value={preferences.nutritionGoals}
              onValueChange={(value) => setPreferences((prev) => ({ ...prev, nutritionGoals: value }))}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nutritionGoals.map((goal) => (
                  <Card key={goal} className="p-4 hover:shadow-md transition-shadow">
                    <Checkbox value={goal} className="w-full">
                      <div className="flex items-center gap-3">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="font-medium">{goal}</span>
                      </div>
                    </Checkbox>
                  </Card>
                ))}
              </div>
            </CheckboxGroup>
          </CardBody>
        </Card>
      </motion.div>

      {/* Save Button */}
      <div className="flex justify-center pt-6">
        <Button color="primary" size="lg" onPress={handleSavePreferences} isLoading={saving} className="px-12">
          {saving ? "Saving Preferences..." : "Save All Preferences"}
        </Button>
      </div>
    </div>
  )
}
