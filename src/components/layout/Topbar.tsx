"use client";

import { Bell, CalendarDays } from "lucide-react";

export default function Topbar() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB");

  return (
    <header className="h-20 bg-white  flex items-center justify-between px-10 ml-[300px] fixed top-0 right-0 left-0">
      <div className="text-xl font-semibold">Dreamy Software</div>

      <div className="flex items-center gap-6">
        <Bell size={22} className="text-gray-600" />
        <CalendarDays size={22} className="text-gray-600" />

        <div className="text-right">
          <p className="font-medium">Friday</p>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>
    </header>
  );
}
