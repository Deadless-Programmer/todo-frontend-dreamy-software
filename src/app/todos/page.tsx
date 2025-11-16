"use client";

import { redirect } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getAccessToken } from "@/utils/token";
import { Search, Plus, Filter } from "lucide-react";
import Image from "next/image";

export default function TodosPage() {
  const token = getAccessToken();
  if (!token) redirect("/login");

  return (
    <DashboardLayout>
      <div className="w-full bg-white p-6 mt-6 rounded-lg shadow-sm space-y-4 max-w-[1100px] mx-auto">

        {/* Title */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold border-b border-blue-500 pb-1">
            Todos
          </h2>

          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-blue-700 shadow-sm">
            <Plus size={16} />
            New Task
          </button>
        </div>

        {/* Search + Filter Row */}
        <div className="flex items-center justify-between gap-5">

          {/* Search Box */}
          <div className="flex items-center border border-gray-300 rounded-md w-230 overflow-hidden">
            <input
              type="text"
              placeholder="Search your task here..."
              className="w-full px-3 py-2 text-sm outline-none"
            />
            <button className="bg-blue-600 text-white px-3 py-3 rounded-md hover:bg-blue-700 cursor-pointer">
              <Search size={16} />
            </button>
          </div>

          {/* Filter Dropdown */}
          <div className="relative group ">
            <button className="flex items-center gap-1 px-4 py-2.5 border border-gray-300 rounded-md text-sm hover:bg-gray-100 cursor-pointer">
              Filter By
              <Filter size={14} />
            </button>

            {/* Dropdown */}
            <div
              className="absolute right-0 w-48 bg-white border border-gray-200 shadow-md rounded-md mt-2 p-3 hidden group-hover:block z-10"
            >
              <p className="text-xs text-gray-500 mb-2">Date</p>

              <div className="space-y-1 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="cursor-pointer" />
                  Deadline Today
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="cursor-pointer" />
                  Expires in 5 days
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="cursor-pointer" />
                  Expires in 10 days
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="cursor-pointer" />
                  Expires in 30 days
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State Box */}
        <div className="w-full  border border-gray-200 rounded-lg h-[380px] flex flex-col items-center justify-center text-center">

          {/* Empty Illustration */}
          <Image
            src="https://i.postimg.cc/4NZFRj71/icon-no-projects.png"
            alt="empty"
            width={160}
            height={160}
            className=" opacity-80"
          />

          <p className="text-gray-600 mt-3 text-2xl">No todos yet</p>

         
        </div>
      </div>
    </DashboardLayout>
  );
}
