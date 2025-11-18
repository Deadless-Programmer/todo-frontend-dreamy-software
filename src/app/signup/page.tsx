"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { signup } = useAuth();
  const router = useRouter();

  const [errors, setErrors] = useState<{
    first_name?: string;
    last_name?: string;
    password?: string;
    confirm_password?: string;
  }>({});

  const validateName = (name: string) => /^[A-Za-z\s]+$/.test(name);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload: Record<string, string> = {};
    formData.forEach((value, key) => {
      payload[key] = value.toString();
    });

    const newErrors: typeof errors = {};

    if (!validateName(payload.first_name)) {
      newErrors.first_name = "Please enter a valid name format.";
    }

    if (!validateName(payload.last_name)) {
      newErrors.last_name = "Please enter a valid name format.";
    }

    if (!payload.password || payload.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (payload.password !== payload.confirm_password) {
      newErrors.confirm_password = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await signup({
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        password: payload.password,
      });

      toast.success("Signup successful! Now you can login.");
      form.reset();
      setErrors({});
      router.push("/login")
    } catch (error: unknown) {
      type AxiosLikeError = { response?: { data?: unknown }; message?: string };
      const err = error as AxiosLikeError;
      const errInfo = err.response?.data ?? err.message ?? String(error);
      console.error(errInfo);
      toast.error("Signup failed. Please check your details.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col -between md:flex-row">
      <div className="hidden md:flex w-full md:w-[606px] relative bg-[#E2ECF8] h-full min-h-screen overflow-hidden">
        <Image
          src="/images/signUpImage.png"
          alt="Signup Illustration"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
            Create your account
          </h2>
          <p className="text-gray-500 mb-6 text-sm text-center">
            Start managing your tasks efficiently
          </p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.first_name && (
                  <p className="text-xs mt-1" style={{ color: "#EE0039" }}>
                    {errors.first_name}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.last_name && (
                  <p className="text-xs mt-1" style={{ color: "#EE0039" }}>
                    {errors.last_name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs mt-1" style={{ color: "#EE0039" }}>
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                name="confirm_password"
                type="password"
                placeholder="Confirm Password"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.confirm_password && (
                <p className="text-xs mt-1" style={{ color: "#EE0039" }}>
                  {errors.confirm_password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline cursor-pointer">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
