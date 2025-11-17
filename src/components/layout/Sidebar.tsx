"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListCheck, LogOut } from "lucide-react";
import Image from "next/image";

import { HiHome } from "react-icons/hi";
import { FaUserLarge } from "react-icons/fa6";
import { MdOutlinePassword } from "react-icons/md";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const {user}=useAuth()
  const isActive = (path: string) =>
    pathname === path;

  return (
    <aside className="w-[300px] bg-[#0D1B3E] text-white h-screen fixed left-0 top-0 flex flex-col py-8">
      
      {/* Profile */}
      <div className="flex flex-col items-center mb-12">
        <Image
  alt="profile picture"
  src={user?.profile_image || "/default-profile.png"} // null safe
  width={80}
  height={80}
  className="w-20 h-20 rounded-full mb-3"
/>
        <h3 className="text-lg font-medium">{user?.first_name}</h3>
        <p className="text-sm text-gray-300">{user?.email}</p>
      </div>

      {/* Menu */}
      <nav className="w-full  flex flex-col ">

        {/* Home */}
        <Link
          href="/"
          className={`
            flex items-center gap-3 py-4 px-10  
            text-[#8CA3CD] transition-all
            ${isActive("/") 
              ? "bg-linear-to-r from-[#1c3473] to-[#0D1B3E] text-white  " 
              : "hover:bg-[#1A2B52]"}
          `}
        >
          <HiHome size={22} /> Home
        </Link>

        {/* Todos */}
        <Link
          href="/todos"
          className={`
            flex items-center gap-3 py-4 px-10 
            text-[#8CA3CD] transition-all
            ${isActive("/todos") 
              ? "bg-linear-to-r from-[#1c3473] to-[#0D1B3E] text-white " 
              : "hover:bg-[#1A2B52]"}
          `}
        >
          <ListCheck size={22} /> Todos
        </Link>

        {/* Profile */}
        <Link
          href="/profile"
          className={`
            flex items-center gap-3 py-4 px-10 
            text-[#8CA3CD] transition-all
            ${isActive("/profile") 
              ? "bg-linear-to-r from-[#1c3473] to-[#0D1B3E] text-white " 
              : "hover:bg-[#1A2B52]"}
          `}
        >
          <FaUserLarge size={18} /> Account Information
        </Link>
        {/* change password */}
        <Link
          href="/changePassword"
          className={`
            flex items-center gap-3 py-4 px-9 
            text-[#8CA3CD] transition-all
            ${isActive("/changePassword") 
              ? "bg-linear-to-r from-[#1c3473] to-[#0D1B3E] text-white " 
              : "hover:bg-[#1A2B52]"}
          `}
        >
        <MdOutlinePassword size={22} />Change Password
        </Link>

      </nav>

      {/* Logout - bottom aligned */}
      <div className="mt-auto  ">
        <button className="flex cursor-pointer items-center gap-3 py-4 px-10  text-[#8CA3CD] hover:text-white hover:bg-[#1A2B52] transition-all w-full text-left">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}
