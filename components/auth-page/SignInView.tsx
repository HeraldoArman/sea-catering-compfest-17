"use client";

import type React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Alert } from "@heroui/alert";
import { useRouter } from "next/navigation";

import { LeftAuthForm } from "./LeftAuthForm";

import { authClient } from "@/utils/auth-client";
import { BackHome } from "@/components/auth-page/BackHome";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

type FormData = z.infer<typeof formSchema>;
export default function SignInView() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setErrorMessage(null);
    try {
      await authClient.signIn.email(
        { email: data.email, password: data.password, callbackURL: "/" },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: (err) => {
            setErrorMessage(err.error.message || "Error while signing in");
          },
        },
      );
    } catch (err) {
      setErrorMessage("Unexpected error");
      console.error(err);
    }
  };

  const onSocial = async (provider: "google") => {
    setErrorMessage(null);
    try {
      authClient.signIn.social(
        {
          provider: provider,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: (err) => {
            setErrorMessage(err.error.message || "Error while signing in");
            console.error(err);
          },
        },
      );
    } catch (err) {
      setErrorMessage("Unexpected error");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <BackHome />
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        <LeftAuthForm
          description="Continue your healthy eating journey with personalized meal
                plans, expert nutrition guidance, and delicious recipes crafted
                just for you."
          imageurl="https://cdn-abeco.nitrocdn.com/vMCLEGbZccgRIgpGXvgkDDYcPokgENUq/assets/images/optimized/rev-300bd7b/gatheringdreams.com/wp-content/uploads/2022/10/healthy-meal-prep-2022-main-low.jpg"
          title="Welcome Back to SEA Catering"
        />
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md mx-auto"
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="w-full text-center">
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl">SC</span>
                    </div>
                    <div className="text-left">
                      <h1 className="text-2xl font-bold text-gray-900">
                        SEA Catering
                      </h1>
                      <p className="text-sm text-gray-600">Healthy Living</p>
                    </div>
                  </div>

                  <p className="text-gray-600">
                    Sign in to your account to continue
                  </p>
                </motion.div>
              </div>
            </CardHeader>

            <CardBody className="pt-0">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="space-y-3 mb-6">
                  <Button
                    className="w-full h-12 border-gray-300 hover:border-gray-400 transition-colors duration-300"
                    startContent={<FaGoogle className="w-6 h-6" />}
                    variant="bordered"
                    onPress={() => onSocial("google")}
                  >
                    Continue with Google
                  </Button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <Divider className="flex-1" />
                  <span className="text-sm text-gray-500">or</span>
                  <Divider className="flex-1" />
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <div>
                        <Input
                          {...field}
                          className="w-full"
                          label="Email Address"
                          placeholder="Enter your email"
                          startContent={
                            <Mail className="w-4 h-4 text-gray-400" />
                          }
                          type="email"
                          variant="bordered"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <div>
                        <Input
                          {...field}
                          className="w-full"
                          endContent={
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              onPress={() => setIsPasswordVisible((v) => !v)}
                            >
                              {isPasswordVisible ? (
                                <EyeOff className="w-4 h-4 text-gray-400" />
                              ) : (
                                <Eye className="w-4 h-4 text-gray-400" />
                              )}
                            </Button>
                          }
                          label="Password"
                          placeholder="Enter your password"
                          startContent={
                            <Lock className="w-4 h-4 text-gray-400" />
                          }
                          type={isPasswordVisible ? "text" : "password"}
                          variant="bordered"
                        />
                        {errors.password && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.password.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                  {errorMessage && (
                    <Alert color="danger" title={errorMessage} />
                  )}

                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold h-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    endContent={
                      !isSubmitting && <ArrowRight className="w-4 h-4" />
                    }
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </Button>
                </form>

                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link
                      as={NextLink}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                      href="/sign-up"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </motion.div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
