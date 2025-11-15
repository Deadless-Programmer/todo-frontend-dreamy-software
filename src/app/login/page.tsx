"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
export default function SignupPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col -between md:flex-row ">
      {/* Left Image Section */}
   <div className="hidden md:flex w-full md:w-[606px] relative bg-[#E2ECF8] h-full min-h-screen overflow-hidden">
  <Image
   src="/images/login.jpg" 
    alt="Signup Illustration"
    fill
    priority
    className="object-contain"
  />
</div>

      {/* Right Form Section */}
      <div className="flex-1 flex items-center justify-center ">
        <div className="w-full max-w-md bg-white p-8 ">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Log in to your account
          </h2>
          <p className="text-gray-500 mb-6 text-sm text-center">
            Start managing your tasks efficiently
          </p>

          <form className="space-y-4">
        

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
             
            </div>

       <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="w-4 h-4 text-blue-400 border-gray-300 rounded focus:ring-orange-400"
              />
              <label htmlFor="remember-me" className="ml-2 text-gray-700">
                Remember Me
              </label>
            </div>
            <Link
              href="/forgotPassword"
              className="text-gray-500 hover:text-blue-600 transition duration-150"
            >
              Forgot Your Password?
            </Link>
          </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
            >
             Log in
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
           Do not have and an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
