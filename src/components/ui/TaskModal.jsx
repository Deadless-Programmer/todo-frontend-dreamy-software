"use client";

import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { privateAxios } from "@/lib/api/privateAxios";
import { POST_TODOS_URL, UPDATE_TODOS_URL } from "@/lib/constants";
import { toast } from "react-toastify";

export default function TaskModal({ open, onClose, refreshTodos, editTask }) {
  const [title, setTitle] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // set form values if editTask exists
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setTodoDate(editTask.todo_date);
      setPriority(editTask.priority);
      setDescription(editTask.description);
    } else {
      setTitle("");
      setTodoDate("");
      setPriority("");
      setDescription("");
    }
  }, [editTask, open]);

  const handleSubmit = async () => {
    if (!title.trim()) return toast.error("Title is required");
    if (!priority) return toast.error("Please select a priority");

    try {
      setLoading(true);

      if (editTask) {
        // Update existing todo
        await privateAxios.patch(
          UPDATE_TODOS_URL.replace(":id", editTask.id.toString()),
          {
            title,
            description,
            priority,
            todo_date: todoDate,
            is_completed: editTask.is_completed ?? false,
          }
        );
        toast.success("Todo updated successfully!");
      } else {
        // Create new todo
        await privateAxios.post(POST_TODOS_URL, {
          title,
          description,
          priority,
          todo_date: todoDate,
        });
        toast.success("Todo created successfully!");
      }

      onClose();
      refreshTodos?.();
    } catch (error) {
      console.log("Todo Error:", error);
      toast.error(
        editTask ? "Failed to update todo!" : "Failed to create todo!"
      );
    } finally {
      setLoading(false);
    }
  };

  const selectPriority = (value) => {
    setPriority(value);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="absolute inset-0 h-full w-full z-50 flex items-start justify-center">
          <motion.div
            key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/30 backdrop-blur-md"
        style={{
      top: "80px",
      left: "300px",
      right: 0,
      bottom: 0,
    }}
          />

          <motion.div
            key="modal"
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 20 }}
        className="absolute top-10 bg-white w-full max-w-xl mx-4 rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold border-b-2 border-blue-500">
                {editTask ? "Edit Task" : "Add New Task"}
              </h2>

              <button
                onClick={onClose}
                className="border-b-2 border-blue-500 font-medium cursor-pointer"
              >
                Go Back
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Date</label>
                <input
                  type="date"
                  value={todoDate}
                  onChange={(e) => setTodoDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700">Priority</p>
                <div className="flex items-center gap-10 mt-2 text-sm">
                  <label
                    onClick={() => selectPriority("extreme")}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-2.5 h-2.5 bg-red-600 rounded-full"></span>
                    Extreme
                    <input
                      type="radio"
                      name="priority"
                      checked={priority === "extreme"}
                      readOnly
                    />
                  </label>
                  <label
                    onClick={() => selectPriority("moderate")}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-2.5 h-2.5 bg-green-600 rounded-full"></span>
                    Moderate
                    <input
                      type="radio"
                      name="priority"
                      checked={priority === "moderate"}
                      readOnly
                    />
                  </label>
                  <label
                    onClick={() => selectPriority("low")}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></span>
                    Low
                    <input
                      type="radio"
                      name="priority"
                      checked={priority === "low"}
                      readOnly
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700">
                  Task Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  placeholder="Start writing here..."
                ></textarea>
              </div>
            </div>

            <div className="flex justify-between items-center mt-5">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
              >
                {loading ? "Saving..." : "Done"}
              </button>

              <button
                onClick={onClose}
                className="p-2 bg-red-500 text-white rounded-md cursor-pointer"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
