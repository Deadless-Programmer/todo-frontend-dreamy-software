
"use client";

import HomeLayout from "@/components/layout/HomeLayout";
// import { getAccessToken } from "@/utils/token";
// import { useEffect, useState } from "react";
import { LogIn, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // useEffect(() => {
  //   const token = getAccessToken();
  //   setIsLoggedIn(!!token);
  // }, []);

  const {user}=useAuth()

  return (
    <HomeLayout>
      <div className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Daily Todo Manager
        </h1>

        {
         user ? (
          // Logged-in User
          <>
            <CheckCircle2 className="text-green-600 w-14 h-14 mb-4" />
            <p className="text-lg text-gray-700 font-medium">
              Welcome back! 🎉  
            </p>
            <p className="text-gray-600 mt-1">
              You can now create, manage and organize your daily tasks easily.
            </p>
          </>
        ) : (
          // Not Logged-in User
          <>
            <LogIn className="text-blue-600 w-14 h-14 mb-4" />
            <p className="text-lg text-gray-700 font-medium">
              Welcome to Daily Todo App 👋
            </p>
            <p className="text-gray-600 mt-1 max-w-md">
              To use this todo manager and maintain your daily activities,  
              please <span className="font-semibold text-blue-600"> <Link href="/login">login first</Link> </span>.
            </p>
          </>
        )}
      </div>
    </HomeLayout>
  );
}
