"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

import { privateAxios } from "@/lib/api/privateAxios";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CHANGE_PASSWORD_URL } from "@/lib/constants";

const ChangePasswordPage: React.FC = () => {
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("old_password", oldPassword);
      formData.append("new_password", newPassword);

      const res = await privateAxios.post(CHANGE_PASSWORD_URL, formData);

      toast.success(res.data?.detail || "Password changed successfully!");
      router.push("/");
    } catch (error: unknown) {
      type AxiosLikeError = {
        response?: { data?: { detail?: string } };
        message?: string;
      };

      const err = error as AxiosLikeError;

      const errorMessage =
        err.response?.data?.detail || err.message || "Something went wrong!";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 sm:p-8 border border-gray-100">
        <div className="flex justify-around border-b border-gray-200 mb-6">
          <h1 className="flex-1 text-center py-3 text-xl font-semibold text-gray-600">
            Change Your Password
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Old Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Old Password *
            </label>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border border-blue-300 rounded-lg p-2.5 focus:ring-blue-400 focus:border-blue-400 transition"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password *
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-blue-300 rounded-lg p-2.5 focus:ring-blue-400 focus:border-blue-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center cursor-pointer justify-center w-full px-6 py-2.5 border border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-orange-50 transition duration-200 mt-4"
          >
            {loading ? "Processing..." : "Submit"}
            {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
