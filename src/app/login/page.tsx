"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // validation errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");
    setServerError("");

    // Email validation
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email.");
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await login(email, password);
      toast.success("Login successful!");
      console.log("login response:", res);
      if (res?.data?.access) {
        if (redirectTo) {
          router.replace(redirectTo);
        } else {
          router.replace("/todos"); // fallback
        }
      }
    } catch (error: unknown) {
      type AxiosLikeError = { response?: { data?: unknown }; message?: string };
      const err = error as AxiosLikeError;
      const errInfo = err.response?.data ?? err.message ?? String(error);
      console.error(errInfo);
      toast.error("Login failed. Please check your details.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side image */}
      <div className="hidden md:flex w-full md:w-[606px] relative bg-[#E2ECF8] h-full min-h-screen overflow-hidden">
        <Image
          src="/images/login.jpg"
          alt="Login Illustration"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Right form section */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
            Log in to your account
          </h2>
          <p className="text-gray-500 mb-6 text-sm text-center">
            Start managing your tasks efficiently
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p style={{ color: "#EE0039" }} className="text-sm mt-1">
                  {emailError}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>

              {passwordError && (
                <p style={{ color: "#EE0039" }} className="text-sm mt-1">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Server error */}
            {serverError && (
              <p style={{ color: "#EE0039" }} className="text-sm">
                {serverError}
              </p>
            )}

            <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-blue-400" />
                <label className="ml-2 text-gray-700">Remember Me</label>
              </div>
              <Link
                href="/forgotPassword"
                className="text-gray-500 hover:text-blue-600"
              >
                Forgot Your Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
            >
              Log in
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Do not have an account?{" "}
            <Link href="/signup" className="text-blue-600 cursor-pointer hover:underline">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
