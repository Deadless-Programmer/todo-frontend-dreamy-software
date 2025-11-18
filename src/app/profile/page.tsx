"use client";

import React, { useState, useEffect } from "react";
import {  useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import { BsCloudUpload } from "react-icons/bs";
import HomeLayout from "@/components/layout/HomeLayout";
import { getAccessToken } from "@/utils/token";
import { privateAxios } from "@/lib/api/privateAxios";
import { ME_URL } from "@/lib/constants";
import { toast } from "react-toastify";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  const router = useRouter();
 useEffect(() => {
  const checkAuth = () => {
    const token = getAccessToken();
    if (!token) {
      router.replace("/login");
    }
  };

  checkAuth(); // first time check

  // if token removed from anywhere → run checkAuth
  window.addEventListener("storage", checkAuth);

  return () => {
    window.removeEventListener("storage", checkAuth);
  };
}, [router]);
  

  // -------------------------
  // FORM STATES with default values from user
  // -------------------------
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [birthday, setBirthday] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState<any>(null);

  // -------------------------
  // Populate form when user loads/changes
  // -------------------------
  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setBio(user.bio || "");
      setAddress(user.address || "");
      setContact(user.contact_number || "");
      setBirthday(user.birthday || "");
      setImagePreview(user.profile_image || null);
    }
  }, [user]);

  // --------------------------------
  // HANDLE IMAGE UPLOAD + PREVIEW
  // --------------------------------
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // --------------------------------
  // SUBMIT PROFILE UPDATE
  // --------------------------------
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const form = new FormData();
      form.append("first_name", firstName);
      form.append("last_name", lastName);
      form.append("address", address);
      form.append("contact_number", contact);
      form.append("birthday", birthday);
      form.append("bio", bio);

      if (imageFile) {
        form.append("profile_image", imageFile);
      }

      const res = await privateAxios.patch(ME_URL, form);

      toast.success("Profile updated successfully!");
      setUpdatedData(res.data);
      setModalOpen(true);
    } catch (error: unknown) {
      type AxiosLikeError = {
        response?: { data?: { detail?: string } };
        message?: string;
      };

      const err = error as AxiosLikeError;
      const message =
        err.response?.data?.detail || err.message || "Something went wrong!";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HomeLayout>
      <div
        className={`w-full max-w-[1100px] bg-white p-6 rounded-lg shadow-sm mx-auto space-y-4 transition-all ${
          modalOpen ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        {/* Title */}
        <h2 className="text-xl font-semibold border-b border-blue-500 pb-1 w-fit">
          Account Information
        </h2>

        {/* Photo Upload */}
        <div className="flex items-center gap-4 w-1/3 p-4 border border-gray-300 rounded-lg">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="object-cover rounded-full"
              />
            ) : (
              <span className="text-gray-600 text-sm">No Photo</span>
            )}

            <label>
              <Camera className="absolute bottom-1 right-1 bg-blue-600 text-white p-[3px] rounded-full w-5 h-5 cursor-pointer" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <label className="px-3 flex items-center gap-2 p-2 font-bold bg-blue-600 text-white rounded-md text-xs cursor-pointer hover:bg-blue-700">
            <BsCloudUpload /> Upload New Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Form */}
        <div className="border border-gray-300 rounded-lg p-4 space-y-3">
          {/* Names */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium">First Name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                className="w-full mt-1 px-2 py-1.5 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="text-xs font-medium">Last Name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                className="w-full mt-1 px-2 py-1.5 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-xs font-medium">Bio</label>
            <input
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              type="text"
              className="w-full mt-1 px-2 py-1.5 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-200"
            />
          </div>

          {/* Address & Contact */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium">Address</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                className="w-full mt-1 px-2 py-1.5 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="text-xs font-medium">Contact Number</label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                type="text"
                className="w-full mt-1 px-2 py-1.5 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Birthday */}
          <div>
            <label className="text-xs font-medium">Birthday</label>
            <input
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              type="date"
              className="w-full mt-1 px-2 py-1.5 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-200"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-1">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-5 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button className="px-5 py-1.5 text-sm bg-[#8CA3CD] text-white rounded-md">
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* -------------------------------
           SUCCESS MODAL + BLUR BACKGROUND
      -------------------------------- */}
      <AnimatePresence>
        {modalOpen && updatedData && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-999">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
            >
              <h2 className="text-lg font-semibold mb-3 text-center">
                Profile Updated Successfully 🎉
              </h2>

              {/* Profile Image */}
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border">
                  <Image
                    src={updatedData.profile_image || "/default-profile.png"}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* All Info */}
              <div className="space-y-2 text-sm">
                <p>
                  <strong>First Name:</strong> {updatedData.first_name || "-"}
                </p>
                <p>
                  <strong>Last Name:</strong> {updatedData.last_name || "-"}
                </p>
                <p>
                  <strong>Bio:</strong> {updatedData.bio || "-"}
                </p>
                <p>
                  <strong>Address:</strong> {updatedData.address || "-"}
                </p>
                <p>
                  <strong>Contact:</strong> {updatedData.contact_number || "-"}
                </p>
                <p>
                  <strong>Birthday:</strong> {updatedData.birthday || "-"}
                </p>
              </div>

              {/* Close Button */}
              <div className="mt-5 flex justify-center">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </HomeLayout>
  );
}
