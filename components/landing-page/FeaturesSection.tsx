"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Sparkles, Heart, Clock, Users, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Personalized Menu Recommendations",
    description:
      "Get daily menu suggestions tailored to your taste, allergies, and health goals for a unique dining experience.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Heart,
    title: "Health-First Approach",
    description:
      "Every meal is crafted with your health goals in mind, ensuring optimal nutrition and wellness.",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Clock,
    title: "Time-Saving Solutions",
    description:
      "Quick and easy meal prep with detailed instructions that fit your busy lifestyle.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Users,
    title: "Community Support",
    description:
      "Join thousands of health enthusiasts sharing recipes, tips, and success stories.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description:
      "Premium ingredients and rigorous quality standards ensure the best dining experience.",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "See improvements in energy, mood, and overall health within the first week.",
    color: "from-violet-500 to-purple-500",
  },
];

export const FeaturesSection = () => {
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
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SEA Catering
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the perfect blend of technology, nutrition science, and
            culinary expertise designed to transform your health journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <CardBody className="p-8">
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div
                      className={`absolute -inset-2 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
