import React, { useState } from "react";
import axios from "axios";

function SettingsTab({ adminData }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError(""); // Hata mesajını sıfırla
    setSuccessMessage(""); // Başarı mesajını sıfırla

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      // Admin'in şifresini güncellemek için API'ye istek atıyoruz
      const response = await axios.put(
        "http://localhost:5000/api/admin/change-password", // Yeni şifre endpoint'ini belirtin
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccessMessage("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Failed to update password. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Admin Settings
      </h2>

      {/* Error and Success Messages */}
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <div className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Admin Email
          </label>
          <input
            type="email"
            value={adminData.email}
            className="w-full px-4 py-2 border rounded-md"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="pt-4">
          <button
            onClick={handlePasswordChange}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsTab;
