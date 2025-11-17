// components/ui/TasksPage.tsx
"use client";

import { Pencil, Trash2 } from "lucide-react";
import { CgMenuGridR } from "react-icons/cg";
import { Todo } from "@/types/todo";

interface TasksPageProps {
  tasks: Todo[];
  onEdit: (task: Todo) => void;
  onDelete: (taskId: number) => void;
}

export default function TasksPage({ tasks, onEdit, onDelete }: TasksPageProps) {
  const priorityColors = {
    extreme: "bg-red-100 text-red-700 border border-red-200",
    moderate: "bg-green-100 text-green-700 border border-green-200",
    low: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  };

  const cardBorderColors = {
    extreme: "border-red-200",
    moderate: "border-green-200",
    low: "border-yellow-200",
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold mb-5">Your Tasks</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white p-5 rounded-xl shadow-sm border ${
              cardBorderColors[task.priority.toLowerCase()]
            } hover:shadow-md transition`}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">{task.title}</h2>
              <div className="flex justify-between items-center gap-2">
                <span className={`px-3 py-1 rounded-md text-xs font-medium ${priorityColors[task.priority.toLowerCase()]}`}>
                  {task.priority}
                </span>
                <CgMenuGridR className="text-[#8CA3CD] text-xl" />
              </div>
            </div>

            <p className="text-gray-600 mt-2 text-sm">{task.description}</p>

            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-700 text-sm font-medium">Due {task.todo_date}</p>

              <div className="flex gap-3">
                <button onClick={() => onEdit(task)} className="p-2 bg-blue-100 rounded-md hover:bg-blue-200 transition">
                  <Pencil size={16} className="text-blue-700" />
                </button>
                <button onClick={() => onDelete(task.id)} className="p-2 bg-red-100 rounded-md hover:bg-red-200 transition">
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
