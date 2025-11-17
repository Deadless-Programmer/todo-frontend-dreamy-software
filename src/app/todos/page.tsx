
"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getAccessToken } from "@/utils/token";
import { Search, Plus, Filter } from "lucide-react";
import Image from "next/image";
import TaskModal from "@/components/ui/TaskModal";

import HomeLayout from "@/components/layout/HomeLayout";
import { Todo, TodosResponse } from "@/types/todo";
import { privateAxios } from "@/lib/api/privateAxios";
import TasksPage from "@/components/ui/Card";

export default function TodosPage() {
  const [openModal, setOpenModal] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const token = getAccessToken();
  if (!token) redirect("/login");

  const fetchTodos = async () => {
    try {
      const res = await privateAxios.get<TodosResponse>("/api/todos/");
      setTodos(Array.isArray(res.data.results) ? res.data.results : []);
    } catch (err) {
      console.error("Fetch todos error:", err);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <HomeLayout>
      <TaskModal open={openModal} onClose={() => setOpenModal(false)} refreshTodos={fetchTodos} />

      <div className="w-full bg-white p-6 mt-6 rounded-lg shadow-sm space-y-4 max-w-[1100px] mx-auto">
        {/* Title + New Task */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold border-b border-blue-500 pb-1">Todos</h2>

          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-blue-700 shadow-sm"
          >
            <Plus size={16} />
            New Task
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center border border-gray-300 rounded-md w-230 overflow-hidden">
            <input type="text" placeholder="Search your task here..." className="w-full px-3 py-2 text-sm outline-none" />
            <button className="bg-blue-600 text-white px-3 py-3 rounded-md hover:bg-blue-700 cursor-pointer">
              <Search size={16} />
            </button>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-1 px-4 py-2.5 border border-gray-300 rounded-md text-sm hover:bg-gray-100 cursor-pointer">
              Filter By
              <Filter size={14} />
            </button>
          </div>
        </div>

        {/* Main content */}
        {loading ? (
          <p className="text-center mt-10">Loading todos...</p>
        ) : todos.length === 0 ? (
          <div className="w-full border border-gray-200 rounded-lg h-[380px] flex flex-col items-center justify-center text-center">
            <Image
              src="https://i.postimg.cc/4NZFRj71/icon-no-projects.png"
              alt="empty"
              width={160}
              height={160}
              className="opacity-80"
            />
            <p className="text-gray-600 mt-3 text-2xl">No todos yet</p>
          </div>
        ) : (
          <TasksPage tasks={todos} />
        )}
      </div>
    </HomeLayout>
  );
}
