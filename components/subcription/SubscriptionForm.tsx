"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { RadioGroup, Radio } from "@heroui/radio";
import { CheckboxGroup, Checkbox } from "@heroui/checkbox";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Phone,
  CreditCard,
  Utensils,
  Calendar,
  AlertTriangle,
  Calculator,
  CheckCircle,
} from "lucide-react";
import { authClient } from "@/utils/auth-client";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/toast";
import { plans } from "../meal";
const subscriptionSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  plan: z.enum(["diet", "protein", "royal"], {
    required_error: "Please select a plan",
  }),
  mealTypes: z.array(z.string()).min(1, "Please select at least one meal type"),
  deliveryDays: z
    .array(z.string())
    .min(1, "Please select at least one delivery day"),
  allergies: z.string().optional(),
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;


const mealTypes = [
  { id: "breakfast", name: "Breakfast", icon: "🌅" },
  { id: "lunch", name: "Lunch", icon: "☀️" },
  { id: "dinner", name: "Dinner", icon: "🌙" },
];

const deliveryDays = [
  { id: "monday", name: "Monday", short: "Mon" },
  { id: "tuesday", name: "Tuesday", short: "Tue" },
  { id: "wednesday", name: "Wednesday", short: "Wed" },
  { id: "thursday", name: "Thursday", short: "Thu" },
  { id: "friday", name: "Friday", short: "Fri" },
  { id: "saturday", name: "Saturday", short: "Sat" },
  { id: "sunday", name: "Sunday", short: "Sun" },
];

export const SubscriptionForm = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: data?.user?.name || "",
      phone: "",
      plan: undefined,
      mealTypes: [],
      deliveryDays: [],
      allergies: "",
    },
  });
  console.log(data?.user.name);
  useEffect(() => {
    if (data?.user?.name) {
      setValue("name", data.user.name);
    }
  }, [data?.user?.name, setValue]);

  const watchedValues = watch();
  useEffect(() => {
    const { plan, mealTypes, deliveryDays } = watchedValues;

    if (plan && mealTypes?.length > 0 && deliveryDays?.length > 0) {
      const selectedPlan = plans.find((p) => p.id === plan);
      if (selectedPlan) {
        const planPrice = selectedPlan.price;
        const mealCount = mealTypes.length;
        const dayCount = deliveryDays.length;
        const multiplier = 4.3; // Monthly multiplier

        const total = planPrice * mealCount * dayCount * multiplier;
        setTotalPrice(total);
      }
    } else {
      setTotalPrice(0);
    }
  }, [watchedValues]);

  const onSubmit = async (formData: SubscriptionFormData) => {
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        totalPrice,
      };

      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Unknown error");
      }

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Subscription error:", error);
      addToast({
        title: "Error",
        description: error,
        promise: new Promise((resolve) => setTimeout(resolve, 5000)),
        color: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const selectedPlan = plans.find((p) => p.id === watchedValues.plan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Create Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Subscription
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Customize your meal plan and start your healthy eating journey today
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="shadow-xl border-0">
                <CardHeader className="pb-4">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <User className="w-6 h-6 text-blue-600" />
                    Subscription Details
                  </h2>
                </CardHeader>
                <CardBody>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Personal Information
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <Controller
                          name="name"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              label="Full Name *"
                              placeholder="Enter your full name"
                              variant="bordered"
                              startContent={
                                <User className="w-4 h-4 text-gray-400" />
                              }
                              isInvalid={!!errors.name}
                              errorMessage={errors.name?.message}
                            />
                          )}
                        />

                        <Controller
                          name="phone"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              label="Active Phone Number *"
                              placeholder="Enter your phone number"
                              variant="bordered"
                              startContent={
                                <Phone className="w-4 h-4 text-gray-400" />
                              }
                              isInvalid={!!errors.phone}
                              errorMessage={errors.phone?.message}
                            />
                          )}
                        />
                      </div>
                    </div>

                    <Divider />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Choose Your Plan *
                      </h3>

                      <Controller
                        name="plan"
                        control={control}
                        render={({ field }) => (
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            isInvalid={!!errors.plan}
                            errorMessage={errors.plan?.message}
                          >
                            <div className="grid md:grid-cols-3 gap-4">
                              {plans.map((plan) => (
                                <div key={plan.id} className="relative">
                                  <Radio value={plan.id} className="hidden" />
                                  <Card
                                    isPressable
                                    onPress={() => field.onChange(plan.id)}
                                    className={`cursor-pointer transition-all duration-300 overflow-hidden ${
                                      field.value === plan.id
                                        ? "ring-2 ring-blue-500 shadow-lg scale-105"
                                        : "hover:shadow-md hover:scale-102"
                                    }`}
                                  >

                                    <img
                                      src={plan.image}
                                      alt={plan.name}
                                      className="w-full h-40 object-cover"
                                    />
                                    <CardBody className="p-4 text-center">
                                      <h4 className="font-bold text-lg text-gray-900 mb-1">
                                        {plan.name}
                                      </h4>
                                      <p className="text-2xl font-bold text-blue-600 mb-1">
                                        {formatPrice(plan.price)}
                                      </p>
                                      <p className="text-sm text-gray-600 mb-2">
                                        per meal
                                      </p>
                                      <p className="text-xs text-gray-500 min-h-[40px]">
                                        {plan.description}
                                      </p>

                                      {field.value === plan.id && (
                                        <div className="absolute top-2 right-2 bg-white rounded-full p-0.5">
                                          <CheckCircle className="w-6 h-6 text-blue-600" />
                                        </div>
                                      )}
                                    </CardBody>
                                  </Card>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                        )}
                      />
                    </div>

                    <Divider />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Utensils className="w-5 h-5" />
                        Select Meal Types *
                      </h3>

                      <Controller
                        name="mealTypes"
                        control={control}
                        render={({ field }) => (
                          <CheckboxGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            isInvalid={!!errors.mealTypes}
                            errorMessage={errors.mealTypes?.message}
                          >
                            <div className="grid md:grid-cols-3 gap-4">
                              {mealTypes.map((meal) => (
                                <Card key={meal.id} className="p-4">
                                  <Checkbox value={meal.id} className="w-full">
                                    <div className="flex items-center gap-3">
                                      <span className="text-2xl">
                                        {meal.icon}
                                      </span>
                                      <span className="font-medium">
                                        {meal.name}
                                      </span>
                                    </div>
                                  </Checkbox>
                                </Card>
                              ))}
                            </div>
                          </CheckboxGroup>
                        )}
                      />
                    </div>

                    <Divider />


                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Select Delivery Days *
                      </h3>

                      <Controller
                        name="deliveryDays"
                        control={control}
                        render={({ field }) => (
                          <CheckboxGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            isInvalid={!!errors.deliveryDays}
                            errorMessage={errors.deliveryDays?.message}
                          >
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                              {deliveryDays.map((day) => (
                                <Card key={day.id} className="p-3">
                                  <Checkbox value={day.id} className="w-full">
                                    <div className="text-center">
                                      <div className="font-medium text-sm">
                                        {day.short}
                                      </div>

                                      <div className="text-xs text-gray-600">
                                        {day.name}
                                      </div>
                                    </div>
                                  </Checkbox>
                                </Card>
                              ))}
                            </div>
                          </CheckboxGroup>
                        )}
                      />
                    </div>

                    <Divider />

                    {/* Allergies */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Allergies & Dietary Restrictions
                      </h3>

                      <Controller
                        name="allergies"
                        control={control}
                        render={({ field }) => (
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              List any allergies or dietary restrictions
                            </label>
                            <textarea
                              {...field}
                              placeholder="e.g., Nuts, Dairy, Gluten, Vegetarian preferences..."
                              className="w-full min-h-[100px] p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 resize-vertical"
                              rows={3}
                            />
                          </div>
                        )}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        isLoading={isSubmitting}
                        isDisabled={totalPrice === 0}
                      >
                        {isSubmitting
                          ? "Creating Subscription..."
                          : "Create Subscription"}
                      </Button>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </motion.div>
          </div>

          {/* Price Summary Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="sticky top-24"
            >
              <Card className="shadow-xl border-0">
                <CardHeader className="pb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-blue-600" />
                    Price Summary
                  </h3>
                </CardHeader>
                <CardBody className="space-y-6">
                  {/* Selected Plan */}
                  {selectedPlan && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Selected Plan:
                        </span>
                        <Chip color="primary" variant="flat">
                          {selectedPlan.name}
                        </Chip>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Price per meal:
                        </span>
                        <span className="font-semibold">
                          {formatPrice(selectedPlan.price)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Meal Types */}
                  {watchedValues.mealTypes &&
                    watchedValues.mealTypes.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Meal Types:
                          </span>
                          <span className="font-semibold">
                            {watchedValues.mealTypes.length}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {watchedValues.mealTypes.map((mealId) => {
                            const meal = mealTypes.find((m) => m.id === mealId);
                            return meal ? (
                              <Chip key={mealId} size="sm" variant="flat">
                                {meal.icon} {meal.name}
                              </Chip>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                  {/* Delivery Days */}
                  {watchedValues.deliveryDays &&
                    watchedValues.deliveryDays.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Delivery Days:
                          </span>
                          <span className="font-semibold">
                            {watchedValues.deliveryDays.length} days
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {watchedValues.deliveryDays.map((dayId) => {
                            const day = deliveryDays.find(
                              (d) => d.id === dayId
                            );
                            return day ? (
                              <Chip key={dayId} size="sm" variant="flat">
                                {day.short}
                              </Chip>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                  <Divider />

                  {/* Price Calculation */}
                  {totalPrice > 0 && selectedPlan && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">
                        Monthly Calculation:
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Plan Price:</span>
                          <span>{formatPrice(selectedPlan.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">× Meal Types:</span>
                          <span>× {watchedValues.mealTypes?.length || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            × Delivery Days:
                          </span>
                          <span>
                            × {watchedValues.deliveryDays?.length || 0}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            × Monthly Multiplier:
                          </span>
                          <span>× 4.3</span>
                        </div>
                      </div>

                      <Divider />

                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">
                          Total Monthly:
                        </span>
                        <span className="text-2xl font-bold text-blue-600">
                          {formatPrice(totalPrice)}
                        </span>
                      </div>
                    </div>
                  )}

                  {totalPrice === 0 && (
                    <div className="text-center py-8">
                      <Calculator className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Select your plan, meal types, and delivery days to see
                        the price
                      </p>
                    </div>
                  )}
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
