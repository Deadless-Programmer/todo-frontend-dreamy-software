"use client";

import { redirect } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getAccessToken } from "@/utils/token";
import { Camera } from "lucide-react";
import { BsCloudUpload } from "react-icons/bs";

export default function ProfilePage() {
  const token = getAccessToken();
  if (!token) redirect("/login");

  return (
    <DashboardLayout>
      <div
        className="w-full max-w-[1100px] bg-white p-6 rounded-lg shadow-sm 
        mx-auto space-y-4"
      >
        {/* Title */}
        <h2 className="text-xl font-semibold border-b border-blue-500 pb-1 w-fit">
          Account Information
        </h2>

        {/* Photo Upload */}
        <div className="flex items-center justify-center border  border-gray-300 rounded-lg gap-4 w-1/3 p-4 ">
          <div className="relative w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
            <Camera className="absolute bottom-1 right-1  bg-blue-600 text-white p-[3px] rounded-full w-5 h-5 cursor-pointer" />
          </div>

          <button className="px-3  flex justify-center items-center gap-2 cursor-pointer p-2 font-bold bg-blue-600 text-white rounded-md text-xs  hover:bg-blue-700">
            <BsCloudUpload /> Upload New Photo
          </button>
        </div>

        {/* Form */}
        <div className="border  border-gray-300  rounded-lg p-4 space-y-3">
          
          {/* Names */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium">First Name</label>
              <input
                type="text"
                className="w-full mt-1 px-2 py-1.5 border  border-gray-300  rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="text-xs font-medium">Last Name</label>
              <input
                type="text"
                className="w-full mt-1 px-2 py-1.5 border  border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-2 py-1.5 border  border-gray-300  rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-200"
            />
          </div>

          {/* Address & Contact */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium">Address</label>
              <input
                type="text"
                className="w-full mt-1 px-2 py-1.5 border  border-gray-300  rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="text-xs font-medium">Contact Number</label>
              <input
                type="text"
                className="w-full mt-1 px-2 py-1.5 border  border-gray-300  rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Birthday */}
          <div>
            <label className="text-xs font-medium">Birthday</label>
            <input
              type="date"
              className="w-full mt-1 px-2 py-1.5 border  border-gray-300  rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-200"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-1">
            <button className="px-5 py-1.5 text-sm cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Save Changes
            </button>
            <button className="px-5 py-1.5 text-sm cursor-pointer bg-[#8CA3CD] rounded-md text-white">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
