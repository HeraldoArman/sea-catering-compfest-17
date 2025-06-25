"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Chip } from "@heroui/chip";
import { Tabs, Tab } from "@heroui/tabs";
import { Avatar, AvatarIcon } from "@heroui/avatar";
import {
  User,
  Package,
  BarChart3,
  Users,
  Crown,
  Shield,
} from "lucide-react";
import { authClient } from "@/utils/auth-client";
import { useRouter } from "next/navigation";
import { UserSubscriptions } from "@/components/dashboard/UserSubscriptions";

import { AdminUserManagement } from "@/components/dashboard/AdminUserManagement";
import { AdminAnalytics } from "@/components/dashboard/AdminAnalytics";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("overview");

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  type UserWithRole = typeof session.user & { role?: string };
  const user = session.user as UserWithRole;
  const isAdmin = user.role === "admin";

  const userTabs = [
    { key: "overview", label: "Overview", icon: BarChart3 },
    { key: "subscriptions", label: "My Subscriptions", icon: Package },
  ];

  const adminTabs = [
    { key: "overview", label: "Overview", icon: BarChart3 },
    { key: "users", label: "User Management", icon: Users },
    { key: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  const tabs = isAdmin ? adminTabs : userTabs;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar
                size="lg"
                src={session?.user.image ?? undefined}
                icon={!session?.user.image ? <AvatarIcon /> : undefined}
                className="border-4 border-white shadow-lg"
              />

              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-2">
                  Welcome back, {session.user.name}
                  {isAdmin && <Crown className="w-6 h-6 text-yellow-500" />}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Chip
                    color={isAdmin ? "warning" : "primary"}
                    variant="flat"
                    startContent={
                      isAdmin ? (
                        <Shield className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )
                    }
                  >
                    {isAdmin ? "Administrator" : "User"}{" "}
                    {user.role && `(${user.role})`}
                  </Chip>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-600">{session.user.email}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            variant="underlined"
            classNames={{
              tabList:
                "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-blue-600",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-blue-600",
            }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.key}
                title={
                  <div className="flex items-center gap-2">
                    <tab.icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </div>
                }
              >
                <div className="py-6">
                  {tab.key === "overview" && (
                    <DashboardOverview isAdmin={isAdmin} user={session.user} />
                  )}
                  {tab.key === "subscriptions" && (
                    <UserSubscriptions userId={session.user.id} />
                  )}

                  {tab.key === "users" && isAdmin && <AdminUserManagement />}
                  {tab.key === "analytics" && isAdmin && <AdminAnalytics />}
                </div>
              </Tab>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
