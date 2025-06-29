"use client";

import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { DateRangePicker } from "@heroui/date-picker";
import { Button } from "@heroui/button";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  Calendar,
  BarChart3,
  RefreshCw,
  Plus,
  ArrowUp,
} from "lucide-react";
import { getLocalTimeZone, today } from "@internationalized/date";

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
    newSubscriptions: number;
    reactivations: number;
    growth: number;
  };
  meals: {
    delivered: number;
    pending: number;
    change: number;
  };
  mrr: {
    current: number;
    previous: number;
    change: number;
  };
}

export function AdminAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<any>({
    start: today(getLocalTimeZone()).subtract({ days: 30 }),
    end: today(getLocalTimeZone()),
  });

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const startDate = dateRange.start.toString();
      const endDate = dateRange.end.toString();

      const res = await fetch(
        `/api/dashboard/admin/analytics?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`,
        { cache: "no-store" },
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: AnalyticsData = await res.json();

      setAnalytics(data);
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

  const handleDateRangeChange = (range: any) => {
    if (range?.start && range?.end) {
      setDateRange(range);
    }
  };

  const resetToLast30Days = () => {
    setDateRange({
      start: today(getLocalTimeZone()).subtract({ days: 30 }),
      end: today(getLocalTimeZone()),
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="shadow-lg border-0">
            <CardBody className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/3" />
                <div className="h-8 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
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
      {/* Header with Date Range Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Analytics Dashboard
        </h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <DateRangePicker
            className="w-full sm:w-80"
            label="Date Range"
            startContent={<Calendar className="w-4 h-4 text-gray-400" />}
            value={dateRange}
            variant="bordered"
            onChange={handleDateRangeChange}
          />
          <Button
            size="sm"
            startContent={<RefreshCw className="w-4 h-4" />}
            variant="bordered"
            onPress={resetToLast30Days}
          >
            Last 30 Days
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Monthly Recurring Revenue (MRR) */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <Chip
                  color={getChangeColor(analytics.mrr.change) as any}
                  size="sm"
                  startContent={React.createElement(
                    getChangeIcon(analytics.mrr.change),
                    {
                      className: "w-3 h-3",
                    },
                  )}
                  variant="flat"
                >
                  {(analytics.mrr.change ?? 0) > 0 ? "+" : ""}
                  {(analytics.mrr.change ?? 0).toFixed(1)}%
                </Chip>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {formatPrice(analytics.mrr.current)}
              </h3>
              <p className="text-gray-600 text-sm">Monthly Recurring Revenue</p>
            </CardBody>
          </Card>
        </motion.div>

        {/* New Subscriptions */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <Chip
                  color="success"
                  size="sm"
                  startContent={<ArrowUp className="w-3 h-3" />}
                  variant="flat"
                >
                  New
                </Chip>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {formatNumber(analytics.subscriptions.newSubscriptions)}
              </h3>
              <p className="text-gray-600 text-sm">New Subscriptions</p>
            </CardBody>
          </Card>
        </motion.div>

        {/* Reactivations */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
                <Chip
                  color="warning"
                  size="sm"
                  startContent={<RefreshCw className="w-3 h-3" />}
                  variant="flat"
                >
                  Renewed
                </Chip>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {formatNumber(analytics.subscriptions.reactivations)}
              </h3>
              <p className="text-gray-600 text-sm">Reactivations</p>
            </CardBody>
          </Card>
        </motion.div>
      </div>

      {/* Secondary Metrics - Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <Chip
                  color={getChangeColor(analytics.users.change) as any}
                  size="sm"
                  startContent={React.createElement(
                    getChangeIcon(analytics.users.change),
                    {
                      className: "w-3 h-3",
                    },
                  )}
                  variant="flat"
                >
                  {(analytics.users.change ?? 0) > 0 ? "+" : ""}
                  {(analytics.users.change ?? 0).toFixed(1)}%
                </Chip>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {formatNumber(analytics.users.total)}
              </h3>
              <p className="text-gray-600 text-sm">Total Users</p>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <Chip
                  color={getChangeColor(analytics.subscriptions.growth) as any}
                  size="sm"
                  startContent={React.createElement(
                    getChangeIcon(analytics.subscriptions.growth),
                    {
                      className: "w-3 h-3",
                    },
                  )}
                  variant="flat"
                >
                  {(analytics.subscriptions.growth ?? 0) > 0 ? "+" : ""}
                  {(analytics.subscriptions.growth ?? 0).toFixed(1)}%
                </Chip>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {formatNumber(analytics.subscriptions.active)}
              </h3>
              <p className="text-gray-600 text-sm">Active Subscriptions</p>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <Chip
                  color="success"
                  size="sm"
                  startContent={<Plus className="w-3 h-3" />}
                  variant="flat"
                >
                  New
                </Chip>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {formatNumber(analytics.users.new)}
              </h3>
              <p className="text-gray-600 text-sm">New Users</p>
            </CardBody>
          </Card>
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardBody className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Period Summary
              </h3>
              <p className="text-gray-600 mb-4">
                {dateRange.start.toString()} to {dateRange.end.toString()}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-blue-600">
                    {formatNumber(analytics.subscriptions.newSubscriptions)}
                  </div>
                  <div className="text-gray-600">New Subscriptions</div>
                </div>
                <div>
                  <div className="font-semibold text-green-600">
                    {formatPrice(analytics.mrr.current)}
                  </div>
                  <div className="text-gray-600">MRR</div>
                </div>
                <div>
                  <div className="font-semibold text-orange-600">
                    {formatNumber(analytics.subscriptions.reactivations)}
                  </div>
                  <div className="text-gray-600">Reactivations</div>
                </div>
                <div>
                  <div className="font-semibold text-purple-600">
                    {(analytics.subscriptions.growth ?? 0).toFixed(1)}%
                  </div>
                  <div className="text-gray-600">Growth Rate</div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}
