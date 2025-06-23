import React from 'react'
import NextLink from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
export const BackHome = () => {
  return (
    <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="absolute top-6 left-6 z-10"
  >
    <NextLink
      href="/"
      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="font-medium">Back to Home</span>
    </NextLink>
  </motion.div>
  )
}
