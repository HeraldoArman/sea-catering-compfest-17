import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface LeftAuthFormProps {
  title: string;
  description: string;
  imageurl: string;
}

export const LeftAuthForm = ({
  title,
  description,
  imageurl,
}: LeftAuthFormProps) => {
  return (
    <div>
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:block relative"
        initial={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            fill
            unoptimized
            alt="Healthy meal"
            className="object-cover"
            src={imageurl}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Overlay Content */}
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4">{title}</h2>
              <p className="text-lg text-white/90 leading-relaxed">
                {description}
              </p>
            </motion.div>
          </div>

          {/* Floating Stats */}
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.8, duration: 0.6 }}
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
