"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  {
    number: 50000,
    suffix: "+",
    label: "Happy Customers",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: 1000000,
    suffix: "+",
    label: "Meals Delivered",
    color: "from-emerald-500 to-teal-500",
  },
  {
    number: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    color: "from-purple-500 to-pink-500",
  },
  {
    number: 24,
    suffix: "/7",
    label: "Support Available",
    color: "from-orange-500 to-red-500",
  },
];

const getNumberSizeClass = (num: number) => {
  const len = num.toString().length;

  if (len <= 4) return "text-5xl";
  if (len <= 6) return "text-4xl";
  if (len <= 8) return "text-3xl";

  return "text-2xl";
};
const CountUpAnimation = ({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(end * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const StatsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our growing community of health-conscious individuals who have
            transformed their lives with SEA Catering.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              <div className="relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl scale-110`}
                />
                <div className="relative bg-white rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div
                    className={`text-4xl lg:text-5xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-2`}
                  >
                    <span className={getNumberSizeClass(stat.number)}>
                      <CountUpAnimation
                        end={stat.number}
                        suffix={stat.suffix}
                      />
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
