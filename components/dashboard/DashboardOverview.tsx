import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";

type Stat = {
  label: string;
  value: string;
  change: string;
  color: string;
};

export function DashboardOverview({
  isAdmin,
  user,
}: {
  isAdmin: boolean;
  user: any;
}) {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const isAdminUser = isAdmin && user?.role === "admin";

  useEffect(() => {
    setLoading(true);
    if (isAdminUser) {
      fetch("/api/dashboard/admin/overview")
        .then((res) => res.json())
        .then((data) => {
          setStats([
            {
              label: "Total Users",
              value: data.totalUsers.toLocaleString(),
              change: "+12%",
              color: "from-blue-500 to-cyan-500",
            },
            {
              label: "Active Subscriptions",
              value: data.activeSubscriptions.toLocaleString(),
              change: "+8%",
              color: "from-green-500 to-emerald-500",
            },
            {
              label: "Monthly Recurring Revenue",
              value: `Rp ${data.totalRevenue.toLocaleString()}`,
              change: "+15%",
              color: "from-purple-500 to-pink-500",
            },
            {
              label: "Meals Delivered",
              value: data.mealsDelivered.toLocaleString(),
              change: "+22%",
              color: "from-orange-500 to-red-500",
            },
          ]);
          setLoading(false);
        });
    } else {
      fetch("/api/dashboard/user/overview")
        .then((res) => res.json())
        .then((data) => {
          setStats([
            {
              label: "My Subscriptions",
              value: data.mySubscriptions.toLocaleString(),
              change: "+5%",
              color: "from-blue-500 to-cyan-500",
            },
            {
              label: "Meals Delivered",
              value: data.mealsDelivered.toLocaleString(),
              change: "+10%",
              color: "from-green-500 to-emerald-500",
            },
            {
              label: "Total Spend",
              value: `Rp ${data.totalSpend.toLocaleString()}`,
              change: "+8%",
              color: "from-purple-500 to-pink-500",
            },
            {
              label: "Active Subscription",
              value: data.activeSubscriptionsCount.toLocaleString(),
              change: "+15%",
              color: "from-orange-500 to-red-500",
            },
          ]);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="ml-4 text-gray-500">Loading stats...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
