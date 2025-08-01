import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";

function UserProfile() {
  const userData = useSelector((state) => state.auth.userData);
  const [file, setFile] = useState(null);
  const [profile, setProfile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData?.$id) fetchProfile();
  }, [userData]);

  const fetchProfile = async () => {
    try {
      const doc = await appwriteService.getUserProfile(userData.$id);
      setProfile(doc);
      if (doc?.imageId) {
        const url = appwriteService.getFilePreview(doc.imageId);
        setPreviewUrl(url);
      }
    } catch (error) {
      console.error("❌ Error loading profile:", error);
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) setPreviewUrl(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file || !userData?.$id) return;
    setLoading(true);
    try {
      const uploaded = await appwriteService.uploadFile(file);
      if (!uploaded?.$id) throw new Error("Upload failed");

      if (profile) {
        await appwriteService.updateUserimageId(userData.$id, uploaded.$id);
      } else {
        await appwriteService.createUserProfile(
          userData.$id,
          userData.name,
          userData.email,
          uploaded.$id
        );
      }

      fetchProfile();
    } catch (error) {
      alert("Upload failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10">
      <div className="bg-gradient-to-r from-red-400 via-pink-400 via-slate-300 via-neutral-600 via-orange-300 via-blue-400 to-indigo-400 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-md p-8 border border-gray-200 dark:border-gray-600 transition-all duration-300">
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-center text-blue-700 dark:text-blue-300 mb-6">
          👤 User Profile
        </h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center space-y-4">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 border border-dashed border-gray-300 dark:border-gray-500">
              No Image
            </div>
          )}

          {/* File Input */}
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input file-input-sm file-input-bordered w-full max-w-xs dark:text-white"
          />

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Uploading..." : "Upload Profile Picture"}
          </button>
        </div>

        {/* User Info */}
        <div className="mt-6 space-y-2 text-center text-gray-800 dark:text-gray-200">
          <p>
            <span className="font-medium">Name:</span>{" "}
            {profile?.name || userData?.name}
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            {profile?.email || userData?.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
