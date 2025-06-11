import React from "react";
import { Button } from "@heroui/button";
import { ArrowRight } from "lucide-react";
const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-teal-400 via-teal-600 to-teal-800 relative overflow-hidden flex items-center justify-center min-h-screen text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <path
            d="M0 400C200 300 400 500 600 400C800 300 1000 500 1200 400V800H0V400Z"
            fill="currentColor"
          />
          <path
            d="M0 200C200 100 400 300 600 200C800 100 1000 300 1200 200V600H0V200Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Delicious Recipes
            <br />
            and Diet Workout
          </h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            SEA Catering's core philosophy is not just about eating healthy, we
            believe it's equally important that the food be colorful, beautiful
            and, of course, delicious.
          </p>
          <Button
            size="lg"
            className="bg-white text-teal-800 hover:bg-teal-50 font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            endContent={<ArrowRight className="w-5 h-5" />}
          >
            Explore Products
          </Button>
        </div>

        {/* Floating Product Cards */}
        <div className="relative max-w-6xl mx-auto">
          {/* Spice Card - Top Left */}
          <div className="absolute top-0 left-0 w-80 bg-red-400 rounded-3xl p-6 shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-300">
            <div className="relative">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-md">
                <div className="w-6 h-6 bg-red-400 rounded-full"></div>
              </div>
              <div className="mb-4">
                <div className="w-full h-24 bg-red-300 rounded-lg mb-4"></div>
              </div>
              <div className="bg-white rounded-full px-4 py-2 inline-block mb-4 shadow-md">
                <span className="font-bold text-gray-800">$14.69</span>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Globally cherished blend of aromatic spices, our dish brings
                depth to any dish it graces.
              </p>
            </div>
          </div>

          {/* Pesto Card - Left */}
          <div className="absolute top-32 left-20 w-72 bg-green-300 rounded-3xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Pesto</h3>
            <div className="mb-4">
              <div className="w-32 h-20 bg-green-400 rounded-lg mx-auto"></div>
            </div>
            <div className="bg-white rounded-full px-4 py-2 inline-block mb-4 shadow-md">
              <span className="font-bold text-gray-800">$28.50</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Pesto, beloved for its rich flavor and versatility in pasta,
              sandwiches, and grilled vegetables.
            </p>
          </div>

          {/* Salsa Card - Center */}
          <div className="absolute top-64 left-1/2 transform -translate-x-1/2 w-80 bg-purple-500 rounded-3xl p-6 shadow-2xl hover:scale-105 transition-transform duration-300">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-md ml-auto">
              <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Salsa</h3>
            <div className="mb-4">
              <div className="w-40 h-24 bg-purple-400 rounded-lg mx-auto"></div>
            </div>
            <div className="bg-white rounded-full px-4 py-2 inline-block mb-4 shadow-md">
              <span className="font-bold text-gray-800">$14.49</span>
            </div>
            <p className="text-purple-100 text-sm leading-relaxed">
              Salsa, a vibrant medley of tomatoes, onions, peppers, and herbs,
              adds a burst of freshness and spice to dishes.
            </p>
          </div>

          {/* Oyster Card - Right */}
          <div className="absolute top-20 right-20 w-72 bg-blue-300 rounded-3xl p-6 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Oyster</h3>
            <div className="mb-4">
              <div className="w-32 h-20 bg-blue-400 rounded-lg mx-auto"></div>
            </div>
            <div className="bg-red-400 text-white rounded-full px-4 py-2 inline-block mb-4 shadow-md">
              <span className="font-bold text-sm">Out of stock</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Oysters, prized delicacies of the sea, offer a taste of briny
              sweetness and a tender texture.
            </p>
          </div>

          {/* Tartar Card - Top Right */}
          <div className="absolute top-0 right-0 w-80 bg-pink-200 rounded-3xl p-6 shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Tartar</h3>
            <div className="mb-4">
              <div className="w-full h-24 bg-pink-300 rounded-lg"></div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Tartar sauce, a tangy companion to seafood, delights with its
              creamy texture and zesty flavor.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-32" viewBox="0 0 1200 120" fill="none">
          <path
            d="M0 120C200 80 400 40 600 60C800 80 1000 40 1200 60V120H0Z"
            fill="rgba(255,255,255,0.1)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
