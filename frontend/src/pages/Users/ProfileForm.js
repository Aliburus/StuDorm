import React, { useState } from "react";
import { Save } from "lucide-react";
import { updateUserProfile } from "../../services/UserServices";
import ErrorMessage from "../../components/ErrorMessage";

const ProfileForm = ({
  user,
  formData,
  setFormData,
  isEditing,
  setIsEditing,
  handleSubmit,
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Password validation regex
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/; // At least 1 uppercase, 1 digit, 6 characters

  // Handle password change
  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setError("password/validation/match");
      setSuccess("");
      return;
    }

    // Password validation
    if (!passwordRegex.test(newPassword)) {
      setError("password/validation/format");
      setSuccess("");
      return;
    }

    // Email validation
    if (!emailRegex.test(formData.email)) {
      setError("validation/email");
      setSuccess("");
      return;
    }

    setFormData({
      ...formData,
      oldPassword,
      newPassword,
    });
    setError("");
    setSuccess("password/change/success");
  };

  const updateUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const formDataWithPassword = {
        ...formData,
        oldPassword: oldPassword,
        newPassword: newPassword,
      };
      const updatedUser = await updateUserProfile(formDataWithPassword, token);
      setIsEditing(false);
      setSuccess("admin/user/update/success");
    } catch (error) {
      setError("admin/user/update/failed");
      setSuccess("");
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePasswordChange();
        }}
        className="space-y-6 bg-white rounded-xl shadow-sm p-8"
      >
        {/* Kullanıcı Bilgileri (Okunabilir alanlar) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ad
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Soyad
            </label>
            <input
              type="text"
              value={formData.surname}
              onChange={(e) =>
                setFormData({ ...formData, surname: e.target.value })
              }
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-posta
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Telefon
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 disabled:bg-gray-100"
            />
          </div>
        </div>

        {isEditing && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mevcut Şifre
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Yeni Şifre
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Yeni Şifre Tekrar
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              />
            </div>
          </>
        )}

        {error && <ErrorMessage message={error} />}
        {success && <ErrorMessage message={success} severity="success" />}

        <div className="flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setFormData(user);
                  setIsEditing(false);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={updateUserInfo}
                className="flex items-center px-4 py-2 bg-yellow-400 text-white rounded-lg text-sm font-medium hover:bg-yellow-600"
              >
                <Save className="w-4 h-4 mr-2" /> Değişiklikleri Kaydet
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-yellow-400 text-white rounded-lg text-sm font-medium hover:bg-yellow-600"
            >
              Profili Düzenle
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
