"use client";

import React, { useState } from "react";
import { redirect } from "next/navigation";
import { Camera } from "lucide-react";
import { BsCloudUpload } from "react-icons/bs";
import HomeLayout from "@/components/layout/HomeLayout";
import { getAccessToken } from "@/utils/token";
import { privateAxios } from "@/lib/api/privateAxios";
import { ME_URL } from "@/lib/constants";
import { toast } from "react-toastify";
import Image from "next/image";

export default function ProfilePage() {
  const token = getAccessToken();
  if (!token) redirect("/login");

  // -------------------------
  // FORM STATES
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
      console.log("Profile updated:", res.data);

      toast.success("Profile updated successfully!");
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
      <div className="w-full max-w-[1100px] bg-white p-6 rounded-lg shadow-sm mx-auto space-y-4">
        {/* Title */}
        <h2 className="text-xl font-semibold border-b border-blue-500 pb-1 w-fit">
          Account Information
        </h2>

        {/* Photo Upload */}
        <div className="flex items-center gap-4 w-1/3 p-4 border border-gray-300 rounded-lg">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {/* Preview Image */}
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
    </HomeLayout>
  );
}
