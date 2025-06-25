"use client";

import React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Chip } from "@heroui/chip";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";

interface AnalyticsData {
  revenue: {
    current: number;
    previous: number;
    change: number;
  };
  users: {
    total: number;
    new: number;
    active: number;
    change: number;
  };
  subscriptions: {
    total: number;
    active: number;
    cancelled: number;
    change: number;
  };
  meals: {
    delivered: number;
    pending: number;
    change: number;
  };
}

export function AdminAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockAnalytics: AnalyticsData = {
        revenue: {
          current: 45200000,
          previous: 38500000,
          change: 17.4,
        },
        users: {
          total: 1234,
          new: 156,
          active: 892,
          change: 12.3,
        },
        subscriptions: {
          total: 856,
          active: 734,
          cancelled: 122,
          change: 8.7,
        },
        meals: {
          delivered: 12456,
          pending: 234,
          change: 22.1,
        },
      };

      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? "success" : "danger";
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? TrendingUp : TrendingDown;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="shadow-lg border-0">
            <CardBody className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Analytics Dashboard
        </h2>

      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {formatPrice(analytics.revenue.current)}
              </h3>
              <p className="text-gray-600 text-sm">Total Revenue</p>

            </CardBody>
          </Card>
        </motion.div>

        {/* Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>

              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {formatNumber(analytics.users.total)}
              </h3>
              <p className="text-gray-600 text-sm">Total Users</p>
            </CardBody>
          </Card>
        </motion.div>

        {/* Subscriptions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>

              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {formatNumber(analytics.subscriptions.total)}
              </h3>
              <p className="text-gray-600 text-sm">Total Subscriptions</p>

            </CardBody>
          </Card>
        </motion.div>

        {/* Meals Delivered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>

              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {formatNumber(analytics.meals.delivered)}
              </h3>
              <p className="text-gray-600 text-sm">Meals Delivered</p>

            </CardBody>
          </Card>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-lg border-0">
            <CardHeader>
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Revenue Trend
              </h3>
            </CardHeader>
            <CardBody>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Revenue chart would be displayed here
                  </p>
                  <p className="text-sm text-gray-400">
                    Integration with charting library needed
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Subscription Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="shadow-lg border-0">
            <CardHeader>
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-purple-600" />
                Subscription Plans
              </h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-gray-700">Diet Plan</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">342</div>
                    <div className="text-sm text-gray-500">40%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span className="text-gray-700">Protein Plan</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">294</div>
                    <div className="text-sm text-gray-500">34%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                    <span className="text-gray-700">Royal Plan</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">220</div>
                    <div className="text-sm text-gray-500">26%</div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
