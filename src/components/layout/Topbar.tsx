"use client";

import { Bell, CalendarDays } from "lucide-react";
import Image from "next/image";

export default function Topbar() {
  const today = new Date();

  
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  
  const todayName = weekDays[today.getDay()];

 
  const formattedDate = today.toLocaleDateString("en-GB");

  return (
    <header className="h-20 bg-white z-20 flex items-center justify-between px-10 ml-[300px] fixed top-0 right-0 left-0">
      {/* Logo */}
      <div>
        <Image
          alt="logo"
          width={105}
          height={32}
          src="https://i.postimg.cc/dVNWgpsR/logo.png"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <Bell size={35} className="text-white bg-blue-500 p-2 rounded-lg" />
        <CalendarDays size={35} className="text-white bg-blue-500 p-2 rounded-lg" />

        <div className="text-right">
          <p className="font-medium">{todayName}</p>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>
    </header>
  );
}

