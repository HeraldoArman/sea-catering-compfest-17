"use client";

import type React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BackHome } from "@/components/auth-page/BackHome";
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
import { authClient } from "@/utils/auth-client";
import { LeftAuthForm } from "./LeftAuthForm";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm password is required" }),
});

type FormData = z.infer<typeof formSchema>;
export default function SignUpView() {
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
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setErrorMessage(null);
    if (data.password !== data.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      await authClient.signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: (err) => {
            setErrorMessage(err.error.message || "Error while signing in");
          },
        }
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
          }
        )
      } catch (err) {
        setErrorMessage("Unexpected error");
        console.error(err);
      }
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <BackHome />
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        <LeftAuthForm
          imageurl="https://blog.cdphp.com/wp-content/uploads/2023/09/01-Header-scaled.jpg"
          title="Join SEA Catering"
          description="Kick off your healthy eating journey today! Sign up now to get personalized meal plans, expert nutrition guidance, and delicious recipes crafted just for you."
        />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md mx-auto"
        >
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="w-full text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="space-y-3 mb-6">
                  <Button
                    variant="bordered"
                    className="w-full h-12 border-gray-300 hover:border-gray-400 transition-colors duration-300"
                    startContent={<FaGoogle className="w-6 h-6" />}
                    onPress={()=> onSocial("google")}
                  >
                    Continue with Google
                  </Button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <Divider className="flex-1" />
                  <span className="text-sm text-gray-500">or</span>
                  <Divider className="flex-1" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <Input
                          {...field}
                          type="name"
                          label="Name"
                          placeholder="Enter your name"
                          startContent={
                            <Mail className="w-4 h-4 text-gray-400" />
                          }
                          variant="bordered"
                          className="w-full"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <Input
                          {...field}
                          type="email"
                          label="Email Address"
                          placeholder="Enter your email"
                          startContent={
                            <Mail className="w-4 h-4 text-gray-400" />
                          }
                          variant="bordered"
                          className="w-full"
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
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <Input
                          {...field}
                          type={isPasswordVisible ? "text" : "password"}
                          label="Password"
                          placeholder="Enter your password"
                          startContent={
                            <Lock className="w-4 h-4 text-gray-400" />
                          }
                          endContent={
                            <Button
                              isIconOnly
                              variant="light"
                              size="sm"
                              onPress={() => setIsPasswordVisible((v) => !v)}
                            >
                              {isPasswordVisible ? (
                                <EyeOff className="w-4 h-4 text-gray-400" />
                              ) : (
                                <Eye className="w-4 h-4 text-gray-400" />
                              )}
                            </Button>
                          }
                          variant="bordered"
                          className="w-full"
                        />
                        {errors.password && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.password.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <Input
                          {...field}
                          type={isConfirmPasswordVisible ? "text" : "password"}
                          label="Confirm Password"
                          placeholder="Re-enter your password"
                          startContent={
                            <Lock className="w-4 h-4 text-gray-400" />
                          }
                          endContent={
                            <Button
                              isIconOnly
                              variant="light"
                              size="sm"
                              onPress={() =>
                                setIsConfirmPasswordVisible((v) => !v)
                              }
                            >
                              {isConfirmPasswordVisible ? (
                                <EyeOff className="w-4 h-4 text-gray-400" />
                              ) : (
                                <Eye className="w-4 h-4 text-gray-400" />
                              )}
                            </Button>
                          }
                          variant="bordered"
                          className="w-full"
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
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold h-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    isLoading={isSubmitting}
                    endContent={
                      !isSubmitting && <ArrowRight className="w-4 h-4" />
                    }
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </Button>
                </form>

                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      as={NextLink}
                      href="/sign-in"
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Sign In
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
