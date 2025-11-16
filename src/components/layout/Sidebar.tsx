"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListCheck, User, LogOut } from "lucide-react";
import Image from "next/image";
import { AiFillHome } from "react-icons/ai";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path;

  return (
    <aside className="w-[300px] bg-[#0D1B3E] text-white h-screen fixed left-0 top-0 flex flex-col py-8">
      
      {/* Profile */}
      <div className="flex flex-col items-center mb-12">
        <Image
          alt="profile picture"
          src="https://i.postimg.cc/gkdg1qVD/kirill-balobanov-2r-Is8OH5ng0-unsplash.jpg"
          width={80}
          height={80}
          className="w-20 h-20 rounded-full mb-3"
        />
        <h3 className="text-lg font-medium">amanuel</h3>
        <p className="text-sm text-gray-300">amanuel@gmail.com</p>
      </div>

      {/* Menu */}
      <nav className="w-full  flex flex-col ">

        {/* Dashboard */}
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
          <AiFillHome size={18} /> Dashboard
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
          <ListCheck size={18} /> Todos
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
          <User size={18} /> Account Information
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
