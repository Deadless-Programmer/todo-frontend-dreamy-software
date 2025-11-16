"use client";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center  justify-center">
          {/* Background Dim */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Box */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative bg-white w-full max-w-xl mx-4 rounded-xl shadow-lg p-6 z-50"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 ">
              <h2 className="text-lg font-semibold border-b-2 border-blue-500">
                Add New Task
              </h2>

              <button
                onClick={onClose}
                className=" border-b-2 border-blue-500 font-medium  cursor-pointer text-md"
              >
                Go Back
              </button>
            </div>

            {/* Title Field */}
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-700">Title</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Date */}
              <div>
                <label className="text-sm text-gray-700">Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Priority */}
              <div>
                <p className="text-sm font-semibold text-gray-700">Priority</p>

                <div className="flex items-center gap-10 mt-2 text-sm">
                  {/* Extreme */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="w-2.5 h-2.5 bg-red-600 rounded-full"></span>
                    Extreme
                    <input
                      type="checkbox"
                      name="priority"
                      className="w-4 h-4 border border-gray-400 rounded-md cursor-pointer"
                    />
                  </label>

                  {/* Moderate */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="w-2.5 h-2.5 bg-green-600 rounded-full"></span>
                    Moderate
                    <input
                      type="checkbox"
                      name="priority"
                      className="w-4 h-4 border border-gray-400 rounded-md cursor-pointer"
                    />
                  </label>

                  {/* Low */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></span>
                    Low
                    <input
                      type="checkbox"
                      name="priority"
                      className="w-4 h-4 border border-gray-400 rounded-md cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm text-gray-700">
                  Task Description
                </label>
                <textarea
                  rows="4"
                  className="w-full border mt-1 border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Start writing here..."
                ></textarea>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center mt-5">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">
                Done
              </button>

              {/* Delete Icon Button */}
              <button className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-md">
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
