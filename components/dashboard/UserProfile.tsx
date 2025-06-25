"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Avatar } from "@heroui/avatar";
import { Divider } from "@heroui/divider";
import { Switch } from "@heroui/switch";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import { addToast } from "@heroui/toast";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

interface UserProfileProps {
  user: any;
}

export function UserProfile({ user }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  });

  const {
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      phone: "",
      address: "",
    },
  });

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Profile updated:", data);
      setIsEditing(false);

      addToast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
        promise: new Promise((resolve) => setTimeout(resolve, 3000)),
        color: "success",
      });
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        promise: new Promise((resolve) => setTimeout(resolve, 3000)),
        color: "danger",
      });
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Password updated");
      resetPassword();

      addToast({
        title: "Password Updated",
        description: "Your password has been successfully changed.",
        promise: new Promise((resolve) => setTimeout(resolve, 3000)),
        color: "success",
      });
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        promise: new Promise((resolve) => setTimeout(resolve, 3000)),
        color: "danger",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Personal Information
                </h3>
                <Button
                  size="sm"
                  variant={isEditing ? "solid" : "bordered"}
                  color={isEditing ? "success" : "primary"}
                  onPress={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardBody className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-4">
                <Avatar
                  size="lg"
                  name={user.name}
                  className="border-4 border-white shadow-lg"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{user.name}</h4>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                  <Button size="sm" variant="light" className="mt-1 p-0 h-auto">
                    Change Avatar
                  </Button>
                </div>
              </div>

              <Divider />

              {/* Profile Form */}
              <form
                onSubmit={handleProfileSubmit(onProfileSubmit)}
                className="space-y-4"
              >
                <Controller
                  name="name"
                  control={profileControl}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Full Name"
                      placeholder="Enter your full name"
                      variant="bordered"
                      startContent={<User className="w-4 h-4 text-gray-400" />}
                      isReadOnly={!isEditing}
                      isInvalid={!!profileErrors.name}
                      errorMessage={profileErrors.name?.message}
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={profileControl}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      label="Email Address"
                      placeholder="Enter your email"
                      variant="bordered"
                      startContent={<Mail className="w-4 h-4 text-gray-400" />}
                      isReadOnly={!isEditing}
                      isInvalid={!!profileErrors.email}
                      errorMessage={profileErrors.email?.message}
                    />
                  )}
                />

                <Controller
                  name="phone"
                  control={profileControl}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Phone Number"
                      placeholder="Enter your phone number"
                      variant="bordered"
                      startContent={<Phone className="w-4 h-4 text-gray-400" />}
                      isReadOnly={!isEditing}
                    />
                  )}
                />

                <Controller
                  name="address"
                  control={profileControl}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Address"
                      placeholder="Enter your address"
                      variant="bordered"
                      startContent={
                        <MapPin className="w-4 h-4 text-gray-400" />
                      }
                      isReadOnly={!isEditing}
                    />
                  )}
                />

                {isEditing && (
                  <div className="flex gap-2 pt-4">
                    <Button
                      type="submit"
                      color="primary"
                      isLoading={isProfileSubmitting}
                      className="flex-1"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="bordered"
                      onPress={() => setIsEditing(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </CardBody>
          </Card>
        </motion.div>

        {/* Security & Notifications */}
        <div className="space-y-6">
          {/* Change Password */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="shadow-lg border-0">
              <CardHeader>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Change Password
                </h3>
              </CardHeader>
              <CardBody>
                <form
                  onSubmit={handlePasswordSubmit(onPasswordSubmit)}
                  className="space-y-4"
                >
                  <Controller
                    name="currentPassword"
                    control={passwordControl}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type={showCurrentPassword ? "text" : "password"}
                        label="Current Password"
                        placeholder="Enter current password"
                        variant="bordered"
                        endContent={
                          <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            onPress={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="w-4 h-4 text-gray-400" />
                            ) : (
                              <Eye className="w-4 h-4 text-gray-400" />
                            )}
                          </Button>
                        }
                        isInvalid={!!passwordErrors.currentPassword}
                        errorMessage={passwordErrors.currentPassword?.message}
                      />
                    )}
                  />

                  <Controller
                    name="newPassword"
                    control={passwordControl}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type={showNewPassword ? "text" : "password"}
                        label="New Password"
                        placeholder="Enter new password"
                        variant="bordered"
                        endContent={
                          <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            onPress={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="w-4 h-4 text-gray-400" />
                            ) : (
                              <Eye className="w-4 h-4 text-gray-400" />
                            )}
                          </Button>
                        }
                        isInvalid={!!passwordErrors.newPassword}
                        errorMessage={passwordErrors.newPassword?.message}
                      />
                    )}
                  />

                  <Controller
                    name="confirmPassword"
                    control={passwordControl}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        label="Confirm New Password"
                        placeholder="Confirm new password"
                        variant="bordered"
                        endContent={
                          <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            onPress={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-4 h-4 text-gray-400" />
                            ) : (
                              <Eye className="w-4 h-4 text-gray-400" />
                            )}
                          </Button>
                        }
                        isInvalid={!!passwordErrors.confirmPassword}
                        errorMessage={passwordErrors.confirmPassword?.message}
                      />
                    )}
                  />

                  <Button
                    type="submit"
                    color="primary"
                    className="w-full"
                    isLoading={isPasswordSubmitting}
                  >
                    Update Password
                  </Button>
                </form>
              </CardBody>
            </Card>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-lg border-0">
              <CardHeader>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  Notification Preferences
                </h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Email Notifications
                    </h4>
                    <p className="text-sm text-gray-600">
                      Receive updates via email
                    </p>
                  </div>
                  <Switch
                    isSelected={notifications.email}
                    onValueChange={(value) =>
                      setNotifications((prev) => ({ ...prev, email: value }))
                    }
                  />
                </div>

                <Divider />

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Push Notifications
                    </h4>
                    <p className="text-sm text-gray-600">
                      Receive push notifications
                    </p>
                  </div>
                  <Switch
                    isSelected={notifications.push}
                    onValueChange={(value) =>
                      setNotifications((prev) => ({ ...prev, push: value }))
                    }
                  />
                </div>

                <Divider />

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      SMS Notifications
                    </h4>
                    <p className="text-sm text-gray-600">Receive SMS updates</p>
                  </div>
                  <Switch
                    isSelected={notifications.sms}
                    onValueChange={(value) =>
                      setNotifications((prev) => ({ ...prev, sms: value }))
                    }
                  />
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
