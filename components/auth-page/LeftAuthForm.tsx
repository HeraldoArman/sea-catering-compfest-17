import React from "react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

interface LeftAuthFormProps {
  title: string;
  description: string;
  imageurl: string;
}

export const LeftAuthForm = ({title, description, imageurl} : LeftAuthFormProps) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:block relative"
      >
        <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src = {imageurl}
            // src="https://cdn-abeco.nitrocdn.com/vMCLEGbZccgRIgpGXvgkDDYcPokgENUq/assets/images/optimized/rev-300bd7b/gatheringdreams.com/wp-content/uploads/2022/10/healthy-meal-prep-2022-main-low.jpg"
            alt="Healthy meal"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Overlay Content */}
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                {title}
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                {description}
              </p>
            </motion.div>
          </div>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
