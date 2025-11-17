"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getAccessToken } from "@/utils/token";
import { Search, Plus, Filter } from "lucide-react";
import Image from "next/image";
import TaskModal from "@/components/ui/TaskModal";

import HomeLayout from "@/components/layout/HomeLayout";
import { Todo } from "@/types/todo";

import { privateAxios } from "@/lib/api/privateAxios";
import { DELETE_TODOS_URL, GET_TODOS_URL } from "@/lib/constants";
import { toast } from "react-toastify";
import TasksPage from "@/components/ui/Card";
import SkeletonCard from "@/components/ui/SkeletonCard";

export default function TodosPage() {
  const [openModal, setOpenModal] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTask, setEditTask] = useState<Todo | null>(null);
const [loading, setLoading] = useState(true);
  // search + filters
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    is_completed: "",
    priority: "",
    todo_date: "",
  });

  const token = getAccessToken();
  if (!token) redirect("/login");

  // fetch todos with params
const fetchTodos = async () => {
  try {
    setLoading(true);

    const queryParams = new URLSearchParams();

    if (search) queryParams.append("search", search);
    if (filters.is_completed) queryParams.append("is_completed", filters.is_completed);
    if (filters.priority) queryParams.append("priority", filters.priority);
    if (filters.todo_date) queryParams.append("todo_date", filters.todo_date);

    const url = `${GET_TODOS_URL}?${queryParams.toString()}`;

    const res = await privateAxios.get(url);
    let data = res.data.results || [];

    const priorityOrder: Record<string, number> = {
      extreme: 1,
      moderate: 2,
      low: 3,
    };

    data = data.sort((a: any, b: any) => {
      const pa = priorityOrder[a.priority] ?? 99;
      const pb = priorityOrder[b.priority] ?? 99;
      return pa - pb;
    });

    setTodos(data);
  } catch (err) {
    console.log(err)
    toast.error("Failed to fetch todos!");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchTodos();
  }, []);

  // Delete todo
  const handleDelete = async (id: number) => {
    try {
      await privateAxios.delete(DELETE_TODOS_URL.replace(":id", id.toString()));
      setTodos((prev) => prev.filter((t) => t.id !== id));
      toast.success("Todo deleted successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete todo!");
    }
  };

  // Edit todo
  const handleEdit = (task: Todo) => {
    setEditTask(task);
    setOpenModal(true);
  };

  // apply filter
  const applyFilter = () => {
    fetchTodos();
  };

  return (
    <HomeLayout>
      <TaskModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditTask(null);
        }}
        refreshTodos={fetchTodos}
        editTask={editTask}
      />

      <div className="w-full bg-white p-6 mt-6 rounded-lg shadow-sm space-y-4 max-w-[1100px] mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold border-b border-blue-500 pb-1">Todos</h2>

          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 shadow-sm"
          >
            <Plus size={16} />
            New Task
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex items-center justify-between gap-5">

          {/* Search */}
          <div className="flex items-center border border-gray-300 rounded-md w-230 overflow-hidden">
            <input
              type="text"
              placeholder="Search your task here..."
              className="w-full px-3 py-2 text-sm outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={fetchTodos}
              className="bg-blue-600 text-white px-3 py-3 rounded-md hover:bg-blue-700 cursor-pointer"
            >
              <Search size={16} />
            </button>
          </div>

          {/* Filter Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 cursor-pointer">
              Filter By
              <Filter size={14} />
            </button>

            <div className="absolute right-0 w-56 bg-white border border-gray-200 shadow-md rounded-md mt-2 p-3 hidden group-hover:block z-10">
              <p className="text-xs text-gray-500 mb-2">Select Filters</p>

              <div className="space-y-3 text-sm">

                {/* is_completed */}
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.is_completed === "true"}
                    onChange={(e) =>
                      setFilters({ ...filters, is_completed: e.target.checked ? "true" : "" })
                    }
                  />
                  is_completed
                </label>

                {/* todo date */}
                <div>
                  <p className="text-xs mb-1">Todo Date</p>
                  <input
                    type="date"
                    className="border p-1 rounded w-full text-sm"
                    value={filters.todo_date}
                    onChange={(e) =>
                      setFilters({ ...filters, todo_date: e.target.value })
                    }
                  />
                </div>

                {/* priority dropdown */}
                <div>
                  <p className="text-xs mb-1">Priority</p>
                  <select
                    value={filters.priority}
                    onChange={(e) =>
                      setFilters({ ...filters, priority: e.target.value })
                    }
                    className="border p-1 rounded w-full text-sm"
                  >
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="extreme">Extreme</option>
                  </select>
                </div>

                <button
                  onClick={applyFilter}
                  className="bg-blue-600 mt-2 text-white w-full py-1 rounded-md hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Todos List */}
      {loading ? (
  <div className="grid md:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
) : todos.length > 0 ? (
  <TasksPage tasks={todos} onEdit={handleEdit} onDelete={handleDelete} />
) : (
  <div className="w-full border border-gray-200 rounded-lg h-[380px] flex flex-col items-center justify-center text-center">
    <Image
      src="https://i.postimg.cc/4NZFRj71/icon-no-projects.png"
      alt="empty"
      width={160}
      height={160}
      className="opacity-80"
    />
    <p className="text-gray-600 mt-3 text-2xl">No todos found</p>
  </div>
)}

      </div>
    </HomeLayout>
  );
}
