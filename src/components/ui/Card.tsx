"use client";

import { Pencil, Trash2 } from "lucide-react";
import { CgMenuGridR } from "react-icons/cg";

export default function TasksPage() {
  const tasks = [
    {
      id: 1,
      title: "Backend Infrastructure",
      description: "Upgrading backend infrastructure for better performance",
      dueDate: "Apr 15, 2025",
      priority: "Extreme",
    },
    {
      id: 2,
      title: "Mobile App Redesign",
      description:
        "Redesigning the mobile app interface for better user experience",
      dueDate: "Mar 25, 2025",
      priority: "Moderate",
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      description: "Creating a new analytics dashboard for clients",
      dueDate: "Mar 30, 2025",
      priority: "Low",
    },
  ];

  const priorityColors = {
    Extreme: "bg-red-100 text-red-700 border border-red-200",
    Moderate: "bg-green-100 text-green-700 border border-green-200",
    Low: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  };

  const cardBorderColors = {
    Extreme: "border-red-200",
    Moderate: "border-green-200",
    Low: "border-yellow-200",
  };

  return (
    <div className="p-10 bg-blue-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-5">Your Tasks</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white p-5 rounded-xl shadow-sm border ${cardBorderColors[task.priority]} hover:shadow-md transition`}
          >
            {/* Title + Priority */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                {task.title}
              </h2>

              <div className="flex justify-between items-center gap-2">
                <span
                className={`px-3 py-1 rounded-md text-xs font-medium ${priorityColors[task.priority]}`}
              >
                {task.priority} 
              </span>
              <CgMenuGridR className="text-[#8CA3CD] text-xl" />
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mt-2 text-sm">{task.description}</p>

            {/* Due date */}
            <div className="flex justify-between">
               <p className="text-gray-700 mt-4 text-sm font-medium">
              Due {task.dueDate}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <button className="p-2 bg-blue-100 rounded-md hover:bg-blue-200 transition">
                <Pencil size={16} className="text-blue-700" />
              </button>

              <button className="p-2 bg-red-100 rounded-md hover:bg-red-200 transition">
                <Trash2 size={16} className="text-red-700" />
              </button>
            </div>
            </div>
         
          </div>
        ))}
      </div>
    </div>
  );
}