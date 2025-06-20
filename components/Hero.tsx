"use client"

import { useState } from "react"
import { Button } from "@heroui/button"
import { Card, CardBody } from "@heroui/card"
import { Badge } from "@heroui/badge"
import { ArrowRight, Play, Star, Award, Sparkles } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export const Hero = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const floatingCards = [
    {
      id: 1,
      title: "Mediterranean Bowl",
      price: "Rp259.000",
      rating: 4.9,
      image: "https://thebigmansworld.com/wp-content/uploads/2024/01/mediterranean-bowl-recipe.jpg",
      color: "from-emerald-400 to-teal-500",
      delay: 0,
    },
    {
      id: 2,
      title: "Protein Power Pack",
      price: "Rp229.000",
      rating: 4.8,
      image: "https://healthclub.methodgym.com/wp-content/uploads/2025/01/meal-prep-containers-filled-with-food-scaled.jpeg",
      color: "from-purple-400 to-pink-500",
      delay: 0.2,
    },
    {
      id: 3,
      title: "Fresh Garden Salad",
      price: "Rp209.000",
      rating: 4.7,
      image: "https://www.tasteofhome.com/wp-content/uploads/2025/02/Favorite-Mediterranean-Salad_EXPS_TOHcom25_41556_MD_P2_02_05_1b.jpg",
      color: "from-orange-400 to-red-500",
      delay: 0.4,
    },
  ]

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollY, [0, 500], [0, -100]) }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl"
        />

        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          className="absolute top-20 right-20 w-16 h-16 border-2 border-blue-300/30 rounded-lg"
        />
        <motion.div
          animate={{
            rotate: -360,
            y: [0, -20, 0],
          }}
          transition={{
            rotate: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          className="absolute bottom-32 right-32 w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-24 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            {/* Badge */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge content="New" color="primary" variant="flat" className="mb-4">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-200/50">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">AI-Powered Meal Planning</span>
                </div>
              </Badge>
            </motion.div> */}

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-5"
            >
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Healthy Meals,
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Anytime, Anywhere
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Transform your health journey with personalized meal plans, expert nutrition guidance, and delicious
                recipes crafted just for you.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-8"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white"
                    />
                  ))}
                </div>
                <div className="ml-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">4.9</span>
                  </div>
                  <p className="text-sm text-gray-600">10k+ happy customers</p>
                </div>
              </div>
              {/* <div className="h-8 w-px bg-gray-300" /> */}
              {/* <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-500" />
                <span className="font-semibold text-gray-900">Award Winning</span>
              </div> */}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                endContent={<ArrowRight className="w-5 h-5" />}
              >
                Start Your Journey
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative h-[600px] hidden lg:block"
          >
            {floatingCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50, rotate: -10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: index % 2 === 0 ? 5 : -5,
                }}
                transition={{
                  delay: card.delay + 0.8,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  transition: { duration: 0.3 },
                }}
                className={`absolute ${
                  index === 0 ? "top-0 left-0" : index === 1 ? "top-32 right-0" : "bottom-0 left-16"
                }`}
              >
                <Card className="w-72 bg-white/90 backdrop-blur-md shadow-2xl border-0 overflow-hidden">
                  <CardBody className="p-0">
                    <div className={`h-4 bg-gradient-to-r ${card.color}`} />
                    <div className="p-6">
                      <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
                        <Image src={card.image || "/placeholder.svg"} alt={card.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      <div className="flex justify-between items-start mb-2 mr-2">
                        <h3 className="font-bold text-base text-gray-900">{card.title}</h3>
                        <span className="text-base font-bold text-emerald-600">{card.price}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{card.rating}</span>
                        <span className="text-sm text-gray-500">(100+ reviews)</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
  <svg
    className="w-full h-24"
    viewBox="0 0 1200 120"
    fill="none"
    preserveAspectRatio="none"
  >
    <path d="M0 120C200 80 400 40 600 60C800 80 1000 40 1200 60V120H0Z" fill="white" />
  </svg>
</div>
    </section>
  )
}
