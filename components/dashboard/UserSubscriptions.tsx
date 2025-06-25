"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import {
  Calendar,
  Package,
  Edit,
  Pause,
  Play,
  Trash2,
  Clock,
  Utensils,
  AlertTriangle,
} from "lucide-react";
import { plans } from "@/components/meal";

interface Subscription {
  id: string;
  plan: "diet" | "protein" | "royal";
  mealTypes: string[];
  deliveryDays: string[];
  allergies?: string;
  totalPrice: number;
  status: "active" | "paused" | "cancelled";
  nextDelivery: string;
  createdAt: string;
}

interface UserSubscriptionsProps {
  userId: string;
}

export function UserSubscriptions({ userId }: UserSubscriptionsProps) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchSubscriptions();
  }, [userId]);

  const fetchSubscriptions = async () => {
    try {
      // Simulate API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockSubscriptions: Subscription[] = [
        {
          id: "sub_1",
          plan: "protein",
          mealTypes: ["breakfast", "lunch"],
          deliveryDays: ["monday", "wednesday", "friday"],
          allergies: "Nuts, Dairy",
          totalPrice: 516000,
          status: "active",
          nextDelivery: "2024-01-15",
          createdAt: "2024-01-01",
        },
        {
          id: "sub_2",
          plan: "diet",
          mealTypes: ["lunch", "dinner"],
          deliveryDays: ["tuesday", "thursday", "saturday"],
          totalPrice: 387000,
          status: "paused",
          nextDelivery: "2024-01-20",
          createdAt: "2023-12-15",
        },
      ];

      setSubscriptions(mockSubscriptions);
    } catch (error) {
      console.error("Failed to fetch subscriptions:", error);
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

  const getPlanDetails = (planId: string) => {
    return plans.find((p) => p.id === planId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "paused":
        return "warning";
      case "cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  const handleSubscriptionAction = async (
    action: string,
    subscriptionId: string
  ) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub.id === subscriptionId
            ? {
                ...sub,
                status:
                  action === "pause"
                    ? "paused"
                    : action === "resume"
                      ? "active"
                      : "cancelled",
              }
            : sub
        )
      );
    } catch (error) {
      console.error(`Failed to ${action} subscription:`, error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i} className="shadow-lg border-0">
            <CardBody className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Subscriptions</h2>
        <Button
          color="primary"
          startContent={<Package className="w-4 h-4" />}
          onPress={() => (window.location.href = "/subscription")}
        >
          New Subscription
        </Button>
      </div>

      {subscriptions.length === 0 ? (
        <Card className="shadow-lg border-0">
          <CardBody className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Subscriptions Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start your healthy eating journey by creating your first
              subscription.
            </p>
            <Button
              color="primary"
              size="lg"
              onPress={() => (window.location.href = "/subscription")}
            >
              Create Subscription
            </Button>
          </CardBody>
        </Card>
      ) : (
        <div className="grid gap-6">
          {subscriptions.map((subscription, index) => {
            const planDetails = getPlanDetails(subscription.plan);

            return (
              <motion.div
                key={subscription.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                  <CardBody className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      {/* Subscription Info */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${planDetails?.color} flex items-center justify-center`}
                          >
                            <Package className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {planDetails?.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Chip
                                color={
                                  getStatusColor(subscription.status) as any
                                }
                                variant="flat"
                                size="sm"
                              >
                                {subscription.status.charAt(0).toUpperCase() +
                                  subscription.status.slice(1)}
                              </Chip>
                              <span className="text-2xl font-bold text-blue-600">
                                {formatPrice(subscription.totalPrice)}
                              </span>
                              <span className="text-gray-600">/month</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Utensils className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              Meals: {subscription.mealTypes.join(", ")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              Days: {subscription.deliveryDays.length} days/week
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              Next:{" "}
                              {new Date(
                                subscription.nextDelivery
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          {subscription.allergies && (
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-orange-400" />
                              <span className="text-sm text-gray-600">
                                Allergies: {subscription.allergies}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="bordered"
                          size="sm"
                          startContent={<Edit className="w-4 h-4" />}
                          onPress={() => {
                            setSelectedSubscription(subscription);
                            onOpen();
                          }}
                        >
                          Edit
                        </Button>

                        {subscription.status === "active" ? (
                          <Button
                            color="warning"
                            variant="bordered"
                            size="sm"
                            startContent={<Pause className="w-4 h-4" />}
                            onPress={() =>
                              handleSubscriptionAction("pause", subscription.id)
                            }
                          >
                            Pause
                          </Button>
                        ) : subscription.status === "paused" ? (
                          <Button
                            color="success"
                            variant="bordered"
                            size="sm"
                            startContent={<Play className="w-4 h-4" />}
                            onPress={() =>
                              handleSubscriptionAction(
                                "resume",
                                subscription.id
                              )
                            }
                          >
                            Resume
                          </Button>
                        ) : null}

                        <Button
                          color="danger"
                          variant="bordered"
                          size="sm"
                          startContent={<Trash2 className="w-4 h-4" />}
                          onPress={() =>
                            handleSubscriptionAction("cancel", subscription.id)
                          }
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Edit Subscription Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            <h3 className="text-xl font-bold">Edit Subscription</h3>
          </ModalHeader>
          <ModalBody>
            {selectedSubscription && (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Editing subscription for{" "}
                  {getPlanDetails(selectedSubscription.plan)?.name}
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    To modify your subscription details, please contact our
                    support team or create a new subscription.
                  </p>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" onPress={onClose}>
              Close
            </Button>
            <Button
              color="primary"
              onPress={() => (window.location.href = "/contact")}
            >
              Contact Support
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
